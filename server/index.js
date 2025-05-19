import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

let products = [
    { id: 1, title: "Пример товара", description: "Пример описания", price: "5000" }
];

let users = [
    { 
      id: 1, 
      firstName: 'Admin',
      lastName: 'Adminov',
      phone: '+79991112233',
      email: 'admin@example.com',
      password: 'admin123',
      role: 'admin'
    }
  ];

  // Регистрация
app.post('/api/register', (req, res) => {
    const { firstName, lastName, phone, email, password, role } = req.body;
    
    // Валидация
    if (!firstName || !lastName || !phone || !email || !password || !role) {
      return res.status(400).json({ error: 'Все поля обязательны' });
    }
  
    if (users.some(u => u.email === email)) {
      return res.status(400).json({ error: 'Email уже используется' });
    }
  
    const newUser = {
      id: users.length + 1,
      firstName,
      lastName,
      phone,
      email,
      password, // В реальном приложении нужно хешировать!
      role
    };
  
    users.push(newUser);
    res.status(201).json({ message: 'Регистрация успешна', user: newUser });
  });
  
  // Авторизация
  app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
  
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
      return res.status(401).json({ error: 'Неверные учетные данные' });
    }
  
    res.json({ 
      message: 'Авторизация успешна',
      user: {
        id: user.id,
        firstName: user.firstName,
        email: user.email,
        role: user.role
      }
    });
  });

app.get('/api/data', (req,res) => {
    res.json(products);
});

app.post('/api/data', (req,res) => {
    const newProduct = {
        id: products.length + 1,
        ...req.body
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
})

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});