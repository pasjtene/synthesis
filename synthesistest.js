/**
 * Created by tene on 26/11/2017.
 */
/**
 * Created by tene on 26/11/2017.
 */
"use strict";
/*! modernizr 3.5.0 (Custom Build) | MIT *
 * https://modernizr.com/download/?-audio-setclasses !*/
// using modernizr to detect features https://modernizr.com/download?audio-setclasses
//we want to detect if mp3 audio is supported before running mp3, or displaying something else
!function(e,n,a){function o(e,n){return typeof e===n}function s(){var e,n,a,s,t,c,r;for(var u in l)if(l.hasOwnProperty(u)){if(e=[],n=l[u],n.name&&(e.push(n.name.toLowerCase()),n.options&&n.options.aliases&&n.options.aliases.length))for(a=0;a<n.options.aliases.length;a++)e.push(n.options.aliases[a].toLowerCase());for(s=o(n.fn,"function")?n.fn():n.fn,t=0;t<e.length;t++)c=e[t],r=c.split("."),1===r.length?Modernizr[r[0]]=s:(!Modernizr[r[0]]||Modernizr[r[0]]instanceof Boolean||(Modernizr[r[0]]=new Boolean(Modernizr[r[0]])),Modernizr[r[0]][r[1]]=s),i.push((s?"":"no-")+r.join("-"))}}function t(e){var n=u.className,a=Modernizr._config.classPrefix||"";if(p&&(n=n.baseVal),Modernizr._config.enableJSClass){var o=new RegExp("(^|\\s)"+a+"no-js(\\s|$)");n=n.replace(o,"$1"+a+"js$2")}Modernizr._config.enableClasses&&(n+=" "+a+e.join(" "+a),p?u.className.baseVal=n:u.className=n)}function c(){return"function"!=typeof n.createElement?n.createElement(arguments[0]):p?n.createElementNS.call(n,"http://www.w3.org/2000/svg",arguments[0]):n.createElement.apply(n,arguments)}var i=[],l=[],r={_version:"3.5.0",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,n){var a=this;setTimeout(function(){n(a[e])},0)},addTest:function(e,n,a){l.push({name:e,fn:n,options:a})},addAsyncTest:function(e){l.push({name:null,fn:e})}},Modernizr=function(){};Modernizr.prototype=r,Modernizr=new Modernizr;var u=n.documentElement,p="svg"===u.nodeName.toLowerCase();Modernizr.addTest("audio",function(){var e=c("audio"),n=!1;try{n=!!e.canPlayType,n&&(n=new Boolean(n),n.ogg=e.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),n.mp3=e.canPlayType('audio/mpeg; codecs="mp3"').replace(/^no$/,""),n.opus=e.canPlayType('audio/ogg; codecs="opus"')||e.canPlayType('audio/webm; codecs="opus"').replace(/^no$/,""),n.wav=e.canPlayType('audio/wav; codecs="1"').replace(/^no$/,""),n.m4a=(e.canPlayType("audio/x-m4a;")||e.canPlayType("audio/aac;")).replace(/^no$/,""))}catch(a){}return n}),s(),t(i),delete r.addTest,delete r.addAsyncTest;for(var f=0;f<Modernizr._q.length;f++)Modernizr._q[f]();e.Modernizr=Modernizr}(window,document);


var VERSION = '1.00';


var synthesis = synthesis || {};
synthesis.VERSION = VERSION;

var s = synthesis,
    st = synthesis;

//Cette fonction utilise window.onload et addEventListener('DOMContentLoaded' ... pour s'assurer que la page est prete,
// avant de commencer a executer les fonctions
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




//Cette fonction utilise window.onload et addEventListener('DOMContentLoaded' ... pour s'assurer que la page est prete,
// avant de commencer a executer les fonctions
synthesis.documentReady2 = function(func){
//if window.onload has already been called by a different script, save that state.
    var last = window.onload;
    var isReady = false;

    if(typeof func == 'function') {
        func();
        console.log("We have a function in params");
    } else {
        throw "synthesis.documentReady must have a function as parameter: "+ func + " is not a function";
    }

    //for cross browser support
    document.addEventListener('DOMContentLoaded', function(){
        console.log("DOM is Loaded");
        isReady = true;

    })

    window.onload = function(){
        //if another script was calling onload, let's run it
        if(last) last();
        //then run our function;
        if(isReady) func();
    }
};


//cette function s'assure que la function callback s'execute 100 ms apres les instructions precedentes
function delayRun(param, callback) {
    console.log(param);
    w3.includeHTML();
    setTimeout(function(){
        callback();
    }, 100);

}


synthesis.validateForm = function(formId) {
    console.log("Running Synthesis version: ", VERSION);
    console.log("Validating form");
    //var form = document.getElementsByClassName('stForm')[0];
    var form = document.getElementById(formId);
    if(form && (typeof form === "object")) {
        console.log("It is a form...2..");
        form.addEventListener("blur", function(event){
            console.log("The target is: ", event.target.id);
            checkLengh(event.target.id);

        }, true);

    } else {
        if(formId){
            console.log(formId +" must be the is of a form");
        } else {
            console.log(this +" Must have a formId as argument");
        }

    }

   // console.log("The type of form is: ",typeof form);
/*
    if(form === null && typeof form === "object") {
        console.log("no form");
    }else {
        console.log("We have a form");
        //console.log("The form name is: ",  form.name);
        console.log("The form 2 is: ",  form);

        form.addEventListener("blur", function(event){
            console.log("The target is: ", event.target.id);
            checkLengh(event.target.id);

        }, true);
    }
    */
};



synthesis.documentReady(function() {
    if(Modernizr.audio.mp3){
        console.log("Mp3 is supported");
    }
    //uploadFileToServer();
    //uploadFile();


    /*
   var fileInput=  document.querySelector('#File');
    fileInput.onchange = function() {
        var reader = new FileReader();
        reader.onload = function(){
        alert("Contenu: "+ '":\n\n' + reader.result);
        }
        reader.readAsText(fileInput.files[0]);
    }
    */

});

function uploadFile(){
    var allowedFileTypes = ['png', 'jpg', 'jpeg', 'gif'],
        fileInput = document.querySelector('#file-upload'),
        prev = document.querySelector('#prev');
    fileInput.onchange = function(){
        var files = this.files,
            filesLen = files.length,
            imgType;

        for (var i = 0; i< filesLen; i++){
            imgType = files[i].name.split('.');
            imgType = imgType[imgType.length - 1].toLocaleLowerCase();
            console.log("the image type is: ",imgType);
            console.log("The style is: ",prev.style.display);

            //test if the imgtype is in the array of allowed Type
            if(allowedFileTypes.indexOf(imgType) != -1){
                console.log("The image type is allowed");
                prev.style.display = 'block';
                // the image is in the Array
                createThumbnail(files[i], prev);
            }
        }

    };

}

function uploadFileToServer(){
    var allowedFileTypes = ['png', 'jpg', 'jpeg', 'gif'],
        fileInput = document.querySelector('#file-upload'),
        progress = document.querySelector('#progress'),
        prev = document.querySelector('#prev');

    fileInput.onchange = function(){
        var files = this.files,
            filesLen = files.length,
            imgType,
            xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost/jtiu/creerUnCompteEnseignant.html');
        xhr.upload.onprogress = function(e) {
            progress.value = e.loaded;
            progress.max = e.total;
        };

        xhr.onload = function(){
            alert('upload terminee...');
        };

        var form = new FormData();
        form.append('file', fileInput.files[0]);
        console.log('The form is: ', form);
        xhr.send(form);
/*
        for (var i = 0; i< filesLen; i++){
            imgType = files[i].name.split('.');
            imgType = imgType[imgType.length - 1].toLocaleLowerCase();
            console.log("the image type is: ",imgType);
            console.log("The style is: ",prev.style.display);

            //test if the imgtype is in the array of allowed Type
            if(allowedFileTypes.indexOf(imgType) != -1){
                console.log("The image type is allowed");
                prev.style.display = 'block';
                // the image is in the Array
                createThumbnail(files[i], prev);
            }
        }
        */

    };

}
/*
(function(){
    var allowedFileTypes = ['png', 'jpg', 'jpeg', 'gif'],
    fileInput = document.querySelector('#file'),
    prev = document.querySelector('#prev');
    fileInput.onchange = function(){
        var files = this.files,
            filesLen = files.length,
            imgType;

        for (var i = 0; i< filesLen; i++){
            imgType = files[i].name.split('.');
            imgType = imgType[imgType.length - 1].toLocaleLowerCase();
            console.log("the image type is: ",imgType);

            //test if the imgtype is in the array of allowed Type
            if(allowedFileTypes.indexOf(imgType) != -1){
                console.log("The image type is allowed");
                // the image is in the Array
                createThumbnail(files[i], prev);
            }
        }

    };
})();
*/
function createThumbnail(file, prev) {
    var reader = new FileReader();
    reader.onload = function(){
        var imgElement = document.createElement('img');
        imgElement.style.maxWidth = '150px';
        imgElement.style.maxHeight = '150px';
        imgElement.src = this.result;
        prev.appendChild(imgElement);
    };

    reader.readAsDataURL(file);
}

function formatBytes(bytes,decimals) {
    if(bytes == 0) return '0 Bytes';
    var k = 1024,
        dm = decimals || 2,
        sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
        i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

//This function makes sure that other window.onload events are not overwritten
//onload is supported by all browser contary to EventListener
function addOnload(func){
    var last = window.onload;
    var isReady = false;
    //for cross browser support
    document.addEventListener('DOMContentLoaded', function(){
        console.log("DOM is Loaded");
        isReady = true;
        func();
    })

    window.onload = function(){
        //if another script was calling onload, let's run it
        if(last) last();
        //then run our function;
        if(isReady) func();
    }
}

function checkOnload(func){
    var last = window.onload;
    var isReady = false;
    //for cross browser support
    document.addEventListener('DOMContentLoaded', function(){
        console.log("All DOM resources finished loading");
        isReady = true;
        func();
    })

    window.onload = function(){
        //if another script was calling onload, let's run it
        if(last) last();
        //then run our function;
        if(isReady) func();
    }
}

//add a class to an element from a list, on click

synthesis.higLight = function(elmtsClass, targetClass) {
    var elmts = getElementsByClassName(elmtsClass);
    for(var i=0; i<elmts.length; i++){
        console.log(i);
        addClass5(i, elmts, targetClass);
    }
}

function addClass5(i, tbl, targetclass){
    tbl[i].addEventListener('click', function(e){
        removeClass2(tbl);
        tbl[i].className += targetclass;
        console.log(i);
    });
}

function removeClass5(elmts, targetclass) {
    for(var i= 0; i<elmts.length; i++)
        elmts[i].className -= targetclass;
}


(function(){
    var tableheads = document.querySelectorAll('.dates-table th');
    var menu = document.querySelectorAll('.dropbtn');
    for(var i=0; i<tableheads.length; i++){
        console.log(i);
        addClass3(i, tableheads);

        /*
         tableheads[i].addEventListener('click', function(e){
         e.preventDefault();
         removeClass(tableheads);
         addClass(this);
         }, false);
         */
    }

    for(var i=0; i<menu.length; i++){
        console.log(i);
        addClass4(i, menu);

    }

})();

function addClass3(i, tbl){
    tbl[i].addEventListener('click', function(e){
        removeClass(tbl);
        tbl[i].className = 'active';
        console.log(i);
    });
}

function addClass4(i, tbl){
    tbl[i].addEventListener('click', function(e){
        removeClass2(tbl);
        tbl[i].className = 'dropbtn green';
        console.log(i);
    });
}

function removeClass2(elmts) {
    for(var i= 0; i<elmts.length; i++)
        elmts[i].className = 'dropbtn';
}

//get an array of elements and remove a class
function removeClass(elmts) {
    for(var i= 0; i<elmts.length; i++)
        elmts[i].className = '';
}

//get an element and add a class
function addClass(elmt){
    elmt.className = 'active';
}



//cette fonction cache ou affiche une autre zone quand on clique sur un lien.
//la classe du lien a cliquer est le premier parametre de la fonction, et l'id de la zonne a affichee est le deuxieme parametre
synthesis.showOrHide = function(linkClass, areaId) {
    console.log("synthesis.showAndHide2...The area is: ", areaId);
    //le lien qu'on va cliquer pour afficher la zonne cachee (Le formulaire de login)
    //tous les liens on la meme classe
    var links  = document.getElementsByClassName(linkClass);
    for(var i=0; i<links.length; i++) {
        links[i].addEventListener('click', function(e){
            //chaque foi qu'un lien est clique, on pass l'element en question a une autre fonction pour afficher ou cacher la zone cachee
            showOrHideHelper(this, areaId);
        });

    }

}

//cette fonction recoit en paramettre un element sur lequel on a clique, et affiche une zone, .
//Si on clique hor de la zone affichee, elle disparait, mais la zone reste visible tand qu'on clique dessus.
function showOrHideHelper(elmt, areaId){

    //on selectionne la zone qu'on souhaite affichee, et on affiche
    var area= document.getElementById(areaId);
    area.style.display="block";

    //toute la page ecoute le click.
    document.addEventListener('click', function(e){
        //On sait que la zonne sible est cliquee, si son id est dans l'espace du click.
        var isAreaClicked = area.contains(e.target);
        console.log("The id is ",e.target.id);
        var t = e.target.id
        if (t == elmt.id) {
            //si le click est sur le lien, la zone a affichee reste visible
            area.style.display = "block";
            //return false;
        } else {
            //sinon, si la zonne sible n'est pas cliquee, on fait disparaitre
            if(!isAreaClicked){
                console.log("The area is not clicked");
                area.style.display = "none";
            }
        }
    });
}

