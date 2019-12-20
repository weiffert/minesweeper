import React from 'react';
import Block from './Block.js';

var value = {
	UNKNOWN: -2,
	MARKED: -3,
	BOMB: -1,
	ZERO: 10,
};

class Board extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			alive: true,
			known: this.generateBasic(
				props.height,
				props.width,
				value.UNKNOWN
			),
			answers: this.generateBoard(
				this.generateBasic(props.height, props.width, 0),
				props.mineCount
			),
			reset: this.props.reset,
		};
	}

	componentDidUpdate(prevprops) {
		if (
			prevprops.width !== this.props.width ||
			prevprops.height !== this.props.height ||
			prevprops.mineCount !== this.props.mineCount ||
			this.state.reset !== this.props.reset
		)
			this.setState({
				known: this.generateBasic(
					this.props.height,
					this.props.width,
					value.UNKNOWN
				),
				answers: this.generateBoard(
					this.generateBasic(
						this.props.height,
						this.props.width,
						0
					),
					this.props.mineCount
				),
				reset: this.props.reset,
			});
	}

	getRandomInt(max) {
		return Math.floor(Math.random() * Math.floor(max));
	}

	generateBasic(height, width, placeholder) {
		let arr = [];
		for (let i = 0; i < height; i++) {
			arr.push([]);
			for (let j = 0; j < width; j++) {
				arr[i].push(placeholder);
			}
		}
		return arr;
	}

	generateBoard(locations, mines) {
		let arr = [];
		for (let i = 0; i < locations.length; i++) {
			for (let j = 0; j < locations[0].length; j++) {
				arr.push({h: i, w: j});
			}
		}

		for (let i = 0; i < mines; i++) {
			let index = this.getRandomInt(arr.length);
			locations[arr[index].h][arr[index].w] = value.BOMB;
			arr.splice(index, 1)
		}

		for (let i = 0; i < locations.length; i++) {
			for (let j = 0; j < locations[0].length; j++) {
				if (locations[i][j] === value.BOMB) {
					for (let h = i - 1; h <= i + 1; h++) {
						for (let w = j - 1; w <= j + 1; w++) {
							if (
								h >= 0 &&
								h < locations.length &&
								w >= 0 &&
								w < locations[0].length &&
								locations[h][w] !== value.BOMB
							) {
								locations[h][w] += 1;
							}
						}
					}
				}
			}
		}

		return locations;
	}

	handleClick = (event, sequence) => {
		event.preventDefault();
		console.log(event.button);
		let height = Math.floor(sequence / this.state.known[0].length);
		let width = sequence % this.state.known[0].length;

		let known = this.state.known;

		this.setState({
			known: this.updateKnown(known, event.button, height, width),
		});
	};

	updateKnown(known, click, height, width) {
		if (click === 2) {
			if (known[height][width] === value.MARKED) {
				known[height][width] = value.UNKNOWN;
			} else if (known[height][width] === value.UNKNOWN) {
				known[height][width] = value.MARKED;
			}

			let win = true;
			for (let i = 0; i < known.length; i++) {
				for (let j = 0; j < known[0].length; j++) {
					if (this.state.answers[i][j] === value.BOMB && known[i][j] !== value.MARKED) {
						win = false;
					}
				}
			}

			if(win) {
				alert("YOU WIN!")
			}
		} else {
			if (this.state.answers[height][width] === value.BOMB) {
				for (let i = 0; i < known.length; i++) {
					for (let j = 0; j < known[0].length; j++) {
						if (this.state.answers[i][j] === value.BOMB) {
							known[i][j] = value.BOMB;
						}
					}
				}
			} else if (this.state.answers[height][width] === 0) {
				// find all nearby.
				known[height][width] = value.ZERO;
				for (let h = height - 1; h <= height + 1; h++) {
					for (let w = width - 1; w <= width + 1; w++) {
						if (
							h >= 0 &&
							h < known.length &&
							w >= 0 &&
							w < known[0].length
						) {
							if (known[h][w] !== value.ZERO) {
								known = this.updateKnown(
									known,
									click,
									h,
									w
								);
							}
						}
					}
				}
			} else {
				known[height][width] = this.state.answers[height][width];
			}
		}

		return known;
	}

	render() {
		let sequence = 0;
		return (
			<div style={{display: 'flex', flexDirection: 'column',overflowX: "scroll"}}>
				{this.state.known.map(row => (
					<div style={{ display: 'flex', alignSelf: 'center', margin: 'auto'}}>
						{row.map(col => (
							<Block
								id={sequence}
								key={sequence++}
								state={col}
								clicked={this.handleClick}
								value={value}
							></Block>
						))}
					</div>
				))}
			</div>
		);
	}
}

export default Board;
