import { BaseRepositoryInterface } from 'src/common/repositories/base/interfaces/base-repository.interface';
import { Employee } from '../entities/employee.entity';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { PaginationOptionsDto } from 'src/common/dtos/pagination/pagination-options.dto';

export interface EmployeeRepositoryInterface
  extends BaseRepositoryInterface<Employee> {
  findAll(filterManyCondition: FindManyOptions<Employee>): Promise<Employee[]>;

  findOne(filterManyCondition: FindOneOptions<Employee>): Promise<Employee>;

  streamEmployees(
    paginationOptionsDto: PaginationOptionsDto,
  ): Promise<Employee[]>;
}
