export interface IUserInfo {
  id: number;
  bdate: string;
  bdate_visibility: number;
  city: {
    id: number;
    title: string;
  };
  country: {
    id: number;
    title: string;
  };
  timezone: number;
  photo_200: string;
  photo_max_orig: string;
  sex: number;
  photo_100: string;
  first_name: string;
  last_name: string;
  can_access_closed: boolean;
  is_closed: boolean;
}

export interface IGroups {
  [key: string]: number;
}
