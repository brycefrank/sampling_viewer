// Constructs the dialogue box below the grid
import * as d3 from 'd3';


var dialogue_box = d3.select('body')
    .append('p');


d3.select("body").append("button")
    .text("Backward")
    .on("click", function() {});

var forward = d3.select("body").append("button")
    .text("Forward");


d3.csv('data/dialogue.txt')
    .then(function (content) {
        doStuff(content);
    });

function update_text(text) {
    var i = 0;
    d3.interval(function (){
        i++;
        var display_string = text.substring(0, i);
        dialogue_box.text(display_string);
    }, 100)
}

function doStuff(content) {
    var i = 0;
    // Load intro phase into dialgoue_box
    dialogue_box.text(content[i].Text);
    forward.on("click", function() {i++; update_text(content[i].Text)});
}

