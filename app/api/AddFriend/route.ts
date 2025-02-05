import ConnectToDb from "@/Lib/ConnectToDb";
import bmiTable from "@/Models/BmiSchema";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

// For POST Request: Add a friend for the logged-in user
export async function POST(req: NextRequest) {
    const { Fname, Femail, token } = await req.json();

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

        // Check if a friend with the provided Femail already exists
        const friendExists = user.friend.some((f: any) => f.Femail === Femail);
        if (friendExists) {
            return NextResponse.json({ message: "Friend with this email already exists" }, { status: 400 });
        }

        // Add the new friend according to the new schema:
        user.friend.push({
            Fname: Fname,  
            Femail: Femail,   
            Fbmi: []  
        });

        await user.save();

        return NextResponse.json({ message: "Friend added successfully" });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Error adding friend" }, { status: 500 });
    }
}
