import { UserInfo } from '@vkontakte/vk-bridge';
import { observable, action, makeObservable } from 'mobx';
import { IGroups } from './types/UserStoreType';

export class UserStore {
  loading = false;
  userInfo: UserInfo | null = null;
  token = '';
  groups: IGroups | null = null;

  setUserInfo = (data: UserInfo) => {
    this.userInfo = data;
  };

  setUserToken = (token: string) => {
    this.token = token;
  };

  setGroups = (data: IGroups) => {
    this.groups = data;
  };

  resetStore = () => {
    this.loading = false;
    this.userInfo = null;
    this.groups = null;
  };

  constructor() {
    makeObservable(this, {
      loading: observable,
      userInfo: observable,
      token: observable,
      groups: observable,
      resetStore: action,
      setUserInfo: action,
      setUserToken: action,
      setGroups: action
    });
  }
}
