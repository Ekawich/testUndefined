import { redirect } from "react-router-dom"

// เช็คเวลาของ token
export const getTokenDuration = () => {
    const storedExpirationDate = localStorage.getItem('expiration')
    const expirationDate = new Date(storedExpirationDate)
    const now = new Date()
    const duration = expirationDate.getTime() - now.getTime()
    return duration
}

export const getAuthToken = () => {
    const token = JSON.parse(localStorage.getItem('token'))

    if (!token) {
        return null
    }

    const tokenDuration = getTokenDuration()

    if (tokenDuration < 0) {
        return "EXPIRED"
    }

    return token
}

export const tokenLoader = () => {
    return getAuthToken()
}

// เช็ค login
export const checkLogin = () => {
    const token = getAuthToken()

    if (!token) {
        return redirect('/')
    }

    return null
}

export const getUser = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    return user
}
