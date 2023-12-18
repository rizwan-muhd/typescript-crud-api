import Astrologer from "../models/Astrologer";
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { HttpStatus } from "../types/httpstatus";
import ApiError from "../utils/ApiError";

export const register = asyncHandler(async (req: Request, res: Response) => {
  console.log("enter here", req.body);
  let { name, email }: { name: string; email: string } = req.body.values;
  email = email.toLowerCase();
  const isExistingEmail = await Astrologer.findOne({ email });
  if (isExistingEmail) {
    throw new ApiError("existing email", HttpStatus.CONFLICT);
  }
  // hashing password
  const astrologer = await Astrologer.create(req.body.values);
  //   const token = jwt.sign({ userId }, process.env.JWT_SECRET as string, {
  //     expiresIn: "2d",
  //   });
  res.json({
    status: "success",
    data: {
      astrologer,
    },
  });
});

export const updateAstrologer = asyncHandler(
  async (req: Request, res: Response) => {
    const updatedAstrologer = await Astrologer.findByIdAndUpdate(
      req.params.id,
      req.body.values,
      { new: true, runValidators: true }
    );

    res.json({
      status: "success",
      data: {
        updatedAstrologer,
      },
    });
  }
);

export const deleteAstrologer = asyncHandler(
  async (req: Request, res: Response) => {
    const astrologerData = await Astrologer.findByIdAndDelete(req.params.id);
    res.json({
      status: "success",
      astrologerData,
    });
  }
);

export const getAstrologers = asyncHandler(
  async (req: Request, res: Response) => {
    const astrologerData = await Astrologer.find({}).sort({ _id: -1 });
    res.json({
      status: "success",
      astrologerData,
    });
  }
);

export const getMyAstrologers = asyncHandler(
  async (req: Request, res: Response) => {
    const id: string = req.params.id; // Assuming the ID is in the URL params

    try {
      const astrologerData = await Astrologer.find({ _id: id });

      res.json({
        status: "success",
        astrologerData,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Internal Server Error",
      });
    }
  }
);
