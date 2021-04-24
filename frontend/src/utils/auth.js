export const BASE_URL='https://api.semyon-dyagelets.nomoredomains.club';

const responseCheck = (response) => response.ok ? response.json() : Promise.reject(`Ошибка ${response.status}`);

export const register = (email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({email, password})
    })
    .then(responseCheck)
}

export const authorize = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({email, password})
    })
    .then(responseCheck)
}