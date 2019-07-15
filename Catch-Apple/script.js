
$(function() {

    var anim_id;

    //saving dom objects to variables
    var container = $('#container');
    var basket = $('#basket');
    var apple_1 = $('#apple_1');
    var bomb_1 = $('#bomb_1');
    var apple_2 = $('#apple_2');
    /*var line_1 = $('#line_1');
    var line_2 = $('#line_2');
    var line_3 = $('#line_3');*/
    var restart_div = $('#restart_div');
    var restart_btn = $('#restart');
    var score = $('#score');

    //saving some initial setup
    var container_left = parseInt(container.css('left'));
    var container_width = parseInt(container.width());
    var container_height = parseInt(container.height());
    var basket_width = parseInt(basket.width());
    var basket_height = parseInt(basket.height());

    //some other declarations
    var game_over = false;

    var score_counter = 0;

    var speed = 2;
    var line_speed = 5;

    var move_right = false;
    var move_left = false;
    var move_up = false;
    var move_down = false;

    /* ------------------------------GAME CODE STARTS HERE------------------------------------------- */

    /* Move the cars */
    $(document).on('keydown', function(e) {
        if (game_over === false) {
            var key = e.keyCode;
            if (key === 37 && move_left === false) {
                move_left = requestAnimationFrame(left);
            } else if (key === 39 && move_right === false) {
                move_right = requestAnimationFrame(right);
            } else if (key === 38 && move_up === false) {
                // move_up = requestAnimationFrame(up);
            } else if (key === 40 && move_down === false) {
                // move_down = requestAnimationFrame(down);
            }
        }
    });

    $(document).on('keyup', function(e) {
        if (game_over === false) {
            var key = e.keyCode;
            if (key === 37) {
                cancelAnimationFrame(move_left);
                move_left = false;
            } else if (key === 39) {

                cancelAnimationFrame(move_right);
                move_right = false;
            } else if (key === 38) {
                cancelAnimationFrame(move_up);
                move_up = false;
            } else if (key === 40) {
                cancelAnimationFrame(move_down);
                move_down = false;
            }
        }
    });

    function left() {
        if (game_over === false && parseInt(basket.css('left')) > 0) {
            basket.css('left', parseInt(basket.css('left')) - 5);
            move_left = requestAnimationFrame(left);
        }
    }

    function right() {
        if (game_over === false && parseInt(basket.css('left')) < container_width - basket_width) {
            basket.css('left', parseInt(basket.css('left')) + 5);
            move_right = requestAnimationFrame(right);
        }
    }

    function up() {
        if (game_over === false && parseInt(basket.css('top')) > 0) {
            basket.css('top', parseInt(basket.css('top')) - 3);
            move_up = requestAnimationFrame(up);
        }
    }

    function down() {
        if (game_over === false && parseInt(basket.css('top')) < container_height - basket_height) {
            basket.css('top', parseInt(basket.css('top')) + 3);
            move_down = requestAnimationFrame(down);
        }
    }

    /* Move the cars and lines */
    anim_id = requestAnimationFrame(repeat);

    function repeat() {

        apple_1.css("display","inline");
        apple_2.css("display","inline");

        if (collision(basket, bomb_1)) {
            stop_the_game();
            return;
        }

        if (collision(basket, apple_1)) {
            score_counter+=1;
            score.text(score_counter);
            apple_1.css("display","none");
        }

        if (collision(basket, apple_2)) {
            score_counter+=1;
            score.text(score_counter);
            apple_2.css("display","none");
        }

        /*if (score_counter % 20 == 0) {
            score.text(parseInt(score.text()) + 1);
        }*/
        if (score_counter > 10000) {
            speed++;
            line_speed++;
        }

        item_down(apple_1);
        item_down(bomb_1);
        item_down(apple_2);

        /*line_down(line_1);
        line_down(line_2);
        line_down(line_3);*/


        anim_id = requestAnimationFrame(repeat);
    }

    function item_down(item) {
        var item_current_top = parseInt(item.css('top'));
        if (item_current_top > container_height) {
            item_current_top = -200;
            var item_left = parseInt(Math.random() * (container_width - basket_width));
            item.css('left', item_left);
        }
        item.css('top', item_current_top + speed);
    }

    /*function line_down(line) {
        var line_current_top = parseInt(line.css('top'));
        if (line_current_top > container_height) {
            line_current_top = -300;
        }
        line.css('top', line_current_top + line_speed);
    }*/

    restart_btn.click(function() {
        location.reload();
    });

    function stop_the_game() {
        game_over = true;
        cancelAnimationFrame(anim_id);
        cancelAnimationFrame(move_right);
        cancelAnimationFrame(move_left);
        cancelAnimationFrame(move_up);
        cancelAnimationFrame(move_down);
        restart_div.slideDown();
        restart_btn.focus();
    }

    /* ------------------------------GAME CODE ENDS HERE------------------------------------------- */


    function collision($div1, $div2) {
        var x1 = $div1.offset().left;
        var y1 = $div1.offset().top;
        var h1 = $div1.outerHeight(true);
        var w1 = $div1.outerWidth(true);
        var b1 = y1 + h1;
        var r1 = x1 + w1;
        var x2 = $div2.offset().left;
        var y2 = $div2.offset().top;
        var h2 = $div2.outerHeight(true);
        var w2 = $div2.outerWidth(true);
        var b2 = y2 + h2;
        var r2 = x2 + w2;

        if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
        return true;
    }



});
