import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { name, category, location, description } = body;

    if (!name || !category || !location || !description) {
        return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }

    try {
        const user = await prisma.user.findUnique({ where: { email: session.user.email } });

        if (!user) {
            return NextResponse.json({ error: 'User not found.' }, { status: 404 });
        }

        const newService = await prisma.serviceProvider.create({
            data: {
                name,
                category,
                location,
                description,
                userId: user.id,
            },
        });

        return NextResponse.json({ message: 'Service created successfully!', service: newService });
    } catch (error) {
        console.error('Error creating service:', error);
        return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
    }
} 