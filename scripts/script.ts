let imageAddr: string = "resources/1.jpg"; 
let downloadSize: number = 19996613; //bytes

let showProgressMessage = (msg: any) => {    
    let oProgress: HTMLElement | null = document.getElementById("progress");
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
    let startTime: number, endTime: number;
    let download: HTMLImageElement = new Image();
    download.onload = function () {
        endTime = (new Date()).getTime();
        showResults();
    }
    
    download.onerror = function (err, msg) {
        showProgressMessage("Error Running Speed Test, Please Try Again Later...");
    }
    
    startTime = (new Date()).getTime();
    let cacheBuster: string = "?noCache=" + startTime;
    download.src = imageAddr + cacheBuster;
    
    let showResults = () => {
        let duration: number = (endTime - startTime) / 1000;
        let bitsLoaded: number = downloadSize * 8;
        let speedBps: any = (bitsLoaded / duration).toFixed(2);
        let speedKbps: any = (speedBps / 1024).toFixed(2);
        let speedMbps: any = (speedKbps / 1024).toFixed(2);
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
