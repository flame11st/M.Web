import api from '../helpers/Api';
import UserDTO from '@/objects/userDTO';

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

    RateMovie(movieId: string, userId: string, isLiked: boolean) {
        return api.post('User/RateMovie', {
            MovieId: movieId,
            UserId: userId,
            IsLiked: isLiked,
        });
    }

    AddToWatchlist(userId: string, movieId: string) {
        return api.get(`User/AddToWatchlist?userId=${userId}&movieId=${movieId}`);
    }

    GetUserMovies(userId: string) {
        return api.get(`User/GetUserMovies?userId=${userId}`);
    }
}

export default ServiceAgent;
