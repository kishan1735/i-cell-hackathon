import mongoose from "mongoose";

const connectMongoDB = async () => {
  const DB: any = process.env.DATABASE_URL?.replace(
    "<PASSWORD>",
    process.env.DATABASE_PASSWORD!
  );
  return mongoose.connect(DB).then(() => console.log("Database Connected"));
};

export default connectMongoDB;
