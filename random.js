let random = document.querySelector("#searchBtn")

random.addEventListener("click", async () => {
    console.log("Random")
    const card = document.querySelector(".card2")
    card.innerHTML = "<p>Loading...</p>"

    const URL = "https://www.themealdb.com/api/json/v1/1/random.php"
    const response = await fetch(URL)
    const data = await response.json()
    console.log("Got")

    card.innerHTML = ""
    if(data.meals && data.meals.length > 0){
        const meal = data.meals[0];

        let ingredients = ""
        for(let i=0; i<=5; i++){
            const ingredient = meal[`strIngredient${i}`]
            const measure = meal[`strMeasure${i}`]
            console.log(ingredient, measure)
            if(ingredient && ingredient.trim() !== ""){
                ingredients += `<li>${ingredient} - ${measure}</li>`
            }
        }

        card.innerHTML = `
  <div class="meal-container" style="display:flex; gap:25px; align-items:flex-start; justify-content:center;">
    <div class="meal-left" style="flex:1; text-align:center;">
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}" width="500" height="400" style="border-radius:10px; box-shadow:0 0 10px rgba(0,0,0,0.3);">
    </div>

    <div class="meal-right" style="flex:1; color:white;">
    <h3 style="margin-top:12px; margin-bottom:8px; color:white;">${meal.strMeal}</h3><br>
      <p style="color:white;"><strong>Id:</strong> ${meal.idMeal}</p>
      <p style="color:white;"><strong>Cuisine:</strong> ${meal.strArea || "Not specified"}</p>
      <p><strong>Category:</strong> ${meal.strCategory || "Not specified"}</p>
      <p><strong>Maximum 5 Ingredients:</strong></p>
      <ul style="margin-left:20px; line-height:1.6;">${ingredients}</ul>
    </div>
  </div>

  <div class="meal-instructions" style="margin-top:30px; color:white;">
    <h3 style="margin-bottom:10px; ">Instructions</h3>
    <p style="line-height:1.8;">${meal.strInstructions}</p>
  </div>
`;


    }
})