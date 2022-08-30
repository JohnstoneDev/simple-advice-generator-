let adviceField = document.getElementById('advice-text');
let quoteIDField = document.getElementById("advice-id")

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


async function addAdvice(){
    let advice = await getAdvice();
    let adviceNumber = advice.slip.id;
    let adviceMessage = advice.slip.advice;
    
    quoteIDField.innerHTML = adviceNumber;
    adviceField.innerHTML  = adviceMessage ;
}

function newAdvice(){
    getAdvice();
    addAdvice();
}

function copyAdvice(){
    let copiedText = document.getElementById("advice-text").innerHTML;
    navigator.clipboard.writeText(copiedText);

    alert(`Copied \"${copiedText}"\ to clipboard.`);
}

const submitButton = document.getElementById("submit-button");
const inputElement = document.getElementById("personal-quote");
let personalQuote = "";

function handleChange(event){
    event.preventDefault();
    personalQuote = event.target.value;
        if(personalQuote != ""){
            return personalQuote;
        }
}


inputElement.addEventListener("change",handleChange);

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

const init = () => {
    addAdvice();
}

document.addEventListener("DOMContentLoaded",init);
