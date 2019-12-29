import React from 'react'

const Notify = ({ message }) => {
    if (message === null || message === '') {
        return null
    } else if (message === 'Invalid username or password') {
        return (
            <div className="error">
                {message}
            </div>
        )
    } else {
        return (
            <div className="success">
                {message}
            </div>
        )
    }

};

export default Notify