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
				board.pieces[[x,y]] = new Piece ("type", board.game, new HexCoordinate(x, y, board.pieceWidth, board.pieceHeight), board.pieceHeight, board.pieceWidth);
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
	},

	handleMouseClick : function(event){
		console.log(event);
		//convert into nearest hex
		var xHex = (1/3*sqrt(3) * (event.x - this.pieceWidth/2) - 1/3) * (event.y - this.pieceHeight/2) / (this.pieceHeight/2);
		var yHex = 2/3 * event.y / (this.pieceHeight/2);
		var rxHex = Math.floor(xHex);
		var ryHex = Math.floor(yHex);
		var hexGuess = new HexCoordinate(rxHex,ryHex);
		var distance = (xHex - rxHex)^2 + (yHex-ryHex)^2
		var neighbors = pieceGuess.getNeighbors();
		for (neighbors in neighbor){
			if ((xHex - neighbors[neighbor].hexCoordinate.pixelCenter[x])^2 + (yHex-neighbors[neighbor].hexCoordinate.pixelCenter[y])^2 < distance) {
				distance = (xHex - rxHex)^2 + (yHex-ryHex)^2
				pieceGuess = neighbors[neighbor];
			}
		}
		//pieceGuess now is the clicked piece
		console.log();


	}
};

function Piece(type, game, hexCoordinate, height, width) {
	this.type = type;
	this.game = game;
	this.height = height;
	this.width = width;
	this.hexCoordinate = hexCoordinate;
	this.dam = false;
	this.button = game.add.button(hexCoordinate.pixelCenter['x'] - this.width/2, hexCoordinate.pixelCenter['y'] - this.height/2, "green", actionOnclick, this);

	function actionOnclick(clickedButton) {
	   this.dam = true;
	   game.getBoard().placeDam(this);
	   this.button.destroy();
	   this.button = game.add.button(hexCoordinate.pixelCenter['x'] - this.width/2, hexCoordinate.pixelCenter['y'] - this.height/2, "green_brown", actionOnclick, this);
	}

};

Piece.prototype = {

	drawPiece : function(board) {
		var shape = board.game.add.graphics(0, 0);  //init rect
        shape.lineStyle(2, 0x0000FF, 1); // width, color (0x0000FF), alpha (0 -> 1) // required settings
        shape.beginFill(0xFFFFFF, 1) // color (0xFFFF0B), alpha (0 -> 1) // required settings
		var horizontalOffset = (board.game.width - (board.pieceWidth * (board.numPiecesHor + 0.5))) / 2.0;


		// for (var i = 0; i < 6; i++){
		//     var angle = 2 * Math.PI / 6 * (i + 0.5);
		//     var size = this.hexCoordinate.height / 2.0;
		//     var x_i = this.hexCoordinate.pixelCenter['x'] + size * Math.cos(angle) + horizontalOffset;
		//     var y_i = this.hexCoordinate.pixelCenter['y'] + size * Math.sin(angle);
		//     if (i == 0){
		//         shape.moveTo(x_i, y_i);
		//     }
		//     else {
		//         shape.lineTo(x_i, y_i);
		//     }
		// }
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