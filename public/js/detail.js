/**
 * Created by tangwei on 2015/1/24.
 */
$(function() {
    $('.comment').on('click', function() {
        var commentId = $(this).data('cid');
        var toId = $(this).data('tid');
        $('<input>').attr({
            type: 'hidden',
            name: 'comment[tid]',
            value: toId
        }).appendTo('#commentForm');
        $('<input>').attr({
            type: 'hidden',
            name: 'comment[cid]',
            value: commentId
        }).appendTo('#commentForm');
    })
});