/*
============================================================
// 파일: models/User.js (변경 없음)
============================================================
*/
const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    isAdmin: { type: Boolean, default: false }, 
    password: { type: String, required: true },
    points: { type: Number, default: 0 },
    completedTasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
    createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('User', UserSchema);
