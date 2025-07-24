import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function CustomerChallans() {
  const [challans, setChallans] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedChallan, setSelectedChallan] = useState(null);
  const navigate = useNavigate()

  const fetchChallans = async () => {
    try {
      const customerId = JSON.parse(localStorage.getItem("Customer"))?._id;
      if (!customerId) {
        toast.error("User not logged in.");
        return;
      }

      const res = await axios.post("http://localhost:9002/c/get-challans", {
        customerId,
      });

      if (res.data.success) {
        setChallans(res.data.challans);
      } else {
        toast.error("Failed to fetch challans.");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while fetching challans.");
    }
  };



  useEffect(() => {
    fetchChallans();
  }, []);

  const handlePayClick = (challan) => {
    setSelectedChallan(challan);
    setShowModal(true);
  };

  const handleConfirmPayment = async () => {
    try {
      const res = await axios.delete(`http://localhost:9002/c/delete-challan/${selectedChallan._id}`);
      if (res.data.success) {
        toast.success("Challan paid and removed successfully!");
        setChallans(prev => prev.filter(c => c._id !== selectedChallan._id)); // update UI
        setShowModal(false);
      } else {
        toast.error("Failed to delete challan.");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while deleting challan.");
    }
  };

  return (
    <div className="p-6 bg-[#f0f4f8] min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-[#1e3a8a] border-b-2 border-[#1e3a8a] pb-2">
        📄 Your Challans
      </h2>

      {challans.length === 0 ? (
        <p className="text-gray-600">No challans found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {challans.map((challan, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#1e3a8a] shadow-lg rounded-md p-4 text-sm"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold text-[#1e3a8a]">
                  Parking Violation
                </h3>
                <span className="bg-red-600 text-white text-xs px-3 py-1 rounded-full">
                  Unpaid
                </span>
              </div>

              <p className="text-gray-700 mb-1">
                <b>Fine:</b> ₹{challan.fineAmount}
              </p>
              <p className="text-gray-700 mb-1">
                <b>Reason:</b> {challan.reason}
              </p>
              <p className="text-gray-700 mb-1">
                <b>Message:</b> {challan.message}
              </p>
              <p className="text-gray-700 mb-1">
                <b>Date:</b>{" "}
                {new Date(challan.createdAt).toLocaleDateString()}
              </p>
              <p className="text-gray-700 mb-4">
                <b>Vehicle:</b>{" "}
                {challan.vehical?.vehicalModel} ({challan.vehical?.vehicalNo})
              </p>

              <div className="flex justify-between items-center mt-2">
                <button
                  onClick={() => handlePayClick(challan)}
                  className="bg-[#1e3a8a] text-white px-3 py-1 text-xs rounded hover:bg-[#172c63]"
                >
                  Pay Now
                </button>
                <button className="border border-[#1e3a8a] text-[#1e3a8a] px-3 py-1 text-xs rounded hover:bg-[#e3eafc]" onClick={() => {
                  navigate("/contact")
                }}>
                  Contact Us
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white rounded-md shadow-xl p-6 w-[90%] max-w-md">
            <h2 className="text-lg font-semibold mb-4 text-[#1e3a8a]">
              Confirm Payment
            </h2>
            <p className="text-gray-700 mb-6">
              Are you sure you want to pay ₹
              <b>{selectedChallan?.fineAmount}</b> for your vehicle{" "}
              <b>{selectedChallan?.vehical?.vehicalModel}</b> (
              {selectedChallan?.vehical?.vehicalNo})?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border border-gray-400 rounded-md hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmPayment}
                className="px-4 py-2 bg-[#1e3a8a] text-white rounded-md hover:bg-[#172c63]"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
