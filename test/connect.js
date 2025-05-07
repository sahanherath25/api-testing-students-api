
const dotdev=require("dotenv")
const mongoose=require("mongoose")
const User=require("../model/user")


dotdev.config({
    path:"./config.env"
})

const QUERY=process.env.DB_URL.replace("<PASSWORD>", process.env.PASSWORD)

before(async ()=>{

//    TODO Connecting to DB

      try {

          await mongoose.connect(QUERY)
          console.log("Connected to DB EMMA")
        }catch (e) {

          console.log("Error ",e)
        }
})

after(async ()=>{

//    TODO Disconnecting DB
    const deletedUser = await User.findOneAndDelete({email: "calista@gmail.com"})
    mongoose.disconnect()
})

