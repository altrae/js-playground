(function (
    document,
    tagName,
    scriptLocation,
    callback
) {
    var script = document.createElement(tagName),
        firstScript = document.getElementsByTagName(tagName)[0];

    script.async = 1;
    script.src = scriptLocation;

    firstScript.parentNode.insertBefore(script, firstScript);

    if (callback !== undefined && typeof callback === 'function') {
        callback(document);
    }
})(
    this.window.document,
    'script',
    'https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js',
    () => {
        const description = document.querySelector('#pull-request-description');
        const descriptionValue = description.value;
        const template = `
            [ yes | no ] (Creator) 2 PRs for any change
            Corresponding PR for release / 2009.0.0:
            <<replace with corresponding URL>>
            [ yes | no ] (Creator) 2 PRs even for different releases
            [ yes | no ] (Reviewer) Both have green builds
            [ yes | no ] (Merger) Both merged at the same moment
        `.replace(/[\s]{2,}/mg, '\n').trim();

        description = `${template}\n\n${descriptionValue}`;
    }
);

(function () {
    const description = document.querySelector('#pull-request-description');
    const descriptionValue = description.value;
    const request = new Request(
        'https://stash.jcpenney.com/projects/JCP-YODA/repos/yoda-starterkit/raw/CONTRIBUTING.md',
        {
            method: 'GET',
            cache: 'default',
            headers: { 'Content-Type': 'text/plain' }
        }
    );

    fetch(request)
        .then(response => response.text())
        .then(text => {
            description.value = `${text}\n\n${descriptionValue}`;
        });
})();
