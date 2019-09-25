$('.reload').on('click',()=>{
    $.get('/scraping')
    console.log('button-clicked!')
    location.reload()
})

$(document).on('click','.getId',function(){
    const dataID = $(this).attr('data-id');
    const noteVal = $(`#textArea-${dataID}`).val();
    console.log(dataID);
    console.log(noteVal)
    $.post('/info/'+dataID,{note:noteVal})
    .then((data)=>{
        console.log('Posted');
    })
})