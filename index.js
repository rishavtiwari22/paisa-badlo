const base_url = `https://cdn.jsdelivr.net/gh/@fawazahmed0/currency-api@latest/currencies`;

const button = document.querySelector("form button");
let dropdowns = document.querySelectorAll(".dropdown select");

const from = document.getElementById("f");
const to = document.getElementById("t");

const newvalue = document.getElementById("value");

for (let select of dropdowns){
    for (let code in countryList){
        let newoption = document.createElement("option");
        newoption.value = code;
        newoption.innerText = code;     
        if (select.name === "from" && code === "USD"){
            newoption.selected = true;
        }else if (select.name === "to" && code === "INR"){
            newoption.selected = true;
        }
        select.append(newoption);
    }   
    
    select.addEventListener("change", (evt) => {
        updatefalg(evt.target);
    });

}

const updatefalg = (element) => {
    let currencycode = element.value;
    let countrycode = countryList[currencycode];
    let link = `https://flagsapi.com/${countrycode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = link;
}


button.addEventListener("click", async (evt) => {   
    evt.preventDefault();
    let amount = document.querySelector("input").value;
    if (amount === ""){
        alert("Please enter a value");
        return;
    }else if ((amount < 0) || (isNaN(amount))){
        alert("Please enter a valid amount");
        return;
    }

    
    // const url = `${base_url}/${from.value.toLowerCase()}/${to.value.toLowerCase()}.json`;
    // const response = await fetch(url);
    
    // const data = await response.json();
    // console.log(data);

    fetch(
        `https://v6.exchangerate-api.com/v6/db9dd06ef07d2112693c914d/latest/${from.value}`
      )
        .then((res) => res.json())
        .then((data) => {
          const rate = data.conversion_rates[to.value];
            newvalue.innerText = `${amount} ${from.value} = ${rate * amount} ${to.value}`;
            
        });


});