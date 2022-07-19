import { Migration } from '@mikro-orm/migrations';

export class Migration20220719160841 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table `users` (`id` int unsigned not null auto_increment primary key, `created_at` datetime not null, `updated_at` datetime not null, `first_name` varchar(255) not null, `last_name` varchar(255) not null, `email` varchar(255) not null, `username` varchar(255) not null, `password` varchar(255) not null, `profile_image` varchar(255) null) default character set utf8mb4 engine = InnoDB;',
    );
    this.addSql(
      'alter table `users` add unique `users_email_unique`(`email`);',
    );
    this.addSql(
      'alter table `users` add unique `users_username_unique`(`username`);',
    );

    this.addSql(
      'create table `roles` (`id` int unsigned not null auto_increment primary key, `created_at` datetime not null, `updated_at` datetime not null, `name` varchar(255) not null, `note` varchar(255) null) default character set utf8mb4 engine = InnoDB;',
    );

    this.addSql(
      'create table `users_roles` (`user_id` int unsigned not null, `role_id` int unsigned not null, primary key (`user_id`, `role_id`)) default character set utf8mb4 engine = InnoDB;',
    );
    this.addSql(
      'alter table `users_roles` add index `users_roles_user_id_index`(`user_id`);',
    );
    this.addSql(
      'alter table `users_roles` add index `users_roles_role_id_index`(`role_id`);',
    );

    this.addSql(
      'create table `permissions` (`id` int unsigned not null auto_increment primary key, `created_at` datetime not null, `updated_at` datetime not null, `name` varchar(255) not null, `note` varchar(255) null) default character set utf8mb4 engine = InnoDB;',
    );

    this.addSql(
      'create table `roles_permissions` (`role_id` int unsigned not null, `permission_id` int unsigned not null, primary key (`role_id`, `permission_id`)) default character set utf8mb4 engine = InnoDB;',
    );
    this.addSql(
      'alter table `roles_permissions` add index `roles_permissions_role_id_index`(`role_id`);',
    );
    this.addSql(
      'alter table `roles_permissions` add index `roles_permissions_permission_id_index`(`permission_id`);',
    );

    this.addSql(
      'create table `note` (`id` int unsigned not null auto_increment primary key, `created_at` datetime not null, `updated_at` datetime not null, `name` varchar(255) not null, `note` varchar(255) null) default character set utf8mb4 engine = InnoDB;',
    );

    this.addSql(
      'alter table `users_roles` add constraint `users_roles_user_id_foreign` foreign key (`user_id`) references `users` (`id`) on update cascade on delete cascade;',
    );
    this.addSql(
      'alter table `users_roles` add constraint `users_roles_role_id_foreign` foreign key (`role_id`) references `roles` (`id`) on update cascade on delete cascade;',
    );

    this.addSql(
      'alter table `roles_permissions` add constraint `roles_permissions_role_id_foreign` foreign key (`role_id`) references `roles` (`id`) on update cascade on delete cascade;',
    );
    this.addSql(
      'alter table `roles_permissions` add constraint `roles_permissions_permission_id_foreign` foreign key (`permission_id`) references `permissions` (`id`) on update cascade on delete cascade;',
    );
  }
}
