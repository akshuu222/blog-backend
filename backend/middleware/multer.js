import muter from "multer";

const storage = muter.memoryStorage();
const singleUpload = muter({ storage }).single("file");

export default singleUpload;
