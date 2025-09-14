// 主应用入口
class H5App {
  constructor() {
    this.core = null;
    this.themeManager = null;
    this.navigationManager = null;
    this.swiperManager = null;
    this.formManager = null;
    this.init();
  }

  init() {
    // 等待DOM加载完成
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => this.initializeApp());
    } else {
      this.initializeApp();
    }
  }

  initializeApp() {
    try {
      // 初始化核心模块
      this.core = new H5Core();

      // 初始化各个功能模块
      this.themeManager = new ThemeManager(this.core);
      this.navigationManager = new NavigationManager(this.core);
      this.swiperManager = new SwiperManager(this.core);
      this.formManager = new FormManager(this.core);

      // 动态生成页面内容
      this.generatePageContent();

      // 初始化其他功能
      this.initCounters();
      this.initParallaxEffects();
      this.initButtonEffects();

      // 将应用实例暴露到全局
      window.H5App = this;

      console.log("H5应用初始化完成");
    } catch (error) {
      console.error("H5应用初始化失败:", error);
    }
  }

  // 动态生成页面内容
  generatePageContent() {
    this.generateFeatures();
    this.generateStats();
    this.generateContactInfo();
    this.generateFooter();
    this.generateHeroSlides();
  }

  // 生成特色功能内容
  generateFeatures() {
    const featuresGrid = document.getElementById("features-grid");
    if (!featuresGrid) return;

    const features = window.CONTENT?.features || [];
    featuresGrid.innerHTML = features
      .map(
        (feature) => `
      <div class="feature-card">
        <div class="feature-icon">
          <i class="${feature.icon}"></i>
        </div>
        <h3>${feature.title}</h3>
        <p>${feature.description}</p>
      </div>
    `
      )
      .join("");
  }

  // 生成统计数据
  generateStats() {
    const statsContainer = document.getElementById("stats");
    if (!statsContainer) return;

    const stats = window.CONTENT?.about?.stats || [];
    statsContainer.innerHTML = stats
      .map(
        (stat) => `
      <div class="stat-item">
        <div class="stat-number">${stat.number}</div>
        <div class="stat-label">${stat.label}</div>
      </div>
    `
      )
      .join("");
  }

  // 生成联系信息
  generateContactInfo() {
    const contactInfo = document.getElementById("contact-info");
    if (!contactInfo) return;

    const info = window.CONTENT?.contact?.info || [];
    contactInfo.innerHTML = info
      .map(
        (item) => `
      <div class="contact-item">
        <i class="${item.icon}"></i>
        <div>
          <h4>${item.title}</h4>
          <p>${item.content}</p>
        </div>
      </div>
    `
      )
      .join("");
  }

  // 生成页脚内容
  generateFooter() {
    const footerContent = document.getElementById("footer-content");
    if (!footerContent) return;

    const footer = window.CONTENT?.footer || {};
    footerContent.innerHTML = `
      <div class="footer-section">
        <div class="footer-logo">
          <i class="fas fa-rocket"></i>
          <span>创新科技</span>
        </div>
        <p>${footer.description || "用科技改变世界，让创新引领未来"}</p>
      </div>
      <div class="footer-section">
        <h4>快速链接</h4>
        <ul>
          ${(footer.links || [])
            .map(
              (link) => `
            <li><a href="${link.href}">${link.name}</a></li>
          `
            )
            .join("")}
        </ul>
      </div>
      <div class="footer-section">
        <h4>关注我们</h4>
        <div class="social-links">
          ${(footer.social || [])
            .map(
              (social) => `
            <a href="${social.href}"><i class="${social.icon}"></i></a>
          `
            )
            .join("")}
        </div>
        <p class="footer-bottom">${
          footer.copyright || "© 2024 创新科技. 保留所有权利."
        }</p>
      </div>
    `;
  }

  // 生成首页轮播内容
  generateHeroSlides() {
    if (this.swiperManager) {
      this.swiperManager.generateHeroSlides();
    }
  }

  // 数字计数动画
  initCounters() {
    const counters = document.querySelectorAll(".stat-number");

    const observerOptions = {
      threshold: 0.5,
    };

    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    counters.forEach((counter) => {
      counterObserver.observe(counter);
    });
  }

  animateCounter(element) {
    const target = parseInt(element.textContent.replace(/[^\d]/g, ""));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }

      // 格式化数字
      if (element.textContent.includes("+")) {
        element.textContent = Math.floor(current) + "+";
      } else if (element.textContent.includes("%")) {
        element.textContent = Math.floor(current) + "%";
      } else {
        element.textContent = Math.floor(current);
      }
    }, 16);
  }

  // 视差效果
  initParallaxEffects() {
    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset;
      const parallaxElements = document.querySelectorAll(".floating-card");

      parallaxElements.forEach((element, index) => {
        const speed = 0.5 + index * 0.1;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
      });
    });
  }

  // 按钮点击效果
  initButtonEffects() {
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("btn")) {
        this.createRippleEffect(e);
      }
    });
  }

  createRippleEffect(e) {
    const ripple = document.createElement("span");
    const rect = e.target.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      background: rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      transform: scale(0);
      animation: ripple 0.6s linear;
      pointer-events: none;
    `;

    e.target.style.position = "relative";
    e.target.style.overflow = "hidden";
    e.target.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  }

  // 页面可见性变化时的处理
  initVisibilityChange() {
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        // 页面隐藏时暂停动画
        document.body.style.animationPlayState = "paused";
      } else {
        // 页面显示时恢复动画
        document.body.style.animationPlayState = "running";
      }
    });
  }

  // 错误处理
  initErrorHandling() {
    window.addEventListener("error", (e) => {
      console.error("页面错误:", e.error);
      this.core.showNotification("页面出现错误，请刷新重试", "error");
    });
  }

  // 性能监控
  initPerformanceMonitoring() {
    window.addEventListener("load", () => {
      const loadTime = performance.now();
      console.log(`页面加载时间: ${Math.round(loadTime)}ms`);

      if (loadTime > 3000) {
        console.warn("页面加载时间较长，建议优化");
      }
    });
  }

  // 键盘导航支持
  initKeyboardNavigation() {
    document.addEventListener("keydown", (e) => {
      // ESC键关闭移动端菜单
      if (e.key === "Escape") {
        const navMenu = document.getElementById("nav-menu");
        const navToggle = document.getElementById("nav-toggle");
        if (navMenu && navToggle) {
          navMenu.classList.remove("active");
          navToggle.classList.remove("active");
        }
      }
    });
  }

  // 公共API
  getCore() {
    return this.core;
  }

  getThemeManager() {
    return this.themeManager;
  }

  getNavigationManager() {
    return this.navigationManager;
  }

  getSwiperManager() {
    return this.swiperManager;
  }

  getFormManager() {
    return this.formManager;
  }
}

// 启动应用
const app = new H5App();
