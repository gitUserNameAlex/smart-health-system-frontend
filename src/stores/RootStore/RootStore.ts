import { UserStore, IUserStore } from 'stores/UserStore';

export interface IRootStore {
  userStore: IUserStore;
}

export class RootStore implements IRootStore {
  readonly userStore: IUserStore = new UserStore();
}
