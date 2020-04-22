import Person from './person';

class Movie {
    constructor(movieDTO: any) {
        this.Actors = movieDTO.actors.map((a: any) => new Person(a));
        this.Countries = movieDTO.countries;
        this.Directors = movieDTO.directors.map((d: any) => new Person(d));
        this.Duration = movieDTO.duration;
        this.Genres = movieDTO.genres;
        this.Id = movieDTO.id;
        this.Overview = movieDTO.overview;
        this.PosterPath = movieDTO.posterPath;
        this.ReleaseDate = movieDTO.releaseDate;
        this.Tagline = movieDTO.tagline;
        this.Title = movieDTO.title;
    }

    Id!: string;

    Title!: string;

    Overview!: string;

    ReleaseDate!: string;

    Tagline!: string;

    PosterPath!: string;

    Duration!: number;

    Countries!: string[];

    Actors!: Person[];

    Directors!: Person[];

    Genres!: string[];
}

export default Movie;
