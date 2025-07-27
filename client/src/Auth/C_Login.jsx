import React, { useState } from "react";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { MdOutlineLocalPolice } from "react-icons/md";

export default function C_Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSumbit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://toe-smart.onrender.com/customer/login", formData);
      console.log(res.data)
      if (res.data) {
        localStorage.setItem("Customer", JSON.stringify(res.data.customer));
        toast.success("Login Successfully as customer");

        setTimeout(() => {
          window.location.reload();
        }, 2000);
        // navigate("/home");
      }
    } catch (error) {
      toast.error("Invalid email or password");
    }

    setFormData({
      email: "",
      password: "",
    });
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center px-4"
      style={{
        backgroundImage: `url('https://images.wallpaperscraft.com/image/single/road_marking_traffic_lights_167544_1280x800.jpg')`,
        backgroundColor: "#fdf6e3", // fallback color for traffic background
      }}
    >
      <div className="w-full max-w-2xl bg-opacity-80 backdrop-blur-md rounded-xl border border-yellow-700 p-8 shadow-2xl">
        <form className="flex flex-col items-center" onSubmit={handleFormSumbit}>
          <div className="flex items-center gap-2 mb-6">
            <MdOutlineLocalPolice className="text-3xl text-yellow-700 animate-pulse" />
            <h1 className="text-2xl sm:text-3xl font-bold text-yellow-800">Customer Login</h1>
          </div>

          <div className="w-full flex flex-col gap-4">
            {/* Email */}
            <TextField
              id="email"
              label="Email"
              value={formData.email}
              name="email"
              onChange={handleInputChange}
              variant="outlined"
              placeholder="Enter your email"
              className="w-full"
              required
            />
            {/* Password */}
            <TextField
              type="password"
              id="password"
              label="Password"
              value={formData.password}
              name="password"
              onChange={handleInputChange}
              variant="outlined"
              placeholder="Enter your password"
              className="w-full"
              required
            />
          </div>

          <Link
            to="/forget"
            className="mt-2 self-end text-sm text-blue-500 hover:underline"
          >
            Forgot password?
          </Link>

          <div className="mt-6 w-full">
            <Button
              variant="contained"
              color="warning"
              className="w-full"
              type="submit"
            >
              Login
            </Button>
          </div>

          <div className="mt-4 flex flex-col sm:flex-row items-center justify-center text-center gap-1">
            <p className="text-sm font-medium">Are you admin ? </p>
            <Link to="/login" className="text-orange-100 hover:underline text-sm">
              Login as Admin
            </Link>
          </div>
          <div className="mt-4 flex flex-col sm:flex-row items-center justify-center text-center gap-1">
            <p className="text-sm font-medium">Don't have an account ? </p>
            <Link to="/c/signup" className="text-orange-100 hover:underline text-sm">
              Sign up as Customer
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
