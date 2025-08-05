// 
const form = document.getElementById("salesAgentForm");

form.addEventListener("submit", function(event) {
event.preventDefault();
alert("✅ Sales Agent registered successfully!");
form.reset();
});
