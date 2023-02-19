import { observable, action, makeObservable } from 'mobx';

export class PanelStore {
  loading = false;
  activePanel = 'home';

  setActivePanel = (path: string) => {
    this.activePanel = path;
  };

  resetStore = () => {
    this.activePanel = 'home';
    this.loading = false;
  };

  constructor() {
    makeObservable(this, {
      loading: observable,
      activePanel: observable,
      setActivePanel: action,
      resetStore: action
    });
  }
}
