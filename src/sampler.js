// Samples from the grid.
import { N} from './popinfo';
import { grid, color_scale } from './grid';
import * as d3 from 'd3';

function random_int(Max) {
    return Math.floor(Math.random() * Math.floor(Max))
}

// Set up basic histogram figure
var margin = {top: 20, right: 20, bottom: 70, left: 40},
    width = 300, height = 300;

var hist_fig = d3.select('body')
    .append('svg')
    .attr('width', width)
    .attr('height', width)
    .append('g');
    //.attr('transform', "translate(" + margin.left + "," + margin.top + ")");

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
    d3.selectAll('rect')
        .attr('stroke', 'white')
        .attr('stroke-width', 2)
        .filter(function (d, i) {
            if (indices.includes(i)){
                sample_values.push(d);
                return indices.includes(i)
            }
        })
        .attr('stroke', 'black')
        .attr('stroke-width', 2)
}


// TODO handle axes labels
var mean_values = [];
function update_histogram(sample) {
    var mean = d3.mean(sample);
    mean_values.push(mean);

    var x = d3.scaleLinear()
        .domain(d3.extent(mean_values)).nice()
        .range([0, width]);

    var hist = d3.histogram()
        .domain(x.domain())
        .thresholds(x.ticks(20))(mean_values);

    var y = d3.scaleLinear()
        .domain([0, d3.max(hist, function (d) {
            return d.length })]).nice()
        .range([height, 0]);

    // First, delete any existing bars
    hist_fig.selectAll('rect')
        .remove();

    hist_fig
        .selectAll('rect')
        .data(hist)
        .enter().append('rect')
        .attr('x', function (d) { return x(d.x0) + 1})
        .attr('width', function (d) { return d3.max([0, x(d.x1) - x(d.x0) - 1])})
        .attr('y', function (d) {return y(d.length)})
        .attr('height', function (d) {
            return y(0) - y(d.length)})
        .attr('fill', function (d) {return color_scale(d.x0)});
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function iterate(n) {
    for (var i = 0; i < n; i ++) {
        sample_values = [];
        select_sample(srswr_indices(4, N));
        update_histogram(sample_values);
        await sleep(100);
    }
}

var button = d3.select("body").append("button")
    .text("button")
    .on("click", function() {iterate(100)});
