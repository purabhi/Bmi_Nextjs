import ConnectToDb from "@/Lib/ConnectToDb";
import bmiTable from "@/Models/BmiSchema";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

// POST: Save BMI record either to user.bmi or a friend’s Fbmi array
export async function POST(req: NextRequest) {
  const { target, Weight, Height, Age, Gender, date, bmi, token } = await req.json();

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  let decoded;
  try {
    decoded = jwt.verify(token, "your-secret-key") as { userId: string, username: string };
  } catch (error) {
    return NextResponse.json({ message: "Invalid or expired token" }, { status: 401 });
  }

  try {
    await ConnectToDb();
    const user = await bmiTable.findOne({ _id: decoded.userId });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    if (target === "myself") {
      // Save BMI in user's bmi array.
      user.bmi.push({
        Weight,
        Height,
        Age,
        Gender,
        date,
        bmiValue: bmi
      });
    } else {
      // Target is a friend's email; find the friend in user.friend array.
      const friendIndex = user.friend.findIndex((f: any) => f.Femail === target);
      if (friendIndex === -1) {
        return NextResponse.json({ message: "Friend not found" }, { status: 404 });
      }
      // Save BMI in the friend's Fbmi array.
      user.friend[friendIndex].Fbmi.push({
        Fheight: Height,
        Fweight:Weight,
        Fage: Age,
        Fgender: Gender,
        date,
        FbmiValue: bmi
      });
    }

    await user.save();
    return NextResponse.json({ message: "BMI saved successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error saving BMI" }, { status: 500 });
  }
}
