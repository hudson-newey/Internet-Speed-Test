/** @type {String} */ const imageAddr = "resources/1.jpg";
/** @type {Number} */ const downloadSize = 19996613; //bytes

let showProgressMessage = (msg) => {
  /** @type {HTMLElement | null} */
  const progressBar = document.getElementById("progress");
  if (progressBar) {
    const actualHTML = typeof msg == "string" ? msg : msg.join("<br />");
    progressBar.innerHTML = actualHTML;
  }
};

function startSpeedTest() {
  showProgressMessage("Running Speed Test, please wait...");
  window.setTimeout(measureConnectionSpeed, 1);
}

function measureConnectionSpeed() {
  /** @type {Number} */ let startTime = 0;
  /** @type {Number} */ let endTime = 0;

  /** @type {HTMLImageElement} */
  const download = new Image();
  download.onload = () => {
    endTime = new Date().getTime();
    showResults();
  };

  download.onerror = () => {
    showProgressMessage("Error Running Speed Test, Please Try Again Later...");
  };

  startTime = new Date().getTime();
  /** @type {String} */
  const cacheInvalidator = "?noCache=" + startTime;
  download.src = imageAddr + cacheInvalidator;

  const showResults = () => {
    /** @type {Number} */ const duration = (endTime - startTime) / 1000;
    /** @type {Number} */ const bitsLoaded = downloadSize * 8;
    /** @type {Number} */ const speedBps = (bitsLoaded / duration).toFixed(2);
    /** @type {Number} */ const speedKbps = (speedBps / 1024).toFixed(2);
    /** @type {Number} */ const speedMbps = (speedKbps / 1024).toFixed(2);

    showProgressMessage([
      "Your connection speed is:",
      speedBps + " bps (bits per second)",
      speedKbps + " kbps (Kilobits per second)",
      speedMbps + " Mbps (Megabits per second)",
      "",
      "Realised Connection Speed:",
      speedBps / 8 + " Bps (Bytes per second)",
      speedKbps / 8 + " kBps (KiloBytes per second)",
      speedMbps / 8 + " MBps (MegaBytes per second)",
    ]);
  };
}
