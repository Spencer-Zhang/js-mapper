function Display() {
  this.drawGraph = function(graph) {
    this.clear();
    var self = this;

    var svg = d3.select("body")
      .append("svg")
        .attr("width", 500)
        .attr("height", 500)
        .attr("id", "canvas")
      .append("g")
        .attr("id", "cells");

    var cells = d3.select("#cells").selectAll("rect")
        .data(graph.graph)
        .enter()
      .append("rect")
        .attr("class", "cell")
        .attr("width", 500/graph.width)
        .attr("height", 500/graph.height)
        .attr("x", function(d, i) { return 500/graph.width*(i%graph.width) })
        .attr("y", function(d, i) { return 500/graph.height*Math.floor(i/graph.width) })
        .attr('stroke', 'gray')
        .attr('stroke-width', '1')
        .attr('fill', function(d, i) { return getCellColor(graph, i); });
  }

  this.clear = function() {
    $('body').text('');
  }

  function getCellColor(graph, i) {
    var cellType = graph.getCellType(i);
    if(cellType === "wall")        {return "black"};
    if(cellType === "area")        {return "red"};
    if(cellType === "connection")  {return "blue"};
    if(cellType === "blank")       {return "white"};
  }
}
