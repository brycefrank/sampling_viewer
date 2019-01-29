// Samples from the grid.
import { color_scale } from './grid';
import * as d3 from 'd3';

function random_int(Max) {
    return Math.floor(Math.random() * Math.floor(Max))
}

export var sampling_designs = {
    'srswr': {
        'func': srswr,
        'name': 'Simple Random Sampling with Replacement'
    },
    'srswor': {
        'func': srswor,
        'name': 'Simple Random Sampling without Replacement'
    }
};

function srswor(n, N) {
    console.log('srswor')
}

function srswr(n, N){
    // Generates simple random sampling indices (with replacement)
    var srs_wr = [];
    for (var i = 0; i < n; i ++){
        srs_wr[i] = random_int(N);
    }

    return srs_wr;
}

/** Selects the sample from the collection of grid cells and highlights selected samples */
export function select_sample(indices, highlight_color = 'black') {
    var sample_values = [];

    d3.selectAll('rect')
        .attr('stroke', 'none')
        .filter(function (d, i) {
            if (indices.includes(i)){
                sample_values.push(d);
                return indices.includes(i)
            }
        })
        .attr('stroke', highlight_color)
        .attr('stroke-width', 2);

    return sample_values
}

