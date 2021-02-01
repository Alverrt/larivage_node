const roleLimitWarning = 'Seçtiğiniz rol başvuruya kapalı veya kontenjanı dolmuş durumda. Lütfen başka rol seçiniz.'

const sendRoleInfo = (imgsrc, label, roleCode) => {
    const data = {
        imgsrc: imgsrc,
        label: label,
        roleCode: roleCode
    }

    $.ajax({
        type: "POST",
        url: "/roleinfo",
        data: data,
        dataType: "text",
        success: function (response) {
            var res = parseInt(response)
            if (res === 1) {
                window.location.href = '/roleprofile'
            } else if (res === 0) {
                $('.alert-container').css('display', 'flex')
                $('.alert-text').text(roleLimitWarning)
                $('#back').text('Tamam')
            }
        }
    });
}

for (let i = 0; i < roles.length; i++) {
    roles[i].addEventListener('click', (e) => {
        const avatarSrc = e.target.closest('img').getAttribute('src')
        const avatarLabel = e.target.closest('div').getAttribute('data-role-desc')
        const roleCode = e.target.closest('div').getAttribute('data-role-number')
        sendRoleInfo(avatarSrc, avatarLabel, roleCode)
    })    
}

$('#back').on('click', () => {
    $('.alert-container').css('display', 'none')
})