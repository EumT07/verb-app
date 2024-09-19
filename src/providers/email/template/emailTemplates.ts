import { htmlTemplate } from '../utils/htmlTemplate';
import { DataMail } from '../interface/index';

export const welcomeTemplate = (
  username: string,
  firstName: string,
  lastName: string,
): string => {
  const data: DataMail = {
    title: `Welcome`,
    userName: `Hello there, ${username}`,
    info: `${firstName} ${lastName}, Welcome to our VerbsApp community, where you will find most of the most used verbs, as well as examples, examples of the day to day, also the correct use of phrasal verbs, enjoy and learn at the same time.`,
    buttonTitle: 'Start',
    link: `http://localhost:4200/`,
  };
  return htmlTemplate(data);
};

export const recoveryPassTemplate = (
  userName: string,
  firstName: string,
  lastName: string,
  token: string,
): string => {
  const data: DataMail = {
    title: `Recovery Password`,
    userName: `Hello there.!! ${userName}`,
    info: `${firstName} ${lastName}, We have received a request to recover your password. If it was you, please click on the following link and you will have access to recover your password. Otherwise, please do not hesitate to contact us.`,
    buttonTitle: 'Recover',
    link: `http://localhost:4200/auth/recovery-password/${token}`,
  };

  return htmlTemplate(data);
};

