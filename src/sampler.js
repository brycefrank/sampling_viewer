// Samples from the grid.
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
    },
    'sys': {
        'func': sys,
        'name': 'Systematic Sampling with Random Start'
    }
};

function srswor(n, N) {
    var srs_ix = [];

    var i = 0;
    while (i < n){
        var ix = random_int(N);
        if (!(srs_ix.includes(ix))) {
            srs_ix[i] = ix;
            i += 1;
        }
    }

    return srs_ix;
}

/** Generates simple random sampling indices (with replacement) */
function srswr(n, N) {
    var srs_ix = [];
    for (var i = 0; i < n; i ++){
        srs_ix[i] = random_int(N);
    }

    return srs_ix;
}

function sys(n, N) {
    var k = Math.round(N / n);
    console.log(k);
    var random_start = random_int(k);


    var sys_ix = [random_start];

    var i = 1;
    while (i < n) {
        sys_ix[i] = sys_ix[i-1] + k;
        i += 1;
    }


    return sys_ix;


}

/** Selects the sample from the collection of grid cells and highlights selected samples */
// TODO move responsibility of highlighting to pop_grid
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

