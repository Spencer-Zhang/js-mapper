$(function() {
  var display = new Display();
  var graph = new Graph();

  graph.areas.push(new Area(0, 0, 3, 3));
  graph.connections.push(new Area(3, 3, 6, 6));
})





function Area(x1, y1, x2, y2) {
  this.x1 = x1;
  this.y1 = y2;
  this.x2 = x2;
  this.y2 = y2;

  this.center = function() {
    return [(this.x1 + this.x2) / 2, (this.y1 + this.y2) / 2];
  }

  this.containsCell = function(cellIndex) {
    var x, y;
    cellX = cellIndex % 10;
    cellY = Math.floor(cellIndex / 10);

    return (cellX >= this.x1 && 
            cellX < this.x2 && 
            cellY >= this.y1 && 
            cellY < this.y2);
  }
}



function Graph() {
  this.graph = "";
  this.areas = [];
  this.connections = [];
}



function Display() {
  this.drawGraph = function(graph) {

  }

  this.drawNodes = function(graph) {
    markAreas(graph.areas, "red");
    markAreas(graph.connections, "blue");
  }



  // Private

  function markAreas(areas, color) {
    var areaIndex, area;
    for(var areaIndex in graph.areas) {
      var area = graph.areas[areaIndex];

      // create a circle at the center of the area.
    }
  }

  function clear() {
    $('g').text('');
  }
}