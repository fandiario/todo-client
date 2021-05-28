import React from "react"
import validator from "validator"

// Redux
import {connect} from "react-redux"
import {onLoginUser} from "../Redux/Actions/UserAction"

// Link
import {Redirect} from "react-router-dom"

// Component
import Logo from "../Components/Logo"

class Login extends React.Component {

    state = {
        alerts : []
    }

    onLoginUser = () => {
        let emailInput = this.emailInput.value
        let passwordInput = this.passwordInput.value

        let validEmail = false
        let validPassword = false

        let alertArr = []

        if (!emailInput || !passwordInput) {
            alertArr.push ("You have to enter email address and password to log in.")
            this.setState ({alerts: alertArr})
        
        } else {
            let checkEmail = validator.isEmail (emailInput)

            if (checkEmail === true) {
                validEmail = true
                this.setState ({alerts: []})
            
            } else {
                alertArr.push ("Unknown email address format.")
                this.setState ({alerts: alertArr})
            }


            if (passwordInput.length >= 6 ) {
                validPassword = true
                this.setState ({alerts: []})
            } else {
                alertArr.push ("Unknown password format or invalid confirmed password.")
                this.setState ({alerts: alertArr})
            }


            if (validEmail === true && validPassword === true) {

                this.props.onLoginUser (emailInput, passwordInput)

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

                
                <div className=" d-flex justify-content-center my-5">
                    
                    {/* Header */}
                   <div className="col-8 todo-bg-primary todo-border-dark todo-border-rad5 shadow">
                       <div className="row mx-3 mt-3">
                           <h3 className="todo-fs-bold">
                               Log In
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
                                    <input type="email" className="form-control todo-border-dark" placeholder="Insert your email address to log in." ref={(e) => this.emailInput = (e)}/>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label todo-fs-bold">Password</label>
                                    <input type="password" className="form-control todo-border-dark" placeholder="Password at least 6 characters long." ref={(e) => this.passwordInput = (e)}/>
                                </div>
                                
                            </form>
                       </div>

                       <div className="row mx-3 d-flex justify-content-between">
                           <div>
                                <input type="button" value="Submit" className="btn todo-btn-dark todo-border-dark todo-fs-bold mb-3" onClick={() => this.onLoginUser ()}/>
                           </div>
                           <div className="my-2">
                                <a href="/forgot-password">Forgot password ?</a>
                           </div>
                       </div>

                       <div className="row mx-3">
                            <div className="todo-border-dark todo-bg-dark col-12 mb-3" style={{height: "1px"}}></div>
                       </div>

                       <div className="row mx-3 mb-3 d-flex justify-content-center">
                           <div>
                               <span>
                                    Don't have an account yet ? 
                               </span>
                               <span>
                                    <a href="/register"> Register here.</a>
                               </span>
                           </div>
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
    onLoginUser
}

export default connect (mapStateToProps, mapDispatchToProps) (Login)

// export default Login