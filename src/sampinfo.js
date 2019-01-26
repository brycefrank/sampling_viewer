// Displays information about the sampling distribution
import * as d3 from 'd3';
import { select_sample } from "./sampler";
import { grid } from './grid';

// Replace this with sampled values
var data = [1,2,3, 1, 2, 1, 1, 1, 1, 1, 4, 5, 4];

var hist = d3.histogram()(data);
console.log(hist);
