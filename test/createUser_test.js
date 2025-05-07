const User = require("../model/user")

describe("Crete User",()=>{

    it('should create a single user', async function () {
        const newUser={
            "name":"Emma Watson",
            "email":"emmaw@gmail.com",
            "password":"emma123",
            "passwordConfirm":"emma123"
        }
        try {
            const user=await User.create(newUser);
            // console.log("NEW USER CREAED IS ",user)
        }catch (e) {

            console.log("Error ",e)
        }

    });

})

