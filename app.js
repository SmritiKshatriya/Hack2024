(function () {
  const config = window.__APP_CONFIG__ || {};

  function setAuth(authenticated) {
    try {
      localStorage.setItem('sb_auth', authenticated ? '1' : '0');
    } catch (e) {}
  }

  function isAuth() {
    try {
      return localStorage.getItem('sb_auth') === '1';
    } catch (e) { return false; }
  }

  function redirectTo(url) {
    window.location.href = url;
  }

  // Login page behavior
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value.trim();
      if (!email || !password) {
        alert('Please enter email and password.');
        return;
      }
      setAuth(true);
      const homeHref = (config && config.homeHref) || 'home.html';
      redirectTo(homeHref);
    });
  }

  // Home page behavior
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function () {
      setAuth(false);
      redirectTo('index.html');
    });
  }

  // Auth guard
  if (config && config.requireAuth && !isAuth()) {
    redirectTo('index.html');
    return;
  }

  // Populate some demo posts in feed
  const feed = document.getElementById('feedItems');
  if (feed) {
    const demoPosts = [
      { name: 'Alex Johnson', time: '2 hrs', text: 'What a beautiful day to code!' },
      { name: 'Jamie Lee', time: '4 hrs', text: 'Coffee ☕ + CSS = ❤️' },
      { name: 'Taylor Kim', time: 'Yesterday', text: 'Just finished a 5k run!' }
    ];
    demoPosts.forEach(function (p) {
      const post = document.createElement('div');
      post.className = 'post card';
      post.innerHTML = `
        <div class="header">
          <div class="avatar">${p.name[0]}</div>
          <div>
            <div class="name">${p.name}</div>
            <div class="time">${p.time}</div>
          </div>
        </div>
        <div class="content">${p.text}</div>
        <div class="actions">
          <button class="pill">👍 Like</button>
          <button class="pill">💬 Comment</button>
          <button class="pill">↗️ Share</button>
        </div>
      `;
      feed.appendChild(post);
    });
  }
})();

