import { popGrid } from './pop_grid';
import * as d3 from 'd3';
import {sim_x} from "./popsim";

var generateData = function(splice) {
   var colors = d3.scaleOrdinal(d3.schemeCategory10),
       arr = [],
       i;

   for (i = 1; i <= 5; i++) {
      arr.push({
         id: i,
         value: 5 + Math.random() * 15,
         color: colors(i)
      });
   }
   if (splice) {
      arr.sort(function() {return 0.5 - Math.random();})
          .splice(0, Math.random() * 5);
   }
   return arr;
};

document.addEventListener('DOMContentLoaded', function () {
   var grid,
       events;
   
   function build() {
      grid = popGrid()
          .num_cells_x(10)
          .num_cells_y(10)
          .cell_width(30)
   }
   
   function addToDom() {
      d3.select('#grid1')
          .datum(sim_x(grid.num_cells_x(), grid.num_cells_y(), 100, 5))
          .call(grid);
   }

   function addListeners() {
   }

   events = {
   };


   build();
   addToDom();
   addListeners();
});