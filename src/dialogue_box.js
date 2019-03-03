import * as d3 from 'd3';

export function dialogueBox() {
    var local = {
        // back/forward are kept here instead of app because of the async csv call
        i: 0,
        backward: d3.select('#backwardButton1'),
        forward: d3.select('#forwardButton1')
    };


    function dialoguebox(group) {
        group.each(render)
    }

    function render(data) {
        d3.select('#dialogueBox1')
            .append('p')
    }

    function dataAccess(key) {{
        return function(d) {
            return o[key](d.data);
        };
    }}

    // Initialize csv
    d3.csv('data/introduction.txt')
        .then(function (content) {
            handle_csv(content);
        });

    function handle_csv(content) {
        var i = 0;
        local.forward.on("click", function() {
            i++;
            dialoguebox.update_text(content[i].Text);
            eval(content[i].Event)});
        local.backward.on("click", function() {
            i--; dialoguebox.update_text(content[i].Text);
            eval(content[i].Event)});
    }

    /**
     *  Populates the dialogue box with text.
     */
    dialoguebox.update_text = function(text) {
        var j = 0;
        var text_progression = d3.interval(function (elapsed) {
            if (j > text.length) {
                text_progression.stop();
                return;
            }

            j+=5;
            var display_string = text.substring(0, j);
            d3.select('#dialogueBox1')
                .text(display_string);

        }, 1)
    };

    return dialoguebox;
}

