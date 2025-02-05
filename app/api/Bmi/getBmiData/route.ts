import ConnectToDb from "@/Lib/ConnectToDb";
import bmiTable from "@/Models/BmiSchema";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  const { token, target } = await req.json();

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  let decoded;
  try {
    decoded = jwt.verify(token, "your-secret-key") as { userId: string };
  } catch (error) {
    return NextResponse.json({ message: "Invalid or expired token" }, { status: 401 });
  }

  await ConnectToDb();

  const user = await bmiTable.findOne({ _id: decoded.userId });
  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  if (target === "myself") {
    // Return the user's own BMI data
    return NextResponse.json({ bmiData: user.bmi });
  } else {
    // Return BMI data from the friend whose Femail matches the target
    const friend = user.friend.find((f: any) => f.Femail === target);
    if (!friend) {
      return NextResponse.json({ message: "Friend not found" }, { status: 404 });
    }
    return NextResponse.json({ bmiData: friend.Fbmi });
  }
}
