import {SendEmail} from '../../data/useCase/sendEmail/sendemail';
import {NodeMailerAdapter} from '../../utils/nodemailerAdapter/nodemailerAdapter';
import accountsendingemailconfig from '../../../.accountSenderEmail';
import {GenerateContent} from '../../data/useCase/generateContent.ts/generateContent';
import {TakeUserFromDB} from '../../data/useCase/takeUser/takeuser';
import {LoadToken} from '../../infra/token/jwtokenLoadTokenAdapter';
import {SqliteAccountRepo} from '../../infra/db/sqlite/accountRepo/sqliteAccountRepo';
import privatekey from '../../../.recuperarSenhaKey';
import {Querys} from '../../infra/db/Querys/typeOrmQuerysAccount';
import accountentity from '../../infra/db/sqlite/database/entity/Accounts.entity';
export const sendEmailFactory = () => {
  const accountconfig = accountsendingemailconfig;
  const key = privatekey;
  const entity = accountentity;
  const querys = new Querys(entity);
  const transporter = new NodeMailerAdapter(accountconfig);
  const accountrepo = new SqliteAccountRepo(querys);
  const loadtoken = new LoadToken(key);
  const getuserfromdb = new TakeUserFromDB(accountrepo);
  const generatecontent = new GenerateContent(getuserfromdb, loadtoken);


  return new SendEmail(transporter, generatecontent);
};
