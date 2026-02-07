#!/usr/bin/env python3
"""
フロントエンドのAPIエンドポイントをlocalhostから本番環境に更新するスクリプト
"""

import os
import re

# 置換対象のパターンと新しいURL
OLD_URL = 'http://localhost:3000'
NEW_URL = 'https://sukima-learning-api.onrender.com'

# 対象ファイルのリスト
files_to_update = [
    'contact.html',
    'aws/aif.html',
    'aws/clf.html',
    'aws/dva.html',
    'aws/saa.html',
    'aws/faq.html',
    'aws/forgot-password.html',
    'aws/index.html',
    'aws/login.html',
    'aws/signup.html',
    'aws/reset-password.html',
    'aws/pricing.html',
    'aws/terms.html',
    'aws/membership-access.js'
]

def update_file(filepath):
    """ファイル内のAPIエンドポイントを更新"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # 置換前の出現回数をカウント
        count = content.count(OLD_URL)
        
        if count == 0:
            print(f'[SKIP] {filepath}: No changes')
            return False
        
        # 置換実行
        new_content = content.replace(OLD_URL, NEW_URL)
        
        # ファイルに書き込み
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        print(f'[OK] {filepath}: Updated {count} occurrences')
        return True
    
    except FileNotFoundError:
        print(f'[ERROR] {filepath}: File not found')
        return False
    except Exception as e:
        print(f'[ERROR] {filepath}: {e}')
        return False

def main():
    print('API endpoint update script started')
    print(f'Replace: {OLD_URL} -> {NEW_URL}\n')
    
    updated_count = 0
    total_files = len(files_to_update)
    
    for filepath in files_to_update:
        if update_file(filepath):
            updated_count += 1
    
    print(f'\nResult: {updated_count}/{total_files} files updated')
    
    if updated_count > 0:
        print('\nUpdate completed! Next steps:')
        print('1. git add .')
        print('2. git commit -m "Update API endpoints to production URL"')
        print('3. git push origin main')
    else:
        print('\nNo files were updated')

if __name__ == '__main__':
    main()

# Made with Bob
