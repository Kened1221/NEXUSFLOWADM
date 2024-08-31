import { NextResponse } from 'next/server';
import connectDB from '@/libs/mongodb';
import bcrypt from 'bcrypt';
import User from '@/models/user';
import jwt from 'jsonwebtoken';

connectDB();

export async function POST(req) {
  try {
    const data = await req.json();

    if (!data.token || !data.password) {
      return NextResponse.json(
        {
          message: 'Todos los campos son requeridos',
        },
        { status: 400 },
      );
    }

    const decoded = jwt.verify(data.token, process.env.JWT_SECRET);
    const { data: dataDecoded } = decoded;

    const userFind = await User.findById(dataDecoded.id);

    if (!userFind) {
      return NextResponse.json(
        {
          message: 'No existe el usuario',
        },
        { status: 400 },
      );
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    userFind.password = hashedPassword;

    await userFind.save();

    return NextResponse.json(
      { message: 'Contraseña restablecida con exito' },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
