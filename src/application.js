$(function() {
  var display = new Display();
  var graph = new Graph();

  var sample = [];

  graph.graph[79] = true;
  graph.generateAreas();

  display.drawGraph(graph);
  display.drawNodes(graph);

  $("body").on('click', '#cells rect', function() {
    graph.graph[$(this).index()] = !graph.graph[$(this).index()];
    graph.generateAreas();
    display.drawGraph(graph);
    display.drawNodes(graph);
  })
})

