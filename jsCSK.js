function ID(nev) {
    return document.getElementById(nev);
}
function CLASS(nev) {
    return document.getElementsByClassName(nev);
}
function $(nev) {
    return document.querySelectorAll(nev);
}

function csere(tomb, leftIndex, rightIndex, phely) {

    var temp = tomb[leftIndex];
    tomb[leftIndex] = tomb[rightIndex];
    tomb[rightIndex] = temp;
    let kiiras = ID("levalogat").checked;
    cseredb++;
    if (kiiras) {
        kiir(tomb, leftIndex, rightIndex, phely);
    }
}

function valogat(tomb, left, right, phely) {
    //kezdetben a pivot elem a sorozat bal oldali eleme ez alapján választjuk szét a sorozatot
    phely = left;/*K-phely=E -left*//**/
    //a mutatót beállítjuk a sorozat végére
    var irany = -1;/*L-irany=U -right*/
    kiir(tomb, left, right, phely);
    var pivot = tomb[phely];
    //Addig megy a ciklus, amíg bal<jobb
    while (left < right) {
        //jobbról indulunk és addig megyünk lefelé, amíg az elem nagyobb, mint a pivot elem. 
        if (irany < 0) {
            while (left < right && pivot <= tomb[right]) {
                right--;
            }
            //Ha kisebbe, akkor megcseréljük a két elemet, és 
            if (left < right) {
                phely = right;
                csere(tomb, left, right, phely);
                irany = 1;

            }
        } else {
            //a mutatót balra állatjuk, innentől a bal oldali elemhez adunk mindig ++;
            while (left < right && pivot >= tomb[left]) {
                left++;
            }
            if (left < right) {
                phely = left;
                csere(tomb, left, right, phely);
                irany = -1;

            }
        }
    }
    //végén visszatérünka  pivot elem helyével. 
    return phely;
    //A ciklus addig megy, amíg a a pivo elem helye kisebb, mint az aktuális végső irány
//    while (phely < irany) {
//        while (phely < irany && tomb[irany] >= pivot) {
//            irany--;//jobbról csökkentsük az indexet amíg az elem nagyobb, mint a pivot, vagy amíg el nem érjük a pivo elemet
//        }
//        if (phely < irany) {
//            tomb[phely] = tomb[irany];
//            phely++;}
//            while (phely < irany && tomb[irany] <= pivot) {
//                phely++;
//            }
//            if (phely < irany) {
//                tomb[irany] = tomb[phely];
//                irany--;
//            }
//        }
//    }
//    tomb[phely]=pivot;


}

function quickSort(tomb, left, right, phely) {



    phely = valogat(tomb, left, right, phely);

    if (phely - left > 1) {
        quickSort(tomb, left, phely - 1);
    }
    if (right - phely > 1) {
        quickSort(tomb, phely + 1, right);
    }

    return tomb;
}



function kiir(X, left, right, phely) {
    if (!ST) {
        var szoveg = "<div>";
        for (var i = 0; i < X.length; i++) {
            if (i === left) {
                szoveg += "<span style='color:green'>";
            }
            if (i >= left && i <= right) {
                if (i === phely) {
                    szoveg += "<span style='color:red'>" + X[i] + "</span>; ";
                } else {
                    szoveg += X[i] + "; ";
                }
            } else {
                szoveg += "<span style='color:lightgray'>" + X[i] + ";  " + "</span> ";
            }
            if (i === right) {
                szoveg += "</span >";
            }
        }
//    console.log(szoveg);
        $("section")[0].innerHTML += szoveg + "</div>";
    }
}
function indit() {
    cseredb=0;
    $("section")[0].innerHTML = "";
    ST = false;
    let db = ID("elemszam").value;
    var tomb = tombfeltoltes(db);

    kiir(tomb, 0, tomb.length, 0);
    var d = new Date();
    var kezdo = d.getTime();
    kiir(quickSort(tomb, 0, tomb.length - 1, 0));
    var g = new Date();
    var vege = g.getTime();
    var ido = vege - kezdo;

    kiir(tomb, 0, tomb.length, 0);
    $("aside")[0].innerHTML += ido + " milisec alatt futott le a rendezés<br>";
    $("aside")[0].innerHTML += cseredb + " db csere történt<br>";
}
function tombfeltoltes(n) {
    var tomb = [];
    for (var i = 0; i < n; i++) {
        tomb[i] = Math.round(Math.random() * 90) + 10;
    }
    return tomb;
}
var statdb = [["elemszám", "cserék száma"]];
var statido = [["elemszám", "idő (ms)"]];
var cseredb = 0;
var ST=false;
//var ST = false;
function statisztikahoz() {
    ST = true;

    for (var i = 5; i <= 100; i += 10) {
        cseredb = 0;
        let tomb = tombfeltoltes(i);
        let d = new Date();
        let kezdo = d.getTime();
        quickSort(tomb, 0, tomb.length - 1, 0);
        let g = new Date();
        let vege = g.getTime();
        let ido = vege - kezdo;
//        console.log(cseredb, ido);
        statdb.push([i,  cseredb]);
        statido.push([i, ido]);
    }

    diagramdb();  
    diagramido();

}







function diagramido() {

    google.charts.load('current', {'packages': ['corechart']});
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
        
        var data = google.visualization.arrayToDataTable(statido);
console.log(statido);
        var options = {
            title: 'QuickSort rendezési idők alakulása az elemszám függvényében',
            curveType: 'function',
            legend: {position: 'bottom'}
        };

        var chart = new google.visualization.LineChart(document.getElementById('curve_chartido'));

        chart.draw(data, options);
    }
}


function diagramdb() {

    google.charts.load('current', {'packages': ['corechart']});
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
       
        var data = google.visualization.arrayToDataTable(statdb);

        var options = {
            title: 'QuickSort cserék száma alakulása az elemszám függvényében',
            curveType: 'function',
            legend: {position: 'bottom'}
        };

        var chart = new google.visualization.LineChart(document.getElementById('curve_chartdb'));

        chart.draw(data, options);
    }
}











function init() {
//    for (var i = 10; i < 100; i++) {
//       indit(i); 
//    }
    indit();
    statisztikahoz();
    ID("levalogat").addEventListener("change", indit, false);
    ID("elemszam").addEventListener("change", indit, false);

}

window.addEventListener("load", init, false);