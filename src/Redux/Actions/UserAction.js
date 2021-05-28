import Axios from "axios"
import linkAPIUser from "../../Supports/Constants/LinkAPIUser"


export const onRegisterUser = (email, password) => {
    return (dispatch) => {
        Axios.post (`${linkAPIUser}/register`, {email: email, password: password})

        .then ((res) => {
            localStorage.setItem ("token", res.data.token)
            dispatch (
                {
                    type: "AUTH_SUCCESS",
                    payload: res.data
                }   
            )
        })

        .catch ((err) => {
            console.log (err)
            dispatch (
                {
                    type: "AUTH_ERROR",
                    payload: err.message
                }
            )
        })
    }
}


export const onLoginUser = (email, password) => {
    return (dispatch) => {
        Axios.post (`${linkAPIUser}/login`, {email: email, password: password})

        .then ((res) => {
            // console.log (res)

            if (res.data.error === false) {
                localStorage.setItem ("token", res.data.token)
                dispatch (
                    {
                        type: "AUTH_SUCCESS",
                        payload: res.data
                    }   
                )

            } else if (res.data.error === true) {
                // console.log (res.data.message)
                dispatch (
                    {
                        type: "AUTH_ERROR",
                        payload: res.data.message
                    }
                )
            }
            
        })

        .catch ((err) => {
            console.log (err)
            dispatch (
                {
                    type: "AUTH_ERROR",
                    payload: err.message
                }
            )
        })
    }
}

export const getDataUser = (token) => {
    return (dispatch) => {
        Axios.post (`${linkAPIUser}/get-data-user`, {token})

        .then ((res) => {
            if (res.data.error === false) {
                dispatch (
                    {
                        type: "AUTH_SUCCESS",
                        payload: res.data
                    }   
                )

            } else if (res.data.error === true) {
                // console.log (res.data.message)
                dispatch (
                    {
                        type: "AUTH_ERROR",
                        payload: res.data.message
                    }
                )
            }
        })

        .catch ((err) => {
            console.log (err)
            dispatch (
                {
                    type: "AUTH_ERROR",
                    payload: err.message
                }
            )
        })
    }
}

export const onCheckUserByEmail = (email) => {
    return (dispatch) => {
        Axios.post (`${linkAPIUser}/check-user-by-email`, {email: email})

        .then ((res) => {
            if (res.data.error === false) {
                // console.log (res)
                dispatch (
                    {
                        type: "CHECK_EMAIL_SUCCESS",
                        payload: res.data.email
                    }   
                )

            } else if (res.data.error === true) {
                // console.log (res.data.message)
                dispatch (
                    {
                        type: "CHECK_EMAIL_ERROR",
                        payload: res.data.message
                    }
                )
            }
        })

        .catch ((err) => {
            console.log (err)
            dispatch (
                {
                    type: "AUTH_ERROR",
                    payload: err.message
                }
            )
        })
    }
}

export const onForgotPassword = (email, password) => {
    return (dispatch) => {
        Axios.patch (`${linkAPIUser}/forgot-password`, {email: email, password: password})

        .then ((res) => {
            if (res.data.error === false) {
                dispatch (
                    {
                        type: "FORGOT_PASSWORD_SUCCESS",
                        payload: res.data.message
                    }  
                )

            } else {
                dispatch (
                    {
                        type: "FORGOT_PASSWORD_ERROR",
                        payload: res.data.message
                    }  
                )
            }
        })

        .catch ((err) => {
            console.log (err)  
            dispatch (
                {
                    type: "FORGOT_PASSWORD_ERROR",
                    payload: err.message
                }  
            )
        })
    }
}

export const onEditUser = (email, password, token) => {
    return (dispatch) => {
        Axios.patch (`${linkAPIUser}/edit-user`, {email, password, token})

        .then ((res) => {
            if (res.data.error === false) {
                dispatch (
                    {
                        type: "EDIT_USER_SUCCESS",
                        payload: res.data.message
                    }
                )

                // Select data secara manual baru kemudian disimpan lagi

            } else {
                dispatch (
                    {
                        type: "EDIT_USER_ERROR",
                        payload: res.data.message
                    }
                )
            }
        })

        .catch ((err) => {
            console.log (err)
            dispatch (
                {
                    type: "EDIT_USER_ERROR",
                    payload: err.message
                }
            )
        })
    }
}