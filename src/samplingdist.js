// Handles buttons and figures for sampling (for now)
import * as d3 from 'd3';

/**
* A histogram that displays the sampling distribution and population paramater
*/
export function samplingDist() {
    var o = {
        // TODO should be set relative to grid somehow
        margin: {top: 20, right: 20, bottom: 20,left: 20},
        width: 400,
        height: 400
    };

    function samplingdist(group) {
        group.each(render)
    }

    function render(data) {
        // Flatten array to 1d
        var flat = [];
        for (var i = 0; i < data.length; i ++ ) {
            for (var j = 0; j < data[i].length; j ++ ){
                flat.push(data[i][j])
            }
        }

        data = flat;

        var color_scale = d3.scaleSequential().domain([d3.min(data), d3.max(data)]).interpolator(d3.interpolateViridis);

        var svg = d3.select('#samplingDist1')
            .append('svg')
            .attr('width', o.width)
            .attr('height', o.height);

        // Reassign width and height to the interior
        o.width = o.width - o.margin.left - o.margin.right;
        o.height = o.height - o.margin.top - o.margin.bottom;

        var g = svg
            .append('g')
            .attr('transform', 'translate(' + o.margin.left + "," + o.margin.top + ")");

        var x = d3.scaleLinear()
            .domain([0, 25000]).nice()
            .range([0, o.width]);

        g.append('g')
            .attr('transform', 'translate(0,' + o.height + ")")
            .call(d3.axisBottom(x));

        var hist = d3.histogram()
            .domain(x.domain())
            .thresholds(x.ticks(20))(data);

        var y = d3.scaleLinear()
            .domain([0, d3.max(hist, function(d) { return d.length})]).nice()
            .range([o.height, 0]);

        svg
            .selectAll('rect')
            .data(hist)
            .enter().append('rect')
            .attr('x', function (d) {
                return x(d.x0) + 1 + o.margin.left
            })
            .attr('width', function (d) {
                return d3.max([0, x(d.x1) - x(d.x0) - 1])
            })
            .attr('y', function (d) {
                return y(d.length) + o.margin.top
            })
            .attr('fill', function (d) {
                return color_scale(d.x0)
            })
            .attr('height', function (d) {
                return y(0) - y(d.length)
            })
    }

    // TODO for now this is separate from popgrid.add_up_total, but might not need to be so...
    samplingdist.add_up_total = function() {
        var total = 0;

        d3.select('#grid1')
            .select('rect')
            .each(function(d) {
                d.forEach(function(d_i) { total += parseInt(d_i) })
            });
    };



    return samplingdist;
}
