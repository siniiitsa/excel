import { capitalize } from '@core/utils.js';

export class DomListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error('No $root provided for DomListener!');
    }
    this.$root = $root;
    this.listeners = listeners;
  }

  initDomListeners() {
    this.listeners.forEach((listener) => {
      const method = getMethodName(listener);
      if (!this[method]) {
        throw new Error(`Method ${method} is not impemented in ${this.name}`);
      }
      this.$root.on(listener, this[method].bind(this));
    });
  }

  removeDomListeners() {}
}

const getMethodName = (eventName) => `on${capitalize(eventName)}`;
