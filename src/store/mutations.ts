import State from './state';
import Movie from '@/objects/movie';

export const setUserIdentity = (state: State, userIdentityData: any) => {
    state.userId = userIdentityData.userId;
    state.userName = userIdentityData.userName;
};

export const logout = (state: State) => {
    state.userId = '';
    state.userName = '';
};

export const clearStore = (state: State) => {
    state.userMovies = [];
    state.isSignedInThroughGoogle = false;
};

export const setUserMovies = (state: State, userMovies: Movie[]) => {
    state.userMovies = userMovies;
};

export const showLoader = (state: State, value: boolean) => {
    state.showLoader = value;
};

export const setIsSignedInThroughGoogle = (state: State, value: boolean) => {
    state.isSignedInThroughGoogle = value;
};
