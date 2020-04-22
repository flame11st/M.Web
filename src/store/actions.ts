import CookieHelper from '../helpers/CookieHelper';

export const setUserIdentity = (context: any) => {
    const userName = CookieHelper.getCookie('user_name');
    const userId = CookieHelper.getCookie('user_id');

    context.commit('setUserIdentity', { userName, userId });
};

export const logout = (context: any) => {
    context.commit('logout');
};
