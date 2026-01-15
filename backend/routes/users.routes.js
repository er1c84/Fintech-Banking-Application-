const express = require ('express');
const router = express.Router();
const controller = require("../controller/controller");
const usersSchema = require("../model/users.model");

router.post("/", (req, res)=>{
    controller.createData(req, res, usersSchema);
});

module.exports = router;

//calling router function handles user requests, setting responce for users