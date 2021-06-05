import React from "react"

// Redux
import {connect} from "react-redux"
import {getDataTask, getAssigneeTask} from "../Redux/Actions/TaskAction"

// Reactstrap
import {Modal, ModalHeader, ModalBody} from "reactstrap"

class DetailTask extends React.Component {
    state = {
        showModal: false,
        // justTapButton: false
    }

    componentDidMount () {
        this.onShowModal ()
        this.onGetDataTask ()
        this.onGetAssigneeTask ()
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

    onGetDataTask = () => {
        let idTask = this.props.idTask
        
        this.props.getDataTask (idTask)

        // console.log (this.props.task.dataTask)
    }

    onGetAssigneeTask = () => {
        let idTask = this.props.idTask

        this.props.getAssigneeTask (idTask)

        // console.log (this.props.task.assigneeTask)
    }

    render () {
        return (
            <div className="container">
                <Modal isOpen={this.state.showModal} toggle={() => this.onToggleModal()} className="todo-border-dark todo-border-rad5">
                    <ModalHeader>
                        Detail Task
                    </ModalHeader>
                    <ModalBody>
                        {/* (Insert Detail Task {this.props.idTask} Here) */}
                        {/* Detail */}
                        <div className="mb-3">
                            <span className="todo-fs-bold">
                                ID:
                            </span>
                            <span className="ml-2">
                                {this.props.idTask}
                            </span>
                        </div>

                        <div className="mb-3">
                            <span className="todo-fs-bold">
                                Title:
                            </span>
                            <span className="ml-2">
                                {this.props.task.dataTask.title}
                            </span>
                        </div>

                        <div className="mb-3">
                            <div className="todo-fs-bold">
                                Description:
                            </div>
                            <div className="">
                                {this.props.task.dataTask.description}
                            </div>
                        </div>

                        <div className="mb-3">
                            <span className="todo-fs-bold">
                                Start:
                            </span>
                            <span className="ml-2">
                                { (new Date (this.props.task.dataTask.date_start)).toLocaleString () }
                            </span>
                        </div>

                        <div className="mb-3">
                            <span className="todo-fs-bold">
                                End: 
                            </span>
                            <span className="ml-2">
                                { (new Date (this.props.task.dataTask.date_end)).toLocaleString () }
                            </span>
                        </div>

                        <div className="mb-3">
                            <span className="todo-fs-bold">
                                Created By :
                            </span>
                            <span className="ml-2">
                                {this.props.task.dataTask.user}
                            </span>
                        </div>

                        <div className="mb-3">
                            <span className="todo-fs-bold">
                                Created At: 
                            </span>
                            <span className="ml-2">
                                { (new Date (this.props.task.dataTask.created_at)).toLocaleString () }
                            </span>
                        </div>

                        <div className="mb-3">
                            <div className="todo-fs-bold">
                                Assigned to: 
                            </div>
                            <div className="">
                                {
                                    this.props.task.assigneeTask ?
                                        this.props.task.assigneeTask.map ((el, i) => {
                                            return (
                                                <div key={i}>
                                                    {el.email}
                                                </div>
                                            )
                                        })
                                    :
                                        <div>
                                            You haven't assigned anyone for this task.
                                        </div>
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
        task: state.task
    }
}

const mapDispatchToProps = {
    getDataTask,
    getAssigneeTask
}

export default connect (mapStateToProps, mapDispatchToProps) (DetailTask)

// export default DetailTask