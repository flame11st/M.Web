import Person from './person';
import MovieRate from '@/enums/movieRate';
import MovieType from '@/enums/movieType';

class Movie {
    constructor(movieDTO: any) {
        this.Actors = movieDTO.actors;
        this.Countries = movieDTO.countries;
        this.Directors = movieDTO.directors;
        this.Duration = movieDTO.duration;
        this.Genres = movieDTO.genres;
        this.Id = movieDTO.id;
        this.Overview = movieDTO.overview;
        this.PosterPath = movieDTO.posterPath;
        this.Tagline = movieDTO.tagline;
        this.Title = movieDTO.title;
        this.MovieRate = movieDTO.movieRate;
        this.MovieType = movieDTO.movieType;
        this.Year = movieDTO.year;
        this.AverageTimeOfEpisode = movieDTO.averageTimeOfEpisode;
        this.InProduction = movieDTO.inProduction;
        this.SeasonsCount = movieDTO.seasonsCount;
        this.LikedVotes = movieDTO.likedVotes;
        this.UnlikedVotes = movieDTO.unlikedVotes;

        this.Scores = this.LikedVotes + this.UnlikedVotes;
        this.Rating = this.Scores !== 0 ? (100 / (this.Scores)) * this.LikedVotes : 0;
    }

    Id!: string;

    Title!: string;

    Overview!: string;

    Tagline!: string;

    PosterPath!: string;

    Duration!: number;

    Rating!: number;

    Scores!: number;

    LikedVotes!: number;

    UnlikedVotes!: number;

    Countries!: string[];

    Actors!: string[];

    Directors!: string[];

    Genres!: string[];

    MovieRate!: MovieRate;

    MovieType!: MovieType;

    Year!: number;

    AverageTimeOfEpisode!: number;

    InProduction!: boolean;

    SeasonsCount!: number;
}

export default Movie;
