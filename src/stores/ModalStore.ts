import { observable, action, makeObservable } from 'mobx';

export class ModalStore {
  activeModal: string | null = null;

  setActiveModal = (type: string) => {
    this.activeModal = type;
  };

  resetStore = () => {
    this.activeModal = null;
  };

  constructor() {
    makeObservable(this, {
      activeModal: observable,
      setActiveModal: action,
      resetStore: action
    });
  }
}
