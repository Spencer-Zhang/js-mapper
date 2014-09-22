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

  this.getCellType = function(i) {
    var areaIndex, area;
    if(i < 0 && i > 99) { return "wall"; }

    if(self.graph[i] === true) { return "wall"; }
    for(areaIndex in self.connections) {
      area = self.connections[areaIndex];
      if(area.containsCell(i)) { return "connection"; }
    }
    for(areaIndex in self.areas) {
      area = self.areas[areaIndex];
      if(area.containsCell(i)) { return "area"; }
    }
    return "blank";  
  }

  this.generateAreas = function() {
    var i, area, connections
    this.areas = [];
    this.connections = [];

    while(findBlankSpace() !== false) {
      i = findBlankSpace();
      area = findLargestBlankArea(i);
      this.areas.push(area);
      this.connections = this.connections.concat(testForConnections(area));
    }

    console.log(this.connections);
  }

  function findBlankSpace() {
    for(var index = 0; index < 100; index++) {
      if(self.getCellType(index) === "blank") { return index }
    }
    return false;
  }

  function findLargestBlankArea(i) {
    var x1 = i%10;
    var y1 = Math.floor(i/10);
    var x2 = x1 + 1, y2 = y1 + 1;
    var tx, ty;
    var area = new Area(x1, y1, x2, y2)

    while(area.x2 % 10 != 0 && canExtendRight(area)) {
      area.x2 += 1;
    }

    while(area.y2 < 10 && canExtendDown(area)) {
      area.y2 += 1
    }

    return area;
  }

  function canExtendRight(area) {
    for(var ty = area.y1; ty < area.y2; ty++ ) {
      if(self.getCellType(area.x2 + 10*ty) !== "blank") {return false;}
    }
    return true;
  }

  function canExtendDown(area) {
    for(var tx = area.x1; tx < area.x2; tx++ ) {
      if(self.getCellType(tx + 10*area.y2) !== "blank") {return false;}
    }
    return true;
  }

  function testForConnections(area) {
    var testArea;
    var connections = [];
    if(area.x1 > 0) {
      newArea = new Area(area.x1-1, area.y1, area.x1, area.y2)
      if(areaOnlyContains(newArea, "area")) {connections.push(newArea)}
    }
    if(area.x2 < 10) {
      newArea = new Area(area.x2, area.y1, area.x2+1, area.y2)
      if(areaOnlyContains(newArea, "area")) {connections.push(newArea)}
    }
    if(area.y1 > 0) {
      newArea = new Area(area.x1, area.y1-1, area.x2, area.y1)
      if(areaOnlyContains(newArea, "area")) {connections.push(newArea)}
    }
    if(area.y2 < 10) {
      newArea = new Area(area.x1, area.y2, area.x2, area.y2+1)
      if(areaOnlyContains(newArea, "area")) {connections.push(newArea)}
    }
    return connections;
  }

  function areaOnlyContains(area, cellType) {
    for(var i = 0; i < 100; i++) {
      if(area.containsCell(i) && self.getCellType(i) !== cellType) {return false;}
    }
    return true;
  }
}