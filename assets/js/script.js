document.addEventListener("DOMContentLoaded", function () {
  const passwordEl = document.getElementById("password");
  const lengthEl = document.getElementById("length");
  const lengthValueEl = document.getElementById("lengthValue");
  const uppercaseEl = document.getElementById("uppercase");
  const lowercaseEl = document.getElementById("lowercase");
  const numbersEl = document.getElementById("numbers");
  const symbolsEl = document.getElementById("symbols");
  const generateBtn = document.getElementById("generateButton");
  const copyBtn = document.getElementById("copyButton");
  const copiedMessage = document.querySelector(".copied-message");
  const strengthMeter = document.querySelector(".strength-meter-fill");
  const strengthText = document.querySelector(".strength-text");

  function generatePassword() {
    const length = +lengthEl.value;
    const hasUpper = uppercaseEl.checked;
    const hasLower = lowercaseEl.checked;
    const hasNumber = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;

    const password = generatePasswordLogic(
      length,
      hasUpper,
      hasLower,
      hasNumber,
      hasSymbol
    );
    passwordEl.value = password;
    updateStrengthMeter(password);
  }

  function generatePasswordLogic(length, upper, lower, number, symbol) {
    let generatedPassword = "";
    const typesCount = upper + lower + number + symbol;
    const typesArr = [{ upper }, { lower }, { number }, { symbol }].filter(
      (item) => Object.values(item)[0]
    );

    if (typesCount === 0) {
      return "";
    }

    for (let i = 0; i < length; i += typesCount) {
      typesArr.forEach((type) => {
        const funcName = Object.keys(type)[0];
        generatedPassword += randomFunc[funcName]();
      });
    }

    return generatedPassword.slice(0, length);
  }

  const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol,
  };

  function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
  }

  function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
  }

  function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
  }

  function getRandomSymbol() {
    const symbols = "!@#$%^&*(){}[]=<>/,.";
    return symbols[Math.floor(Math.random() * symbols.length)];
  }

  function copyToClipboard() {
    passwordEl.select();
    document.execCommand("copy");
    copiedMessage.style.opacity = "1";
    setTimeout(() => {
      copiedMessage.style.opacity = "0";
    }, 2000);
  }

  function updateStrengthMeter(password) {
    const strength = calculatePasswordStrength(password);
    let color = "";
    let strengthLabel = "";

    if (strength > 80) {
      color = "#22c55e";
      strengthLabel = "Strong";
    } else if (strength > 60) {
      color = "#eab308";
      strengthLabel = "Medium";
    } else if (strength > 30) {
      color = "#f97316";
      strengthLabel = "Weak";
    } else {
      color = "#ef4444";
      strengthLabel = "Very Weak";
    }

    strengthMeter.style.width = `${strength}%`;
    strengthMeter.style.backgroundColor = color;
    strengthText.textContent = `Password Strength: ${strengthLabel}`;
    strengthText.style.color = color;
  }

  function calculatePasswordStrength(password) {
    let strength = 0;
    if (password.length >= 8) strength += 20;
    if (password.length >= 12) strength += 20;
    if (/[A-Z]/.test(password)) strength += 20;
    if (/[a-z]/.test(password)) strength += 20;
    if (/[0-9]/.test(password)) strength += 20;
    if (/[^A-Za-z0-9]/.test(password)) strength += 20;
    return Math.min(100, strength);
  }

  generateBtn.addEventListener("click", generatePassword);
  copyBtn.addEventListener("click", copyToClipboard);
  lengthEl.addEventListener("input", () => {
    lengthValueEl.textContent = lengthEl.value;
    generatePassword();
  });
  [uppercaseEl, lowercaseEl, numbersEl, symbolsEl].forEach((el) => {
    el.addEventListener("change", generatePassword);
  });

  // Generate password on page load
  generatePassword();
});
