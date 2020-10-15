/* eslint-disable new-cap */
import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm';
import Pubs from './Pubs.entity';
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

      @OneToMany(() => Pubs, (pubs) => pubs.account)
      pubs?: Pubs[]
}
