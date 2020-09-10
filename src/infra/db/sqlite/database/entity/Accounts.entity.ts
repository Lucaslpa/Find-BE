/* eslint-disable new-cap */
import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

  @Entity()
export default class Account {
      @PrimaryGeneratedColumn()
      id?: number;

      @Column()
      name?: string;

      @Column()
      email?: string;

      @Column()
      password?: string;
}
