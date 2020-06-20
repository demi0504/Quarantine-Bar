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
                var cocktailName = data.drinks[0].strDrink;
                var cocktailMethod = data.drinks[0].strInstructions;
                console.log(cocktailName, cocktailMethod);
                //populate cocktail recipe in div
                $(".ran-recipe-name").html("<h5>Drink Name: " + cocktailName + "</h5>");
                $(".ran-method").html("<h5>" + cocktailMethod + "</h5>");
            
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
var currentTime = dayjs().format("H");

var currentDate = dayjs().format("dddd, MMMM D YYYY");
$("#currentDay").text(currentDate);
var currentTime = dayjs().format("H");
