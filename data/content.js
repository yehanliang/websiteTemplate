// 网站内容数据
const CONTENT = {
  // 首页轮播内容
  heroSlides: [
    {
      id: 1,
      title: "创新科技",
      subtitle: "引领未来",
      description: "我们致力于用最先进的技术，为您提供最优质的解决方案",
      primaryButton: "立即体验",
      secondaryButton: "了解更多",
      features: [
        {
          icon: "fas fa-mobile-alt",
          title: "移动优先",
          description: "完美适配各种设备",
        },
        {
          icon: "fas fa-shield-alt",
          title: "安全可靠",
          description: "企业级安全保障",
        },
        {
          icon: "fas fa-bolt",
          title: "极速响应",
          description: "毫秒级响应时间",
        },
      ],
    },
    {
      id: 2,
      title: "智能AI",
      subtitle: "驱动创新",
      description: "人工智能技术赋能，让您的业务更加智能化、自动化",
      primaryButton: "探索AI",
      secondaryButton: "查看案例",
      features: [
        {
          icon: "fas fa-brain",
          title: "智能分析",
          description: "深度学习和数据分析",
        },
        {
          icon: "fas fa-robot",
          title: "自动化",
          description: "智能流程自动化",
        },
        {
          icon: "fas fa-chart-line",
          title: "预测分析",
          description: "基于数据的智能预测",
        },
      ],
    },
    {
      id: 3,
      title: "云端服务",
      subtitle: "无限可能",
      description: "强大的云计算平台，为您提供稳定、安全、高效的云端服务",
      primaryButton: "开始使用",
      secondaryButton: "了解价格",
      features: [
        {
          icon: "fas fa-cloud",
          title: "弹性扩容",
          description: "按需扩展计算资源",
        },
        {
          icon: "fas fa-database",
          title: "数据存储",
          description: "安全可靠的数据管理",
        },
        {
          icon: "fas fa-globe",
          title: "全球部署",
          description: "覆盖全球的服务网络",
        },
      ],
    },
    {
      id: 4,
      title: "团队协作",
      subtitle: "高效办公",
      description: "专业的团队协作工具，让您的团队更加高效、有序",
      primaryButton: "免费试用",
      secondaryButton: "联系我们",
      features: [
        {
          icon: "fas fa-users",
          title: "团队管理",
          description: "高效的团队协作平台",
        },
        {
          icon: "fas fa-comments",
          title: "实时沟通",
          description: "即时消息和视频会议",
        },
        {
          icon: "fas fa-tasks",
          title: "项目管理",
          description: "任务分配和进度跟踪",
        },
      ],
    },
  ],

  // 特色功能
  features: [
    {
      icon: "fas fa-cog",
      title: "智能配置",
      description: "一键配置，智能优化，让复杂的技术变得简单易用",
    },
    {
      icon: "fas fa-chart-line",
      title: "数据分析",
      description: "实时数据监控，深度分析洞察，助力业务增长",
    },
    {
      icon: "fas fa-users",
      title: "团队协作",
      description: "多人协作，实时同步，提升团队工作效率",
    },
    {
      icon: "fas fa-cloud",
      title: "云端部署",
      description: "弹性扩容，自动备份，确保服务稳定可靠",
    },
    {
      icon: "fas fa-lock",
      title: "安全加密",
      description: "端到端加密，多重验证，保护您的数据安全",
    },
    {
      icon: "fas fa-headset",
      title: "24/7支持",
      description: "全天候技术支持，快速响应，解决您的后顾之忧",
    },
  ],

  // 关于我们
  about: {
    title: "关于我们",
    description:
      "我们是一家专注于创新科技的公司，致力于为客户提供最优质的技术解决方案。自成立以来，我们始终坚持技术创新，不断突破自我，为客户创造更大价值。",
    stats: [
      { number: "1000+", label: "满意客户" },
      { number: "50+", label: "成功项目" },
      { number: "99.9%", label: "服务可用性" },
    ],
  },

  // 联系我们
  contact: {
    title: "联系我们",
    subtitle: "让我们一起创造更美好的未来",
    info: [
      { icon: "fas fa-phone", title: "电话", content: "400-123-4567" },
      {
        icon: "fas fa-envelope",
        title: "邮箱",
        content: "contact@innovate-tech.com",
      },
      {
        icon: "fas fa-map-marker-alt",
        title: "地址",
        content: "北京市朝阳区科技园区",
      },
    ],
  },

  // 页脚信息
  footer: {
    description: "用科技改变世界，让创新引领未来",
    links: [
      { name: "首页", href: "#home" },
      { name: "特色", href: "#features" },
      { name: "关于", href: "#about" },
      { name: "联系", href: "#contact" },
    ],
    social: [
      { icon: "fab fa-weixin", href: "#" },
      { icon: "fab fa-weibo", href: "#" },
      { icon: "fab fa-qq", href: "#" },
    ],
    copyright: "© 2024 创新科技. 保留所有权利.",
  },
};

// 导出内容数据
if (typeof module !== "undefined" && module.exports) {
  module.exports = CONTENT;
} else {
  window.CONTENT = CONTENT;
}
