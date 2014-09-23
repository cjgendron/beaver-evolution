var Disasters = function(main, group) {
	this.main = main;
	this.game = main.game;
	this.group = group;
	this.damCount = main.board.getDamCount();
	this.beavers = main.beavers;
	this.dams = main.board.dams;

	this.createDisasters();

	this.disasters = [["Poacher", "Hunters looking for beaver furs swing through, killing some number of your beavers", 0.05],
					 ["Pollution", "The polluted waters mutate your beavers' genes. Lose one evolution trait.", 0.1],
					 ["Lumberjack", "The forest has been leveled. There are no trees left to build with for two generations.", 0.15],
					 ["Forest Fire", "The land is scorched with a wild fire. No land based dam spaces survived the blaze.", 0.2],
					 ["Flash Flood", "The river becomes swollen, washing away all water based dam spaces", 0.2],
					 ["Drought", "The river runs dry, causing a chain effect that leads to starvation of half of your beavers", 0.15],
					 ["Famine", "The shrubs and grass your beavers subsist on do not grow. Half of your population dies and repopulation is impossible for one turn", 0.1],
					 ["Tornado", "A massive tornado whips through, destroying half of your dam and killing half of your population", 0.05]];
	this.map = ["Poacher", 
				"Pollution", "Pollution", 
				"Lumberjack", "Lumberjack", "Lumberjack", 
				"Forest Fire", "Forest Fire", "Forest Fire", "Forest Fire",
				"Flash Flood", "Flash Flood", "Flash Flood", "Flash Flood",
				"Drought", "Drought", "Drought", 
				"Famine", "Famine", 
				"Tornado"];

};

Disasters.prototype = {
	createDisasters: function() {
		selectDisaster = game.add.button(400, 15, 'select', occurrence, this);
		for (var index = 0; index < disasters.length; index++) {
			var disaster = game.add.text(50, (index * 70) + 50, disasters[index][0], { fill: "white" });
			var description = game.add.text(100, (index * 70) + 80, disasters[index][1], { fill: "white", font: "16px Arial", wordWrap: true, wordWrapWidth: 700 });
			var probability = game.add.text(400, (index * 70) + 50, disasters[index][2], { fill: "white" });
		}
	},

	getGroup: function() {
		return this.group;
	},

	show: function() {
		this.group.visible = true;
	},

	hide: function() {
		this.group.visible = false;
	},
	
	occurrence: function() {
		if (getRandomInt(0,1) == 0) {
			console.log("No disaster");
		}
		else {
			var random = getRandomInt(0, 19);
			var result = map[random];
			console.log(result);
			consequences(result);		
		}		
	},

	consequences: function(result) {
		switch(result) {
			case "Drought":
				this.beavers -= Math.floor(this.beavers / 2);
				break;
			case "Famine":
				this.beavers -= Math.floor(this.beavers / 2);
				this.board.canPopulate = false;
				break;
			case "Tornado":
				this.beavers -= Math.floor(this.beavers / 2);
				// Currently just going to destroy the first half of the dams in the array
				var toDestroy = Math.floor(this.dams.length / 2);
				this.dams.splice(0, toDestroy - 1);	
				break;
			case "Lumberjack":
				this.board.canBuild = false;
				// TODO: somehow lock canBuild for two turns
				break;
			case "Pollution":
				// TODO: remove an evolution trait
				break;
			case "Poachers":
				var random = getRandomInt(0, 9);
				this.beavers -= random;
				break;
			case "Forest Fire":
				var landDams = this.main.board.getDamsOfType("land");

				// Destroying the first half of land dams that I get
				var toDestroy = Math.floor(arr.length / 2);
				landDams.splice(toDestroy, landDams.length);
				for (dam in landDams) {
					var piece = landDams[dam];
					this.main.board.removeDam(piece);
				}
				break;
			case "Flash Flood":
				var waterDams = this.main.board.getDamsOfType("water");
				var toDestroy = Math.floor(arr.length / 2);
				waterDams.splice(toDestroy, waterDams.length);
				for (dam in waterDams) {
					var piece = waterDams[dam];
					this.main.board.removeDam(piece);
				}
				break;
		}		
	},

	getRandomInt: function(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
}