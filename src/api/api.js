const host = 'http://localhost:3030';

async function request(url, options) {
    try {
        const response = await fetch(host + url, options);

        if (response.ok == false) {
            if (response.status == 403) {
                sessionStorage.clear();
            }
            const error = await response.json();
            throw new Error(error.message);
        }
        if (response.status == 204) {
            return response;
        } else {
            return response.json();
            
        }


    } catch (error) {
        alert(error.message);
        throw error;
    }
}

function createOptions(method = 'get', data) {
    const options = {
        method,
        headers: {}
    }

    if (data != undefined) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
    if (userInfo != null) {
        options.headers['X-Authorization'] = userInfo.token;
    }

    return options;
}

export async function get(url) {
    return await request(url, createOptions());
}

export async function post(url, data) {
    return request(url, createOptions('post', data));
}

export async function put(url, data) {
    return request(url, createOptions('put', data));
}

export async function del(url) {
    return request(url, createOptions('delete'));
}

export async function login(username, password) {
    const result = await post('/users/login', { username, password });

    const userInfo = {
        username: result.username,
        id: result._id,
        token: result.accessToken
    }
    sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
}

export async function register(username, password) {
    const result = await post('/users/register', { username, password });

    const userInfo = {
        username: result.username,
        id: result._id,
        token: result.accessToken
    }
    sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
}

export async function logout() {
    await get('/users/logout');
    sessionStorage.clear();
}

