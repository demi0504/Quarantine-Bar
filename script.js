var channelName = 'ChilledCow'
var vidWidth = 500;
var vidHeight = 400;
var vidResults = 10;


//specific cocktail api
const specificURL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s="
//random cocktail api
const randomURL = "https://www.thecocktaildb.com/api/json/v1/1/random.php"
//youtube search api
const specURL = "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=PL45D8CC8A81B1066E&key=AIzaSyBA6QxZm934iIkmS_3KtfzVjbPboIePXX4"
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
    
    //event listener for youtube search
    $(".search-button").click(function(e){
        event.preventDefault();
        
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

    $.get(
        "https://www.googleapis.com/youtube/v3/channels",{
            part: 'contentDetails',
            forUsername: channelName,
            key: 'AIzaSyBA6QxZm934iIkmS_3KtfzVjbPboIePXX4'},
            function(data){
                $.each(data.items, function(i, item){
                //console.log(item);
                    pid = item.contentDetails.relatedPlaylists.uploads;
                    getVids(pid);
                })
            }
    )}
    )
    
    function getVids(pid){
        $.get(
            "https://www.googleapis.com/youtube/v3/playlistItems",{
                part: 'snippet',
                maxResults: vidResults,
                playlistId: pid,
            key: 'AIzaSyBA6QxZm934iIkmS_3KtfzVjbPboIePXX4'},
                function(data){
                    var output;
                    $.each(data.items, function(i,item){
                        console.log(item);
                        videTitle = item.snippet.title;
                        videoId = item.snippet.resourceId.videoId;

                        output = '<li><iframe height="'+vidHeight+'" width="'+vidWidth+'" src=\"//www.youtube.com/embed/'+videoId+'\"</iframe></li>'

                        $('.results').append(output);
                    })
                }
        )
    }

});
var currentTime = dayjs().format("H");

var currentDate = dayjs().format("dddd, MMMM D YYYY");
$("#currentDay").text(currentDate);
var currentTime = dayjs().format("H");