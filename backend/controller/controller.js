const dbService = require('../services/db.service');

const getData = async (req, res, schema) => {
    try{
        const dbRes = await dbService.findAllRecord(schema);
        return res.status(200).json({
            message: "Record found!",
            data: dbRes
        })
    }catch(error){
        res.status(500).json({
            message: "Internal Server Error",
            error
        })
    }
}

const createData = async (req, res, Schema) => {
try{
    const data = req.body;
    const dbRes = await dbService.createNewRecord(data, Schema);
        res.status(200).json({
        message : "Data inserted successfully",
        success: true,
        data: dbRes
    })

}

catch(error){
    if(error.code === 11000){
        return res.status(422).json({
            message : "already exists",
            success: false,   
            error
        })}

    else{
        res.status(500).json({
        message : "Internal Server Error",
        error
            })
        }
}
}
module.exports = {
    createData,
    getData
}