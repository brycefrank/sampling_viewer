import * as d3 from 'd3';

export function dialogueBox(dimensions) {
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

    // Initialize Chapter 1
    d3.csv('data/chapters.txt')
        .then(function (chapter_list) {
            handle_chapter(chapter_list);
        });

    function handle_chapter(chapter_list, last_length, ch_ix=0, b_ix=0) {
        dialoguebox.update_text(chapter_list[ch_ix].Text, '#chapterTitle1');

        d3.csv('data/'+chapter_list[ch_ix].File).then(function(body_content) {
            // Initialize first slide of chapter
            if (b_ix ==0) {
                dialoguebox.update_text(body_content[b_ix].Text, '#dialogueBody1')
            }

            local.forward.on('click', function() {
                if (b_ix == body_content.length-1) {
                    ch_ix += 1;
                    handle_chapter(chapter_list, body_content.length, ch_ix)
                } else {
                    b_ix +=1;
                    dialoguebox.update_text(body_content[b_ix].Text,'#dialogueBody1')
                }
            });

            local.backward.on('click', function() {
                console.log([ch_ix, b_ix])

                if (b_ix > 0) {
                    b_ix -= 1;
                }

                else if (ch_ix > 0 && b_ix == 0) { // we are at the start of the chapter, so we need to load the last chapters last slide
                    handle_chapter(chapter_list, body_content.length, ch_ix-1, last_length-1)
                }

                dialoguebox.update_text(body_content[b_ix].Text,'#dialogueBody1')
            });

        });



        // Initialize first "slide"
    //    dialoguebox.update_text(content[i].Text, '#chapterTitle1');
    //    d3.csv('data/'+content[i].File)
    //        .then(function(body_content){
    //            handle_body(body_content)
    //        })

    }

   // function handle_body(body_content) {
   //     var i = 0;
   //     local.forward.on("click", function() {
   //         if (i == body_content.length - 3) {
   //             return(0)
   //         } else {
   //             i++;
   //             dialoguebox.update_text(body_content[i].Text, '#dialogueBody1');
   //             eval(body_content[i].Event)};
   //         })
   //     local.backward.on("click", function() {
   //         i--; dialoguebox.update_text(body_content[i].Text, '#dialogueBody1');
   //         eval(body_content[i].Event)});
   // }

    /**
     *  Populates the dialogue box with text.
     */
    dialoguebox.update_text = function(text, section) {
        var j = 0;
        var text_progression = d3.interval(function (elapsed) {
            if (j > text.length) {
                text_progression.stop();
                return;
            }

            j+=5;
            var display_string = text.substring(0, j);
            d3.select(section)
                .text(display_string);
        }, 1)
    };

    dialoguebox.dimensions = function(context, _) {
        var returnArray;
        if (typeof _ === 'undefined' ) {
            returnArray = context.nodes()
                .map(function (node) {return local.dimensions.get(node);});
            return context._groups[0] instanceof NodeList ? returnArray : returnArray[0];
        }
        context.each(function() {local.dimensions.set(this, _);});
        return dialoguebox;
    };

    return dialoguebox;
}

