//JUST AN EXAMPLE, PLEASE USE YOUR OWN PICTURE!
let imageAddr = "resources/1.jpg"; 
let downloadSize = 19996613; //bytes

let showProgressMessage = (msg) => {
    if (console) {
        if (typeof msg == "string") {
            console.log(msg);
        } else {
            for (let i = 0; i < msg.length; i++) {
                console.log(msg[i]);
            }
        }
    }
    
    let oProgress = document.getElementById("progress");
    if (oProgress) {
        let actualHTML = (typeof msg == "string") ? msg : msg.join("<br />");
        oProgress.innerHTML = actualHTML;
    }
}

let startSpeedTest = () => {
    showProgressMessage("Running Speed Test, please wait...");
    window.setTimeout(measureConnectionSpeed, 1);
};

let measureConnectionSpeed = () => {
    let startTime, endTime;
    let download = new Image();
    download.onload = function () {
        endTime = (new Date()).getTime();
        showResults();
    }
    
    download.onerror = function (err, msg) {
        showProgressMessage("Error Running Speed Test, Please Try Again Later...");
    }
    
    startTime = (new Date()).getTime();
    let cacheBuster = "?nnn=" + startTime;
    download.src = imageAddr + cacheBuster;
    
    let showResults = () => {
        let duration = (endTime - startTime) / 1000;
        let bitsLoaded = downloadSize * 8;
        let speedBps = (bitsLoaded / duration).toFixed(2);
        let speedKbps = (speedBps / 1024).toFixed(2);
        let speedMbps = (speedKbps / 1024).toFixed(2);
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
    }
}
