$('#next-ques').on('click', () => {
    $.ajax({
        type:    "POST",
        url:     "/question",
        data:    {index: 1},
        success: function(data) {
            console.log(data)
              window.location.replace('/roleprofile')
        },
        // vvv---- This is the new bit
        error:   function(jqXHR, textStatus, errorThrown) {
              alert("Error, status = " + textStatus + ", " +
                    "error thrown: " + errorThrown
              );
        }
      });
})

$('#prev-ques').on('click', () => {
    $.ajax({
        type:    "POST",
        url:     "/question",
        data:    {index: 0},
        success: function(data) {
            console.log(data)
              window.location.replace('/roleprofile')
        },
        // vvv---- This is the new bit
        error:   function(jqXHR, textStatus, errorThrown) {
              alert("Error, status = " + textStatus + ", " +
                    "error thrown: " + errorThrown
              );
        }
      });
})