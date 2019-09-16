export interface IAppConfig {
  projectId: string;
  topic: string;
  keyFile: string;
  repository: string;
  branch: string;
  shellScript: string;
}

export interface IPubSubNotification {
  name: string;
  url: string;
  eventTime: string; // Date String
  refUpdateEvent: {
    email: string; // Person who pushed
    refUpdates: {
      [branchName: string]: {
        // name of the branch (eg. refs/heads/master)
        refName: string;
        updateType: string;
        oldId: string;
        newId: string;
      };
    };
  };
}
