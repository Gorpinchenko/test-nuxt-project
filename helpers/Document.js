export function registerOutElementClick(elem, func) {
  const handler = function (event) {
    const el = elem;
    const target = event.target;
    if (el !== target && !el.contains(target)) {
      func();
    }
  };

  document.addEventListener('click', handler);

  return handler;
}

export function removeOutElementClick(handler) {
  document.removeEventListener('click', handler);
}
