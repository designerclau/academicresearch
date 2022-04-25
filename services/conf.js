
$("#add_paper").submit(function(event){
  alert("Data inserted successfuly")
})

$("#update_paper").submit(function(event){
    event.preventDefault();
    var unindexed_array = $(this).serializeArray();
    var data ={};

    $.map(unindexed_array,function(n,i){
        data[n['title']]= n['value']
    })
    console.log(data);
    var request = {
        "url":'http://localhost:3001/api/papers/${data.id}',
        "method":"PUT",
        "data":data
    }

    $.ajax(request).done(function(response){
        alert("Data updated successfuly")
    })


  })