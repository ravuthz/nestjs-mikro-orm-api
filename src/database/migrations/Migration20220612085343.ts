import { Migration } from '@mikro-orm/migrations';

export class Migration20220612085343 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "users" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "first_name" varchar(255) not null, "last_name" varchar(255) not null, "email" varchar(255) not null, "username" varchar(255) not null, "password" varchar(255) not null, "profile_image" varchar(255) null);',
    );
    this.addSql(
      'alter table "users" add constraint "users_email_unique" unique ("email");',
    );
    this.addSql(
      'alter table "users" add constraint "users_username_unique" unique ("username");',
    );

    this.addSql(
      'create table "roles" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(255) not null, "note" varchar(255) null);',
    );

    this.addSql(
      'create table "users_roles" ("user_id" int not null, "role_id" int not null);',
    );
    this.addSql(
      'alter table "users_roles" add constraint "users_roles_pkey" primary key ("user_id", "role_id");',
    );

    this.addSql(
      'create table "permissions" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(255) not null, "note" varchar(255) null);',
    );

    this.addSql(
      'create table "roles_permissions" ("role_id" int not null, "permission_id" int not null);',
    );
    this.addSql(
      'alter table "roles_permissions" add constraint "roles_permissions_pkey" primary key ("role_id", "permission_id");',
    );

    this.addSql(
      'alter table "users_roles" add constraint "users_roles_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade on delete cascade;',
    );
    this.addSql(
      'alter table "users_roles" add constraint "users_roles_role_id_foreign" foreign key ("role_id") references "roles" ("id") on update cascade on delete cascade;',
    );

    this.addSql(
      'alter table "roles_permissions" add constraint "roles_permissions_role_id_foreign" foreign key ("role_id") references "roles" ("id") on update cascade on delete cascade;',
    );
    this.addSql(
      'alter table "roles_permissions" add constraint "roles_permissions_permission_id_foreign" foreign key ("permission_id") references "permissions" ("id") on update cascade on delete cascade;',
    );
  }

  async down(): Promise<void> {
    this.addSql(
      'create table "base_entity" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);',
    );
  }
}
