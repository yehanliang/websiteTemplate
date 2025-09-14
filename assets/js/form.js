// 表单管理模块
class FormManager {
  constructor(core) {
    this.core = core;
    this.init();
  }

  init() {
    this.initFormHandling();
  }

  // 表单处理初始化
  initFormHandling() {
    const contactForm = document.querySelector(".contact-form form");

    if (contactForm) {
      contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        this.handleFormSubmit(contactForm);
      });
    }
  }

  // 处理表单提交
  handleFormSubmit(form) {
    // 获取表单数据
    const formData = new FormData(form);
    const name = form.querySelector('input[type="text"]').value;
    const email = form.querySelector('input[type="email"]').value;
    const message = form.querySelector("textarea").value;

    // 简单验证
    if (!name || !email || !message) {
      this.core.showNotification("请填写所有必填字段", "error");
      return;
    }

    if (!this.isValidEmail(email)) {
      this.core.showNotification("请输入有效的邮箱地址", "error");
      return;
    }

    // 模拟发送
    this.core.showNotification("消息发送中...", "info");

    setTimeout(() => {
      this.core.showNotification("消息发送成功！我们会尽快回复您。", "success");
      form.reset();
    }, 2000);
  }

  // 邮箱验证
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // 表单验证
  validateForm(form) {
    const errors = [];
    const name = form.querySelector('input[type="text"]');
    const email = form.querySelector('input[type="email"]');
    const message = form.querySelector("textarea");

    // 验证姓名
    if (!name.value.trim()) {
      errors.push("请输入您的姓名");
      this.addErrorClass(name);
    } else {
      this.removeErrorClass(name);
    }

    // 验证邮箱
    if (!email.value.trim()) {
      errors.push("请输入您的邮箱");
      this.addErrorClass(email);
    } else if (!this.isValidEmail(email.value)) {
      errors.push("请输入有效的邮箱地址");
      this.addErrorClass(email);
    } else {
      this.removeErrorClass(email);
    }

    // 验证消息
    if (!message.value.trim()) {
      errors.push("请输入您的消息");
      this.addErrorClass(message);
    } else {
      this.removeErrorClass(message);
    }

    return errors;
  }

  // 添加错误样式
  addErrorClass(element) {
    element.classList.add("error");
  }

  // 移除错误样式
  removeErrorClass(element) {
    element.classList.remove("error");
  }

  // 显示验证错误
  showValidationErrors(errors) {
    errors.forEach((error) => {
      this.core.showNotification(error, "error");
    });
  }

  // 重置表单
  resetForm(form) {
    form.reset();
    const inputs = form.querySelectorAll("input, textarea");
    inputs.forEach((input) => {
      this.removeErrorClass(input);
    });
  }
}

// 导出表单管理类
if (typeof module !== "undefined" && module.exports) {
  module.exports = FormManager;
} else {
  window.FormManager = FormManager;
}
