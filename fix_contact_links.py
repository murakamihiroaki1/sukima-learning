#!/usr/bin/env python3
"""
AWS関連ページのお問い合わせリンクを修正するスクリプト
contact.html -> ../contact.html
"""

import os
import re

# 対象ファイルのリスト
files_to_update = [
    'aws/aif.html',
    'aws/clf.html',
    'aws/dva.html',
    'aws/faq.html',
    'aws/login.html',
    'aws/pricing.html',
    'aws/saa.html',
    'aws/signup.html',
    'aws/terms.html'
]

# 置換パターン
OLD_TEXT = 'href="contact.html"'
NEW_TEXT = 'href="../contact.html"'

def update_file(filepath):
    """ファイル内のリンクを修正"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # 置換前の出現回数をカウント
        count = content.count(OLD_TEXT)
        
        if count == 0:
            print(f'[SKIP] {filepath}: No changes')
            return False
        
        # 置換実行
        new_content = content.replace(OLD_TEXT, NEW_TEXT)
        
        # ファイルに書き込み
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        print(f'[OK] {filepath}: Updated {count} occurrence(s)')
        return True
        
    except FileNotFoundError:
        print(f'[ERROR] {filepath}: File not found')
        return False
    except Exception as e:
        print(f'[ERROR] {filepath}: {str(e)}')
        return False

def main():
    print('Contact link fix script started')
    print(f'Replace: {OLD_TEXT} -> {NEW_TEXT}\n')
    
    updated_count = 0
    
    for filepath in files_to_update:
        if update_file(filepath):
            updated_count += 1
    
    print(f'\nResult: {updated_count}/{len(files_to_update)} files updated')
    
    if updated_count > 0:
        print('\nUpdate completed! Next steps:')
        print('1. git add .')
        print('2. git commit -m "Fix contact links in AWS pages"')
        print('3. git push origin main')

if __name__ == '__main__':
    main()

# Made with Bob
