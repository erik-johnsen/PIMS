
// Form DOM
const displayTable = document.getElementById('table-display')
const submit = document.querySelector('.submit-button')

const nameInput = document.getElementById('form_name')
const manufacturerInput = document.getElementById('form_manufacturer')
const expirationInput = document.getElementById('form_expiration')
const locationInput = document.getElementById('form_location')
const quantityInput = document.getElementById('form_amount-to-add')
const totalInStockDisplay = document.getElementById('form_show-quantity')
const displayID = document.getElementById('form_show-id')

const typeSelect = document.getElementById('form_type')
const typeInput = document.getElementById('form_dosage')
const typeInputLabel = document.querySelector('label[for="form_dosage"]')

const updatePrompt = document.querySelector('.update-prompt')

const deleteButtons = document.querySelectorAll('.form_delete-button')

const form = document.querySelector('.form-container')

// Form Logic DOM
const closeButton = document.querySelector('.close-button')
const openButton = document.querySelector('.open-button')
const addStorageWindow = document.querySelector('.add-storage')

const tbody = document.getElementById('tbody')

// This is for retriving the data from the localStorage

let allDataArray = JSON.parse(localStorage.getItem("medicine")) || []

let allRandomIDs = JSON.parse(localStorage.getItem("AllIDs")) || []

// varaibles for updating items

let itemNameToUpdate = ""
let itemQuantityToUpdate = ""

// Opening and closing the form window functionality

closeButton.addEventListener('click', ()=> {
	addStorageWindow.style.display = "none"
	openButton.style.display = "flex"
})

openButton.addEventListener('click', () => {
	addStorageWindow.style.display = "flex"
	openButton.style.display = "none"

	Form.resetForm()
})

// the medicine class

class Medicine {
	constructor(id, name, manufacturer, expiration, location, typeInput, typeSelect, quantity) {
		this.id = id,
		this.name = name,
		this.manufacturer = manufacturer,
		this.expiration = expiration,
		this.location = location,
		this.typeSelect = typeSelect,
		this.typeInput = typeInput,
		this.quantity = quantity
	}

	static addMedicine() {
		const newID = Medicine.createID()
		const newMedicine = new Medicine (newID, nameInput.value, manufacturerInput.value, expirationInput.value, locationInput.value, typeInput.value, typeSelect.value, quantityInput.value)

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
	// Updates the quantity in localStorage 
	static handleQuantity() {
		const itemToUpdate = allDataArray.find(item => item.name === itemNameToUpdate)
		if(itemToUpdate) {
			itemToUpdate.quantity = (Number(itemQuantityToUpdate || 0)) + (Number(quantityInput.value) || 0)

			localStorage.setItem("medicine", JSON.stringify(allDataArray))
		}
	}
	// TODO
	static deleteMedicine(event) {
		const parentElement = event.target.parentElement;  
		parentElement.remove()
	}
}

// Inheritence classes

class Tablets extends Medicine {
	constructor(id, name, manufacturer, expiration, location, quantity, dosageAmount) {
		super(id, name, manufacturer, expiration, location, quantity)
		this.dosageAmount = dosageAmount
	}
}

class Syrup extends Medicine {
	constructor(id, name, manufacturer, expiration, location, quantity, dosageml) {
		super(id, name, manufacturer, expiration, location, quantity)
		this.dosageml = dosageml
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
				
				const xButton = document.createElement('button')
				const idContainer = document.createElement('td')
				const nameContainer = document.createElement('td')
				const manufacturerContainer = document.createElement('td')
				const expirationContainer = document.createElement('td')
				const locationContainer = document.createElement('td')
				const dosageContainer = document.createElement('td')
				const quantityContainer = document.createElement('td')
			
				tbody.appendChild(trContainer)
				trContainer.append(xButton, idContainer, nameContainer, manufacturerContainer, expirationContainer, locationContainer, dosageContainer, quantityContainer)
	
				xButton.textContent = "X"
				xButton.classList.add('form_delete-button')
				idContainer.textContent = element.id
				nameContainer.textContent = element.name
				manufacturerContainer.textContent = element.manufacturer
				expirationContainer.textContent = element.expiration
				locationContainer.textContent = element.location
				if(element.typeSelect === "tablet") {
					dosageContainer.textContent = `${element.typeInput} pill`
				} else {
					dosageContainer.textContent = `${element.typeInput} ml`
				}
				quantityContainer.textContent = element.quantity
			})
		}
	}
}

class Form {
	static resetForm() {
		form.reset()
		Medicine.createID()
		totalInStockDisplay.textContent = "00"
		typeInputLabel.textContent = "Dosage"
		typeInput.setAttribute("disabled", "")
		submit.textContent = "Add Item(s)"
		updatePrompt.textContent = ""

	}
}


// Eventlistener to check if every field is filled out and then run addMedicine, adds it to storage and runs displayData 
submit.addEventListener('click', (e)=> {
	e.preventDefault()

	// Checks if the item name user is trying to add already exist in the system
	if(submit.textContent !== "Update Item") {
		// If name doesnt match then check if every field is filled out
		if(!nameInput.value.trim() || !manufacturerInput.value.trim() || !expirationInput.value.trim() || locationInput.value === "Select a location" || !typeInput.value.trim()) {
			console.log("fill it out!");
		} else {
			// Here we add the new item to the allDataArray and update the localStorage with it
			allDataArray.push(Medicine.addMedicine())
			localStorage.setItem("medicine", JSON.stringify(allDataArray))
			UI.displayData(allDataArray)
	
			Form.resetForm()
			
		}
	} else {
		// If the name matches then update the item with the new quantity
		Medicine.handleQuantity()
		UI.displayData(allDataArray)
		Form.resetForm()
	}
	
	
})

// Eventlistener that handles if the label text content of the dosage inout depending on what the user chooses
typeSelect.addEventListener("change", ()=> {
	typeInput.removeAttribute("disabled")
	if(typeSelect.value === "tablet") {
		typeInputLabel.textContent = "Dosage in amount"
	} else {
		typeInputLabel.textContent = "Dosage in ml"
	}
})


deleteButtons.forEach(button => {
	console.log("test");
	button.addEventListener('click', (event)=> {
		Medicine.deleteMedicine(event)
		console.log("hei");
	})
})

// If the user types in a name that exist then change the ID to the existing one, change the total amount to the current and change the button name to "Update Item"
nameInput.addEventListener("change", ()=> {
	allDataArray.forEach(obj => {
		if(obj.name === nameInput.value) {
			displayID.textContent = obj.id
			submit.textContent = "Update Item"
			itemNameToUpdate = obj.name
			itemQuantityToUpdate = obj.quantity
			updatePrompt.textContent = "This item already exists, do you wish to update it?"
			
			

			if(obj.quantity < 10) {
				totalInStockDisplay.textContent = `0${obj.quantity}`
			} else {
				totalInStockDisplay.textContent = obj.quantity
			}
			
		}
	})
})

console.log(allDataArray);