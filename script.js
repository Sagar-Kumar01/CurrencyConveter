const selects = document.querySelectorAll("select");
let inputcurrency = document.querySelector("#inputcurrency");
let outputcurrency = document.querySelector("#outputcurrency");
let from = document.querySelector("#from");
let to = document.querySelector("#to");
let fromSelect = document.getElementById("fromCurrency");
let toSelect = document.getElementById("toCurrency");
let convert = document.querySelector("#convert");

let from_c = "";
let to_c = "";

selects.forEach((dropdown) => {
  for (let code in countryList) {
    let option = document.createElement("option");

    option.value = code;

    option.textContent = `${code} - ${countryList[code]}`;

    dropdown.appendChild(option);
  }
});

fromSelect.addEventListener("change", (e) => {
  let country = countryList[e.target.value];
  from.setAttribute("src", `https://flagsapi.com/${country}/shiny/24.png`);
  from_c = e.target.value;
});

toSelect.addEventListener("change", (e) => {
  let country = countryList[e.target.value];
  to.setAttribute("src", `https://flagsapi.com/${country}/shiny/24.png`);
  to_c = e.target.value;
  console.log(to_c)
});

convert.addEventListener("click", () => {
  let inputValue = inputcurrency.value;

 
  if (inputValue !== "" && !isNaN(inputValue) && Number(inputValue) > 0) {
    

   
    let url = `https://v1.apiplugin.io/v1/currency/sbhjk3fM/rates?source=${from_c}&target=${to_c}`;

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        
        
        let rate = data.rates[to_c];
        if (rate) {
          
          let result = Number(inputcurrency.value) * Number(rate);
          outputcurrency.value = result.toFixed(4); 
        } else {
          alert("Rate for target currency not found");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  } else {
   alert("Please enter a valid number greater than 0");
  }
});
