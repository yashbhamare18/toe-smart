import mongoose from "mongoose";

const ChallanSchema = new mongoose.Schema({

  vehical: { type: mongoose.Types.ObjectId, ref: "Vehical" },
  owner: { type: mongoose.Types.ObjectId, ref: "Customer" },
  fineAmount : {type : String, required : true},
  reason : {type : String, required : true},
  message : {type : String, required : true},
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Challan", ChallanSchema);
