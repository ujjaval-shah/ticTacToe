import React from 'react';

function WinLoss(props) {

    if (props.content.status === 0) {
        return (<></>)
    }

    if (props.content.status === 1) {
        return (
            <div id="WinLossContain">
                <h1 id="win_loss">
                    {`Player ${props.content.count % 2 + 1} has won the game.`}
                </h1>
            </div>
        )
    }

    if (props.content.status === 2) {
        return (
            <div id="WinLossContain">
                <h1 id="win_loss">
                    {`Oops... Match Draw.`}
                </h1>
            </div>
        )
    }

}

export default WinLoss;