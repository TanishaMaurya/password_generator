const passwordDisplay=document.querySelector("[data-passwordDisplay]");
const  copyBtn=document.querySelector("[data-copy]");
const  copyMsg=document.querySelector("[data-copymsg]");
const  lengthDisplay=document.querySelector("[data-lengthNumber]");
const  inputSlider=document.querySelector("[data-lengthSlider]");
const  uppercaseCheck=document.querySelector("#uppercase");
const  lowercaseCheck=document.querySelector("#lowercase");
const numbersCheck=document.querySelector("#numbers");
const symbolsCheck=document.querySelector("#symbols");
const indicator=document.querySelector("[data-indicator]");
const generateBtn=document.querySelector(".generateButton");
const allCheckBox=document.querySelectorAll("input[type=checkbox]");
const symbols= '~`!@#$%^&*()_-+={}[]:";<>?,./""';

let passwordLength=10;
let checkCount=0;
let password="";

handleSlider();

setIndicator("#ccc")
// set password length
function handleSlider() {
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
    
    const min = inputSlider.min;
    const max = inputSlider.max;
    inputSlider.style.backgroundSize = ( (passwordLength - min)*100/(max - min)) + "% 100%"
}
console.log("1");
// set color of strength
function setIndicator(color){
    indicator.style.backgroundColor=color;
    indicator.style.boxShadow=`0px 0px 12px 1px ${color}`;
}


//random enter 
function getRndInteger(min,max){
    return Math.floor(Math.random() * (max-min)) + min;
}
function generateRandomNumber(){
    return getRndInteger(0,9);
}


function generateLowerCase() {  
    return String.fromCharCode(getRndInteger(97,123))
}

function generateUpperCase() {  
 return String.fromCharCode(getRndInteger(65,91))

}

function generateSymbol(){
    const randNum=getRndInteger(0, symbols.length);
    return symbols.charAt(randNum);
}
console.log("12");
//checkboxes
function calcStrength(){
    let hasUpper=false;
    let hasLower=false;
    let hasNum=false;
    let hasSym=false;
    if(uppercaseCheck.checked) hasUpper=true;
    if(lowercaseCheck.checked) hasLower=true;
    if(symbolsCheck.checked) hasSym=true; 
    if(numbersCheck.checked) hasNum=true;
         
         
   if(hasUpper && hasLower &&(hasNum ||hasSym) && passwordLength>=8 ){
     setIndicator("#0f0");      
   }
   else if((hasUpper || hasLower) && (hasNum ||hasSym) && passwordLength>=6){
    setIndicator("#ff0");
   }
   else{
    setIndicator("#f00");
   }
}

//copy password
async function copyContent() {
    try {
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText ="copied";
    }
    
    catch(e) {
        // console.log("error comes",err);
        copyMsg.innerText ="Failed";
    }
    //to make copy wala span visible
    copyMsg.classList.add("active");

    setTimeout( () => {
        copyMsg.classList.remove("active");
    },2000);

}


console.log("123"); 
function shufflePassword(array){
    //Fisher Yates Method
    for(let i=array.length-1;i>0;i--){
        const j=Math.floor(Math.random()*(i+1));
        const temp=array[i];
        array[i]=array[j];
        array[j]=temp;
    }
    let str="";
    array.forEach((el)=>(str+=el));
    return str;
}
console.log("1a");
function handleCheckBoxChange(){
    checkCount=0;
    allCheckBox.forEach((checkbox)=>{
        if(checkbox.checked)
          checkCount++;
    });
    
    //special conditon
    if(passwordLength < checkCount){
        passwordLength=checkCount;
        handleSlider();
    }

}
console.log("1b");
allCheckBox.forEach( (checkbox) => {
    checkbox.addEventListener('change', handleCheckBoxChange);
})

console.log("11");
//to copied content
inputSlider.addEventListener('input',(e)=>{
    passwordLength=e.target.value;
    handleSlider();
})
console.log("1c");
copyBtn.addEventListener('click', () => {
    if(passwordDisplay.value)
        copyContent();
})
console.log("1234");
generateBtn.addEventListener('click', () => {
    //none of the checkbox are selected

    if(checkCount == 0) 
        return;

    if(passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();
    }

    
   
    //remove old password
    password = "";


    let funcArr = [];

    if(uppercaseCheck.checked)
        funcArr.push(generateUpperCase);

    if(lowercaseCheck.checked)
        funcArr.push(generateLowerCase);

    if(numbersCheck.checked)
        funcArr.push(generateRandomNumber);

    if(symbolsCheck.checked)
        funcArr.push(generateSymbol);

    //compulsory addition
    for(let i=0; i<funcArr.length; i++) {
        password += funcArr[i]();
    }
   

    //remaining adddition
    for(let i=0; i<passwordLength-funcArr.length; i++) {
        let randIndex = getRndInteger(0 , funcArr.length);
        console.log("randIndex" + randIndex);
        password += funcArr[randIndex]();
    }
    
    //shuffle the password
    password = shufflePassword(Array.from(password));
   
    //display password
    passwordDisplay.value = password;
   
    //calculate strength
    calcStrength();
});









