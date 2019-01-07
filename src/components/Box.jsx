import React from 'react'

export default props => {
    return(
        <button onClick= {props.remount}>
            <h1>
                {props.number}
            </h1>
        </button>
    )
}