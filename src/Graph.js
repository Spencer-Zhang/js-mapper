function Area(x1, y1, x2, y2) {
  this.x1 = x1;
  this.y1 = y1;
  this.x2 = x2;
  this.y2 = y2;

  this.center = function() {
    return [(this.x1 + this.x2) / 2, (this.y1 + this.y2) / 2];
  }

  this.containsCell = function(cellIndex, graph) {
    var x, y;
    cellX = cellIndex % graph.width;
    cellY = Math.floor(cellIndex / graph.width);

    return (cellX >= this.x1 && 
            cellX < this.x2 && 
            cellY >= this.y1 && 
            cellY < this.y2);
  }
}



function Node(area) {
  this.paths = []
  this.area = area;
}



function Graph() {
  this.width = 10;
  this.height = 10;
  this.graph = Array(this.width * this.height);
  this.connections = [];
  this.nodes = [];

  var self = this;

  this.getCellType = function(i) {
    var nodeIndex, area;
    if(i < 0 || i >= self.width*self.height) { return "wall"; }

    if(self.graph[i] === true) { return "wall"; }
    for(areaIndex in self.connections) {
      area = self.connections[areaIndex];
      if(area.containsCell(i, this)) { return "connection"; }
    }
    for(nodeIndex in self.nodes) {
      area = self.nodes[nodeIndex].area;
      if(area.containsCell(i, this)) { return "area"; }
    }
    return "blank";  
  }

  this.getCellNode = function(i) {
    for(node in this.nodes) {
      if(this.nodes[node].area.containsCell(i, this)) { return this.nodes[node]; }
    }
  }

  this.generateAreas = function() {
    var i, area, connections, node
    this.nodes = [];
    this.connections = [];

    while(findBlankSpace() !== false) {
      i = findBlankSpace();
      area = findLargestBlankArea(i);
      node = new Node(area);
      this.nodes.push(node);

      connections = testForConnections(area);
      for(i in connections) {
        connection = connections[i];
        node.paths.push(connection);
        this.getCellNode(connection.x1 + this.width * connection.y1).paths.push(connection);
      }

      this.connections = this.connections.concat(connections);
    }
  }

  this.getLinks = function() {
    var links = [];
    for(i in this.nodes) {
      var node = this.nodes[i];
      for(j in node.paths) {
        var path = node.paths[j];
        links.push([node.area, path])
      }
    }
    return links
  }





  function findBlankSpace() {
    for(var index = 0; index < self.width*self.height; index++) {
      if(self.getCellType(index) === "blank") { return index }
    }
    return false;
  }

  function findLargestBlankArea(i) {
    var x1 = i%self.width;
    var y1 = Math.floor(i/self.width);
    var x2 = x1 + 1, y2 = y1 + 1;
    var tx, ty;
    var area = new Area(x1, y1, x2, y2)

    while(area.x2 % self.width != 0 && canExtendRight(area)) {
      area.x2 += 1;
    }

    while(area.y2 < self.height && canExtendDown(area)) {
      area.y2 += 1
    }

    return area;
  }

  function canExtendRight(area) {
    for(var ty = area.y1; ty < area.y2; ty++ ) {
      if(self.getCellType(area.x2 + self.width*ty) !== "blank") {return false;}
    }
    return true;
  }

  function canExtendDown(area) {
    for(var tx = area.x1; tx < area.x2; tx++ ) {
      if(self.getCellType(tx + self.width*area.y2) !== "blank") {return false;}
    }
    return true;
  }

  function testForConnections(area) {
    var newArea;
    var connections = [];

    var x = area.x1-1
    var y = area.y1

    if(area.x1 > 0) { //Test Left
      connections = connections.concat(findVerticalConnections(area.x1-1, area.y1, area.y2));
    }
    if(area.x2 < self.width) { //Test Right
      connections = connections.concat(findVerticalConnections(area.x2, area.y1, area.y2));
    } 

    if(area.y1 > 0) {
      connections = connections.concat(findHorizontalConnections(area.y1-1, area.x1, area.x2));
    }
    if(area.y2 < self.height) {
      connections = connections.concat(findHorizontalConnections(area.y2, area.x1, area.x2));
    } 
    return connections;
  }

  function findVerticalConnections(x, yTop, yBottom) {
    var connections = [];
    var newArea;
    for(y = yTop; y < yBottom; y++) {
      if(self.getCellType(x + self.width* y) === "area" || self.getCellType(x + self.width* y) === "connection") {
        if(newArea) {newArea.y2 += 1;}
        else { 
          newArea = new Area(x, y, x+1, y+1); 
          connections.push(newArea);
        }
      }
      else { newArea = undefined; }
    }
    return connections
  }

  function findHorizontalConnections(y, xLeft, xRight) {
    var connections = [];
    var newArea;
    for(x = xLeft; x < xRight; x++) {
      if(self.getCellType(x + self.width* y) === "area" || self.getCellType(x + self.width* y) === "connection") {
        if(newArea) {newArea.x2 += 1;}
        else { 
          newArea = new Area(x, y, x+1, y+1); 
          connections.push(newArea);
        }
      }
      else { newArea = undefined; }
    }
    return connections
  }

  function areaOnlyContains(area, cellType) {
    for(var i = 0; i < self.width * self.height; i++) {
      if(area.containsCell(i, self) && self.getCellType(i) !== cellType) {return false;}
    }
    return true;
  }
}