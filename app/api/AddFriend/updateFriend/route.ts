import ConnectToDb from "@/Lib/ConnectToDb";
import bmiTable from "@/Models/BmiSchema";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function PUT(req: NextRequest) {
    const { friendId, Fname, Femail, token } = await req.json();

    console.log("friendId:", friendId, "Fname:", Fname, "Femail:", Femail);
    
    if (!friendId || !Fname || !Femail) {
        return NextResponse.json({ message: "Please fill all fields" }, { status: 400 });
    }

    if (!token) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        const decoded = jwt.verify(token, "your-secret-key") as { userId: string };

        await ConnectToDb();

        const user = await bmiTable.findOne({ _id: decoded.userId });
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        // Find friend by matching the friend _id with friendId
        const friendIndex = user.friend.findIndex((f: any) => f._id.toString() === friendId);
        if (friendIndex === -1) {
            return NextResponse.json({ message: "Friend not found" }, { status: 404 });
        }

        // Update the friend's name and email
        user.friend[friendIndex].Fname = Fname;
        user.friend[friendIndex].Femail = Femail;

        await user.save();

        return NextResponse.json({ message: "Friend updated successfully" });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Error updating friend" }, { status: 500 });
    }
}
