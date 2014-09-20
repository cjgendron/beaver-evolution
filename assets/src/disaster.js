var Disaster = function(game) {
	var game = game;
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