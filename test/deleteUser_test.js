const User = require("../model/user")

describe("Delete User",()=>{

    it('should delete a single user', async function () {
        try {
            const deleteUser= await User.findOneAndDelete({name:"Emma Watson"})
            // console.log("USER  Deleted ",deleteUser)
        }catch (e) {

            console.log("Error ",e)
        }
    });

})