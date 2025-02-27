const app = require("./app")
const dotenv = require("dotenv")
const mongoose = require("mongoose")


dotenv.config({
    path: "./config.env"
})

const DB_STRING = process.env.DB_URL.replace("<PASSWORD>", process.env.PASSWORD)


mongoose.connect(DB_STRING).then(() => {
    console.log("CONNECTED TO THE CLOUD DATABASE SUCCESSFULLY")
}).catch(() => {
    console.log("Error ", e)
})


const PORT = process.env.PORT || 3000

console.log("YOU RE ON ", process.env.NODE_ENV)


const server = app.listen(PORT, () => {
    console.log("listening to the Srver", PORT)

})