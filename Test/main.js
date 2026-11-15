const cars = [
  { type: "Sedan", name: "Honda Accord", description: "Comfortable midsize sedan with great fuel economy.", year: 2022 },
  { type: "Sedan", name: "Toyota Camry", description: "Reliable and roomy, perfect for daily driving.", year: 2021 },
  { type: "SUV", name: "Ford Explorer", description: "Three rows of seating for the whole family.", year: 2023 },
  { type: "SUV", name: "Subaru Outback", description: "All-wheel drive and plenty of cargo space.", year: 2022 },
  { type: "Truck", name: "Ford F-150", description: "Powerful pickup for hauling and towing.", year: 2023 },
  { type: "Truck", name: "Chevrolet Silverado", description: "Tough, capable truck for any job.", year: 2021 },
  { type: "Convertible", name: "Mazda MX-5 Miata", description: "Open-air fun on a winding road.", year: 2022 },
  { type: "Convertible", name: "Ford Mustang", description: "Classic muscle car with a drop top.", year: 2020 },
  { type: "Van", name: "Chrysler Pacifica", description: "Spacious minivan with sliding doors.", year: 2023 },
  { type: "Van", name: "Honda Odyssey", description: "Family-friendly van with lots of features.", year: 2021 }
];

function displayCars(carList) {
  const container = document.getElementById("car-list");
  container.innerHTML = "";

  if (carList.length === 0) {
    container.textContent = "No cars found.";
    return;
  }

  carList.forEach((car) => {
   
    const card = document.createElement("div");
    card.classList.add("car");

    const title = document.createElement("h3");
    title.textContent = `${car.year} ${car.name}`;

    const type = document.createElement("p");
    type.textContent = `Type: ${car.type}`;

    const desc = document.createElement("p");
    desc.textContent = car.description;

    card.appendChild(title);
    card.appendChild(type);
    card.appendChild(desc);
    container.appendChild(card);
  });
}

function listCars() {
  const params = new URLSearchParams(window.location.search);

  if (params.has("type")) {
    const type = params.get("type");
    const filtered = cars.filter(
      (car) => car.type.toLowerCase() === type.toLowerCase()
    );
    displayCars(filtered);
  } else {
    displayCars(cars);
  }
}


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

const searchButton = document.getElementById("search-button");

if (searchButton) {
  searchButton.addEventListener("click", function (event) {
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
}