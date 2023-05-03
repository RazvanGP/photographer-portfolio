import { useState } from "react";
import { BsEye } from "react-icons/bs";
import userbase from "userbase-js";
import Cookies from "universal-cookie";
import Loader from "./loader";

const cookies = new Cookies();

const UploadFilesModal = () => {
  const [selectedFiles, setselectedFiles] = useState(null);
  const [eventName, setEventName] = useState("");
  const [eventPass, setEventPass] = useState("");
  const [formFirstStep, setFormFirstStep] = useState(true);
  const [loading, setLoading] = useState(false);

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
      //setLoading(false);
      console.log(e);
      if (e.message === "Already signed in.") {
        const res = await userbase.signOut();
        console.log(res, "signed out");
      } else if (e.message === "Username already exists.") {
        alert("Username already exists.");
      }
    }
  };

  const handlePreviewPhotosUpload = (e) => {
    setselectedFiles(e.target.files);
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
      setLoading(false);
      //here remove uploadFilesModal from DOM
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="relative w-screen h-screen flex flex-col justify-center items-center text-white">
      <form
        className="flex flex-col justify-center  gap-5 w-full max-w-md p-5"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-3">
          <label htmlFor="eventName" className=" text-white">
            Event name:
          </label>
          <input
            className="p-1 rounded-md text-black"
            type="text"
            name="eventName"
            id="eventName"
            onChange={(e) => {
              setEventName(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor="eventPass" className=" text-white">
            Event pass:
          </label>
          <input
            className="p-1 rounded-md text-black"
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
              type="file"
              name="Files"
              id="Files"
              multiple={true}
              onChange={handlePreviewPhotosUpload}
            />
          </div>
        )}
        {formFirstStep ? (
          <button
            className="border-2 border-purple-500 text-purple-500 rounded-xl p-2 hover: cursor-pointer"
            onClick={handleNextFormStep}
          >
            Next
          </button>
        ) : (
          <button
            className="border-2 border-purple-500 text-purple-500 rounded-xl p-2 hover: cursor-pointer"
            type="submit"
          >
            Finish
          </button>
        )}
      </form>
      {loading && (
        <div className="absolute z-30 w-full h-full backdrop-brightness-50">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default UploadFilesModal;
