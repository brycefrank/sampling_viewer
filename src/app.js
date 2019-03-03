import { popGrid } from './pop_grid';
import { dialogueBox } from "./dialogue_box";
import {sim_x} from "./popsim";
import { sampling_designs, select_sample } from "./sampler";
import * as d3 from 'd3';

document.addEventListener('DOMContentLoaded', function () {
   var popgrid,
       dialoguebox,
       N,
       events;
   
   function build() {
      popgrid = popGrid()
          .num_cells_x(20)
          .num_cells_y(20)
          .cell_width(30);

      dialoguebox = dialogueBox();
      N = popgrid.num_cells_x() * popgrid.num_cells_y()
   }
   
   function addToDom() {
      d3.select('#grid1')
          .datum(sim_x(popgrid.num_cells_x(), popgrid.num_cells_y(), 100, 80))
          .call(popgrid);
      d3.select('#dialogueBox1')
          .call(dialoguebox);
   }

   function addListeners() {
      d3.select('#sampleButton1').on('click', events.start_sample);
      d3.select('#forwardButton1').on('click', events.next_text);
      //d3.select('#forwardButton1').on('click', events.previous_text);
   }

   events = {
      start_sample: function() {
         popgrid.add_up_total();
      }
   };

   build();
   addToDom();
   addListeners();
});