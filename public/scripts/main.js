/* eslint-disable eqeqeq */
/* eslint-disable no-param-reassign */
const app = {
  init() {
    this.cacheElements();
    this.registerListeners();
    this.changeCurrentCategory();
    this.changeTheme();
  },

  cacheElements() {
    this.$delete_task_buttons = document.querySelectorAll('.red-button');
    this.$finish_task_buttons = document.querySelectorAll('.green-button');
    this.$edit_task_buttons = document.querySelectorAll('.editTask-button');
    this.$delete_category_buttons = document.querySelectorAll(
      '.delete-category-button'
    );
    this.$edit_category_buttons = document.querySelectorAll(
      '.edit-category-button'
    );
    this.$categories = document.querySelectorAll('.category');
    this.$theme = document.querySelector('.theme-switcher');
  },

  registerListeners() {
    this.$delete_task_buttons.forEach((button) => {
      button.addEventListener(
        'click',
        async (ev) => {
          const id =
            ev.target.parentNode.parentNode.dataset.id ||
            ev.target.parentNode.parentNode.parentNode.dataset.id;
          await fetch(`http://localhost:3000/api/toDoItem/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-type': 'application/json',
            },
          });
          document.location.reload();
        },
        false
      );
    });

    this.$finish_task_buttons.forEach((button) => {
      button.addEventListener(
        'click',
        async (ev) => {
          const id =
            ev.target.parentNode.parentNode.dataset.id ||
            ev.target.parentNode.parentNode.parentNode.dataset.id;
          await fetch(`http://localhost:3000/api/toDoItem`, {
            method: 'PUT',
            headers: {
              'Content-type': 'application/json',
            },
            body: JSON.stringify({ id: `${id}`, finished: true }),
          });
          document.location.reload();
        },
        false
      );
    });

    this.$edit_task_buttons.forEach((button) => {
      button.addEventListener(
        'click',
        async (ev) => {
          const text = window.prompt('What do you want to change the task to?');
          const id =
            ev.target.parentNode.parentNode.dataset.id ||
            ev.target.parentNode.parentNode.parentNode.dataset.id;
          const name =
            ev.target.parentNode.parentNode.dataset.name ||
            ev.target.parentNode.parentNode.parentNode.dataset.name;
          await fetch(`http://localhost:3000/api/toDoItem`, {
            method: 'PUT',
            headers: {
              'Content-type': 'application/json',
            },
            body: JSON.stringify({
              id: `${id}`,
              name: `${text !== null && text !== '' ? text : name}`,
            }),
          });
          document.location.reload();
        },
        false
      );
    });

    this.$edit_category_buttons.forEach((button) => {
      button.addEventListener(
        'click',
        async (ev) => {
          const text = window.prompt(
            'What do you want to change the category to?'
          );
          const id = ev.target.dataset.id || ev.target.parentNode.dataset.id;
          const name =
            ev.target.dataset.name || ev.target.parentNode.dataset.name;
          await fetch(`http://localhost:3000/api/category`, {
            method: 'PUT',
            headers: {
              'Content-type': 'application/json',
            },
            body: JSON.stringify({
              id: `${id}`,
              name: `${text !== null && text !== '' ? text : name}`,
            }),
          });
          document.location.reload();
        },
        false
      );
    });

    this.$delete_category_buttons.forEach((button) => {
      button.addEventListener(
        'click',
        async (ev) => {
          const id = ev.target.dataset.id || ev.target.parentNode.dataset.id;
          await fetch(`http://localhost:3000/api/category/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-type': 'application/json',
            },
          });
          document.location.reload();
        },
        false
      );
    });

    this.$theme.addEventListener(
      'click',
      () => {
        const $body = document.querySelector('body');
        $body.classList.toggle('theme-dark');
        $body.classList.toggle('theme-light');
        if ($body.classList.contains('theme-dark')) {
          localStorage.setItem('theme', 'theme-dark');
        } else {
          localStorage.setItem('theme', 'theme-light');
        }
      },
      false
    );
  },

  changeCurrentCategory() {
    const url = new URL(window.location.href);
    const categoryId = url.href.charAt(url.href.length - 1);
    this.$categories.forEach((category) => {
      if (category.dataset.id === categoryId) {
        category.classList.toggle('current-list');
      }
    });
  },

  changeTheme() {
    const $body = document.querySelector('body');
    if (!$body.classList.contains(localStorage.getItem('theme'))) {
      $body.classList.remove(...$body.classList);
      $body.classList.add(localStorage.getItem('theme'));
    }
  },
};

app.init();
