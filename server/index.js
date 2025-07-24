import express from "express";
const app = express();
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import twilio from "twilio";

import Vehical from "./models/VehicalSchema.js";

import AdminAuthRoute from "./routes/AdminAuthRoute.mjs";
import CustomerAuthRoute from "./routes/CustomerAuthRoute.mjs";
import ChallanRoute from "./routes/ChallanRoute.mjs";

app.use(cors());
app.use(express.json());

dotenv.config();
const port = process.env.PORT || 4000;
const dbUrl = process.env.TOWSMART_DB_URL;
const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

mongoose
  .connect(dbUrl)
  .then((res) => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB Connection Error: ", err);
  });

app.use("/", AdminAuthRoute);
app.use("/", CustomerAuthRoute);
app.use("/", ChallanRoute);

app.post("/home", async (req, res) => {
  let { vehicalNo } = req.body;

  try {
    const vehicalDetails = await Vehical.findOne({ vehicalNo: vehicalNo }).populate("vehicalOwner");
    // console.log(vehicalDetails)

    if (!vehicalDetails) {
      return res
        .status(404)
        .json({ success: false, message: "Vehical Not Registerded" });
    }

    res.status(200).json({
      success: true,
      message: "Vehical Found",
      vehicalDetails: vehicalDetails,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }

});

const client = twilio(accountSid, authToken);

app.post("/send-sms", async (req, res) => {
  let { message, phone } = req.body;
  console.log(req.body)

  try {
    const response = await client.messages.create({
      body: message,
      from: "+14639465211", // Twilio phone number
      to: phone, // Recipient number
    });

    res
      .status(200)
      .json({
        success: true,
        message: "Sms sent successfully",
        sentMsg: response,
      });
  } catch (error) {
    // console.error("Error sending SMS:", error.message);
    res
      .status(500)
      .json({
        success: false,
        message: "Error while sending message",
        error: error,
      });
  }

  // res.status(200).json({success : true, message : "data recieced"})
});

app.use((err, req, res, next) => {
  return res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
