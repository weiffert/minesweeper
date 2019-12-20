
function setMarkers(height, width) {
	for (i = height - 1; i <= height + 1; i++) {
		for (j = width - 1; j <= width + 1; j++) {
			if (i >= 0 && i < board.height && j >= 0 && j < board.width) {
				board.locations[i][j]++;
			}
		}
	}
}
