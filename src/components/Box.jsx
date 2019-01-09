import React from 'react'

export default props => {
    return(
        <button className="btn" onClick= {props.remount}>
            <h1>
                {props.number}
            </h1>
        </button>
    )
}