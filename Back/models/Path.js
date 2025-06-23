/*
============================================================
// 파일: models/Path.js (신규 분리 파일)
============================================================
*/
const mongoose = require('mongoose');
const PathSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    level: { type: String, enum: ['초급', '중급', '고급'], required: true },
    rooms: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Room' }]
});
module.exports = mongoose.model('Path', PathSchema);
