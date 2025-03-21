import React from 'react'
import styles from './ProfileInfo.module.css'

class ProfileStatus extends React.Component {
  state = {
    editMode: false,
    status: this.props.status,
  }

  activateEditMode = () => {
    this.setState({
      editMode: true,
    })
  }
  deactivateEditMode = () => {
    this.setState({
      editMode: false,
    })
    this.props.updateStatus(this.state.status)
  }

  onStatusChange = (e) => {
    this.setState({
      status: e.currentTarget.value,
    })
  }

  render() {
    return (
      <div>
        {!this.state.editMode && (
          <div>
            <span onDoubleClick={this.activateEditMode}>
              {this.props.status || 'NO STATUS'}
            </span>
          </div>
        )}
        {this.state.editMode && (
          <div>
            <input
              onBlur={this.deactivateEditMode}
              autoFocus
              onChange={this.onStatusChange}
              value={this.status}
            />
          </div>
        )}
      </div>
    )
  }
}

export default ProfileStatus
