var Disasters = function(main, group) {
	this.main = main;
	this.game = main.game;
	this.group = group;
	this.board = main.getBoard();
	//this.damCount = main.board.getDamCount();
	//this.beavers = main.beavers;
	//this.board.getDams() = main.board.dams;
	this.disasters = {
		"Lumberjack": {
			description: "The forest has been leveled. There are no trees left to build with for two generations.",
			probability: 0.15
		},
		"Forest Fire": {
			description: "The land is scorched with a wild fire. No land based dam spaces survived the blaze.",
			probability: 0.2
		},
		"Flash Flood": {
			description: "The river becomes swollen, washing away all water based dam spaces.",
			probability: 0.2,
		},
		"Drought": {
			description: "The river runs dry, causing a chain effect that leads to starvation of half of your beavers.",
			probability: 0.15,
		},
		"Pollution": {
			description: "The polluted waters mutate your beavers' genes. Lose one evolution trait.",
			probability: 0.1,
		},
		"Famine": {
			description: "The shrubs and grass your beavers subsist on do not grow. Half of your population dies and repopulation is impossible for one turn.",
			probability: 0.1,
		},
		"Tornado": {
			description: "A massive tornado whips through, destroying half of your dam and killing half of your population.",
			probability: 0.05,
		},
		"Poacher": {
			description: "Hunters looking for beaver furs swing through, killing some number of your beavers.",
			probability: 0.05,
		}
	};

	this.createDisasters(this.disasters);
	this.hide();
};

Disasters.prototype = {
	createDisasters: function(disasters) {
		// Use this line to quickly cause disasters
		// selectDisaster = this.group.add(new Phaser.Button(this.game, 400, 15, 'select', this.occurrence, this));

		this.hide();
		// console.log(disasters.keys());
		var index = 0;
		var disasterKeys = Object.keys(disasters);
		for (var index = 0; index < disasterKeys.length; index++) {
			var disaster = disasterKeys[index];
			this.group.add(new Phaser.Text(this.game, 50, (index * 59) + 30, disaster, { fill: "black", font: "24px Bubblegum Sans" }));
			this.group.add(new Phaser.Text(this.game, 50, (index * 59) + 50, disasters[disaster].description, { fill: "black", font: "16px Open Sans", wordWrap: true, wordWrapWidth: 700 }));
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
		var disasterTier = this.getDisasterTier();
		if (this.getRandomInt(0,1) == 0 || (disasterTier > 0 && this.getRandomInt(0,2) < 0)) {
			disaster = "No disaster";
			// this.showResult("no disaster", "nothing happened");
			console.log("No disaster");
		}
		else {
			var map = this.progressiveMap();
			var random = this.getRandomInt(0, map.length - 1);
			var result = map[random];
			disaster = result;
			console.log(result);
			this.consequences(result);
		}
		return disaster;
	},

	consequences: function(result) {
		switch(result) {
			case "Drought":
				var pct = 0.5;
				if (this.main.getEvolutionCard().getTrait(1,2)) {
					pct = 0.75;
				}
				var lostBeavers = Math.floor(this.main.getBeavers() * pct);
				this.main.setBeavers(lostBeavers);
				this.main.updateBeaverCount();
				this.showResult("Drought", "Because of the drought, you now only have " + lostBeavers + " beavers.");
				break;
			case "Famine":
				if (!this.main.getEvolutionCard().getTrait(0,2)) {
					var lostBeavers = Math.floor(this.main.getBeavers() / 2)
					this.main.setBeavers(lostBeavers);
					this.main.updateBeaverCount();
					this.showResult("Famine", "The famine left you with only " + lostBeavers + " beavers.");
				} else {
					this.showResult("Famine", "Good thing you're immune from population loss during famine!");
				}
				this.main.getBoard().decrementPopulateCounter();
				break;
			case "Tornado":
				var pct = 0.5;
				if (this.main.getEvolutionCard().getTrait(1,1)) {
					pct = 0.25;
				}
				var lostBeavers = Math.floor(this.main.getBeavers() * (1-pct));
				this.main.setBeavers(lostBeavers);
				this.main.updateBeaverCount();
				// Currently just going to destroy the first half of the dams in the array
				var dams = this.board.getDams();
				var toDestroy = Math.floor(dams.length * pct);
				for (var dam = 0; dam < toDestroy; dam++){
					this.board.removeDam(dams[dam]);	
				}
				this.main.updateBeaverCount();
				this.main.updateDamCount();
				this.showResult("Tornado", "You're left with only " + lostBeavers + " beavers and you lost " + toDestroy + " dams.");
				this.tornado = this.game.add.audio("tornado");
				this.tornado.play();
				break;
			case "Lumberjack":
				var turnsLost = 0;
				if (!this.main.getEvolutionCard().getTrait(0,1)){
					this.main.getBoard().decrementBuildCounter();
					turnsLost++;
				}
				this.main.getBoard().decrementBuildCounter();
				turnsLost++;
				this.showResult("Lumberjack", "Because of the lumberjacks, you can't build  dams for " + turnsLost + " turns.");
				this.lumberjack = this.game.add.audio("lumberjack");
				this.lumberjack.play("",0,0.75);
				break;
			case "Pollution":
				// iterate through traits, remove the first highest one we see
				var devolved = false;
				var traitDescription = null;
				for (var trait = 2; trait >=0; trait--){
					for (var category = 0; category <= 2; category++){
						if (this.main.getEvolutionCard().getTrait(category,trait)) {
							traitDescription = this.main.getEvolutionCard().getTraitDescription(category, trait);
							this.main.getEvolutionCard().devolveTrait(category,trait);
							devolved=true;
							break;
						}
					}
					if (devolved) break;
				}
				this.showResult("Pollution", "You lost this trait: " + traitDescription);
				this.pollution = this.game.add.audio("pollution");
				this.pollution.play();
				break;
			case "Poachers":
				var random = this.getRandomInt(0, 9);
				if (this.main.getEvolutionCard().getTrait(1,0)) {
					random *= 0.5;
				}
				var lostBeavers = this.main.getBeavers() - random;
				this.main.setBeavers(lostBeavers);
				this.main.updateBeaverCount();
				this.showResult("Poachers", "You now only have " + lostBeavers + " beavers.");
				this.poacher = this.game.add.audio("poacher");
				this.poacher.play("",0,0.4);
				break;
			case "Forest Fire":
				var pct = 1;
				if (this.main.getEvolutionCard().getTrait(2,2)) {
					pct = 0.5;
				}
				var landDams = this.board.getDamsOfType("land");

				// Destroying the first half of land dams that I get
				var toDestroy = Math.floor(landDams.length * pct);
				landDams.splice(toDestroy, landDams.length);
				for (dam in landDams) {
					var piece = landDams[dam];
					this.board.removeDam(piece);
				}
				this.main.updateDamCount();
				this.showResult("Forest Fire", "You lost " + toDestroy + " land dams in the forest fire.");
				this.fire = this.game.add.audio("fire");
				this.fire.play();
				break;
			case "Flash Flood":
				var pct = 1;
				if (this.main.getEvolutionCard().getTrait(2,0)) {
					pct = 0.5;
				}
				var waterDams = this.board.getDamsOfType("water");
				var toDestroy = Math.floor(waterDams.length * pct);
				waterDams.splice(toDestroy, waterDams.length);
				for (dam in waterDams) {
					var piece = waterDams[dam];
					this.board.removeDam(piece);
				}
				this.main.updateDamCount();
				this.showResult("Flash Flood", "You lost " + toDestroy + " water dams in the flash flood.");
				this.flood = this.game.add.audio("rain");
				this.flood.play();
				break;
		}
	},

	getRandomInt: function(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	},

	getDisasterTier: function(){
		var maxTraitLevel = 0;
		var card = this.main.getEvolutionCard().card;
		for(var i = 0; i < card.length; i++) {
			var stage = card[i].getHighestStage();
			if(typeof(stage) === "number"){
				maxTraitLevel = Math.max(maxTraitLevel, stage);
			}
		}

		var disasterTier = 0;
		if(maxTraitLevel == 1 || this.board.getDamCount() >= 12 || this.main.getBeavers() >= 11) {
			disasterTier = 1;
		}
		if(maxTraitLevel > 1 || (this.board.getDamCount() >= 20 && this.main.getBeavers() >= 18))  {
			disasterTier = 2;
		}
		return disasterTier;
	},

	progressiveMap: function() {
		
		var disasterTier = this.getDisasterTier();
		var progressiveMap = [
			"Lumberjack", "Lumberjack", "Lumberjack", 
			"Forest Fire", "Forest Fire", "Forest Fire", "Forest Fire",
			"Flash Flood", "Flash Flood", "Flash Flood", "Flash Flood",
			"Drought", "Drought", "Drought"
		];

		if (disasterTier > 0) {
			progressiveMap = progressiveMap.concat(["Pollution", "Pollution", "Pollution", "Pollution", "Famine", "Famine", "Famine"]);
		}
		if (disasterTier === 2) {
			progressiveMap = progressiveMap.concat(["Poacher", "Poacher", "Poacher", "Tornado", "Tornado", "Tornado"]);
		}

		console.log("your disaster tier is: ", disasterTier);
		return progressiveMap;
	},
	showResult: function(name, result) {
		var eventGroup = this.game.add.group();
		eventGroup.add(new Phaser.Image(this.game, 100, 100, 'disaster_bg'));
		nameText = new Phaser.Text(this.game, 150, 150, name,
			{ font: "50px BubbleGum Sans", fill: "#763303", align: "center", wordWrap: true, wordWrapWidth:500});
		descriptionText = new Phaser.Text(this.game, 150, 250, this.disasters[name].description,
			{ font: "20px Open Sans", fill: "#763303", align: "left", wordWrap: true, wordWrapWidth:500});
		resultText = new Phaser.Text(this.game, 150, 350, result,
			{ font: "20px Open Sans", fill: "#763303", align: "left", wordWrap: true, wordWrapWidth:500});
		
		eventGroup.add(nameText);
		eventGroup.add(descriptionText);
		eventGroup.add(resultText);
		this.main.taskbar.lockTaskbar();
		eventGroup.visible = true;
		eventGroup.add(new Phaser.Button(this.game, 500, 420, 'next', hideEventGroup, this));
		return eventGroup;

		function hideEventGroup(button) {
			eventGroup.visible = false;
			this.main.getTaskbar().checkEndConditions();
			this.main.getTaskbar().unlockTaskbar();
		}
	}

}


// var DisasterEvent = function(name, description, probability) {
// 	this.name = name;
// 	this.description = description;
// 	this.probability = probability;
// }

// DisasterEvent.prototype =  {
// 	getProbability: function() {
// 		return this.probability
// 	},
// 	setProbability: function(probability) {
// 		this.probability = probability;
// 	},
// 	getCard: function() {
// 		var rect = new Phaser.Rectangle(100, 100, 800-100*2, 600-100*2);
// 		this.game.debug.geom(rect,'#ffffff');

// 	}
// }