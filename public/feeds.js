document.addEventListener('DOMContentLoaded', function () {
  const quantityInput = document.getElementById("quantity");
  const unitCostInput = document.getElementById("unitCost");
  const totalCostDisplay = document.getElementById("totalCostDisplay");

  function updateTotalCost() {
    const quantity = parseInt(quantityInput.value) || 0;
    const unitCost = parseInt(unitCostInput.value) || 0;
    totalCostDisplay.value = quantity * unitCost;
  }

  quantityInput.addEventListener("input", updateTotalCost);
  updateTotalCost(); // Initialize on load
});


