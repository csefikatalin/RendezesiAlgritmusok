function ID(nev) {
    return document.getElementById(nev);
}
function CLASS(nev) {
    return document.getElementsByClassName(nev);
}
function $(nev) {
    return document.querySelectorAll(nev);
}

function csere(tomb, leftIndex, rightIndex, i) {

    var temp = tomb[leftIndex];
    tomb[leftIndex] = tomb[rightIndex];
    tomb[rightIndex] = temp;

    cseredb++;

    kiir(tomb, i, leftIndex, rightIndex);

}



function maxSort(tomb) {

    for (var i = 0; i < tomb.length - 1; i++) {
        var max = i;
        for (var j = i + 1; j < tomb.length; j++) {
            if (tomb[j] < tomb[max]) {
                max = j;
            }
        }
        csere(tomb, max, i, i + 1);
    }


    return tomb;
}



function kiir(X, k, leftIndex, rightIndex) {
   
    if (!ST) {
        var szoveg = "<div>";
        for (var i = 0; i < X.length; i++) {

            if (i === leftIndex || i === rightIndex) {

                szoveg += "<span style='color:red'>" + X[i] + ";</span> ";
            } else {
                if (i < k - 1) {

                    szoveg += "<span style='color:green'>" + X[i] + ";</span> ";
                } else {
                    szoveg += "<span style='color:'>" + X[i] + ";  " + "</span> ";
                }
            }
        }
    }
    console.log(szoveg);
    $("section")[0].innerHTML += szoveg + "</div>";

}
function indit() {
    cseredb = 0;
    $("section")[0].innerHTML = "";
    ST = false;
    let db = ID("elemszam").value;
    var tomb = tombfeltoltes(db);

    kiir(tomb, 0, tomb.length, -1);
    var d = new Date();
    var kezdo = d.getTime();
    kiir(maxSort(tomb, 0, tomb.length - 1, 0));
    var g = new Date();
    var vege = g.getTime();
    var ido = vege - kezdo;

//    kiir(tomb, 0, tomb.length, 0);
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
var ST = false;

function statisztikahoz() {
    ST = true;

    for (var i = 5; i <= 101; i += 10) {
        cseredb = 0;
        let tomb = tombfeltoltes(i);
        let d = new Date();
        let kezdo = d.getTime();
        maxSort(tomb, 0, tomb.length - 1, 0);
        let g = new Date();
        let vege = g.getTime();
        let ido = vege - kezdo;
        statdb.push([i, cseredb]);
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

        var options = {
            title: 'Maximum kiválasztásos rendezési idők alakulása az elemszám függvényében',
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
            title: 'Maximum kiválasztásos cserék számának alakulása az elemszám függvényében',
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

    ID("elemszam").addEventListener("change", indit, false);

}

window.addEventListener("load", init, false);