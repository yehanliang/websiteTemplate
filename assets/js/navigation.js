// 导航管理模块
class NavigationManager {
  constructor(core) {
    this.core = core;
    this.config = window.CONFIG || {};
    this.init();
  }

  init() {
    this.initTopNavigation();
    this.initSmoothScrolling();
  }

  // 顶部导航栏初始化
  initTopNavigation() {
    const navToggle = document.getElementById("nav-toggle");
    const navMenu = document.getElementById("nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");

    // 移动端菜单切换
    navToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");
      navToggle.classList.toggle("active");
    });

    // 点击导航链接时关闭移动端菜单
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active");
        navToggle.classList.remove("active");
      });
    });

    // 滚动时导航栏样式变化
    window.addEventListener("scroll", () => {
      const navbar = document.querySelector(".navbar");
      if (window.scrollY > 100) {
        navbar.style.background = "var(--navbar-bg)";
        navbar.style.boxShadow = "0 2px 20px var(--navbar-shadow)";
      } else {
        navbar.style.background = "var(--navbar-bg)";
        navbar.style.boxShadow = "none";
      }
    });

    // 高亮当前页面导航项
    window.addEventListener("scroll", () => this.updateActiveNavLink());
  }

  // 平滑滚动初始化
  initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();

        const targetId = link.getAttribute("href");
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
          const offsetTop = targetSection.offsetTop - 70; // 考虑导航栏高度
          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          });
        }
      });
    });
  }

  // 更新导航栏活动链接（基于滚动位置）
  updateActiveNavLink() {
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-link");

    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.clientHeight;
      if (
        window.scrollY >= sectionTop &&
        window.scrollY < sectionTop + sectionHeight
      ) {
        current = section.getAttribute("id");
      }
    });

    // 更新顶部导航栏
    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  }
}

// 导出导航管理类
if (typeof module !== "undefined" && module.exports) {
  module.exports = NavigationManager;
} else {
  window.NavigationManager = NavigationManager;
}
