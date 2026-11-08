
function validateSearch() {
  const errors = [];
  const form = document.querySelector(".hero-form form");

  const fields = form.querySelectorAll("input, select");

  fields.forEach((field) => {
    if (field.type === "submit" || field.type === "button") return;

    if (field.value.trim() === "") {
      const label = form.querySelector(`label[for="${field.id}"]`);
      const name = label ? label.textContent.trim() : field.name || field.id;

      errors.push(`${name} is required.`);
    }
  });

  const pickupValue = document.getElementById("pickup-date").value;
  const returnValue = document.getElementById("return-date").value;

  const pickupDate = pickupValue
    ? new Date(pickupValue + "T00:00:00")
    : null;

  const returnDate = returnValue
    ? new Date(returnValue + "T00:00:00")
    : null;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (pickupDate && pickupDate <= today) {
    errors.push("Pickup date must be in the future.");
  }

  if (pickupDate && returnDate && returnDate <= pickupDate) {
    errors.push("Return date must be after the pickup date.");
  }

  return errors;
}

document.getElementById("search-button").addEventListener("click", function (event) {
  const form = document.querySelector(".hero-form form");

  const oldList = form.querySelector("ul.errors");

  if (oldList) {
    oldList.remove();
  }

  const errors = validateSearch();

  if (errors.length > 0) {
    event.preventDefault();

    const ul = document.createElement("ul");
    ul.classList.add("errors");

    errors.forEach((message) => {
      const li = document.createElement("li");
      li.textContent = message;
      ul.appendChild(li);
    });

    form.appendChild(ul);
  }
});
