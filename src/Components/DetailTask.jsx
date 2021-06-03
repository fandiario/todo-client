import React from "react"

// Reactstrap
import {Modal, ModalHeader, ModalBody} from "reactstrap"

class DetailTask extends React.Component {
    state = {
        showModal: false,
        // justTapButton: false
    }

    componentDidMount () {
        this.onShowModal ()
    }

    // componentDidUpdate () {
    //     if (this.state.justTapButton === true) {
    //         this.setState ({justTapButton: false})
    //         this.onShowModal ()
    //     }
        
    // }

    onShowModal = () => {
        let stateModal = this.props.stateModal

        this.setState({showModal: stateModal})

        // console.log (`From Detail task ${this.props.stateModal}`)
        // console.log (this.state.showModal)
        // console.log (this.props.idTask)
        // console.log (this.props.indexTask)
    }

    onToggleModal = () => {
        this.setState ({showModal: false})

        let dataToSend = {
            state: false,
            idTask: this.props.idTask,
            index: this.props.indexTask
        }

        this.props.toggleModalDetail (dataToSend)
    }

    render () {
        return (
            <div className="container">
                <Modal isOpen={this.state.showModal} toggle={() => this.onToggleModal()} className="todo-border-dark todo-border-rad5">
                    <ModalHeader>
                        Detail Task
                    </ModalHeader>
                    <ModalBody>
                        (Insert Detail Task {this.props.idTask} Here)
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

export default DetailTask