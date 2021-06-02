class Carousel {
    constructor(containerElement, itemWidth, minItemPadding) {
        this.containerElement = containerElement;
        this.minPadding = minItemPadding; //padding on either side of item
        
        this.leftArrow = containerElement.querySelector(".carousel-left");
        this.rightArrow = containerElement.querySelector(".carousel-right");
        
        this.itemsContainer = containerElement.querySelector(".carousel-items");
        this.itemsContainerWidth = this.itemsContainer.clientWidth;
        this.itemsContainer.style.position = "relative";

        this.items = Array.prototype.slice.call(this.itemsContainer.querySelectorAll(".carousel-item"));
        this.itemWidth = itemWidth

        this.itemsPerSlide = Math.floor(this.itemsContainerWidth / (this.minPadding + this.itemWidth));

        this.numSlides = Math.ceil(this.items.length / this.itemsPerSlide);
        this.currentSlide = 1;

        this.distributeItems();
        this.rightArrow.parentElement.addEventListener("click", this.goForward.bind(this));
        this.leftArrow.parentElement.addEventListener("click", this.goBackward.bind(this));
    }

    distributeItems() {
        this.items.forEach((card, i) => {
            card.style.position = "absolute";
            const padding = ((this.itemsContainerWidth / this.itemsPerSlide) - 325);
            card.style.left = padding / 2 + (this.itemWidth + padding) * i;
        });
    }

    goForward() {
        if (this.currentSlide < this.numSlides) {
            this.items.forEach(card => {
                card.style.left = parseInt(card.style.left) - this.itemsContainerWidth;
            });
            this.currentSlide++;
        }
    }

    goBackward() {
        if (this.currentSlide > 1) {
            this.items.forEach(card => {
                card.style.left = parseInt(card.style.left) + this.itemsContainerWidth;
            });
            this.currentSlide--;
        }
    }

    init() {
        //write initialization so that when window resizes it redraws the carousel. should call in constructor to replace setup as well;
    }
}

class Slideshow {
    constructor(element, imagePrefix, imagePath, numImages, interval = 5000) {
        this.pathPrefix = imagePath + imagePrefix;
        this.currentSlide = 0;
        this.numSlides = numImages - 1
        this.slideshowElement = element;

        this.slideshowElement.setAttribute("src", this.pathPrefix + this.currentSlide + ".jpg")
        setInterval(this.nextSlide.bind(this), interval);
    }

    nextSlide() {
        let nextSlide = this.currentSlide;
        if (this.currentSlide < this.numSlides) {
            nextSlide++;
        } else {
            nextSlide = 0;
        }
        this.slideshowElement.setAttribute("src", this.pathPrefix + nextSlide + ".jpg");
        this.currentSlide = nextSlide;
    }
}

const bannerSlideshow = new Slideshow(document.querySelector(".about-banner img"), "slideshowImg-", "./assets/bannerPhotos/", 9);
const projectsCarousel = new Carousel(document.querySelector(".carousel-container"), 325, 75);