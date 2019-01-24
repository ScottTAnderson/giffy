var gameArray = ["mario", "princess peach", "zelda", "final fantasy", "bomberman", "halo", "grand theft auto"];
var buttonNumber = 0;
var buttonApiReadyText = "";
var apiKey = "AY22kSgz8DgT4YerCESK8oFSMFx5XzFd";
var queryURL = "";
var isAnimated = false;

function giphyCall() {
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        // $(".gifArea").html("");
        for (var i = 0; i < 10; i++) {
            var gifDiv = $("<div class='gif float-left col-4'>");
            var rating = $("<p>").text('Gif Rating: ' + response.data[i].rating);
            var gifStill = response.data[i].images.fixed_height_still.url;
            var gifAnimate = response.data[i].images.fixed_height.url;
            var gifHtml = $("<img class='img-fluid' src=" + gifStill + ">");
            gifHtml.addClass("gifImage image-fluid");
            gifHtml.attr("src", gifStill);
            gifHtml.attr("data-still", gifStill);
            gifHtml.attr("data-animate", gifAnimate);
            gifDiv.append(gifHtml, rating);
            $(".gifArea").append(gifDiv);
        };
    });
}

function removeSpace(arrayElement) {
    var split = gameArray[arrayElement].split(" ");
    var splitPlus = "";
    for (var i = 0; i < split.length - 1; i++) {
        splitPlus += split[i] + "+";
    } splitPlus += split[i];
    buttonApiReadyText = splitPlus;
}
function createButtons() {
    $('.buttons').html(null);
    for (var i = 0; i < gameArray.length; i++) {
        buttonNumber = "buttonNumber" + i;
        $('.buttons').append("<button class='button btn btn-outline-dark " + buttonNumber + "'>" + gameArray[i]);
    };
    $('form').trigger('reset');
};

function addNewGame() {
    var gameName = $('#newGame').val();
    console.log(gameName);
    console.log(gameArray.indexOf(gameName));
    if (gameArray.indexOf(gameName) === -1 && gameName !== "") {
        gameArray.push(gameName);
        createButtons();
    };
};

$(document).ready(function () {
    createButtons();
});

$(document).on('click', '.button', function () {
    $('.gifArea').html(null);
    removeSpace(1);
    var text = $(this).text();
    queryURL = "https://api.giphy.com/v1/gifs/search?q=" + text + "&api_key=" + apiKey + "&limit=10";
    giphyCall();
});

$(document).on('click', '.gifImage', function (event) {
    event.stopPropagation();
    event.preventDefault();
    if (isAnimated == false) {
        console.log(isAnimated);
        $(this).attr("src", $(this).attr("data-animate"));
        isAnimated = true;
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        isAnimated = false;
    };
});

$('#addNewGame').on('click', function () {
    addNewGame();
});