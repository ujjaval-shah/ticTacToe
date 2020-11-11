import React from 'react';

function WinLoss(props) {

    if (props.content.status === 0) {
        return (<></>)
    }

    if (props.content.status === 1) {
        return (
            <div id="WinLossContain" className="container">
                <p id="win_loss">
                    {`Player ${props.content.count % 2 + 1} has won the game.`}
                </p>
            </div>
        )
    }

    if (props.content.status === 2) {
        return (
            <div id="WinLossContain" className="container">
                <p id="win_loss container">
                    {`Oops... Match Draw.`}
                </p>
            </div>
        )
    }

}

export default WinLoss;