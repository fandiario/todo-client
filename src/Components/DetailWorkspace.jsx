import React from "react"

// Reactstrap
import {Modal, ModalHeader, ModalBody} from "reactstrap"

class DetailWorkspace extends React.Component {

    state = {
        showModal: null
    }

    componentDidMount () {
        this.onShowModal ()
    }

    onShowModal = () => {
        let idWorkspace = this.props.idWorkspace
        let stateModal = this.props.stateModal

        this.setState({showModal: stateModal})

        console.log ("hello from detail workspace")
        console.log (idWorkspace)
        console.log (stateModal)
    }

    onToggleModal = () => {
        this.setState ({showModal: false})

        // this.props.toggleModalDetail ("data from detail workspace")
    }


    render () {
        return (
            <div className="container">

                {/* <input type="button" value="Detail" className="btn" /> */}

                <Modal isOpen= {this.state.showModal} toggle={() => this.onToggleModal()}>
                    <ModalHeader>
                        Detail Workspace
                    </ModalHeader>
                    <ModalBody>
                        (Insert Detail of Workspace with id {this.props.idWorkspace})
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

export default DetailWorkspace