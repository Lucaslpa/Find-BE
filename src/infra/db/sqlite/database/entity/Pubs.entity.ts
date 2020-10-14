/* eslint-disable new-cap */
import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

  @Entity()
export default class Pubs {
      @PrimaryGeneratedColumn()
      id?: string;
      @Column()
      title?: string;
      @Column()
      companyName?: string;
      @Column()
      tecnology?: string;
      @Column()
      informações?: string
      @Column()
      contato?: string
      @Column()
      preço?: string
      @Column()
      localizaçao?: string
      @Column()
      typo?: string
      @Column()
      presencialOuRemoto?: string
}
