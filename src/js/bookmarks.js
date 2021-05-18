(function () {
    const showMoreBtn = document.querySelectorAll('.show-more-btn-section button');
    let isShowMoreBtn = !!showMoreBtn.length

    const timer = setInterval(
        () => {
            if (isShowMoreBtn) {
                showMoreBtn[0].dispatchEvent(new Event('click', {
                    bubbles: true,
                    cancelable: true,
                    view: window
                }));

                isShowMoreBtn = !!document.querySelectorAll('.show-more-btn-section button').length;
            } else clearInterval(timer);
        },
        250
    );
})();
