import React from "react"

// Reactstrap
import {Modal, ModalHeader, ModalBody, ModalFooter} from "reactstrap"

// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus  } from '@fortawesome/free-solid-svg-icons'

class CreateWorkspace extends React.Component {
    state = {
        showModal: false
    }

    onSubmitCreateWorkplace = () => {

    }

    render () {
        return (
            <div>
                {/* Button */}
                <button className="btn todo-btn-primary todo-border-dark todo-border-rad5" onClick={() => this.setState ({showModal: true})}>
                    <span className="mr-1">
                        <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon> 
                    </span>
                    <span className="todo-fs-bold">
                        Add New Workspace ?
                    </span>
                </button>

                {/* Modal */}
                <Modal isOpen={this.state.showModal} toggle={() => this.setState ({showModal: !(this.state.showModal)})} className="todo-border-dark todo-border-rad5">
                    <ModalHeader>
                        Add New Workspace
                    </ModalHeader>
                    <ModalBody>
                        <form className="col-12">
                            <div className="mb-3 form-group">
                                <label className="form-label todo-fs-bold">
                                    Email
                                </label>
                                <input type="email" className="form-control todo-border-dark" placeholder="Insert the title of your workspace"/>
                            </div>

                            <div className="mb-3 form-group">
                                <label className="form-label todo-fs-bold">
                                    Members
                                </label> 
                                <select className="form-control todo-border-dark">
                                    <option value="">--Choose user--</option>
                                    <option value="1">(insert member's name here)</option>
                                    <option value="2">(insert another member's name here)</option>
                                </select>
                            </div>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn todo-btn-primary todo-border-dark todo-border-rad5 todo-fs-bold">
                            Submit 
                        </button>
                        <button className="btn todo-btn-danger todo-border-dark todo-border-rad5 todo-fs-bold" onClick={() => this.setState ({showModal: !(this.state.showModal)})}>
                            Cancel
                        </button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default CreateWorkspace