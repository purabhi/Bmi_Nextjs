import ConnectToDb from "@/Lib/ConnectToDb";
import bmiTable from "@/Models/BmiSchema";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req: NextRequest) {
    const token = req.headers.get("authorization");

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

        return NextResponse.json({ friends: user.friend });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Error fetching friends" }, { status: 500 });
    }
}
