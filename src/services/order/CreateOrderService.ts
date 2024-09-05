import prismaClient from "../../prisma";

interface OrderRequest {
    table: number;
    name: string;
}

class CreateOrderService {
    async execute({ table, name }: OrderRequest) {
        // Criar pedido
        const order = await prismaClient.order.create({
            data: {
                table: table,
                name: name
            }

        });
        return order;
    }
}

export { CreateOrderService };
