import { signJwtAccessToken } from "@/app/_lib/jwt";
import { prisma } from "@/app/_lib/prisma";
import { loginSchema } from "@/app/_lib/zod";
import bcrypt from 'bcrypt';
import { NextResponse } from "next/server";


export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, password } = loginSchema.parse(body);

        const user = await prisma.user.findUnique({
            where: { email }
        });

        if(!user || !(await bcrypt.compare(password, user.password))){
            return NextResponse.json({ erro: "Invalid credentials"}, {status: 401});
        }

        const { password: _, ...userWithoutPass } = user;
        const accessToken = signJwtAccessToken(userWithoutPass);

        return NextResponse.json({ accessToken });
    } catch (error) {
        return NextResponse.json({ error: "Data invalid"}, {status: 400});
    }
}