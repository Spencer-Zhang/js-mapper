function Area(x1, y1, x2, y2) {
  this.x1 = x1;
  this.y1 = y1;
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
  this.graph = Array(100);
  this.areas = [];
  this.connections = [];

  var self = this;

  this.getCellColor = function(d, i) {
    if(self.graph[i] === true) { return "black"; }
    for(var areaIndex in self.areas) {
      var area = self.areas[areaIndex];
      if(area.containsCell(i)) { return "red"; }
    }
    for(var areaIndex in self.connections) {
      var area = self.connections[areaIndex];
      if(area.containsCell(i)) { return "blue"; }
    }
    return "white";  
  }
}