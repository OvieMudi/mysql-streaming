import { Employee } from 'src/employees/entities/employee.entity';
import { QueryBuilder, QueryRunner } from 'typeorm';
import { RelationIdLoader } from 'typeorm/query-builder/relation-id/RelationIdLoader';
import { RelationCountLoader } from 'typeorm/query-builder/relation-count/RelationCountLoader';
import { RawSqlResultsToEntityTransformer } from 'typeorm/query-builder/transformer/RawSqlResultsToEntityTransformer';

export class QueryUtils {
  public static getRelationIdLoader(
    queryBuilder: QueryBuilder<Employee>,
    queryRunner: QueryRunner,
  ) {
    return new RelationIdLoader(
      queryBuilder.connection,
      queryRunner,
      queryBuilder.expressionMap.relationIdAttributes,
    );
  }

  public static getRelationCountLoader(
    queryBuilder: QueryBuilder<Employee>,
    queryRunner: QueryRunner,
  ) {
    return new RelationCountLoader(
      queryBuilder.connection,
      queryRunner,
      queryBuilder.expressionMap.relationCountAttributes,
    );
  }

  public static async getRawDataToEntityTransformer(
    queryBuilder: QueryBuilder<Employee>,
  ) {
    const queryRunner = queryBuilder.connection.createQueryRunner();

    const relationIdLoader = QueryUtils.getRelationIdLoader(
      queryBuilder,
      queryRunner,
    );

    const relationCountLoader = QueryUtils.getRelationCountLoader(
      queryBuilder,
      queryRunner,
    );

    const rawRelationIdResults = await relationIdLoader.load([Employee]);
    const rawRelationCountResults = await relationCountLoader.load([Employee]);

    return new RawSqlResultsToEntityTransformer(
      queryBuilder.expressionMap,
      queryRunner.connection.driver,
      rawRelationIdResults,
      rawRelationCountResults,
      queryRunner,
    );
  }
}
