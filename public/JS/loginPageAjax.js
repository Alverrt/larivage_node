var noWhtls = 'GUID kaydınız whitelistte bulunamadı. Whitelist kaydı için Discord sunucusuna gitmelisiniz.'
var joinLimit = 'Rol başvuru limitine ulaşmışsınız (en fazla 3 başvuru). Rol başvurunuz reddedilirse tekrar başvuru yapabilirsiniz.'
var noEmptyInput = 'Tüm boşlukları doldurmanız gereklidir.'
var danger = 'Eğer discord nickinizi yanlış yazarsanız başvurunuzun sonucunu öğrenemezsiniz ve IC nick kısmına yazdığınız nick ile sadece sunucuya giriş yapabilirsiniz. Bilgileri doğru girdiğinizden emin misiniz?'

function checkers() {

    $('#back').text('Tamam')
    var data = {
        guid: $('#guidArea').val(),
        nick: $('#nickArea').val(),
        dc: $('#dcArea').val()
    }
    $.ajax({
        type: "POST",
        url: window.location + "login",
        data: data,
        dataType: "text",
        success: function (response) {
            var res = parseInt(response)
            if (res === 1) {
                window.location.href = '/rolebase'
            } else if (res === 0) {
                $('.alert-container').css('display', 'flex')
                $('.alert-text').text(noWhtls)
            } else if (res === -1) {
                $('.alert-container').css('display', 'flex')
                $('.alert-text').text(joinLimit)
            } else if (res === -2) {
                $('.alert-container').css('display', 'flex')
                $('.alert-text').text(noEmptyInput)
            }
        }
    });
}

$('.form-tag').on('submit', (e) => {
    e.preventDefault()
    
    $('#back').text('Hayır, emin değilim.')
    $('#send').css('display', 'block')

    $('.alert-container').css('display', 'flex')
    $('.alert-text').text(danger)

    $('#send').on('click', () => {
        $('#send').css('display', 'none')

        $('.alert-container').css('display', 'none')
        checkers()
    })



})

$('#back').on('click', () => {
    $('.alert-container').css('display', 'none')
})





