/*
============================================================
// 파일: models/Task.js (수정)
// 역할: 퀴즈(quizzes) 배열의 각 객체에 마크다운 해설을 저장할
//       'explanation' 필드를 추가합니다.
============================================================
*/
const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true 
    },
    content: { 
        type: String, 
        required: true 
    },
    quizzes: [{
        question: { 
            type: String, 
            required: true 
        },
        answer: { 
            type: String, 
            required: true 
        },
        points: { 
            type: Number, 
            default: 10 
        },
        // --- 이 필드가 새로 추가되었습니다 ---
        explanation: {
            type: String,
            default: ''
        }
    }]
});

module.exports = mongoose.model('Task', TaskSchema);
