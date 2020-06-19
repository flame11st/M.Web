import MovieRate from '@/enums/movieRate';

class MovieSearchDTO {
    constructor(movieDTO: any) {
        this.Genres = movieDTO.genres;
        this.Id = movieDTO.id;
        this.PosterPath = movieDTO.posterPath;
        this.Title = movieDTO.title;
        this.MovieRate = movieDTO.movieRate;
        this.Year = movieDTO.year;
    }

    Id!: string;

    Title!: string;

    PosterPath!: string;

    Genres!: string[];

    MovieRate!: MovieRate;

    Year!: number;
}

export default MovieSearchDTO;
