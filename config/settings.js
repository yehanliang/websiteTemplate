// 网站配置文件
const CONFIG = {
  // 网站基本信息
  site: {
    name: "创新科技",
    title: "创新科技 - 引领未来",
    description: "我们致力于用最先进的技术，为您提供最优质的解决方案",
    keywords: "创新科技,人工智能,云计算,团队协作,技术解决方案",
  },

  // 主题配置
  themes: {
    light: {
      name: "浅色",
      color: "#6366f1",
    },
    dark: {
      name: "深色",
      color: "#818cf8",
    },
    blue: {
      name: "蓝色",
      color: "#3b82f6",
    },
    green: {
      name: "绿色",
      color: "#10b981",
    },
    purple: {
      name: "紫色",
      color: "#8b5cf6",
    },
  },

  // 导航配置
  navigation: {
    sections: ["home", "features", "about", "contact"],
  },

  // Swiper配置
  swiper: {
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    speed: 800,
    effect: "fade",
  },

  // 动画配置
  animations: {
    duration: 300,
    easing: "cubic-bezier(0.4, 0, 0.2, 1)",
  },

  // 响应式断点
  breakpoints: {
    mobile: 480,
    tablet: 768,
    desktop: 1024,
  },
};

// 导出配置
if (typeof module !== "undefined" && module.exports) {
  module.exports = CONFIG;
} else {
  window.CONFIG = CONFIG;
}
