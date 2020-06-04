import CookieHelper from '../helpers/CookieHelper';
import ServiceAgent from '@/services/serviceAgent';
import Movie from '@/objects/movie';

const serviceAgent = new ServiceAgent();

export const setUserIdentity = (context: any) => {
    const userName = CookieHelper.getCookie('user_name');
    const userId = CookieHelper.getCookie('user_id');

    context.commit('setUser', { userName, userId });
};

export const logout = (context: any) => {
    context.commit('logout');
};

export const clearStore = (context: any) => {
    context.commit('clearStore');
};

export const setIsSignedInThroughGoogle = (context: any, value: boolean) => {
    context.commit('setIsSignedInThroughGoogle', value);
};

export const setUserMovies = async (context: any) => {
    const userMovies = await serviceAgent.GetUserMovies(context.state.userId);

    if (userMovies) {
        context.commit('setUserMovies', userMovies.data.map((movie: any) => new Movie(movie)));
    }
};
