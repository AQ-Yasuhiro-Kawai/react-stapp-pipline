type User = {
  user_id: string;
  name: string;
  user_principal_name: string;
  organization_name: string;
  position_name: string;
};

export type UsersResponse = User[];
