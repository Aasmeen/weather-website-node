const input_location = document.querySelector('form')
const input = document.querySelector('input')
const error_string = document.querySelector('#error_string')
const output_string = document.querySelector('#output_string')

input_location.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = input.value
    error_string.textContent = 'loading....'
    output_string.textContent= ''
    fetch('http://localhost:3000/weather?address='+location).then((response)=>{    
        response.json().then((data)=>{
            if(data.error)
            {
                error_string.textContent = data.error
            }
            else
            {
                error_string.textContent = 'Address:'+data.address
                output_string.textContent = "Temperature:"+data.forecast_data.temperature
            }      
        })
    })
})