import Movie from '@/objects/movie';

class State {
    userName = '';

    userId = '';

    userMovies: Movie[] = [];

    isSignedInThroughGoogle: boolean = false;

    isUserAuthorized = false;
}

export default State;
