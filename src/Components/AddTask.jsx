import React from "react"

// Redux
import {connect} from "react-redux"
import {createTask} from "../Redux/Actions/TaskAction"

// Reactstrap
import {Modal, ModalHeader, ModalBody, ModalFooter} from "reactstrap"

class CreateTask extends React.Component {
    state = {
        showModal: false,
        alerts: []
    }

    componentDidMount () {
        this.onShowModal ()
    }

    onShowModal = () => {
        let stateModal = this.props.stateModal

        this.setState({showModal: stateModal})

        // console.log (this.props.idCategory)
        // console.log (this.props.stateModal)
    }

    onToggleModal = () => {
        this.setState ({showModal: false})

        let dataToSend = {
            state: false,
            idCategory: this.props.idCategory,
            index: this.props.indexCategory,
            idWorkspace: this.props.idWorkspace.id,
            category_tasks_category_at_workspaces_id: this.props.category_tasks_category_at_workspaces_id
        }

        this.props.toggleModalAdd (dataToSend)

        this.setState ({alerts: []})

        this.titleInput.value = ""
        this.descInput.value = ""
        this.startInput.value = ""
        this.endInput.value = ""
    }

    onSubmitAddTask = () => {
        let title = this.titleInput.value
        let description = this.descInput.value
        let date_start = this.startInput.value
        let date_end = this.endInput.value

        let token = localStorage.getItem ("token")
        let category_tasks_id = this.props.idCategory
        let idWorkspace = this.props.idWorkspace.id
        let category_tasks_category_at_workspaces_id = this.props.category_tasks_category_at_workspaces_id

        let arrAlerts = []

        if (!(title) || !(description) || !(date_start) || !(date_end)) {
            arrAlerts.push ("You have to fill every data field.")
            this.setState ({alerts: arrAlerts})

        } else {

            // let data = {
            //     title: title,
            //     description: description,
            //     date_start: date_start,
            //     date_end: date_end,
            //     token: token,
            //     category_tasks_id: category_tasks_id,
            //     category_tasks_category_at_workspaces_id: category_tasks_category_at_workspaces_id,
            //     idWorkspace: idWorkspace
            // }

            // console.log (data)

            this.props.createTask (title, description, date_start, date_end, token, category_tasks_id, category_tasks_category_at_workspaces_id, idWorkspace)
            
            this.setState ({alerts: []})
            
            this.onToggleModal ()
        }

        
    }

    render () {
        return (
            <div className="container">
                <Modal isOpen= {this.state.showModal} toggle={() => this.onToggleModal()} className="todo-border-dark todo-border-rad5">
                    <ModalHeader>
                        Add New Task
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


                        {/*Form  */}
                       <form>
                            <div className="mb-3">
                                <label className="form-label todo-fs-bold">Title</label>
                                <input type="text" className="form-control todo-border-dark" placeholder="Insert title here." ref={(e) => this.titleInput = (e)}/>
                            </div>

                            <div className="mb-3">
                                <label className="form-label todo-fs-bold">Description</label>
                                <input type="text" className="form-control todo-border-dark" placeholder="Insert description here." ref={(e) => this.descInput = (e)}/>
                            </div>

                            <div className="mb-3">
                                <label className="form-label todo-fs-bold">Start</label>
                                <input type="datetime-local" className="form-control todo-border-dark"  ref={(e) => this.startInput = (e)}/>
                            </div>

                            <div className="mb-3">
                                <label className="form-label todo-fs-bold">End</label>
                                <input type="datetime-local" className="form-control todo-border-dark" ref={(e) => this.endInput = (e)}/>
                            </div>
                       </form>
                        {/* (Insert form to add task category {this.props.idCategory} here) */}
                    </ModalBody>

                    <ModalFooter>
                        <button className="btn todo-btn-primary todo-border-dark todo-border-rad5 todo-fs-bold" onClick={() => this.onSubmitAddTask()}>
                            Submit 
                        </button>
                        <button className="btn todo-btn-danger todo-border-dark todo-border-rad5 todo-fs-bold" onClick={() => this.onToggleModal()}>
                            Cancel
                        </button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        task: state.workspace
    }
}

const mapDispatchToProps = {
    createTask
}

export default connect (mapStateToProps, mapDispatchToProps) (CreateTask)

// export default CreateTask