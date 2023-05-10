import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { PaginationOptionsDto } from 'src/common/dtos/pagination/pagination-options.dto';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  findAll() {
    return this.employeesService.findAll();
  }

  @Get('stream')
  async streamEmployees(@Query() paginationOptionsDto: PaginationOptionsDto) {
    return this.employeesService.streamEmployees(paginationOptionsDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeesService.findOne(+id);
  }
}
