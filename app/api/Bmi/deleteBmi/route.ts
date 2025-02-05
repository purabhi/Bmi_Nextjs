import ConnectToDb from "@/Lib/ConnectToDb";
import bmiTable from "@/Models/BmiSchema";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function DELETE(req: NextRequest) {
    try {
        const { target, bmiId, token } = await req.json();  // `target` is either "myself" or a friend's email

        if (!token) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const decoded = jwt.verify(token, "your-secret-key") as { userId: string };

        await ConnectToDb();

        const user = await bmiTable.findOne({ _id: decoded.userId });

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        if (target === "myself") {
            // Remove specific BMI entry from `bmi` array
            user.bmi = user.bmi.filter((entry: any) => entry._id.toString() !== bmiId);
        } else {
            // Find the friend and remove BMI entry from their `Fbmi` array
            const friendIndex = user.friend.findIndex((f: any) => f.Femail === target);
            
            if (friendIndex === -1) {
                return NextResponse.json({ message: "Friend not found" }, { status: 404 });
            }

            user.friend[friendIndex].Fbmi = user.friend[friendIndex].Fbmi.filter((entry: any) => entry._id.toString() !== bmiId);
        }

        await user.save();

        return NextResponse.json({ message: "BMI entry deleted successfully" }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Error deleting BMI entry" }, { status: 500 });
    }
}
