import React from 'react';
import './Block.css';
import flag from './flag.png';
import bomb from './mine.png';

function Block(props) {
	let number = false;
	if (props.state > 0 && props.state <= 9) {
		number = true;
	}

	return (
		<div
			className={`block ${
				props.state !== props.value.UNKNOWN &&
				props.state !== props.value.MARKED
					? 'known'
					: ''
			} known${props.state}`}
			onClick={event => props.clicked(event, props.id)}
			onContextMenu={event => props.clicked(event, props.id)}
		>
			{number ? (
				<p>{props.state}</p>
			) : props.state === props.value.MARKED ? (
				<img
					style={{ width: '60%', height: '60%' }}
					src={flag}
				></img>
			) : props.state === props.value.BOMB ? (
				<img
					style={{ width: '60%', height: '60%' }}
					src={bomb}
				></img>
			) : (
				<p></p>
			)}
		</div>
	);
}

export default Block;
