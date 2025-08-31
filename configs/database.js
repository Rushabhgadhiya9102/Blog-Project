import mongoose from "mongoose"

const database = ()=>{
    mongoose.connect(process.env.MONGO_URL)
    .then(()=> console.log("database connected"))
    .catch((error) => console.log(error.message))
}

export default database;