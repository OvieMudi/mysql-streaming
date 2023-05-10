export interface BaseRepositoryInterface<T> {
  findAll(filterCondition: any): Promise<T[]>;

  findOne(filterCondition: any): Promise<T>;
}
