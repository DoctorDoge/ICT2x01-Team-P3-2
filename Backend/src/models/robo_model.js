const mongoose = require("mongoose");

const roboSenseiSchema = new mongoose.Schema({
    title: String,
    description: String
});

const roboModel = mongoose.model('roboSensei', roboSenseiSchema);
module.exports = roboModel;