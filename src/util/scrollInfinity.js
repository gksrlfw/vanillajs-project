

export const throttle = (fn, delay) => {
    let last = 0;
    return (...args) => {
        const now = new Date().getTime();
        if (now - last < delay) return;
        last = now;
        return fn(...args);
    };
};
  
export const  getWindowHeight = () => {
    const html = document.documentElement;
    const body = document.body;

    return Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
}

export const getCurrnetScrollHeight = () => {
    return (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
}

