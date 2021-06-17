let searchWrapper = document.querySelector(".search-input");
// input box
let inputBox = searchWrapper.querySelector("input");

// if user press any key and release
inputBox.onkeyup = (e) => {
  // user enetered data
  let userData = e.target.value;

  fetchMealData(userData);
};

// so we can access in Meal Detail Page
function select(id) {
  localStorage.setItem("idMeal", id);
  return true;
}

// add to favourite list
function addToFavourite(meal) {
  let favList;

  // if there is  not favList exists
  if (
    localStorage.getItem("favList") == null ||
    localStorage.getItem("favList") == ""
  ) {
    favList = [];
  }
  // if it exists
  else {
    favList = JSON.parse(localStorage.getItem("favList"));

    // check if meal already exists
    for (let j = 0; j < favList.length; j++) {
      console.log(favList[j].idMeal);
      if (meal.idMeal == favList[j].idMeal) {
        alert("Already Added");
        return;
      }
    }
  }

  // if meal doest not exists push into array
  favList.push(meal);
  localStorage.setItem("favList", JSON.stringify(favList));
}

// fetching data on basis of user input
function fetchMealData(userData) {
  let emptyArray = [];

  let mealContainer = document.querySelector(".meal-container");
  // remove all prev data and update with new results
  mealContainer.innerHTML = "";

  // if search box is empty return nothing
  if (userData == "") return;

  // create api request
  var xhrRequest = new XMLHttpRequest();
  xhrRequest.onload = function () {
    var responseJSON = JSON.parse(xhrRequest.response);

    // if nothing found
    if (!responseJSON.meals) return;

    // filtering array value
    emptyArray = responseJSON.meals.filter((data) => {
      return data;
    });

    emptyArray = emptyArray.map((data) => {
      // create li tag inside mealcontainer
      let li = document.createElement("li");

      // name
      let a = document.createElement("a");
      a.innerHTML = data.strMeal;

      // Link to acces Meal Detail Page
      a.href = "meal.html";
      a.target = "_blank";
      a.onclick = function () {
        select(data.idMeal);
      };
      li.appendChild(a);

      // image
      let img = document.createElement("img");
      img.src = data.strMealThumb;
      li.appendChild(img);

      // add favourite button
      let btn = document.createElement("button");
      btn.onclick = function () {
        addToFavourite(data);
      };
      btn.innerHTML = "Add To Favourite";
      li.appendChild(btn);

      mealContainer.appendChild(li);
    });
  };

  xhrRequest.onerror = function () {
    console.log("Request fail");
  };

  let url = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + userData;
  xhrRequest.open("get", url, true);
  //make request to server
  xhrRequest.send();
}
