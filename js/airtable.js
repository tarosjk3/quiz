/**
 * ===========================
 * Airtable API関連の関数
 */
import { AIRTABLE_CONFIG } from './config.js';

/**
 * Airtableから問題データを取得する関数
 */
export async function fetchQuestionsFromAirtable() {
    try {
        const response = await fetch(`https://api.airtable.com/v0/${AIRTABLE_CONFIG.BASE_ID}/${AIRTABLE_CONFIG.TABLE_NAME}`, {
            headers: {
                'Authorization': `Bearer ${AIRTABLE_CONFIG.ACCESS_TOKEN}`
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Airtableのデータを既存の形式に変換
        return data.records.map(record => ({
            id: record.fields.id,
            question: record.fields.question,
            choices: {
                a: record.fields.choice_a,
                b: record.fields.choice_b,
                c: record.fields.choice_c
            },
            correct: record.fields.correct,
            explanation: record.fields.explanation,
            hint: record.fields.hint
        }));
    } catch (error) {
        console.error('Airtableデータ取得エラー:', error);
        return []; // エラー時は空配列を返す
    }
}