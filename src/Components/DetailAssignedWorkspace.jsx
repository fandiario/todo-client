import React from "react"

// Redux
import {connect} from "react-redux"
import {getDataWorkspace, getMembersWorkspace} from "../Redux/Actions/WorkspaceAction"

// Reactstrap
import {Modal, ModalHeader, ModalBody} from "reactstrap"

class DetailAssignedWorkspace extends React.Component {
    state ={
        showModal: false
    }

    componentDidMount () {
        this.onShowModal ()
        this.onGetDataWorkspace ()
    }

    onShowModal = () => {
        let stateModal = this.props.stateModal

        this.setState({showModal: stateModal})
    }

    onToggleModal = () => {
        this.setState ({showModal: false})

        let dataToSend = {
            state: false,
            idWorkspace: this.props.idWorkspace,
            index: this.props.indexWorkspace
        }

        this.props.toggleModalDetail (dataToSend)
    }

    onGetDataWorkspace = () => {
        let idWorkspace = this.props.idWorkspace
        let token = localStorage.getItem ("token")

        // console.log (idWorkspace)

        this.props.getDataWorkspace (idWorkspace)
        this.props.getMembersWorkspace(idWorkspace, token)
    }

    render () {
        return (
            <div className="container">
                <Modal isOpen= {this.state.showModal} toggle={() => this.onToggleModal()} className="todo-border-dark todo-border-rad5">
                    <ModalHeader>
                        Detail Workspace
                    </ModalHeader>

                    <ModalBody>
                        {/* Detail */}
                        <div className="mb-3">
                            <span className="todo-fs-bold">
                                ID:
                            </span>
                            <span className="ml-2">
                                {this.props.idWorkspace}
                            </span>
                        </div>

                        <div className="mb-3">
                            <span className="todo-fs-bold">
                                Title:
                            </span>
                            <span className="ml-2">
                                {this.props.workspace.data.title}
                            </span>
                        </div>

                        <div className="mb-3">
                            <span className="todo-fs-bold">
                                Created by : 
                            </span>
                            <span className="ml-2">
                                {this.props.workspace.data.email}
                            </span>
                        </div>

                        <div className="mb-3">
                            <span className="todo-fs-bold">
                                Created at : 
                            </span>
                            <span className="ml-2">
                                {(new Date (this.props.workspace.data.created_at)).toLocaleString()}
                            </span>
                        </div>

                        <div className="mb-3">
                            <div className="todo-fs-bold">
                                Member(s) :
                            </div>
                            <div className="mb-3">
                                {
                                    this.props.workspace.members.length > 0 ?
                                        this.props.workspace.members.map ((el, i) => {
                                            return (
                                                <div key={i}>
                                                    <span>
                                                        {el.email}
                                                    </span>
                                                </div>
                                            )
                                        })
                                    :   
                                       null
                                }
                            </div>
                        </div>

                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        workspace: state.workspace
    }
}

const mapDispatchToProps = {
    getDataWorkspace,
    getMembersWorkspace
}

export default connect (mapStateToProps, mapDispatchToProps) (DetailAssignedWorkspace)

// export default DetailAssignedWorkspace