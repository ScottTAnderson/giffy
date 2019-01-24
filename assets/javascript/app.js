var gameArray = ["mario", "luigi", "princess peach", "legend of zelda", "final fantasy", "bomberman", "master chief", "grand theft auto"];
var buttonNumber = 0;
var buttonApiReadyText = "";
var apiKey = "AY22kSgz8DgT4YerCESK8oFSMFx5XzFd";
var queryURL = "";
var isAnimated = false;

//ajax call to giphy api based on text of button pressed and setting to still image with attributes for animated and data state (data-is-still)
function giphyCall() {
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        for (var i = 0; i < 10; i++) {
            var gifDiv = $("<div class='gif float-left col-2'>");
            var rating = $("<p>").text('Gif Rating: ' + response.data[i].rating);
            var gifStill = response.data[i].images.fixed_height_still.url;
            var gifAnimate = response.data[i].images.fixed_height.url;
            var gifHtml = $("<img class='img-fluid' src=" + gifStill + ">");
            gifHtml.addClass("gifImage image-fluid");
            gifHtml.attr("src", gifStill);
            gifHtml.attr("data-still", gifStill);
            gifHtml.attr("data-animate", gifAnimate);
            gifHtml.attr("data-is-still", true);
            gifDiv.append(gifHtml, rating);
            $(".gifArea").append(gifDiv);
        };
    });
}

//replace all space characters of query text with a plus symbol (i.e. princess peach converts to princess+peach) but not on the last word (princess+peach not princess+peach+)
function removeSpace(arrayElement) {
    var split = gameArray[arrayElement].split(" ");
    var splitPlus = "";
    for (var i = 0; i < split.length - 1; i++) {
        splitPlus += split[i] + "+";
    } splitPlus += split[i];
    buttonApiReadyText = splitPlus;
}

//create buttons to click on and send to GIFFYCALL() based on the array of items at that moment
function createButtons() {
    $('.buttons').html(null);
    for (var i = 0; i < gameArray.length; i++) {
        buttonNumber = "buttonNumber" + i;
        $('.buttons').append("<button class='button btn btn-outline-light " + buttonNumber + "'>" + gameArray[i]);
    };
    $('form').trigger('reset');
};

//add a game to the array and update the buttons to reflect
function addNewGame() {
    var gameName = $('#newGame').val();
    console.log(gameName);
    console.log(gameArray.indexOf(gameName));
    if (gameArray.indexOf(gameName) === -1 && gameName !== "") {
        gameArray.push(gameName);
        createButtons();
    };
};

//on-click events
$(document).ready(function () {
    createButtons();
});

//when clicking a button, make ajax call
$(document).on('click', '.button', function () {
    $('.gifArea').html(null);
    removeSpace(1);
    var text = $(this).text();
    queryURL = "https://api.giphy.com/v1/gifs/search?q=" + text + "&api_key=" + apiKey + "&limit=10";
    giphyCall();
});

//when clicking a gif on the page, animate if still, make still if animated, and update the condition attribute DATA-IS-STILL
$(document).on('click', '.gifImage', function (event) {
    event.stopPropagation();
    event.preventDefault();
    var isStill = $(this).attr("data-is-still");
    //convert ISSTILL string to a boolean. Could have used string in the DATA-STILL attr if more readable
    var isStillBool = (isStill == 'true')
    if (isStillBool === true) {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-is-still", false);
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-is-still", true);
    };
});

//when clicking submit button, adds text of form (note: will not do anything if form is empty or text in form is already in array)
$('#addNewGame').on('click', function () {
    addNewGame();
});