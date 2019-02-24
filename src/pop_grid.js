import * as d3 from 'd3';

export function popGrid () {
    var o = {
        num_cells_x: 10,
        num_cells_y: 10,
        cell_width: 10,
        between: 2,
        buffer: 3
    };

    var local = {
        label: d3.local(),
        dimensions: d3.local()
    };

    function grid(group) {
        group.each(render)
        
    }
    
    function render(data) {
        var context,
            color_scale,
            gridBody;

        if (!data) {return;}
        context = d3.select(this);

        // Calculate color scale
        color_scale = d3.scaleSequential().domain([d3.min(data, function(a) {return d3.min(a) - 10}),
            d3.max(data, function(a) {return d3.max(a)})]).interpolator(d3.interpolateViridis);

        gridBody = d3.selectAll('#grid1')
            .append('svg')
            .attr('width', o.cell_width * o.num_cells_x)
            .attr('height', o.cell_width * o.num_cells_y);

        var j = -1;
        gridBody
            .selectAll('rect')
            .data(data)
            .enter()
            .append('rect')
            //.attr("y", function(d, i) { if (i == 0) { j ++}; return (j % grid_width) * cell_size + grid_buffer; })
            .attr("y", function(d, i) { if ((i / o.num_cells_x) % 1 == 0) { j ++} return (j % o.num_cells_x) * o.cell_width + o.buffer; })
            .attr("x", function(d, i) { return i % o.num_cells_y * o.cell_width + o.buffer;})
            .attr('fill', function (d) { return color_scale(d)})
            .attr('width', o.cell_width - o.between)
            .attr('height', o.cell_width - o.between)
    }

    function dataAccess(key) {
        return function(d) {
            return o[key](d.data);
        };
    }

    function getDimensions(context) {
        var thisDimensions = local.dimensions.get(context.node()) || {},
            width = thisDimensions.width || context.node().getBoundingClientRect().width,
            height = thisDimensions.height || context.node().getBoundingClientRect().height,
            outerRadius = Math.min(width, height) / 2,
            innerRadius = outerRadius * (1 - o.thickness);

        return {
            width: width,
            height: height,
            outerRadius: outerRadius,
            innerRadius: innerRadius
        };
    }

    // Getters and Setters
    grid.num_cells_x = function(_) {
        if (!arguments.length) {return o.num_cells_x;}
        o.num_cells_x = _;
        return grid;
    };

    grid.num_cells_y = function(_) {
        if (!arguments.length) {return o.num_cells_y;}
        o.num_cells_y = _;
        return grid;
    };


    grid.cell_width = function(_) {
        if (!arguments.length) {return o.cell_width;}
        o.cell_width = _;
        return grid;
    };

    grid.dimensions = function(context, _) {
        var returnArray;
        if (typeof _ === 'undefined' ) {
            returnArray = context.nodes()
                .map(function (node) {return local.dimensions.get(node);});
            return context._groups[0] instanceof NodeList ? returnArray : returnArray[0];
        }
        context.each(function() {local.dimensions.set(this, _);});
        return grid;
    };

    grid.label = function(context, _) {
        var returnArray;
        if (typeof _ === 'undefined' ) {
            returnArray = context.nodes()
                .map(function (node) {return local.label.get(node);});
            return context._groups[0] instanceof NodeList ? returnArray : returnArray[0];
        }
        context.each(function() {local.label.set(this, _);});
        return grid;
    };

    return grid;
}