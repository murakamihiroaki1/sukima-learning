import os
import re
import sys

# Windows環境でのUnicode出力対応
if sys.platform == 'win32':
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

# AWSフォルダ内のHTMLファイルのリスト
html_files = [
    'aif.html',
    'clf.html',
    'dva.html',
    'faq.html',
    'index.html',
    'login.html',
    'pricing.html',
    'saa.html',
    'signup.html',
    'terms.html'
]

def remove_contact_nav(file_path):
    """ヘッダーナビゲーションから「お問い合わせ」リンクを削除"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # お問い合わせのナビゲーション項目を削除（3行パターン）
        pattern = r'\s*<div class="nav-item">\s*\n\s*<a href="\.\./contact\.html" class="nav-link">お問い合わせ</a>\s*\n\s*</div>\s*\n'
        
        new_content = re.sub(pattern, '', content)
        
        if new_content != content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f'OK {file_path}: お問い合わせナビゲーションを削除しました')
            return True
        else:
            print(f'-- {file_path}: 変更なし')
            return False
    except Exception as e:
        print(f'NG {file_path}: エラー - {e}')
        return False

def main():
    print('AWSフォルダのHTMLファイルからお問い合わせナビゲーションを削除します...\n')
    
    updated_count = 0
    for html_file in html_files:
        file_path = html_file
        if os.path.exists(file_path):
            if remove_contact_nav(file_path):
                updated_count += 1
        else:
            print(f'NG {file_path}: ファイルが見つかりません')
    
    print(f'\n完了: {updated_count}個のファイルを更新しました')

if __name__ == '__main__':
    main()

# Made with Bob
