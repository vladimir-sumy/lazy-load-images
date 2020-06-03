    function lazyload(selector){
        var images = document.querySelectorAll(selector);
        if(!('IntersectionObserver' in window)) {
            images.forEach(image => {
                handleImage(image);
            })
        } else {
            let config = {
                rootMargin: '400px 0px',
                threshold: 0.01
            };
            if ( window.innerWidth < 680 ) {
                config.rootMargin = '200px 0px';
            }
            let observer = new IntersectionObserver(observeImages, config);

            images.forEach(image => {
                observer.observe(image);
            });

            function observeImages(entries) {
                entries.forEach(entry => {
                    if(entry.intersectionRatio > 0) {
                        observer.unobserve(entry.target);
                        handleImage(entry.target);
                    }
                })
            }
        }

        function handleImage(el) {
            preloadImage(el.dataset.src).then(src => {
                el.tagName === 'IMG' ?
                    el.src = src :
                    el.style.backgroundImage = 'url('+ src +')';

                el.classList.add('fade');
                el.removeAttribute('data-src');
            })
        }

        function preloadImage(url) {
            return new Promise((resolve,reject) => {
                let image = new Image();
                image.load = resolve(url);
                image.error = reject;
                image.src = url;
            })
        }

    }

    lazyload('.image-lazy-load');
