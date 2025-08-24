export type User = {
  userId: string;
  name: string;
  userPrincipalName: string;
  organizationName: string;
  positionName: string;
};

export type Users = User[];

/**
 * UserItem型
 * 管理者ユーザー一覧の型
 */
export type UserItem = {
  id: string;
  name: string;
  position: string;
  email: string;
  registeredAt: string;
};

export type UserItemView = Omit<UserItem, "id"> & {
  icon: React.ReactNode;
  releaseButton: React.ReactNode;
};
