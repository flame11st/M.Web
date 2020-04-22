import State from './state';

export const setUserIdentity = (state: State, userIdentityData: any) => {
    state.userId = userIdentityData.userId;
    state.userName = userIdentityData.userName;
};

export const logout = (state: State) => {
    state.userId = '';
    state.userName = '';
};
