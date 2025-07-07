// Create main calculator container
const container = document.createElement("div");
container.className = "container d-flex flex-column align-items-center justify-content-center vh-100";

// Create display input
const display = document.createElement("input");
display.setAttribute("type", "text");
display.className = "form-control mb-3 text-end fs-2";
display.style.width = "300px";
display.style.height = "60px";
display.readOnly = true;
display.placeholder = "0";
container.appendChild(display);

// Define button layout
const buttons = [
  ["C", "←", "%", "/"],
  ["7", "8", "9", "*"],
  ["4", "5", "6", "-"],
  ["1", "2", "3", "+"],
  ["0", "00", ".", "="]
];

// Function to handle button clicks
function handleClick(value) {
  if (value === "C") {
    display.value = "";
  } else if (value === "←") {
    display.value = display.value.slice(0, -1);
  } else if (value === "=") {
    try {
      display.value = eval(display.value);
    } catch {
      alert("Invalid Expression");
    }
  } else {
    display.value += value;
  }
}

// Generate buttons using DOM
buttons.forEach(row => {
  const rowDiv = document.createElement("div");
  rowDiv.className = "d-flex justify-content-center mb-2";

  row.forEach(label => {
    const btn = document.createElement("button");
    btn.innerText = label;
    btn.className = "btn btn-outline-dark mx-1";
    btn.style.width = label === "=" ? "150px" : "60px";
    btn.style.height = "60px";

    // Styling
    if (label === "C") btn.classList.add("text-danger");
    if (label === "=") btn.classList.add("btn-primary", "text-white");

    btn.addEventListener("click", () => handleClick(label));
    rowDiv.appendChild(btn);
  });

  container.appendChild(rowDiv);
});

// Append calculator to body
document.body.appendChild(container);

// Keyboard input handling
document.addEventListener("keydown", (e) => {
  const key = e.key;
  const allowed = "0123456789+-*/.%";

  if (allowed.includes(key)) {
    display.value += key;
  } else if (key === "Backspace") {
    display.value = display.value.slice(0, -1);
  } else if (key === "Enter") {
    try {
      display.value = eval(display.value);
    } catch {
      alert("Invalid Expression");
    }
  } else {
    alert("Only numbers are allowed");
  }
});
