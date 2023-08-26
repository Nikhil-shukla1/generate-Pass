const slider = document.querySelector(".slider");
const lengthDisplay = document.querySelector("[data-len]");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");//custom 
const copyBtn = document.querySelector("[copy]");
const CopyMsg = document.querySelector("[CopyMsg]");
const upperCase = document.querySelector("#uppercase");
const lowerCase = document.querySelector("#lowerCase");
const symbol = document.querySelector("#symbol");
const number = document.querySelector("#number");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton");
const allcheckBox = document.querySelectorAll("input[type=checkbox]");
const theme = document.querySelector(".moon");
const theme1 = document.querySelector(".inputContainer");
const theme2 = document.querySelector(".display-container");
const theme3 = document.querySelector("check");

const symString = "!@#$%^&*()_+{}|:><?`-=[];',./~";
let password = "";
let passwordLength = 10;
let checkCount=0;
let light = false;

handleSlider();

theme.addEventListener('click',()=>{
    if(light === true){
        theme.innerHTML="🌛";
        light = false;
    }
    else{
        theme.innerHTML="🌞";
        light= true;
    }
    document.body.classList.toggle('light-mode');
    theme1.classList.toggle('lm-inputContainer');
    theme2.classList.toggle('lm-display-container');
    theme3.classList.toggle("lm-check");
})

function handleSlider(){
    slider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
    const min = slider.min;
    const max = slider.max;
    slider.style.backgroundSize = (passwordLength-min)*100/(max-min)+ "% 100%";

}
function setIndicator(color){
    indicator.style.backgroundColor = color;
    indicator.style.shadowColor = color;
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

    if(upperCase.checked) upp = true;
    if(lowerCase.checked) low = true;
    if(number.checked) num = true;
    if(symbol.checked) sym = true;

    if(upp && low && (sym || num) && passwordLength>=8){
        setIndicator("#0f0");
    }
    else if((low|| upp) && (num || sym) && passwordLength>=6 ){
        setIndicator("#ff0");
    }
    else{
        setIndicator("#f00");
    }
    console.log("cal chal gaya")
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

    console.log("async function");
}

slider.addEventListener('input',(e)=>{
    passwordLength = e.target.value;
    handleSlider();
});

copyBtn.addEventListener('click',()=>{
    if(passwordDisplay.value){
        copyContent();
    }
});


function handleCheckboxChange(){
    checkCount=0;
    allcheckBox.forEach((checkbox)=>{
        if(checkbox.checked){
            checkCount++;
        }
        if(passwordLength < checkCount){
            passwordLength = checkCount;
            handleSlider();
        }
    })
}

allcheckBox.forEach((checkbox)=>{
    checkbox.addEventListener('change',handleCheckboxChange);
});


generateBtn.addEventListener('click',()=>{
    if(checkCount <= 0)return;
    if(passwordLength < checkCount){
        passwordLength = checkCount;
        handleSlider();
    }

    //remove old password
    password = "";

    let funcArr = [];
    if(upperCase.checked){
        funcArr.push(generateUpper);
    }
    if(number.checked){
        funcArr.push(generateRandomNum);
    }
    if(lowerCase.checked){
        funcArr.push(generateLower);
    }
    if(symbol.checked){
        funcArr.push(generateSymbol);
    }

    for(let i=0;i<funcArr.length;i++){
        password += funcArr[i]();
    }
    for(let i=0;i<passwordLength-funcArr.length;i++){
        let randomNum = getRandomInteger(0,funcArr.length);
        password += funcArr[randomNum]();
    }

    //shuffle the password
    function shufflePassword(array){
        // fisher yates method
        for(let i=array.length-1;i>0;i--){
            const j = Math.floor(Math.random()*(i+1));
            const temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        let str="";
        array.forEach(element => {
            str+=element;
        });
        return str;
    } 
    password = shufflePassword(Array.from(password));

    passwordDisplay.value = password;
    //calculate strength 
    calcStrength();
});


























