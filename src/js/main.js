const { shell, app, ipcRenderer } = window.require('electron');

console.log("Currently running");
setInterval(() => {
    ipcRenderer.send("hello-world", "Greetings from the other side");
}, 5000);

ipcRenderer.on("reply-world", (event, data) => {
    console.log(data);
});
/*
module.exports = () => {
}
*/
