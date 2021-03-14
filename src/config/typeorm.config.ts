import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'dlshdnjselql31',
  database: 'nestjs-tutorial',
  autoLoadEntities: true,
  synchronize: true,
};
