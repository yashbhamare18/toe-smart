import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Button from '@mui/material/Button';
import { twoWheelers, threeWheelers, fourWheelers } from "../data/vehicleModels";

export default function Home() {
  const [vehicalNo, setVehicalNo] = useState("");
  const [smsDetails, setSmsDetails] = useState(null);
  const [vehicalType, setVehicalType] = useState("");
  const [vehicalModel, setVehicalModel] = useState("");

  const [smsSent, setSmsSent] = useState(false);

  const nashikLocations = [
    "Trimbakeshwar, Nashik",
    "Saptashrungi, Nashik",
    "Pandav Leni, Nashik",
    "Kalaram Sansthan Mandir, Nashik",
    "Sula Vineyards, Nashik",
    "Nashik Road, Nashik",
    "Anjneri Hill, Nashik",
    "Godavari River, Nashik",
    "Jain Mandir, Nashik",
    "Nashik Fort, Nashik",
    "Kapileswara Temple, Nashik",
    "Nashik City Centre Mall, Nashik",
    "Someshwar Waterfall, Nashik",
    "Harihar Fort, Nashik",
    "Ramanand Ashram, Nashik",
    "Vaitarna Dam, Nashik",
    "Ganga Ghat, Nashik",
    "Dudhsagar Falls, Nashik",
    "Shree Saptashrungi Gad, Nashik",
    "Bhakti Dham, Nashik"
  ];

  const getRandomLocation = () => {
    const randomIndex = Math.floor(Math.random() * nashikLocations.length);
    return nashikLocations[randomIndex];
  };



  const handleVehicleInput = (e) => {
    let value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "");
    let formatted = "";

    // Extract required parts based on strict format
    const part1 = value.slice(0, 2).replace(/[^A-Z]/g, "");       // A-Z (2)
    const part2 = value.slice(2, 4).replace(/[^0-9]/g, "");       // 0-9 (2)
    const part3 = value.slice(4, 6).replace(/[^A-Z]/g, "");       // A-Z (2)
    const part4 = value.slice(6, 10).replace(/[^0-9]/g, "");      // 0-9 (4)

    // Combine with dashes
    if (part1 || part2 || part3 || part4) {
      formatted = `${part1}${part2 ? "-" + part2 : ""}${part3 ? "-" + part3 : ""}${part4 ? "-" + part4 : ""}`;
    }

    setVehicalNo(formatted);
  };


  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSmsSent(true);

    try {
      const res = await axios.post("http://localhost:9002/home", {
        vehicalNo,
        vehicalType,
        vehicalModel,
      });

      const info = res.data?.vehicalDetails;
      const phone = info.vehicalOwner.phone;
      const msg = `Dear ${info.vehicalOwner.fullName},
Your vehicle ${info.vehicalModel} (${info.vehicalNo}) was towed due to parking violation. For more info : http://localhost:5173/home .`;

      sendSms(phone, msg, info, vehicalType);

    } catch (err) {
      console.log(err.response?.data);
      setSmsSent(false);
      const errorMsg = err.response?.data?.message || "Vehicle not found or error occurred.";
      toast.error(errorMsg);
    }

    setVehicalNo("");
    setVehicalType("");
    setVehicalModel("");
  };


  const makeChallan = async (info, vehicalType) => {
    try {
      await axios.post("http://localhost:9002/make-challan", { info, vehicalType: vehicalType }).then((res) => {
        console.log(res.data)
      }).catch((err) => {
        console.log(err)
      })
    } catch (error) {
      console.log(error);
    }
  }

  const sendSms = async (phone, msg, info, vehicalType) => {
    try {
      await axios.post("http://localhost:9002/send-sms", {
        message: msg,
        phone: phone,
      });
      toast.success("SMS sent successfully.");
      setSmsSent(false)
      setSmsDetails(info);
      makeChallan(info, vehicalType);

    } catch (err) {
      toast.error("Failed to send SMS.");
      console.error(err);
    }
  };

  useEffect(() => {
    if (smsDetails) {
      const timer = setTimeout(() => setSmsDetails(null), 15000);
      return () => clearTimeout(timer);
    }
  }, [smsDetails]);

  return (
    <div className="relative min-h-screen w-full bg-gray-100 overflow-hidden">
      {/* Background Image */}
      <img
        src="https://www.hindustantimes.com/ht-img/img/2025/02/14/1600x900/Traffic-police-towing-a-car-in-Gurugram-on-Thursda_1739557306600.jpg"
        alt="traffic background"
        className="absolute inset-0 w-full h-full object-cover opacity-50 z-0"
      />

      {/* Banner */}
      <div className="absolute top-0 left-0 right-0 bg-red-500 py-2 text-white text-center text-sm font-bold animate-pulse z-10">
        🚨 Park Responsibly | Follow Traffic Rules | Be a Responsible Citizen 🚓
      </div>

      {/* Form Card */}
      <div className="relative z-20 flex items-center justify-center min-h-screen px-4 pt-10">
        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-xl border border-gray-200 transition-all hover:scale-[1.01]">
          <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">
              🚗 Vehicle Towing Notification
            </h2>

            {/* Vehicle Number */}
            <input
              type="text"
              name="vehical"
              id="vehical"
              value={vehicalNo}
              placeholder="e.g. MH19-TY-7878"
              onChange={handleVehicleInput}
              className="p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
              required
            />

            {/* Vehicle Type Dropdown */}

            <select
              value={vehicalType}
              onChange={(e) => {
                setVehicalType(e.target.value);
                setVehicalModel(""); // Reset model on type change
              }}
              required
              className="p-3 border border-gray-300 rounded-md w-full bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
            >
              <option value="">Select Vehicle Type</option>
              <option value="2-Wheeler">2-Wheeler</option>
              <option value="3-Wheeler">3-Wheeler</option>
              <option value="4-Wheeler">4-Wheeler</option>
            </select>

            {/* Vehicle Model Dropdown based on type */}
            {vehicalType && (
              <select
                value={vehicalModel}
                onChange={(e) => setVehicalModel(e.target.value)}
                required
                className="p-3 border border-gray-300 rounded-md w-full bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
              >
                <option value="">Select {vehicalType} Model</option>
                {vehicalType === "2-Wheeler" ? (twoWheelers.map((model, idx) => (
                  <option value={model} key={idx}>{model}</option>
                ))) : (vehicalType === "3-Wheeler" ? (threeWheelers.map((model, idx) => (
                  <option value={model} key={idx}>{model}</option>
                ))) : (fourWheelers.map((model, idx) => (
                  <option value={model} key={idx}>{model}</option>
                ))))}
              </select>
            )}

            {/* Submit Button */}
            <Button
              fullWidth
              type="submit"
              className="!bg-amber-500 !text-white !font-semibold !rounded-lg py-2 !hover:bg-amber-600 !transition"
              loading={!smsDetails && smsSent}
              loadingPosition="end"
              variant="outlined"
            >
              Send Sms
            </Button>
          </form>

          {/* {!smsDetails && smsSent ? <div>loding</div> : null} */}


          {/* SMS Details Card */}
          {smsDetails && (
            <div className="mt-6 text-gray-700 bg-amber-50 p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-center mb-3">🚨 Vehicle Info</h3>
              <div className="flex flex-col gap-1 text-sm">
                <span>
                  <b>👤 Owner Name:</b> {smsDetails?.vehicalOwner.fullName}
                </span>
                <span>
                  <b>📞 Owner Phone:</b>{" "}
                  {smsDetails.vehicalOwner.phone.slice(0, 6) + "******"}
                </span>
                <span>
                  <b>🚘 Vehicle Model:</b> {smsDetails?.vehicalModel}
                </span>
                <span>
                  <b>🔢 Reg. Number:</b> {smsDetails?.vehicalNo}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Awareness Cards */}
      <section className="bg-white py-12 px-4 sm:px-10 z-20 relative">
        <h3 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-800">
          🛑 Traffic Awareness Tips
        </h3>
        <div className="grid sm:grid-cols-3 gap-6 text-center">
          {[
            {
              icon: "🪖",
              title: "Wear Helmets",
              desc: "Ensure safety by always wearing helmets while riding.",
            },
            {
              icon: "🚧",
              title: "No Wrong Parking",
              desc: "Avoid fines and towing by parking in designated spots.",
            },
            {
              icon: "🚦",
              title: "Respect Signals",
              desc: "Follow traffic lights to prevent accidents.",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-gray-100 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              <div className="text-5xl mb-3">{item.icon}</div>
              <h4 className="font-semibold text-lg mb-1">{item.title}</h4>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
