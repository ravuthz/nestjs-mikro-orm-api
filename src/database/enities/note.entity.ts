import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Note {
  @PrimaryKey()
  id!: number;

  @Property()
  name: string;

  @Property({ nullable: true })
  note: string;

  @Property()
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();

  constructor(partial: Partial<Note> = {}) {
    Object.assign(this, partial);
  }
}
