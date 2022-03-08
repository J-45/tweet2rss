function showTab(blockName) {
    var i;
    var x = document.getElementsByClassName("block");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    document.getElementById(blockName).style.display = "block";
}