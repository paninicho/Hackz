    /*
    ============================================================
    // 파일: server.js (수정 완료)
    ============================================================
    */
    const express = require('express');
    const dotenv = require('dotenv');
    const cors = require('cors');
    const path = require('path'); // <<--- 1. path 모듈 불러오기
    const connectDB = require('./config/db');

    dotenv.config();
    connectDB();

    const app = express();

    const corsOptions = {
        origin: ['http://127.0.0.1:5500', 'http://localhost:5500', 'http://localhost:3000'],
        optionsSuccessStatus: 200
    };

    app.use(cors(corsOptions));
    app.use(express.json());

    // <<--- 2. 'uploads' 폴더를 정적 폴더로 제공하는 코드 추가
    app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

    // API 라우트 연결
    app.get('/', (req, res) => res.send('Cyber Platform API is running...'));
    app.use('/api/auth', require('./routes/auth'));
    app.use('/api/paths', require('./routes/paths'));
    app.use('/api/rooms', require('./routes/rooms'));
    app.use('/api/tasks', require('./routes/tasks'));
    app.use('/api/admin', require('./routes/admin')); 
    app.use('/api/upload', require('./routes/upload')); // <<--- 3. 업로드 API 라우트 연결 추가

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
    