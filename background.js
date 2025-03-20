chrome.action.onClicked.addListener(async (tab) => {
    try {
        console.log("Extensión activada en la pestaña:", tab.id);

        // Capturar la pantalla visible
        const dataUrl = await chrome.tabs.captureVisibleTab({ format: 'png' });
        console.log("Captura realizada exitosamente");

        // Generar nombre de archivo con fecha
        const fecha = new Date().toISOString().replace(/:/g, '-').replace(/\..+/, '');
        const filename = `captura-${fecha}.png`;

        // Descargar la imagen
        chrome.downloads.download({
            url: dataUrl,
            filename: filename,
            saveAs: false
        }, (downloadId) => {
            if (chrome.runtime.lastError) {
                console.error("Error al descargar:", chrome.runtime.lastError);
            } else {
                console.log("Descarga iniciada con ID:", downloadId);
            }
        });
    } catch (error) {
        console.error("Error durante la captura:", error);
    }
});