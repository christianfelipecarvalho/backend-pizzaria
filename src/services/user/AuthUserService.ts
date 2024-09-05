import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import prismaClient from "../../prisma";
interface AuthRequest {
    email: string;
    password: string;
}


class AuthUserService {
    async execute({ email, password }: AuthRequest) {
        // Verificar se o email é válido
        const user = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        });
        if (!user) {
            throw new Error("Email/Password incorrect");
        }
        // Verificar se a senha é válida

        const passwordMatch = await compare(password, user.password);
        if (!passwordMatch) {
            throw new Error("Email/Password incorrect");
        }

        // Gerar token JWT
        const token = sign(
            {
                name: user.name,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                subject: user.id,
                expiresIn: '30d'
            }
        );

        // Retornar token
        return { 
            id: user.id,
            name: user.name,
            email: user.email,
            token: token,
        }
    }
}

export { AuthUserService };
