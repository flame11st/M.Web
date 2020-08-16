import api from '../helpers/Api';
import UserDTO from '@/objects/userDTO';
import MovieRate from '@/enums/movieRate';
import User from '@/objects/user';

class ServiceAgent {
    CheckAuthorization() {
        return api.get('Identity/CheckAuthorization');
    }

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

    ValidateAdminRequest() {
        return api.get('Identity/ValidateAdminRequest');
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

    ClearUserMovies(userId: string) {
        return api.get(`User/ClearUserMovies?userId=${userId}`);
    }

    DeleteUser(userId: string) {
        return api.get(`User/DeleteUser?userId=${userId}`);
    }

    GetUserInfo(userId: string) {
        return api.get(`User/GetUserInfo?userId=${userId}`);
    }

    ChangeUserInfo(user: User) {
        return api.post('User/ChangeUserInfo', {
            Id: user.Id,
            Name: user.Name,
            Email: user.Email,
        });
    }

    ChangeUserPassword(userId: string, oldPassword: string, newPassword: string) {
        return api.post('User/ChangeUserPassword', {
            UserId: userId,
            OldPassword: oldPassword,
            NewPassword: newPassword,
        });
    }

    Search(query: string) {
        return api.get(`movies/Search?query=${query}`);
    }

    GoogleLogin(idToken: string) {
        return api.get(`Identity/GoogleLoginWeb?idToken=${idToken}`);
    }

    // Administration part
    GetAllJobManagerCommands() {
        return api.get('JobManager/GetAllCommands');
    }

    RunCommand(command: string) {
        return api.get(`JobManager/RunCommand?command=${command}`);
    }

    UpdateImdbRatingsFromFile(formData: FormData) {
        return api.post('movies/UpdateImdbRatingsFromFile', formData);
    }
}

export default ServiceAgent;
