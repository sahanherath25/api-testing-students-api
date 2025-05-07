const assert = require("assert");
const axios = require("axios");

const chai = require("chai");
const expect = chai.expect;
const should = chai.should();

const User = require("../model/user")

describe("All in One Test", () => {

    it('should create new user', async function () {

        const userData = {
            "name": "Angela Yu",
            "email": "angela21@gmail.com",
            "password": "angela123",
            "passwordConfirm": "angela123"
        }
        const response = await axios.post("http://127.0.0.1:3003/api/v1/users", userData)
        // console.log("RES ",response)
        assert.strictEqual(response.status,201)
        const createUser = response.data.data.user
        expect(createUser).to.be.an("object");
        expect(createUser).to.have.property("name")
        expect(createUser).to.have.property("email")
        expect(createUser).to.have.property("password")


    });

    it('should avoid creating user without name', async function () {

        try {

            const userData = {
                "email": "angela21@gmail.com",
                "password": "angela123",
                "passwordConfirm": "angela123"
            }

            const response = await axios.post("http://127.0.0.1:3003/api/v1/users", userData)
            // console.log("RES ",response)
            const createUser = response.data.data.user
            expect(response.status).not.to.be.equal(201)

        } catch (e) {

            console.log("MIDDLEWARE ERROR ",e.response.data.error.name)

            expect(e.response.status).to.be.equal(401)
            expect(e.response.data.error.name).to.include('User validation failed: name: User Name Must be Required');

        }


    });

    it('should get created  user', async function () {

        const user = await User.findOne({name: "Angela Yu"})
        const response = await axios.get(`http://127.0.0.1:3003/api/v1/users/${user._id}`)

        const receivedUser = response.data.data.user
        // console.log("SAHAN ",receivedUser)

        //TODO Checking Properties Exists
        receivedUser.should.have.property("name")
        receivedUser.should.have.property("email")
        receivedUser.should.have.property("password")
        receivedUser.should.have.property("password")

        //TODO Comparing to value to be equal
        expect(user.name).to.be.equal("Angela Yu")
        expect(response.status).to.be.equal(200)
        // expect(response.message).to.be.equal("")

        expect(response.statusText).to.be.equal("OK")

        console.log("MESSAGE ", response.status)

        expect(user).to.be.an("object")


    });

    it('should update email of created ', async function () {


        // const user =await User.findOneAndUpdate({name:"Angela Yu"},{$set:{email:"flourish19@gmail.com"},},{new:true})

        const user = await User.findOne({name: "Angela Yu"})
        const response = await axios.put(`http://127.0.0.1:3003/api/v1/users/${user.id}`, {
            name: "Flourish",
            email: "flourish911@gmail.com"
        })

        const receivedUser = response.data.data.user

        // console.log("RESPONSE ",response)


        // RESPONSE  {
        //     status: 'success',
        //         data: {
            //         user: {
            //             _id: '67c3facd50d2617160159acf',
            //                 name: 'Flourish',
            //                 email: 'flourish911@gmail.com',
            //                 password: 'angela123',
            //                 passwordConfirm: 'angela123',
            //                 date: '2025-03-02T06:29:33.632Z',
            //                 __v: 0
            //         }
        //     }
        // }

        assert.strictEqual("flourish911@gmail.com", receivedUser.email)


    });

    it('should update email of Flourish  ', async function () {


        // const user =await User.findOneAndUpdate({name:"Angela Yu"},{$set:{email:"flourish19@gmail.com"},},{new:true})

        const payload={
            email:"flourish911@gmail.com"
        }

        const user = await User.findOne(payload)
        const response = await axios.put(`http://127.0.0.1:3003/api/v1/users/${user.id}`, {
            name: "Flourish",
            email: "flourish25@gmail.com"
        })

        console.log("MY RESPONSE " ,response.data.data.user)

        expect(response.data.data.user.email).should.not.to.be.equal(payload.email)
        // expect(response.data.data.user.email).to.be.equal(payload.email)


    });

    it('should delete created user ', async function () {

        const user = await User.findOne({name: "Flourish"})
        const response = await axios.delete(`http://127.0.0.1:3003/api/v1/users/${user._id}`)
        // const response=await axios.delete(`http://127.0.0.1:3003/api/v1/users`)
        console.log("DELETED USER ", response.status)
        console.log("DELETED USER  DATA ", response.data.data)
        assert.strictEqual("flourish25@gmail.com", user.email)


    });

})