// Swiper轮播管理模块
class SwiperManager {
  constructor(core) {
    this.core = core;
    this.config = window.CONFIG || {};
    this.content = this.core.content || window.CONTENT || {};
    this.heroSwiper = null;
    this.init();
  }

  init() {
    this.generateHeroSlides();
  }

  // 首页Swiper初始化
  initHeroSwiper() {
    const swiperConfig = this.config.swiper || {};

    this.heroSwiper = new Swiper(".hero-swiper", {
      direction: "horizontal",
      loop: true,
      speed: swiperConfig.speed || 800,
      autoplay: {
        delay: swiperConfig.autoplay?.delay || 5000,
        disableOnInteraction:
          swiperConfig.autoplay?.disableOnInteraction || false,
      },
      effect: swiperConfig.effect || "fade",
      fadeEffect: {
        crossFade: true,
      },
      pagination: {
        el: ".hero-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".hero-nav-next",
        prevEl: ".hero-nav-prev",
      },
      on: {
        slideChange: () => {
          //   console.log("Hero slide changed to:", this.heroSwiper.activeIndex);
        },
      },
    });

    // 保存hero swiper实例到全局
    window.heroSwiper = this.heroSwiper;
  }

  // 动态生成轮播内容
  generateHeroSlides() {
    const slides = window.CONTENT?.heroSlides || [];
    const swiperWrapper = document.querySelector(".swiper-wrapper");

    if (!swiperWrapper) {
      console.warn("Swiper wrapper not found");
      return;
    }

    if (slides.length === 0) {
      console.warn("No hero slides data found");
      return;
    }

    // 清空现有内容
    swiperWrapper.innerHTML = "";

    // 生成新的轮播内容
    slides.forEach((slide, index) => {
      const slideElement = this.createSlideElement(slide, index);
      swiperWrapper.appendChild(slideElement);
    });

    // 初始化Swiper
    this.initHeroSwiper();
  }

  // 创建轮播项元素
  createSlideElement(slide, index) {
    const slideDiv = document.createElement("div");
    slideDiv.className = "swiper-slide hero-slide";

    const featuresHtml = slide.features
      .map(
        (feature) => `
      <div class="floating-card">
        <i class="${feature.icon}"></i>
        <h3>${feature.title}</h3>
        <p>${feature.description}</p>
      </div>
    `
      )
      .join("");

    slideDiv.innerHTML = `
      <div class="hero-content">
        <div class="hero-text">
          <h1 class="hero-title">
            <span class="gradient-text">${slide.title}</span>
            <br>${slide.subtitle}
          </h1>
          <p class="hero-subtitle">${slide.description}</p>
          <div class="hero-buttons">
            <button class="btn btn-primary">${slide.primaryButton}</button>
            <button class="btn btn-secondary">${slide.secondaryButton}</button>
          </div>
        </div>
        <div class="hero-image">
          ${featuresHtml}
        </div>
      </div>
    `;

    return slideDiv;
  }

  // 更新轮播内容
  updateSlides(newSlides) {
    this.content.heroSlides = newSlides;
    this.generateHeroSlides();
  }

  // 添加新轮播项
  addSlide(slide) {
    if (!this.content.heroSlides) {
      this.content.heroSlides = [];
    }
    this.content.heroSlides.push(slide);
    this.generateHeroSlides();
  }

  // 移除轮播项
  removeSlide(index) {
    if (this.content.heroSlides && this.content.heroSlides[index]) {
      this.content.heroSlides.splice(index, 1);
      this.generateHeroSlides();
    }
  }

  // 跳转到指定轮播项
  goToSlide(index) {
    if (this.heroSwiper) {
      this.heroSwiper.slideTo(index);
    }
  }

  // 播放/暂停自动播放
  toggleAutoplay() {
    if (this.heroSwiper) {
      if (this.heroSwiper.autoplay.running) {
        this.heroSwiper.autoplay.stop();
      } else {
        this.heroSwiper.autoplay.start();
      }
    }
  }
}

// 导出Swiper管理类
if (typeof module !== "undefined" && module.exports) {
  module.exports = SwiperManager;
} else {
  window.SwiperManager = SwiperManager;
}
