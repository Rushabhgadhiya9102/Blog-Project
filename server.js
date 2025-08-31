import express from "express"
import bodyParser from "body-parser"
import dotenvx from "@dotenvx/dotenvx"
import database from "./configs/database.js"
import cookieParser from "cookie-parser"
import path from "path";
import router from "./routers/index.js"
import { fileURLToPath } from "url";
import attachUser from "./middleware/attachUser.js"

dotenvx.config('.env')
const app = express()
const PORT = process.env.PORT
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(cookieParser())
app.use(attachUser)
app.use("/", router);


app.listen(PORT, (error) =>{
    if(error) {
        console.log(error.message);
        
    }else{
        database()
        console.log("http://localhost:" + PORT);

    }
})