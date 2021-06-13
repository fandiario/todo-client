import React from "react"

// Redux
import {connect} from "react-redux"
import {getMembersWorkspace} from "../Redux/Actions/WorkspaceAction"
import {getDataTask, getAssigneeTask, addAssigneeTask, deleteAssigneeTask, editTask} from "../Redux/Actions/TaskAction"

// Reactstrap
import {Modal, ModalHeader, ModalBody, ModalFooter} from "reactstrap"

// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons'

// Sweetalert
import swal from "sweetalert"

class EditTask extends React.Component {
    state ={
        showModal: false,
        showButton: false,
        alerts: []
    }

    componentDidMount () {
        this.onShowModal ()
        this.onGetMemberWorkspace ()
        this.onGetDataTask ()
        this.onGetAssigneeTask ()
    }

    onShowModal = () => {
        let stateModal = this.props.stateModal

        this.setState({showModal: stateModal})

        // console.log ("from modal edit")
    }

    onToggleModal = () => {
        this.setState ({showModal: false})

        let dataToSend = {
            state: false,
            idTask: this.props.idTask,
            index: this.props.indexTask
        }

        this.props.toggleEditTask (dataToSend)

        // console.log (this.props.dataTask)
        // console.log (dataToSend)
    }

    onGetDataTask = () => {
        let idTask = this.props.idTask

        this.props.getDataTask (idTask)

        this.setState ({alerts: []})

        // console.log (this.props.task.dataTask)
    }

    onGetMemberWorkspace = () => {
        let idWorkspace = this.props.idWorkspace
        let token = localStorage.getItem ("token")

        // console.log (idWorkspace)

        this.props.getMembersWorkspace(idWorkspace, token)
    }

    onGetAssigneeTask = () => {
        let idTask = this.props.idTask

        this.props.getAssigneeTask(idTask)

        this.setState ({alerts: []})
    }

    onAddAssigneeTask = () => {
        let idTask = this.props.idTask
        let assignee_users_id = this.assigneeInput.value
        let token = localStorage.getItem ("token")

        let arrAlerts = []

        if (!assignee_users_id){
            arrAlerts.push ("Empty data field detected.")
            this.setState ({alerts: arrAlerts})

        } else {
            this.props.addAssigneeTask(idTask, assignee_users_id, token)

            this.setState ({alerts: []})
            this.setState ({showButton: false})
        }

        

        // console.log (assignee_users_id)
    }

    onDeleteAssigneeTask = (idUser) => {
        let idTask = this.props.idTask
        let token = localStorage.getItem ("token")

        // console.log (idUser)
        this.props.deleteAssigneeTask(idUser, idTask, token)
    }

    onSubmitEditTask = () => {
        let arrAlerts = []
        let token = localStorage.getItem ("token")

        let idTask = this.props.idTask
        let title = this.titleInput.value
        let description = this.descInput.value
        let dataStart = this.dateStartInput.value
        let dataEnd = this.dateEndInput.value
        let category_tasks_id = this.props.dataTask.category_tasks_id
        let idWorkspace = this.props.dataTask.workspaces_id
        let category_tasks_category_at_workspaces_id = this.props.dataCategory.category_at_workspaces_id
        let category_at_workspaces_id = this.props.dataCategory.category_at_workspaces_id

        // Convert Time Start
        let dataDateStart = dataStart
        let dateStart = dataDateStart.slice(0, 10)
        let timeStart = new Date (dataDateStart).toLocaleTimeString()
        let timeStartRes = timeStart.slice(0,8)
        let date_start = dateStart + " " + timeStartRes

        // Convert Time End
        let dataDateEnd = dataEnd
        let dateEnd = dataDateEnd.slice (0, 10)
        let timeEnd = new Date (dataDateEnd).toLocaleTimeString()
        let timeEndRes = timeEnd.slice(0, 8)
        let date_end = dateEnd + " " + timeEndRes

        if (!title || !description || !dataStart || !dataEnd) {
            arrAlerts.push ("Empty data field detected.")
            this.setState ({alerts: arrAlerts})

        } else {

            swal ({
                title: `Edit this task ?`,
                text: `Are you sure you want to edit this task ?`,
                icon: "warning",
                buttons: true,
                dangerMode: true
            })

            .then ((res) => {
                if (res) {
                    this.props.editTask (idTask, title, description, date_start, date_end, category_tasks_id, idWorkspace, category_tasks_category_at_workspaces_id, category_at_workspaces_id, token)
                    
                    this.setState ({alerts: []})
                    this.onToggleModal ()

                } else {
                    swal({
                        title: "Cancelled!",
                        text: "Data Update has been cancelled",
                        icon: "info",
                    })
                }
            })

            
        }   

    }

    render () {
        return (
            <div className="container">
                <Modal isOpen= {this.state.showModal} toggle={() => this.onToggleModal()} className="todo-border-dark todo-border-rad5">
                    <ModalHeader>
                        Edit Task
                    </ModalHeader>
                    <ModalBody>
                        {/* Alert */}
                        {
                            this.state.alerts.length > 0 ?
                                <div className="row mx-3 my-3 ">
                                    {
                                        this.state.alerts.map ((el, i) => {
                                            return (
                                                <div key={i} className="col-12 d-flex justify-content-center">
                                                    <div className="alert alert-danger todo-border-dark todo-border-rad5">
                                                        {el}  
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            :
                                null
                        }
                        {
                            this.props.task.message && this.props.task.error === true  ?
                                <div className="row mx-3 my-3">
                                    <div className="col-12 d-flex justify-content-center">
                                        <div className="alert alert-danger todo-border-dark todo-border-rad5">
                                            {this.props.task.message}
                                        </div>
                                    </div>
                                </div>
                            :
                                null
                        } 

                        {
                            this.props.task.message && this.props.task.error === false  ?
                                <div className="row mx-3 my-3">
                                    <div className="col-12 d-flex justify-content-center">
                                        <div className="alert alert-primary todo-border-dark todo-border-rad5">
                                            {this.props.task.message}
                                        </div>
                                    </div>
                                </div>
                            :
                                null
                        }

                       {/* Form */}
                        <div className="mb-3">
                            <label className="form-label todo-fs-bold">
                                Title
                            </label>
                            <input type="text" className="form-control todo-border-dark" ref={(e) => this.titleInput = (e)} defaultValue={this.props.task.dataTask.title}/>
                        </div>

                        <div className="mb-3">
                            <label className="form-label todo-fs-bold">
                                Description
                            </label>
                            <textarea className="form-control todo-border-dark" rows="3" ref={(e) => this.descInput = (e)} defaultValue={this.props.task.dataTask.description}></textarea>
                        </div>

                        <div className="mb-3">
                            <label className="form-label todo-fs-bold">
                                Start
                            </label>
                            <input type="datetime-local" className="form-control todo-border-dark" ref={(e) => this.dateStartInput = (e)} defaultValue={this.props.task.dataTask.date_start}/>
                        </div>

                        <div className="mb-3">
                            <label className="form-label todo-fs-bold">
                                End
                            </label>
                            <input type="datetime-local" className="form-control todo-border-dark" ref={(e) => this.dateEndInput = (e)} defaultValue={this.props.task.dataTask.date_end}/>
                        </div>

                        <div className="mb-3">
                            <div className="todo-fs-bold">
                                Assigned to: 
                            </div>
                            <div className="mb-3">
                                {
                                    this.props.task.assigneeTask ?
                                        this.props.task.assigneeTask.map ((el, i) => {
                                            return (
                                                <div key={i}>
                                                    <span>
                                                        {el.email}
                                                    </span>
                                                    <span>
                                                        <button className="btn btn-light ml-3 mb-3 todo-border-dark todo-border-rad5" onClick={() => this.onDeleteAssigneeTask (el.id)}>
                                                            <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                                                        </button>
                                                    </span>
                                                </div>
                                            )
                                        })
                                    :
                                        <div>
                                            You haven't assigned anyone for this task.
                                        </div>
                                }
                            </div>
                            {
                                this.state.showButton === false ?
                                    <div>
                                        <button className="btn btn-light todo-border-dark todo-border-rad5 mt-2" onClick={() => this.setState ({showButton: true})}>
                                            <span className="mr-3">
                                                <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                                            </span>
                                            <span>
                                                Add a member ?
                                            </span>
                                        </button>
                                    </div>
                                :
                                <div className='mb-3 d-flex justify-content-between'>
                                    <div className="col-10">
                                        {
                                            this.props.workspace.members ?
                            
                                                <select className='mb-3 form-control' ref={(e) => this.assigneeInput = (e)}>
                                                    <option value="">Choose...</option>
                                                    {
                                                        this.props.workspace.members.map ((el, i) => {
                                                            return (
                                                                <option value={el.id} key={i} >{el.email}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                               
                                            :
                                                <div>
                                                    You haven't assigned anyone in this workspace.
                                                </div>
                                        }
                                    </div>
                                    <div>
                                        <button className="btn todo-btn-primary py-1 todo-fs-bold todo-border-dark todo-border-rad5 ml-1" onClick={() => this.onAddAssigneeTask()}>Add</button>
                                    </div>
                                </div>
                            }
                        </div>

                    </ModalBody>
                    <ModalFooter>
                        <div className="mb-3">
                            <input type="button" value="Submit" className="btn todo-btn-primary todo-border-dark todo-border-rad5 todo-fs-bold" onClick={() => this.onSubmitEditTask()}/>
                            <input type="button" value="Cancel" className="btn todo-btn-danger todo-border-dark todo-border-rad5 todo-fs-bold ml-3" onClick={() => this.onToggleModal()}/>
                        </div>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        task: state.task,
        workspace: state.workspace
    }
}

const mapDispatchToProps = {
    getDataTask,
    getAssigneeTask,
    addAssigneeTask,
    editTask,
    deleteAssigneeTask,
    getMembersWorkspace
}

export default connect (mapStateToProps, mapDispatchToProps) (EditTask)
// export default EditTask
