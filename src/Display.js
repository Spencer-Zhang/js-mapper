function Display() {
  this.drawGraph = function(graph) {
    this.clear();

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
        .attr("width", 50)
        .attr("height", 50)
        .attr("x", function(d, i) { return 50*(i%10) })
        .attr("y", function(d, i) { return 50*Math.floor(i/10) })
        .attr('stroke', 'gray')
        .attr('stroke-width', '1')
        .attr('fill', graph.getCellColor);
  }

  this.clear = function() {
    $('body').text('');
  }
}
