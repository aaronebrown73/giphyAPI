var shows = ['Aesthetics', 'Working Out', 'Innovation', 'UC Berkeley', 'Technology', 'Javascript', 'Bay Area', 'Ocean Vacation', 'Hawaii', 'Beastmode', 'Art',];
var currentGif; var pausedGif; var animatedGif; var stillGif;

function createButtons(){
	$('#TVButtons').empty();
	for(var i = 0; i < shows.length; i++){
		var btn = $('<button>').text(shows[i]).addClass('btn').attr({'data-name': shows[i]});
		$('#TVButtons').prepend(btn);
	}

	$('.btn').on('click', function(){
		$('.display').empty();

		var thisShow = $(this).data('name');
		var giphyURL = "http://api.giphy.com/v1/gifs/search?q=tv+show+" + thisShow + "&limit=10&api_key=dc6zaTOxFJmzC";
		$.ajax({url: giphyURL, method: 'GET'}).done(function(giphy){
			currentGif = giphy.data;
			$.each(currentGif, function(index,value){
				animatedGif= value.images.original.url;
				pausedGif = value.images.original_still.url;
				var thisRating = value.rating;
				if(thisRating == ''){
					thisRating = 'unrated';
				}
				var rating = $('<h5>').html('Rated: '+thisRating).addClass('ratingStyle');
				stillGif= $('<img>').attr('data-animated', animatedGif).attr('data-paused', pausedGif).attr('src', pausedGif).addClass('playOnHover');
				var fullGifDisplay = $('<button>').prepend(rating, stillGif);
				$('.display').prepend(fullGifDisplay);
			});
		});
	});
}

$(document).on('mouseover','.playOnHover', function(){
 	   	$(this).attr('src', $(this).data('animated'));
 });
 $(document).on('mouseleave','.playOnHover', function(){
 	   	$(this).attr('src', $(this).data('paused'));
 });

$('#addShow').on('click', function(){
	var newShow = $('#newShowInput').val().trim();
	shows.push(newShow);
	createButtons();
	return false;
});

createButtons();