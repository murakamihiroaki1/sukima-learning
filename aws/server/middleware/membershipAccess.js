/**
 * 会員レベルに応じたアクセス制御ミドルウェア
 */

const { MEMBERSHIP_LEVELS, isMembershipValid } = require('../models/membership');

/**
 * 問題へのアクセス権限をチェック
 */
function checkQuestionAccess(membershipLevel, membershipExpiry, questionId, examType) {
    // 会員レベルが有効かチェック
    const isValid = isMembershipValid(membershipExpiry);
    
    // 有効期限切れの場合はFreeレベルとして扱う
    const effectiveLevel = isValid ? membershipLevel : MEMBERSHIP_LEVELS.FREE;

    // Freeプラン: 問題1-20のみアクセス可能
    if (effectiveLevel === MEMBERSHIP_LEVELS.FREE) {
        return questionId >= 1 && questionId <= 20;
    }

    // Standardプラン: Foundational認定とAssociate認定の全問題にアクセス可能
    if (effectiveLevel === MEMBERSHIP_LEVELS.STANDARD) {
        // CLF (Cloud Practitioner - Foundational)
        // AIF (AI Practitioner - Foundational)
        // SAA (Solutions Architect Associate - Associate)
        const allowedExams = ['clf', 'aif', 'saa'];
        return allowedExams.includes(examType.toLowerCase());
    }

    // Advancedプラン: すべての問題にアクセス可能
    if (effectiveLevel === MEMBERSHIP_LEVELS.ADVANCED) {
        return true;
    }

    return false;
}

/**
 * 試験へのアクセス権限をチェック
 */
function checkExamAccess(membershipLevel, membershipExpiry, examType) {
    const isValid = isMembershipValid(membershipExpiry);
    const effectiveLevel = isValid ? membershipLevel : MEMBERSHIP_LEVELS.FREE;

    const examTypeLower = examType.toLowerCase();

    // Freeプラン: すべての試験にアクセス可能（ただし問題は1-20のみ）
    if (effectiveLevel === MEMBERSHIP_LEVELS.FREE) {
        return true;
    }

    // Standardプラン: Foundational認定とAssociate認定
    if (effectiveLevel === MEMBERSHIP_LEVELS.STANDARD) {
        const allowedExams = ['clf', 'aif', 'saa'];
        return allowedExams.includes(examTypeLower);
    }

    // Advancedプラン: すべての試験にアクセス可能
    if (effectiveLevel === MEMBERSHIP_LEVELS.ADVANCED) {
        return true;
    }

    return false;
}

/**
 * アクセス可能な問題の範囲を取得
 */
function getAccessibleQuestionRange(membershipLevel, membershipExpiry, examType) {
    const isValid = isMembershipValid(membershipExpiry);
    const effectiveLevel = isValid ? membershipLevel : MEMBERSHIP_LEVELS.FREE;

    // Freeプラン: 1-20
    if (effectiveLevel === MEMBERSHIP_LEVELS.FREE) {
        return { min: 1, max: 20 };
    }

    // Standardプラン: Foundational/Associateは全問題
    if (effectiveLevel === MEMBERSHIP_LEVELS.STANDARD) {
        const allowedExams = ['clf', 'aif', 'saa'];
        if (allowedExams.includes(examType.toLowerCase())) {
            return { min: 1, max: Infinity };
        }
        return { min: 1, max: 20 }; // その他の試験は1-20のみ
    }

    // Advancedプラン: すべて
    if (effectiveLevel === MEMBERSHIP_LEVELS.ADVANCED) {
        return { min: 1, max: Infinity };
    }

    return { min: 1, max: 20 };
}

/**
 * 問題リストをフィルタリング
 */
function filterQuestionsByAccess(questions, membershipLevel, membershipExpiry, examType) {
    const range = getAccessibleQuestionRange(membershipLevel, membershipExpiry, examType);
    
    return questions.filter(q => {
        const questionId = q.id || q.questionId;
        return questionId >= range.min && questionId <= range.max;
    });
}

/**
 * アクセス制限メッセージを生成
 */
function getAccessLimitMessage(membershipLevel, membershipExpiry) {
    const isValid = isMembershipValid(membershipExpiry);
    const effectiveLevel = isValid ? membershipLevel : MEMBERSHIP_LEVELS.FREE;

    if (effectiveLevel === MEMBERSHIP_LEVELS.FREE) {
        return {
            message: 'Freeプランでは問題1-20のみアクセス可能です',
            upgradeMessage: 'すべての問題にアクセスするには、Standardプラン以上にアップグレードしてください',
            canUpgrade: true
        };
    }

    if (effectiveLevel === MEMBERSHIP_LEVELS.STANDARD) {
        return {
            message: 'StandardプランではFoundational認定とAssociate認定の全問題にアクセス可能です',
            upgradeMessage: 'Professional認定にアクセスするには、Advancedプランにアップグレードしてください',
            canUpgrade: true
        };
    }

    return {
        message: 'すべての問題にアクセス可能です',
        upgradeMessage: null,
        canUpgrade: false
    };
}

module.exports = {
    checkQuestionAccess,
    checkExamAccess,
    getAccessibleQuestionRange,
    filterQuestionsByAccess,
    getAccessLimitMessage
};

// Made with Bob
