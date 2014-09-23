/*
 * This functions work with indexed DB. Lowlevel comes first.
 */

function save(key, value) {
    console.log("LocalStorage: Setting " + key + " to " + value);
    window.localStorage.setItem(key, value);
}

function load(key) {
    console.log("LocalStorage: Loading " + key);
    var value = window.localStorage.getItem(key);
    console.log(key + " = " + value);
    return value;
}

function remove(key) {
    console.log("LocalStorage: REMOVING " + key);
    window.localStorage.removeItem(key);
}


/*
 * This functions work with indexed DB. High level - saves and loads preferences
 */

function saveprefs() {

    save("wt0vremr-translator-from", $("#from option:selected").val());
    save("wt0vremr-translator-to", $("#to option:selected").val());
}

function loadprefs() {
    var from = load("wt0vremr-translator-from");
    var to = load("wt0vremr-translator-to");

    if (null != from && null != to) {

        $("#from").val(from);
        $("#to").val(to);
    }
}


/*
 * This updates the amount of app launches
 */

function updateruncount() {
    var runcount = load("wt0vremr-translator-runcount");
    if (null == runcount) {
        save("wt0vremr-translator-runcount", 1)
    } else {
        save("wt0vremr-translator-runcount", (parseInt(runcount) + 1))
    }
}

/*
 * If app is launched for 3+ times, donate button is displayed
 */

function managedonatebutton() {
    d = $('#donate');
    if (load("wt0vremr-translator-runcount") > 3) {
        d.show();
    } else {
        d.hide();
    }
}


/*
 * Shows translation results on special page part
 */

function showresults(html) {
    $('#r').html(html);
}


/*
 * Sets maximum avaliable height for translation result box
 * REMEMBER! ALL OTHER DIVS SHOULD HAVE "size" CLASS!
 */
function fixheight() {

    resultbox = $('#r');

    var a = 0;
    var somespace = (resultbox.outerHeight() - resultbox.height()) / 2;

    $(".size").each(function () {
        a += $(this).outerHeight(true);
    });

    resultbox.height($(document).height() - a - somespace);
    console.log("translation <div> height magic complete");
}


/*
 * This is real mess, but that's what dictionary JSON looks like.
 * I create an HTML from it here
 * */


function getword(json) {
    var r = ""; //Html code of the result
    var root = json["def"]; //root json object

    if (root.length == 0) {
        return "<b>:(</b>"
    }

    $.each(root, function (index) {

        var translations = root[index]['tr'];

        $.each(translations, function (i) {
            r += "<b>" + translations[i]["text"] + "</b>";
            r += '<i class="uk-text-muted"> ' + translations[i]["pos"] + '</i><br>';

            if (typeof(translations[i]['syn']) !== 'undefined') {
                var syns = "";
                $.each(translations[i]['syn'], function (v) {
                    syns += translations[i]['syn'][v]["text"] + ", "
                });
                r += "<span class='uk-text-primary'>(" + syns.substring(0, syns.length - 2) + ")</span><br><br>";
            }

            if (typeof(translations[i]['ex']) !== 'undefined') {
                var examples = "";
                $.each(translations[i]['ex'], function (l) {
                    examples += translations[i]['ex'][l]["text"] + ": " + translations[i]['ex'][l]["tr"][0]["text"] + "<br>"
                });
                r += "<span class='uk-text-success'>" + examples + "</span><br>";
            }


        });

    });
    return r;
}

function onstart(){
    updateruncount();
    loadprefs();
    managedonatebutton();
    fixheight();
    console.log("APP LOADED");
}



