let initialState = {
    error: false,
    message: null,
    workspaces: [],
    assignedWorkspaces: [],
    data: [],
    members: []
}

const workspaceReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_WORKSPACE_USER_SUCCESS":
            return {...state, workspaces: action.payload, error: false, message: null}

        case "GET_WORKSPACE_USER_ERROR":
            return {...state, message: action.payload, error: true}

        case "GET_ASSIGNED_WORKSPACE_SUCCESS":
            return {...state, assignedWorkspaces: action.payload, error: false,  message: null}

        case "GET_ASSIGNED_WORKSPACE_ERROR":
            return {...state, message: action.payload, error: true}

        case "GET_WORKSPACE_DATA_SUCCESS" :
            return {...state, data: action.payload, error: false, message: null}
        
        case "GET_WORKSPACE_DATA_ERROR" :
            return {...state, message: action.payload, error: true}

        case "GET_WORKSPACE_MEMBERS_SUCCESS" :
            return {...state, members: action.payload, error: false, message: null}

        case "GET_WORKSPACE_MEMBERS_ERROR" :
            return {...state, message: action.payload, error: true}

        case "ADD_MEMBER_SUCCESS" :
            return {...state, message: action.payload, error: false}
        
        case "ADD_MEMBER_ERROR" :
            return {...state, message: action.payload, error: true}

        case "DEL_MEMBER_SUCCESS" :
            return {...state, message: action.payload, error: false}
        
        case "DEL_MEMBER_ERROR" :
            return {...state, message: action.payload, error: true}

        case "EDIT_WORKSPACE_SUCCESS" :
            return {...state, message: action.payload, error: false}

        case "EDIT_WORKSPACE_ERROR" :
            return {...state, message: action.payload, error: true}

        default:
            return state
    }
}

export default workspaceReducer