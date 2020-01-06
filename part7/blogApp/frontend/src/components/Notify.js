import React from 'react'
import { connect } from 'react-redux'


const Notify = ({ notification }) => {
    if (notification === null || notification === '') {
        return null
    } else if (notification === 'Invalid username or password') {
        return (
            <div className="error">
                {notification}
            </div>
        )
    } else {
        return (
            <div className="success">
                {notification}
            </div>
        )
    }

};

const mapStateToProps = (state) => {
    console.log("notify", state)
    return {
      notification: state.notification,
    }
  }
  
  export default connect(mapStateToProps)(Notify)