const displayBtn = document.querySelector("#searchBtn")
const card = document.querySelector(".card1")

displayBtn.addEventListener("click", async () => {
    console.log("Clicked")
    card.innerHTML = "<p>Loading...</p>"

    console.log("Fetched")
    card.innerHTML = ""

    for (let i = 0; i < 8; i++) { 
    const response = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
    const data = await response.json();
    const meal = data.meals[0];

    card.innerHTML += `
      <div class="meal">
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <p><strong>Cuisine:</strong> ${meal.strArea || "Not specified"}</p>
        <p><strong>Category:</strong> ${meal.strCategory || "Not specified"}</p>
        <button class="viewBtn" data-id="${meal.idMeal}">View Details</button>
      </div>`;
  }
})

card.addEventListener("click", async (e) => {
  if (e.target.classList.contains("viewBtn")) {
    const mealId = e.target.getAttribute("data-id");
    const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    const response = await fetch(URL);
    const data = await response.json();

    if (data.meals && data.meals.length > 0) {
      const meal = data.meals[0];
      alert(`Id: ${meal.idMeal}\nName: ${meal.strMeal}\n\nInstructions:\n${meal.strInstructions}`);
    }
  }
});