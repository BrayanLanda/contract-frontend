import { prisma } from "@/app/_lib/prisma";
import { registerSchema } from "@/app/_lib/zod";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { nit, email, password, name, walletHash, role } =
      registerSchema.parse(body);

    //Varificar si el usuario ya existe
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "The user already exists" },
        { status: 400 }
      );
    }

    //hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    //Crear el usuario
    const user = await prisma.user.create({
      data: {
        nit,
        email,
        password: hashedPassword,
        name,
        walletHash,
        role: role || "USER",
      },
    });

    console.log("Created User", user)

    return NextResponse.json(
      { message: "User successfully created" },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error en el registro:', error); // Agregar este log
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: 'Error desconocido en el registro' }, { status: 400 });
  }
}
