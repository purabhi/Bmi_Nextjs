import ConnectToDb from "@/Lib/ConnectToDb";
import bmiTable from "@/Models/BmiSchema";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function DELETE(req: NextRequest) {
    const { friendId,Femail,Fname ,token } = await req.json();

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

        // Filter out the friend to delete
        user.friend = user.friend.filter((f:any) => f._id.toString() !== friendId);

        await user.save();

        return NextResponse.json({ message: "Friend deleted successfully" });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Error deleting friend" }, { status: 500 });
    }
}