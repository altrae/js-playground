(function(document, tagName, scriptLocation, callback) {
    var script = document.createElement(tagName),
        firstScript = document.getElementsByTagName(tagName)[0];
    script.async = 1;
    script.src = scriptLocation;
    if (callback !== undefined && typeof callback === 'function') {
        callback(document);
    }
    firstScript.parentNode.insertBefore(script, firstScript);
})(this.window.document, 'script', 'https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js', function() {
    const fontsLoaded = document.querySelector('[class*=fontsLoaded] .hide');
    console.log('fontsLoaded', fontsLoaded);
});