/**
 * Created by tangwei on 2015/1/24.
 */
$(function() {
    $('.comment').click(function(e) {
        var target=$(this);
        var commentId = target.data('cid');
        var toId = target.data('tid');
        alert("as");    
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