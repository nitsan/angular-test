function onSetCookie(cookieKey, domain) {
  const cookieValue = document.getElementById('cookieValue').value;
  console.log('onSetCookie', cookieKey, cookieValue, domain);
  document.cookie = `${cookieKey}=${cookieValue}; path=/; domain=${domain}; SameSite=None;`;
}

function readCookie() {
  document.getElementById('cookie').innerText = document.cookie;
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function callServer(cookieKey, domain) {
  fetch('/api/test', {
    method: 'POST', headers: {
      'Content-Type': 'application/json'
    }, body: JSON.stringify({cookieKey, domain})
  })
    .then(response => response.json())
    .then(data => {
      console.log('data', data);
    });
}
