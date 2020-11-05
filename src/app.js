window.onkeydown = (e) => {
  keydown(e.key);
};

window.onkeyup = (e) => {
  keyup(e.key);
};

function keydown(key) {
  const keycap = document.querySelector(`#key-${key}`);
  keycap.className = 'keydown';
}

function keyup(key) {
  const keycap = document.querySelector(`#key-${key}`);
  keycap.className = '';
}
