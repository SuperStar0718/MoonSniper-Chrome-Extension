function sendData()
{
    var msg = {
        type: 'type',
        data: 'data'
    };
    window.postMessage(msg, "*");
    window.parent.postMessage(msg, "*");

}
document.getElementById("dashboard").addEventListener("click", sendData);

