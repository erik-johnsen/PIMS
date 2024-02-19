
// Form DOM
const displayTable = document.getElementById('table-display')
const submit = document.querySelector('.submit-button')
const nameInput = document.getElementById('form_name')
const manufacturerInput = document.getElementById('form_manufacturer')
const expirationInput = document.getElementById('form_expiration')
const locationInput = document.getElementById('form_location')
const quantityInput = document.getElementById('form_amount-to-add')
const displayID = document.getElementById('form_show-id')
const form = document.querySelector('.form-container')

// Form Logic DOM
const closeButton = document.querySelector('.close-button')
const openButton = document.querySelector('.open-button')
const addStorageWindow = document.querySelector('.add-storage')

const tbody = document.getElementById('tbody')

let allDataArray = JSON.parse(localStorage.getItem("medicine")) || []

let allRandomIDs = JSON.parse(localStorage.getItem("AllIDs")) || []



// Opening and closing the form window functionality

closeButton.addEventListener('click', ()=> {
	addStorageWindow.style.display = "none"
	openButton.style.display = "flex"
})

openButton.addEventListener('click', () => {
	addStorageWindow.style.display = "flex"
	openButton.style.display = "none"

	form.reset()
	Medicine.createID()
})


class Medicine {
	constructor(id, name, manufacturer, expiration, location, quantity) {
		this.id = id,
		this.name = name,
		this.manufacturer = manufacturer,
		this.expiration = expiration,
		this.location = location,
		this.quantity = quantity
	}

	static addMedicine() {
		const newID = Medicine.createID()
		const newMedicine = new Medicine (newID, nameInput.value, manufacturerInput.value, expirationInput.value, locationInput.value, quantityInput.value)

		//pushes the new ID to a different array in local storage so i can make sure that no identical IDs can exist
		allRandomIDs.push(newID)
		localStorage.setItem("AllIDs", JSON.stringify(allRandomIDs))
		return newMedicine
		
	}

	// Function to create a random ID number, check if it already exist and also display it when the user is filling out the form
	static createID() {
		const newID = Math.floor(Math.random() * 1000000000);
		if(allRandomIDs.includes(newID)) {
			Medicine.createID()
			return
		}

		displayID.textContent = newID
		return newID

	}
}



// Displays the data stored when website is loaded
window.addEventListener('DOMContentLoaded', ()=> {
	UI.displayData(allDataArray)
})

class UI {
	static displayData = (data) => {
		if(data) {
			tbody.textContent = ""
			
			allDataArray.forEach(element => {
				const trContainer = document.createElement('tr')
				
				const xContainer = document.createElement('td')
				const idContainer = document.createElement('td')
				const nameContainer = document.createElement('td')
				const manufacturerContainer = document.createElement('td')
				const expirationContainer = document.createElement('td')
				const locationContainer = document.createElement('td')
				const quantityContainer = document.createElement('td')
			
				tbody.appendChild(trContainer)
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
}


// Eventlistener to check if every field is filled out and then run addMedicine, adds it to storage and runs displayData 
submit.addEventListener('click', (e)=> {
	e.preventDefault()
	if(!nameInput.value.trim() || !manufacturerInput.value.trim() || !expirationInput.value.trim() || locationInput.value === "Select a location") {
		console.log("fill it out!");
	} else {
		
		allDataArray.push(Medicine.addMedicine())
		localStorage.setItem("medicine", JSON.stringify(allDataArray))
		UI.displayData(allDataArray)

		form.reset()
		Medicine.createID()
	}
	
})