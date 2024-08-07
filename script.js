const inputCardNum = document.getElementById('inputCardNum');
const inputHolderName = document.getElementById('inputHolderName');
const inputExpiryDate = document.getElementById('inputExpiryDate');
const inputCVV = document.getElementById('inputCVV');

const displayCardNum = document.getElementById('dispCardNum');
const displayHolderName = document.getElementById('dispHolderName');
const displayExpiryDate = document.getElementById('dispExpiryDate');
const displayCVV = document.getElementById('dispCVV');

const cardContainer = document.getElementById('card-container');

function getOutputElement(input) {
    switch (input.id) {
        case 'inputCardNum':
            return displayCardNum;
        case 'inputHolderName':
            return displayHolderName;
        case 'inputExpiryDate':
            return displayExpiryDate;
        case 'inputCVV':
            return displayCVV;
        default:
            return null;
    }
}

document.querySelectorAll('input').forEach(input => {
    input.addEventListener('focus', () => {
        const outputField = getOutputElement(input);
        if (outputField) {
            outputField.classList.add('active');
        }
        if (input === inputCVV) {
            cardContainer.classList.add('negativeTransform');
        } else {
            cardContainer.classList.remove('negativeTransform');
        }
    });

    input.addEventListener('blur', () => {
        const outputField = getOutputElement(input);
        if (outputField) {
            outputField.classList.remove('active');
        }
        // Check if no other input is focused, then remove the class
        setTimeout(() => {
            if (document.activeElement.tagName !== 'INPUT') {
                cardContainer.classList.remove('negativeTransform');
            }
        }, 0);
    });

    input.addEventListener('input', () => {
        const outputField = getOutputElement(input);
        if (outputField) {
            outputField.textContent = input.value;
        }
    });
});
