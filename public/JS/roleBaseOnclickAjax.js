
const sendAvatarAndLabel = (imgsrc, label, roleCode) => {
    $.post('/roleinfo', {
        imgsrc: imgsrc,
        label: label,
        roleCode: roleCode
    }, () => {
        window.location.href = '/roleprofile'
    })
}

for (let i = 0; i < roles.length; i++) {
    roles[i].addEventListener('click', (e) => {
        const avatarSrc = e.target.closest('img').getAttribute('src')
        const avatarLabel = e.target.closest('div').getAttribute('data-role-desc')
        const roleCode = e.target.closest('div').getAttribute('data-role-number')
        sendAvatarAndLabel(avatarSrc, avatarLabel, roleCode)
    })    
}