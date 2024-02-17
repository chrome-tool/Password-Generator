document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("generatePasswordButton")
    .addEventListener("click", function () {
      generateAndDisplayPassword();
    });

  document.getElementById("password").addEventListener("input", function (e) {
    updatePasswordStrength(e.target.value);
  });
});

function generateAndDisplayPassword() {
  let length = document.getElementById("passwordLength").value;
  let includeLowercase = document.getElementById("includeLowercase").checked;
  let includeUppercase = document.getElementById("includeUppercase").checked;
  let includeNumbers = document.getElementById("includeNumbers").checked;
  let includeSymbols = document.getElementById("includeSymbols").checked;
  let generatedPassword = generatePassword(
    length,
    includeLowercase,
    includeUppercase,
    includeNumbers,
    includeSymbols
  );

  let password = document.getElementById("password");
  password.value = generatedPassword;
  updatePasswordStrength(generatedPassword);
}

function generatePassword(
  length,
  includeLowercase,
  includeUppercase,
  includeNumbers,
  includeSymbols
) {
  if (
    !(includeLowercase || includeUppercase || includeNumbers || includeSymbols)
  ) {
    showModal("Please select at least one checkbox.");
    return "";
  }
  let charset = "";
  if (includeLowercase) {
    charset += "abcdefghijklmnopqrstuvwxyz";
  }
  if (includeUppercase) {
    charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  }
  if (includeNumbers) {
    charset += "0123456789";
  }
  if (includeSymbols) {
    charset += "!@#$%^&*()-_=+[]{}|;:,.<>?";
  }

  let password = "";
  for (let i = 0; i < length; i++) {
    let randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
}

function getPasswordStrength(password) {
  let length = password.length;
  let hasUpperCase = /[A-Z]/.test(password);
  let hasLowerCase = /[a-z]/.test(password);
  let hasNumber = /\d/.test(password);
  let hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password);

  let strength = 0;

  if (length >= 8) strength++;
  if (hasUpperCase) strength++;
  if (hasLowerCase) strength++;
  if (hasNumber) strength++;
  if (hasSpecialChar) strength++;

  return strength;
}

function generateDynamicImage(strength) {
  let canvas = document.createElement("canvas");
  canvas.width = 240;
  canvas.height = 20;
  let context = canvas.getContext("2d");
  let color = "";
  switch (strength) {
    case 0:
    case 1:
      color = "red";
      break;
    case 2:
    case 3:
      color = "orange";
      break;
    case 4:
    case 5:
      color = "green";
      break;
    default:
      color = "red";
  }

  context.fillStyle = color;
  let barLength = (strength + 1) * 40;
  context.fillRect(0, 0, barLength, canvas.height);

  let imageDataURL = canvas.toDataURL();
  let image = new Image();
  image.src = imageDataURL;
  return image;
}

function updatePasswordStrength(password) {
  let strength = getPasswordStrength(password);

  let passwordStrengthDiv = document.getElementById("password-strength");
  passwordStrengthDiv.innerHTML = `<p>Password Strength: ${strength}</p>`;
  let dynamicImage = generateDynamicImage(strength);
  passwordStrengthDiv.appendChild(dynamicImage);
}

function showModal(message) {
  var modal = document.getElementById("modal");
  var modalContent = document.querySelector(".modal-content p");
  modalContent.textContent = message;
  modal.style.display = "block";
  var closeBtn = document.querySelector(".close");
  closeBtn.onclick = function () {
    modal.style.display = "none";
  };
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
}
