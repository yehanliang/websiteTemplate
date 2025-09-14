// 核心功能模块
class H5Core {
  constructor() {
    this.config = window.CONFIG || {};
    this.content = window.CONTENT || {};
    this.init();
  }

  init() {
    this.initLoadingScreen();
    this.initScrollAnimations();
    this.initMobileOptimizations();
  }

  // 加载屏幕
  initLoadingScreen() {
    const loadingScreen = document.createElement("div");
    loadingScreen.className = "loading";
    loadingScreen.innerHTML = `<div class="spinner"></div>`;
    document.body.appendChild(loadingScreen);

    window.addEventListener("load", () => {
      setTimeout(() => {
        loadingScreen.classList.add("hidden");
        setTimeout(() => {
          document.body.removeChild(loadingScreen);
        }, 500);
      }, 1000);
    });
  }

  // 滚动动画
  initScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll(
      ".feature-card, .about-text, .about-image, .contact-info, .contact-form"
    );
    animatedElements.forEach((el) => {
      el.classList.add("fade-in");
      observer.observe(el);
    });
  }

  // 移动端优化
  initMobileOptimizations() {
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
    const isTouch = "ontouchstart" in window;

    if (isMobile || isTouch) {
      document.body.classList.add("mobile-device");
      this.optimizeTouchExperience();
      this.addMobileStyles();
    }

    // 处理屏幕方向变化
    window.addEventListener("orientationchange", () => {
      setTimeout(() => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty("--vh", `${vh}px`);
      }, 100);
    });

    // 设置视口高度变量
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }

  // 优化触摸体验
  optimizeTouchExperience() {
    // 防止双击缩放
    let lastTouchEnd = 0;
    document.addEventListener(
      "touchend",
      (event) => {
        const now = new Date().getTime();
        if (now - lastTouchEnd <= 300) {
          event.preventDefault();
        }
        lastTouchEnd = now;
      },
      false
    );

    // 优化滚动性能
    document.addEventListener("touchstart", () => {}, { passive: true });
    document.addEventListener("touchmove", () => {}, { passive: true });

    // 添加触摸反馈
    const touchElements = document.querySelectorAll(
      ".btn, .nav-link, .theme-btn, .feature-card"
    );
    touchElements.forEach((element) => {
      element.addEventListener("touchstart", function () {
        this.style.transform = "scale(0.95)";
      });

      element.addEventListener("touchend", function () {
        this.style.transform = "scale(1)";
      });
    });
  }

  // 添加移动端样式
  addMobileStyles() {
    const mobileStyle = document.createElement("style");
    mobileStyle.textContent = `
      .mobile-device .hero {
        min-height: 100vh;
        min-height: calc(var(--vh, 1vh) * 100);
      }
      
      .mobile-device .floating-card {
        animation-duration: 8s;
      }
      
      .mobile-device .feature-card:hover {
        transform: none;
      }
      
      .mobile-device .theme-switcher {
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 1000;
        background: var(--bg-primary);
        box-shadow: 0 8px 25px var(--shadow-color);
        border: 1px solid var(--border-color);
      }
      
      .mobile-device .nav-controls {
        gap: 10px;
      }
      
      @media (max-width: 768px) {
        .mobile-device .theme-switcher {
          position: fixed;
          bottom: 20px;
          right: 20px;
          z-index: 1000;
        }
      }
    `;
    document.head.appendChild(mobileStyle);
  }

  // 通知系统
  showNotification(message, type = "info") {
    const notification = document.createElement("div");
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
      <div class="notification-content">
        <i class="fas ${this.getNotificationIcon(type)}"></i>
        <span>${message}</span>
      </div>
    `;

    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${this.getNotificationColor(type)};
      color: white;
      padding: 15px 20px;
      border-radius: 10px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
      z-index: 10000;
      transform: translateX(400px);
      transition: transform 0.3s ease;
      max-width: 300px;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.transform = "translateX(0)";
    }, 100);

    setTimeout(() => {
      notification.style.transform = "translateX(400px)";
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 4000);
  }

  getNotificationIcon(type) {
    const icons = {
      success: "fa-check-circle",
      error: "fa-exclamation-circle",
      info: "fa-info-circle",
      warning: "fa-exclamation-triangle",
    };
    return icons[type] || icons.info;
  }

  getNotificationColor(type) {
    const colors = {
      success: "#10b981",
      error: "#ef4444",
      info: "#3b82f6",
      warning: "#f59e0b",
    };
    return colors[type] || colors.info;
  }
}

// 导出核心类
if (typeof module !== "undefined" && module.exports) {
  module.exports = H5Core;
} else {
  window.H5Core = H5Core;
}
