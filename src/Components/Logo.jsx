import React from "react"

class Logo extends React.Component {

    onRefresh = () => {
        if (localStorage.getItem ("token")) {
            window.location = "/dashboard"

        } else {
            window.location = "/"
        }
    }

    render () {
        return (
            <div className="container">
                <div className="col-12 my-3">
                    <button className="btn todo-btn-primary todo-border-dark todo-border-rad5 p-1 shadow" style={{width: "225px"}} onClick={() => this.onRefresh ()}>
                        <h1>
                            Get It Done
                        </h1>
                    </button>
                    
                    <h5 className="todo-fs-italic">
                        Your personal task and project manager.
                    </h5>
                    
                    
                </div>
            </div>
        )
    }
}

export default Logo