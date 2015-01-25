/**
 * Created by tangwei on 2015/1/24.
 */
$(function () {
    $('.del').on('click',function(){
        var id=$(this).data('id');
        var tr=$(".item-id-"+id);
        $.ajax({
            type:'DELETE',
            url:'/admin/list?id='+id,
        })
            .done(function(results){
                 if(results.success===1){
                     if(tr.length>0){
                         tr.remove();
                     }
                 }
            })
    })

});



