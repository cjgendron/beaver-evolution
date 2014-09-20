function Board(game) {

	this.game = game;
	this.pieces = {};
	this.dams = [];
	this.numPiecesVert = 9;
	this.pieceHeight = this.game.height/(1 + .75 * (this.numPiecesVert - 1));
	this.pieceWidth = Math.sqrt(3)/2.0 * this.pieceHeight;
	this.numPiecesHor = Math.floor((this.game.width/this.pieceWidth) - 0.5);
	console.log(this.pieceWidth);
	createBoard(this);
	this.drawBoard(this.game);

	function createBoard(board) {
		var rowStart = 0;
		for (var y = 0; y < board.numPiecesVert; y++){
			for(var x = rowStart; x < rowStart + board.numPiecesHor; x++){
				board.pieces[[x,y]] = new Piece ("type", board, new HexCoordinate(x, y, board.pieceWidth, board.pieceHeight));
			}
			if (y % 2 == 1) {
				rowStart -= 1;
			}
		}
	};
};

Board.prototype = {

	placeDam : function(piece){
		piece.dam = true;
		if(this.dams.indexOf(piece) == -1) {
			this.dams.push(piece);
		}
	},

	removeDam : function(piece){
		piece.dam = false;
		this.dams.splice(this.dams.indexOf(piece), 1);
	},

	drawBoard : function(game) {
		for (piece in this.pieces) {
			this.pieces[piece].drawPiece(this);
		}
	},

	getDamCount : function(){
		return this.dams.length;
	}
};

function Piece(type, board, hexCoordinate) {
	this.type = type;
	this.game = board.game;
	this.height = hexCoordinate.height;
	this.width = hexCoordinate.width;
	this.hexCoordinate = hexCoordinate;
	this.dam = false;

	this.drawPiece(board);

};

Piece.prototype = {

	drawPiece : function(board) {
		
		var horizontalOffset = (board.game.width - (board.pieceWidth * (board.numPiecesHor + 0.5))) / 2.0;
		this.button = this.game.add.button(this.hexCoordinate.pixelCenter['x'] + horizontalOffset, this.hexCoordinate.pixelCenter['y'], "basic_hex_sprite_water", actionOnclick, this);
		this.button.scale.x = this.width/this.button.width;
		this.button.scale.y = this.height/this.button.height;
		this.button.x -= this.button.width/2;
		this.button.y -= this.button.height/2;

		function actionOnclick(clickedButton) {
		   this.dam = true;
		   this.game.getBoard().placeDam(this);
		   this.button.destroy();
		   this.button = this.game.add.button(this.hexCoordinate.pixelCenter['x'] - this.width/2, this.hexCoordinate.pixelCenter['y'] - this.height/2, "green_brown", actionOnclick, this);
		}
	},

	getCoordinate : function() {
		return hexCoordinate;
	},

	setType : function(){},

	getType : function(){},

	setImage : function(){}
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

	getNeighbors : function() {

	},

	pixelToHexCoordinate : function(x, y){

	}

	};