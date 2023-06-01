const number = "140185005428772";
let text = "";

for (let i = 0; i < number.length; i += 2) {
  const charCode = parseInt(number.substr(i, 2));
  text += String.fromCharCode(charCode);
}

console.log(text);