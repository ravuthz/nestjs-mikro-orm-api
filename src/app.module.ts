import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NoteModule } from './note/note.module';
import { PermissionModule } from './permission/permission.module';
import { RoleModule } from './role/role.module';
import { SharedModule } from './shared/shared.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [SharedModule, NoteModule, UserModule, RoleModule, PermissionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
