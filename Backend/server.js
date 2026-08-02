import cloudinary from "cloudinary"

import { config } from "dotenv";

config({
    path: "./config/config.env",
});

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

const startServer = async () => {
    try {
        const { default: app } = await import("./app.js");

        app.listen(process.env.PORT || 5000, () => {
            console.log(`Server listening on port ${process.env.PORT || 5000}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error);
    }
};

startServer(); 

//import app from "./app.js";

//app.listen(process.env.PORT, () => {
    //console.log(`server listening on port ${process.env.PORT}`);
//});