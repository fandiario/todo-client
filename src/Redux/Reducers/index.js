import {combineReducers} from "redux"
import userReducer from "../Reducers/UserReducer"
import workspaceReducer from "../Reducers/WorkspaceReducer"
import taskReducer from "../Reducers/TaskReducer"

const allReducer = combineReducers ({
    user: userReducer,
    workspace: workspaceReducer,
    task: taskReducer
})

export default allReducer