import { observable, action, makeObservable } from 'mobx';
// import API from "../api";

export const _tokenStorageKey = 'accessToken';

export class AlertStore {
  snackbar = null;
  text = null;
  color = 'green';
  activeModal = '';
  loading = false;

  setSnackbar = (type: string) => {
    this.activeModal = type;
  };

  resetStore = () => {
    this.loading = false;
  };

  constructor() {
    makeObservable(this, {
      snackbar: observable,
      setSnackbar: action,
      resetStore: action
    });
  }
}
