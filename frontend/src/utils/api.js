class API {
    constructor({ baseURL }) {
        this._baseURL = baseURL;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
    }

    getUserInfo() {
        return fetch(`${this._baseURL}/users/me`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        })
            .then(this._checkResponse)
    }

    getInitialCards() {
        return fetch(`${this._baseURL}/cards`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        })
            .then(this._checkResponse)
    }

    editProfile(data) {
        return fetch(`${this._baseURL}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
            .then(this._checkResponse)
    }

    editAvatar(data) {
        return fetch(`${this._baseURL}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: data.avatar,
            })
        })
            .then(this._checkResponse)
    }

    addCard(data) {
        return fetch(`${this._baseURL}/cards`, {
            method: 'POST',
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
            .then(this._checkResponse)
    }

    deleteCard(_id) {
        return fetch(`${this._baseURL}/cards/${_id}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        })
            .then(this._checkResponse)
    }

    putLike(_id) {
        return fetch(`${this._baseURL}/cards/${_id}/likes/`, {
            method: 'PUT',
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        })
            .then(this._checkResponse)
    }

    deleteLike(_id) {
        return fetch(`${this._baseURL}/cards/${_id}/likes`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        })
            .then(this._checkResponse)
    }
}

const api = new API({
    baseURL: 'https://api.semyon-dyagelets.nomoredomains.club',
});

export default api;