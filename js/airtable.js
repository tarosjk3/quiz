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

        // console.log(data)
        
        // Airtableのデータを既存の形式に変換
        return data.records.map((record, index) => ({
            id: index + 1, // 連番でIDを付与
            question: record.fields['Question'],
            choices: {
                a: record.fields['Choice A'],
                b: record.fields['Choice B'],
                c: record.fields['Choice C']
            },
            correct: record.fields['Correct Answer'].toLowerCase(), // B -> b
            explanation: record.fields['Explanation'],
            hint: record.fields['Hint']
        }));
    } catch (error) {
        console.error('Airtableデータ取得エラー:', error);
        return []; // エラー時は空配列を返す
    }
}