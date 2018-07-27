export interface Claim {
  type: string;
  value: string;
}

export interface IUserLogin {
  username: string;
  claims: Claim[];
  roles: string[];
  email?: string;

  token_type: string;
  access_token: string;
}

export class UserLogin implements IUserLogin {
  username: string = '';
  claims: Claim[] = [];
  roles: string[] = [];
  email?: string;

  token_type: string = 'Bearer';
  access_token: string = '';

  constructor (data?: IUserLogin) {
    if (data) {
      Object.assign(this, data);
    }
  }
}
