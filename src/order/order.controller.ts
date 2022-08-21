import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { Role } from '@prisma/client';
import { Request } from 'express';
import { IsWorker } from 'src/common/guards/isWorker.guard';
import { CreateOrderDto } from './dto/createOrder.dto';
import { GetAllOrdersQueryDto } from './dto/getAllOrdersQuery.dto';
import { UpdateOrderDto } from './dto/updateOrder.dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get('/')
  async getAllOrders(
    @Req() request: Request,
    @Query() query: Partial<GetAllOrdersQueryDto>,
  ) {
    if (request.currentUser.role === Role.WORKER) {
      return this.orderService.getAllOrders(query);
    }

    return this.orderService.getAllOrdersForUser(request.currentUser.id, query);
  }

  @IsWorker()
  @Get('/:id')
  async getOneOrder(@Param('id') id: string) {
    return this.orderService.getOrderById(parseInt(id));
  }

  @Post('/')
  async createOrder(@Body() body: CreateOrderDto, @Req() request: Request) {
    console.log(body, request.currentUser.id);
    return this.orderService.createOrder(body, request.currentUser.id);
  }

  @IsWorker()
  @Patch('/:id')
  async updateOrder(
    @Body() body: UpdateOrderDto,
    @Param('id') id: string,
    @Req() request: Request,
  ) {
    return this.orderService.updateOrder(
      body,
      parseInt(id),
      request.currentUser.id,
    );
  }
}
