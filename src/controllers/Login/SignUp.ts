import {SignUpTypesFinish, SignUpTypesStart} from './interfaces';

class SignUpController {
  signUp(Data: SignUpTypesStart): SignUpTypesFinish {
    const NewData = {
      ...Data,
      status: 400,
    };
    return NewData;
  }
}

export default SignUpController;
