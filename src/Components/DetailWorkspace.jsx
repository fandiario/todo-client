import React from "react"
import validator from "validator"

// Redux
import {connect} from "react-redux"
import {getDataWorkspace, getMembersWorkspace, addMemberWorkspace, deleteMemberWorkspace} from "../Redux/Actions/WorkspaceAction"

// Reactstrap
import {Modal, ModalHeader, ModalBody, ModalFooter} from "reactstrap"

// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons'

// Sweetalert
import swal from "sweetalert"

class DetailWorkspace extends React.Component {

    state = {
        showModal: false,
        showButton: false,
        alerts: []
    }

    componentDidMount () {
        this.onShowModal ()
        this.onGetDataWorkspace ()
    }

    onShowModal = () => {
        // let idWorkspace = this.props.idWorkspace
        let stateModal = this.props.stateModal

        this.setState({showModal: stateModal})

        // console.log ("hello from detail workspace")
        // console.log (idWorkspace)
        // console.log (stateModal)
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

        this.props.getDataWorkspace (idWorkspace)
        this.props.getMembersWorkspace(idWorkspace, token)
    }

    onSubmitNewMember = () => {
        let idWorkspace = this.props.idWorkspace
        let token = localStorage.getItem ("token")
        let email = this.emailInput.value

        let arrAlerts = []

        if (!(email)) {
            arrAlerts.push ("You have to fill an email address")
            this.setState ({alerts: arrAlerts})
        
        } else if (validator.isEmail (email === false)) {
            arrAlerts.push ("Unknown email address format.")
            this.setState ({alerts: arrAlerts})

        } else {
            this.props.addMemberWorkspace (idWorkspace, token, email)
            this.setState ({showButton: false})
            this.setState ({alerts: []})
            this.setState ({showModal: false})
        }

        // console.log (idWorkspace)
        // console.log (token)
        // console.log (email)
    }

    onDeleteMember = (idMembers) => {
        let members_users_id = idMembers
        let token = localStorage.getItem ("token")
        let idWorkspace = this.props.idWorkspace


        swal ({
            title: "Delete ?",
            text: "Are you sure you want to delete this user from your workspace's membership ?",
            icon: "warning",
            buttons: true,
            dangerMode: true
        })

        .then ((res) => {
            if (res) {
                this.props.deleteMemberWorkspace(idWorkspace,token,members_users_id,)

                this.setState ({showButton: false})
            } 
        })

        .catch ((err) => {
            console.log (err)
        })

    }


    render () {
        return (
            <div className="container">

                {/* <input type="button" value="Detail" className="btn" /> */}

                <Modal isOpen= {this.state.showModal} toggle={() => this.onToggleModal()} className="todo-border-dark todo-border-rad5">
                    <ModalHeader>
                        Detail Workspace
                    </ModalHeader>
                    <ModalBody>
                        {/* Alert */}
                        {
                            this.state.alerts ?
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
                            this.props.workspace.message && this.props.workspace.error === true  ?
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
                            this.props.workspace.message && this.props.workspace.error === false  ?
                                <div className="row mx-3 my-3">
                                    <div className="col-12 d-flex justify-content-center">
                                        <div className="alert alert-primary todo-border-dark todo-border-rad5">
                                            {this.props.workspace.message}
                                        </div>
                                    </div>
                                </div>
                            :
                                null
                        }

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
                                                    <span>
                                                        <button className="btn btn-light ml-3" onClick={() => this.onDeleteMember (el.id)}>
                                                            <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                                                        </button>
                                                    </span>
                                                </div>
                                            )
                                        })
                                    :   
                                       
                                        <div>
                                            You haven't assigned anyone for this workspace.
                                        </div>
                                }
                            </div>
                            {
                                this.state.showButton === false ?
                                    <div>
                                        <button className="btn btn-light todo-border-dark todo-border-rad5" onClick={() => this.setState ({showButton: true})}>
                                            <span className="mr-3">
                                                <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                                            </span>
                                            <span>
                                                Add a member ?
                                            </span>
                                        </button>
                                    </div>
                                :
                                    <div>
                                        <label className="form-label todo-fs-bold">Email</label>
                                        <input type="text" className="form-control todo-border-dark" placeholder="Insert user's email to add as a member" ref={(e) => this.emailInput = (e)}/>
                                    </div>
                            }
                            
                        </div>

                        {/* (Insert Detail of Workspace with id {this.props.idWorkspace}) */}
                    </ModalBody>

                    {
                        this.state.showButton === true ?
                            <ModalFooter>
                                <div className="mb-3">
                                    <input type="button" value="Submit" className="btn todo-btn-primary todo-border-dark todo-border-rad5 todo-fs-bold" onClick={() => this.onSubmitNewMember ()}/>
                                    <input type="button" value="Cancel" className="btn todo-btn-danger todo-border-dark todo-border-rad5 todo-fs-bold ml-3" onClick={() => this.setState ({showButton: false})}/>
                                </div>
                            </ModalFooter>
                        :
                            null
                    }
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
    getMembersWorkspace,
    addMemberWorkspace,
    deleteMemberWorkspace
}

export default connect (mapStateToProps, mapDispatchToProps) (DetailWorkspace)

// export default DetailWorkspace