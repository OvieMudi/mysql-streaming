import { BaseRepository } from 'src/common/repositories/base/base.repository';
import { Employee } from '../entities/employee.entity';
import { Injectable } from '@nestjs/common';
import { EmployeeRepositoryInterface } from '../interfaces/employee-repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QueryUtils } from 'src/common/utils/query.util';
import { PaginationOptionsDto } from 'src/common/dtos/pagination/pagination-options.dto';

@Injectable()
export class EmployeeRepository
  extends BaseRepository<Employee>
  implements EmployeeRepositoryInterface
{
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {
    super(employeeRepository);
  }

  public async streamEmployees(
    paginationOptionsDto: PaginationOptionsDto,
  ): Promise<Employee[]> {
    const queryBuilder = this.employeeRepository.createQueryBuilder();

    const employeesReadStream = await queryBuilder
      .where('Employee.empNo > :cursor', {
        cursor: paginationOptionsDto.cursor,
      })
      .orderBy('Employee.empNo', paginationOptionsDto.order)
      .take(paginationOptionsDto.limit)
      .stream();

    const transformer = await QueryUtils.getRawDataToEntityTransformer(
      queryBuilder,
    );

    return new Promise((resolve, reject) => {
      const employees = [];

      employeesReadStream.on('data', async (chunk) => {
        employees.push(
          this.employeeRepository.create(
            transformer.transform(
              [chunk],
              queryBuilder.expressionMap.mainAlias,
            )[0],
          ),
        );
      });

      employeesReadStream.on('end', () => {
        resolve(employees);
      });

      employeesReadStream.on('error', reject);
    });
  }
}
