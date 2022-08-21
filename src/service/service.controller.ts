import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { IsWorker } from 'src/common/guards/isWorker.guard';
import { CreateServiceDto } from './dto/createService.dto';
import { UpdateServiceDto } from './dto/updateService.dto';
import { ServiceService } from './service.service';

@Controller('service')
export class ServiceController {
  constructor(private serviceService: ServiceService) {}

  @Get('/')
  getAllServices() {
    return this.serviceService.getAllServices();
  }

  @Get('/:id')
  getService(@Param('id') id: string) {
    return this.serviceService.findServiceById(parseInt(id));
  }

  @IsWorker()
  @Post('/')
  createService(@Body() body: CreateServiceDto) {
    return this.serviceService.createService(body);
  }

  @IsWorker()
  @Patch('/:id')
  updateService(
    @Param('id') id: string,
    @Body() body: Partial<UpdateServiceDto>,
  ) {
    return this.serviceService.updateService(parseInt(id), body);
  }

  // @Delete('/delete/:id')
  // deleteService(@Param('id') id: string) {
  //   return this.serviceService.deleteService(parseInt(id));
  // }
}
