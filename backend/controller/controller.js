const createData = (req, res, Schema) => {
try{
    const data = req.body;
    res.status(200).json({
        message: "Data Received",
        data
    })

}catch(error){
    res.status(500).json({
        message: "Internal Server Error",
        error 
    })
}
}
module.exports = {
    createData
}