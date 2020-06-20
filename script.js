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
                data.drinks.forEach(obj => {
                    Object.entries(obj).forEach(([key, value]) => {
                        console.log(`${key} ${value}`);
                    });
                    console.log('-------------------');
                });
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

function newObj(drink) {
    var ingredient = "";
    var amount = "";
    var drink = [];
    //for loop that runs 15 times
    for (var i = 0; i <= 15; i++){
        //at strIngredient[i] if value extract corresponding strMeasure[i]
       if (drink["strIngredient" + i] != null) {
           console.log(drink);
       }
            //create new obj
    }
    return {
        ingredients: [
            { ingredient: "tequila", amount: "1.5 oz"}
        ]
    }
}


// var ingredient1 = data.drinks[0].strIngredient1;
//                 var ingredient2 = data.drinks[0].strIngredient2;
//                 var ingredient3 = data.drinks[0].strIngredient3;
//                 var ingredient4 = data.drinks[0].strIngredient4;
//                 var ingredient5 = data.drinks[0].strIngredient5;
//                 var ingredient6 = data.drinks[0].strIngredient6;
//                 var strMeasure1 = data.drinks[0].strMeasure1;
//                 var strMeasure2 = data.drinks[0].strMeasure2;
//                 var strMeasure3 = data.drinks[0].strMeasure3;
//                 var strMeasure4 = data.drinks[0].strMeasure4;
//                 var strMeasure5 = data.drinks[0].strMeasure5;
//                 var strMeasure6 = data.drinks[0].strMeasure6;