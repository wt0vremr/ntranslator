/**
 * Created by wt0vremr on 04.08.14.
 * trnsl.1.1.20140804T113929Z.8dbdbd61f200046a.9818c697da2cfc83c0882aa5984a39a3d3a216ca
 */


//key = "trnsl.1.1.20140804T113929Z.8dbdbd61f200046a.9818c697da2cfc83c0882aa5984a39a3d3a216ca";
key = "dict.1.1.20140806T092804Z.e29a361c95e1c382.649ceac6e0bb0f49c9121132cbc29624639c47d5";
//apiurl = "https://translate.yandex.net/api/v1.5/tr.json/";
apiurl = "https://dictionary.yandex.net/api/v1/dicservice.json/";

function requestJSON(url) {
    request = new XMLHttpRequest({ mozSystem: true});
    request.open('get', url, true);
    request.responseType = 'json';

    request.addEventListener('error', onRequestError);
    request.addEventListener('load', onRequestLoad);

    request.send();
}


function detectLang(text) {
    baseurl = apiurl + "detect?";
    url = baseurl + "key=" + key + "&text=" + text;
}


function translate(text, from, to) {
    baseurl = apiurl + "lookup?";
    url = baseurl + "key=" + key + "&text=" + text + "&lang=" + from + "-" + to;
    return requestJSON(url)
}


function dict(text, from, to) {
    baseurl = apiurl + "lookup?";
    url = baseurl + "key=" + key + "&text=" + text + "&lang=" + from + "-" + to;
    return requestJSON(url)
}


function onRequestLoad() {

    showresults(getword(request.response));

}

function onRequestError() {
    $('#t').val(request.response.text);
}


window.addEventListener('DOMContentLoaded', function () {
    onstart();


});


function uiCall() {
    translate($('#t').val(), 'en', 'es');

}




//http://runawaydev.wordpress.com/2013/07/06/easy-guide-to-localize-a-firefoxos-apps-html-interface/
//албанский	sq
//английский	en
//армянский	hy
//азербайджанский	az
//белорусский	be
//болгарский	bg
//венгерский	hu
//голландский	nl
//греческий	el
//датский	da
//итальянский	it
//испанский	es
//каталанский	ca
//латышский	lv
//литовский	lt
//македонский	mk
//немецкий	de
//норвежский	no
//польский	pl
//португальский	pt
//румынский	ro
//русский	ru
//сербский	sr
//словацкий	sk
//словенский	sl
//турецкий	tr
//украинский	uk
//финский	fi
//французский	fr
//хорватский	hr
//чешский	cs
//шведский	sv
//эстонский	et