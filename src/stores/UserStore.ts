import { observable, action, makeObservable } from 'mobx';
import { IUserInfo } from './types/UserStoreType';

export class UserStore {
  loading = false;
  userInfo: IUserInfo | null = null;
  token = '';

  setUserInfo = (data: IUserInfo) => {
    this.userInfo = data;
  };

  setUserToken = (token: string) => {
    this.token = token;
  };

  resetStore = () => {
    this.loading = false;
    this.userInfo = null;
  };

  constructor() {
    makeObservable(this, {
      loading: observable,
      userInfo: observable,
      token: observable,
      resetStore: action,
      setUserInfo: action,
      setUserToken: action
    });
  }
}
