var imageAddr = "resources/1.jpg";
var downloadSize = 19996613; //bytes
var showProgressMessage = function (msg) {
    var oProgress = document.getElementById("progress");
    if (oProgress) {
        var actualHTML = (typeof msg == "string") ? msg : msg.join("<br />");
        oProgress.innerHTML = actualHTML;
    }
};
var startSpeedTest = function () {
    showProgressMessage("Running Speed Test, please wait...");
    window.setTimeout(measureConnectionSpeed, 1);
};
var measureConnectionSpeed = function () {
    var startTime, endTime;
    var download = new Image();
    download.onload = function () {
        endTime = (new Date()).getTime();
        showResults();
    };
    download.onerror = function (err, msg) {
        showProgressMessage("Error Running Speed Test, Please Try Again Later...");
    };
    startTime = (new Date()).getTime();
    var cacheBuster = "?noCache=" + startTime;
    download.src = imageAddr + cacheBuster;
    var showResults = function () {
        var duration = (endTime - startTime) / 1000;
        var bitsLoaded = downloadSize * 8;
        var speedBps = (bitsLoaded / duration).toFixed(2);
        var speedKbps = (speedBps / 1024).toFixed(2);
        var speedMbps = (speedKbps / 1024).toFixed(2);
        showProgressMessage([
            "Your connection speed is:",
            speedBps + " bps (bits per second)",
            speedKbps + " kbps (Kilobits per second)",
            speedMbps + " Mbps (Megabits per second)",
            "",
            "Realised Connection Speed:",
            speedBps / 8 + " Bps (Bytes per second)",
            speedKbps / 8 + " kBps (KiloBytes per second)",
            speedMbps / 8 + " MBps (MegaBytes per second)"
        ]);
    };
};
