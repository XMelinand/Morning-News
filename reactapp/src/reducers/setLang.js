export default function (setLang = '', action) {
    if (action.type == "setLanguage") {
        console.log('added?', action.selectedLanguage);

    return action.selectedLanguage;
    } else {
    return setLang;
    }
}
