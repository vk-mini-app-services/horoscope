import React from 'react';
import { UserStore, ModalStore, AlertStore, SnackbarStore, PanelStore } from '../stores';

export const stores = {
  UserStore: new UserStore(),
  ModalStore: new ModalStore(),
  AlertStore: new AlertStore(),
  SnackbarStore: new SnackbarStore(),
  PanelStore: new PanelStore()
};

export const storesContext = React.createContext(stores);
