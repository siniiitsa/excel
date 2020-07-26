class Dom {
  constructor(selector) {
    this.$el =
      typeof selector === 'string'
        ? document.querySelector(selector)
        : selector;
  }

  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html;
      return this;
    }
    return this.$el.outerHTML.trim();
  }

  clear() {
    this.html('');
    return this;
  }

  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback);
  }

  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback);
  }

  append(...elements) {
    elements = elements.map((el) => (el instanceof Dom ? el.$el : el));
    if (elements.length > 0) {
      this.$el.append(...elements);
    }
    return this;
  }
}

export function $(selector) {
  return new Dom(selector);
}

$.create = (tagName, classes) => {
  const el = document.createElement(tagName);
  if (classes) {
    el.classList.add(classes);
  }
  return $(el);
};
