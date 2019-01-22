import {cells} from './grid';
import * as d3 from 'd3';

// TODO these are design-based centric, is there a way to generalize?
var flattened_cells = [].concat.apply([], cells);
var N = flattened_cells.length

// A very weird way to sum an array
var tau = flattened_cells.reduce(function (a, b) {return a + b }, 0);
var mu = tau / N;

var sigma2 = (Math.hypot(...flattened_cells)**2) / N;
var sigma = Math.sqrt(sigma2);


var pop_data = [tau, mu, sigma2, sigma];

d3.select('body')
    .selectAll('p')
    .data(pop_data)
    .enter()
    .append('p')
    .text(function(d) {return d});
