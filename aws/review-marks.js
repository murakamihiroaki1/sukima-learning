// 見直しマーク機能
// すべてのクイズページで共通して使用

class ReviewMarkManager {
    constructor(examType) {
        this.examType = examType; // 'saa', 'clf', 'aif', 'dva'
        this.storageKey = `${examType}_review_marks`;
        this.reviewMarks = this.loadReviewMarks();
    }

    // 見直しマークを読み込み
    loadReviewMarks() {
        try {
            const marks = localStorage.getItem(this.storageKey);
            return marks ? JSON.parse(marks) : [];
        } catch (error) {
            console.error('見直しマークの読み込みエラー:', error);
            return [];
        }
    }

    // 見直しマークを保存
    saveReviewMarks() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.reviewMarks));
        } catch (error) {
            console.error('見直しマークの保存エラー:', error);
        }
    }

    // 見直しマークを切り替え
    toggleMark(questionIndex) {
        const index = this.reviewMarks.indexOf(questionIndex);
        if (index > -1) {
            this.reviewMarks.splice(index, 1);
        } else {
            this.reviewMarks.push(questionIndex);
        }
        this.saveReviewMarks();
        return this.isMarked(questionIndex);
    }

    // 見直しマークがついているか確認
    isMarked(questionIndex) {
        return this.reviewMarks.includes(questionIndex);
    }

    // 見直しマークの数を取得
    getCount() {
        return this.reviewMarks.length;
    }

    // 見直しマークがついている問題のインデックスを取得
    getMarkedIndices() {
        return [...this.reviewMarks].sort((a, b) => a - b);
    }

    // すべての見直しマークをクリア
    clearAll() {
        this.reviewMarks = [];
        this.saveReviewMarks();
    }

    // 見直しマークがついている問題を取得
    getMarkedQuestions(allQuestions) {
        return this.reviewMarks
            .filter(index => index < allQuestions.length)
            .map(index => ({
                ...allQuestions[index],
                originalIndex: index
            }));
    }
}

// 見直しボタンを作成
function createReviewMarkButton(reviewManager, currentIndex) {
    const isMarked = reviewManager.isMarked(currentIndex);
    const button = document.createElement('button');
    button.id = 'review-mark-btn';
    button.className = 'btn btn-review';
    button.innerHTML = isMarked ? '⭐ 見直しマーク解除' : '☆ 見直しマークを付ける';
    button.style.cssText = `
        background: ${isMarked ? '#FFC107' : '#e0e0e0'};
        color: ${isMarked ? '#fff' : '#666'};
        border: none;
        padding: 10px 20px;
        border-radius: 8px;
        cursor: pointer;
        font-weight: bold;
        transition: all 0.3s ease;
        margin-right: 10px;
    `;
    
    button.onclick = function() {
        const newState = reviewManager.toggleMark(currentIndex);
        button.innerHTML = newState ? '⭐ 見直しマーク解除' : '☆ 見直しマークを付ける';
        button.style.background = newState ? '#FFC107' : '#e0e0e0';
        button.style.color = newState ? '#fff' : '#666';
        
        // 見直しモードの場合、カウントを更新
        updateReviewCount();
    };
    
    return button;
}

// 見直しリストモーダルを表示
function showReviewListModal(reviewManager, allQuestions, onSelectQuestion) {
    const markedQuestions = reviewManager.getMarkedQuestions(allQuestions);
    
    if (markedQuestions.length === 0) {
        alert('見直しマークがついている問題はありません。');
        return;
    }
    
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        padding: 20px;
    `;
    
    const content = document.createElement('div');
    content.style.cssText = `
        background: white;
        padding: 30px;
        border-radius: 15px;
        max-width: 800px;
        max-height: 80vh;
        overflow-y: auto;
        box-shadow: 0 10px 40px rgba(0,0,0,0.3);
    `;
    
    let html = `
        <h2 style="margin-bottom: 20px; color: #333;">⭐ 見直しリスト (${markedQuestions.length}問)</h2>
        <div style="margin-bottom: 20px;">
    `;
    
    markedQuestions.forEach((q, idx) => {
        html += `
            <div style="
                border: 1px solid #e0e0e0;
                border-radius: 8px;
                padding: 15px;
                margin-bottom: 10px;
                cursor: pointer;
                transition: all 0.3s ease;
            " onmouseover="this.style.background='#f5f5f5'" onmouseout="this.style.background='white'" onclick="selectReviewQuestion(${q.originalIndex})">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div style="flex: 1;">
                        <div style="font-weight: bold; color: #667eea; margin-bottom: 5px;">
                            問題 ${q.originalIndex + 1}
                        </div>
                        <div style="color: #666; font-size: 0.9em;">
                            ${q.question.substring(0, 100)}${q.question.length > 100 ? '...' : ''}
                        </div>
                    </div>
                    <button onclick="event.stopPropagation(); removeReviewMark(${q.originalIndex})" style="
                        background: #f44336;
                        color: white;
                        border: none;
                        padding: 8px 15px;
                        border-radius: 5px;
                        cursor: pointer;
                        font-size: 0.9em;
                    ">削除</button>
                </div>
            </div>
        `;
    });
    
    html += `
        </div>
        <div style="display: flex; gap: 10px; justify-content: center;">
            <button onclick="this.closest('div').parentElement.parentElement.remove()" style="
                background: #667eea;
                color: white;
                padding: 12px 30px;
                border-radius: 8px;
                border: none;
                cursor: pointer;
                font-weight: bold;
            ">閉じる</button>
            <button onclick="clearAllReviewMarks()" style="
                background: #f44336;
                color: white;
                padding: 12px 30px;
                border-radius: 8px;
                border: none;
                cursor: pointer;
                font-weight: bold;
            ">すべて削除</button>
        </div>
    `;
    
    content.innerHTML = html;
    modal.appendChild(content);
    document.body.appendChild(modal);
    
    // グローバル関数を定義
    window.selectReviewQuestion = function(index) {
        modal.remove();
        if (onSelectQuestion) {
            onSelectQuestion(index);
        }
    };
    
    window.removeReviewMark = function(index) {
        reviewManager.toggleMark(index);
        modal.remove();
        showReviewListModal(reviewManager, allQuestions, onSelectQuestion);
        updateReviewCount();
    };
    
    window.clearAllReviewMarks = function() {
        if (confirm('すべての見直しマークを削除しますか？')) {
            reviewManager.clearAll();
            modal.remove();
            updateReviewCount();
        }
    };
}

// 見直しカウントを更新（各ページで実装）
function updateReviewCount() {
    // この関数は各HTMLページで上書きされる
}

// Made with Bob
