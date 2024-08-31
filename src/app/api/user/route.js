import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import bcrypt from 'bcrypt';
import connectDB from '@/libs/mongodb';
import User from '@/models/user';

connectDB();

export async function POST(req) {
    try {
        const data = await req.json();
        const token = await getToken({ req });
        // validate token exists
        if (token) {
            // validate role token
            if (token.role === 'administrador') {
                // confirm data exists
                if (
                    !data.name ||
                    !data.username ||
                    !data.password ||
                    !data.email ||
                    !data.role
                ) {
                    return NextResponse.json(
                        {
                            message: 'Todos los campos son requeridos',
                        },
                        { status: 400 },
                    );
                }
                // check for duplicates email
                const emailFound = await User.findOne({
                    email: data.email,
                }).exec();

                if (emailFound) {
                    return NextResponse.json(
                        {
                            message: 'El correo ya se encuentra registrado.',
                        },
                        { status: 400 },
                    );
                }
                // check for duplicates username

                const usernameFound = await User.findOne({
                    username: data.username,
                }).exec();

                if (usernameFound) {
                    return NextResponse.json(
                        {
                            message: 'El Usuario ya existe.',
                        },
                        { status: 400 },
                    );
                }

                // create new User

                const hashPassword = await bcrypt.hash(data.password, 10);
                data.password = hashPassword;

                await User.create({
                    name: data.name,
                    email: data.email,
                    username: data.username,
                    password: data.password,
                    role: data.role,
                    image:
                        'https://res.cloudinary.com/djbh5z6t8/image/upload/v1702141512/khbs48rk5b2kdy9a5tbc.jpg',
                });

                return NextResponse.json(
                    {
                        message: 'Usuario creado.',
                    },
                    { status: 200 },
                );
            }
            return NextResponse.json(
                { message: 'Token no autorizado' },
                { status: 400 },
            );
        }
        return NextResponse.json({ message: 'No existe token' }, { status: 400 });
    } catch (error) {
        return NextResponse.json({ message: 'Error', error }, { status: 500 });
    }
}

export async function GET(req) {
    try {
        const token = await getToken({ req });
        if (token) {
            if (token.role === 'administrador') {
                const data = await User.find().exec();
                return NextResponse.json(data);
            }
            return NextResponse.json({ message: 'Token no válido' }, { status: 400 });
        }
        return NextResponse.json({ message: 'No existe token' }, { status: 400 });
    } catch (error) {
        return NextResponse.json({ message: 'Error', error }, { status: 500 });
    }
}
