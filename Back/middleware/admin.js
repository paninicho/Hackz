/*
============================================================
// 파일: middleware/admin.js (새 파일)
// 역할: 요청을 보낸 사용자가 관리자인지 확인하는 미들웨어입니다.
============================================================
*/
const User = require('../models/User');

const admin = async (req, res, next) => {
    try {
        // auth 미들웨어에서 넣어준 req.user.id를 사용합니다.
        const user = await User.findById(req.user.id);

        if (user && user.isAdmin) {
            next(); // 관리자면 다음 단계로 진행
        } else {
            res.status(403).json({ msg: 'Access denied. Not an admin.' });
        }
    } catch (error) {
        res.status(500).send('Server error');
    }
};

module.exports = admin;