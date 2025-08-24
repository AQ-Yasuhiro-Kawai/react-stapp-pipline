export type CodeNamePair = {
  code: string;
  name: string;
};

export type StorageItem = {
  storageItemId: string;
  storageLocationUrl: string;
  fileName: string;
};

export type Applicant = {
  userId: string;
  name: string;
  userPrincipalName: string;
  organizationName: string;
  positionName: string;
};
