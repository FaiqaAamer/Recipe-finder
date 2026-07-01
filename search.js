let searchBox = document.querySelector("#searchBox")
let searchBtn = document.querySelector("#searchBtn")
const card = document.querySelector(".card");

searchBtn.addEventListener("click", async () => {
    let query = searchBox.value.trim()
    if(!query){
        alert("Please enter a meal name!")
        return
    }

    const URL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`

    card.innerHTML = `<br><br><p>Loading...</p>`;

    try{
        const response = await fetch(URL)
        const data = await response.json()
        console.log(data.meals)

        if(!data.meals){
            card.innerHTML = `<p>No Recipe Found</p>`
            return
        }

        card.innerHTML = ""; 


        for(let i=0; i < data.meals.length; i++){
             card.innerHTML += `<div class="meal">
             <img src="${data.meals[i].strMealThumb}" alt="${data.meals[i].strMeal}" height="200" width="200">
             <p><strong>Id:</strong> ${data.meals[i].idMeal}</p>
             <p><strong>Name:</strong> ${data.meals[i].strMeal}</p>
             <button class="viewBtn" data-id="${data.meals[i].idMeal}">View Details</button></div>`
             console.log("Data getted")
        }
        return
    }
    catch(err)
    {
        card.innerHTML = `<br><br><p>Error fetching Recipes</p>`
        return
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

      let ingredients = ""
        for(let i=0; i<=20; i++){
            const ingredient = meal[`strIngredient${i}`]
            const measure = meal[`strMeasure${i}`]
            console.log(ingredient, measure)
            if(ingredient && ingredient.trim() !== ""){
                ingredients += `${ingredient} - ${measure}\n`;
            }
        }

      alert(`Ingredients:\n${ingredients} \nInstructions:\n${meal.strInstructions}`);
    }
  }
});