import ConnectToDb from "@/Lib/ConnectToDb";
import bmiTable from "@/Models/BmiSchema";
import { NextRequest, NextResponse } from "next/server";

// For POST Request (Register New User)
export async function POST(req: NextRequest) {
    try {
        // Parse request body
        const { Name, Email, Pass } = await req.json();

        // Connect to the database
        await ConnectToDb();

        // Check if a user with the same email already exists
        const existingUser = await bmiTable.findOne({ Email });

        if (existingUser) {
            return NextResponse.json({ message: "User already exists" }, { status: 400 });
        }

        // Create a new user with empty friend and BMI arrays
        const newUser = new bmiTable({
            Name,
            Email,
            Pass,
            bmi: [],  // Empty BMI array
            friend: []  // Empty friend array
        });

        // Save the new user in the database
        await newUser.save();

        return NextResponse.json({ message: "User registered successfully" }, { status: 201 });
    } catch (error) {
        console.error("Error registering user:", error);
        return NextResponse.json({ message: "Error registering user" }, { status: 500 });
    }
}
