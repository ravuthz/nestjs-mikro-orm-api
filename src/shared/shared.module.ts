import { EntityRepository } from '@mikro-orm/core';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from '../app.config';
import options from '../database/database.config';

interface SharedModuleOptions {
  testing?: boolean;
}

@Module({
  providers: [],
})
export class SharedModule {
  static init(
    sharedModuleOptions: SharedModuleOptions | null = {},
  ): DynamicModule {
    return {
      module: SharedModule,
      imports: [
        ConfigModule.forRoot({
          load: [config],
          isGlobal: true,
          cache: true,
        }),
        MikroOrmModule.forRootAsync({
          inject: [ConfigService],
          useFactory: async (config: ConfigService) => {
            const database = sharedModuleOptions?.testing
              ? config.get('test.database')
              : config.get('database');
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
    };
  }
}
