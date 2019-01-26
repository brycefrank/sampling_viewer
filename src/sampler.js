// Samples from the grid.
import { N } from './popinfo';
import { grid } from './grid';
import * as d3 from 'd3';


function random_int(Max) {
    return Math.floor(Math.random() * Math.floor(Max))
}

var test_hist_values = [1,1,1,3,5,6,7,4,3,5,3,2,1];
var hist = d3.histogram()(test_hist_values);

// Set up histogram figure
var width = 300, height = 300;

var x = d3.scaleBand()
    .domain(test_hist_values)
    .range([0, width]);
var y = d3.scaleLinear()
    .domain([0, d3.max(hist, function (d) {
        return(d.length);
    })])
    .range([height, 0]);

var hist_fig = d3.select('body')
    .append('svg')
    .attr('width', width)
    .attr('height', width)
    .append('g');

hist_fig.selectAll('.bar')
    .data(hist)
    .enter().append('rect')
    .attr('class', 'bar')
    .attr('x', function (d) { return(x(d.x0)) })
    .attr('width', x.bandwidth())
    .attr('y', function(d) { return(y(d.length)) })
    .attr('height', function(d) { return height - y(d.length) });

function srswr_indices(n, N){
    // Generates simple random sampling indices (with replacement)
    var srs_wr = [];
    for (var i = 0; i < n; i ++){
        srs_wr[i] = random_int(N);
    }

    return srs_wr;
}

var sample_values = [];
function select_sample(indices) {
    // Selects the sample from the collection of grid cells
    console.log(indices.includes(1));
    console.log(indices);
    d3.selectAll('rect')
        .attr('stroke', 'white')
        .filter(function (d, i) {
            sample_values.push(d);
            return indices.includes(i)
        })
        .attr('stroke', 'black')
        .attr('stroke-width', 4)
}






var button = d3.select("body").append("button")
    .text("button")
    .on("click", function() {sample_values = []; select_sample(srswr_indices(4, N)); console.log(sample_values)});


