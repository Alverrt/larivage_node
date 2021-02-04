var noWhtls = 'GUID kaydınız whitelistte bulunamadı. Whitelist kaydı için Discord sunucusuna gitmelisiniz. ' + '<a href= "https://forms.gle/qsB2JzzCmBdsmson9">Başvuru Linki<a/>'
var joinLimit = 'Sisteme giriş yapmanız yönetici tarafından kısıtlanmış. Daha fazla bilgi için <a href="https://discord.gg/M9VJR3hqNZ">discord</a> sunucusundan yetkililere ulaşın.'
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
                $('.alert-text').html(noWhtls)
            } else if (res === -1) {
                $('.alert-container').css('display', 'flex')
                $('.alert-text').html(joinLimit)
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





