import React, { Component } from 'react'
import WinLoss from './WinLoss'
import Status from './Status'

class Child extends Component {
    state = { mark: [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], status: 0, count: 0, win_list: [] }
    player = ['X', 'O']

    reset = () => {
        this.props.reloadGame()
    }

    checkStatus = (newMark) => {
        for (let i = 0; i < 3; i++) { if (newMark[0 + 3 * i] === 'X' && newMark[1 + 3 * i] === 'X' && newMark[2 + 3 * i] === 'X') return [0 + 3 * i, 1 + 3 * i, 2 + 3 * i]; }
        for (let i = 0; i < 3; i++) { if (newMark[0 + 3 * i] === 'O' && newMark[1 + 3 * i] === 'O' && newMark[2 + 3 * i] === 'O') return [0 + 3 * i, 1 + 3 * i, 2 + 3 * i]; }
        for (let i = 0; i < 3; i++) { if (newMark[0 + i] === 'X' && newMark[3 + i] === 'X' && newMark[6 + i] === 'X') return [0 + i, 3 + i, 6 + i]; }
        for (let i = 0; i < 3; i++) { if (newMark[0 + i] === 'O' && newMark[3 + i] === 'O' && newMark[6 + i] === 'O') return [0 + i, 3 + i, 6 + i]; }
        if (newMark[0] === 'X' && newMark[4] === 'X' && newMark[8] === 'X') return [0, 4, 8];
        if (newMark[0] === 'O' && newMark[4] === 'O' && newMark[8] === 'O') return [0, 4, 8];
        if (newMark[2] === 'X' && newMark[4] === 'X' && newMark[6] === 'X') return [2, 4, 6];
        if (newMark[2] === 'O' && newMark[4] === 'O' && newMark[6] === 'O') return [2, 4, 6];
        return [];
    }

    handleClick = async (pos) => {
        if (this.state.mark[pos] !== ' ' || this.state.status !== 0) return
        let newMark = this.state.mark.map(y => y)
        newMark[pos] = this.player[(this.state.count) % 2]
        let possibleWin = this.checkStatus(newMark)
        let gameState = (possibleWin.length) ? 1 : 0;
        console.log(possibleWin, gameState)
        let newState = await { ...this.state.count, mark: newMark, status: gameState, win_list: possibleWin }
        this.setState(newState)
        if (this.state.status > 0) { return; }
        this.setState({ ...this.state, count: this.state.count + 1 })
        if (this.state.count === 9) this.setState({ ...this.state, status: 2 })
    }

    render() {
        return (
            <>

                <div className="game container">

                    {this.state.mark.map((item, index) => (
                        <div className={`grid-cell ${this.state.win_list.includes(index) ? "win-cell" : "normal-cell"}`} onClick={() => this.handleClick(index)}
                        > <div className="mark"> {item} </div> </div>
                    ))}

                </div>

                <div className="info container">
                    <div
                        className={`player ${(!(this.state.count % 2) && !(this.state.status)) || (this.state.status === 1 && !(this.state.count % 2)) ? "active" : "inactive"}`}
                    > <div className="which_player"> P1 - X </div>

                        <Status need={!(this.state.count % 2)} params={
                            { status: this.state.status }
                        } />
                    </div>
                    <div
                        className={`player ${((this.state.count % 2) && !(this.state.status)) || (this.state.status === 1 && (this.state.count % 2)) ? "active" : "inactive"}`}
                    > <div className="which_player"> P2 - 0</div>

                        <Status need={(this.state.count % 2)} params={
                            { status: this.state.status }
                        } />
                    </div>

                </div>

                <WinLoss content={
                    {
                        status: this.state.status,
                        count: this.state.count
                    }
                } />

                <div id="reload" className="container" onClick={this.reset}>
                    RELOAD
                </div>

            </>
        );
    }
}

export default Child;