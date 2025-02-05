import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import bmiTable from '@/Models/BmiSchema';  
import ConnectToDb from '@/Lib/ConnectToDb';  

export async function POST(req: NextRequest) {
    const { Email, Pass } = await req.json();

    await ConnectToDb();
    const user = await bmiTable.findOne({ Email });

    if (!user || user.Pass !== Pass) {
        return NextResponse.json({ message: 'Invalid email or password' }, { status: 400 });
    }

    
    const token = jwt.sign({ userId: user._id, username: user.Email,user:user }, 'your-secret-key', {
        expiresIn: '1h', 
    });

  
    return NextResponse.json({ message: 'Login successful', token });
}