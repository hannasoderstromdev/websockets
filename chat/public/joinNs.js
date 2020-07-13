function joinNs(endpoint) {
    if (nsSocket) {
        nsSocket.close()
        document.querySelector('#user-input-form').removeEventListener('submit', formSubmit)
    } 
    
    nsSocket = io(`http://localhost:8000${endpoint}`)
    
    nsSocket.on('nsRoomLoad', nsRooms => {
        const roomListEl = document.querySelector('#room-list')
        roomListEl.innerHTML = ''
        
        nsRooms.forEach(room => {
            const classes = room.privateRoom ? 'glyphicon glyphicon-lock' : 'glyphicon glyphicon-globe'
            roomListEl.innerHTML += `<li class="room"><span class="${classes}"></span>${room.roomTitle}</li>`
        })

        const roomEls = document.querySelectorAll('.room')

        Array.from(roomEls).forEach(el => {
            el.addEventListener('click', e => {
                console.log(e.target.innerText)
                joinRoom(e.target.innerText)
            })
        })

        const firstRoom = document.querySelector('.room')
        const firstRoomName = firstRoom.innerText
        joinRoom(firstRoomName)

    })

    // Print msg from server
    nsSocket.on('messageToClients', msg => {
        const messagesEl = document.querySelector('#messages')
        messagesEl.innerHTML += buildHTMLfromMsg(msg)
    })

    // Send msg
    document.querySelector('#user-input-form').addEventListener('submit', formSubmit )
    
}

function formSubmit(event) {
    event.preventDefault()
    const messageEl = document.querySelector('#user-message')
    nsSocket.emit('newMessageToServer', { text: messageEl.value })
    console.log('submit', messageEl.value)
}

function buildHTMLfromMsg(msg) {
    const dateString = new Date(msg.time).toLocaleString()
    const newHTML = `
    <li>
        <div class="user-image">
            <img src="${msg.avatar}" alt="avatar" />
        </div>
        <div class="user-message">
            <div class="user-name-time">${msg.username} <span>${dateString}</span></div>
            <div class="message-text">${msg.text}</div>
        </div>
    </li>
    `
    return newHTML
}
