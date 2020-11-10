import React, { Component } from 'react'
import WinLoss from './WinLoss'
import Status from './Status'

// gameState - 0 - running

// var palettes = [
//     "#B3CC57",
//     "#ECF081",
//     "#FFBE40",
//     "#EF746F",
//     "#AB3E5B"
// ]

class Child extends Component {
    state = { mark: [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], status: 0, count: 0, win_list: [], back_color: 0 }
    player = ['X', 'O']

    reset = () => {
        this.setState(
            { mark: [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], status: 0, count: 0, win_list: [], back_color: this.state.back_color + 1 }
        )

        // const indx = this.state.back_color % palettes.length;
        // document.body.style.background = palettes[indx];

    }

    componentWillUnmount() {
        var viewport = document.querySelector('meta[name="viewport"]');

        if (viewport) {
            viewport.content = "initial-scale=0.1";
            viewport.content = "width=600";
        }
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
            <>

                <div className="game">

                    {this.state.mark.map((item, index) => (
                        <div className={`grid-cell ${this.state.win_list.includes(index) ? "win-cell" : "normal-cell"}`} onClick={() => this.handleClick(index)}
                        > <div className="mark"> {item} </div> </div>
                    ))}

                    {/* <div onClick={() => this.handleClick(0)}
                        style={{ backgroundColor: this.state.win_list.includes(0) ? "aqua" : "lightcyan" }}
                    > <div className="cell"> {this.state.mark[0]} </div> </div>
                    <div onClick={() => this.handleClick(1)}
                        style={{ backgroundColor: this.state.win_list.includes(1) ? "aqua" : "lightcyan" }}
                    > <div className="cell"> {this.state.mark[1]} </div> </div>
                    <div onClick={() => this.handleClick(2)}
                        style={{ backgroundColor: this.state.win_list.includes(2) ? "aqua" : "lightcyan" }}
                    > <div className="cell"> {this.state.mark[2]} </div> </div>


                    <div onClick={() => this.handleClick(3)}
                        style={{ backgroundColor: this.state.win_list.includes(3) ? "aqua" : "lightcyan" }}
                    > <div className="cell"> {this.state.mark[3]} </div> </div>
                    <div onClick={() => this.handleClick(4)}
                        style={{ backgroundColor: this.state.win_list.includes(4) ? "aqua" : "lightcyan" }}
                    > <div className="cell"> {this.state.mark[4]} </div> </div>
                    <div onClick={() => this.handleClick(5)}
                        style={{ backgroundColor: this.state.win_list.includes(5) ? "aqua" : "lightcyan" }}
                    > <div className="cell"> {this.state.mark[5]} </div> </div>


                    <div onClick={() => this.handleClick(6)}
                        style={{ backgroundColor: this.state.win_list.includes(6) ? "aqua" : "lightcyan" }}
                    > <div className="cell"> {this.state.mark[6]} </div> </div>
                    <div onClick={() => this.handleClick(7)}
                        style={{ backgroundColor: this.state.win_list.includes(7) ? "aqua" : "lightcyan" }}
                    > <div className="cell"> {this.state.mark[7]} </div> </div>
                    <div onClick={() => this.handleClick(8)}
                        style={{ backgroundColor: this.state.win_list.includes(8) ? "aqua" : "lightcyan" }}
                    > <div className="cell"> {this.state.mark[8]} </div> </div> */}

                </div>

                <div className="info">
                    <div
                        className={`player ${(!(this.state.count % 2) && !(this.state.status)) || (this.state.status === 1 && !(this.state.count % 2)) ? "active" : "inactive"}`}
                    // style={{
                    //     backgroundColor: (!(this.state.count % 2) && !(this.state.status)) || (this.state.status === 1 && !(this.state.count % 2)) ? "#F7DC6F" : "orange",
                    // }}
                    > <div className="which_player"> P1 - X </div>
                        {/* <div className="status"> {!(this.state.count % 2) && !(this.state.status) ? "TURN" : '\xa0'}
                            {this.state.status === 1 && !(this.state.count % 2) ? "WINNER" : '\xa0'}
                        </div> */}
                        <Status need={!(this.state.count % 2)} params={
                            { status: this.state.status }
                        } />
                    </div>
                    <div
                        className={`player ${((this.state.count % 2) && !(this.state.status)) || (this.state.status === 1 && (this.state.count % 2)) ? "active" : "inactive"}`}
                    > <div className="which_player"> P2 - 0</div>
                        {/* <div className="status"> {(this.state.count % 2) && !(this.state.status) ? "TURN" : '\xa0'}
                            {this.state.status === 1 && (this.state.count % 2) ? "WINNER" : '\xa0'}
                        </div> */}
                        <Status need={(this.state.count % 2)} params={
                            { status: this.state.status }
                        } />
                    </div>

                </div>

                {/* <h1 id="win_loss" style={{ color: "#8B0000", backgroundColor: "orange" }}>
                    {this.state.status === 1 && `Player ${this.state.count % 2 + 1} has won the game.`}
                    {this.state.status === 2 && `Oops... Match Draw.`}
                </h1> */}

                <WinLoss content={
                    {
                        status: this.state.status,
                        count: this.state.count
                    }
                } />

                <div id="reload" onClick={this.reset}>
                    Reload
                </div>

            </>
        );
    }
}

export default Child;