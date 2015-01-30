/**
 * Created by tangwei on 2015/1/24.
 */
$(function() {
    $('.comment').on('click', function() {
        var commentId = $(this).data('cid');
        var toId = $(this).data('tid');
        if($('#toId').length>0){
            $("#toId").val(toId);
        }else{
        $('<input>').attr({
            type: 'hidden',
            id:'toId',
            name: 'comment[tid]',
            value: toId
        }).appendTo('#commentForm');     
        }
       if($('#commentId').length>0){
            $("#commentId").val(commentId);
        }else{
        $('<input>').attr({
            type: 'hidden',
            id: 'commentId',
            name: 'comment[cid]',
            value: commentId
        }).appendTo('#commentForm');
    }
    })
});