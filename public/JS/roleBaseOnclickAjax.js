
const sendAvatarAndLabel = (imgsrc, label) => {
    $.post('/roleinfo', {
        imgsrc: imgsrc,
        label: label
    }, () => {
        window.location.href = '/roleprofile'
    })
}

for (let i = 0; i < roles.length; i++) {
    roles[i].addEventListener('click', (e) => {
        const avatarSrc = e.target.closest('img').getAttribute('src')
        const avatarLabel = e.target.closest('div').getAttribute('data-role-desc')
        sendAvatarAndLabel(avatarSrc, avatarLabel)
    })    
}