require('dotenv').config();
const express = require('express');

const { connectDb } = require('./src/service/mongoose');



const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
//app.use(  userRoutes);

connectDb().catch(err => console.log(err));//appel de la fonction connectDb et fait les diff operations

app.listen(port, () => {
    console.log(`le serveur est lance  a: http://localhost:${port}`);
});


