import axios from "axios"

export const registerNewUser = (email, phone, username, password) => {
    return axios.post('http://localhost:8080/api/v1/register', {
        email, phone, username, password
    })
}

export const LoginService = (valueLogin, password) => {
    return axios.post('http://localhost:8080/api/v1/login', {
        valueLogin, password
    })
}

export const fetchAllUser = () => {
    return axios.get('http://localhost:8080/api/v1/user/read')
}

export const fetchAllUserWithPaginate = (page, limit) => {
    return axios.get(`http://localhost:8080/api/v1/user/read?page=${page}&limit=${limit}`)
}

export const deleteUser = (user) => {
    return axios.delete(`http://localhost:8080/api/v1/user/delete`, {data: {id: user.id}})
}

export const fetchGroup = () => {
    return axios.get(`http://localhost:8080/api/v1/group/read`)
}

export const createNewUser = (userData) => {
    return axios.post(`http://localhost:8080/api/v1/user/create`, {...userData})
}

export const updateCurrentUser = (userData) => {
    return axios.put(`http://localhost:8080/api/v1/user/update`, {...userData})
}