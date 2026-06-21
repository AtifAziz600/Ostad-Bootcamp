const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
// const mongoSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const dotENV = require('dotenv');
const router = require('./src/routers/api');

const app = express();
dotENV.config();

// mongobd connection

let URL = "mongodb+srv://mdatifazizfahim_db_user:sT9ZcyFztIwfsWeN@cluster0.ikueb8u.mongodb.net/?appName=Cluster0"
let option = {
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    autoIndex: true,
    serverSelectionTimeoutMS: 5000,
}

mongoose.connect(URL, option).then((res) => {
    console.log("Mongoose Connect");
}).catch((err) => {
    console.log(err)
})

mongoose.set("strictQuery", false);

//Global Middleware
app.use(cookieParser());
app.use(cors(
    {
        origin: ["http://localhost:5173", "http://localhost:3001"],
        credentials: true,
    }
))

app.use(helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
        "img-src": ["'self'", "https: data:"]
    }
}
))

app.use(express.json({limit: "50mb"}));
app.use(express.urlencoded({extended: true, limit: "50mb"}));

// app.use(mongoSanitize());
// Remove: const mongoSanitize = require('express-mongo-sanitize');
// Remove: app.use(mongoSanitize());

// Add this custom sanitizer instead:
function sanitize(obj) {
    if (obj && typeof obj === 'object') {
        for (const key of Object.keys(obj)) {
            if (key.startsWith('$') || key.includes('.')) {
                delete obj[key];
            } else {
                sanitize(obj[key]);
            }
        }
    }
}

app.use((req, res, next) => {
    sanitize(req.body);
    sanitize(req.params);
    // intentionally skip req.query — it's read-only in Express v5
    next();
});
app.use(hpp());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
})

app.use(limiter);

app.use("/api/v1", router);

app.use("/api/v1/get-file", express.static("uploads"));

// app.use("/super-admin", express.static(path.join(__dirname, "client", "super-admin", "dist"), {
//     index: false,
// }))

// app.use(express.static(path.join(__dirname, "client", "ecommerce", "dist")));

// app.get("/super-admin/*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "client", "super-admin", "dist", "index.html"));
// })

// app.get("*", function (req, res) {
//     res.sendFile(path.resolve(__dirname, "client", "ecommerce", "dist", "index.html"))
// })

module.exports = app;