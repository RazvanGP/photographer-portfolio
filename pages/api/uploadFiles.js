import { IncomingForm } from "formidable";
import fs from "fs";
import path from "path";

export const config = {
  api: {
    bodyParser: false,
  },
};

function post(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  //update with userbaseId
  const eventId = req.cookies?.eventId?.replace(/"/g, "");

  const uploadPath = `public/uploads/${eventId}`;
  if (!fs.existsSync(`public/uploads/${eventId}`)) {
    fs.mkdirSync(`public/uploads/${eventId}`);
  }

  const form = new IncomingForm({
    uploadDir: uploadPath,
    keepExtensions: true,
  });

  form.parse(req, (err, fields, files) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Upload failed" });
      return;
    }

    //formidable rename files | below keep the original filename
    if (files) {
      Object.values(files).forEach((file, index) => {
        // console.log(file);
        fs.renameSync(
          uploadPath + "/" + file.newFilename,
          uploadPath + "/" + file.originalFilename,
          (error) => {
            console.log(error);
            res.status(500).json({ error: error });
            return;
          }
        );
      });
    }

    res.status(200).json({ message: "Upload successful" });
  });
}

const get = async (req, res) => {
  try {
    const { preview } = req.query;
    console.log({ preview: JSON.parse(preview) });
    const dirs = fs.readdirSync("public/uploads");
    const images = {};
    dirs.forEach((dir) => {
      const files = fs.readdirSync(`public/uploads/${dir}`);
      images[dir] = files.filter((file, index) =>
        JSON.parse(preview) ? index < 3 : true
      );
      console.log(files);
    });
    res.status(200).json({ status: "ok", dirs: images });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

const del = async (req, res) => {
  try {
    //get deleted event
    const { deletedEvent } = req.query;
    console.log(deletedEvent);
    //create event folder path
    const folderPath = path.join(
      process.cwd(),
      `/public/uploads/${deletedEvent}`
    );
    try {
      // delete event folder
      if (folderPath) {
        fs.rmdir(folderPath, { recursive: true }, () => {
          console.log("Folder removed successfully");
        });
      } else {
        console.log("Folder does not exist");
      }
    } catch (error) {
      console.error("Error deleting folder:", error);
    }
    //send response message
    res.status(200).json({ message: "Delete request received." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

export default (req, res) => {
  switch (req.method) {
    case "POST":
      post(req, res);
      break;
    case "DELETE":
      del(req, res);
      break;
    case "UPDATE":
      console.log(req.method);
      break;
    case "GET":
      get(req, res);
      break;
    default:
      res.status(404).send("");
  }
};
