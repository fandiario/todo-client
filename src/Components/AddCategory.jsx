import React from "react"

// Reactstrap
import {Modal, ModalHeader, ModalBody, ModalFooter} from "reactstrap"

// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus  } from '@fortawesome/free-solid-svg-icons'

class CreateCategory extends React.Component {
    state = {
        showModal: false
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
                        (Insert form here)
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

export default CreateCategory