"use strict";

xx.module('gen', function (exports) {
  exports.extend({
    init:init
  });


//////////////////////////////////////////
function VARIABLES() {}
//////////////////////////////////////////

// see init() for how debugOn is set, ie true for localhost otherwise it remains false
let debugOn = false;
let canDebug = false;

// for showing the loading spinner
let nload = 0;

// stores if msgboxmask must be turned off after a message was displayed
let turnmaskoff = true;

let msgcallback = null;
// needed by yesnobox
let yes;

let URL_base;  // pathname to URL
let isLocal;   // indicates if this is being run locally, ie using localhost server
let relPath;   // relative path of application
let docPath;

//////////////////////////////////////////
function GENERAL() {}
//////////////////////////////////////////



////////////////////////////////////////////////////////////////////
 function   INITIALIZE() {}
////////////////////////////////////////////////////////////////////

function init() {
  initURL_relPath();
  if (isLocal) debugOn = true;
}

function initURL_relPath() {
  // set URL_base and isLocal
  let s = window.location.href;
  URL_base = s.substring(0,s.lastIndexOf('/'));
  isLocal = (s.substr(s.indexOf('//') + 2, 9).toLowerCase() === 'localhost');
  s = window.location.pathname;
  s = s.substring(0,s.lastIndexOf('/')+1);
  relPath = s.substr(1);
  docPath = relPath + 'docs/';
}

  
});
