import * as api from './api.js';

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

const endpoints = {
    getPage: (size) => `/data/cars?pageSize=${size}&offset=`,
    count:'/data/cars?count',
    all: '/data/cars?sortBy=_createdOn%20desc',
    byId: '/data/cars/',
    createNew: '/data/cars',
    deleteById: '/data/cars/',
    editById: '/data/cars/',
    myBooks: (userId) => `/data/cars?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`
}   

export async function getAllCars() {
    return api.get(endpoints.all);
} 

const pageSize = 2;
//Page must be a Number
export async function getCarsByPage(page = 1) {
    return api.get(endpoints.getPage(pageSize) + (page - 1) * pageSize)
}

export async function getCount() {
    return Math.ceil(await api.get(endpoints.count) / pageSize);
}

export async function getCarById(id) {
    return api.get(endpoints.byId + id);
}

export async function createCar(data) {
    return api.post(endpoints.createNew, data);
}

export async function deleteCar(id) {
    return api.del(endpoints.deleteById + id);
}

export async function editCarById(id, data) {
    return api.put(endpoints.editById + id, data);
}

export async function getMyCars(userId) {
    return api.get(endpoints.myBooks(userId))
}

export async function likeBookById(bookId) {
    return api.post('/data/likes', { bookId });
}

export async function getLikesByBookId(bookId) {
    return api.get(`/data/likes?where=bookId%3D%22${bookId}%22&distinct=_ownerId&count`);
}

export async function getMyLike(bookId, userId) {
    return api.get(`/data/likes?where=bookId%3D%22${bookId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
}

export async function searchCars(query) {
    return api.get(`/data/cars?where=year%3D${encodeURIComponent(query)}`);
}