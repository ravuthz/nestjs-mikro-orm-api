import { Dictionary, IPrimaryKey, Options } from '@mikro-orm/core';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { Logger, NotFoundException } from '@nestjs/common';
import config from '../app.config';

const logger = new Logger('MikroORM');
const database = config().database;

const options = {
  ...database,
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  allowGlobalContext: true,
  logger: logger.log.bind(logger),
  highlighter: new SqlHighlighter(),
  metadataProvider: TsMorphMetadataProvider,
  discovery: {
    warnWhenNoEntities: true,
  },
  migrations: {
    tableName: 'migrations',
    path: 'src/database/migrations',
    pattern: /^[\w-]+\d+\.ts$/,
    transactional: true,
    disableForeignKeys: true,
    allOrNothing: true,
    dropTables: true,
    safe: true,
    emit: 'ts',
  },
  seeder: {
    path: 'src/database/seeders', // path to the folder with seeders
    pathTs: undefined, // path to the folder with TS seeders (if used, we should put path to compiled files in `path`)
    defaultSeeder: 'DatabaseSeeder', // default seeder class name
    glob: '!(*.d).{js,ts}', // how to match seeder files (all .js and .ts files, but not .d.ts)
    emit: 'ts', // seeder generation mode
    fileName: (className: string) => className, // seeder file naming convention
  },
  findOneOrFailHandler: (
    entityName: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    where: Dictionary | IPrimaryKey,
  ) => {
    return new NotFoundException(`${entityName} not found!`);
  },
} as unknown as Options;

export default options;
