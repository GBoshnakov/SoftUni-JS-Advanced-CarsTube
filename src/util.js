export function getUserInfo() {
    return JSON.parse(sessionStorage.getItem('userInfo'));
}

export function setUserInfo(data) {
    sessionStorage.setItem('userInfo', JSON.stringify(data));
}

export function clearUserInfo() {
    sessionStorage.clear();
}

export function hasUserInfo() {
    const userInfo = getUserInfo();
    return userInfo != null;
}

export function parseQuerystring(string) {
    const params = string
    .split('&')
    .map(p => p.split('='))
    .reduce((a, [k, v]) => Object.assign(a, { [k]: v}), {});

    return params;
}