$('.reload').on('click',()=>{
    $.get('/scraping')
    console.log('button-clicked!')
    location.reload()
})

$(document).on('click','.getId',function(){
    let dataID = $(this).attr('data-id');
    let noteVal = $(`#textArea-${dataID}`).val();
    console.log(dataID);
    console.log(noteVal)
    $.ajax({
        method: "POST",
        url: "/info/" + dataID,
        data: {
          body: noteVal
        }
      })
    .then(function(data){
        console.log('Posted');
    })
})