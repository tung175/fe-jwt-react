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