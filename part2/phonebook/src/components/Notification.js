import React from 'react'

const Notification = ({ message, errMessage }) => {
    if (message === null) {
      return (
        <div className="errMessage">
          {errMessage}
        </div>
      )
    }else{
      return (
        <div className="message">
          {message}
        </div>
      )
    }
  }

  export default Notification