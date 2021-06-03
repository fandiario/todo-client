import React from "react"

// Reactstrap
import {Modal, ModalHeader, ModalBody, ModalFooter} from "reactstrap"

class CreateTask extends React.Component {
    state = {
        showModal: false
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
            index: this.props.indexCategory
        }

        this.props.toggleModalAdd (dataToSend)
    }


    render () {
        return (
            <div className="container">
                <Modal isOpen= {this.state.showModal} toggle={() => this.onToggleModal()} className="todo-border-dark todo-border-rad5">
                    <ModalHeader>
                        Add New Task
                    </ModalHeader>

                    <ModalBody>
                        (Insert form to add task category {this.props.idCategory} here)
                    </ModalBody>

                    <ModalFooter>
                        (Insert Button Here)
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default CreateTask