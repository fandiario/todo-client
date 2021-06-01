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

export const createCategory = (category, idWorkspace, token) => {
    return (dispatch) => {
        Axios.post (`${linkAPITask}/create-category`, {category, idWorkspace, token})

        .then ((res) => {
            if (res.data.error === false) {
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

            } else {
                dispatch ({
                    type: "ADD_CATEGORY_ERROR",
                    payload:res.data.message
                })
            }
        })

        .catch ((err) => {
            console.log (err)
            dispatch ({
                type: "ADD_CATEGORY_ERROR",
                payload:err.message
            })
        })
    }
}

export const deleteCategory = (idCategory,idWorkspace, token) => {
    return (dispatch) => {
        Axios.post (`${linkAPITask}/delete-category`, {idCategory, token})

        .then ((res) => {
            if (res.data.error === false) {
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
                
            } else {
                dispatch ({
                    type: "DELETE_CATEGORY_ERROR",
                    payload:res.data.message
                })
            }
        })

        .catch ((err) => {
            console.log (err)
            dispatch ({
                type: "DELETE_CATEGORY_ERROR",
                payload:err.message
            })
        })
    }
}