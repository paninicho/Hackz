// backend/seeder.js

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Path = require('./models/Path');
const Room = require('./models/Room');
const Task = require('./models/Task');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

// DB를 완전히 초기화하는 함수
const initializeDatabase = async () => {
    try {
        // 모든 학습 데이터 삭제
        await Path.deleteMany();
        await Room.deleteMany();
        await Task.deleteMany();
        console.log('기존 학습 데이터가 모두 삭제되었습니다.');

        // 관리자 계정 생성 또는 업데이트
        const adminEmail = 'letsgojjangdol@gmail.com'; // 중요: 이메일은 유지
        const adminPassword = 'buriburi';   // 중요: 비밀번호는 유지
        const adminUsername = 'Admin';

        let adminUser = await User.findOne({ email: adminEmail });
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(adminPassword, salt);

        if (adminUser) {
            adminUser.isAdmin = true;
            adminUser.password = hashedPassword;
            await adminUser.save();
            console.log('기존 관리자 계정이 업데이트되었습니다.');
        } else {
            await User.create({
                username: adminUsername,
                email: adminEmail,
                password: hashedPassword,
                isAdmin: true,
            });
            console.log('새로운 관리자 계정이 생성되었습니다.');
        }
        
        console.log('데이터베이스 초기화 및 관리자 설정 완료!');
        process.exit();

    } catch (error) {
        console.error(`Error: ${error}`);
        process.exit(1);
    }
};

initializeDatabase();