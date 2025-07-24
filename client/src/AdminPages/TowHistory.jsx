import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdLocalPolice } from "react-icons/md";
import { FaCarCrash, FaPhone, FaUser, FaMoneyBillWave, FaExclamationTriangle } from "react-icons/fa";

export default function TowHistory() {
  const [challans, setChallans] = useState([]);

  useEffect(() => {
    const fetchChallans = async () => {
      try {
        const res = await axios.post("http://localhost:9002/get-challans");
        setChallans(res.data.challans);
      } catch (error) {
        console.error("Error fetching challans:", error);
      }
    };

    fetchChallans();
  }, []);

  console.log(challans)

  return (
    <div className="min-h-screen bg-[#fff8ec] p-6">
      <div className="flex items-center justify-center mb-10">
        <MdLocalPolice className="text-red-600 text-4xl mr-2" />
        <h1 className="text-3xl font-extrabold text-red-700 tracking-wide">
          Traffic Police Challan Records
        </h1>
      </div>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {challans.map((challan, idx) => (
          <div
            key={idx}
            className="bg-white shadow-xl border-l-4 border-red-500 rounded-lg p-5 hover:scale-[1.01] transition"
          >
            <p className="mb-2 ms-2"><b className="text-red-600 underline">Date</b> : {challan.createdAt.slice(0, 10)}</p>
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-bold text-gray-800">
                <FaCarCrash className="inline-block mr-1 text-red-500" />
                {challan?.vehical?.vehicalNo}
              </h2>
              <span className="bg-red-100 text-red-700 text-xs font-semibold px-3 py-1 rounded-full">
                UNPAID
              </span>
            </div>

            <div className="text-sm text-gray-700 space-y-1">
              <p>
                <FaUser className="inline-block mr-1 text-gray-600" />
                <b>Owner:</b>{" "}
                {challan.owner.fullName || "N/A"}
              </p>
              <p>
                <FaPhone className="inline-block mr-1 text-gray-600" />
                <b>Phone:</b>{" "}
                {typeof challan.owner?.phone === "string"
                  ? challan.owner.phone.slice(0, 6) + "******"
                  : "N/A"}

              </p>
              <p>
                <b>Model:</b> {challan.vehical.vehicalModel}
              </p>
              <p>
                <FaMoneyBillWave className="inline-block mr-1 text-green-600" />
                <b>Fine:</b> {challan.fineAmount}
              </p>
              <p>
                <FaExclamationTriangle className="inline-block mr-1 text-yellow-500" />
                <b>Reason:</b> {challan.reason}
              </p>
              {/* <p className="italic text-xs text-gray-500 mt-1">
                {challan.message}
              </p> */}
            </div>
          </div>
        ))}
      </div>

      {challans.length === 0 && (
        <div className="text-center mt-20 text-gray-500 text-xl font-medium">
          🛑 No Challan History Found
        </div>
      )}
    </div>
  );

}
