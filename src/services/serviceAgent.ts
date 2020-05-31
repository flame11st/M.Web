import api from '../helpers/Api';
import UserDTO from '@/objects/userDTO';
import MovieRate from '@/enums/movieRate';

class ServiceAgent {
    Login(email: string, password: string) {
        return api.post('Identity/login', {
            Email: email,
            Password: password,
        });
    }

    SignUp(userDTO: UserDTO) {
        return api.post('Identity/SignUp', {
            DateOfBirth: userDTO.DateOfBirth,
            Email: userDTO.Email,
            Name: userDTO.Name,
            Password: userDTO.Password,
        });
    }

    Logout() {
        return api.get('Identity/Logout');
    }

    GetRecommendationForUser(userId: string) {
        return api.get(`movies/GetRecommendation?userId=${userId}`);
    }

    GetMovie(id: string) {
        return api.get(`movies/getmovie?id=${id}`);
    }

    RateMovie(movieId: string, userId: string, movieRate: MovieRate) {
        return api.post('User/RateMovie', {
            MovieId: movieId,
            UserId: userId,
            MovieRate: movieRate,
        });
    }

    GetUserMovies(userId: string) {
        return api.get(`User/GetUserMovies?userId=${userId}`);
    }

    Search(query: string) {
        return api.get(`movies/Search?query=${query}`);
    }

    GoogleLogin(idToken: string) {
        return api.get(`Identity/GoogleLogin?idToken=${idToken}`);
    }
}

export default ServiceAgent;
