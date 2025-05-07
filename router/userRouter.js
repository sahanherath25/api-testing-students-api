const express=require("express");
const userControllers=require("../controller/userControllers")

const router=express.Router();

router.route("/").get(userControllers.getAllUsers).post(userControllers.addNewUser).delete(userControllers.deleteUser)


router.route("/:id").get(userControllers.getOneUser)
    .delete(userControllers.deleteUser)
    .put(userControllers.updateUser
)



module.exports=router