const express = require("express");
const router = require('./routers/route');
require('./db/mongoose');

const app = express();

app.use(express.json());
app.use(router);

app.listen(3000, () =>{
    console.log('app is running on port 3000');
})