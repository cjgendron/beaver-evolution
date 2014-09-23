function Board(main, group) {
	this.main = main;
	this.game = main.game;
	this.group = group;
	this.pieces = {};
	this.dams = [];
	this.numPiecesVert = 9;
	this.pieceHeight = (this.game.height - 60)/(1 + .75 * (this.numPiecesVert - 1)); //subtract the height of the taskbar
	this.pieceWidth = Math.sqrt(3)/2.0 * this.pieceHeight;
	this.numPiecesHor = Math.floor((this.game.width/this.pieceWidth) - 0.5);
	this.canPopulate = true;
	this.canBuild = true;
	this.createBoard();
	this.drawBoard();
};

Board.prototype = {
	createBoard: function() {
		var rowStart = 0;
		for (var y = 0; y < this.numPiecesVert; y++){
			for(var x = rowStart; x < rowStart + this.numPiecesHor; x++){
				this.pieces[[x,y]] = new Piece (null, this, new HexCoordinate(x, y, this.pieceWidth, this.pieceHeight));
			}
			if (y % 2 == 1) {
				rowStart -= 1;
			}
		}
	},
	show: function() {
		this.group.visible = true;
	},
	hide: function() {
		this.group.visible = false;
	},
	next: function() {
		this.hide();
		this.main.evolutionCard.show();
	},
	placeDam : function(piece){
		//piece.dam = true;
		if(this.dams.indexOf(piece) == -1) {
			this.dams.push(piece);
		}
		//this.next();
	},

	removeDam : function(piece){
		//piece.dam = false;
		this.dams.splice(this.dams.indexOf(piece), 1);
	},

	drawBoard : function() {
		for (piece in this.pieces) {
			this.pieces[piece].drawPiece();
		}
	},

	getDamCount : function(){
		return this.dams.length;
	},

	getDamsOfType: function(type) {
		var damsOfType = [];
		for (piece in this.dams) {
			if (this.dams[piece].type == "land") {
				damsOfType.push(this.dams[piece]);
			}
		}
		return damsOfType;
	},

	unlockForBuilding: function(){
		for (piece in this.dams) {
	    	var neighbors = this.dams[piece].getNeighbors();
		    for (neighbor in this.dams[piece].getNeighbors()){
			    if (neighbors[neighbor].getType() != "dam"){
			        neighbors[neighbor].unlockPiece();	
			    }
		    }
		}
	},

	lockAllPieces: function(){
		for (piece in this.dams) {
			this.dams[piece].lockPiece();
		}
	}
	
};

function Piece(type, board, hexCoordinate) {
	this.LAND;
	this.WATER;
	this.type = type || (Math.random() < 0.2 ? "dam" : (Math.random() < 0.5 ? "water" : "land"));
	this.board = board;
	if (this.type == "dam"){
		this.board.placeDam(this);	
	}
	this.game = board.game;
	this.height = hexCoordinate.height;
	this.width = hexCoordinate.width;
	this.hexCoordinate = hexCoordinate;
	this.dam = false;
	this.locked = true;
	this.button;
};

Piece.prototype = {

	drawPiece : function() {
		if (this.button != null) {
			this.button.destroy();
		}
		
		var horizontalOffset = (this.board.game.width - (this.width * (this.board.numPiecesHor + 0.5))) / 2.0;

		this.button = this.board.group.add(new Phaser.Button(this.board.game, this.hexCoordinate.pixelCenter['x'] + horizontalOffset, 
			this.hexCoordinate.pixelCenter['y'], 
			this.dam ? "dam": this.type));
		this.button.inputEnabled = true;
		this.button.events.onInputDown.add(actionOnClick, this);
		this.button.scale.x = this.width/this.button.width;
		this.button.scale.y = this.height/this.button.height;
		this.button.x -= this.button.width/2;
		this.button.y -= this.button.height/2;

		function actionOnClick(clickedButton) {
		    if (!this.locked){
			   	this.dam = !this.dam;
			   	this.dam ? this.board.placeDam(this) : this.board.removeDam(this);
			   	this.drawPiece();
		    }
		}
	},

	getCoordinate : function() {
		return hexCoordinate;
	},

	setType : function(){},

	getType : function(){},

	setImage : function(){},

	lockPiece: function(){
	    this.locked = true;
	},

	unlockPiece: function(){
	    this.locked = false;
	},

	getNeighbors : function() {
		var neighbors = [];
		neighborDirections = [
		   [+1,  0], [+1, -1], [ 0, -1],
		   [-1,  0], [-1, +1], [ 0, +1]
		];
		for (direction in neighborDirections){
			var possibleNeighbor = this.board.pieces[[neighborDirections[direction][0] + this.hexCoordinate.xHex, 
            	neighborDirections[direction][1] + this.hexCoordinate.yHex]];
            if (possibleNeighbor){
            	neighbors.push(possibleNeighbor);
            }
		}
		return neighbors;

	}
};

function HexCoordinate(xHex, yHex, pieceWidth, pieceHeight) {
	this.xHex = xHex;
	this.yHex = yHex;
	this.width = pieceWidth;
	this.height = pieceHeight;
	this.pixelCenter = hexToPixelCoordinate(this, pieceWidth, pieceHeight);

	function hexToPixelCoordinate(hexCoordinate, pieceWidth, pieceHeight) {
		var centerX = (hexCoordinate.yHex % 2 == 0) ? 
			pieceWidth * (hexCoordinate.xHex + Math.floor(hexCoordinate.yHex/2) + 0.5) : 
			pieceWidth * (hexCoordinate.xHex + Math.floor(hexCoordinate.yHex/2) + 1);
		var centerY = (0.5 + 0.75  * hexCoordinate.yHex) * pieceHeight;
		return {'x' : centerX, 'y' : centerY};
	}

};

HexCoordinate.prototype = {

	isTouching : function(otherHexCoordinate){

	},

	pixelToHexCoordinate : function(x, y){

	}

};
