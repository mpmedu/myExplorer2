"use strict";

xx.module('myExpl', function (exports) {
  let vars = xx.vars;
  
  var common,gen;
  xx.imports.push(function () {
    common = xx.common;
    gen = xx.gen;
  });
  
  exports.extend({
    showTheFolders:showTheFolders
  });

  window.addEventListener('load',function(){
    //let ob1 = common.myPosition('files_div','myExplorer');
  });
  
  window.addEventListener('domready',function(){  // this doesn't work
    let ob1 = common.myPosition('files_div','myExplorer');
  });
  
////////////////////////////////////////////////////////////////////////
function MY_EXPLORER() {}
////////////////////////////////////////////////////////////////////////
 
 function doFetch(url,todo, params, data, loadmsg, fn) {
  let ob = {'url':url, 'loadmsg':loadmsg};
  common.loadingOn(ob);
  let c = '?';
  if (todo) {
    url = 'php/' + url + '?todo=' + todo;
    c = '&';
  }
  if (params) url = url + c + param(params);
  fetch(url,{
    method: "POST",
    headers: {
    'Accept': 'application/json, text/plain, */*',
    //"Content-Type": "application/json; charset=UTF-8"
    "Content-Type": "application/json"
    // "Content-Type": "application/x-www-form-urlencoded"
    },
    body: JSON.stringify(data)
    // body: data
  })
  .then(res=>res.json())
  .then(json=> {
    if (fn && (typeof fn == "function")) fn(json);      
    //console.log(json);
    common.loadingOff();
  })
  .catch(err=>{
    console.log(err);
    common.loadingOff();
  });
}
  
let folders;
function showTheFolders(){
  gen.init();
  folders = new foldersClass({ dir: vars.docPath,  notdirs:'_files'});
  folders.getFob();  // this also displays the folders and files
}


function theFolders(json) {
  // turn itemPopup off just in case it is still showing
  let ele = _('itemPopup');
  ele.classList.remove('chosen');
  ele.classList.add('nodisplay');
  try {
    let s;
    s = jsFolders(json,0,0);   // include the root directory
    // s = jsFolders(json,1,0);      // don't include the root directory
    return s;
  } catch (e) {
    alert("error : " + e);
  }
}

     // <div id="sm_${p}" class="subcatlistdiv nodisplay"> changed, keep for now just in case
// In this function the spans are put together as shown to prevent space gaps between the elements    
function jsFolders(json,p,level) {
  let s ='', s1;
  while (true) {
    s1 = 'class="items level' + level + '"';
    if (json.ps[p] > 0) {
      // there are subfolders
      s +=  `<div ${s1} id="ai_${p}">
        <span class="indx">${common.getHtml('plusMinus')}</span><span class="holder"><span 
        class="directory"></span><span class="itemName">${json.f[p]}</span>
        </span>
      </div>
      <div class="subcatlistdiv nodisplay">
        ${jsFolders(json,json.ps[p],level+1)}
      </div>`; 
    } else {
      // no subfolders
      s +=  `<div ${s1} id="ai_${p}">
            <span class="indx"></span><span class="holder"><span 
            class="directory"></span><span class="itemName">${json.f[p]}</span>
            </span>
            </div>`;
    } 
    p = json.pn[p];
    if (p === 0) return s;
  }
}

/* function jsFolders(json,p,level) {
  let s ='', s1;
  while (true) {
    s1 = 'class="items level' + level + '"';
    if (json.ps[p] > 0) {
      s +=  `<div ${s1} id="ai_${p}">
        <span class="indx">\u25ba</span><span class="holder"><span 
        class="directory"></span><span class="itemName">${json.f[p]}</span>
        </span>
      </div>
      <div class="subcatlistdiv nodisplay">
        ${jsFolders(json,json.ps[p],level+1)}
      </div>`; 
    } else {
      s +=  `<div ${s1} id="ai_${p}">
            <span class="indx">\u25cf</span><span class="holder"><span 
            class="directory"></span><span class="itemName">${json.f[p]}</span>
            </span>
            </div>`;
    } 
    p = json.pn[p];
    if (p === 0) return s;
  }
}
 */
 
 
 
//delegate('folders_div','click', 'span.indx > svg',function __clickOnOpenorCloseFolder(e){ 
delegate('folders_div','click', '.inbox',function __clickOnOpenorCloseFolder(e){ 
  //e.stopPropagation(); 
  //alert('in here');
  let svg = this.parentNode;
  let doorClosed = svg.getAttribute('data-closed');
  //let door = svg.dataset.closed;   // new & preferred way but didn't work
  //var ss = common.trim(this.innerHTML);
  if (doorClosed === 'true') {
    // sideways, ie closed, so open folder
    let items = svg.parentNode.parentNode;
    //let ele = svg.querySelector('line.down');
    svg.querySelector('line.down').classList.add('nodisplay');
    svg.setAttribute('data-closed',false);
    items.nextElementSibling.classList.remove('nodisplay');
  } else if (doorClosed === "false") {
    // down, ie open, so close folder
    // I must check if this folder which is been closed contains the chosen folder
    // and if so then I must turn the chosen folder off
    let items = svg.parentNode.parentNode;
    let selected = folders.getSelected();
    if (selected >= 0) {
      let thisid = Number(items.id.slice(3));
      if (folders.isADecendentOf(selected,thisid)) {
        // the currently selected folder is a decendent of the folder that is now
        // being closed, so make selected be -1 and turn chosen off
        folders.setSelected(-1);
        // remove files from files_div
        _('files_div').innerHTML = '';
      }
    }
    svg.querySelector('line.down').classList.remove('nodisplay');
    svg.setAttribute('data-closed',true);
    items.nextElementSibling.classList.add('nodisplay');
  }
});


/* delegate('folders_div','click', 'span.indx',function __clickOnOpenorCloseFolder(e){ 
  //e.stopPropagation(); 
  var ss = common.trim(this.innerHTML);
  if (ss == "\u25ba") {
    // sideways, ie closed, so open folder
    let items = this.parentNode;
    this.innerHTML = "\u25bc";
    items.nextElementSibling.classList.remove('nodisplay');
  } else if (ss == "\u25bc") {
    // down, ie open, so close folder
    // I must check if this folder which is been closed contains the chosen folder
    // and if so then I must turn the chosen folder off
    let items = this.parentNode;
    let selected = folders.getSelected();
    if (selected >= 0) {
      let thisid = Number(items.id.slice(3));
      if (folders.isADecendentOf(selected,thisid)) {
        // the currently selected folder is a decendent of the folder that is now
        // being closed, so make selected be -1 and turn chosen off
        folders.setSelected(-1);
        // remove files from files_div
        _('files_div').innerHTML = '';
      }
    }
    this.innerHTML = "\u25ba";
    items.nextElementSibling.classList.add('nodisplay');
  }
});
 */
 // ******************************************
 // event handler and routines for clicks and mouse events on items in the folder list in left column
 // ******************************************
 
 let onFolder;  // this is the folder that the mouse is over, if clicked is becomes the selected folder

delegate('folders_div','mouseover','.holder',function __mouseoverOnHolderOfDirectoryAndItemName(e){
  //e.stopPropagation();
  let ele = document.querySelector('#itemPopup');
  let offs = myOffset(this,'myExplorer',ele);
  let lft = offs[1] + 2;  
  let top = offs[0] + 2; 
  ele.style.left = lft + 'px';
  ele.style.top = top + 'px';
  ele.innerHTML = common.htmlspecialchars_decode(this.innerHTML);
  ele.classList.remove('nodisplay');
  onFolder = this;
});

/* 
Turn off itemPopup if the mouse exited it or the underlying span.holder.
 */
 
_('itemPopup').addEventListener('mouseout', function __mouseoutItemPopup(e){
  //e.stopPropagation();    // I don't think this is needed here
  if (isChildOf(this,e.relatedTarget)) return;
  this.classList.add('nodisplay');
  onFolder = null;
});
 
 // Note that this might not be needed because once the mouse enters span.holder then
 // div#itemPopup covers the span.holder element. But I have found itemPopup might not
 // completely cover span.holder - I don't know why so I have put this here just in case.
delegate('folders_div','mouseout', '.holder', function __mouseoutFromItemName(e){ 
  //e.stopPropagation();
  if (e.relatedTarget.parentNode.id == 'itemPopup') return;
  if (e.relatedTarget.id == 'itemPopup') return;
  _('itemPopup').classList.add('nodisplay');
});

_('itemPopup').addEventListener('click', function __clickItemPopup(e){ 
  e.stopPropagation();
  let item = onFolder.parentNode;
  let ai_id = Number(item.id.slice(3)); 
  // turn itemPopup > span.itemName on
  let ele = this.querySelector('span.itemName');  
  if (ele) ele.classList.add('chosen');  // ele will be null at start-up so then skip
  // turn the folder that is now selected on  
  folders.setSelected(ai_id);  // turns old folder off and new folder on
  let fp = folders.fullPath(ai_id);
  // turn the spinner on while the files are fetched
  //showSpinner(this,onFolder)
    
  onFolder.classList.add('wait');
  this.classList.add('wait');
  
  //$(c).addClass('wait');
  //let data = { dir: fp, only:'|qna|'};
  let data = { dir: fp};

  doFetch('general.php','getFiles', null, data, '',function(json) {
    //turnOffSpinner(this,onFolder);
    //$(c).removeClass('wait');
    if (json.value === 'success') {
      files_div.innerHTML = filesList(fp,json.files);
      _('fn_input').value = '';
    } else {
      if (json.emsg != undefined) {
        alert(json.emsg);
      } else {
        alert('There was a problem with Ajax call');
      }
    }
  });
});

function showSpinner(popup,fold){
  
}

function filesList(fp,arr){
  let ss= '<ul class="fileTree" data-fp="' + fp + '">';
  for (let i = 0; i < arr.length; i = i + 2) {
    ss += '<li data-fp="' + fp + arr[i] + '"><span class="file ext_' + arr[i+1] + '">' + arr[i] + '</span></li>';
  }
  return ss + "</ul>";
}

delegate(files_div,'click','li',function __clickOnFolderName(e){ 
  e.stopPropagation();
  // let fname1 = this.getAttribute('data-fp');   // old way
  let fname1 = this.dataset.fp;   // new & preferred way
  _('fn_input').value = fname1.substring(fname1.lastIndexOf('/')+1);
});

class foldersClass {
  constructor(data) {
    this.data = data;
    this.selected = -1;
    this.parr = [];
  }
    
  getFob() {
    doFetch('general.php','getFolders', null, this.data, '',json=>{
      this.fob=json;
      this.putFob();
      this.fix_parr();
      onFolder = _('folders_div').querySelector('.holder');  // will find the first span.holder element
      trigger('itemPopup','click');
    });
  }
  
  putFob() {
    let ele = document.getElementById('folders_div');
    ele.innerHTML =theFolders(this.fob);
  }
  
  setSelected(n) {
    if (this.selected >= 0) _('ai_' + this.selected).querySelector("span.itemName").classList.remove('chosen');
    this.selected=n;
    if (n >= 0) _('ai_' + this.selected).querySelector("span.itemName").classList.add('chosen');
  }
  
  getSelected() {
    return this.selected;
  }
 
  fix_parr() {
    this.parr[0] = 0;
    this.parr_fixsub(0);
  }

  parr_fixsub(p) {
    let pp = this.fob.ps[p];
    while (pp != 0) {
      this.parr[pp] = p;
      if (this.fob.ps[pp] > 0) this.parr_fixsub(pp);
      pp = this.fob.pn[pp];
    }
  }
   
  // This function returns true if idn1 is a decendent of idn2
  isADecendentOf(idn1,idn2) {
    let p = idn1;
    while (p > 0) {
      p = this.parr[p];
      if (p === idn2) return true;
    }
    return false;
  }

  fullPath(id) {
    let f = this.fob.f;
    let s = '';
    while(id != 0){
      s = f[id] + '/' + s;
      id = this.parr[id];
    }
    return xx.vars.docPath + s;
  }
}  // end of folderClass
 
});
 