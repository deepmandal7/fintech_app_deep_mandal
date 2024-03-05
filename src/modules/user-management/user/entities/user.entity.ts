import { UserTypeEnum } from '../enum/user.enum';

export class User {
  id: string;
  userEmailId: string;
  userFname: string;
  userLname: string | null;
  userPassword: string;
  userMobileno: string;
  userCountrycode: string;
  userType: UserTypeEnum;

  constructor(
    id: string,
    userEmailId: string,
    userFname: string,
    userPassword: string,
    userMobileno: string,
    userCountrycode: string,
    userLname: string | null = null,
  ) {
    this.id = id;
    this.userEmailId = userEmailId;
    this.userFname = userFname;
    this.userLname = userLname;
    this.userPassword = userPassword;
    this.userMobileno = userMobileno;
    this.userCountrycode = userCountrycode;
  }
}
