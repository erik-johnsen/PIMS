const displayTable = document.getElementById('table-display')
const submit = document.querySelector('.submit')
const nameInput = document.getElementById('form_name')
const manufacturerInput = document.getElementById('form_manufacturer')
const expirationInput = document.getElementById('form_expiration')
const locationInput = document.getElementById('form_location')
const quantityInput = document.getElementById('form_show-quantity')

let allDataArray = JSON.parse(localStorage.getItem("userInfo")) || []


submit.addEventListener('click', (e)=> {
	e.preventDefault()
	if(!nameInput.value.trim() || !manufacturerInput.value.trim() || !expirationInput.value.trim() || locationInput.value === "Select a location") {
		console.log("fill it out!");
	} else {addToStorage()}
	
})

const addToStorage = () => {
	const userInfo = {
		id: "323333",
		name: nameInput.value,
		manufacturer: manufacturerInput.value,
		expiration: expirationInput.value,
		location: locationInput.value,
		quantity: quantityInput.value
	}
	allDataArray.push(userInfo)
	localStorage.setItem("medicine", JSON.stringify(allDataArray))
}

window.addEventListener('DOMContentLoaded', ()=> {
	displayData(allDataArray)
})

const displayData = (data) => {
	if(data) {
		// displayTable.textContent = ""

		const trContainer = document.createElement('tr')
		
		data.forEach((element) => {
			
			const xContainer = document.createElement('td')
			const idContainer = document.createElement('td')
			const nameContainer = document.createElement('td')
			const manufacturerContainer = document.createElement('td')
			const expirationContainer = document.createElement('td')
			const locationContainer = document.createElement('td')
			const quantityContainer = document.createElement('td')

			displayTable.appendChild(trContainer)
			trContainer.append(xContainer, idContainer, nameContainer, manufacturerContainer, expirationContainer, locationContainer, quantityContainer)

			xContainer.textContent = "X"
			idContainer.textContent = element.id
			nameContainer.textContent = element.name
			manufacturerContainer.textContent = element.manufacturer
			expirationContainer.textContent = element.expiration
			locationContainer.textContent = element.location
			quantityContainer.textContent = element.quantity
		})
	}
}