import mongoose from "mongoose";

export const connectDB = async () => {
  try {
      await mongoose.connect(process.env.MONGO_URI as string);
      const connection = mongoose.connection;

      connection.on("connected", () => {
        console.log('_____MONGODB_____ conneced successfully')
      })

      connection.on("error", (err) => {
        console.log("oh no!, there's an error", {err})
        process.exit()
      })

  } catch (error) {
    console.error({error})
  }
}
