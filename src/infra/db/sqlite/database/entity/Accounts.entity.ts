/* eslint-disable new-cap */
import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

  @Entity()
export default class Account {
      @PrimaryGeneratedColumn()
      id?: string;

      @Column()
      name?: string;

      @Column()
      email?: string;

      @Column()
      password?: string;
}
