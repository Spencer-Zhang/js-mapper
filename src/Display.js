function Display() {
  this.drawGraph = function(graph) {
    this.clear();
    var self = this;

    var svg = d3.select("body")
      .append("svg")
        .attr("width", 500)
        .attr("height", 500)
        .attr("id", "canvas")

    svg.append("g")
        .attr("id", "cells");

    var nodes = svg.append("g")
      .attr("id", "nodes");

    var paths = svg.append("g")
      .attr("id", "paths");

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

  this.drawNodes = function(graph) {
    d3.select('#nodes').selectAll('circle')
    .data(graph.nodes).enter()
    .append("circle")
      .attr("cx", function(d, i) { return (500/graph.width) * d.area.center()[0] })
      .attr("cy", function(d, i) { return (500/graph.height) * d.area.center()[1] })
      .attr("r", 5)
      .attr("fill", "yellow");


    d3.select('#paths').selectAll('line')
    .data(graph.getLinks()).enter()
    .append("line")
      .attr("x1", function(d, i) { return (500/graph.width) * d[0].center()[0] })
      .attr("y1", function(d, i) { return (500/graph.height) * d[0].center()[1] })
      .attr("x2", function(d, i) { return (500/graph.width) * d[1].center()[0] })
      .attr("y2", function(d, i) { return (500/graph.height) * d[1].center()[1] })
      .attr("stroke", "white")
      .attr("stroke-width", "1");
  }

  this.clear = function() {
    $('body').text('');
  }

  function getCellColor(graph, i) {
    var cellType = graph.getCellType(i);
    if(cellType === "wall")        {return "black"};
    if(cellType === "area")        {return "blue"};
    if(cellType === "connection")  {return "blue"};
    if(cellType === "blank")       {return "white"};
  }
}
