let initialState = {
    error: false,
    message: null,
    workspaces: [],
    assignedWorkspaces: []
}

const workspaceReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_WORKSPACE_USER_SUCCESS":
            return {...state, workspaces: action.payload, error: false}

        case "GET_WORKSPACE_USER_ERROR":
            return {...state, message: action.payload, error: true}

        case "GET_ASSIGNED_WORKSPACE_SUCCESS":
            return {...state, assignedWorkspaces: action.payload, error: false}

        case "GET_ASSIGNED_WORKSPACE_ERROR":
            return {...state, message: action.payload, error: true}

        default:
            return state
    }
}

export default workspaceReducer