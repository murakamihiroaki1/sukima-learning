// ハンバーガーメニューの開閉
function toggleMenu() {
    const navMenu = document.getElementById('navMenu');
    const hamburger = document.querySelector('.hamburger');
    
    if (navMenu && hamburger) {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    }
}

// ページ読み込み時の初期化
document.addEventListener('DOMContentLoaded', function() {
    // checkLoginStatus を持たないページのみ簡易表示（clf/aif/saa 等は window.onload 側で処理）
    if (typeof checkLoginStatus !== 'function') {
        checkAuthStatus();
    }

    // メニュー外クリックで閉じる
    document.addEventListener('click', function(event) {
        const navMenu = document.getElementById('navMenu');
        const hamburger = document.querySelector('.hamburger');
        const navHeader = document.querySelector('.nav-header');
        
        if (navMenu && hamburger && navHeader) {
            if (!navHeader.contains(event.target)) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        }
    });
});

// 認証状態の確認（checkLoginStatus を持たないページ用）
function checkAuthStatus() {
    const token = localStorage.getItem('accessToken');

    if (token) {
        fetch('https://sukima-learning.onrender.com/api/auth/me', {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        .then(response => {
            if (!response.ok) throw new Error('Unauthorized');
            return response.json();
        })
        .then(data => {
            _showNavLoggedIn(data.user.username, data.user.membership_level, data.user.membership_expiry);
        })
        .catch(() => {
            localStorage.removeItem('accessToken');
            _showNavLoggedOut();
        });
    } else {
        _showNavLoggedOut();
    }
}

// ナビゲーションのログイン表示（.logged-out / .logged-in を操作）
function _showNavLoggedIn(username, membershipLevel, membershipExpiry) {
    const loggedOut = document.querySelector('.logged-out');
    const loggedIn  = document.querySelector('.logged-in');
    if (loggedOut) loggedOut.style.display = 'none';
    if (loggedIn)  loggedIn.style.display  = 'flex';

    const usernameEl = document.getElementById('username');
    if (usernameEl) usernameEl.textContent = username;

    const userPlanEl = document.getElementById('userPlan');
    if (userPlanEl) {
        const level = (membershipLevel || 'free').toLowerCase();
        userPlanEl.textContent = level.charAt(0).toUpperCase() + level.slice(1);
        userPlanEl.style.background =
            level === 'advanced' ? '#667eea' :
            level === 'standard' ? '#FF9900' : '#9e9e9e';
    }

    const userExpiryEl = document.getElementById('userExpiry');
    if (userExpiryEl) {
        const level = (membershipLevel || 'free').toLowerCase();
        if (membershipExpiry && level !== 'free') {
            const expiryDate = new Date(membershipExpiry);
            const daysLeft = Math.ceil((expiryDate - new Date()) / (1000 * 60 * 60 * 24));
            const fmt = expiryDate.toLocaleDateString('ja-JP');
            userExpiryEl.textContent = daysLeft > 0 ? `有効期限: ${fmt}` : '期限切れ';
            userExpiryEl.style.display = 'inline-block';
        } else {
            userExpiryEl.style.display = 'none';
        }
    }
}

// ナビゲーションのログアウト表示
function _showNavLoggedOut() {
    const loggedOut = document.querySelector('.logged-out');
    const loggedIn  = document.querySelector('.logged-in');
    if (loggedOut) loggedOut.style.display = 'flex';
    if (loggedIn)  loggedIn.style.display  = 'none';
}

// ログアウト処理（ナビ内ボタン用）
function logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    window.location.href = 'index.html';
}

// Made with Bob
