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

    it('should get one user calista and Reading Her Data', async function () {

        const newUser=JSON.parse(`{
            "name":"Calista MMae",
            "email":"calista@gmail.com",
                "password":"emma123",
                "passwordConfirm":"emma123"
            }`
        )
        const user=await User.create(newUser)

        const newUsers =await User.findOne({name: newUser.name})
        assert.strictEqual(newUsers.name, user.name)
    });


    it('should get All Users', async function () {

            const allUsers=await User.find();
            assert.equal(allUsers.length,2)

    });

    it('should get have properties ', async function () {

            const userFound=await User.findOne({email:"calista@gmail.com"});
        console.log("OBJ TYPE ",typeof userFound)

        const objUser=userFound.toObject(); 

        console.log("USER ",Object.hasOwn(objUser,"email"))
        console.log("USER ",Reflect.has(userFound, 'email'))
        console.log(userFound.toObject().hasOwnProperty('email')); // true

        let email=Reflect.has(userFound, 'email')
        let name=Reflect.has(userFound, 'name')


        assert.strictEqual (email,true )
        assert.strictEqual (name,true )


    });





})

