// import initForm from './modules/form.js';
import initMaps from './modules/map.js';
import initPageHeader from './modules/page-header.js';

initPageHeader();
// в load следует добавить скрипты, не участвующие в работе первого экрана
window.addEventListener('load', () => {
  window.pageData = {
    maps: {
      map: {
        initials: {
          center: [59.9387165, 30.3230474],
          controls: [],
          zoom: 16,
        },
        placemark: [
          {
            hintContent: 'г. Санкт Петербург, ул. Большая Конюшенная, 19/8',
          },
          {
            iconImageHref: 'img/sprite.svg#icon-marker',
            iconImageSize: [18, 22],
            iconLayout: 'default#image',
            iconShadow: false,
          },
        ],
      },
    },
  };
  const initLazy = () => {
    if (window.pageYOffset <= window.innerHeight) {
      return;
    }

    initMaps(document.querySelectorAll('[data-map][id]'));
    // document.querySelectorAll('[data-form]').forEach(initForm);

    document.querySelectorAll('[data-lazy-style]').forEach((lazyStyledElement) => {
      lazyStyledElement.setAttribute('style', lazyStyledElement.dataset.lazyStyle);
      lazyStyledElement.removeAttribute('data-lazy-style');
    });

    document.removeEventListener('scroll', scrollHandler);
  };

  function scrollHandler() {
    initLazy();
  }

  if (window.pageYOffset > window.innerHeight) {
    initLazy();
  } else {
    document.addEventListener('scroll', scrollHandler);
  }
});
// привязывайте js не на классы, а на дата-атрибуты (data-validate)

// вместо модификаторов .block--active используем утилитарные классы
// .is-active || .is-open || .is-invalid и прочие (обязателен нейминг в два слова)
// .select.select--opened ❌ ---> [data-select].is-open ✅

// выносим все в дата атрибуты
// url до иконок пинов карты, настройки автопрокрутки слайдера, url к json и т.д.
