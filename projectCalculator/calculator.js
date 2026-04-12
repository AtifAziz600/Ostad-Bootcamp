const firstInput = document.querySelector('#firstInput');
const secondInput = document.querySelector('#secondInput');

const result = document.querySelector('#result');

document.querySelector('#addBtn').addEventListener('click', () => {
    const firstNumber = parseFloat(firstInput.value);
    const secondNumber = parseFloat(secondInput.value);

    result.textContent = firstNumber + secondNumber;
});

document.querySelector('#subBtn').addEventListener('click', () => {
    const firstNumber = parseFloat(firstInput.value);
    const secondNumber = parseFloat(secondInput.value);

    result.textContent = firstNumber - secondNumber;
});

document.querySelector('#mulBtn').addEventListener('click', () => {
    const firstNumber = parseFloat(firstInput.value);
    const secondNumber = parseFloat(secondInput.value);

    result.textContent = firstNumber * secondNumber;
});

const modal = document.getElementById('modalBox');
const overlay = document.getElementById('overlay');

document.querySelector('#divBtn').addEventListener('click', () => {
    const firstNumber = parseFloat(firstInput.value);
    const secondNumber = parseFloat(secondInput.value);

    if (secondNumber == 0) {
        modal.classList.remove('dontsee');
        overlay.classList.remove('dontsee');
        // result.textContent = "Infinity";
    } else {
        result.textContent = firstNumber / secondNumber;
    }
});

const closeModalBtn = document.getElementById('closeModalBtn');
closeModalBtn.addEventListener('click', () => {
    modal.classList.add('dontsee');
    overlay.classList.add('dontsee');
});