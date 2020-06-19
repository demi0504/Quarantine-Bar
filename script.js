//specific cocktail api
//https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita
//random cocktail api
const randomURL = "https://www.thecocktaildb.com/api/json/v1/1/random.php"
$(document).ready(function() {
    //event listener for random cocktail generator
    //ajax call for random cocktail button
    $.ajax({
        url: randomURL,
        type: "GET",
        datatype: "jsonp",
        success: function(data){
            // console.log(data);
            var cocktailName = data.drinks[0].strDrink
            var cocktailMethod = data.drinks[0].strInstructions;
            console.log(cocktailName, cocktailMethod);
            
        }
    });
    //populate cocktail recipe in div
});