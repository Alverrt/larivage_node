const roleLimitWarning = 'Başvurduğunuz rol kontenjanı doldu veya başvuruya kapalı halde. Başka rol seçiniz.'
const okey = 'Başvurunuz alındı ama henüz tamamlanmadı. Başvurunuzu tamamlamak için şu formu da ekstra doldurmanız gerekir: ' + '<a href="">Başvuru Linki</a>'
const reachedRoleLimit = 'En fazla 3 başvuru yapabilirsiniz ve görünüşe göre bu sınırı doldurdunuz. Rol başvurunuz yapılamadı. Anasayfaya yönlendiriliyorsunuz...'
const banned = 'Rol başvurusu yapmanız yönetici tarafından kısıtlandırılmış. Anasayfaya yönlendiriliyorsunuz...'
const errorOccured = 'Bir hatayla karşılaşıldı. Lütfen tekrar giriş yapmayı deneyin.'

$('#sendRoleApp').on('click', () => {

      const roleCode = $('.portre-label').attr('data-role-code')
      const data = {
            code: roleCode
      }

      const redirectToMain = () => {
            setTimeout(() => {
                  window.location.href = '/rolebase'
            }, 4000);
      }

      $.ajax({
            type: "POST",
            url: "/roleregister",
            data: data,
            dataType: "text",
            success: function (response) {
                  var res = parseInt(response)
                  if (res === 1) {
                        $('.alert-container').css('display', 'flex')
                        $('#back').css('display', 'none')
                        $('.alert-text').html(okey)

                        $('#send').css('display', 'block')
                        $('#send').text('Tamam')
                  } else if (res === 0) {
                        $('.alert-container').css('display', 'flex')
                        $('.alert-text').text(roleLimitWarning)
                        $('#back').css('display', 'none')
                        redirectToMain()
                  } else if (res === -1) {
                        $('.alert-container').css('display', 'flex')
                        $('.alert-text').text(reachedRoleLimit)
                        $('#back').css('display', 'none')
                        redirectToMain()
                  } else if (res === -3) {
                        $('.alert-container').css('display', 'flex')
                        $('.alert-text').text(banned)
                        $('#back').css('display', 'none')
                        redirectToMain()
                  } else if (res === -4) {
                        $('.alert-container').css('display', 'flex')
                        $('.alert-text').text(errorOccured)
                        $('#back').css('display', 'none')
                        redirectToMain()
                  }
            }
      });
})

$('#back').on('click', () => {
      $('.alert-container').css('display', 'none')
})

$('#send').on('click', () => {
      window.location.href = '/rolebase'
})





/*$('#next-ques').on('click', () => {
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
})*/