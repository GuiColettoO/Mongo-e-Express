import mongoose from "mongoose";

async function dbConnect() {
  mongoose.connect(process.env.MONGO_URI);

  return mongoose.connection;
}

export default dbConnect;
