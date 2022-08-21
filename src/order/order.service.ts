import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderDto } from './dto/createOrder.dto';
import { GetAllOrdersQueryDto } from './dto/getAllOrdersQuery.dto';
import { UpdateOrderDto } from './dto/updateOrder.dto';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async getOrderById(orderId: number) {
    const order = await this.prisma.order.findFirst({
      where: { id: orderId },
      include: { user: true, service: true, worker: true },
    });

    if (!order) throw new NotFoundException('order not found');
    return order;
  }

  async getAllOrders(query: Partial<GetAllOrdersQueryDto>) {
    console.log(query);
    let workerId;
    if (query.workerId) {
      workerId = parseInt(query.workerId);
    }
    return this.prisma.order.findMany({
      where: {
        status: query?.status,
        workerId,
      },
      include: { service: true, user: true, worker: true },
    });
  }

  async getAllOrdersForUser(
    userId: number,
    query: Partial<GetAllOrdersQueryDto>,
  ) {
    const response = await this.prisma.order.findMany({
      where: { userId },
      include: { service: true, worker: true },
    });

    if (!response) throw new BadRequestException('invalid request');

    return response;
  }

  async createOrder(orderData: CreateOrderDto, userId: number) {
    return this.prisma.order.create({
      data: {
        address: orderData.address,
        description: orderData.description,
        serviceId: parseInt(orderData.serviceId),
        userId: userId,
        status: orderData.status,
      },
    });
  }

  async updateOrder(
    orderData: UpdateOrderDto,
    orderId: number,
    userId: number,
  ) {
    const response = await this.prisma.order.update({
      where: { id: orderId },
      include: {
        worker: true,
        user: true,
        service: true,
      },
      data: {
        status: orderData.status,
        workerId: userId,
      },
    });

    if (!response) throw new NotFoundException('order not found');

    return response;
  }
}
