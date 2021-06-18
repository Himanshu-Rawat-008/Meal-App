function removeFavourite(id, favList) {
  // return all id not equal to given id
  favList = favList.filter((data) => {
    return data.idMeal != id;
  });

  // update list
  localStorage.setItem("favList", JSON.stringify(favList));
  location.reload();
}

// accessing details one by one
function fetchDetails(meal, favList) {
  // container for meal
  let container = document.querySelector(".container");

  // create div for each meal
  let meals = document.createElement("div");
  meals.classList.add("meals");
  container.appendChild(meals);

  // name
  let mealName = document.createElement("div");
  mealName.classList.add("meal-name");
  mealName.innerHTML = meal.strMeal;
  meals.appendChild(mealName);

  // image of meal
  let mealImageContainer = document.createElement("div");
  mealImageContainer.classList.add("meal-img");
  let mealImg = document.createElement("img");
  mealImg.src = meal.strMealThumb;
  mealImageContainer.appendChild(mealImg);
  meals.appendChild(mealImageContainer);

  // remove button
  let removeButton = document.createElement("div");
  removeButton.classList.add("remove-button");
  let btn = document.createElement("button");
  btn.innerHTML = "Remove from Favourite";
  btn.onclick = function () {
    removeFavourite(meal.idMeal, favList);
  };
  removeButton.appendChild(btn);
  meals.appendChild(removeButton);
}

window.onload = function () {
  // On load if there is not favlist exists
  if (
    localStorage.getItem("favList") == null ||
    localStorage.getItem("favList") == "" ||
    localStorage.getItem("favList").length == 0
  )
    document.querySelector(".container").innerHTML = "Nothing Here";
  // if it exists
  else {
    // parsing json data
    let favList = JSON.parse(localStorage.getItem("favList"));

    for (let i = 0; i < favList.length; i++) {
      fetchDetails(favList[i], favList);
    }
  }
};
