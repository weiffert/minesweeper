import React from 'react';

class Settings extends React.Component {
	render() {
		return (
			<form onSubmit={(event) => {event.preventDefault(); this.props.handleSubmit(event)}} style={{display: "flex", flexDirection: "column", padding: "20px"}}>
				<div style={{display: "flex", alignSelf: "center", margin: "10px"}}>
					<label for="height">Number of rows: </label>
					<input
						type="number"
						id="height"
						min="1"
						max={1000}
						name="height"
					></input>
				</div>
				<div style={{display: "flex", alignSelf: "center", margin: "10px"}}>
					<label for="width">Number of columns: </label>
					<input
						type="number"
						id="width"
						min="1"
						max={1000}
						name="width"
					></input>
				</div>
				<div style={{display: "flex", alignSelf: "center", margin: "10px"}}>
					<label for="mineCount">Number of mines: </label>
					<input
						type="number"
						id="mineCount"
						min="1"
						max={this.props.height * this.props.width}
						name="mineCount"
					></input>
				</div>
                <button type="submit">
                    New Game
                </button>
			</form>
		);
	}
}

export default Settings;
