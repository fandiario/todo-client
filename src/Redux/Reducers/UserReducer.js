let initialState = {
    token: null,
    error: null,
    emailUser: null,
    dataUser: [],
    isRedirect: false,
    isRedirectLogin: false,
    message: null
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case "AUTH_SUCCESS" : 
            return {...state, dataUser: action.payload, isRedirect: true, error: false, message: null}
        
        case "AUTH_ERROR" : 
            return {...state, message: action.payload, error: true}

        case "CHECK_EMAIL_SUCCESS" :
            return {...state, emailUser: action.payload, error: false}
        
        case "CHECK_EMAIL_ERROR" :
            return {...state, message: action.payload, error: true}

        case "FORGOT_PASSWORD_SUCCESS" : 
            return {...state, message: action.payload, isRedirectLogin: true, error: false}

        case "FORGOT_PASSWORD_ERROR" : 
            return {...state, message: action.payload, error: true}
        
        case "EDIT_USER_SUCCESS" :
            return {...state, error: false, message: action.payload}
        
        case "EDIT_USER_ERROR" :
            return {...state, error: true, message: action.payload}

        default :
            return state
    }
}

export default userReducer