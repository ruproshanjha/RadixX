function convert() {
    const fromSystem = document.getElementById("from-system").value;
    const toSystem = document.getElementById("to-system").value;
    const inputNumber = document.getElementById("input-number").value;

    let decimalNumber;

    // Separate the integer and fractional parts
    let [integerPart, fractionalPart] = inputNumber.split('.');

    // Convert the integer part to decimal
    if (fromSystem === "binary") {
        decimalNumber = parseInt(integerPart, 2);
    } else if (fromSystem === "decimal") {
        decimalNumber = parseInt(integerPart, 10);
    } else if (fromSystem === "hexadecimal") {
        decimalNumber = parseInt(integerPart, 16);
    } else if (fromSystem === "octal") {
        decimalNumber = parseInt(integerPart, 8);
    }

    // Convert fractional part to decimal if it exists
    let fractionalDecimal = 0;
    if (fractionalPart) {
        if (fromSystem === "binary") {
            fractionalDecimal = convertFractionToDecimal(fractionalPart, 2);
        } else if (fromSystem === "hexadecimal") {
            fractionalDecimal = convertFractionToDecimal(fractionalPart, 16);
        } else if (fromSystem === "octal") {
            fractionalDecimal = convertFractionToDecimal(fractionalPart, 8);
        }
    }

    // Combine integer and fractional parts
    decimalNumber += fractionalDecimal;

    let convertedNumber;
    
    // Convert the decimal number to the desired system
    if (toSystem === "binary") {
        convertedNumber = decimalToBase(decimalNumber, 2);
    } else if (toSystem === "decimal") {
        convertedNumber = decimalNumber.toString(10);
    } else if (toSystem === "hexadecimal") {
        convertedNumber = decimalToBase(decimalNumber, 16).toUpperCase();
    } else if (toSystem === "octal") {
        convertedNumber = decimalToBase(decimalNumber, 8);
    }

    // Display the result in the result input box
    document.getElementById("result-number").value = convertedNumber;
}

// Helper function to convert fractional part to decimal
function convertFractionToDecimal(fraction, base) {
    let decimal = 0;
    for (let i = 0; i < fraction.length; i++) {
        decimal += parseInt(fraction[i], base) / Math.pow(base, i + 1);
    }
    return decimal;
}

// Helper function to convert decimal to any base (with fraction)
function decimalToBase(decimal, base) {
    let integerPart = Math.floor(decimal);
    let fractionalPart = decimal - integerPart;
    
    let result = integerPart.toString(base);
    
    // If there's a fractional part, convert it
    if (fractionalPart > 0) {
        result += '.';
        for (let i = 0; i < 10 && fractionalPart !== 0; i++) {  // Limit to 10 digits of precision
            fractionalPart *= base;
            let fractionalInteger = Math.floor(fractionalPart);
            result += fractionalInteger.toString(base);
            fractionalPart -= fractionalInteger;
        }
    }
    
    return result;
}