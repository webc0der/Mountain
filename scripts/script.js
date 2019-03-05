var mountainJSON;
var avg=0;
var heights=[];

function avgCal(mountainJSON){
  mountainJSON= JSON.parse(mountainJSON);
  var sum=0;
  var heightCollection=[];
  var key= Object.keys(mountainJSON);
  for (var i = 0; i < key.length; i++) {
    sum+=parseInt(mountainJSON[String(key[i])]["height"]);
    heightCollection[i]=parseInt(mountainJSON[String(key[i])]["height"]);
  }
  avg=sum/key.length;
  heights=heightCollection;
}

document.getElementById("invoke").addEventListener("click", mountainSearch);

function mountainSearch(){
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', 'scripts/mountain.json', false);
  xobj.setRequestHeader("Access-Control-Allow-Origin", "*");
  xobj.onreadystatechange= function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
          avgCal(xobj.responseText);
        }
  };
  xobj.send(null);
  mountainJSON=xobj.responseText;
  var flag=false;
  var inputHeight= document.getElementById('in-height').value;
  // console.log(inputHeight);
  mountainJSON= JSON.parse(mountainJSON);
  var key= Object.keys(mountainJSON);
    for(var i=0; i<heights.length;i++){
      // console.log(avg);
      if(inputHeight == heights[i]){
        flag=true;
        if (i==0 || i==heights.length-1) {
          if(i==0){
            console.log(mountainJSON[String(key[i])]["name"]+" is exact match for you");
            console.log(mountainJSON[String(key[i+1])]["name"]+" is one lower option for you");
          }else {
            console.log(mountainJSON[String(key[i])]["name"]+" is exact match for you");
            console.log(mountainJSON[String(key[i-1])]["name"]+" is one heigher option for you");
          }
        }else {
          console.log(mountainJSON[String(key[i])]["name"]+" is exact match for you");
          console.log(mountainJSON[String(key[i+1])]["name"]+" is one lower option for you");
          console.log(mountainJSON[String(key[i-1])]["name"]+" is one heigher option for you");
        }
        break;
      }
    }
    nearestHeight(inputHeight, mountainJSON, key, flag);
}
var iph;
var mjs
var k;
var f
function nearestHeight(iph, mjs, k, f){
  if(f== false){
  // console.log("in nearest height func");
  var sortHeight= heights;
  sortHeight= sortHeight.map(String).sort();
  if (iph>avg) {
    // console.log("inp is high then average");
    for (var i = 0; i < sortHeight.length; i++) {
      var h= parseInt(sortHeight[i])
      // console.log(i+" "+h);
      if (iph<h) {
        // console.log(i+" "+h);
        if(i== heights.length){
          console.log("sorry we dont have heigher or exact value to this but you can give a try to "+mjs[String(k[i])]["name"]+" height:"+mjs[String(k[i])]["height"]);
        }else{
          // console.log(mjs[String(k[0])]["name"]);
        console.log("sorry there is no exact match but give a try to "+mjs[String(k[sortHeight.length-i-1])]["name"]+" height:"+sortHeight[i]);
        break;
      }
      }
    }
  }
  else if (iph<avg) {
    // console.log("here");
    console.log("inp is low then average");
    for (var i = 0; i < sortHeight.length; i++) {
      var h= parseInt(sortHeight[i])
      if (iph<h) {
        if(i== 0){
          console.log("sorry we dont have lower or exact value to this but you can give a try to "+mjs[String(k[i])]["name"]+" height:"+mjs[String(k[i])]["height"]);
        }else{
        console.log("sorry there is no exact match but give a try to "+mjs[String(k[sortHeight.length-i])]["name"]+" height:"+sortHeight[i-1]);
        break;
      }
      }
    }
  }else {
    console.log("may be the given number is not in range");
    return;
  }
}
}
