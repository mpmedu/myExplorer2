<!DOCTYPE html>
<html lang="en">
<head>
   <!-- <meta charset="iso-8859-1"> -->
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <title>myExplorer</title>
  
  
 <!--
  Example of linking a css style sheet, the path should be set properly
  <link rel="stylesheet" href="css/edu.css">
  The common.css file contains styles that I want to use in most projects. It can be
  combined with other css files to save time in fetching resources from the server.
  
  <link rel="stylesheet" href="../../../lib/css/categories.css">
  <link rel="stylesheet" href="../../../lib/css/common.css">
 -->
   <!-- common stylesheets  -->
  
   <!-- custom stylesheets  -->
  <link rel="stylesheet" href="css/myExpl.css">
 
</head>

<!-- ****** body ****** -->
 
<body>

  <!-- this is needed for the start-up routine -->
  <div id = 'loadingDiv'>
    <svg width='400px' height='200px'>
      <ellipse id="egg" cx="200" cy="100" rx="180" ry="90" />
      <text x='50' y='108' font-size='20px' fill='white'>Please wait while the page loads...</text>
    </svg>
  </div>
  
  <!--
   ********************************************
  The html for the file explorer
   ********************************************
  -->
  <!-- the file explorer needed to open files -->
<div id="myExplorer" class="box" style="left:100px;top:50px;">
  <div id = "itemPopup" class='nodisplay'></div>
  <div class="myExp_div1" style="margin:0 15px;" >
    <h3 class="myExp_h3_cls1">Folders</h3>
    <div id="folders_div" class="myExp_div2"></div>
    <p><button style="margin-top:10px;" >Reset</button></p>
  </div>
  <div class="myExp_div1" style="margin-left:0; margin-right:15; float:right;">
    <h3 class="myExp_h3_cls1">Files</h3>
    <div id="files_div" class="myExp_div2"></div>
    <p style="margin-bottom:0">Filename: <input id="fn_input" type="text" disabled="true" style="width:170px; padding-left:3px; margin:5px 0px 8px 0; color:black;"></p>
    <p style="float:right"><button id="func1">Open</button><button id="canc1">Cancel</button> </p>
  </div>
  <div style="clear:both"></div>
</div>

<div id = "wrapper">
<div id="catlistdiv"></div>
</div>
  
  <?php
  // the common.php file is put into this position
  require_once('../lib/php/common.php');
  
  require_once('php/svgstuff.php');
  ?>
  
<!-- for testing the volume of audio -->
  <div id="cont" class="roundCorners">
    <div id="ball" class="roundCorners">
    </div>
  </div>
  
  
  <!--
  These modules should be loaded first. The myNamespace2.js must be the first to come - it doesn't use jQuery
  code so it can come before the jQuery.js module. Then comes the jQuery module - it must come before the
  other modules because they use jQuery. The common.js module has code that is useful so it can be included
  for most projects.
   -->
  <script src="../lib/js/myNamespace2.js"></script>
  <script src="../lib/js/myJsLib1.js"></script>
  <script src="./js/common.js"></script>
  <script src="./js/myExpl.js"></script>
  <script src="./js/gen.js"></script>
  
  <!--
  Examples of custom modules that can be loaded in this position. Note that all js modules can be merged
  into one .js file to save time in fetching resources from the server.
  <script type="text/JavaScript" src="./js/myUtils3.js"></script>
   -->
  <script>
  <!--
    // this must come immediately after loading the modules
    xx.fixImports();
    <?php
    // Copy needed variables by js from php - the php variables must be in a php file which should
    // be included earlier
    $baseDir = __DIR__;
    $baseDir = str_replace("\\","/",$baseDir);
    echo ("xx.vars.baseDir = '" . $baseDir . "';");
    // echo('xx.vars.img_path = "' . UPLOADPATH . '";');
    // echo('xx.vars.tmp_path = "' . TEMPPATH . '";');
    // echo('xx.vars.jsSEP = "' . SEP . '";');  // a seperator that is used on server and client
    ?>
    setTimeout(function(){
    // Any other initialization calls can come here - calls to functions inside modules 
    // must have the xx. prefix for example
    xx.myExpl.showTheFolders();
    
    // this can come anywhere after the js modules have loaded and all initialization has finished
    document.querySelector('body').removeChild(document.getElementById('loadingDiv'));
  //-->
  },500);   // 500 to test if the animation is working properly
  </script>
  
</body> 
</html>
   
