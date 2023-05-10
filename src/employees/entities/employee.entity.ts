import { BaseEntity } from 'src/common/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'employees' })
export class Employee extends BaseEntity {
  @Column()
  public firstName: string;

  @Column()
  public lastName: string;

  @Column()
  public gender: string;

  @Column()
  public birthDate: Date;

  @Column()
  public hireDate: Date;
}
