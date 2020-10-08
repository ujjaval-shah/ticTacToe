import React, { Component } from 'react'

// gameState - 0 - running

class Child extends Component {
    state = { mark: [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], status: 0, count: 0, win_list: [] }
    player = ['X', 'O']

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
        // let gameState = this.checkStatus(newMark)
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
            <div id="main">
                <table>
                    <tr>
                        <td onClick={() => this.handleClick(0)}
                            style={{ backgroundColor: this.state.win_list.includes(0) ? "#FFEBCD" : "yellow" }}
                        > <div className="cell"> {this.state.mark[0]} </div> </td>
                        <td onClick={() => this.handleClick(1)}
                            style={{ backgroundColor: this.state.win_list.includes(1) ? "#FFEBCD" : "yellow" }}
                        > <div className="cell"> {this.state.mark[1]} </div> </td>
                        <td onClick={() => this.handleClick(2)}
                            style={{ backgroundColor: this.state.win_list.includes(2) ? "#FFEBCD" : "yellow" }}
                        > <div className="cell"> {this.state.mark[2]} </div> </td>
                    </tr>
                    <tr>
                        <td onClick={() => this.handleClick(3)}
                            style={{ backgroundColor: this.state.win_list.includes(3) ? "#FFEBCD" : "yellow" }}
                        > <div className="cell"> {this.state.mark[3]} </div> </td>
                        <td onClick={() => this.handleClick(4)}
                            style={{ backgroundColor: this.state.win_list.includes(4) ? "#FFEBCD" : "yellow" }}
                        > <div className="cell"> {this.state.mark[4]} </div> </td>
                        <td onClick={() => this.handleClick(5)}
                            style={{ backgroundColor: this.state.win_list.includes(5) ? "#FFEBCD" : "yellow" }}
                        > <div className="cell"> {this.state.mark[5]} </div> </td>
                    </tr>
                    <tr>
                        <td onClick={() => this.handleClick(6)}
                            style={{ backgroundColor: this.state.win_list.includes(6) ? "#FFEBCD" : "yellow" }}
                        > <div className="cell"> {this.state.mark[6]} </div> </td>
                        <td onClick={() => this.handleClick(7)}
                            style={{ backgroundColor: this.state.win_list.includes(7) ? "#FFEBCD" : "yellow" }}
                        > <div className="cell"> {this.state.mark[7]} </div> </td>
                        <td onClick={() => this.handleClick(8)}
                            style={{ backgroundColor: this.state.win_list.includes(8) ? "#FFEBCD" : "yellow" }}
                        > <div className="cell"> {this.state.mark[8]} </div> </td>
                    </tr>
                </table>
                <div className="info">
                    <div id="player_1"
                        style={{
                            backgroundColor: (!(this.state.count % 2) && !(this.state.status)) || (this.state.status === 1 && !(this.state.count % 2)) ? "orange" : "#F7DC6F",
                        }}
                    > <div className="which_player"> PLAYER-1 <br /> <p className="gamefont symbol"> X </p> </div>
                        <div className="status"> {!(this.state.count % 2) && !(this.state.status) ? "TURN" : '\xa0'}
                            {this.state.status === 1 && !(this.state.count % 2) ? "WINNER" : '\xa0'}
                        </div>
                    </div>
                    <div id="player_2"
                        style={{ backgroundColor: ((this.state.count % 2) && !(this.state.status)) || (this.state.status === 1 && (this.state.count % 2)) ? "orange" : "#F7DC6F" }}
                    > <div className="which_player"> PLAYER-2 <br /> <p className="gamefont symbol"> O </p> </div>
                        <div className="status"> {(this.state.count % 2) && !(this.state.status) ? "TURN" : '\xa0'}
                            {this.state.status === 1 && (this.state.count % 2) ? "WINNER" : '\xa0'}
                        </div>
                    </div>
                </div>
                <h1 id="win_loss" style={{ color: "#8B0000", backgroundColor: "orange" }}>
                    {this.state.status === 1 && `Player ${this.state.count % 2 + 1} has won the game.`}
                    {this.state.status === 2 && `Oops... Match Draw.`}
                </h1>
            </div>
        );
    }
}

export default Child;