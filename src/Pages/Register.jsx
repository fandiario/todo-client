import React from "react"
import validator from "validator"

// Redux
import {connect} from "react-redux"
import {onRegisterUser} from "../Redux/Actions/UserAction"

// Link
import {Redirect} from "react-router-dom"

// Component
import Logo from "../Components/Logo"

class Register extends React.Component {

    state = {
        alerts: []
    }

    onSubmitRegistration = () => {
        let emailInput = this.emailInput.value
        let passwordInput = this.passwordInput.value
        let passwordConfirm = this.passwordConfirm.value

        let validEmail = false
        let validPassword = false

        let alertArr = []

        if (!emailInput || !passwordInput || !passwordConfirm) {
            alertArr.push ("You have to enter email address, password and confirmed password.")
            this.setState ({alerts: alertArr})
        
        } else {
            let checkEmail = validator.isEmail(emailInput)
        
            if (checkEmail === true) {
                validEmail = true   
                this.setState ({alerts: []})

            } else {
                alertArr.push ("Unknown email address format.")
                this.setState ({alerts: alertArr})
            }
            
            if (passwordInput.length >= 6 && passwordInput === passwordConfirm) {
                validPassword = true
                this.setState ({alerts: []})

            } else {
                alertArr.push ("Unknown password format or invalid confirmed password.")
                this.setState ({alerts: alertArr})
            }

            // console.log (validEmail)
            // console.log (validPassword)

            if (validEmail === true && validPassword === true) {
                
                this.props.onRegisterUser (emailInput, passwordInput)

                // console.log (dataToSend)
            }
        }


        
        
    }

    render () {

        if (this.props.user.isRedirect === true) {
            return (
                <Redirect to = "/dashboard"></Redirect>
            )
        }

        return (
            <div className="container">
                <Logo></Logo>

                <div className="d-flex justify-content-center my-5">
                    {/* Header */}
                    <div className="col-8 todo-bg-primary todo-border-dark todo-border-rad5 shadow">
                        <div className="row mx-3 mt-3">
                            <h3 className="todo-fs-bold">
                               Register
                           </h3>
                        </div>

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
                            this.props.user.message && this.props.user.error === true  ?
                                <div className="row mx-3 my-3">
                                    <div className="col-12 d-flex justify-content-center">
                                        <div className="alert alert-danger todo-border-dark todo-border-rad5">
                                            {this.props.user.message}
                                        </div>
                                    </div>
                                </div>
                            :
                                null
                        }

                        {
                            this.props.user.message && this.props.user.error === false  ?
                                <div className="row mx-3 my-3">
                                    <div className="col-12 d-flex justify-content-center">
                                        <div className="alert alert-primary todo-border-dark todo-border-rad5">
                                            {this.props.user.message}
                                        </div>
                                    </div>
                                </div>
                            :
                                null
                        }

                        {/* Form */}
                        <div className="row mx-3">
                            <form className="col-12">
                                <div className="mb-3">
                                    <label className="form-label todo-fs-bold">Email Address</label>
                                    <input type="email" className="form-control todo-border-dark" placeholder="Insert your email address to register." ref={(e) => this.emailInput = (e)}/>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label todo-fs-bold">Password</label>
                                    <input type="password" className="form-control todo-border-dark" placeholder="Password at least 6 characters long." ref={(e) => this.passwordInput = (e)}/>
                                </div>

                                <div className="mb-5">
                                    <label className="form-label todo-fs-bold">Confirm Password</label>
                                    <input type="password" className="form-control todo-border-dark" placeholder="Please enter your password to confirm." ref={(e) => this.passwordConfirm = (e)}/>
                                </div>

                                <input type="button" value="Submit" className="btn todo-btn-dark todo-border-dark todo-fs-bold mb-3" onClick={() => this.onSubmitRegistration()}/>
                            </form>
                        </div>

                    </div>
                </div>
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
    onRegisterUser
}

export default connect (mapStateToProps, mapDispatchToProps) (Register)

// export default Register