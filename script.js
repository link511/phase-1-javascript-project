function toggleCategory() {
 
 
//Make the category (the menu on the left) appear and disappear everytime the user click the menu button
//If the display property of the div in CSS is "block", change it to "none" and vice versa
const categories = document.querySelector("#categories");

//using Style display Property to change the display property of the #category in CSS
  if (categories.style.display == "none") {
    categories.style.display = "block";
  } else {
    categories.style.display = "none";
  }
}


// Testing
console.log(categories);

// fetching the categories data from API
fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
  .then((response) => response.json())
  .then((data) => {
    const categories = document.querySelector("#categories");
    data.categories.forEach((category) => {
      const li = document.createElement("li");
      const img = document.createElement("img");
      img.src = category.strCategoryThumb;
      const p = document.createElement("p");
      p.innerHTML = category.strCategory;
      li.appendChild(img);
      li.appendChild(p);
      categories.appendChild(li);
    });
  });

// fetching the random meal data from API
function randomMeal() {
  fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    .then((response) => response.json())
    // {
    //   var test = response.json();
    //   console.log(test);
    // }
    .then((data) => {
      const meal = data.meals[0];
      const div = document.querySelector("div.random-meal");
      const img = div.querySelector("img");
      img.src = meal.strMealThumb;
      const h2 = div.querySelector("h2");
      h2.innerHTML = meal.strMeal;

      const ingredients = document.querySelector("div.ingredients");
      ingredients.innerHTML = "<h3>Ingredients</h3>";
      const unorderedList = document.createElement("ul");
      for (const [key, value] of Object.entries(meal)) {
        if (key.includes("strIngredient") && !(!value || value.length === 0)) {
          const ingredient = document.createElement("li");
          ingredient.innerHTML = value;
          unorderedList.appendChild(ingredient);
        }
      }
      ingredients.appendChild(unorderedList);
      const instructions = document.querySelector("div.instructions");
      instructions.innerHTML = "<h3>Instructions</h3>";
      const instruction = document.createElement("p");
      instruction.innerHTML = meal.strInstructions;
      instructions.appendChild(instruction);
    });
}

