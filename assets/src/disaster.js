var Disaster = function(game) {
	var game = game;
	var disasters = [["Poacher", "Hunters looking for beaver furs swing through, killing some number of your beavers", 0.05],
					 ["Pollution", "The polluted waters mutate your beavers' genes. Lose one evolution trait.", 0.1],
					 ["Lumberjack", "The forest has been leveled. There are no trees left to build with for two generations.", 0.15],
					 ["Forest Fire", "The land is scorched with a wild fire. No land based dam spaces survived the blaze.", 0.2],
					 ["Flash Flood", "The river becomes swollen, washing away all water based dam spaces", 0.2],
					 ["Drought", "The river runs dry, causing a chain effect that leads to starvation of half of your beavers", 0.15],
					 ["Famine", "The shrubs and grass your beavers subsist on do not grow. Half of your population dies and repopulation is impossible for one turn", 0.1],
					 ["Tornado", "A massive tornado whips through, destroying half of your dam and killing half of your population", 0.05]];
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
		selectDisaster = game.add.button(400, 15, 'select', actionOnSelect, this);
		for (var index = 0; index < disasters.length; index++) {
			var disaster = game.add.text(50, (index * 70) + 50, disasters[index][0], { fill: "white" });
			var description = game.add.text(100, (index * 70) + 80, disasters[index][1], { fill: "white", font: "16px Arial", wordWrap: true, wordWrapWidth: 700 });
			var probability = game.add.text(400, (index * 70) + 50, disasters[index][2], { fill: "white" });
		}
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
		selectDisaster = game.add.button(400, 15, 'select', actionOnSelect, this);
		for (var index = 0; index < disasters.length; index++) {
			var disaster = game.add.text(50, (index * 70) + 50, disasters[index][0], { fill: "white" });
			var description = game.add.text(100, (index * 70) + 80, disasters[index][1], { fill: "white", font: "16px Arial", wordWrap: true, wordWrapWidth: 700 });
			var probability = game.add.text(400, (index * 70) + 50, disasters[index][2], { fill: "white" });
		}
	},
	
	update: function() {

	},

	actionOnSelect: function() {
		if (getRandomInt(0,1) == 0) {
			console.log("No disaster");
		}
		else {
			var random = getRandomInt(0, 19);
			var result = map[random];
			console.log(result);			
		}		
	},

	getRandomInt: function(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
}