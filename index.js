// Get elements in the page that wil receive and update Data from the API
// and store them in global variables.

let adviceField = document.getElementById('advice-text');
let quoteIDField = document.getElementById("advice-id");

// Asynchronous javascript function that fetches the resources from the API and 
// returns a promise to be used by another async function

async function getAdvice(){
    let url = 'https://api.adviceslip.com/advice';
    try{
        let response = await fetch(url,{
            method : 'GET'
        });
        return await response.json()
    }
    catch(error){
        console.log(error);
    }
}

// asynchronous function that calls getAdvice() evaluates the response 
// and converts into useful data that is then populated into the page 
// using the variables created on line 1.

async function addAdvice(){
    let advice = await getAdvice();
    let adviceNumber = advice.slip.id;
    let adviceMessage = advice.slip.advice;
    
    quoteIDField.innerHTML = adviceNumber;
    adviceField.innerHTML  = adviceMessage ;
}

// Function that calls both functions and finishes the implementation
// done here to prevent calling it from the init function and the 
// clickabe elements directly. 

function newAdvice(){
    getAdvice();
    addAdvice();
}


// function that copies advice to the browsers keyboard and alerts the user
// when its done

function copyAdvice(){
    let copiedText = document.getElementById("advice-text").innerHTML;
    navigator.clipboard.writeText(copiedText);

    alert(`Copied \"${copiedText}"\ to clipboard.`);
}

// Get submt button and the input element from the page
// declare a variable that will be used to store the quote typed in to the 
// input element

const submitButton = document.getElementById("submit-button");
const inputElement = document.getElementById("personal-quote");
let personalQuote = "";

// create an event handler for the input element and call it.

function handleChange(event){
    event.preventDefault();
    personalQuote = event.target.value;
        if(personalQuote != ""){
            return personalQuote;
        }
}

inputElement.addEventListener("change",handleChange);

// create an event handler for the form and call it on the element

function handleSubmit(event){
    event.preventDefault();
    if(personalQuote !== "" && personalQuote !== " "){
        adviceField.innerHTML = personalQuote;
        quoteIDField.innerHTML = Math.floor(Math.random() * 100);
        inputElement.value = "";
    }
    else {alert("Can't submit empty value")}
}

submitButton.addEventListener("click",handleSubmit);

// function that should run immediately the page loads;
// it calls the addAdvice function that performs the deliverables 
// on the page. 

const init = () => {
    addAdvice();
}

//Mount the event listener for the initial load.

document.addEventListener("DOMContentLoaded",init);
