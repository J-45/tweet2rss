const root = document.querySelector(":root");

function createRatioProgressbar(ratio) {
    const percent = Math.round((ratio % 1).toFixed(2) * 100);
    console.log("create percent:" + percent);
    root.style.setProperty("--percentStar", percent + "%");
    root.style.setProperty("--percentEnd", percent + "%");
    document.getElementById("ratioLvl").innerHTML = "LVL " + String(ratio).split('.')[0];
}

function updateRatio(ratio1, ratio2) {
    const percent1 = Math.round((ratio1 % 1).toFixed(2) * 100);
    const percent2 = Math.round((ratio2 % 1).toFixed(2) * 100);
    console.log(new Date().toLocaleString(), " = update percent");
    root.style.setProperty("--percentStar", percent1 + "%");
    root.style.setProperty("--percentEnd", percent2 + "%");

    document.querySelector("#barInside").classList.remove("anim");
    void document.querySelector("#barInside").offsetWidth; // https://stackoverflow.com/a/58353279/17361582
    document.querySelector("#barInside").classList.add("anim");
}

(function() {
    const ratio1 = 1.29;
    const ratio2 = 1.31;
    createRatioProgressbar(ratio1);
    updateRatio(ratio1, ratio2);
    setInterval(updateRatio, 3000, 1.31, ratio2 + 0.19);
})();