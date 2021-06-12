import React from "react"

// Redux
import {connect} from "react-redux"
import {createCategory} from "../Redux/Actions/TaskAction"

// Reactstrap
import {Modal, ModalHeader, ModalBody, ModalFooter} from "reactstrap"

// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus  } from '@fortawesome/free-solid-svg-icons'

class CreateCategory extends React.Component {
    state = {
        showModal: false,
        alerts: []
    }

    onSubmitAddCategory = () => {
        let activeWorkspace = this.props.activeWorkspace
        let idWorkspace = activeWorkspace.id
        let token = localStorage.getItem ("token")
        let category = this.categoryInput.value

        let arrAlerts = []

        if (!(category)) {
            arrAlerts.push ("You have to fill category's title.")
            this.setState ({alerts: arrAlerts})

        } else {
            this.props.createCategory (category, idWorkspace, token)

            // console.log(activeWorkspace.id)

            this.setState ({alerts: []})

            this.setState ({showModal: false})
        }

        // console.log(activeWorkspace.id)
    }

    toggleModal = () => {
        this.categoryInput.value = ""

        this.setState ({alerts: []})

        this.setState ({showModal: false})
    }


    render () {
        return (
            <div>
                {/* Button */}
               <button className="btn btn-light todo-border-dark todo-border-rad5 shadow" onClick={() => this.setState ({showModal: true})}>
                    <span className="mr-3">
                        <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                    </span>
                    <span className="todo-fs-bold">
                        Add New Categories ?
                    </span>
                </button>

                {/* Modal */}
                <Modal isOpen={this.state.showModal} toggle={() => this.setState ({showModal: !(this.state.showModal)})} className="todo-border-dark todo-border-rad5">
                    <ModalHeader>
                        Add New Cateogory
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

                        {/* {
                            this.props.task.message && this.props.task.error === true  ?
                                <div className="row mx-3 my-3">
                                    <div className="col-12 d-flex justify-content-center">
                                        <div className="alert alert-danger todo-border-dark todo-border-rad5">
                                            {this.props.workspace.message}
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
                                            {this.props.workspace.message}
                                        </div>
                                    </div>
                                </div>
                            :
                                null
                        } */}
                        
                        {/* Form */}
                        <form className="col-12">
                            <div className="mb-3 form-group">
                                <label className="form-label todo-fs-bold">
                                    Category
                                </label>
                                <input type="text" className="form-control todo-border-dark" placeholder="Insert the title of your category"  ref={(e) => this.categoryInput = (e)}/>
                            </div>

                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn todo-btn-primary todo-border-dark todo-border-rad5 todo-fs-bold" onClick={() => this.onSubmitAddCategory()}>
                            Submit 
                        </button>
                        <button className="btn todo-btn-danger todo-border-dark todo-border-rad5 todo-fs-bold" onClick={() => this.toggleModal()}>
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
    createCategory
}

export default connect (mapStateToProps, mapDispatchToProps) (CreateCategory)
// export default CreateCategory