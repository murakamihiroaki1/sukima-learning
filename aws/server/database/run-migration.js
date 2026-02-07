const db = require('./db');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function runMigration() {
    try {
        console.log('='.repeat(60));
        console.log('会員レベルシステム マイグレーション開始');
        console.log('='.repeat(60));
        console.log();

        // マイグレーションSQLファイルを読み込み
        const migrationPath = path.join(__dirname, 'migrations', 'add_membership_fields.sql');
        const sql = fs.readFileSync(migrationPath, 'utf8');

        console.log('[実行中] マイグレーションを実行しています...');
        
        // SQLを実行（MySQLは複数ステートメントを一度に実行できないため、分割）
        const statements = sql.split(';').filter(stmt => stmt.trim());
        for (const statement of statements) {
            if (statement.trim()) {
                await db.query(statement);
            }
        }

        console.log('[完了] マイグレーションが正常に完了しました');
        console.log();

        // 結果を確認
        const result = await db.query(`
            SELECT
                COLUMN_NAME as column_name,
                DATA_TYPE as data_type,
                COLUMN_DEFAULT as column_default,
                IS_NULLABLE as is_nullable
            FROM information_schema.COLUMNS
            WHERE TABLE_SCHEMA = DATABASE()
            AND TABLE_NAME = 'users'
            AND COLUMN_NAME IN ('membership_level', 'membership_expiry')
            ORDER BY COLUMN_NAME
        `);

        console.log('追加されたカラム:');
        console.table(result);

        // ユーザー数を確認
        const userCount = await db.query('SELECT COUNT(*) as count FROM users');
        console.log(`既存ユーザー数: ${userCount[0].count}`);

        console.log();
        console.log('='.repeat(60));
        console.log('マイグレーション完了');
        console.log('='.repeat(60));

    } catch (error) {
        console.error('[エラー] マイグレーション失敗:', error.message);
        throw error;
    } finally {
        await db.end();
    }
}

// 実行
runMigration()
    .then(() => {
        console.log('\n処理が正常に完了しました');
        process.exit(0);
    })
    .catch((error) => {
        console.error('\n処理中にエラーが発生しました:', error);
        process.exit(1);
    });

// Made with Bob
