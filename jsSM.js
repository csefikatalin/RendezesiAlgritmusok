function ID(nev) {
    return document.getElementById(nev);
}
function CLASS(nev) {
    return document.getElementsByClassName(nev);
}
function $(nev) {
    return document.querySelectorAll(nev);
}

function csere(tomb, leftIndex, rightIndex) {
    var temp = tomb[leftIndex];
    tomb[leftIndex] = tomb[rightIndex];
    tomb[rightIndex] = temp;
}
var phely=0;
function valogat(tomb, left, right) {
    phely=Math.floor((right + left) / 2);
    console.log(phely+": "+tomb[phely]);
      kiir(tomb,left,right);
    var pivot = tomb[phely], 
            i = left, 
            j = right; 
    while (i <= j) {
        while (tomb[i] < pivot) {
            i++;
        }
        while (tomb[j] > pivot) {
            j--;
        }
        if (i <= j) {
            csere(tomb, i, j); 
            i++;
            j--;
        }
    }
    return i;
}

function quickSort(tomb, left, right) {
    var i;
    if (tomb.length > 1) {
        
        i = valogat(tomb, left, right); 
      
        if (left < i - 1) { 
            quickSort(tomb, left, i - 1);
        }
        if (i < right) { 
            quickSort(tomb, i, right);
        }
    }
    return tomb;
}



function kiir(X,left, right) {
    var szoveg = "<div>";
    for (var i = 0; i < X.length; i++) {        
        if(i===left){
            szoveg += "<span style='color:green'>";
        }
        if(i>=left && i<=right){
        if (i===phely){
            szoveg += "<span style='color:red'>"+ X[i] +"</span>; ";
        }else {
            szoveg += X[i] + "; ";
        }}
    else {
         szoveg +="<span style='color:lightgray'>"+X[i]+";  "+"</span> ";
    }
        if(i===right){
            szoveg += "</span >";
        }
    }
    console.log(szoveg);
    $("section")[0].innerHTML += szoveg + "</div>";
}


function init() {
    var tomb = [];
    for (var i = 0; i < 40; i++) {
        tomb[i] = Math.round(Math.random() * 90)+10;
    }
    kiir(tomb,0,tomb.length);

    kiir(quickSort(tomb,0, tomb.length - 1));
    kiir(tomb,0,tomb.length);
}

window.addEventListener("load", init, false);