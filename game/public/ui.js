const wHeight = $(window).height()
const wWidth = $(window).width()
const player = {}
let orbs = []
let players = []

const canvas = document.querySelector('#the-canvas')
const context = canvas.getContext('2d')
canvas.width = wWidth
canvas.height = wHeight

$(window).load(() => {
    $('#loginModal').modal('show')
})

$('.name-form').submit(e => {
    e.preventDefault()
    console.log('Submit')
    
    player.name = document.querySelector('#name-input').value
    $('#loginModal').modal('hide')
    $('#spawnModal').modal('show')
    document.querySelector('.player-name').innerHTML = player.name
})

$('.start-game').click(() => {
    $('.modal').modal('hide')
    $('.hiddenOnStart').removeAttr('hidden')
    init()
})