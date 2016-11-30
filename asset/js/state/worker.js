onmessage = function (eve) {
    console.log(eve.data);
    postMessage('go');
}
