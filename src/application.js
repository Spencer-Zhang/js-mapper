$(function() {
  var display = new Display();
  var graph = new Graph();

  var sample = [];

  graph.areas.push(new Area(0, 0, 3, 3));
  graph.connections.push(new Area(3, 3, 6, 6));
  graph.graph[99] = true;

  display.drawGraph(graph);

  $("body").on('click', '#cells rect', function() {
    graph.graph[$(this).index()] = !graph.graph[$(this).index()];
    display.drawGraph(graph);
  })
})

