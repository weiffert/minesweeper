import React from 'react';
import './App.css';
import Board from './Board.js';
import Settings from './Settings.js';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			height: 15,
			width: 30,
			mineCount: 20,
			reset: false,
		};
	}

	handleSubmit = event => {
		this.setState({
			height:
				event.target.height.value === ''
					? this.state.height
					: event.target.height.value,
			width:
				event.target.width.value === ''
					? this.state.width
					: event.target.width.value,
			mineCount:
				event.target.mineCount.value === ''
					? this.state.height
					: event.target.mineCount.value,
			reset: !this.state.reset,
		});
	};

	render() {
		return (
			<div className="App">
				<div style={{margin: "20px", borderTop: "6px solid #333", borderBottom: "6px solid #ccc", borderLeft: "6px solid #333", borderRight: "6px solid #ccc"}}>
					<Settings
						height={this.state.height}
						width={this.state.width}
						mineCount={this.state.mineCount}
						handleSubmit={this.handleSubmit}
					></Settings>
				</div>
				<div style={{margin: "20px", padding: "20px", borderTop: "6px solid #333", borderBottom: "6px solid #ccc", borderLeft: "6px solid #333", borderRight: "6px solid #ccc"}}>
					<Board
						height={this.state.height}
						width={this.state.width}
						reset={this.state.reset}
						mineCount={this.state.mineCount}
					></Board>
				</div>
			</div>
		);
	}
}

export default App;
