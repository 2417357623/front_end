const express = require('express'); // 引入 Express
const basicAuth = require('basic-auth'); // 引入 basic-auth

const app = express(); // 创建 Express 应用
const PORT = 3000; // 设置端口

// 模拟用户数据（通常会从数据库获取）
const users = {
    'user1': 'password1', // 用户名和密码
    'user2': 'password2'
};

// 中间件：验证基本认证
const authMiddleware = (req, res, next) => {
    const user = basicAuth(req); // 获取用户凭证

    if (!user || !users[user.name] || users[user.name] !== user.pass) {
        return res.status(401).send('Access denied'); // 认证失败
    }

    next(); // 认证成功，继续处理请求
};

// 受保护的接口
app.get('/protected', authMiddleware, (req, res) => {
    res.send('Access granted to protected resource'); // 访问成功
});

// 启动服务器
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
