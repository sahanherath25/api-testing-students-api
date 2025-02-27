const mongoose = require("mongoose");
const dotenv = require("dotenv")
mongoose.Promise=global.Promise
const User = require("../model/user")


dotenv.config({
    path: "./config.env"
})

// const DB_STRING = process.env.DB_URL.replace("<PASSWORD>", process.env.PASSWORD);
const DB_STRING = process.env.DB_URL.replace("<PASSWORD>", process.env.PASSWORD)

const connectDB=async ()=>{

      try {

           await mongoose.connect(DB_STRING)
          console.log("CONNECTED TO DB SAHAN")

        }catch (e) {

          console.log("Error ",e)
        }
}

before( async ()=>{

    await connectDB()

})

before(async ()=>{

    const deleteUser= await User.findOneAndDelete({name:"Emma Watson"})
    console.log("USER  Deleted ",deleteUser)

})

after(()=>{
    mongoose.disconnect()
    console.log("DBDIS CONNECTED BYEEE")
})



