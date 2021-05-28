import React from "react"
import validator from "validator"

// Link
import {Redirect} from "react-router-dom"

// Redux
import {connect} from "react-redux"
import {onCheckUserByEmail, onForgotPassword} from "../Redux/Actions/UserAction"

// Component
import Logo from "../Components/Logo"

class ForgotPassword extends React.Component {

    state = {
        alerts: []
    }

    onSubmitEmailUser = () => {
        let emailInput = this.emailInput.value
        let alertArr = []

        if (!emailInput) {
            alertArr.push ("You have to enter your email address.")
            this.setState ({alerts: alertArr})
        
        } else {
            let checkEmail = validator.isEmail (emailInput)
            // console.log (checkEmail)

            if (checkEmail === true) {
                this.setState ({alerts: []})

                this.props.onCheckUserByEmail (emailInput)

                this.emailInput.value = null

            } else if (checkEmail === false) {
                alertArr.push ("Unknown email address format.")
                this.setState ({alerts: alertArr})
            }
        }
    }

    onSubmitEditPassword = () => {
        let emailUser = this.props.user.emailUser
        let passwordInput = this.passwordInput.value
        let passwordConfirm = this.passwordConfirm.value

        let alertArr = []

        // console.log (emailUser)
        // console.log (passwordInput)
        // console.log (passwordConfirm)

        if (!passwordInput || !passwordConfirm) {
            alertArr.push ("You have to enter password and confirm password.")
            this.setState ({alerts: alertArr})
        
        } else {
            if (passwordInput.length >= 6 && passwordInput === passwordConfirm) {
                this.setState ({alerts: []})
                
                this.props.onForgotPassword (emailUser, passwordInput)

            } else {
                alertArr.push ("Unknown password format or invalid confirmed password.")
                this.setState ({alerts: alertArr})
            }
        }

    }



    render () {
        if (this.props.user.isRedirectLogin === true) {
            return (
                <Redirect to = "/"></Redirect>
            )
        }

        return (
            <div className="container">
                <Logo></Logo>

                {
                    this.props.user.emailUser ?
                        
                        // Password Input 
                        <div className="d-flex justify-content-center my-5">
                            
                            {/* Header */}
                            <div className="col-8 todo-bg-primary todo-border-dark todo-border-rad5 shadow">
                                <div className="row mx-3 mt-3">
                                    <h3 className="todo-fs-bold">
                                        Forgot Password ?
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
                                            <label className="form-label todo-fs-bold">New Password</label>
                                            <input type="password" className="form-control todo-border-dark" placeholder="Insert your new Password. Password at least 6 characters long." ref={(e) => this.passwordInput = (e)}/>
                                        </div>

                                        <div className="mb-5">
                                            <label className="form-label todo-fs-bold">Confirm Password</label>
                                            <input type="password" className="form-control todo-border-dark" placeholder="Please enter your password to confirm." ref={(e) => this.passwordConfirm = (e)}/>
                                        </div>

                                        <input type="button" value="Submit" className="btn todo-btn-dark todo-border-dark todo-fs-bold mb-3" onClick={() => this.onSubmitEditPassword ()}/>
                                    </form>
                                </div>
                            </div>
                        </div>
                        // console.log (this.props.user.dataUser.email)
                    :
                        // Email Input 
                        <div className="d-flex justify-content-center my-5">
                            <div className="col-8 todo-bg-primary todo-border-dark todo-border-rad5 shadow">
                                
                                {/* Header */}
                                <div className="row mx-3 mt-3">
                                    <h3 className="todo-fs-bold">
                                        Forgot Password ?
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
                                    this.props.user.message ?
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

                                {/* Form */}
                                <div className="row mx-3">
                                    <form className="col-12">
                                        <div className="mb-3">
                                            <label className="form-label todo-fs-bold">Email Address</label>
                                            <input type="email" className="form-control todo-border-dark" placeholder="Please enter your email address." ref={(e) => this.emailInput = (e)}/>
                                        </div>
        
                                        <input type="button" value="Submit" className="btn todo-btn-dark todo-border-dark todo-fs-bold mb-3" onClick= {() => this.onSubmitEmailUser()}/>
                                    </form>
                                </div>
                            </div>
                        </div>
                    
                }
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
    onCheckUserByEmail, onForgotPassword
}

export default connect (mapStateToProps, mapDispatchToProps) (ForgotPassword)

// export default ForgotPassword