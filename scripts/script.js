var mountainInfo;
var mountainJSON;
var avg;
window.onload= function loadJSON(){
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    console.log('1');
    xobj.open('GET', 'mountain.json', true);
    console.log(xobj.status+" "+xobj.readyState);
    console.log("2");
    xobj.onreadystatechange= function () {
      console.log("3");
          if (xobj.readyState == 4 && xobj.status == "200") {
            console.log("yes");
            mountainInfo= xobj.responseText;
          }
          else {
            console.log("no");
          }
          xobj.send(null);
          console.log("4");
  };
};
// mountainJSON= JSON.parse(mountainInfo);
