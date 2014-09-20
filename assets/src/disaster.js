var Disaster = function(game) {
	var game = game;
	var disasters = [["Poacher", 0.05], ["Pollution", 0.1],
					  ["Lumberjack", 0.15], ["Forest Fire", 0.2], 
					  ["Flash Flood", 0.2], ["Drought", 0.15],
					  ["Famine", 0.1], ["Tornado", 0.05]];
	var map = ["Poacher", 
				"Pollution", "Pollution", 
				"Lumberjack", "Lumberjack", "Lumberjack", 
				"Forest Fire", "Forest Fire", "Forest Fire", "Forest Fire",
				"Flash Flood", "Flash Flood", "Flash Flood", "Flash Flood",
				"Drought", "Drought", "Drought", 
				"Famine", "Famine", 
				"Tornado"];

	createDisaster(this);

	function createDisaster(disaster) {

		selectDisaster = game.add.button(400, 100, 'select', actionOnSelect, this);
	}
	
	function actionOnSelect() {
		if (getRandomInt(0,1) == 0) {
			console.log("No disaster");
		}
		else {
			var random = getRandomInt(0, 19);
			var result = map[random];
			console.log(result);			
		}
	}	

	function getRandomInt (min, max) {
    	return Math.floor(Math.random() * (max - min + 1)) + min;
	}

};

Disaster.prototype = {
	create: function() {
		console.log("creating");
	},
	update: function() {

	}
}