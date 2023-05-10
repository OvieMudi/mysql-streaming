import { Module } from '@nestjs/common';
import { EmployeesModule } from './employees/employees.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [EmployeesModule, DatabaseModule, ConfigModule.forRoot()],
})
export class AppModule {}
