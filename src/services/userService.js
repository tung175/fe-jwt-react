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