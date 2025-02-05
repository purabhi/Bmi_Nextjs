import mongoose from "mongoose";

let isConnected = false

const ConnectToDb = async() => {

   const DataBaseUrl = 'mongodb+srv://purnima3590:purnima@cluster1.0ytx8.mongodb.net/bmiNextjs?retryWrites=true&w=majority';



    if (!DataBaseUrl) {
        throw new Error("Database URL not Defined")
    }

   if (isConnected) {
      console.log("Alread Connected")
      return
   }
   
   
     try {
        await mongoose.connect(DataBaseUrl)
        console.log("Connected to DB")
        isConnected = true
     } catch (error) {
        console.log(error)  
     }
}
export default ConnectToDb

