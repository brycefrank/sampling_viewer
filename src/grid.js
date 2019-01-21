import { sim_x } from './popsim';
import * as d3 from 'd3';

// Grid dimensions
var grid_height = 12;
var grid_width = 12;
var cell_size = 32;
var cells = sim_x(grid_height, grid_width);

// Cell coloring
var color_scale = d3.scaleSequential().domain([-3, 3]).interpolator(d3.interpolateViridis);


function ndarray_to_array(nda) {
    var arr = [];
    var k = 0;
    for (var i = 0; i < grid_height; i ++) {
        arr.push([]);
        for (var j = 0; j < grid_width; j ++) {
            arr[i].push(cells.get(k, 0));
            k += 1;
        }
    }
    return arr
}

cells = ndarray_to_array(cells);

var svg = d3.select("body")
    .append("svg")
    .attr("width", cell_size * grid_width)
    .attr("height", cell_size * grid_height);

// Tooltip
var div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);


var j = -1;
svg.selectAll("rect")
    .data(cells)
    .enter()
    .selectAll("rect") // these
    .data( function(d) { return d; } ) //lines
    .enter() //text displays normally
    .append("rect")
    //.text( function(d) { return d; } )
    .attr("y", function(d, i) { if (i == 0) { j ++}; return (j % grid_width) * cell_size; })
    .attr("x", function(d, i) { return (i % grid_height) * cell_size; })
    .attr('fill', function (d) { return color_scale(d)})
    .attr('width', cell_size)
    .attr('height', cell_size)
    .attr("stroke", "white")
    .on("mouseover", function (d) {
        div.transition()
            .duration(200)
            .style("opacity", 0.9);
        div .html(d)
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY - 28) + "px")
    })
;


