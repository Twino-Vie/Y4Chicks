

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("customerForm");

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        const age = parseInt(document.getElementById("age").value);
        const message = document.getElementById("resultMessage");

        if (age < 18 || age > 30) {
            alert("Only youth aged between 18 and 30 can register.");
            return;
        }

        message.textContent = "customer registered successfully!, Thank you for joining our community";
        form.reset();
    });
});
