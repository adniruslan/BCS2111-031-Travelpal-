const getMeals = async (dish) => {
    await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${dish}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
  
        let mainDiv = document.createElement("div");
        mainDiv.setAttribute("id", "results");

        //let subdiv = document.createElement("div");
  
        data.meals.forEach((meal) => {
          let div = document.createElement("div");
          div.classList.add("meal");

          

          
          //fetch meal name
          let name = document.createElement("h2");
          let nameNode = document.createTextNode(`👨🏻‍🍳 ${meal.strMeal}`);
          name.appendChild(nameNode);

          //fetch meal category and give decription
          let category = document.createElement("p");
          let categoryNode = document.createTextNode(`${meal.strMeal} is a famous ${meal.strArea} ${meal.strCategory} dish.  It only cost you a penny for this exclusive dish. Aroi mak mak! Dont forget to try this recipe or you can watch the youtube video belows. Detail recipe can refer to `);
          category.appendChild(categoryNode)

          //link
          let link = document.createElement("a");
          link.setAttribute(
              "href",
              `https://www.youtube.com/watch?v=${meal.strYoutube.slice(-11)}`
          );

          link.setAttribute("target", "_blank");
          let linkNode = document.createTextNode("this link");
                link.appendChild(linkNode);       
          
        
          //flex img and desc
          let container = document.createElement("div");
          container.style.display = "flex";
          container.style.flexWrap = "wrap";
          container.style.padding="20px";
          

           //flex ingredients and step
           let container_2 = document.createElement("div");
           container_2.style.display = "flex";
           container_2.style.flexWrap = "wrap";
           container_2.style.padding="20px";
 

          //create hr
          let hr1 = document.createElement("hr");
          
          let image = document.createElement("img");
          image.setAttribute("src", meal.strMealThumb);
          image.setAttribute("alt", meal.strMeal);
          image.style.maxWidth = "100%";
          
          //iframe
          let yt = document.createElement("iframe");
          yt.setAttribute(
            "src",
            `https://www.youtube.com/embed/${meal.strYoutube.slice(-11)}`
          );
          yt.setAttribute("allowfullscreen", "");
          yt.style.maxWidth = "100%";
        
          let recipe = document.createElement("p");
          let recipeNode = document.createTextNode(meal.strInstructions);
          recipe.appendChild(recipeNode);
        
          let ingredients = document.createElement("ul");
          for (let i = 1; i <= 20; i++) {
            let ingredient = meal[`strIngredient${i}`];
            if (ingredient) {
              let li = document.createElement("li");
              let liNode = document.createTextNode(
                `${ingredient} - ${meal[`strMeasure${i}`]}`
              );
              li.appendChild(liNode);
              ingredients.appendChild(li);
            }
          }
        
          
          //1st sub
          let subcontainer1 = document.createElement("div");
          subcontainer1.style.width = "65%";
          subcontainer1.style.padding = "2%";
          //2nd sub
          let subcontainer2 = document.createElement("div");
          subcontainer2.style.width = "35%";

          //3rd sub
          let subcontainer3 = document.createElement("div");
          subcontainer3.style.width = "35%";
          subcontainer3.style.padding = "3%";
          //4th sub
          let subcontainer4 = document.createElement("div");
          subcontainer4.style.width = "63%";
          subcontainer4.style.padding = "3%";


          //create text
          let text1 = document.createElement("h3");
          let text1Node = document.createTextNode(` 🍽️ Ingredients:`);
          text1.appendChild(text1Node);

          //create text
          let text2 = document.createElement("h3");
          let text2Node = document.createTextNode(` 🍴 Recipe:`);
          text2.appendChild(text2Node);
        
          //create hr2
          const hr2 = document.createElement("hr");
         
          hr2.style.margin= "0";

         
          //append subcontainer
          subcontainer1.appendChild(name);
          subcontainer1.appendChild(categoryNode);
          subcontainer1.appendChild(link);
          subcontainer2.appendChild(image);

          //below sub
          subcontainer3.appendChild(text1);
          subcontainer3.appendChild(ingredients);
          subcontainer4.appendChild(text2);
          subcontainer4.appendChild(recipe);
        
          //append main container
          container.appendChild(subcontainer1);
          container.appendChild(subcontainer2);

          //below
          container_2.appendChild(subcontainer3);
          container_2.appendChild(hr2);
          container_2.appendChild(subcontainer4);


          
          //append main into div
          div.appendChild(container);
          //other element
          div.appendChild(hr1)
          div.appendChild(yt);
          div.appendChild(container_2);
        
          mainDiv.appendChild(div);
        });
  
        let resultsDiv = document.querySelector("#results");
        if (resultsDiv) {
          document.querySelector("main").removeChild(resultsDiv);
        }
        document.querySelector("main").appendChild(mainDiv);
      })
      .catch((err) => console.log(err));
  };
  
  const dishForm = document.querySelector("#dish");
  
  document.addEventListener("DOMContentLoaded", (e) => {
    dishForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (document.querySelector("#menu").value != "") {
        getMeals(document.getElementById("menu").value);
      } else {
        console.log("You must select a dish");
      }
    });
  });
  
//request
function rq(){
  document.querySelector('.submit-menu').addEventListener('mousedown', (e) => {
    e.preventDefault();
    document.querySelector('.request').classList.add('done');
  });  
}
