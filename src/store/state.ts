import Movie from '@/objects/movie';

class State {
    userName = '';

    userId = '';

    userMovies: Movie[] = [];

    isSignedInThroughGoogle: boolean = false;
}

export default State;