// you can just require this by doing:
//
// var generator = require('./tileGenerator')
//
// then use my 2 methods by doing:
//
// generator.generate9Tiles() or generator.solveTiles(*give array*)

module.exports = (function (){
  return {
    createAllTiles: createAllTiles,
    generate9Tiles: generate9Tiles,
    solveTiles: solveTiles
  }
})()

function createAllTiles(){
  var shapeColours = ['blue', 'red', 'yellow', 'green'];
  var shapes = ['square', 'circle', 'triangle', 'diamond'];
  var backgroundColours = 
    ['blue-light', 'red-light', 'yellow-light', 'green-light'];
  var tiles = [];

  for (var i = shapeColours.length - 1; i >= 0; i--) {
    for (var j = shapes.length - 1; j >= 0; j--) {
      for (var k = backgroundColours.length - 1; k >= 0; k--) {
        tiles.push({shape: shapes[j], backgroundColor: backgroundColours[k], shapeColor: shapeColours[i]});
      };
    };
  };

  return tiles;
}

function generate9Tiles(){
  var randomTiles = []
  var tiles = createAllTiles()
  shuffle(tiles)
  var count = 0;
  for (var i = 4 - 1; i >= 0; i--) {
    for (var j = 4 - 1; j >= 0; j--) {
      var rTile = tiles.pop()
      rTile.x = i
      rTile.y = j
      rTile.id = count
      count++
      randomTiles.push(rTile)
    }
  }
  return randomTiles;
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

function solveTiles(tiles){
  var answers = []
  for (var i = 0; i < 14; i++){
    for(var j = i+1; j < 15; j++){
      for(var k = j+1; k < 16; k++){
        if(
          (( tiles[i].shape === tiles[j].shape &&
              tiles[i].shape === tiles[k].shape ) ||
            ( tiles[i].shape !== tiles[j].shape &&
              tiles[i].shape !== tiles[k].shape &&
              tiles[j].shape !== tiles[k].shape )) &&
          (( tiles[i].backgroundColor === tiles[j].backgroundColor &&
              tiles[i].backgroundColor === tiles[k].backgroundColor ) ||
            ( tiles[i].backgroundColor !== tiles[j].backgroundColor &&
              tiles[i].backgroundColor !== tiles[k].backgroundColor &&
              tiles[j].backgroundColor !== tiles[k].backgroundColor )) &&
          (( tiles[i].shapeColor === tiles[j].shapeColor &&
              tiles[i].shapeColor === tiles[k].shapeColor ) ||
            ( tiles[i].shapeColor !== tiles[j].shapeColor &&
              tiles[i].shapeColor !== tiles[k].shapeColor &&
              tiles[j].shapeColor !== tiles[k].shapeColor ))
          ){
          answers.push([tiles[i], tiles[j], tiles[k]]);
        }
      }
    }
  }
  for (var i = answers.length - 1; i >= 0; i--) {
    answers[i].sort(function (a,b){
      return a.id-b.id;
    })
  };
  return answers
}

// TESTS
//
// var selectedTiles = generate9Tiles()
// console.log(selectedTiles)
// var answerTiles = solveTiles(selectedTiles)
// console.log(answerTiles)
