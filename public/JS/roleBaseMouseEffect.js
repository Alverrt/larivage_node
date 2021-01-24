const roles = document.querySelectorAll(".role");
const toolBox = document.getElementById('toolbox')
console.log(roles);



for (let i = 0; i < roles.length; i++) {
    roles[i].addEventListener('mousemove', (e) => {
        const roleDesc = roles[i].getAttribute("data-role-desc");
        toolBox.style.display = 'block';
        toolBox.style.left = e.pageX + 15;
        toolBox.style.top = e.pageY - 25;
        toolBox.innerText = roleDesc;
    })
}

for (let i = 0; i < roles.length; i++) {
    roles[i].addEventListener('mouseleave', (e) => {
        toolBox.style.display = 'none';
    })
}