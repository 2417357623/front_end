const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

const SECRET_KEY = 'mySecretKey'; // 秘钥，用于签名 Token

// 模拟用户数据
const users = [
    { id: 1, username: 'user1', password: 'password1' },
];

// 登录路由，生成 Token
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // 查找用户
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        // 用户存在，生成 Token
        const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' }); // 1 小时过期
        return res.json({ token });
    }

    res.status(401).json({ message: 'Invalid credentials' });
});

// 受保护的路由
app.get('/protected', (req, res) => {
    const token = req.headers['authorization']?.split(' ')[1]; // 从 Authorization 头获取 Token

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    // 验证 Token
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        // Token 有效，返回用户信息
        res.json({ message: 'Welcome to the protected route!', userId: decoded.id });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
