import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
    const body = await req.json();
    const { firstName, lastName, email, password, confirmPassword, phone } = body;

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
        return NextResponse.json({ error: 'All required fields must be filled.' }, { status: 400 });
    }

    if (password !== confirmPassword) {
        return NextResponse.json({ error: 'Passwords do not match.' }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
        return NextResponse.json({ error: 'Email already exists.' }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
        data: {
            firstName,
            lastName,
            email,
            password: hashedPassword,
            phone
        }
    });

    return NextResponse.json({ message: 'User registered successfully.' });
}
