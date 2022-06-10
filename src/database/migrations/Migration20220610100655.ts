import { Migration } from '@mikro-orm/migrations';

export class Migration20220610100655 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'alter table "note" alter column "note" type varchar(255) using ("note"::varchar(255));',
    );
    this.addSql('alter table "note" alter column "note" drop not null;');
  }

  async down(): Promise<void> {
    this.addSql(
      'alter table "note" alter column "note" type varchar(255) using ("note"::varchar(255));',
    );
    this.addSql('alter table "note" alter column "note" set not null;');
  }
}
