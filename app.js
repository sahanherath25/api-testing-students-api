const express=require("express")
const mongoose=require("mongoose")
const cors=require("cors")


const app=express();


app.use(express.json())
app.use(cors());

const userRouter=require("./router/userRouter")

app.use("https://api-testing-students-api.vercel.app/api/v1/users",userRouter)





module.exports=app;