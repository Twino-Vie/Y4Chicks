document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("chickForm");

    form.addEventListener("submit"),
        function (event) {
            event.preventDefault();

            // Get form data
            const chickType = document.getElementById("chickType").value;
            const numChicks = parseInt(document.getElementById("numChicks").value);
            const chickCategory = document.getElementById("chickCategory").value;
            const chickAge = parseInt(document.getElementById("chickAge").value);
            const farmerType = document.getElementById("farmerType").value;
            const dateAdded = document.getElementById("dateAdded").value;
            const message = document.getElementById("resultMessage");
            // Validation1
            if (!chickType || !numChicks || !chickAge || !dateAdded || !chickCategory) {
                alert("Please fill in all fields.");
                return;
            }

            if (numChicks <= 0 || chickAge < 0) {
                alert("Please enter valid numbers.");
                return;
            }

            if (farmerType === "Starter" && numChicks !== 100) {
                alert("Starters must request exactly 100 chicks.");
                return;
            } else if (
                farmerType === "Returning" &&
                (numChicks < 101 || numChicks > 500)
            ) {
                alert("Returning farmers can request up to 500 chicks.");
                return;
            }
            // Display confirmation
            message.textContent = "✅ Chick request submitted successfully!";

            //reset form
            form.reset();
        };

});

function handleLogout() {
    // Optional: clear local/session storage if using auth
    // localStorage.clear();
    // sessionStorage.clear();

    alert("You have been logged out.");
    window.location.href = ".."; // redirect to login or landing page
}
