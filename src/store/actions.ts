import CookieHelper from '../helpers/CookieHelper';
import ServiceAgent from '@/services/serviceAgent';
import Movie from '@/objects/movie';
import EventBus from '@/services/eventBus';

const serviceAgent = new ServiceAgent();

export const setUserIdentity = (context: any) => {
    const userName = CookieHelper.getCookie('user_name');
    const userId = CookieHelper.getCookie('user_id');

    context.commit('setUser', { userName, userId });
};

export const setIsUserAuthorized = async (context: any) => {
    context.commit('setIsUserAuthorized', false);
    const response = await serviceAgent.CheckAuthorization();

    if (response) context.commit('setIsUserAuthorized', response.data);
    else context.commit('setIsUserAuthorized', false);
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
