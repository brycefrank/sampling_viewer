// Samples from the grid.
import { N } from './popinfo';
import { grid } from './grid';
import * as d3 from 'd3';


function random_int(Max) {
    return Math.floor(Math.random() * Math.floor(Max))
}


function srswr_indices(n, N){
    // Generates simple random sampling indices (with replacement)
    var srs_wr = [];
    for (var i = 0; i < n; i ++){
        srs_wr[i] = random_int(N);
    }

    return srs_wr;
}


function select_sample(indices) {
    // Selects the sample from the collection of grid cells
    // for now this marks the sample as white
    console.log(indices.includes(1));
    console.log(indices);
    d3.selectAll('rect')
        .attr('stroke', 'white')
        .filter(function (d, i) {
            return indices.includes(i)
        })
        .attr('stroke', 'red')
}




var button = d3.select("body").append("button")
    .text("button")
    .on("click", function() {select_sample(srswr_indices(30, N))});

