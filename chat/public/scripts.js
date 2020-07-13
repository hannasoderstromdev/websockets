const socket = io('http://localhost:8000', { 
    query: {
        username: 'hanna',
    }
})
let nsSocket = ''

socket.on('nsList', nsData => {
    const namespacesEl = document.querySelector('#namespaces')
    namespacesEl.innerHTML = ''

    nsData.forEach(ns => {
        namespacesEl.innerHTML += `<div class="namespace" ns=${ns.endpoint}><img src="${ns.img}" alt="${ns.endpoint}" /></div>`
    })

    const allNamespaces = document.querySelectorAll('.namespace')

    Array.from(allNamespaces).forEach(el => {
        el.addEventListener('click', e => {
            const nsEndpoint = el.getAttribute('ns')
            console.log(nsEndpoint)
            joinNs(nsEndpoint)
        })
    })

    joinNs('/wiki')
})

