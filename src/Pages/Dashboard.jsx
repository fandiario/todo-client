import React from "react"

// Redux
import {connect} from "react-redux"
import {getDataUser} from "../Redux/Actions/UserAction"
import {onGetWorkspaceUser, onGetWorkspaceByAssigned} from "../Redux/Actions/WorkspaceAction"
import {onGetCategoryByWorkspace, onGetTaskByWorkspace} from "../Redux/Actions/TaskAction"

// Component
import Logo from "../Components/Logo"
import EditUser from "../Components/EditUser"

import CreateWorkspace from "../Components/AddWorkspace"
import DetailWorkspace from "../Components/DetailWorkspace"

import CreateCategory from "../Components/AddCategory"

// Reactstrap
import {Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from "reactstrap"

// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

// SweetAlert
import swal from "sweetalert"

class Dashboard extends React.Component {

    state = {
        // dataUser: null,
        dataWorkspace: null,
        activeWorkspace: null,
        taskWorkspaces: [],
        dropDownWorkspaces: [],
        dropDownCategories: [],
        dropDownTasks: [],
        modalDetailWorkspaces: [],
        modalDetailAssignedWorkspaces: []
    }

    componentDidMount () {
        this.getDataUser ()
        this.getWorkspaceByUser ()
        this.getAssignedWorkspace ()
    }

    // componentDidUpdate () {
    //     this.getDataUser ()
    // }

    getDataUser = () => {
        let token = localStorage.getItem ("token")

        this.props.getDataUser (token)

        if (this.props.user.dataUser) {
            this.setState ({dataUser: this.props.user.dataUser})
        }
    }

    onGetDataUserAfterEdit = (data) => {
        this.setState ({dataUser: data})
    }

    getWorkspaceByUser = () => {
        let token = localStorage.getItem ("token")

        this.props.onGetWorkspaceUser (token)

        // console.log (this.props.workspace.workspaces)
        let arrDropDowns = []
        let arrDetailWorkspaces = []

        if (this.props.workspace.workspaces.data) {
            this.setState ({dataWorkspace: this.props.workspace.workspaces})
            arrDropDowns.push (false)

            // console.log (this.props.workspace.workspaces.data)

            for (let i = 0; i < (this.props.workspace.workspaces.data).length; i++){
                arrDetailWorkspaces.push (false)
            }
            

            for (let i = 0; i < (this.props.workspace.workspaces.data).length; i++){
                if (this.props.workspace.workspaces.data[i].is_default === 1){
                    // this.setState ({activeWorkspace: {id: this.props.workspace.workspaces.data[i].workspaces_id, title: this.props.workspace.workspaces.data[i].title}})
                    this.getCategoryFromWorkspace (this.props.workspace.workspaces.data[i].workspaces_id)
                
                } else if (i === 0) {
                    // this.setState ({activeWorkspace: {id: this.props.workspace.workspaces.data[0].workspaces_id, title: this.props.workspace.workspaces.data[0].title}})
                    this.getCategoryFromWorkspace (this.props.workspace.workspaces.data[0].workspaces_id)
                }
            }
        }
        
        this.setState ({dropDownWorkspaces: arrDropDowns})

        this.setState ({modalDetailWorkspaces: arrDetailWorkspaces})

        // console.log (this.props.workspace.workspaces)
    }

    getAssignedWorkspace = () => {
        let token = localStorage.getItem ("token")

        this.props.onGetWorkspaceByAssigned (token)

        // let arrDetailAssignedWorkspaces = []

        // arrDetailAssignedWorkspaces.push (false)

        // this.setState ({modalDetailAssignedWorkspaces: arrDetailAssignedWorkspaces})
    }

    getCategoryFromWorkspace = (idWorkspace) => {
        let token = localStorage.getItem ("token")

        this.props.onGetCategoryByWorkspace (idWorkspace, token)

        let arrDropDowns = []

        if (this.props.workspace.workspaces.data) {
            // console.log (this.props.workspace.workspaces.data[1].workspaces_id)

            for (let i = 0; i < (this.props.workspace.workspaces.data).length; i++){
                if (this.props.workspace.workspaces.data[i].workspaces_id === idWorkspace) {
                    this.setState ({activeWorkspace: {id: this.props.workspace.workspaces.data[i].workspaces_id, title: this.props.workspace.workspaces.data[i].title}})
                    arrDropDowns.push (false)
                }
            }

        } else if (this.props.workspace.assignedWorkspaces.data) {
            for (let i = 0; i < (this.props.workspace.assignedWorkspaces.data).length; i++){
                if (this.props.workspace.assignedWorkspaces.data[i].workspaces_id === idWorkspace) {
                    this.setState ({activeWorkspace: {id: this.props.workspace.assignedWorkspaces.data[i].workspaces_id, title: this.props.workspace.assignedWorkspaces.data[i].title}})
                    arrDropDowns.push (false)
                }
            }
        }
            
        this.getTaskWorkspace (idWorkspace)

        this.setState ({dropDownCategories: arrDropDowns})

        // console.log (this.state.activeWorkspace)
    }

    getTaskWorkspace = (idWorkspace) => {
        let token = localStorage.getItem ("token")

        // console.log (this.state.activeWorkspace)
        
        let arrTasks = []

        let arrDropDowns = []

        this.props.onGetTaskByWorkspace (idWorkspace, token)

        if (this.props.task.taskWorkspaces) {
            arrTasks = this.props.workspace.taskWorkspaces

            if (arrTasks) {
                for (let i = 0; i < arrTasks.length; i++) {
                    arrDropDowns.push (false)
                }
            }
            
            this.setState ({taskWorkspaces: arrTasks})
            this.setState ({dropDownTasks: arrDropDowns})
        }

        // console.log (this.props.task.taskWorkspaces)
    }

    toggleDropdownWorkspace = (i) => {
        if (this.state.dropDownWorkspaces) {
            let arrDropDownWorkspaces = this.state.dropDownWorkspaces

            arrDropDownWorkspaces[i] = !(this.state.dropDownWorkspaces[i])

            this.setState ({dropDownWorkspaces: arrDropDownWorkspaces})
        }
    }

    toggleDropdownCategory = (i) => {
        if (this.state.dropDownCategories) {
            let arrDropDownCategories = this.state.dropDownCategories

            arrDropDownCategories[i] = !(this.state.dropDownCategories[i])

            this.setState ({dropDownCategories: arrDropDownCategories})
        }
    }

    toggleDropdownTask = (i) => {
        if (this.state.dropDownTasks) {
            let arrDropDownTasks = this.state.dropDownTasks

            arrDropDownTasks[i] = !(this.state.dropDownTasks[i])

            this.setState ({dropDownTasks: arrDropDownTasks})
        }
    }

    onShowDetailWorkspace = (index) => {

        // console.log (idWorkspace)

        if (this.state.modalDetailWorkspaces) {

            let arrModalDetailWorkspaces = this.state.modalDetailWorkspaces

            // arrModalDetailWorkspaces[index] = !(this.state.modalDetailWorkspaces[index])
            arrModalDetailWorkspaces[index] = true

            this.setState ({modalDetailWorkspaces: arrModalDetailWorkspaces})

            // console.log (this.state.modalDetailWorkspaces)
        }

    }

    onToggleDetailWorkspace = (data) => {
        // console.log (`From detail workspace: ${data.index}`)
        let arrModalDetailWorkspaces = this.state.modalDetailWorkspaces
        
        arrModalDetailWorkspaces[data.index] = data.state  
        
        this.setState ({modalDetailWorkspaces: arrModalDetailWorkspaces})
    }

    onLogOutUser = () => {
        swal ({
            title: "Log Out ?",
            text: "Are you sure you want to log out ?",
            icon: "warning",
            buttons: true,
            dangerMode: true
        })

        .then ((res) => {
            if (res) {
                localStorage.removeItem ("token")
                window.location = "/"
            } 
        })

        .catch ((err) => {
            console.log (err)
        })
    }

    render () {

        // if (this.props.user.dataUser) {
        //     console.log (this.props.user.dataUser.email)
        // }

        // if (this.props.workspace.workspaces) {
        //     console.log (this.props.workspace.workspaces)
        // }

        // if (this.state.dataWorkspace) {
        //     console.log (this.state.dataWorkspace)
        // }

        // if (!(this.state.dataUser)) {
        //     return (
        //         <div className="container">
        //             <Logo></Logo>

        //             <div className="row my-5">
        //                 <h1>
        //                     Now Loading
        //                 </h1>
        //             </div>
        //         </div>
        //     )
        // }

        return (
            <div className="container">
                <Logo></Logo>

                <div className="row my-5">

                    {/* Sidebar */}
                    <div className="col-3">
                        <div className="col-12 todo-bg-primary todo-border-dark todo-border-rad5 shadow">

                            <div className="mb-3 text-center">
                                <h3>
                                    Welcome
                                </h3>
                            </div>

                            {/* User'email */}
                            <div className="mb-3 row">
                                <div className="col-9 d-flex align-self-center">
                                    {/* {this.state.dataUser.email} */}
                                    {this.props.user.dataUser.email}
                                </div>
                                <div className="col-1 p-0">
                                    {/* <button className="btn todo-btn-primary todo-border-dark todo-border-rad5">
                                        <FontAwesomeIcon icon={faCog}></FontAwesomeIcon>
                                    </button>  */}
                                    <EditUser onGetDataUser = {this.onGetDataUserAfterEdit}></EditUser>
                                </div>
                            </div>

                            <div className="todo-border-dark todo-bg-dark col-12 mb-3" style={{height: "1px"}}></div>

                            <div className="mb-3 text-center">
                                <h3>
                                    Your Workspace
                                </h3>
                            </div>

                            <div className="mb-3">
                                <CreateWorkspace></CreateWorkspace>
                            </div>

                            {/* User's workspace */}
                            {
                                this.props.workspace.workspaces.data ?
                                    this.props.workspace.workspaces.data.map ((el, i) => {
                                        return (
                                            <div className="mb-3" key={i}>

                                                <div className="row d-flex align-items-center mb-1">
                                                    <div className="col-9 pl-3">
                                                        <button className="btn todo-btn-primary p-0" onClick={() => this.getCategoryFromWorkspace (el.workspaces_id)}>
                                                            {el.title}
                                                        </button>
                                                    </div>
                                                    <div className="col-1 p-0">
                                                        <Dropdown isOpen={this.state.dropDownWorkspaces[i]} toggle={() => this.toggleDropdownWorkspace(i)}>
                                                            <DropdownToggle className="btn todo-btn-primary todo-border-dark todo-border-rad5">
                                                                <FontAwesomeIcon icon={faBars}></FontAwesomeIcon>
                                                            </DropdownToggle>
                                                            <DropdownMenu className=" todo-border-dark todo-border-rad5">
                                                                <DropdownItem className="">
                                                                    <input type="button" value="Edit This Workspace" className="btn"/>
                                                                </DropdownItem>
                                                                <DropdownItem className="">
                                                                    <input type="button" value="Remove This Workspace" className="btn"/>
                                                                </DropdownItem>
                                                                <DropdownItem className="">
                                                                    <input type="button" value="Detail" className="btn" onClick={() => this.onShowDetailWorkspace(i)}/>
                                                                    
                                                                    {/* Modal Detail Workspace */}
                                                                    <DetailWorkspace idWorkspace={el.workspaces_id} stateModal={this.state.modalDetailWorkspaces[i]} indexWorkspace={i} toggleModalDetail = {this.onToggleDetailWorkspace}></DetailWorkspace>

                                                                </DropdownItem>
                                                            </DropdownMenu>
                                                        </Dropdown>
                                                    </div>
                                                </div>

                                                {/* <div className="row px-3">
                                                    <input type="button" value="Detail" className="col-12 p-0 btn todo-btn-primary todo-border-dark todo-border-rad5" />
                                                </div> */}
                                                
                                            </div>
                                        )
                                    })
                                :
                                    <div className="mb-3">
                                        You don't have any workspace yet.
                                     </div>
                            }

                            <div className="todo-border-dark todo-bg-dark col-12 mb-3" style={{height: "1px"}}></div>

                            <div className="mb-3 text-center">
                                <h3>
                                    Assigned Workspace
                                </h3>
                            </div>
                            
                            {/* User's assigned workspace */}
                            {
                                this.props.workspace.assignedWorkspaces.data ?
                                    this.props.workspace.assignedWorkspaces.data.map ((el, i) => {
                                        return (
                                            <div className="mb-3" key={i}>

                                                <div className="row d-flex align-items-center mb-1">
                                                    <div className="col-9 pl-3">
                                                        <button className="btn todo-btn-primary p-0" onClick={() => this.getCategoryFromWorkspace (el.workspaces_id)}>
                                                            {el.title}
                                                        </button>
                                                    </div>
                                                    <div className="col-1 p-0">
                                                        <Dropdown isOpen={this.state.dropDownWorkspaces[i]} toggle={() => this.toggleDropdownWorkspace(i)}>
                                                            <DropdownToggle className="btn todo-btn-primary todo-border-dark todo-border-rad5">
                                                                <FontAwesomeIcon icon={faBars}></FontAwesomeIcon>
                                                            </DropdownToggle>
                                                            <DropdownMenu className=" todo-border-dark todo-border-rad5">
                                                                {/* <DropdownItem className="">
                                                                    <input type="button" value="Edit This Workspace" className="btn"/>
                                                                </DropdownItem>
                                                                <DropdownItem className="">
                                                                    <input type="button" value="Remove This Workspace" className="btn"/>
                                                                </DropdownItem> */}
                                                                <DropdownItem className="">
                                                                    <input type="button" value="Detail" className="btn"/>
                                                                </DropdownItem>
                                                            </DropdownMenu>
                                                        </Dropdown>
                                                    </div>
                                                </div>

                                                {/* <div className="row px-3">
                                                    <input type="button" value="Detail" className="col-12 p-0 btn todo-btn-primary todo-border-dark todo-border-rad5" />
                                                </div> */}
                                                
                                            </div>
                                        )
                                    })
                                :
                                    <div className="mb-3">
                                        You are not assigned to any workspace yet.
                                     </div>
                            }

                            <div className="todo-border-dark todo-bg-dark col-12 mb-3" style={{height: "1px"}}></div>

                            <div className="mb-3">
                                <input type="button" value="Log Out" className="col-12 btn todo-btn-dark todo-border-dark" onClick={() => this.onLogOutUser()}/>
                            </div>
                        </div>
                    </div>
                    
                    {/* Workspace */}
                    <div className="col-9">

                        <div className="row mb-3">
                            <div className="col-10">

                                {/* Active Workspace */}
                                {
                                    this.state.activeWorkspace ?
                                        <h5>
                                            Workspace : {this.state.activeWorkspace.title}
                                        </h5>
                                    :
                                        <h5>
                                            Welcome. Please select one of your workspace from sidebar.
                                        </h5>
                                }

                                <div className="todo-border-dark todo-bg-dark col-12 mb-3" style={{height: "1px"}}></div>
                                
                                {/* Alert */}
                                {
                                    this.props.user.message && this.props.user.error === true  ?
                                        <div className="row mx-3 my-3">
                                            <div className="col-12 d-flex justify-content-center">
                                                <div className="alert alert-danger todo-border-dark todo-border-rad5">
                                                    {this.props.user.message}
                                                </div>
                                            </div>
                                        </div>
                                    :
                                        null
                                }

                                {
                                    this.props.user.message && this.props.user.error === false  ?
                                        <div className="row mx-3 my-3">
                                            <div className="col-12 d-flex justify-content-center">
                                                <div className="alert alert-primary todo-border-dark todo-border-rad5">
                                                    {this.props.user.message}
                                                </div>
                                            </div>
                                        </div>
                                    :
                                        null
                                }
                                
                                {/* Buttons */}    
                                {
                                    this.props.task.dataCategories.length !== 0 ?
                                        <div className="mb-3 d-flex flex-row-reverse">
                                            {/* <button className="btn btn-light todo-border-dark todo-border-rad5 shadow">
                                                <span className="mr-3">
                                                    <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                                                </span>
                                                <span>
                                                    Add New Categories ?
                                                </span>
                                            </button> */}
                                        <CreateCategory></CreateCategory>
                                        </div>
                                    :
                                        null
                                }

                                {/* Categories */}
                                <div className="mb-3">
                                    {
                                        this.props.task.dataCategories.length !== 0 ?
                                            this.props.task.dataCategories.map ((el, i) => {
                                                return (
                                                    <div key={i}>
                                                        {
                                                            el.category === "to do" ?
                                                                <div className="todo-border-dark todo-border-rad5 shadow mb-3 p-1">
                                                                    
                                                                    <div className="d-flex justify-content-between mt-3">
                                                                        <div className="col-2 p-1 todo-border-dark todo-bg-primary todo-border-rad5 mx-3 todo-fs-bold">
                                                                            To Do
                                                                        </div>
                                                            
                                                                        <div className="mx-3">
                                                                            <Dropdown isOpen={this.state.dropDownCategories[i]} toggle={() => this.toggleDropdownCategory(i)}>
                                                                                <DropdownToggle className="btn btn-light todo-border-dark todo-border-rad5">
                                                                                    <FontAwesomeIcon icon={faBars} ></FontAwesomeIcon>
                                                                                </DropdownToggle>
                                                                                <DropdownMenu className="todo-border-dark todo-border-rad5">
                                                                                    {/* <DropdownItem>
                                                                                        <input type="button" value="Remove Category ?" className="btn"/>
                                                                                    </DropdownItem> */}
                                                                                    <DropdownItem>
                                                                                        <input type="button" value="Add New Task ?" className="btn"/>
                                                                                    </DropdownItem>
                                                                                </DropdownMenu>
                                                                            </Dropdown>
                                                                        </div>

                                                                    </div>
                                                                    

                                                                    <div>
                                                                        {
                                                                            this.props.task.taskWorkspaces ?
                                                                                this.props.task.taskWorkspaces.map ((val, index) => {
                                                                                    return (
                                                                                        <div key={index}>
                                                                                            {
                                                                                                val.category_tasks_id === 1 ?
                                                                                                    <div className="col-10 my-3 ml-3 p-1 todo-border-dark todo-border-rad5 shadow">
                                                                                                        
                                                                                                        <div className="mb-1 d-flex flex-row-reverse">
                                                                                                            <Dropdown isOpen={this.state.dropDownTasks[i]} toggle={() => this.toggleDropdownTask(i)}>
                                                                                                                <DropdownToggle className="btn btn-light todo-border-dark todo-border-rad5">
                                                                                                                    <FontAwesomeIcon icon={faBars} ></FontAwesomeIcon>
                                                                                                                </DropdownToggle>

                                                                                                                <DropdownMenu className="todo-border-dark todo-border-rad5">
                                                                                                                    <DropdownItem>
                                                                                                                        <input type="button" value="Set to On Going" className="btn"/>
                                                                                                                    </DropdownItem>
                                                                                                                    <DropdownItem>
                                                                                                                        <input type="button" value="Set to Cancelled" className="btn"/>
                                                                                                                    </DropdownItem>
                                                                                                                    <DropdownItem>
                                                                                                                        <input type="button" value="Edit This Task" className="btn"/>
                                                                                                                    </DropdownItem>
                                                                                                                    <DropdownItem>
                                                                                                                        <input type="button" value="Remove This Task" className="btn"/>
                                                                                                                    </DropdownItem>
                                                                                                                </DropdownMenu>
                                                                                                            </Dropdown>
                                                                                                        </div>

                                                                                                        <div className="mb-1">
                                                                                                            <div className="todo-fs-bold">
                                                                                                                Title: 
                                                                                                            </div>
                                                                                                            <div>
                                                                                                                {val.title}
                                                                                                            </div>
                                                                                                        </div>
                                                                                                        
                                                                                                        <div className="todo-fs-bold">
                                                                                                            Description:
                                                                                                        </div>
                                                                                                        <div className="mb-3">
                                                                                                            {val.description}
                                                                                                        </div>

                                                                                                        {/* <div className="mb-1">
                                                                                                            <span className="todo-fs-bold">
                                                                                                                Start:
                                                                                                            </span>
                                                                                                            <span>
                                                                                                                {(new Date (val.date_start)).toLocaleString()}
                                                                                                            </span>
                                                                                                        </div>

                                                                                                        <div className="mb-1">
                                                                                                            <span className="todo-fs-bold">
                                                                                                                End:
                                                                                                            </span>
                                                                                                            <span>
                                                                                                                {(new Date (val.date_end)).toLocaleString()}
                                                                                                            </span>
                                                                                                        </div> */}

                                                                                                        <div className="mb-1">
                                                                                                            <button className=" col-12 btn todo-btn-primary todo-border-dark todo-border-rad5 todo-fs-bold">
                                                                                                                Detail
                                                                                                            </button>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                    
                                                                                                :
                                                                                                    <div className="ml-3 my-3">
                                                                                                        You don't have any task in this category.
                                                                                                    </div>
                                                                                            }
                                                                                        </div>
                                                                                    )
                                                                                })
                                                                            :
                                                                                <div className="ml-3 my-3">
                                                                                    You don't have any task yet.
                                                                                </div>
                                                                        }
                                                                    </div>
                                                                </div>
                                                                
                                                            :
                                                                el.category === "on going" ?
                                                                    <div className="todo-border-dark todo-border-rad5 shadow mb-3 p-1">
                                                                        <div className="d-flex justify-content-between mt-3">
                                                                            <div className="col-2 p-1 todo-border-dark todo-bg-secondary text-light todo-border-rad5 mx-3 todo-fs-bold">
                                                                                On Going
                                                                            </div>
                                                                            
                                                                            <div className="mx-3">
                                                                                <Dropdown isOpen={this.state.dropDownCategories[i]} toggle={() => this.toggleDropdownCategory(i)}>
                                                                                    <DropdownToggle className="btn btn-light todo-border-dark todo-border-rad5">
                                                                                        <FontAwesomeIcon icon={faBars} ></FontAwesomeIcon>
                                                                                    </DropdownToggle>
                                                                                    <DropdownMenu className="todo-border-dark todo-border-rad5">
                                                                                        {/* <DropdownItem>
                                                                                            <input type="button" value="Remove Category ?" className="btn"/>
                                                                                        </DropdownItem> */}
                                                                                        <DropdownItem>
                                                                                            <input type="button" value="Add New Task ?" className="btn"/>
                                                                                        </DropdownItem>
                                                                                    </DropdownMenu>
                                                                                </Dropdown>
                                                                            </div>

                                                                        </div>

                                                                        <div>
                                                                            {
                                                                                this.props.task.taskWorkspaces ?
                                                                                    this.props.task.taskWorkspaces.map ((val, index) => {
                                                                                        return (
                                                                                            <div key={index}>
                                                                                                {
                                                                                                    val.category_tasks_id === 2 ?
                                                                                                        <div className="col-10 my-3 ml-3 p-1 todo-border-dark todo-border-rad5 shadow">
                                                                                                            
                                                                                                            <div className="mb-1 d-flex flex-row-reverse">
                                                                                                                <Dropdown isOpen={this.state.dropDownTasks[i]} toggle={() => this.toggleDropdownTask(i)}>
                                                                                                                    <DropdownToggle className="btn btn-light todo-border-dark todo-border-rad5">
                                                                                                                        <FontAwesomeIcon icon={faBars} ></FontAwesomeIcon>
                                                                                                                    </DropdownToggle>

                                                                                                                    <DropdownMenu className="todo-border-dark todo-border-rad5">
                                                                                                                        <DropdownItem>
                                                                                                                            <input type="button" value="Set to Done" className="btn"/>
                                                                                                                        </DropdownItem>
                                                                                                                        <DropdownItem>
                                                                                                                            <input type="button" value="Set to Cancelled" className="btn"/>
                                                                                                                        </DropdownItem>
                                                                                                                        <DropdownItem>
                                                                                                                            <input type="button" value="Edit This Task" className="btn"/>
                                                                                                                        </DropdownItem>
                                                                                                                        <DropdownItem>
                                                                                                                            <input type="button" value="Remove This Task" className="btn"/>
                                                                                                                        </DropdownItem>
                                                                                                                    </DropdownMenu>
                                                                                                                </Dropdown>
                                                                                                            </div>

                                                                                                            <div className="mb-1">
                                                                                                                <div className="todo-fs-bold">
                                                                                                                    Title: 
                                                                                                                </div>
                                                                                                                <div>
                                                                                                                    {val.title}
                                                                                                                </div>
                                                                                                            </div>
                                                                                                            
                                                                                                            <div className="todo-fs-bold">
                                                                                                                Description:
                                                                                                            </div>
                                                                                                            <div className="mb-3">
                                                                                                                {val.description}
                                                                                                            </div>

                                                                                                            {/* <div className="mb-1">
                                                                                                                <span className="todo-fs-bold">
                                                                                                                    Start:
                                                                                                                </span>
                                                                                                                <span>
                                                                                                                    {(new Date (val.date_start)).toLocaleString()}
                                                                                                                </span>
                                                                                                            </div>

                                                                                                            <div className="mb-1">
                                                                                                                <span className="todo-fs-bold">
                                                                                                                    End:
                                                                                                                </span>
                                                                                                                <span>
                                                                                                                    {(new Date (val.date_end)).toLocaleString()}
                                                                                                                </span>
                                                                                                            </div> */}

                                                                                                            <div className="mb-1">
                                                                                                                <button className=" col-12 btn todo-btn-primary todo-border-dark todo-border-rad5 todo-fs-bold">
                                                                                                                    Detail
                                                                                                                </button>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                        
                                                                                                    :
                                                                                                        <div className="ml-3 my-3">
                                                                                                            You don't have any task in this category.
                                                                                                        </div>
                                                                                                }
                                                                                            </div>
                                                                                        )
                                                                                    })
                                                                                :
                                                                                    <div className="ml-3 my-3">
                                                                                        You don't have any task yet.
                                                                                    </div>
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                    
                                                                :
                                                                    el.category === "done" ?
                                                                        <div className="todo-border-dark todo-border-rad5 shadow mb-3 p-1">
                                                                            <div className="d-flex justify-content-between mt-3">
                                                                                <div className="col-2 p-1 todo-border-dark todo-bg-success todo-border-rad5 mx-3 todo-fs-bold">
                                                                                    Done
                                                                                </div>
                                                                                
                                                                                <div className="mx-3">
                                                                                    <Dropdown isOpen={this.state.dropDownCategories[i]} toggle={() => this.toggleDropdownCategory(i)}>
                                                                                        <DropdownToggle className="btn btn-light todo-border-dark todo-border-rad5">
                                                                                            <FontAwesomeIcon icon={faBars} ></FontAwesomeIcon>
                                                                                        </DropdownToggle>
                                                                                        <DropdownMenu className="todo-border-dark todo-border-rad5">
                                                                                            {/* <DropdownItem>
                                                                                                <input type="button" value="Remove Category ?" className="btn"/>
                                                                                            </DropdownItem> */}
                                                                                            <DropdownItem>
                                                                                                <input type="button" value="Add New Task ?" className="btn"/>
                                                                                            </DropdownItem>
                                                                                        </DropdownMenu>
                                                                                    </Dropdown>
                                                                                </div>

                                                                            </div>

                                                                            <div>
                                                                                {
                                                                                    this.props.task.taskWorkspaces ?
                                                                                        this.props.task.taskWorkspaces.map ((val, index) => {
                                                                                            return (
                                                                                                <div key={index}>
                                                                                                    {
                                                                                                        val.category_tasks_id === 3 ?
                                                                                                            <div className="col-10 my-3 ml-3 p-1 todo-border-dark todo-border-rad5 shadow">
                                                                                                                
                                                                                                                <div className="mb-1 d-flex flex-row-reverse">
                                                                                                                    <Dropdown isOpen={this.state.dropDownTasks[i]} toggle={() => this.toggleDropdownTask(i)}>
                                                                                                                        <DropdownToggle className="btn btn-light todo-border-dark todo-border-rad5">
                                                                                                                            <FontAwesomeIcon icon={faBars} ></FontAwesomeIcon>
                                                                                                                        </DropdownToggle>

                                                                                                                        <DropdownMenu className="todo-border-dark todo-border-rad5">
                                                                                                                            <DropdownItem>
                                                                                                                                <input type="button" value="Edit This Task" className="btn"/>
                                                                                                                            </DropdownItem>
                                                                                                                            <DropdownItem>
                                                                                                                                <input type="button" value="Remove This Task" className="btn"/>
                                                                                                                            </DropdownItem>
                                                                                                                        </DropdownMenu>
                                                                                                                    </Dropdown>
                                                                                                                </div>

                                                                                                                <div className="mb-1">
                                                                                                                    <div className="todo-fs-bold">
                                                                                                                        Title: 
                                                                                                                    </div>
                                                                                                                    <div>
                                                                                                                        {val.title}
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                                
                                                                                                                <div className="todo-fs-bold">
                                                                                                                    Description:
                                                                                                                </div>
                                                                                                                <div className="mb-3">
                                                                                                                    {val.description}
                                                                                                                </div>

                                                                                                                {/* <div className="mb-1">
                                                                                                                    <span className="todo-fs-bold">
                                                                                                                        Start:
                                                                                                                    </span>
                                                                                                                    <span>
                                                                                                                        {(new Date (val.date_start)).toLocaleString()}
                                                                                                                    </span>
                                                                                                                </div>

                                                                                                                <div className="mb-1">
                                                                                                                    <span className="todo-fs-bold">
                                                                                                                        End:
                                                                                                                    </span>
                                                                                                                    <span>
                                                                                                                        {(new Date (val.date_end)).toLocaleString()}
                                                                                                                    </span>
                                                                                                                </div> */}

                                                                                                                <div className="mb-1">
                                                                                                                    <button className=" col-12 btn todo-btn-primary todo-border-dark todo-border-rad5 todo-fs-bold">
                                                                                                                        Detail
                                                                                                                    </button>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                            
                                                                                                        :
                                                                                                            <div className="ml-3 my-3">
                                                                                                                You don't have any task in this category.
                                                                                                            </div>
                                                                                                    }
                                                                                                </div>
                                                                                            )
                                                                                        })
                                                                                    :
                                                                                        <div className="ml-3 my-3">
                                                                                            You don't have any task yet.
                                                                                        </div>
                                                                                }
                                                                            </div>
                                                                        </div>
                                                                        
                                                                    :
                                                                        el.category === "cancelled" ?
                                                                            <div className="todo-border-dark todo-border-rad5 shadow mb-3 p-1">
                                                                                <div className="d-flex justify-content-between mt-3">
                                                                                    <div className="col-2 p-1 todo-border-dark todo-bg-dark text-light todo-border-rad5 mx-3 todo-fs-bold">
                                                                                        Cancelled
                                                                                    </div>
                                                                                    
                                                                                    <div className="mx-3">
                                                                                        <Dropdown isOpen={this.state.dropDownCategories[i]} toggle={() => this.toggleDropdownCategory(i)}>
                                                                                            <DropdownToggle className="btn btn-light todo-border-dark todo-border-rad5">
                                                                                                <FontAwesomeIcon icon={faBars} ></FontAwesomeIcon>
                                                                                            </DropdownToggle>
                                                                                            <DropdownMenu className="todo-border-dark todo-border-rad5">
                                                                                                {/* <DropdownItem>
                                                                                                    <input type="button" value="Remove Category ?" className="btn"/>
                                                                                                </DropdownItem> */}
                                                                                                <DropdownItem>
                                                                                                    <input type="button" value="Add New Task ?" className="btn"/>
                                                                                                </DropdownItem>
                                                                                            </DropdownMenu>
                                                                                        </Dropdown>
                                                                                    </div>

                                                                                </div>

                                                                                <div>
                                                                                    {
                                                                                        this.props.task.taskWorkspaces ?
                                                                                            this.props.task.taskWorkspaces.map ((val, index) => {
                                                                                                return (
                                                                                                    <div key={index}>
                                                                                                        {
                                                                                                            val.category_tasks_id === 4 ?
                                                                                                                <div className="col-10 my-3 ml-3 p-1 todo-border-dark todo-border-rad5 shadow">
                                                                                                                    
                                                                                                                    <div className="mb-1 d-flex flex-row-reverse">
                                                                                                                        <Dropdown isOpen={this.state.dropDownTasks[i]} toggle={() => this.toggleDropdownTask(i)}>
                                                                                                                            <DropdownToggle className="btn btn-light todo-border-dark todo-border-rad5">
                                                                                                                                <FontAwesomeIcon icon={faBars} ></FontAwesomeIcon>
                                                                                                                            </DropdownToggle>

                                                                                                                            <DropdownMenu className="todo-border-dark todo-border-rad5">
                                                                                                                                <DropdownItem>
                                                                                                                                    <input type="button" value="Edit This Task" className="btn"/>
                                                                                                                                </DropdownItem>
                                                                                                                                <DropdownItem>
                                                                                                                                    <input type="button" value="Remove This Task" className="btn"/>
                                                                                                                                </DropdownItem>
                                                                                                                            </DropdownMenu>
                                                                                                                        </Dropdown>
                                                                                                                    </div>

                                                                                                                    <div className="mb-1">
                                                                                                                        <div className="todo-fs-bold">
                                                                                                                            Title: 
                                                                                                                        </div>
                                                                                                                        <div>
                                                                                                                            {val.title}
                                                                                                                        </div>
                                                                                                                    </div>
                                                                                                                    
                                                                                                                    <div className="todo-fs-bold">
                                                                                                                        Description:
                                                                                                                    </div>
                                                                                                                    <div className="mb-3">
                                                                                                                        {val.description}
                                                                                                                    </div>

                                                                                                                    {/* <div className="mb-1">
                                                                                                                        <span className="todo-fs-bold">
                                                                                                                            Start:
                                                                                                                        </span>
                                                                                                                        <span>
                                                                                                                            {(new Date (val.date_start)).toLocaleString()}
                                                                                                                        </span>
                                                                                                                    </div>

                                                                                                                    <div className="mb-1">
                                                                                                                        <span className="todo-fs-bold">
                                                                                                                            End:
                                                                                                                        </span>
                                                                                                                        <span>
                                                                                                                            {(new Date (val.date_end)).toLocaleString()}
                                                                                                                        </span>
                                                                                                                    </div> */}
                                                                            
                                                                                                                    <div className="mb-1">
                                                                                                                        <button className=" col-12 btn todo-btn-primary todo-border-dark todo-border-rad5 todo-fs-bold">
                                                                                                                            Detail
                                                                                                                        </button>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                                
                                                                                                            :
                                                                                                                <div className="ml-3 my-3">
                                                                                                                    You don't have any task in this category.
                                                                                                                </div>
                                                                                                        }
                                                                                                    </div>
                                                                                                )
                                                                                            })
                                                                                        :
                                                                                            <div className="ml-3 my-3">
                                                                                                You don't have any task yet.
                                                                                            </div>
                                                                                    }
                                                                                </div>
                                                                            </div>
                                                                            
                                                                        :
                                                                            el.category === "delayed" ?
                                                                                <div className="todo-border-dark todo-border-rad5 shadow mb-3 p-1">
                                                                                    <div className="d-flex justify-content-between mt-3">
                                                                                        <div className="col-2 p-1 todo-border-dark todo-bg-danger text-light todo-border-rad5 mx-3 todo-fs-bold">
                                                                                            Delayed
                                                                                        </div>
                                                                                        
                                                                                        <div className="mx-3">
                                                                                            <Dropdown isOpen={this.state.dropDownCategories[i]} toggle={() => this.toggleDropdownCategory(i)}>
                                                                                                <DropdownToggle className="btn btn-light todo-border-dark todo-border-rad5">
                                                                                                    <FontAwesomeIcon icon={faBars} ></FontAwesomeIcon>
                                                                                                </DropdownToggle>
                                                                                                <DropdownMenu className="todo-border-dark todo-border-rad5">
                                                                                                    {/* <DropdownItem>
                                                                                                        <input type="button" value="Remove Category ?" className="btn"/>
                                                                                                    </DropdownItem> */}
                                                                                                    <DropdownItem>
                                                                                                        <input type="button" value="Add New Task ?" className="btn"/>
                                                                                                    </DropdownItem>
                                                                                                </DropdownMenu>
                                                                                            </Dropdown>
                                                                                        </div>

                                                                                    </div>

                                                                                    <div>
                                                                                        {
                                                                                            this.props.task.taskWorkspaces ?
                                                                                                this.props.task.taskWorkspaces.map ((val, index) => {
                                                                                                    return (
                                                                                                        <div key={index}>
                                                                                                            {
                                                                                                                val.category_tasks_id === 5 ?
                                                                                                                    <div className="col-10 my-3 ml-3 p-1 todo-border-dark todo-border-rad5 shadow">
                                                                                                                        
                                                                                                                        <div className="mb-1 d-flex flex-row-reverse">
                                                                                                                            <Dropdown isOpen={this.state.dropDownTasks[i]} toggle={() => this.toggleDropdownTask(i)}>
                                                                                                                                <DropdownToggle className="btn btn-light todo-border-dark todo-border-rad5">
                                                                                                                                    <FontAwesomeIcon icon={faBars} ></FontAwesomeIcon>
                                                                                                                                </DropdownToggle>

                                                                                                                                <DropdownMenu className="todo-border-dark todo-border-rad5">
                                                                                                                                    <DropdownItem>
                                                                                                                                        <input type="button" value="Set to On Going" className="btn"/>
                                                                                                                                    </DropdownItem>
                                                                                                                                    <DropdownItem>
                                                                                                                                        <input type="button" value="Set to Cancelled" className="btn"/>
                                                                                                                                    </DropdownItem>
                                                                                                                                    <DropdownItem>
                                                                                                                                        <input type="button" value="Edit This Task" className="btn"/>
                                                                                                                                    </DropdownItem>
                                                                                                                                    <DropdownItem>
                                                                                                                                        <input type="button" value="Remove This Task" className="btn"/>
                                                                                                                                    </DropdownItem>
                                                                                                                                </DropdownMenu>
                                                                                                                            </Dropdown>
                                                                                                                        </div>

                                                                                                                        <div className="mb-1">
                                                                                                                            <div className="todo-fs-bold">
                                                                                                                                Title: 
                                                                                                                            </div>
                                                                                                                            <div>
                                                                                                                                {val.title}
                                                                                                                            </div>
                                                                                                                        </div>
                                                                                                                        
                                                                                                                        <div className="todo-fs-bold">
                                                                                                                            Description:
                                                                                                                        </div>
                                                                                                                        <div className="mb-3">
                                                                                                                            {val.description}
                                                                                                                        </div>

                                                                                                                        {/* <div className="mb-1">
                                                                                                                            <span className="todo-fs-bold">
                                                                                                                                Start:
                                                                                                                            </span>
                                                                                                                            <span>
                                                                                                                                {(new Date (val.date_start)).toLocaleString()}
                                                                                                                            </span>
                                                                                                                        </div>

                                                                                                                        <div className="mb-1">
                                                                                                                            <span className="todo-fs-bold">
                                                                                                                                End:
                                                                                                                            </span>
                                                                                                                            <span>
                                                                                                                                {(new Date (val.date_end)).toLocaleString()}
                                                                                                                            </span>
                                                                                                                        </div> */}

                                                                                                                        <div className="mb-1">
                                                                                                                            <button className=" col-12 btn todo-btn-primary todo-border-dark todo-border-rad5 todo-fs-bold">
                                                                                                                                Detail
                                                                                                                            </button>
                                                                                                                        </div>
                                                                                                                    </div>
                                                                                                                    
                                                                                                                :
                                                                                                                    <div className="ml-3 my-3">
                                                                                                                        You don't have any task in this category.
                                                                                                                    </div>
                                                                                                            }
                                                                                                        </div>
                                                                                                    )
                                                                                                })
                                                                                            :
                                                                                                <div className="ml-3 my-3">
                                                                                                    You don't have any task yet.
                                                                                                </div>
                                                                                        }
                                                                                    </div>
                                                                                </div>
                                                                                
                                                                            :
                                                                                el.category !== "todo" || el.category !== "on going" || el.category !== "done" || el.category !== "cancelled" || el.category !== "delayed" ?
                                                                                <div className="todo-border-dark todo-border-rad5 shadow mb-3 p-1">
                                                                                    <div className="d-flex justify-content-between mt-3">
                                                                                        <div className="col-2 p-1 todo-border-dark todo-bg-primary todo-border-rad5 mx-3 todo-fs-bold">
                                                                                            {el.title}
                                                                                        </div>
                                                                                        
                                                                                        <div className="mx-3">
                                                                                            <Dropdown isOpen={this.state.dropDownCategories[i]} toggle={() => this.toggleDropdownCategory(i)}>
                                                                                                <DropdownToggle className="btn btn-light todo-border-dark todo-border-rad5">
                                                                                                    <FontAwesomeIcon icon={faBars} ></FontAwesomeIcon>
                                                                                                </DropdownToggle>
                                                                                                <DropdownMenu className="todo-border-dark todo-border-rad5">
                                                                                                    <DropdownItem>
                                                                                                        <input type="button" value="Remove Category ?" className="btn"/>
                                                                                                    </DropdownItem>
                                                                                                    <DropdownItem>
                                                                                                        <input type="button" value="Add New Task ?" className="btn"/>
                                                                                                    </DropdownItem>
                                                                                                </DropdownMenu>
                                                                                            </Dropdown>
                                                                                        </div>

                                                                                    </div>

                                                                                    <div>
                                                                                        {
                                                                                            this.props.task.taskWorkspaces ?
                                                                                                this.props.task.taskWorkspaces.map ((val, index) => {
                                                                                                    return (
                                                                                                        <div key={index}>
                                                                                                            {
                                                                                                                val.category_tasks_id === el.id ?
                                                                                                                    <div className="col-10 my-3 ml-3 p-1 todo-border-dark todo-border-rad5 shadow">
                                                                                                                        
                                                                                                                        <div className="mb-1 d-flex flex-row-reverse">
                                                                                                                            <Dropdown isOpen={this.state.dropDownTasks[i]} toggle={() => this.toggleDropdownTask(i)}>
                                                                                                                                <DropdownToggle className="btn btn-light todo-border-dark todo-border-rad5">
                                                                                                                                    <FontAwesomeIcon icon={faBars} ></FontAwesomeIcon>
                                                                                                                                </DropdownToggle>

                                                                                                                                <DropdownMenu className="todo-border-dark todo-border-rad5">
                                                                                                                                    <DropdownItem>
                                                                                                                                        <input type="button" value="Set to On Going" className="btn"/>
                                                                                                                                    </DropdownItem>
                                                                                                                                    <DropdownItem>
                                                                                                                                        <input type="button" value="Set to Cancelled" className="btn"/>
                                                                                                                                    </DropdownItem>
                                                                                                                                    <DropdownItem>
                                                                                                                                        <input type="button" value="Edit This Task" className="btn"/>
                                                                                                                                    </DropdownItem>
                                                                                                                                    <DropdownItem>
                                                                                                                                        <input type="button" value="Remove This Task" className="btn"/>
                                                                                                                                    </DropdownItem>
                                                                                                                                </DropdownMenu>
                                                                                                                            </Dropdown>
                                                                                                                        </div>

                                                                                                                        <div className="mb-1">
                                                                                                                            <div className="todo-fs-bold">
                                                                                                                                Title: 
                                                                                                                            </div>
                                                                                                                            <div>
                                                                                                                                {val.title}
                                                                                                                            </div>
                                                                                                                        </div>
                                                                                                                        
                                                                                                                        <div className="todo-fs-bold">
                                                                                                                            Description:
                                                                                                                        </div>
                                                                                                                        <div className="mb-3">
                                                                                                                            {val.description}
                                                                                                                        </div>

                                                                                                                        {/* <div className="mb-1">
                                                                                                                            <span className="todo-fs-bold">
                                                                                                                                Start:
                                                                                                                            </span>
                                                                                                                            <span>
                                                                                                                                {(new Date (val.date_start)).toLocaleString()}
                                                                                                                            </span>
                                                                                                                        </div>

                                                                                                                        <div className="mb-1">
                                                                                                                            <span className="todo-fs-bold">
                                                                                                                                End:
                                                                                                                            </span>
                                                                                                                            <span>
                                                                                                                                {(new Date (val.date_end)).toLocaleString()}
                                                                                                                            </span>
                                                                                                                        </div> */}
                                                                                                                        
                                                                                                                        <div className="mb-1">
                                                                                                                            <button className=" col-12 btn todo-btn-primary todo-border-dark todo-border-rad5 todo-fs-bold">
                                                                                                                                Detail
                                                                                                                            </button>
                                                                                                                        </div>
                                                                                                                    </div>
                                                                                                                    
                                                                                                                :
                                                                                                                    <div className="ml-3 my-3">
                                                                                                                        You don't have any task in this category.
                                                                                                                    </div>
                                                                                                            }
                                                                                                        </div>
                                                                                                    )
                                                                                                })
                                                                                            :
                                                                                                <div className="ml-3 my-3">
                                                                                                    You don't have any task yet.
                                                                                                </div>
                                                                                        }
                                                                                    </div>
                                                                                </div>
                                                                                    
                                                                                :
                                                                                    <div>
                                                                                        You don't have any task yet.
                                                                                    </div>

                                                        }

                                                        
                                                        
                                                        
                                                    </div>
                                                )
                                            })
                                        :
                                            // <div>
                                            //     You don't have any task yet.
                                            // </div>
                                            null
                                    }
                                </div>

                            </div>
                            
                        </div>
                        
                    </div>
                </div>
                
                
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        workspace: state.workspace,
        task: state.task
    }
}

const mapDispatchToProps = {
    getDataUser,
    onGetWorkspaceUser,
    onGetWorkspaceByAssigned,
    onGetCategoryByWorkspace,
    onGetTaskByWorkspace
}

export default connect (mapStateToProps, mapDispatchToProps) (Dashboard)

// export default Dashboard