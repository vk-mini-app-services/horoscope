export interface IAddUserInSubscriptionPayload {
  appName: string;
  userId: number;
}

export interface ISetAllHoroscopesPayload {
  date: string | null;
  data: {
    [key: string]: string;
  };
}
