import React from "react"
import validator from "validator"

// Redux
import {connect} from "react-redux"
import {onEditUser, getDataUser} from "../Redux/Actions/UserAction"

// Reactstrap
import {Modal, ModalHeader, ModalBody, ModalFooter} from "reactstrap"

// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog  } from '@fortawesome/free-solid-svg-icons'

class EditUser extends React.Component {
    state = {
        showModal: false,
        alerts: []
    }

    onSubmitEdit = () => {
        let emailInput = this.emailInput.value
        let passwordInput = this.passwordInput.value
        let passwordConfirm = this.passwordConfirm.value

        let token = localStorage.getItem ("token")

        let validEmail = false
        let validPassword = false

        let arrAlerts = []

        if (!emailInput || !passwordInput || !passwordConfirm) {
            arrAlerts.push ("You have to enter email address, password and confirmed password.")
            this.setState ({alerts: arrAlerts})
        
        } else {
            let checkEmail = validator.isEmail(emailInput)
        
            if (checkEmail === true) {
                validEmail = true   
                this.setState ({alerts: []})

            } else {
                arrAlerts.push ("Unknown email address format.")
                this.setState ({alerts: arrAlerts})
            }
            
            if (passwordInput.length >= 6 && passwordInput === passwordConfirm) {
                validPassword = true
                this.setState ({alerts: []})

            } else {
                arrAlerts.push ("Unknown password format or invalid confirmed password.")
                this.setState ({alerts: arrAlerts})
            }

            if (validEmail === true && validPassword === true) {
                // console.log ("success edit")
                this.props.onEditUser (emailInput, passwordInput, token)

                // this.onGetDataUser ()
            }

            // this.onGetDataUser ()
            // console.log (this.props.user.dataUser)

            this.setState ({showModal: false})

            window.location = "/dashboard"
        }

    }

    // onGetDataUser = () => {
    //     let token = localStorage.getItem ("token")

    //     this.props.getDataUser (token)

    //     // console.log (this.props.user.dataUser)
    // }

    onToggleModal = () => {
        this.setState ({alerts: []})
        this.setState ({showModal: false})
    }

    render () {
        return (
            <div>
                {/* Button */}
                <button className="btn todo-btn-primary todo-border-dark todo-border-rad5" onClick={() => this.setState ({showModal: true})}>
                    <FontAwesomeIcon icon={faCog}></FontAwesomeIcon>
                </button>

                {/* Modal */}
                <Modal isOpen={this.state.showModal} toggle={() => this.setState ({showModal: !(this.state.showModal)})} className="todo-border-dark todo-border-rad5"> 
                    <ModalHeader>
                        Edit User
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
                        {/* Form */}
                        <form className="col-12">
                            <div className="mb-3 form-group">
                                <label className="form-label todo-fs-bold">
                                    Email Address
                                </label>
                                <input type="text" className="form-control todo-border-dark" defaultValue={this.props.user.dataUser.email} ref={(e) => this.emailInput = (e)}/>
                            </div>

                            <div className="mb-3 form-group">
                                <label className="form-label todo-fs-bold">
                                    Password
                                </label>
                                <input type="password" className="form-control todo-border-dark" placeholder="Password at least 6 characters long." ref={(e) => this.passwordInput = (e)}/>
                            </div>

                            <div className="mb-3 form-group">
                                <label className="form-label todo-fs-bold">
                                    Confirm Password
                                </label>
                                <input type="password" className="form-control todo-border-dark" placeholder="Please enter your password to confirm." ref={(e) => this.passwordConfirm = (e)}/>
                            </div>
                        </form>
                    </ModalBody>

                    <ModalFooter>
                        <button className="btn todo-btn-primary todo-border-dark todo-border-rad5 todo-fs-bold" onClick={() => this.onSubmitEdit()}>
                            Submit 
                        </button>
                        <button className="btn todo-btn-danger todo-border-dark todo-border-rad5 todo-fs-bold" onClick={() => this.onToggleModal ()}>
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
        user: state.user
    }
}

const mapDispatchToProps = {
    onEditUser,
    getDataUser
}

export default connect (mapStateToProps, mapDispatchToProps) (EditUser)

// export default EditUser