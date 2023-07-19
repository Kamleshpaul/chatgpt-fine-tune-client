import { NextApiHandler, NextApiRequest } from "next";
import formidable from "formidable";
import path from "path";
import fs from "fs/promises";
import { handleUpload } from "@/actions/opanai";

export const config = {
  api: {
    bodyParser: false,
  },
};

const readFile = (req: NextApiRequest) => {
  const options: formidable.Options = {};
  const uploadPath = path.join(process.cwd(), "/public/files");
  options.uploadDir = uploadPath;
  options.filename = (name, ext, path, form) => {
    return Date.now().toString() + "_" + path.originalFilename;
  };
  options.maxFileSize = 100 * 1024 * 1024; // Set the maxFileSize to 100MB
  const form = formidable(options);
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files: { file?: any }) => {
      if (err) reject(err);
      const file = files.file;
      resolve(file[0].filepath);
    });
  });
};

const handler: NextApiHandler = async (req, res) => {
  try {
    await fs.readdir(path.join(process.cwd() + "/public", "/files"));
  } catch (error) {
    await fs.mkdir(path.join(process.cwd() + "/public", "/files"));
  }
  const filePath = await readFile(req);
  const openAires = await handleUpload(filePath);
  fs.unlink(filePath as any)
  res.json({ openAires });
};

export default handler;