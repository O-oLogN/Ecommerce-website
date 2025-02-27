export const setCookie = (key: any, value: any, days: number)=> {
    let expires = ""
    if (days) {
        const date = new Date()
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000))
        expires = "; expires=" + date.toUTCString()
    }
    document.cookie = key + "=" + encodeURIComponent(value) + expires + "; path=/"
}

export const getCookie = (key: any) => {
    let keyEQ = key + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(keyEQ) == 0) {
            return decodeURIComponent(c.substring(keyEQ.length, c.length));
        }
    }
    return null;
}