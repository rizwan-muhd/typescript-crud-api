import { Schema, model } from "mongoose";

const AstrologerSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "please add a name"],
    },
    gender: {
      type: String,
      required: [true, "please add a gender"],
    },
    email: {
      type: String,
      required: [true, "please add a email"],
      unique: true,
    },
    languages: {
      type: Array,
      required: [true, "please choose languages"],
    },
    specialties: {
      type: Array,
      required: [true, "please choose specialties"],
    },
  },
  {
    timestamps: true,
  }
);

export default model("Astrologer", AstrologerSchema);
