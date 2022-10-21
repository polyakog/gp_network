import React from "react";
import Preloader from "../../common/Preloader/Preloader";
import css from './ProfileInfo.module.css';




class ProfileStatus extends React.Component {
state = {
    editMode: false,
} 

    activeteEditMode = () => {
        
        this.setState({editMode: true})
    }

    deactiveteEditMode() {
        this.setState({ editMode: false })
    }

  render () {

    return (

        <div >
            
            {!this.state.editMode &&
                <div className={css.UserStatus+" "+css.active }>
                    <span  onDoubleClick={this.activeteEditMode}>{this.props.status}</span>
                </div>
                }
            
            
            {this.state.editMode &&
                <div >    
                    <input className={css.UserStatus} autoFocus={true} onBlur={this.deactiveteEditMode.bind(this)} value={this.props.status}/>
                </div>    
                }
                              
        </div>
    );
  }

    
}

export default ProfileStatus;