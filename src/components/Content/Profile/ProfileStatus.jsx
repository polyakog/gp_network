import React from "react";
import css from './ProfileInfo.module.css';


class ProfileStatus extends React.Component {
    state = {
        editMode: false,
        // status: "---"
        status: this.props.status
    }

    activeteEditMode = () => {
        this.setState({
            editMode: true,
            
        })
    }

    deactiveteEditMode = () => {
        this.setState({
            editMode: false
        })
    }

    saveState = () => {
        this.setState({
            editMode: false,
        })
        this.props.updateUserStatus(this.state.status)
    }

    onStatusChange = (e) => {
        this.setState({
            status: e.currentTarget.value
        })
    }

    /* можно не использовать - как пример */
componentDidUpdate (prevProps, prevState) {
    if (prevProps.status !==this.props.status) {
        this.setState({ status: this.props.status })
    }
     
}

    render() {

        return (

            <div >

                {!this.state.editMode &&
                    <div className={css.UserStatus + " " + css.active}>
                        {/* info from API-> Global State */}
                        <span onDoubleClick={this.activeteEditMode}>{this.props.status ? this.props.status : 'No status'}</span>
                    </div>
                }


                {this.state.editMode &&
                    <div >
                        {/* info from Local State */}
                        <textarea className={css.UserStatus} onChange={this.onStatusChange} autoFocus={true} value={this.state.status} />
                        <div className={css.status}>
                            <button onClick={this.deactiveteEditMode}>Cancel <i >&#10554;</i></button>
                            <button onClick={this.saveState}>Save <i >&#10173;</i></button>
                        </div>


                    </div>
                }

            </div>
        );
    }

}

export default ProfileStatus;