import Customer from "../models/CustomerSchema.js";
import bcryptjs from "bcryptjs";
import Vehical from "../models/VehicalSchema.js"

export const signUpCustomer = async (req, res) => {
  try {
    let { fullName, email, password, phone, vehicalNo, vehicalModel } =
      req.body;

    // Check if customer already exists
    const existingCustomer = await Customer.findOne({ email });
    if (existingCustomer) {
      return res.status(400).json({ message: "Customer already exists" });
    }

    // Hash the password
    const hashedPass = await bcryptjs.hash(password, 10);

    // Create and save customer
    const newCustomer = new Customer({
      email,
      password: hashedPass,
      fullName,
      phone,
      vehicalModel,
      vehicalNo,
    });

    const savedCustomer = await newCustomer.save();

    // Create and save vehicle, linked to the customer
    const newVehical = new Vehical({
      vehicalNo,
      vehicalModel,
      vehicalOwner: savedCustomer._id,
    });

    await newVehical.save();

    res.status(201).json({
      message: "Customer and Vehicle Created Successfully",
      customer: savedCustomer,
    });
  } catch (error) {
    console.error("Error in signUpCustomer:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const loginCustomer = async (req, res) => {
  let { email, password } = req.body;
  const customer = await Customer.findOne({ email });

  const isMatched = await bcryptjs.compare(password, customer.password);
  if (!customer || !isMatched) {
    res.status(400).json({ message: "Invalid Email or Password" });
  } else {
    res.status(201).json({
      message: "Login Successfull as customer",
      customer
    });
  }
};

export const getMyChallans = async(req, res) => {
  const { customerId } = req.body;

  try {
    const customer = await Customer.findById(customerId).populate({
      path: "challans",
      populate: {
        path: "vehical",
        model: "Vehical",
      },
    });

    if (!customer) {
      return res
        .status(404)
        .json({ success: false, message: "Customer not found" });
    }

    res.status(200).json({ success: true, challans: customer.challans });
  } catch (err) {
    console.error("Error fetching challans:", err);
    res
      .status(500)
      .json({
        success: false,
        message: "Server error while fetching challans",
      });
  }
}
