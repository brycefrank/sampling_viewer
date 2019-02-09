// Handles buttons and figures for sampling (for now)

import * as d3 from 'd3';
import { color_scale } from './grid';
import { select_sample, sampling_designs } from './sampler';
import { N} from './popinfo';


// Set up basic histogram figure
var margin = {top: 20, right: 20, bottom: 20, left: 20},
    width = d3.select("#gridBody").attr('width'),
    height = d3.select("#gridBody").attr('height');

// This is the entire surface the histogram will exist on (including axes, etc.)
var svg = d3.select('body')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

// Reassign width and height to the interior
width = width - margin.left - margin.right;
height = height - margin.top - margin.bottom;

var g = svg
    .append('g') // Append the surface for the histogram bars, this exist inside of svg
    .attr('transform', 'translate(' + margin.left + "," + margin.top + ")");


// TODO generalize to display multiple sampling designs
var mean_values = [];
function update_histogram(sample) {
    // Clear existing bars, x axis
    svg.selectAll('rect')
        .remove();
    g.selectAll('g')
        .remove();

    var mean = d3.mean(sample);
    mean_values.push(mean);

    var x = d3.scaleLinear()
        .domain(d3.extent(mean_values)).nice()
        .range([0, width]);

    g.append('g')
        .attr('transform', 'translate(0,' + height + ")")
        .call(d3.axisBottom(x));

    var hist = d3.histogram()
        .domain(x.domain())
        .thresholds(x.ticks(20))(mean_values);

    var y = d3.scaleLinear()
        .domain([0, d3.max(hist, function (d) {
            return d.length
        })]).nice()
        .range([height, 0]);

    svg
        .selectAll('rect')
        .data(hist)
        .enter().append('rect')
        .attr('x', function (d) {
            return x(d.x0) + 1 + margin.left
        })
        .attr('width', function (d) {
            return d3.max([0, x(d.x1) - x(d.x0) - 1])
        })
        .attr('y', function (d) {
            return y(d.length) + margin.top
        })
        .attr('height', function (d) {
            return y(0) - y(d.length)
        })
        .attr('fill', function (d) {
            return color_scale(d.x0)
        });
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

var stop_condition = false;
async function start_sample(sample_design) {
    while(stop_condition==false){
        var sample_values = select_sample(sampling_designs[sample_design].func(30, N));
        update_histogram(sample_values);
        await sleep(100);
    }
}

function reset_samp_info() {
    d3.selectAll('rect')
        .attr('stroke', 'none');
    svg.selectAll('rect')
        .remove();
    mean_values = [];
}

d3.select("body").append("button")
    .text("Start")
    .on("click", function() {stop_condition=false; start_sample(selectValue);});

d3.select("body").append("button")
    .text("Stop")
    .on("click", function() {stop_condition=true});

d3.select("body").append("button")
    .text("Reset")
    .on("click", function() {reset_samp_info()});

// TODO set up dropdown menu
var selectValue = 'srswr';
d3.select('body').append('select')
    .attr('class', 'select')
    .on('change', function() {
        selectValue = d3.select('select').property('value')
    })
    .selectAll('option')
    .data(Object.keys(sampling_designs))
    .enter().append('option')
    .text(function (d) {
        return d
    });

