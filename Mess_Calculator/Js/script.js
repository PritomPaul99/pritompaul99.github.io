function sumA() {
    var priCost = document.getElementById("priCost").value;
    var danCost = document.getElementById("danCost").value;
    var kibCost = document.getElementById("kibCost").value;
    var muhCost = document.getElementById("muhCost").value;

    var resultA = parseInt(priCost) + parseInt(danCost) + parseInt(kibCost) + parseInt(muhCost);
    document.getElementById("resultA").innerHTML = resultA;
}
function sumB() {
    var priMeals = document.getElementById("priMeals").value;
    var danMeals = document.getElementById("danMeals").value;
    var kibMeals = document.getElementById("kibMeals").value;
    var muhMeals = document.getElementById("muhMeals").value;

    var resultB = parseInt(priMeals) + parseInt(danMeals) + parseInt(kibMeals) + parseInt(muhMeals);
    document.getElementById("resultB").innerHTML = resultB;
}

function rate() {
    var resultA = document.getElementById("resultA").textContent;
    var resultB = document.getElementById("resultB").textContent;


    var M_rate = parseInt(resultA) / parseInt(resultB);
    document.getElementById("M_rate").innerHTML = M_rate;

}