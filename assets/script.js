var channelName = 'ChilledCow'
var vidWidth = 500;
var vidHeight = 400;
var vidResults = 10;
var giphyKey = "QeZln7OG6yXYytcjQlLCiVx57XHRsfoM"
var giphyURL = "https://api.giphy.com/v1/gifs/random?api_key=QeZln7OG6yXYytcjQlLCiVx57XHRsfoM&tag=britneyspears"
var giphyBURL = "https://api.giphy.com/v1/gifs/random?api_key=QeZln7OG6yXYytcjQlLCiVx57XHRsfoM&tag=kanyewest"

//specific cocktail api
const specificURL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s="
//random cocktail api
const randomURL = "https://www.thecocktaildb.com/api/json/v1/1/random.php"
$(document).ready(function() {
    //day.js displays current day, date at the top of the page
    var currentDate = dayjs().format("dddd, MMMM D YYYY");
    $("#currentDay").text(currentDate);
    //event listener for random cocktail generator
    $("#random-button").click(function(e){
        event.preventDefault();
        //clear out previous ingredients and amounts
        $("#ran-rec-ingredients").empty();
        $("#ran-rec-specs").empty();
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
        //clear out ingredient and amounts from previous search
        $("#rec-ingredients").empty();
        $("#rec-specs").empty();
        // console.log("clicked ya")
        var cocktail = $("#drink-input").val().trim();
        //ajax call for specific recipe search
        $.ajax({
            url: specificURL + cocktail,
            type: "GET",
            datatype: "jsonp",
            success: function(data){
                console.log(data);
                var drink = data.drinks[0]
                var cocktailName = drink.strDrink;
                var cocktailMethod = drink.strInstructions;
                var ingredients = getSpecs(drink);
                $(".recipe-name").html("<h5>Drink Name: " + cocktailName + "</h5>");
                $(".method").html("<h5>" + cocktailMethod + "</h5>");
                for (var i = 0; i < ingredients.length; i++){
                    console.log(ingredients[i]);
                    var currentIngredient = $("#rec-ingredients").html();
                    $("#rec-ingredients").html(currentIngredient + "<h5>" + ingredients[i].ingredient + "</h5>")
                    var currentSpec = $("#rec-specs").html();
                    $("#rec-specs").html(currentSpec + "<h5>" + ingredients[i].amount + "</h5>");
                }
            }
        })
    })

    //event listener for drinking with friends
    $("#friends").click(function(e){
        event.preventDefault();
        console.log("clicked");
        $.ajax({
            url: giphyURL,
            method: "GET"
        }).then(function(response) {
            var imageURL = response.data.image_original_url;
            $("#gif-space").attr("src", imageURL);
            $("#gif-space").attr("alt", "image of friends");
        })
    })
});

//function to retrieve drink ingredient and specifications from cocktail api and reformat them
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

//get videos from youtube api
$(".search-button").click(function(e) {
    event.preventDefault();
    $.ajax({
        type: 'GET',
        url: 'https://www.googleapis.com/youtube/v3/search',
        data: {
            key: 'AIzaSyBvgwt3NdWSXMMRifxXgWUNe4McILF_eco',
            q: "beegees",
            part: 'snippet',
            maxResults: 1,
            type: 'video',
            videoEmbeddable: true,
        },
        success: function(data){
            embedVideo(data)
            console.log(data)
        },
        error: function(response){
            console.log("Request Failed");
        }
      });
  });
  //embed said videos onto page
  function embedVideo(data) {
    $('iframe').attr('src', 'https://www.youtube.com/embed/' + data.items[0].id.videoId)
    $('h3').text(data.items[0].snippet.title)
    $('.description').text(data.items[0].snippet.description)
}

//navbar-burger functionality
document.addEventListener('DOMContentLoaded', () => {

    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
  
    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {
  
      // Add a click event on each of them
      $navbarBurgers.forEach( el => {
        el.addEventListener('click', () => {
  
          // Get the target from the "data-target" attribute
          const target = el.dataset.target;
          const $target = document.getElementById(target);
  
          // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
          el.classList.toggle('is-active');
          $target.classList.toggle('is-active');
  
        });
      });
    }
  
  });
//event listener for youtube search

    
//     //ajax call for youtube search
//     $.ajax({
//         url: specURL,
//         type: "GET",
//         datatype: "jsonp",
//         success: function(data){
//             console.log(data)
        
//         }
//     });
// });

// $.get(
//     "https://www.googleapis.com/youtube/v3/channels",{
//         part: 'contentDetails',
//         forUsername: channelName,
//         key: 'AIzaSyBA6QxZm934iIkmS_3KtfzVjbPboIePXX4'},
//         function(data){
//             $.each(data.items, function(i, item){
//             //console.log(item);
//                 pid = item.contentDetails.relatedPlaylists.uploads;
//                 getVids(pid);
//             })
//         }
// )}
// )
// $(".search-button").click(function(e){
//     event.preventDefault();

//     $.ajax({
//             url: "https://www.googleapis.com/youtube/v3/playlists",
//             type: "GET",
//             part: 'snippet',
//             maxResults: vidResults,
//             playlistId: "PLQ2Y38pIJZZePQf5aHaeKAcgrrfWqltZT",
//             key: 'AIzaSyBA6QxZm934iIkmS_3KtfzVjbPboIePXX4'},
//             function(data){
//                 var output;
//                 $.each(data.items, function(i,item){
//                     console.log(item);
//                     videTitle = item.snippet.title;
//                     videoId = item.snippet.resourceId.videoId;

//                     output = '<li><iframe height="'+vidHeight+'" width="'+vidWidth+'" src=\"//www.youtube.com/embed/'+videoId+'\"</iframe></li>'

//                     $('.results').append(output);
//                 })
//     });
// });

$("#games").click(function(e){
    event.preventDefault();
    console.log("clicked");
    $.ajax({
        url: giphyBURL,
        method: "GET"
    }).then(function(response) {
        var imageURL = response.data.image_original_url;
        $("#gif-space2").attr("src", imageURL);
        $("#gif-space2").attr("alt", "image of ye");
    })
})