const slider = document.querySelector(".slider");
const lengthDisplay = document.querySelector("[data-len]");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");//custom 
const copyBtn = document.querySelector("[copy]");
const msgBtn = document.querySelector("[CopyMsg]");
const upperCase = document.querySelector("#uppercase");
const lowerCase = document.querySelector("#lowercase");
const symbol = document.querySelector("#smybol");
const number = document.querySelector("#number");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton");
const allcheckBox = document.querySelectorAll("input[type=checkbox]");

const sym = "!@#$%^&*()_+{}|:><?`-=[];',./~";
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
    return sym.charAt(etRandomInteger(0,sym.length));
}
