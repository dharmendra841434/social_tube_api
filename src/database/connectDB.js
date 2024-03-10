import mongoose from "mongoose";

const DataBaseConnection = async () => {
  try {
    const instance = mongoose.connect(`${process.env.DB_URL}`);
    console.log("Database is connected!!");
  } catch (error) {
    console.log(
      `Database can't be connected due to following reason:\n${error.message}`
    );
  }
};

export default DataBaseConnection;
