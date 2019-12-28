import React from 'react'

const Notify = ({ message }) => {
    if (message === null || message === '') {
        return null
    }

    return (
        <div className="success">
            {message}
        </div>
    )
};

export default Notify