const slider = document.querySelector(".slider");
const lengthDisplay = document.querySelector("[data-len]");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");//custom 
const copyBtn = document.querySelector("[copy]");
const CopyMsg = document.querySelector("[CopyMsg]");
const upperCase = document.querySelector("#uppercase");
const lowerCase = document.querySelector("#lowercase");
const symbol = document.querySelector("#smybol");
const number = document.querySelector("#number");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton");
const allcheckBox = document.querySelectorAll("input[type=checkbox]");

const symString = "!@#$%^&*()_+{}|:><?`-=[];',./~";
let password = "";
let passwordLength = 10;
let checkCount=1;

handleSlider();



function handleSlider(){
    slider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;

}
function setIndicator(color){
    indicator.style.backgroundColor = color;
}
function getRandomInteger(min,max){
    return  Math.floor(Math.random()*(max-min))+min;
}
function generateRandomNum(){
    return getRandomInteger(0,9);
}
function generateLower(){
    return String.fromCharCode(getRandomInteger(97,123));
}
function generateUpper(){
    return String.fromCharCode(getRandomInteger(65,91));
}
function generateSymbol(){
    return symString.charAt(getRandomInteger(0,symString.length));
}

function calcStrength(){
    let num = false;
    let upp = false;
    let low = false;
    let sym = false;

    if(upperCase.Checked) upp = true;
    if(lowerCase.Checked) low = true;
    if(number.Checked) num = true;
    if(symbol.Checked) sym = true;

    if(upp && low && (sym || num) && passwordLength>=8){
        setIndicator("#0f0");
    }
    else if(low || num || sym || upp){
        setIndicator("#ff0");
    }
    else{
        setIndicator("#f00");
    }
}

async function copyContent(){
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        CopyMsg.innerText = "Copied";
    }
    catch(e){
        CopyMsg.innerText = "failed";
    }
    CopyMsg.classList.add("active");//to make copied visible 
    setTimeout(()=>{
        CopyMsg.classList.remove("active");
    },2500);
}

slider.addEventListener('input',(e)=>{
    passwordLength = e.target.value;
    handleSlider();
})
function generatePassword(){
    if(passwordDisplay.value){
        copyContent();
    }
}