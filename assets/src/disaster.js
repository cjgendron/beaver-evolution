var Disasters = function(main, group) {
	this.main = main;
	this.game = main.game;
	this.group = group;
	this.board = main.getBoard();
	//this.damCount = main.board.getDamCount();
	//this.beavers = main.beavers;
	//this.board.getDams() = main.board.dams;

	var disasters = [["Poacher", "Hunters looking for beaver furs swing through, killing some number of your beavers", 0.05],
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

	this.createDisasters(disasters);
	this.hide();
};

Disasters.prototype = {
	createDisasters: function(disasters) {
		// selectDisaster = this.game.group.button(400, 15, 'select', this.occurrence, this);
		this.hide();
		for (var index = 0; index < disasters.length; index++) {
			this.group.add(new Phaser.Text(this.game, 50, (index * 50) + 50, disasters[index][0], { fill: "black", font: "16px Arial" }));
			this.group.add(new Phaser.Text(this.game, 100, (index * 50) + 70, disasters[index][1], { fill: "black", font: "12px Arial", wordWrap: true, wordWrapWidth: 700 }));
			this.group.add(new Phaser.Text(this.game, 400, (index * 50) + 50, disasters[index][2], { fill: "black", font: "12px Arial" }));
			//Should make each disaster its own group and then only show based on what disasters could occur
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

	next: function() {
		this.hide();
		this.board.show();
	},
	
	occurrence: function() {
		var disaster;
		if (this.getRandomInt(0,1) == 0) {
			disaster = "No disaster";
			console.log("No disaster");
		}
		else {
			var random = this.getRandomInt(0, 19);
			var result = this.map[random];
			disaster = result;
			console.log(result);
			this.consequences(result);	
		}
		return disaster;
	},

	consequences: function(result) {
		switch(result) {
			case "Drought":
				this.main.setBeavers(Math.floor(this.main.getBeavers() / 2));
				this.main.updateBeaverCount();
				break;
			case "Famine":
				this.main.setBeavers(Math.floor(this.main.getBeavers() / 2));
				this.main.updateBeaverCount();
				this.board.canPopulate = false;
				break;
			case "Tornado":
				this.main.setBeavers(Math.floor(this.main.getBeavers() / 2));
				// Currently just going to destroy the first half of the dams in the array
				var dams = this.board.getDams();
				var toDestroy = Math.floor(dams.length/ 2);
				for (var dam = 0; dam < toDestroy; dam++){
					this.board.removeDam(dams[dam]);	
				}
				this.main.updateBeaverCount();
				this.main.updateDamCount();
				break;
			case "Lumberjack":
				this.board.canBuild = false;
				// TODO: somehow lock canBuild for two turns
				break;
			case "Pollution":
				// TODO: remove an evolution trait
				break;
			case "Poachers":
				var random = this.getRandomInt(0, 9);
				this.main.setBeavers(this.main.getBeavers() -random);
				this.main.updateBeaverCount();
				break;
			case "Forest Fire":
				var landDams = this.board.getDamsOfType("land");

				// Destroying the first half of land dams that I get
				var toDestroy = Math.floor(landDams.length / 2);
				landDams.splice(toDestroy, landDams.length);
				for (dam in landDams) {
					var piece = landDams[dam];
					this.board.removeDam(piece);
				}
				this.main.updateDamCount();
				break;
			case "Flash Flood":
				var waterDams = this.board.getDamsOfType("water");
				var toDestroy = Math.floor(waterDams.length / 2);
				waterDams.splice(toDestroy, waterDams.length);
				for (dam in waterDams) {
					var piece = waterDams[dam];
					this.board.removeDam(piece);
				}
				this.main.updateDamCount();
				break;
		}		
	},

	getRandomInt: function(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
}