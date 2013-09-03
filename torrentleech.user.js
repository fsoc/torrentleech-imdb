// ==UserScript==
// @name           TorrentLeechImdb
// @namespace      null
// @description    Gets IMDB scores for TL movies. 
// @require        http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js 
// @include        http://torrentleech.org/torrents/* 
// @grant          none
// ==/UserScript==


$ = this.jQuery = jQuery.noConflict(true);

var debug = function(x) {    
  console.log(x); 
};

var getImdbScore = function(ref, data) {
  var rating = $(data).find(".rating").html();
  if (rating !== undefined) 
    ref.find('a:first').text(ref.text() + " [" + rating + "]");
};

var getTorrentPage = function(ref, url) {
  debug("Getting "+url);

  $.get(url).success(function(data) {
getImdbScore(ref, data);
  }).error(function(jqXHR, textStatus, errorThrown) {
    debug("error:"+textStatus+" "+errorThrown);
  });
};

$(".title").each(function() {
  getTorrentPage($(this), "http://torrentleech.org"+$(this).find('a:first').attr("href"));
});
