
import { hash } from "bcryptjs";
import prismaClient from "../../prisma";
interface UserRequest{
    name: string;
    email: string;
    password: string;
}

class CreateUserServices{
    async execute({name, email, password}: UserRequest){
        console.log(name)

        //verifica se enviou um email
        if(!email){
            throw new Error("Email incorrect");
        }

        //verifica se esse email já está cadastrado
        const userAlreadyExists = await prismaClient.user.findFirst({
            where:{
                email: email
            }
        });

        if(userAlreadyExists){
            throw new Error("User already exists");
        }

        const passwordHash = await hash(password, 8);

        const user = await prismaClient.user.create({
            data:{
                name: name,
                email: email,
                password: passwordHash
            },
            select:{
                id: true,
                name: true,
                email: true,
                created_at: true
            }
        });


        return user;
    }

}

export { CreateUserServices };
