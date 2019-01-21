// Constructs the dialogue box below the grid
import * as d3 from 'd3';


function parse_text () {
    // Parses the dialogue file into JSON
}

d3.text('assets/dialogue.txt').then(function(text) {
    console.log(text[0])
});

//var dialogue_box = d3.select('body')
//    .append('p')
//    .text(contents["0"]);
