function capitalize(s) {
  return s[0].toUpperCase() + s.slice(1);
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

module.exports.capitalize = capitalize;
module.exports.random = random;
