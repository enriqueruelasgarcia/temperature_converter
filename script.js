const valueInput = document.getElementById("valueInput");
const fromSelect = document.getElementById("from");
const toSelect = document.getElementById("to");
const convertButton = document.getElementById("convert");
const res = document.getElementById("res");
const swapButton = document.getElementById("swap-button");

function checkFields() {
    if (valueInput.value && fromSelect.value && toSelect.value) {
        convertButton.disabled = false;
        convertButton.style.opacity = 1;
        convertButton.style.cursor = "pointer";
    } else {
        convertButton.disabled = true;
        convertButton.style.opacity = 0.5;
        convertButton.style.cursor = "not-allowed";
    }
}

valueInput.addEventListener("input", checkFields);
fromSelect.addEventListener("change", checkFields);
toSelect.addEventListener("change", checkFields);

convertButton.addEventListener("click", function() {
    let button = this;
    button.classList.add("converting");
    button.textContent = "Converting";

    setTimeout(function() {
        let fromUnit = fromSelect.value;
        let toUnit = toSelect.value;
        let value = parseFloat(valueInput.value);

        if (isNaN(value)) {
            res.innerHTML = "<p>Please enter a valid number.</p>";
            return;
        }

        let result;

        if (fromUnit === toUnit) {
            res.innerHTML = `<p>Cannot convert from ${fromUnit} to ${toUnit}</p>`;
        } else if (fromUnit === "Celsius" && toUnit === "Farenheit") {
            result = (value * 9 / 5) + 32;
        } else if (fromUnit === "Farenheit" && toUnit === "Celsius") {
            result = (value - 32) * 5 / 9;
        } else if (fromUnit === "Celsius" && toUnit === "Kelvin") {
            result = value + 273.15;
        } else if (fromUnit === "Kelvin" && toUnit === "Celsius") {
            result = value - 273.15;
        } else if (fromUnit === "Farenheit" && toUnit === "Kelvin") {
            result = (value - 32) * 5 / 9 + 273.15;
        } else if (fromUnit === "Kelvin" && toUnit === "Farenheit") {
            result = (value - 273.15) * 9 / 5 + 32;
        }

        res.innerHTML = `<p>${value} ${fromUnit} is equal to ${result.toFixed(2)} ${toUnit}</p>`;

        button.classList.remove("converting");
        button.textContent = "Convert";
    }, 1000);
});


swapButton.addEventListener("click", function() {
    let temp = fromSelect.value;
    fromSelect.value = toSelect.value;
    toSelect.value = temp;

    checkFields();
});