var fs = require('fs'),
	readline = require('readline'),
	util = require('util'),
	prompt = require('prompt'),
	stream = require('stream');

var wordsPath,
	gridPath,
	words,
	grid,
	dirtyGrid,
	foundWords = [];

var initialize = function(){
	prompt.message = "NodeWords";
	prompt.start();
  	prompt.get({
		properties: {
  			path: {
   	 			description: "What is the path to the Words list?"
  			}
		}
	}, function (err, result) {
		wordsPath = result.path;
		openWords(result.path);
	});
}

var openWords = function(path){
	var wordsStream = fs.readFile(path, { encoding: 'utf8' }, function(err, data){
		words = data.split('\n');
		prompt.start();
  		prompt.get({
			properties: {
  				grid: {
   	 				description: "Paste your Grid here."
  				}
			}
		}, function (err, result) {
			grid = result.grid;
			parseGrid(grid);
		});
	});
}

var parseGrid = function(grid){
	var array = JSON.parse(grid);
	var i = 0;
	for(i;i<array.length;i++){
		array[i] = array[i].split('');
	}
	grid = array;
	startCursor(grid)
}

var startCursor = function(grid){
	var currentWordArray = [];
	dirtyGrid = grid;
	var position = [0,0];

	//Check first letter
	
	currentWordArray.push(getLetter(position, dirtyGrid));



	
}

var getLetter = function(position, dirtyGrid){
	var x = position[0];
	var y = position[1];
	var letter = dirtyGrid[y][x];
	return letter;
}



var checkForWord = function(word){
	var i;
	var newWord = word.split('');
	for(i = 0; i<words.length; i++){
		//Loop through all the words in the list
		var j;
		for(j = 0; j<words[i].length; j++){
			// Loop through all the letters in the word in the list
			
			if(newWord[j] == words[i][j]){
				//If our grid word has the same letter in same position, then continue
				if(word == words[i]){
					// Push the word to found array
					foundWords.push(word);
					return true;
				}
			} else {
				//if not, return false and try the next word
				break;
			}
		}
	}

}

// ["yzwl", "zsmh", "khpi", "btnl"]


initialize();