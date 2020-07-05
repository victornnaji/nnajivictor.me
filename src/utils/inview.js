const isinView = (elm) => {

    const isSSR = typeof window === 'undefined';
    if(isSSR !== null ){
        var rect = elm.getBoundingClientRect();
        var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
        return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
    }
}

export default isinView;