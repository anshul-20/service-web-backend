import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateServiceDto } from './dto/createService.dto';
import { UpdateServiceDto } from './dto/updateService.dto';

@Injectable()
export class ServiceService {
  constructor(private prisma: PrismaService) {}
  async getAllServices() {
    const response=await this.prisma.service.findMany();
    console.log(response)
    return response
  }

  async findServiceById(serviceId: number) {
    try {
      const response = await this.prisma.service.findFirst({
        where: { id: serviceId },
      });

      return response;
    } catch (err) {
      throw new BadRequestException('something went wrong');
    }
  }

  async createService(serviceData: CreateServiceDto) {
    return this.prisma.service.create({
      data: {
        name: serviceData.name,
        price: serviceData.price,
      },
    });
  }

  async updateService(
    serviceId: number,
    serviceData: Partial<UpdateServiceDto>,
  ) {
    const response = await this.prisma.service.update({
      where: { id: serviceId },
      data: { ...serviceData },
    });

    if (!response) throw new NotFoundException('service not found');

    return response;
  }

  async deleteService(serviceId: number) {
    try {
      const response = await this.prisma.service.delete({
        where: { id: serviceId },
      });
      return response;
    } catch (err) {
      throw new NotFoundException('service not found');
    }
  }
}
