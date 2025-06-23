/*
============================================================
// 파일: models/Room.js (신규 분리 파일)
============================================================
*/
const mongoose = require('mongoose');
const RoomSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    tags: [String],
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }]
});
module.exports = mongoose.model('Room', RoomSchema);
