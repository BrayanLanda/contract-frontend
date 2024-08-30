import { number, object, string, enum as zodEnum } from "zod";

 export const registerSchema = object ({
    nit: number().int().positive(),
    email: string().email("Invalid Email"),
    password: string().min(8, "Password must be more than 8 characters"),
    name: string().optional(),
    walletHash: string().min(1,"Wallet is required"),
    role: zodEnum(["USER", "ADMIN"]).optional().default("USER"),
 });

 export const loginSchema = object({
    email: string().email("Invalid Email"),
    password: string().min(1, "Password is required"),
 });