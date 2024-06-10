import express from 'express';
import "dotenv/config"

import routes from "./routes/index.js"
const app =express();
const PORT = process.env.PORT||4500;

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get("/",(req,res)=>{
    return res.send("Hi Everyone.");
});

app.use(routes);


app.listen(PORT, (err)=>{
    if(err)
        {
            console.log("error in starting server",err);
            return;
        }
        else
console.log(`Server is running on PORT ${PORT}`);
});