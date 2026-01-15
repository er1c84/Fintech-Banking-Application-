const express = require ('express');
const router = express.Router();

router.get("/", (req, res)=>{
    res.status(200).json({
        message: "User Requested"
    })

});

module.exports = router;

//calling router function handles user requests, setting responce for users