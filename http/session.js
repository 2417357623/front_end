const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 3000;

app.use(cookieParser());
app.use(session({
    secret: 'mySecret',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 } // 设置 Cookie 的有效期
}));

app.get('/login', (req, res) => {
    req.session.user = { name: 'JohnDoe' }; // 创建会话
    res.send('User logged in, session created.');
});

app.get('/check-session', (req, res) => {
    if (req.session.user) {
        res.send(`Hello, ${req.session.user.name}`); // 通过 Session ID 访问会话数据
    } else {
        res.send('No active session.');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
