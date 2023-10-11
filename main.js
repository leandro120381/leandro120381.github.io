const btns = document.querySelectorAll('.btn')

btns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        let ripple = document.createElement('span')
        let x = e.clientX - e.target.offsetLeft
        let y = e.clientY - e.target.offsetTop

        ripple.style.left = x + 'px'
        ripple.style.top = y + 'px'

        btn.appendChild(ripple)

        // setTimeout(() => {
        //     ripple.remove()
        // }, 700)
    })
})