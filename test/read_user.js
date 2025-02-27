// const chai=require("chai")
const mongoose = require("mongoose")
const assert = require("assert")
const User = require("../model/user")
const axios = require("axios");

describe("Get Users", () => {

    it('should get sucess for get ', async function () {

        const response=await axios.get("http://127.0.0.1:3003/api/v1/users")
        assert.strictEqual(response.statusText,"OK")
    })

    it('should connect with 200', async function () {

        const response=await axios.get("http://127.0.0.1:3003/api/v1/users")
        assert.strictEqual(response.status,200)
    })

    it('should get one user', function (done) {

        const newUser = "Sahan Udara"

        const newUsers = User.findOne({name: "Sahan Udara"}).then((user) => {
            // console.log("USER FOUND ",user)
            assert.strictEqual(newUser, user.name)
            done()
        })
    });


    it('should get All Users', async function () {

        try {
            const allUsers=await User.find();
            assert.strictEqual(allUsers.length,1)

        } catch (e) {

            console.log("Error ", e)
        }

    });


})

