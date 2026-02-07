/**
 * フロントエンド用 会員レベルアクセス制御
 */

// 会員レベル定数
const MEMBERSHIP_LEVELS = {
    FREE: 'free',
    STANDARD: 'standard',
    ADVANCED: 'advanced'
};

/**
 * 会員情報を取得
 */
async function getMembershipInfo() {
    const token = localStorage.getItem('accessToken');
    if (!token) {
        return {
            level: MEMBERSHIP_LEVELS.FREE,
            isValid: true,
            expiry: null,
            isLoggedIn: false  // 未ログイン状態を示すフラグ
        };
    }

    try {
        const response = await fetch('https://sukima-learning-api.onrender.com/api/membership/info', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            const data = await response.json();
            return data.membership;
        }
    } catch (error) {
        console.error('Failed to fetch membership info:', error);
    }

    return {
        level: MEMBERSHIP_LEVELS.FREE,
        isValid: true,
        expiry: null
    };
}

/**
 * 問題へのアクセス権限をチェック
 */
function checkQuestionAccess(membership, questionId, examType) {
    const level = membership.isValid ? membership.level : MEMBERSHIP_LEVELS.FREE;

    // Freeプラン: 問題1-20のみ
    if (level === MEMBERSHIP_LEVELS.FREE) {
        return questionId >= 1 && questionId <= 20;
    }

    // Standardプラン: Foundational/Associateの全問題
    if (level === MEMBERSHIP_LEVELS.STANDARD) {
        const allowedExams = ['clf', 'aif', 'saa'];
        return allowedExams.includes(examType.toLowerCase());
    }

    // Advancedプラン: すべて
    if (level === MEMBERSHIP_LEVELS.ADVANCED) {
        return true;
    }

    return false;
}

/**
 * アクセス可能な問題範囲を取得
 */
function getAccessibleQuestionRange(membership, examType) {
    const level = membership.isValid ? membership.level : MEMBERSHIP_LEVELS.FREE;

    // Freeプラン: 1-20
    if (level === MEMBERSHIP_LEVELS.FREE) {
        return { min: 1, max: 20 };
    }

    // Standardプラン
    if (level === MEMBERSHIP_LEVELS.STANDARD) {
        const allowedExams = ['clf', 'aif', 'saa'];
        if (allowedExams.includes(examType.toLowerCase())) {
            return { min: 1, max: Infinity };
        }
        return { min: 1, max: 20 };
    }

    // Advancedプラン: すべて
    if (level === MEMBERSHIP_LEVELS.ADVANCED) {
        return { min: 1, max: Infinity };
    }

    return { min: 1, max: 20 };
}

/**
 * 問題リストをフィルタリング
 */
function filterQuestionsByAccess(questions, membership, examType) {
    const range = getAccessibleQuestionRange(membership, examType);
    console.log('filterQuestionsByAccess - range:', range);
    console.log('filterQuestionsByAccess - membership:', membership);
    console.log('filterQuestionsByAccess - examType:', examType);
    
    const filtered = questions.filter(q => {
        const questionId = q.id || q.questionId;
        const hasAccess = questionId >= range.min && questionId <= range.max;
        console.log(`Question ${questionId}: hasAccess=${hasAccess} (range: ${range.min}-${range.max})`);
        return hasAccess;
    });
    
    console.log('filterQuestionsByAccess - filtered count:', filtered.length);
    return filtered;
}

/**
 * アクセス制限メッセージを表示
 */
function showAccessLimitMessage(membership, container) {
    const level = membership.isValid ? membership.level : MEMBERSHIP_LEVELS.FREE;
    const isLoggedIn = membership.isLoggedIn !== false; // デフォルトはログイン済みとみなす

    let message = '';
    let upgradeLink = '';

    if (level === MEMBERSHIP_LEVELS.FREE) {
        if (!isLoggedIn) {
            // 未ログイン状態
            message = 'ℹ️ 問題1-20は無料でアクセス可能です';
            upgradeLink = '<a href="login.html" style="color: #FF9900; font-weight: bold;">ログイン</a>または<a href="signup.html" style="color: #FF9900; font-weight: bold; margin-left: 5px;">新規登録</a>してすべての問題にアクセス';
        } else {
            // ログイン済みFree会員
            message = '⚠️ Freeプランでは問題1-20のみアクセス可能です';
            upgradeLink = '<a href="pricing.html" style="color: #FF9900; font-weight: bold;">Standardプランにアップグレード</a>してすべての問題にアクセス';
        }
    } else if (level === MEMBERSHIP_LEVELS.STANDARD) {
        message = 'ℹ️ StandardプランではFoundational認定とAssociate認定の全問題にアクセス可能です';
        upgradeLink = '<a href="pricing.html" style="color: #FF9900; font-weight: bold;">Advancedプランにアップグレード</a>してProfessional認定にもアクセス';
    } else {
        return; // Advancedプランはメッセージ不要
    }

    const messageDiv = document.createElement('div');
    messageDiv.style.cssText = `
        background: #fff3cd;
        border: 1px solid #ffc107;
        border-radius: 8px;
        padding: 15px 20px;
        margin: 20px 0;
        text-align: center;
    `;
    messageDiv.innerHTML = `
        <p style="margin: 0 0 10px 0; font-size: 1.1em;">${message}</p>
        <p style="margin: 0; font-size: 0.95em;">${upgradeLink}</p>
    `;

    if (container) {
        container.insertBefore(messageDiv, container.firstChild);
    }
}

/**
 * 問題番号にロックアイコンを追加
 */
function addLockIconToQuestion(questionElement, questionId, membership, examType) {
    const hasAccess = checkQuestionAccess(membership, questionId, examType);
    
    if (!hasAccess) {
        const lockIcon = document.createElement('span');
        lockIcon.innerHTML = ' 🔒';
        lockIcon.title = 'この問題にアクセスするにはアップグレードが必要です';
        lockIcon.style.cursor = 'help';
        questionElement.appendChild(lockIcon);
    }
}

/**
 * 問題をロード時にフィルタリング
 */
async function loadQuestionsWithAccessControl(questions, examType, containerSelector) {
    const membership = await getMembershipInfo();
    const accessibleQuestions = filterQuestionsByAccess(questions, membership, examType);
    
    // アクセス制限メッセージを表示
    const container = document.querySelector(containerSelector);
    if (container) {
        showAccessLimitMessage(membership, container);
    }

    // 会員情報を表示
    displayMembershipBadge(membership);

    return accessibleQuestions;
}

/**
 * 会員バッジを表示
 */
function displayMembershipBadge(membership) {
    const badge = document.createElement('div');
    badge.id = 'membership-badge';
    badge.style.cssText = `
        position: fixed;
        top: 70px;
        right: 20px;
        background: ${getMembershipColor(membership.level)};
        color: white;
        padding: 8px 15px;
        border-radius: 20px;
        font-size: 0.9em;
        font-weight: bold;
        z-index: 999;
        box-shadow: 0 2px 8px rgba(0,0,0,0.2);
    `;
    
    let badgeText = membership.displayName || 'Free';
    if (membership.daysRemaining && membership.daysRemaining > 0) {
        badgeText += ` (残り${membership.daysRemaining}日)`;
    }
    
    badge.textContent = badgeText;
    
    // 既存のバッジを削除
    const existingBadge = document.getElementById('membership-badge');
    if (existingBadge) {
        existingBadge.remove();
    }
    
    document.body.appendChild(badge);
}

/**
 * 会員レベルに応じた色を取得
 */
function getMembershipColor(level) {
    const colors = {
        [MEMBERSHIP_LEVELS.FREE]: '#6c757d',
        [MEMBERSHIP_LEVELS.STANDARD]: '#007bff',
        [MEMBERSHIP_LEVELS.ADVANCED]: '#28a745'
    };
    return colors[level] || '#6c757d';
}

/**
 * アップグレードモーダルを表示
 */
function showUpgradeModal(questionId) {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
    `;
    
    modal.innerHTML = `
        <div style="background: white; padding: 40px; border-radius: 15px; max-width: 500px; text-align: center;">
            <h2 style="margin-bottom: 20px;">🔒 この問題はロックされています</h2>
            <p style="margin-bottom: 30px; font-size: 1.1em;">
                問題${questionId}にアクセスするには、<br>
                Standardプラン以上へのアップグレードが必要です。
            </p>
            <div style="display: flex; gap: 15px; justify-content: center;">
                <a href="pricing.html" style="
                    background: #FF9900;
                    color: white;
                    padding: 12px 30px;
                    border-radius: 8px;
                    text-decoration: none;
                    font-weight: bold;
                ">プランを見る</a>
                <button onclick="this.closest('div').parentElement.remove()" style="
                    background: #6c757d;
                    color: white;
                    padding: 12px 30px;
                    border-radius: 8px;
                    border: none;
                    cursor: pointer;
                    font-weight: bold;
                ">閉じる</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // モーダル外をクリックで閉じる
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}


/**
 * 問題範囲ボタンにアクセス制御を適用（グレーアウト + クリックで料金ページ）
 * @param {number} startQuestion - 開始問題番号
 * @param {number} endQuestion - 終了問題番号
 * @param {object} membership - 会員情報
 * @param {string} examType - 試験タイプ
 * @returns {boolean} - アクセス可能かどうか
 */
function checkRangeAccess(startQuestion, endQuestion, membership, examType) {
    const range = getAccessibleQuestionRange(membership, examType);
    // 範囲の開始が許可範囲内ならアクセス可能
    return startQuestion <= range.max;
}

/**
 * ボタン要素にアクセス制御スタイルを適用
 * @param {HTMLElement} button - ボタン要素
 * @param {number} startQuestion - 開始問題番号
 * @param {object} membership - 会員情報
 * @param {string} examType - 試験タイプ
 */
function applyButtonAccessControl(button, startQuestion, membership, examType) {
    const hasAccess = checkRangeAccess(startQuestion, startQuestion + 9, membership, examType);
    
    if (!hasAccess) {
        // グレーアウトスタイルを適用
        button.style.opacity = '0.4';
        button.style.cursor = 'not-allowed';
        button.style.position = 'relative';
        
        // ロックアイコンを追加
        const lockIcon = document.createElement('span');
        lockIcon.innerHTML = ' 🔒';
        lockIcon.style.marginLeft = '5px';
        button.appendChild(lockIcon);
        
        // 元のonclickを無効化して、料金ページに遷移
        button.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            window.location.href = 'pricing.html';
            return false;
        };
        
        // ホバー時のツールチップ
        button.title = 'この問題にアクセスするにはStandardプランへのアップグレードが必要です';
    }
}

/**
 * すべての問題範囲ボタンにアクセス制御を適用
 * @param {string} examType - 試験タイプ
 */
async function applyAccessControlToButtons(examType) {
    const membership = await getMembershipInfo();
    
    // 番号順ボタン
    const sequentialButtons = document.querySelectorAll('#sequential-buttons .set-btn');
    sequentialButtons.forEach((button, index) => {
        const startQuestion = index * 10 + 1;
        applyButtonAccessControl(button, startQuestion, membership, examType);
    });
    
    // カテゴリ別ボタン（必要に応じて）
    const categoryButtons = document.querySelectorAll('#category-buttons .set-btn');
    categoryButtons.forEach((button) => {
        // カテゴリボタンは問題番号が不明なので、データ属性から取得
        const startQuestion = parseInt(button.dataset.startQuestion || '1');
        if (startQuestion > 20) {
            applyButtonAccessControl(button, startQuestion, membership, examType);
        }
    });
    
    // 模擬試験モードボタンのアクセス制御
    const mockExamBtn = document.getElementById('mock-exam-mode-btn');
    if (mockExamBtn) {
        applyMockExamAccessControl(mockExamBtn, membership);
    }
}

/**
 * 模擬試験モードボタンにアクセス制御を適用
 * @param {HTMLElement} button - ボタン要素
 * @param {object} membership - 会員情報
 */
function applyMockExamAccessControl(button, membership) {
    const level = membership.isValid ? membership.level : MEMBERSHIP_LEVELS.FREE;
    
    // Freeプランの場合はグレーアウト
    if (level === MEMBERSHIP_LEVELS.FREE) {
        button.style.opacity = '0.4';
        button.style.cursor = 'not-allowed';
        
        // 元のonclickを無効化して、料金ページに遷移
        button.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            window.location.href = 'pricing.html';
            return false;
        };
        
        button.title = '模擬試験モードはStandardプラン以上で利用可能です';
    } else {
        // Standard/Advancedプランの場合は有効化
        button.style.opacity = '1';
        button.style.cursor = 'pointer';
        button.onclick = function() {
            selectMode('mock-exam');
        };
        button.title = '';
    }
}

/**
 * 見直しモードボタンにアクセス制御を適用
 * @param {object} membership - 会員情報
 */
function applyReviewModeAccessControl(membership) {
    const reviewModeBtn = document.getElementById('review-mode-btn');
    if (!reviewModeBtn) return;
    
    const level = membership.isValid ? membership.level : MEMBERSHIP_LEVELS.FREE;
    
    // FreeプランとAdvancedプランは見直し機能を使用不可
    if (level === MEMBERSHIP_LEVELS.FREE) {
        reviewModeBtn.style.opacity = '0.4';
        reviewModeBtn.style.cursor = 'not-allowed';
        
        // 元のonclickを無効化して、料金ページに遷移
        reviewModeBtn.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            window.location.href = 'pricing.html';
            return false;
        };
        
        // ロックアイコンを追加
        if (!reviewModeBtn.querySelector('.lock-icon')) {
            const lockIcon = document.createElement('span');
            lockIcon.className = 'lock-icon';
            lockIcon.innerHTML = ' 🔒';
            lockIcon.style.marginLeft = '5px';
            reviewModeBtn.appendChild(lockIcon);
        }
        
        reviewModeBtn.title = '見直し機能はStandardプラン以上で利用可能です';
    } else {
        // Standard/Advancedプランの場合は有効化
        reviewModeBtn.style.opacity = '1';
        reviewModeBtn.style.cursor = 'pointer';
        reviewModeBtn.title = '';
        
        // ロックアイコンを削除
        const lockIcon = reviewModeBtn.querySelector('.lock-icon');
        if (lockIcon) {
            lockIcon.remove();
        }
    }
}

// Made with Bob
