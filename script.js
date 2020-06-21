//specific cocktail api
const specificURL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s="
//random cocktail api
const randomURL = "https://www.thecocktaildb.com/api/json/v1/1/random.php"
$(document).ready(function() {
    //event listener for random cocktail generator
    $("#random-button").click(function(e){
        event.preventDefault();
        
        //ajax call for random cocktail button
        $.ajax({
            url: randomURL,
            type: "GET",
            datatype: "jsonp",
            success: function(data){
                // console.log(data);
                var drink = data.drinks[0]
                var cocktailName = drink.strDrink;
                var cocktailMethod = drink.strInstructions;
                var ingredients = getSpecs(drink);
                //populate cocktail recipe in div
                $(".ran-recipe-name").html("<h5>Drink Name: " + cocktailName + "</h5>");
                $(".ran-method").html("<h5>" + cocktailMethod + "</h5>");

                for (var i = 0; i < ingredients.length; i++){
                    console.log(ingredients[i]);
                    var currentIngredient = $("#ran-rec-ingredients").html();
                    $("#ran-rec-ingredients").html(currentIngredient + "<h5>" + ingredients[i].ingredient + "</h5>")
                    var currentSpec = $("#ran-rec-specs").html();
                    $("#ran-rec-specs").html(currentSpec + "<h5>" + ingredients[i].amount + "</h5>");
                }
                
            }
        });
    });

    //event listener for specific cocktail input
    $("#search-recipe").click(function(e){
        event.preventDefault();
        // console.log("clicked ya")
        var cocktail = $("#drink-input").val().trim();
        //ajax call for specific recipe search
        $.ajax({
            url: specificURL + cocktail,
            type: "GET",
            datatype: "jsonp",
            success: function(data){
                console.log(data);
                var cocktailName = data.drinks[0].strDrink;
                var cocktailMethod = data.drinks[0].strInstructions;
                
                $(".recipe-name").html("<h5>Drink Name: " + cocktailName + "</h5>");
                $(".method").html("<h5>" + cocktailMethod + "</h5>");
            }
        })
    })
});


function getSpecs(drink) {
    console.log(drink);
    var ingredients = [];
    //for loop that runs 15 times
    for (var i = 1; i <= 15; i++){
        var ingredient = "";
        var amount = "";
        //at strIngredient[i] if value extract corresponding strMeasure[i]
       if (drink["strIngredient" + i] != null && drink["strMeasure" + i] != null) {
            ingredient = drink["strIngredient" + i];
           //get corresponding amount
           amount = drink["strMeasure" + i];
           ingredients.push({ingredient, amount});
           console.log("ingredients", ingredients);
       }
    }
    return ingredients;
}

var currentTime = dayjs().format("H");

var currentDate = dayjs().format("dddd, MMMM D YYYY");
$("#currentDay").text(currentDate);
var currentTime = dayjs().format("H");

