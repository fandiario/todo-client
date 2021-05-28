import Axios from "axios"

import linkAPITask from "../../Supports/Constants/LinkAPITask"

export const onGetCategoryByWorkspace = (idWorkspace, token) => {
    return (dispatch) => {
        Axios.post (`${linkAPITask}/get-category-by-workspace`, {idWorkspace, token})

        .then ((res) => {
            // console.log (res.data.data)

            if (res.data.error === false) {
                dispatch ({
                    type: "GET_CATEGORY_SUCCESS",
                    payload: res.data.data
                })

            } else if (res.data.error === true) {
                dispatch ({
                    type: "GET_CATEGORY_ERROR",
                    payload: res.data.message
                })
            }
        })

        .catch ((err) => {
            console.log (err)
            dispatch ({
                type: "GET_CATEGORY_ERROR",
                payload: err.message
            })
        })
    }
}

export const onGetTaskByWorkspace = (idWorkspace, token) => {
    return (dispatch) => {
        Axios.post (`${linkAPITask}/get-task-by-workspace`, {idWorkspace, token})

        .then ((res) => {
            // console.log (res.data.data)
            if (res.data.error === false) {
                dispatch ({
                    type: "GET_TASK_WORKSPACE_SUCCESS",
                    payload: res.data.data
                })

            } else if (res.data.error === true) {
                dispatch ({
                    type: "GET_TASK_WORKSPACE_ERROR",
                    payload:res.data.message
                })
            }
        })

        .catch ((err) => {
            console.log (err)
            dispatch ({
                type: "GET_TASK_WORKSPACE_ERROR",
                payload:err.message
            })
        })
    }
}