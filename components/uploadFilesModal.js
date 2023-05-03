import { useState, useRef } from "react";
import { BsEye } from "react-icons/bs";
import { AiOutlineLock } from "react-icons/ai";
import userbase from "userbase-js";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const UploadFilesModal = () => {
  const [eventName, setEventName] = useState("");
  const [eventPass, setEventPass] = useState("");

  const formData = useRef(new FormData());

  //   const [files, setFiles] = useState([]);
  //   const [fileUploaded, setFileUploaded] = useState(false);

  //   useEffect(() => {
  //     async function fetchUploadedFiles() {
  //       const config = {
  //         method: "GET", // or 'PUT'
  //         headers: { credentials: "include" },
  //       };

  //       try {
  //         const response = await fetch("/api/uploadFiles", config);
  //         const resData = await response.json();
  //         setFiles(resData.files);
  //       } catch (error) {
  //         console.log({ error });
  //       }
  //     }
  //     if (fileUploaded) setFileUploaded(false);
  //     fetchUploadedFiles();
  //   }, [fileUploaded, eventName]);

  //   useEffect(() => {
  //     sessionStorage.setItem("eventName", eventName);
  //   }, [eventName]);

  async function handleSignUp() {
    //e.preventDefault();
    //setLoading(true);
    try {
      const user = await userbase.signUp({
        username: eventName,
        password: eventPass,
        rememberMe: "none",
      });
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
  }

  //upload preview photos
  const handlePreviewPhotosUpload = (e) => {
    Array.from(e.target.files).forEach((file, index) => {
      formData.current.append(`file${index}-preview`, file);
    });
  };

  const handleProtectedPhotosUpload = (e) => {
    Array.from(e.target.files).forEach((file, index) => {
      formData.current.append(`file${index}`, file);
    });
  };

  const handleUploadNewEvent = async (e) => {
    //const eventId = await handleSignUp();
    const eventId = "e9432eec-6950-423c-a53e-b67d26e719e2";
    cookies.set("eventId", eventId, { path: "/" });

    const config = {
      method: "POST", // or 'PUT'
      headers: { credentials: "include" },
      body: formData.current,
    };
    try {
      const response = await fetch("/api/uploadFiles", config);
      const resData = await response.json();
      console.log(resData);
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center text-white">
      <div className="flex flex-col justify-center  gap-5 w-full max-w-md p-5 ">
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
          <label htmlFor="eventName" className=" text-white">
            Event pass:
          </label>
          <input
            className="p-1 rounded-md text-black"
            type="password"
            name="eventName"
            id="eventName"
            onChange={(e) => {
              setEventPass(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-col justify-center gap-3 ">
          <label htmlFor="eventName" className=" text-green-400">
            <BsEye />
            Upload preview photos here:
          </label>
          <input
            className="border-2 p-1 rounded-md border-green-400"
            type="file"
            name="previewFiles"
            id="previewFiles"
            multiple={true}
            onChange={handlePreviewPhotosUpload}
          />
        </div>
        <div className="flex flex-col justify-center  gap-3">
          <label htmlFor="eventName" className=" text-orange-400">
            <AiOutlineLock />
            Upload protected files here:
          </label>
          <input
            className="border-2 p-1 rounded-md border-orange-400"
            type="file"
            name="protectedFiles"
            id="protectedFiles"
            multiple={true}
            onChange={handleProtectedPhotosUpload}
          />
        </div>
        <button
          className="border-2 border-purple-500 text-purple-500 rounded-xl p-2 hover: cursor-pointer"
          onClick={handleUploadNewEvent}
        >
          Finish
        </button>
      </div>
    </div>
  );
};

export default UploadFilesModal;
