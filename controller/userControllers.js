const User = require("../model/user");
const AppError = require("../utils/appError");

exports.getAllUsers = async (req, res, next) => {


    try {
        const user = await User.find().sort({date: "asc"})

        res.status(200).json({
            status: "success",
            data: {
                user
            }
        })

    } catch (e) {

        console.log("Error ", e)
        res.status(401).json({
            status: "fail",
            error: {
                name: e.message
            }
        })
    }


}

exports.getOneUser = async (req, res, next) => {

    const userEmail = req.body.email;

    console.log("ËMAIL IN BODY ", userEmail)

    try {
        //TODO Find by id
        // const userId = req.params.id;
        // const user = await User.findById(userId)

        //TODO Find by email provided
        const {email} = req.body;
        const user = await User.find({email})
        console.log("USER FOUND ", user)

        if (user.length === 0) {
            // next(new AppError("User Not Found ",404))
            res.status(404).json({
                status: "fail",
                length: user.length,
                data: {
                    data: user
                }
            })
        } else {
            res.status(200).json({
                status: "success",
                data: {
                    user
                }
            })

        }

    } catch (e) {
        res.status(401).json({
            status: "fail",
            error: {
                name: e.message
            }
        })
    }


}

exports.deleteUser = async (req, res, next) => {

    try {

        const userToDelete = req.params.id
        const user = await User.findByIdAndDelete({_id: userToDelete});

        console.log("USER FOUND ",user);

        if(!user){

            next(new AppError("User Not Found ",404))

            res.status(404).json({
                status: "fail",
                data: {
                    user
                }
            })

        }else {
            res.status(204).json({
                status: "success",
                data: {
                    user
                }
            })

        }




    } catch (e) {

        console.log("Error ", e)
    }

}
exports.addNewUser = async (req, res, next) => {

    const userData = req.body;

    console.log("USER IS ", userData);

    try {
        const user = await User.create(userData)

        res.status(200).json({
            status: "success",
            data: {
                user
            }
        })
    } catch (e) {

        console.log("Error ", e)
        res.status(401).json({
            status: "fail",
            error: {
                name: e.message
            }
        })
    }


}

exports.updateUser = async (req, res, next) => {

    const userId = req.params.id;

    const {email,name}=req.body;

    console.log("USER IS ", userId);

    try {
        const user = await User.findOneAndUpdate({_id:req.params.id},{
            $set:{name:name,email:email}
        },{new:true})

        res.status(201).json({
            status: "success",
            data: {
                user
            }
        })
    } catch (e) {

        console.log("Error ", e)
        res.status(401).json({
            status: "fail",
            error: {
                name: e.message
            }
        })
    }


}
