import Person from './person';
import MovieRate from '@/enums/movieRate';
import MovieType from '@/enums/movieType';

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
        this.MovieRate = movieDTO.movieRate;
        this.MovieType = movieDTO.movieType;
        this.Year = movieDTO.year;
        this.AverageTimeOfEpisode = movieDTO.averageTimeOfEpisode;
        this.InProduction = movieDTO.inProduction;
        this.SeasonsCount = movieDTO.seasonsCount;
        this.Rating = movieDTO.rating;
        this.Scores = movieDTO.scores;
    }

    Id!: string;

    Title!: string;

    Overview!: string;

    ReleaseDate!: string;

    Tagline!: string;

    PosterPath!: string;

    Duration!: number;

    Rating!: number;

    Scores!: number;

    Countries!: string[];

    Actors!: Person[];

    Directors!: Person[];

    Genres!: string[];

    MovieRate!: MovieRate;

    MovieType!: MovieType;

    Year!: number;

    AverageTimeOfEpisode!: number;

    InProduction!: boolean;

    SeasonsCount!: number;
}

export default Movie;
