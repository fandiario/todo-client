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

export const getDataWorkspace = (idWorkspace) => {
    return (dispatch) => {
        Axios.post (`${linkAPIWorkspace}/get-workspace-data`, {idWorkspace})

        .then ((res) => {
            // console.log (res.data)

            if (res.data.error === false) {
                dispatch ({
                    type: "GET_WORKSPACE_DATA_SUCCESS",
                    payload: res.data.data
                })

            } else {
                dispatch ({
                    type: "GET_WORKSPACE_DATA_ERROR",
                    payload: res.data.message
                })
            }
        })

        .catch ((err) => {
            console.log (err)
            dispatch ({
                type: "GET_WORKSPACE_DATA_ERROR",
                payload: err.message
            })
        })
    }
}

export const getMembersWorkspace = (idWorkspace, token) => {
    return (dispatch) => {
        Axios.post (`${linkAPIWorkspace}/get-members-from-workspace`, {workspaces_id: idWorkspace, token: token})

        .then ((res) => {
            // console.log (res.data.data)
            dispatch ({
                type: "GET_WORKSPACE_MEMBERS_SUCCESS",
                payload: res.data.data
            })
        })

        .catch ((err) => {
            console.log (err)
            dispatch ({
                type: "GET_WORKSPACE_MEMBERS_ERROR",
                payload: err.message
            })
        })
    }
}

export const addWorkspace = (title, token) => {
    return (dispatch) => {
        Axios.post (`${linkAPIWorkspace}/create-workspace`, {title, token})

        .then ((res) => {
            if (res.data.error === false) {

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


            } else {
                dispatch ({
                    type: "CREATE_WORKSPACE_ERROR",
                    payload: res.data.message
                })
            }
        })

        .catch ((err) => {
            console.log (err)
            dispatch ({
                type: "CREATE_WORKSPACE_ERROR",
                payload: err.message
            })
        })
    }
    
}
 
export const addMemberWorkspace = (idWorkspace, token, email) => {
    return (dispatch) => {
        Axios.post (`${linkAPIWorkspace}/${idWorkspace}/assign-member`, {token, email})

        .then ((res) => {
            if (res.data.error === false) {
                // dispatch ({
                //     type: "ADD_MEMBER_SUCCESS",
                //     payload: res.data.message
                // }) 

                Axios.post (`${linkAPIWorkspace}/get-members-from-workspace`, {workspaces_id: idWorkspace, token: token})

                .then ((res) => {
                    // console.log (res.data.data)
                    dispatch ({
                        type: "GET_WORKSPACE_MEMBERS_SUCCESS",
                        payload: res.data.data
                    })
                })

                .catch ((err) => {
                    console.log (err)
                    dispatch ({
                        type: "GET_WORKSPACE_MEMBERS_ERROR",
                        payload: err.message
                    })
                })

            } else {
                dispatch ({
                    type: "ADD_MEMBER_ERROR",
                    payload: res.data.message
                }) 
            }
        })

        .catch ((err) => {
            console.log (err)
            dispatch ({
                type: "ADD_MEMBER_ERROR",
                payload: err.message
            })
        })
    }
}

export const removeWorkspace = (idWorkspace, token) => {
    return (dispatch) => {
        Axios.post (`${linkAPIWorkspace}/${idWorkspace}/delete-workspace`, {idWorkspace, token})

        .then ((res) => {
            if (res.data.error === false) {

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

            } else {
                dispatch ({
                    type: "DELETE_WORKSPACE_ERROR",
                    payload: res.data.message
                }) 
            }
        })

        .catch ((err) => {
            console.log (err)
            dispatch ({
                type: "DELETE_WORKSPACE_ERROR",
                payload: err.message
            })
        })
    }
}

export const deleteMemberWorkspace = (idWorkspace, token, members_users_id) => {
    return (dispatch) => {
        Axios.post (`${linkAPIWorkspace}/${idWorkspace}/delete-member-from-workspace`, {token, members_users_id})

        .then ((res) => {
            if (res.data.error === false) {
                Axios.post (`${linkAPIWorkspace}/get-members-from-workspace`, {workspaces_id: idWorkspace, token: token})

                .then ((res) => {
                    // console.log (res.data.data)
                    dispatch ({
                        type: "GET_WORKSPACE_MEMBERS_SUCCESS",
                        payload: res.data.data
                    })
                })

                .catch ((err) => {
                    console.log (err)
                    dispatch ({
                        type: "GET_WORKSPACE_MEMBERS_ERROR",
                        payload: err.message
                    })
                })


            } else {
                dispatch ({
                    type: "DEL_MEMBER_ERROR",
                    payload: res.data.message
                })  
            }
        })

        .catch ((err) => {
            console.log (err)
            dispatch ({
                type: "DEL_MEMBER_ERROR",
                payload: err.message
            })
        })
    }
}

export const editWorkspace = (idWorkspace, title, token) => {
    return (dispatch) => {
        Axios.patch (`${linkAPIWorkspace}/${idWorkspace}/edit-workspace`, {title, token})

        .then ((res) => {
            if (res.data.error === false) {
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

            } else {
                dispatch ({
                    type: "EDIT_WORKSPACE_ERROR",
                    payload: res.data.message
                })
            }
        })

        .catch ((err) => {
            console.log (err)
            dispatch ({
                type: "EDIT_WORKSPACE_ERROR",
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