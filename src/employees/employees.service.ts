import { Inject, Injectable } from '@nestjs/common';
import { EmployeeRepository } from './repositories/employee.repository';

import { EmployeeRepositoryInterface } from './interfaces/employee-repository.interface';
import { PaginationOptionsDto } from 'src/common/dtos/pagination/pagination-options.dto';
import { PaginationMetaDto } from 'src/common/dtos/pagination/pagination-meta.dto';
import { BasePaginationDto } from 'src/common/dtos/pagination/base-pagination.dto';

@Injectable()
export class EmployeesService {
  constructor(
    @Inject(EmployeeRepository)
    private employeeRepository: EmployeeRepositoryInterface,
  ) {}

  findAll() {
    return this.employeeRepository.findAll({ take: 100 });
  }

  findOne(id: number) {
    return this.employeeRepository.findOne({ where: { empNo: id } });
  }

  async streamEmployees(paginationOptionsDto: PaginationOptionsDto) {
    const employees = await this.employeeRepository.streamEmployees(
      paginationOptionsDto,
    );

    const paginationMetaDto = new PaginationMetaDto({
      itemCount: employees.length,
      paginationOptionsDto,
    });

    paginationMetaDto.nextCursor = employees[employees.length - 1].empNo;

    return new BasePaginationDto(employees, paginationMetaDto);
  }
}
