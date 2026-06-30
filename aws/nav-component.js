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
    // 認証状態の確認
    checkAuthStatus();
    
    // メニュー外クリックで閉じる
    document.addEventListener('click', function(event) {
        const navMenu = document.getElementById('navMenu');
        const hamburger = document.querySelector('.hamburger');
        const navHeader = document.querySelector('.nav-header');
        
        if (navMenu && hamburger && navHeader) {
            // クリックがナビゲーション外の場合、メニューを閉じる
            if (!navHeader.contains(event.target)) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        }
    });
});

// 認証状態の確認
function checkAuthStatus() {
    const token = localStorage.getItem('accessToken');
    const authButtons = document.querySelector('.auth-buttons');
    
    if (!authButtons) return;
    
    if (token) {
        // ログイン済み - ユーザー情報を表示
        fetch('https://sukima-learning.onrender.com/api/auth/me', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Unauthorized');
            }
            return response.json();
        })
        .then(data => {
            // プランバッジの色
            const level = (data.user.membership_level || 'free').toLowerCase();
            const badgeColor = level === 'advanced' ? '#667eea' : level === 'standard' ? '#FF9900' : '#9e9e9e';
            const displayLevel = level.charAt(0).toUpperCase() + level.slice(1);

            // ユーザー情報を表示
            authButtons.innerHTML = `
                <div class="user-info">
                    <span class="user-icon">👤</span>
                    <span class="username">${data.user.username}</span>
                    <span style="margin-left:8px;padding:2px 8px;background:${badgeColor};color:#fff;border-radius:10px;font-size:0.75em;font-weight:bold;">${displayLevel}</span>
                </div>
                <button onclick="logout()" class="auth-btn logout">ログアウト</button>
            `;
        })
        .catch(error => {
            // トークンが無効な場合は削除
            localStorage.removeItem('accessToken');
            showLoginButtons();
        });
    } else {
        // 未ログイン - ログイン/新規登録ボタンを表示
        showLoginButtons();
    }
}

// ログイン/新規登録ボタンを表示
function showLoginButtons() {
    const authButtons = document.querySelector('.auth-buttons');
    if (authButtons) {
        authButtons.innerHTML = `
            <a href="login.html" class="auth-btn login">ログイン</a>
            <a href="signup.html" class="auth-btn signup">新規登録</a>
        `;
    }
}

// ログアウト処理
function logout() {
    localStorage.removeItem('accessToken');
    window.location.href = 'index.html';
}

// Made with Bob
