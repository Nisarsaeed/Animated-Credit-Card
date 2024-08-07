const inputCardNum = document.getElementById("inputCardNum");
const inputHolderName = document.getElementById("inputHolderName");
const inputExpiryDate = document.getElementById("inputExpiryDate");
const inputCVV = document.getElementById("inputCVV");

const displayCardNum = document.getElementById("dispCardNum");
const displayHolderName = document.getElementById("dispHolderName");
const displayExpiryDate = document.getElementById("dispExpiryDate");
const displayCVV = document.getElementById("dispCVV");

const cardContainer = document.getElementById("card-container");

const defaultValue = {
  HolderName: "John Doe",
  CardNum: "#### #### #### ####",
  ExpiryDate: "01/01",
  CVV: "000",
};

// Function to get the corresponding display element
function getOutputElement(input) {
  switch (input.id) {
    case "inputCardNum":
      return displayCardNum;
    case "inputHolderName":
      return displayHolderName;
    case "inputExpiryDate":
      return displayExpiryDate;
    case "inputCVV":
      return displayCVV;
    default:
      return null;
  }
}

// Function to format the card number by adding spaces every 4 digits
function formatCardNumber(value) {
    let cardMask = value.replace(/\D/g, ""); 
  
    cardMask = cardMask.replace(/(.{4})/g, "$1 ");
    inputCardNum.value = cardMask.trim();

    let formatted = defaultValue.CardNum.split('');
    for (let i = 0; i < cardMask.length; i++) {
      formatted[i] = cardMask[i]; // Replace # with the entered digit
    }
  
    return formatted.join('');
  }

function formatExpiryDate(value) {
    const input = value.replace(/\D/g, ''); // Remove non-digit characters
    const month = input.substring(0, 2);
    let year = input.substring(2, 4);
    let formatedDate;
    if (parseInt(month) > 12) {
        formatedDate = month.substring(0, 1);
         
    } else if (year) {
        formatedDate = month + '/' + year;
    } else {
        return month;
    }
    inputExpiryDate.value = formatedDate;
    return formatedDate;
  }


// Function to update the display fields with default or input values
function displayInputValues(input) {
  const currentDisplayElement = getOutputElement(input);

  if (input.value.length === 0) {
    currentDisplayElement.innerText =
      defaultValue[input.id.replace("input", "")];
  } else {
    if (input.id === "inputCardNum") {
      currentDisplayElement.innerText = formatCardNumber(input.value);
    }
    else if(input.id === "inputExpiryDate"){
        currentDisplayElement.innerText = formatExpiryDate(input.value);
    }
    else {
      currentDisplayElement.innerText = input.value;
    }
  }
}

// Event listeners for input fields
document.querySelectorAll("input").forEach((input) => {
  input.addEventListener("focus", () => {
    const outputField = getOutputElement(input);
    if (outputField) {
      outputField.classList.add("active");
    }
    if (input === inputCVV) {
      cardContainer.classList.add("negativeTransform");
    } else {
      cardContainer.classList.remove("negativeTransform");
    }
  });

  input.addEventListener("blur", () => {
    const outputField = getOutputElement(input);
    if (outputField) {
      outputField.classList.remove("active");
    }
    // Check if no other input is focused, then remove the class
    setTimeout(() => {
      if (document.activeElement.tagName !== "INPUT") {
        cardContainer.classList.remove("negativeTransform");
      }
    }, 0);
  });

  input.addEventListener("input", () => {
    displayInputValues(input);
  });
});

// Initial call to set default values on page load
document.querySelectorAll("input").forEach((input) => {
  displayInputValues(input);
});
