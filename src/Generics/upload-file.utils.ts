import { v4 as uuidv4 } from 'uuid';
export function editfileName(req, file: Express.Multer.File, cb) {
  const randomName = uuidv4() + file.originalname;
  cb(null, randomName);
}
