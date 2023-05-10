import { BaseRepositoryInterface } from 'src/common/repositories/base/interfaces/base-repository.interface';
import { Repository } from 'typeorm';

export abstract class BaseRepository<T> implements BaseRepositoryInterface<T> {
  constructor(private entity: Repository<T>) {}

  findAll(filterCondition: any): Promise<T[]> {
    return this.entity.find(filterCondition);
  }

  findOne(filterCondition: any): Promise<T> {
    return this.entity.findOne(filterCondition);
  }
}
