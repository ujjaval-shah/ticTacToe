import React from 'react';

function Status(props) {

    if (props.need) {
        // return (
        //     <div className="status"> TURN </div>
        // )

        if (!(props.params.status)) {
            return (
                <div className="status"> TURN </div>
            )
        }
        if (props.params.status === 1) {
            return (
                <div className="status status-1"> WIN </div>
            )
        }
    }


    return (<></>)
}

export default Status;