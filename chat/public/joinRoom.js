function joinRoom(roomName) {
    nsSocket.emit('joinRoom', roomName, userCount => {
        const usersCountEl = document.querySelector('#users-count')
        usersCountEl.innerHTML = `${userCount} <span class="glyphicon glyphicon-user"></span>`
    })

    nsSocket.on('historyCatchUp', history => {
        const messagesEl = document.querySelector('#messages')
        messagesEl.innerHTML = ''

        history.forEach(msg => {
            const newMsg = buildHTMLfromMsg(msg)
            const currentMessages = messagesEl.innerHTML
            messagesEl.innerHTML = currentMessages + newMsg
        })
        
        messagesEl.scrollTo(0, messagesEl.scrollHeight)
    })

    nsSocket.on('updateUserCount', userCount => {
        const usersCountEl = document.querySelector('#users-count')
        usersCountEl.innerHTML = `${userCount} <span class="glyphicon glyphicon-user"></span>`
        document.querySelector('.curr-room-text').innerText = roomName
    })

    const searchBoxEl = document.querySelector('#search-box')
    searchBoxEl.addEventListener('input', e => {
        console.log(e.target.value)
        const messages = Array.from(document.querySelectorAll('.message-text'))

        messages.forEach(msg => {
            const text = msg.innerText.toLowerCase()
            const search = e.target.value.toLowerCase()
            
            if (text.includes(search)) {
                msg.style.display = 'none'
            } else {
                msg.style.display = 'block'
            }
        })
    })
}