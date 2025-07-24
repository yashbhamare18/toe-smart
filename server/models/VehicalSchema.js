import mongoose from "mongoose";
import { type } from "os";

const VehicalSchema = new mongoose.Schema({
  vehicalNo: {
    type: String,
    required: true,
    unique: true,
  },
  vehicalModel: {
    type: String,
    required: true,
  },
  vehicalOwner: {
    type: mongoose.Types.ObjectId,
    ref: "Customer",
  },
});

export default mongoose.model("Vehical", VehicalSchema);
