/**
 * 会員レベル管理モデル
 */

const MEMBERSHIP_LEVELS = {
    FREE: 'free',
    STANDARD: 'standard',
    ADVANCED: 'advanced'
};

const MEMBERSHIP_DURATION_DAYS = 30; // 1ヶ月 = 30日

/**
 * 会員レベルの表示名を取得
 */
function getMembershipDisplayName(level) {
    const names = {
        [MEMBERSHIP_LEVELS.FREE]: 'Free',
        [MEMBERSHIP_LEVELS.STANDARD]: 'Standard',
        [MEMBERSHIP_LEVELS.ADVANCED]: 'Advanced'
    };
    return names[level] || 'Unknown';
}

/**
 * 会員レベルの説明を取得
 */
function getMembershipDescription(level) {
    const descriptions = {
        [MEMBERSHIP_LEVELS.FREE]: '基本機能のみ利用可能',
        [MEMBERSHIP_LEVELS.STANDARD]: '標準機能が利用可能（1ヶ月プラン）',
        [MEMBERSHIP_LEVELS.ADVANCED]: 'すべての機能が利用可能（1ヶ月プラン）'
    };
    return descriptions[level] || '';
}

/**
 * 会員レベルの料金を取得
 */
function getMembershipPrice(level) {
    const prices = {
        [MEMBERSHIP_LEVELS.FREE]: 0,
        [MEMBERSHIP_LEVELS.STANDARD]: 1980,
        [MEMBERSHIP_LEVELS.ADVANCED]: 2980
    };
    return prices[level] || 0;
}

/**
 * 有効期限を計算（現在日時 + 90日）
 */
function calculateExpiryDate() {
    const now = new Date();
    const expiry = new Date(now);
    expiry.setDate(expiry.getDate() + MEMBERSHIP_DURATION_DAYS);
    return expiry;
}

/**
 * 会員が有効かチェック
 */
function isMembershipValid(membershipExpiry) {
    if (!membershipExpiry) {
        // Free会員は有効期限なし
        return true;
    }
    
    const now = new Date();
    const expiry = new Date(membershipExpiry);
    return expiry > now;
}

/**
 * 有効期限までの残り日数を計算
 */
function getDaysUntilExpiry(membershipExpiry) {
    if (!membershipExpiry) {
        return null; // Free会員
    }
    
    const now = new Date();
    const expiry = new Date(membershipExpiry);
    const diffTime = expiry - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays > 0 ? diffDays : 0;
}

/**
 * 会員情報を整形して返す
 */
function formatMembershipInfo(user) {
    const level = (user.membership_level || MEMBERSHIP_LEVELS.FREE).toLowerCase();
    const expiry = user.membership_expiry;
    const isValid = isMembershipValid(expiry);
    const daysRemaining = getDaysUntilExpiry(expiry);
    
    return {
        level,
        displayName: getMembershipDisplayName(level),
        description: getMembershipDescription(level),
        price: getMembershipPrice(level),
        expiry: expiry ? new Date(expiry).toISOString() : null,
        expiryFormatted: expiry ? new Date(expiry).toLocaleDateString('ja-JP') : null,
        isValid,
        daysRemaining,
        isFree: level === MEMBERSHIP_LEVELS.FREE
    };
}

module.exports = {
    MEMBERSHIP_LEVELS,
    MEMBERSHIP_DURATION_DAYS,
    getMembershipDisplayName,
    getMembershipDescription,
    getMembershipPrice,
    calculateExpiryDate,
    isMembershipValid,
    getDaysUntilExpiry,
    formatMembershipInfo
};

// Made with Bob
