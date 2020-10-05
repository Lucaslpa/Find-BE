import {MinimalCaracteresTypes} from './minimalCaracteresInterface';
import Validator from 'validator';

export class MinimalCaracteres implements MinimalCaracteresTypes {
  constructor(private min: number) {}


  isValid(data: string) : boolean {
    const res = Validator.isLength(data, {min: this.min});

    return res;
  }
}
