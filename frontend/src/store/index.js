import userStore from './users';


class RootStore {
    constructor() {
        this.storage = localStorage;
        this.users = new userStore(this);
    }
}

export default new RootStore();