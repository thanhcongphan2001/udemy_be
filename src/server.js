const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 808;
const path = require("path");
const configViewEngine = require("./config/viewEngine");
import cookieParser from "cookie-parser";
// const fileUpload = require("express-fileupload");
const webRoute = require("./routes/web");
const apiRoute = require("./routes/api");
import Connection from "./config/database";

// config
// app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
configViewEngine(app);
// app.use("/", webRoute);
app.use("/v1", apiRoute);
// app.use("/api", apiRoute);

Connection();
app.use((req, res, next) => {
  res.send("404 not found");
});

// app.listen(8081, () => {
//   console.log(`Example app listening on port 8081`);
// });
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
