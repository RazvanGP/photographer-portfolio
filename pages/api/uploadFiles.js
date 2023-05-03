import { IncomingForm } from "formidable";
import fs from "fs";
import path from "path";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function post(req, res) {
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
