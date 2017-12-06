/**
 * Created by tene on 26/11/2017.
 * Synthesis.js est une library (Bibliotheque) de fonctions javaScript qui seront utilisees dans les projet de la Sciete STC
 * Apres avoir ecrit une fonction pour resoudre un probleme, les ingenieurs ne STC doivent s'assurer de la re-utilisabilite de la fonction,
 * bien documenter la fonction et l'ajouter dans la bibliotheque
 */
"use strict";

var VERSION = '1.00';


var synthesis = synthesis || {};
    synthesis.VERSION = VERSION;

var s = synthesis,
    st = synthesis;


//Cette fonction utilise window.onload et addEventListener('DOMContentLoaded' ... pour s'assurer que la page est prete,
// avant de commencer a executer les fonctions
//La fonction documentReady sera ajoutee a l'objet globale synthesis qui sera present dans le DOM.
//Toute les fonctions peuvent etre executees dans synthesis.documentReady(function(){.. metttre toutes les fonction ici});
(function(funcName, baseObj) {
    // The public function name defaults to synthesis.documentReady
    // but you can pass in your own object and own function name and those will be used
    // if you want to put them in a different namespace
    funcName = funcName || "documentReady";
    baseObj = baseObj || window;

    var readyList = [];
    var readyFired = false;
    var readyEventHandlersInstalled = false;

    // call this when the document is ready
    // this function protects itself against being called more than once
    function ready() {
        if (!readyFired) {
            // this must be set to true before we start calling callbacks
            readyFired = true;
            for (var i = 0; i < readyList.length; i++) {
                // if a callback here happens to add new ready handlers,
                // the docReady() function will see that it already fired
                // and will schedule the callback to run right after
                // this event loop finishes so all handlers will still execute
                // in order and no new ones will be added to the readyList
                // while we are processing the list
                readyList[i].fn.call(window, readyList[i].ctx);
            }
            // allow any closures held by these functions to free
            readyList = [];
        }
    }

    function readyStateChange() {
        if ( document.readyState === "complete" ) {
            ready();
        }
    }

    // This is the one public interface
    // docReady(fn, context);
    // the context argument is optional - if present, it will be passed
    // as an argument to the callback
    baseObj[funcName] = function(callback, context) {
        if (typeof callback !== "function") {
            throw new TypeError("callback for synthesis.documentReady(fn) must be a function");
        }
        // if ready has already fired, then just schedule the callback
        // to fire asynchronously, but right away
        if (readyFired) {
            setTimeout(function() {callback(context);}, 1);
            return;
        } else {
            // add the function and context to the list
            readyList.push({fn: callback, ctx: context});
        }
        // if document already ready to go, schedule the ready function to run
        if (document.readyState === "complete") {
            setTimeout(ready, 1);
        } else if (!readyEventHandlersInstalled) {
            // otherwise if we don't have event handlers installed, install them
            if (document.addEventListener) {
                // first choice is DOMContentLoaded event
                document.addEventListener("DOMContentLoaded", ready, false);
                // backup is window load event
                window.addEventListener("load", ready, false);
            } else {
                // must be IE
                document.attachEvent("onreadystatechange", readyStateChange);
                window.attachEvent("onload", ready);
            }
            readyEventHandlersInstalled = true;
        }
    }

})("documentReady", synthesis );



//cette fonction cache ou affiche une autre zone quand on clique sur un lien.
//la classe du lien a cliquer est le premier parametre de la fonction, et l'id de la zonne a affichee est le deuxieme parametre
synthesis.showOrHide = function(linkClass, areaId) {
    //le lien qu'on va cliquer pour afficher la zonne cachee (Le formulaire de login)
    //tous les liens on la meme classe
    var links  = document.getElementsByClassName(linkClass);
    for(var i=0; i<links.length; i++) {
        links[i].addEventListener('click', function(e){
            //chaque foi qu'un lien est clique, on pass l'element en question a une autre fonction pour afficher ou cacher la zone cachee
            showOrHideHelper(this, areaId);
        });

    }
};

//cette fonction aide la fonction showOrHide. Elle recoit en paramettre un element sur lequel on a clique, et affiche une zone, .
//Si on clique hor de la zone affichee, elle disparait, mais la zone reste visible tand qu'on clique dessus.
function showOrHidehelper(elmt, areaId){

    //on selectionne la zone qu'on souhaite affichee, et on affiche
    var area= document.getElementById(areaId);
    area.style.display="block";

    //toute la page ecoute le click.
    document.addEventListener('click', function(e){
        //on sait la zonne sible est cliquee, si son id est dans l'espace du click.
        var isAreaClicked = area.contains(e.target);
        var t = e.target.id
        if (t == elmt.id) {
            //si le click est sur le lien, la zone a affichee reste visible
            area.style.display = "block";
        } else {

            //sinon, si la zonne sible n'est pas cliquee, on fait disparaitre
            if(!isAreaClicked){
                area.style.display = "none";
            }
        }
    });
}

synthesis.validateForm = function() {
    console.log("Running Synthesis version: ", VERSION);
    console.log("Validating form");
};

function formatBytes(bytes,decimals) {
    if(bytes == 0) return '0 Bytes';
    var k = 1024,
        dm = decimals || 2,
        sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
        i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}
