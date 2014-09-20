function disaster_screen(game) {
	this.game = game;
	this.disasters = {Poacher: 0.05, Pollution: 0.1, Lumberjack: 0.15, Forest Fire: 0.2, Flash Flood: 0.2, Drought: 0.15, Famine: 0.1, Tornado: 0.05};

};

disaster_screen.prototype = {
	create: function() {
		console.log("creating");
	},
	update: function() {

	}
}