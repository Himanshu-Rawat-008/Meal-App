const idMeal = localStorage.getItem("idMeal");
let mealName = document.querySelector(".meal-name>h1");
let mealImage = document.querySelector(".meal-image>img");
let mealCategory = document.querySelector(".meal-category");
let mealInstructions = document.querySelector(".meal-instructions");
let mealYoutube = document.querySelector("#youtube");
let mealSource = document.querySelector("#source");

function fetchDetails(idMeal) {
  let meal = document.querySelector(".meal");

  // if search box is empty return nothing
  if (idMeal == "") {
    meal.innerHTML = "No Meal Selected";
    return;
  }

  var xhrRequest = new XMLHttpRequest();
  xhrRequest.onload = function () {
    var responseJSON = JSON.parse(xhrRequest.response);

    let mealDetail = responseJSON.meals[0];

    // name
    mealName.innerHTML = mealDetail.strMeal;

    // image
    mealImage.src = mealDetail.strMealThumb;

    // category
    mealCategory.innerHTML = mealDetail.strCategory;

    // instructions
    mealInstructions.innerHTML = mealDetail.strInstructions;

    //buttons
    mealYoutube.href = mealDetail.strYoutube;
    mealYoutube.target = "_blank";
    mealSource.target = "_blank";
    mealSource.href = mealDetail.strSource;
  };

  xhrRequest.onerror = function () {
    console.log("Request fail");
  };
  let url = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + idMeal;
  xhrRequest.open("get", url, true);
  //make request to server
  xhrRequest.send();
}

fetchDetails(idMeal);
