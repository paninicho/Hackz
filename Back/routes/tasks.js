/*
============================================================
// 파일: routes/tasks.js (최종 수정본)
// 역할: 퀴즈 제출 시 발생하는 모든 오류를 올바른 JSON 형식으로
//       처리하고, 안정성을 높입니다.
============================================================
*/
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Task = require('../models/Task');
const User = require('../models/User');

// @route   POST api/tasks/:id/submit
// @desc    퀴즈 정답 제출 (수정된 로직)
router.post('/:id/submit', auth, async (req, res) => {
    const { answer, quizIndex } = req.body;
    const taskId = req.params.id;
    const userId = req.user.id;

    try {
        const task = await Task.findById(taskId);
        if (!task || !task.quizzes || task.quizzes[quizIndex] === undefined) {
            return res.status(404).json({ msg: '해당 퀴즈를 찾을 수 없습니다.' });
        }
        
        const quiz = task.quizzes[quizIndex];
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ msg: '사용자를 찾을 수 없습니다.' });
        }

        const isCorrect = quiz.answer.toLowerCase().trim() === answer.toLowerCase().trim();

        if (isCorrect) {
            const quizIdentifier = `${taskId}-${quizIndex}`;
            
            // user.solvedQuizzes 필드가 없는 경우를 대비한 방어 코드
            if (!Array.isArray(user.solvedQuizzes)) {
                user.solvedQuizzes = [];
            }
            
            if (!user.solvedQuizzes.includes(quizIdentifier)) {
                user.points = (user.points || 0) + quiz.points;
                user.solvedQuizzes.push(quizIdentifier);
                await user.save();
            }
            
            const updatedUser = await User.findById(userId).select('-password');
            res.json({ correct: true, msg: `정답입니다! ${quiz.points} 포인트를 획득했습니다.`, user: updatedUser });
        } else {
            res.json({ correct: false, msg: '틀렸습니다. 다시 시도해보세요.' });
        }
    } catch (err) {
        console.error('퀴즈 제출 오류 발생:', err);
        // 이제 모든 서버 오류는 구체적인 메시지를 담은 JSON으로 응답합니다.
        res.status(500).json({ msg: err.message || '서버 내부에서 예상치 못한 오류가 발생했습니다.' });
    }
});

module.exports = router;
