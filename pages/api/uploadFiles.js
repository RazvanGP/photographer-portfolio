import formidable from "formidable";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false,
  },
};

//post

const post = async (req, res) => {
  const eventId = req.cookies?.eventId?.replace(/"/g, "");
  if (!eventId) {
    res.status(401).json({ error: "not authenticated" });
    return;
  }
  const uploadPath = `public/uploads/${eventId}/`;
  if (!fs.existsSync(`public/uploads/${eventId}`)) {
    fs.mkdirSync(`public/uploads/${eventId}`);
  }
  const form = new formidable.IncomingForm();
  form.multiples = true;
  form.uploadDir = uploadPath;
  console.log(req);
  console.log({ form });
  form.parse(req, (err, fields, files) => {
    if (err) {
      console.log(err);
      return;
    }
    if (files) {
      Object.values(files).forEach((file) => {
        if (file.filepath.includes("invalid-name")) {
          console.log("if-invalid-name");
          fs.renameSync(
            uploadPath + "/" + "/invalid-name",
            uploadPath + "/" + file.originalFilename,
            (error) => {
              console.log(error);
              res.status(500).json({ error: error });
              return;
            }
          );
        } else {
          fs.renameSync(
            uploadPath + "/" + file.newFilename,
            uploadPath + "/" + file.originalFilename,
            (error) => {
              console.log(error);
              res.status(500).json({ error: error });
              return;
            }
          );
        }
      });
    }
  });
  form.on("end", () => {
    res.status(201).json({ status: "ok" });
  });
  form.on("error", (err) => {
    console.log(err);
    res.status(400).json({ error: err });
  });
};

// get
const get = async (req, res) => {
  const userbaseId = sessionStorage.getItem("user").replace(/"/g, "");
  const uploadPath = `public/uploads/${userbaseId}`;
  if (fs.existsSync(`public/uploads/${userbaseId}`)) {
    fs.readdir(uploadPath, (err, files) => {
      if (err) res.status(500).json({ error: err });
      res.status(200).json({ files });
    });
  } else {
    res.status(200).json({ files: [] });
  }
};

export default (req, res) => {
  switch (req.method) {
    case "POST":
      post(req, res);
      break;
    case "DELETE":
      console.log(req.method);
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
