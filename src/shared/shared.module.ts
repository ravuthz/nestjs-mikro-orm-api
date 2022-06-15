import { EntityRepository } from '@mikro-orm/core';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from '../app.config';
import options from '../database/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      cache: true,
    }),
    MikroOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        const database = config.get('database');
        return {
          ...options,
          ...database,
          autoLoadEntities: false,
        };
      },
    }),
  ],
  providers: [EntityRepository],
  exports: [EntityRepository],
})
export class SharedModule {}
