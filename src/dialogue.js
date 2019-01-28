// Constructs the dialogue box below the grid
import * as d3 from 'd3';

var dialogue_box = d3.select('body')
    .append('div')
    .style('width', d3.select("#gridBody").attr('width')+'px')
    .style('height', '150px')
    .append('p');

var backward = d3.select("body").append("button")
    .text("Backward");
var forward = d3.select("body").append("button")
    .text("Forward");

d3.csv('data/introduction.txt')
    .then(function (content) {
        doStuff(content);
    });

function update_text(text) {
    var j = 0;
    var text_progression = d3.interval(function (elapsed){
        if (j > text.length) {
            text_progression.stop();
            return;
        }

        j+=5;
        var display_string = text.substring(0, j);
        dialogue_box.text(display_string);

    }, 1)
}

// TODO put these in a separate script
function highlight_grid(condition) {
    var grid = d3.select('#gridBody');
    if (condition == true) {
        grid
            .append('rect')
            .attr('x', 2)
            .attr('y', 2)
            .attr('width', grid.attr('width') - 2)
            .attr('height', grid.attr('height') - 2)
            .attr('fill-opacity', 0)
            .attr('stroke', 'red')
            .attr('stroke-width', 3)
    } else {
        grid.select()
    }

}

function handle_event(event){
    // Parses and evaluates string function from dialogue csv
    eval(event);
}

function doStuff(content) {
    var i = 0;
    dialogue_box.text(content[i].Text);

    // Load current text into dialgoue_box
    forward.on("click", function() {i++; update_text(content[i].Text); eval(content[i].Event)});
    backward.on("click", function(){i--; update_text(content[i].Text); eval(content[i].Event)});
}

