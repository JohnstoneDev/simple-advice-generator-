
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
    
    document.getElementById('advice-id').innerHTML = adviceNumber;
    document.getElementById('advice-text').innerText = adviceMessage ;
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

const init = () => {
    addAdvice();
}

document.addEventListener("DOMContentLoaded",init);
