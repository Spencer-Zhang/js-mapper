$(function() {
  var display = new Display();

  $('.cell').click(function() {
    cellIndex = $(this).index();
    display.setColor(cellIndex, "black");
  })
})


function Display() {
  this.setColor = function(cellIndex, color) {
    $('.cell').eq(cellIndex).css("background-color", color);
  }
}