let initialState = {
    error: false,
    message: null,
    dataCategories: [],
    taskWorkspaces: []
}

const taskReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_CATEGORY_SUCCESS":
            return {...state, dataCategories: action.payload, error: false}

        case "GET_CATEGORY_ERROR" :
            return {...state, message: action.payload, error: true}

        case "GET_TASK_WORKSPACE_SUCCESS": 
            return {...state, taskWorkspaces: action.payload, error: false}
        
        case "GET_TASK_WORKSPACE_ERROR" : 
            return {...state, message: action.payload, error: true}

        case "ADD_CATEGORY_SUCCESS" :
            return {...state, message: action.payload, error: false}

        case "ADD_CATEGORY_ERROR" :
            return {...state, message: action.payload, error: true}

        case "DELETE_CATEGORY_SUCCESS" :
            return {...state, message: action.payload, error: false}

        case "DELETE_CATEGORY_ERROR" :
            return {...state, message: action.payload, error: true}

        default :
            return state
    }
}

export default taskReducer