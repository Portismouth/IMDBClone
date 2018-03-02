export class Movie {
    constructor(
        movieId: number = null,
        title: string = "",
        year: string = "",
        poster_path: string = "",
        backdrop_path: string = "",
        runtime: number = null,
        overview: string = "",
        rating: string = "",
        director: string = "",
        release_date: string = "",
        genres = [],
        vote_average: number = null,
        vote_count: number = null
    ) {}
}
