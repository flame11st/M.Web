import State from './state';

export const userMovies = (state: State) => state.userMovies;

export const userMoviesCount = (state: State) => state.userMovies.length;

export const userId = (state: State) => state.userId;

export const userName = (state: State) => state.userName;

export const isSignedInThroughGoogle = (state: State) => state.isSignedInThroughGoogle;
