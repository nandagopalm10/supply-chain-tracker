const express = require('express');
const cors = require('cors');
const Web3 = require('web3');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// In-memory storage (no database needed)
let products = [
  { id: 1, blockchainId: 1, name: 'Laptop', description: 'Gaming Laptop', category: 'Electronics' },
  { id: 2, blockchainId: 2, name: 'Smartphone', description: 'Flagship Phone', category: 'Electronics' }
];
let transactions = [];

// Web3 Configuration
let web3;
try {
  web3 = new Web3(new Web3.providers.HttpProvider(process.env.WEB3_PROVIDER || 'http://localhost:7545'));
  console.log('✅ Web3 initialized successfully');
} catch (error) {
  console.log('⚠️  Web3 not available:', error.message);
  web3 = {
    eth: {
      getAccounts: async () => ['0xMockAccount1', '0xMockAccount2'],
      getBlockNumber: async () => 123456
    }
  };
}

// Routes
app.get('/api/products', (req, res) => {
  res.json(products);
});

app.post('/api/products', async (req, res) => {
  const { name, description, category } = req.body;
  const newId = products.length + 1;
  
  const newProduct = {
    id: newId,
    blockchainId: newId,
    name,
    description,
    category: category || 'General',
    timestamp: new Date().toISOString()
  };
  
  products.push(newProduct);
  res.json({ success: true, product: newProduct });
});

app.get('/api/products/:id/history', (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find(p => p.id === productId);
  
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  
  const productTransactions = transactions.filter(t => t.productId === productId);
  
  res.json({
    product,
    transactions: productTransactions
  });
});

app.post('/api/transactions', (req, res) => {
  const { productId, from, to, action, location } = req.body;
  const newTransaction = {
    id: transactions.length + 1,
    productId,
    from,
    to,
    action,
    location,
    timestamp: new Date().toISOString()
  };
  
  transactions.push(newTransaction);
  res.json(newTransaction);
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    stats: {
      products: products.length,
      transactions: transactions.length,
      web3: web3.eth ? 'connected' : 'mock'
    }
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Backend running on port ${PORT}`);
  console.log(`📡 http://localhost:${PORT}/api/health`);
});