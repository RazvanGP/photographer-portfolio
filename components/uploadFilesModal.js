import { useState, useEffect, useContext } from "react";
import { FaTrashAlt } from "react-icons/fa";
import userbase from "userbase-js";
import Cookies from "universal-cookie";
import Loader from "./loader";
import { Context } from "../context/context";
import { fetchUploadedFiles } from "../sersvices/eventsServices";
const cookies = new Cookies();

const UploadFilesModal = () => {
  const [selectedFiles, setselectedFiles] = useState(null);
  const [eventName, setEventName] = useState("");
  const [eventPass, setEventPass] = useState("");
  const [formFirstStep, setFormFirstStep] = useState(true);
  const [loading, setLoading] = useState(false);
  const [reloadForm, setReloadForm] = useState(false);
  const [eventsTable, setEventsTable] = useState([]);
  const { setShowPasswordModal, deletedUsers } = useContext(Context);

  useEffect(() => {
    fetchUploadedFiles()
      .then((res) => setEventsTable(res))
      .catch((error) => console.log(error));
  }, [reloadForm]);

  const handleNextFormStep = async (e) => {
    e.preventDefault();
    //signup user
    try {
      setLoading(true);
      const user = await userbase.signUp({
        username: eventName,
        password: eventPass,
        rememberMe: "none",
      });
      setLoading(false);
      // set eventId in cookie
      const eventId = user.userId;
      cookies.set("eventId", eventId, { path: "/" });

      //go to next step -> show upload files input
      setFormFirstStep(false);
      return user;
    } catch (e) {
      setLoading(false);
      console.log(e);
      if (e.message === "Already signed in.") {
        const res = await userbase.signOut();
        console.log(res, "signed out");
      } else if (e.message === "Username already exists.") {
        alert("Username already exists.");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Array.from(selectedFiles).forEach((file, index) => {
      formData.append(`file${index}`, file);
    });

    try {
      setLoading(true);
      const response = await fetch("/api/uploadFiles", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }
      console.log("Upload successful");
      const res = await userbase.signOut();
      console.log(res, "signed out");

      setReloadForm(!reloadForm);
      // setReloadTable(!reloadTable);
      setFormFirstStep(true);
      setLoading(false);
      // alert("Event added succesfuly!");
    } catch (err) {
      console.log(err);
    }
  };

  const handlePhotosUpload = (e) => {
    setselectedFiles(e.target.files);
  };

  const deleteEvent = async (eventFolder, eventName) => {
    try {
      //todo: delete userbase user(event)
      //open passwordModal
      sessionStorage.setItem("tempUser", eventName);
      setShowPasswordModal(true);
      //delete folder from public/uploads
      const res = await fetch(`/api/uploadFiles?deletedEvent=${eventFolder}`, {
        method: "DELETE",
      });
      const data = await res.json();
      // console.log(data);
      if (res.ok) {
        // todo: delete user from userbase
        console.log(`Event ${eventFolder} has been deleted.`);
        const deletedEvent = eventsTable.find((eventName) => {
          eventName === eventFolder;
        });
        eventsTable.splice(deletedEvent, 1);
        // console.log(eventsTable);
        setReloadForm(!reloadForm);
      } else {
        console.log(
          `Event ${eventFolder} hasn't been deleted. Something wrong...`
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center text-white gap-5">
      <form
        key={reloadForm}
        className="flex flex-col justify-center  gap-5 w-full max-w-md p-5"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col">
          <label
            htmlFor="eventName"
            className=" text-purple-700 text-sm font-bold mb-2"
          >
            Event name:
          </label>
          <input
            className="p-1 rounded-md text-black"
            disabled={loading}
            type="text"
            name="eventName"
            id="eventName"
            onChange={(e) => {
              setEventName(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="eventPass"
            className=" text-purple-700 text-sm font-bold mb-2"
          >
            Event pass:
          </label>
          <input
            className="p-1 rounded-md text-black"
            disabled={loading}
            type="password"
            name="eventPass"
            id="eventPass"
            onChange={(e) => {
              setEventPass(e.target.value);
            }}
            multiple={true}
          />
        </div>
        {!formFirstStep && (
          <div className="none flex flex-col justify-center gap-3 ">
            <input
              className="border-2 p-1 rounded-md "
              disabled={loading}
              type="file"
              name="Files"
              id="Files"
              multiple={true}
              onChange={handlePhotosUpload}
            />
          </div>
        )}
        {formFirstStep ? (
          <div className="flex flex-col items-center">
            {loading ? (
              <Loader />
            ) : (
              <button
                className="w-full border-2 border-purple-500 text-purple-500 rounded-xl p-2 hover: cursor-pointer"
                onClick={handleNextFormStep}
              >
                Next
              </button>
            )}
          </div>
        ) : (
          <button
            className="border-2 border-purple-500 text-purple-500 rounded-xl p-2 hover: cursor-pointer"
            type="submit"
          >
            Finish
          </button>
        )}
      </form>
      {/* delete events */}
      <table className="">
        <thead>
          <tr className="text-left">
            <th>Event Name</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {eventsTable
            .filter((event) => !event.deleted)
            .map((userbaseEvent, index) => {
              console.log({ userbaseEvent });
              return (
                index !== 0 && (
                  <tr key={userbaseEvent.userId}>
                    <td>{userbaseEvent.username}</td>

                    <td className="text-center">
                      <button
                        onClick={() =>
                          deleteEvent(
                            userbaseEvent.userId,
                            userbaseEvent.username
                          )
                        }
                      >
                        <FaTrashAlt className="text-red-800" />
                      </button>
                    </td>
                  </tr>
                )
              );
            })}
        </tbody>
      </table>
      {/* toggle password modal */}
    </div>
  );
};

export default UploadFilesModal;
