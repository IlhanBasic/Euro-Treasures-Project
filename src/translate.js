function googleTranslateElementInit() {
    new google.translate.TranslateElement(
        {
            pageLanguage: 'en',
            includedLanguages: 'en,bs', 
            layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
            gaTrack: false,
            doNotShowInfoBox: true,
            autoDisplay: false,
        },
        'google_translate_element'
    );

    document.getElementById('showTranslateMenuButton').addEventListener('click', function () {
        new google.translate.TranslateElement({ layout: google.translate.TranslateElement.InlineLayout.SIMPLE }, 'google_translate_element');
    });
}
