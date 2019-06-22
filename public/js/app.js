//client side coding
console.log('Client side javascript file')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('click',(e)=>{
    e.preventDefault()
    const location = search.value

    messageOne.textContent = 'loading...'
    messageTwo.textContent = ' '

    fetch('/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageOne.textContent = data.error
            console.log(data.error)
        }
        else{
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast.summary+' The temperature seems to be '+data.forecast.temperature+' degrees.'
            console.log(data.location)
            console.log(data.forecast)
        }
    })
})
})