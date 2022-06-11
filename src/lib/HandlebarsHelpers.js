/*
 * A module with some custom block helpers
 */

export default {
  button(type, className, options) {
    const validTypes = ['submit', 'button'];

    if (validTypes.includes(type)) {
      return `<button type="${type}" class="${className}" 
      }">${options.fn()}</button>`;
    }

    return `<button>${options.fn()}</button>`;
  },
};
