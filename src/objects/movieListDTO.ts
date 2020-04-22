import MovieRate from '../enums/movieRate';

class movieListDTO {
    public id!: string;

    public title!: string;

    public posterPath!: string;

    public genres!: string;

    public duration!: number;

    public movieRate!: MovieRate;

    public rating!: number;

    public scores!: number;
}

export default movieListDTO;
