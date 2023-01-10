const initMap = (mapElement) => {
  const {id} = mapElement;
  const {initials, placemark} = window.pageData.maps[id];

  ymaps.ready(() => {
    const map = new ymaps.Map(id, initials);
    map.geoObjects.add(new ymaps.Placemark(map.getCenter(), ...placemark));
    map.behaviors.disable('scrollZoom');

    mapElement.classList.add('is-ready');
  });
};

export default (mapElements) => {
  if (!window.pageData.maps) {
    return;
  }

  const scriptElement = document.createElement('script');

  scriptElement.src = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU';
  scriptElement.addEventListener('load', () => {
    if (typeof ymaps !== 'undefined') {
      mapElements.forEach(initMap);
    }
  });
  document.body.append(scriptElement);
};
