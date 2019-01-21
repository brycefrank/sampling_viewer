// Simulates a population of random variables
var ndarray = require('ndarray');
var gemm = require('ndarray-gemm');
var cholesky = require('ndarray-cholesky-factorization');
var pool = require('ndarray-scratch');

function randn_bm() {
    var u = 0, v = 0;
    while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while(v === 0) v = Math.random();
    return Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
}

function rnorm(mu, sigma) {
    return randn_bm() * sigma + mu
}

function n_rnorm(n) {
    const pop = [];
    for (var i = 0; i < n; i++) {
        pop.push(rnorm(0, 1))
    }

    return ndarray(pop, [n, 1]);
}

function euc_dist(x1, y1, x2,  y2) {
    return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2) )
}

function dist_matrix(height, width) {
    const dist_vec = [];
    for (var y1 = 0; y1 < height; y1 ++) {
        for (var x1 = 0; x1 < width; x1++) {
            for (var y2= 0; y2 < height; y2++){
                for(var x2 = 0; x2 < width; x2++){
                    // TODO would manhattan distance save stack space?
                    dist_vec.push((euc_dist(x1, y1, x2, y2)));
                }
            }
        }
    }

    return ndarray(new Float64Array(dist_vec), [height * width, height * width]);
}

function inverse_dist_matrix(dist_matrix, c=0) {
    for (var i = 0; i < dist_matrix.shape[0]; i++){
        for (var j = 0; j < dist_matrix.shape[1]; j++) {
            if (i != j) {
                dist_matrix.set(i, j, 1 / dist_matrix.get(i, j))
            }
            else {
                // TODO The Cholesky decomposition needs a small constant, this should go away when I use covariance
                dist_matrix.set(i, j, 1 + c)
            }
        }
    }
    return dist_matrix
}

export function sim_x(height, width) {
    var N = height * width;
    var z = n_rnorm(N);

    // Cholesky decomposition
    var inverse_dist = inverse_dist_matrix(dist_matrix(height, width), 0.7);
    var B = pool.zeros([N, N]);
    cholesky(inverse_dist, B);

    var x = pool.zeros([N, 1]);
    gemm(x, B, z);

    // Round to nearest tenth
    for (var i = 0; i < x.shape[0]; i ++) {
        x.set(i, 0, Math.round(x.get(i, 0) * 100) / 100);
    }

    return(x)
}
