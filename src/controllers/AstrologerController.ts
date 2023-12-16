import Astrologer from "../models/Astrologer";
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { HttpStatus } from "../types/httpstatus";
import ApiError from "../utils/ApiError";

export const register = asyncHandler(async (req: Request, res: Response) => {
  console.log("enter here");
  let { name, email }: { name: string; email: string } = req.body;
  email = email.toLowerCase();
  const isExistingEmail = await Astrologer.findOne({ email });
  if (isExistingEmail) {
    throw new ApiError("existing email", HttpStatus.CONFLICT);
  }
  // hashing password
  const astrologer = await Astrologer.create(req.body);
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
    console.log("enter here");
    let { name, email }: { name: string; email: string } = req.body;
    email = email.toLowerCase();
    const isExistingEmail = await Astrologer.findOne({ email });
    //   if (isExistingEmail) {
    //     throw new AppError("existing email", HttpStatus.UNAUTHORIZED)
    //   }
    // hashing password
    const updatedAstrologer = await Astrologer.findByIdAndUpdate(
      req.params.id,
      req.body, // Use the entire req.body for the update
      { new: true, runValidators: true }
    );

    //   const token = jwt.sign({ userId }, process.env.JWT_SECRET as string, {
    //     expiresIn: "2d",
    //   });
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
    const astrologerData = await Astrologer.find({});
    res.json({
      status: "success",
      astrologerData,
    });
  }
);
