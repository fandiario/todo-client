import Axios from "axios"

import linkAPIWorkspace from "../../Supports/Constants/LinkAPIWorkspace"

export const onGetWorkspaceUser = (token) => {
    return (dispatch) => {
        Axios.post (`${linkAPIWorkspace}/get-workspace-by-owner`, {token})

        .then ((res) => {
            // console.log (res.data)

            if (res.data.error === false) {
                dispatch ({
                    type: "GET_WORKSPACE_USER_SUCCESS",
                    payload: res.data
                })
            
            } else if (res.data.error === true) {
                dispatch ({
                    type: "GET_WORKSPACE_USER_ERROR",
                    payload: res.data.message
                }) 
            }
            
        })

        .catch ((err) => {
            console.log (err)
            dispatch ({
                type: "GET_WORKSPACE_USER_ERROR",
                payload: err.message
            })
        })
    }
}

export const onGetWorkspaceByAssigned = (token) => {
    return (dispatch) => {
        Axios.post (`${linkAPIWorkspace}/get-workspace-by-member`, {token})

        .then ((res) => {
            // console.log (res.data)

            if (res.data.error === false) {                
                dispatch ({
                    type: "GET_ASSIGNED_WORKSPACE_SUCCESS",
                    payload: res.data
                })
            
            } else if (res.data.error === true) {
                dispatch ({
                    type: "GET_ASSIGNED_WORKSPACE_ERROR",
                    payload: res.data.message
                }) 
            }
        })

        .catch ((err) => {
            console.log (err)
            dispatch ({
                type: "GET_ASSIGNED_WORKSPACE_ERROR",
                payload: err.message
            }) 
        })
    }
}

// export const onGetTaskByWorkspace = (idWorkspace, token) => {
//     return (dispatch) => {
//         Axios.post (`${linkAPIWorkspace}/${idWorkspace}/get-task-workspace`, {token})

//         .then ((res) => {
//             // console.log (res.data)

//             if (res.data.error === false) {
//                 dispatch ({
//                     type: "GET_TASK_WORKSPACE_SUCCESS",
//                     payload: res.data.data
//                 })

//             } else if (res.data.error === true) {
//                 dispatch ({
//                     type: "GET_TASK_WORKSPACE_ERROR",
//                     payload:res.data.message
//                 })
//             }
            
//         })

//         .catch ((err) => {
//             console.log (err)
//             dispatch ({
//                 type: "GET_TASK_WORKSPACE_ERROR",
//                 payload: err.message
//             })
//         })
//     }
// }