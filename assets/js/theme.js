// 主题管理模块
class ThemeManager {
  constructor(core) {
    this.core = core;
    this.config = window.CONFIG || {};
    this.init();
  }

  init() {
    this.initThemeSystem();
  }

  // 主题系统初始化
  initThemeSystem() {
    const themeSwitcher = document.getElementById("theme-switcher");
    const themeButtons = document.querySelectorAll(".theme-btn");

    // 从本地存储获取保存的主题
    const savedTheme = localStorage.getItem("h5-theme") || "light";
    this.applyTheme(savedTheme);

    // 为主题按钮添加点击事件
    themeButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        const theme = e.currentTarget.getAttribute("data-theme");
        this.switchTheme(theme);
      });
    });

    // 设置当前主题按钮为激活状态
    this.setActiveThemeButton(savedTheme);
  }

  // 切换主题
  switchTheme(theme) {
    this.applyTheme(theme);
    localStorage.setItem("h5-theme", theme);
    this.setActiveThemeButton(theme);
    this.core.showNotification(
      `已切换到${this.getThemeName(theme)}主题`,
      "success"
    );
  }

  // 应用主题
  applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);

    // 更新meta标签以支持系统主题
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
      metaTheme.content = this.getThemeColor(theme);
    } else {
      const meta = document.createElement("meta");
      meta.name = "theme-color";
      meta.content = this.getThemeColor(theme);
      document.head.appendChild(meta);
    }
  }

  // 设置活动主题按钮
  setActiveThemeButton(theme) {
    // 更新顶部导航栏主题按钮
    const topThemeBtns = document.querySelectorAll(".theme-btn");
    topThemeBtns.forEach((btn) => {
      btn.classList.remove("active");
      if (btn.getAttribute("data-theme") === theme) {
        btn.classList.add("active");
      }
    });
  }

  // 获取主题名称
  getThemeName(theme) {
    const themeNames = this.config.themes || {};
    return themeNames[theme]?.name || "浅色";
  }

  // 获取主题颜色
  getThemeColor(theme) {
    const themeColors = this.config.themes || {};
    return themeColors[theme]?.color || "#6366f1";
  }
}

// 导出主题管理类
if (typeof module !== "undefined" && module.exports) {
  module.exports = ThemeManager;
} else {
  window.ThemeManager = ThemeManager;
}
