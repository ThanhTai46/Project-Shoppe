export const setAccessTokenLocalStorage = (access_token: string) => {
    return localStorage.setItem("access_token", access_token)
}

export const getAccessTokenFromLS = () => localStorage.getItem("access_token") || ""

export const clearAccessTokenFromLS = () => {
    return localStorage.removeItem("access_token")
}