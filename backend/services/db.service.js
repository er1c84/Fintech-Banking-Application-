require("dotenv").config();
const mongo = require("mongoose");

const url = process.env.MONGO_URL;
mongo.connect(url);

const findAllRecord = async (schema) => {
    const dbRes = await schema.find();
    return dbRes;
}

const createNewRecord = async (data, schema) => {
    const dbRes= await new schema(data).save();
    return dbRes;
}

const updateRecord = async (id, data, schema) => {
    const dbRes = await schema.findByIdAndUpdate(id, data, { new: true });
    return dbRes;
}

const deleteRecord = async (id, schema) => {
    const dbRes = await schema.findByIdAndDelete(id);
    return dbRes;
}
module.exports = {
    findAllRecord,
    createNewRecord,
    updateRecord,
    deleteRecord
}