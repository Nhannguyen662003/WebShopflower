const express = require('express');
const { Pool } = require('pg');
const path = require('path');

// Khởi tạo ứng dụng Express
const app = express();

// Cấu hình kết nối với PostgreSQL
const pool = new Pool({
  user: 'dataflowers',
  host: 'localhost',
  database: 'flower_shop_db',
  password: '123',
  port: 5432,
});

// Sử dụng EJS làm công cụ template
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Sử dụng thư mục "public" để chứa các file tĩnh (CSS, hình ảnh)
app.use(express.static(path.join(__dirname, 'public')));

// Route cho trang chủ
app.get('/', async (req, res) => {
  try {
    // Lấy dữ liệu từ bảng "products"
    const result = await pool.query('SELECT name, description, price, image_url FROM products');
    const products = result.rows;

    // Render template "index.ejs" và truyền dữ liệu sản phẩm
    res.render('index', { products });
  } catch (err) {
    console.error(err);
    res.send('Error ' + err);
  }
});

// Khởi động server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
