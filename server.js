// VehicleHub - MongoDB Backend Server
// Run with: npm start

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'vehiclehub-secret-key-2024';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection String (Update with your MongoDB URI)
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/vehiclehub';

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch(err => console.log('⚠️ MongoDB connection error (using localStorage fallback):', err.message));

// ==================== MODELS ====================

// User Model
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String },
    city: { type: String },
    role: { type: String, default: 'user', enum: ['user', 'dealer', 'admin'] },
    wishlist: [{ type: String }], // Array of vehicle IDs
    notifications: [{
        message: String,
        type: String,
        createdAt: { type: Date, default: Date.now }
    }],
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

// Vehicle Model
const vehicleSchema = new mongoose.Schema({
    type: { type: String, required: true, enum: ['car', 'bike'] },
    make: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    mileage: { type: Number, required: true },
    price: { type: Number, required: true },
    image: { type: String },
    thumbnail: { type: String },
    fuel: { type: String },
    transmission: { type: String },
    engine: { type: String },
    color: { type: String },
    location: { type: String },
    condition: { type: String, default: 'Used' },
    description: { type: String },
    features: [{ type: String }],
    sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, default: 'active', enum: ['active', 'sold', 'pending'] },
    views: { type: Number, default: 0 },
    postedDate: { type: Date, default: Date.now }
});

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

// Inquiry Model
const inquirySchema = new mongoose.Schema({
    vehicleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle' },
    partId: { type: String },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    message: { type: String, required: true },
    status: { type: String, default: 'pending', enum: ['pending', 'contacted', 'completed'] },
    createdAt: { type: Date, default: Date.now }
});

const Inquiry = mongoose.model('Inquiry', inquirySchema);

// News Model
const newsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    date: { type: String },
    image: { type: String },
    summary: { type: String },
    content: { type: String },
    category: { type: String }
});

const News = mongoose.model('News', newsSchema);

// Spare Part Model
const sparePartSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { min: Number, max: Number },
    image: { type: String },
    description: { type: String },
    brands: [{ type: String }]
});

const SparePart = mongoose.model('SparePart', sparePartSchema);

// ==================== AUTH ROUTES ====================

// Register
app.post('/api/auth/signup', async (req, res) => {
    try {
        const { username, email, password, phone } = req.body;
        
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'Email already registered' });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const user = new User({
            username,
            email,
            password: hashedPassword,
            phone
        });
        
        await user.save();
        
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' });
        
        res.json({ 
            success: true, 
            message: 'Account created successfully',
            token,
            user: { id: user._id, username: user.username, email: user.email, role: user.role }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Login
app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }
        
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' });
        
        res.json({ 
            success: true, 
            message: 'Login successful',
            token,
            user: { id: user._id, username: user.username, email: user.email, role: user.role }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Get Current User
app.get('/api/auth/me', async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ success: false, message: 'No token provided' });
        }
        
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(decoded.userId).select('-password');
        
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        
        res.json({ success: true, user });
    } catch (error) {
        res.status(401).json({ success: false, message: 'Invalid token' });
    }
});

// ==================== VEHICLE ROUTES ====================

// Get All Vehicles
app.get('/api/vehicles', async (req, res) => {
    try {
        const { type, make, yearMin, yearMax, priceMax, search } = req.query;
        let query = { status: 'active' };
        
        if (type) query.type = type;
        if (make) query.make = make;
        if (yearMin || yearMax) {
            query.year = {};
            if (yearMin) query.year.$gte = parseInt(yearMin);
            if (yearMax) query.year.$lte = parseInt(yearMax);
        }
        if (priceMax) query.price = { $lte: parseInt(priceMax) };
        if (search) {
            query.$or = [
                { make: { $regex: search, $options: 'i' } },
                { model: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }
        
        const vehicles = await Vehicle.find(query).sort({ postedDate: -1 });
        res.json({ success: true, vehicles });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Get Single Vehicle
app.get('/api/vehicles/:id', async (req, res) => {
    try {
        const vehicle = await Vehicle.findById(req.params.id);
        if (!vehicle) {
            return res.status(404).json({ success: false, message: 'Vehicle not found' });
        }
        
        // Increment views
        await Vehicle.findByIdAndUpdate(req.params.id, { $inc: { views: 1 } });
        
        res.json({ success: true, vehicle });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Create Vehicle
app.post('/api/vehicles', async (req, res) => {
    try {
        const vehicle = new Vehicle(req.body);
        await vehicle.save();
        res.json({ success: true, message: 'Vehicle listed successfully', vehicle });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Update Vehicle
app.put('/api/vehicles/:id', async (req, res) => {
    try {
        const vehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ success: true, message: 'Vehicle updated', vehicle });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Delete Vehicle
app.delete('/api/vehicles/:id', async (req, res) => {
    try {
        await Vehicle.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: 'Vehicle deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// ==================== INQUIRY ROUTES ====================

// Create Inquiry
app.post('/api/inquiries', async (req, res) => {
    try {
        const inquiry = new Inquiry(req.body);
        await inquiry.save();
        res.json({ success: true, message: 'Inquiry sent successfully', inquiry });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Get User Inquiries
app.get('/api/inquiries', async (req, res) => {
    try {
        const inquiries = await Inquiry.find().sort({ createdAt: -1 });
        res.json({ success: true, inquiries });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Update Inquiry Status
app.put('/api/inquiries/:id', async (req, res) => {
    try {
        const inquiry = await Inquiry.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ success: true, inquiry });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// ==================== WISHLIST ROUTES ====================

// Add to Wishlist
app.post('/api/wishlist/:vehicleId', async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ success: false, message: 'Please login' });
        }
        
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findByIdAndUpdate(
            decoded.userId,
            { $addToSet: { wishlist: req.params.vehicleId } },
            { new: true }
        );
        
        res.json({ success: true, message: 'Added to wishlist', wishlist: user.wishlist });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Remove from Wishlist
app.delete('/api/wishlist/:vehicleId', async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findByIdAndUpdate(
            decoded.userId,
            { $pull: { wishlist: req.params.vehicleId } },
            { new: true }
        );
        
        res.json({ success: true, message: 'Removed from wishlist', wishlist: user.wishlist });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Get Wishlist
app.get('/api/wishlist', async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ success: false, message: 'Please login' });
        }
        
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(decoded.userId).populate('wishlist');
        
        res.json({ success: true, wishlist: user.wishlist });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// ==================== ADMIN ROUTES ====================

// Admin Login
app.post('/api/admin/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Hardcoded admin check (in production, use database)
        if (email === 'admin@vehiclehub.com' && password === 'admin123') {
            const token = jwt.sign({ userId: 'admin', role: 'admin' }, JWT_SECRET, { expiresIn: '7d' });
            return res.json({ 
                success: true, 
                token,
                user: { id: 'admin', username: 'Admin', email, role: 'admin' }
            });
        }
        
        const user = await User.findOne({ email, role: 'admin' });
        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid admin credentials' });
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }
        
        const token = jwt.sign({ userId: user._id, role: 'admin' }, JWT_SECRET, { expiresIn: '7d' });
        
        res.json({ success: true, token, user: { id: user._id, username: user.username, email, role: 'admin' } });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Get Dashboard Stats
app.get('/api/admin/stats', async (req, res) => {
    try {
        const users = await User.countDocuments();
        const cars = await Vehicle.countDocuments({ type: 'car' });
        const bikes = await Vehicle.countDocuments({ type: 'bike' });
        const inquiries = await Inquiry.countDocuments();
        const listings = await Vehicle.countDocuments();
        
        res.json({ success: true, stats: { users, cars, bikes, inquiries, listings } });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Get All Users
app.get('/api/admin/users', async (req, res) => {
    try {
        const users = await User.find().select('-password').sort({ createdAt: -1 });
        res.json({ success: true, users });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Delete User
app.delete('/api/admin/users/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: 'User deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// ==================== NEWS & PARTS ROUTES ====================

// Get News
app.get('/api/news', async (req, res) => {
    try {
        const news = await News.find().sort({ createdAt: -1 });
        res.json({ success: true, news });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Get Spare Parts
app.get('/api/parts', async (req, res) => {
    try {
        const parts = await SparePart.find();
        res.json({ success: true, parts });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// ==================== SEED DATA ====================

app.get('/api/seed', async (req, res) => {
    try {
        // Seed News
        const newsData = [
            { title: 'New Toyota Corolla Hybrid Launching Soon', date: 'March 15, 2024', category: 'New Launches', image: 'Assets/Toyota Corolla.jpeg', summary: 'Toyota is set to launch the all-new Corolla Hybrid in Pakistan with improved fuel efficiency.', content: 'Toyota is set to launch the all-new Corolla Hybrid in Pakistan with improved fuel efficiency and modern features. The new model promises to deliver up to 25km/liter mileage, making it one of the most fuel-efficient vehicles in its segment.' },
            { title: 'Electric Vehicle Tax Relief Announced', date: 'March 10, 2024', category: 'Policy', image: 'Assets/Electric.jpeg', summary: 'Government announces new tax incentives for electric vehicle purchases.', content: 'The government has announced new tax incentives for electric vehicle purchases, making EVs more affordable for Pakistani consumers. This move is expected to boost EV adoption by 40% in the coming years.' },
            { title: 'Honda Announces New Bike Models for 2024', date: 'March 5, 2024', category: 'Bikes', image: 'Assets/Honda CD 70.jpeg', summary: 'Honda unveils three new motorcycle models with advanced technology.', content: 'Honda has unveiled three new motorcycle models equipped with advanced technology and improved fuel efficiency. The new lineup includes sports, commuter, and premium bikes to cater to different customer segments.' },
            { title: 'Used Car Market Trends 2024', date: 'February 28, 2024', category: 'Market', image: 'Assets/Suzuki Mehran.jpeg', summary: 'Analysis shows increasing demand for Japanese vehicles in used car market.', content: 'Analysis of the used car market shows increasing demand for Japanese vehicles, particularly Toyota and Honda models. Prices have stabilized after the initial import duty changes.' },
            { title: 'Road Safety Campaign Launched', date: 'February 20, 2024', category: 'Safety', image: 'Assets/road safety.jpeg', summary: 'Nationwide road safety campaign to reduce accidents.', content: 'A nationwide road safety campaign has been launched to reduce accidents and promote responsible driving. The initiative includes free helmet distributions and safety awareness programs.' },
            { title: 'New Highway Connecting Major Cities', date: 'February 15, 2024', category: 'Infrastructure', image: 'Assets/highway.jpeg', summary: 'New highway project to reduce travel time between cities.', content: 'Construction has begun on a new highway that will reduce travel time between Lahore and Karachi by 4 hours. The project is expected to be completed by 2026.' }
        ];
        
        await News.deleteMany({});
        await News.insertMany(newsData);
        
        // Seed Spare Parts
        const partsData = [
            { name: 'Engine Oil', category: 'Fluids', price: { min: 1500, max: 3000 }, image: 'Assets/Engine Oil.jpeg', description: 'Premium quality engine oils for all vehicle types', brands: ['Shell', 'Mobil', 'Castrol', 'Total'] },
            { name: 'Tires & Rims', category: 'Wheels', price: { min: 5000, max: 25000 }, image: 'Assets/Tire & Rims.jpeg', description: 'Wide range of tires and alloy rims for all vehicles', brands: ['Michelin', 'Bridgestone', 'Goodyear', 'Continental'] },
            { name: 'Batteries', category: 'Electrical', price: { min: 8000, max: 15000 }, image: 'Assets/Batteries.jpeg', description: 'Long-lasting batteries for cars and bikes', brands: ['AGS', 'Exide', 'Volta', 'Phoenix'] },
            { name: 'Brake Parts', category: 'Brakes', price: { min: 2000, max: 10000 }, image: 'Assets/Brake parts.jpeg', description: 'Brake pads, discs, and complete brake kits', brands: ['Bosch', 'Brembo', 'Aisin', 'Bendix'] },
            { name: 'Lighting', category: 'Electrical', price: { min: 500, max: 5000 }, image: 'Assets/Lighting.jpeg', description: 'LED lights, bulbs, and complete lighting solutions', brands: ['Philips', 'Osram', 'Hella', 'Generic'] },
            { name: 'Interior Accessories', category: 'Interior', price: { min: 1000, max: 8000 }, image: 'Assets/Interior accessories.jpeg', description: 'Seat covers, floor mats, and steering covers', brands: ['Michelin', '3M', 'HKS', 'Generic'] }
        ];
        
        await SparePart.deleteMany({});
        await SparePart.insertMany(partsData);
        
        // Seed Vehicles
        const vehicleData = [
            { type: 'car', make: 'Toyota', model: 'Corolla', year: 2015, mileage: 50000, price: 1500000, fuel: 'Petrol', transmission: 'Manual', engine: '1300cc', color: 'White', location: 'Lahore', description: 'Excellent condition', features: ['AC', 'Power Steering'] },
            { type: 'car', make: 'Honda', model: 'Civic', year: 2018, mileage: 20000, price: 2000000, fuel: 'Petrol', transmission: 'Automatic', engine: '1800cc', color: 'Black', location: 'Karachi', description: 'Pristine condition', features: ['Leather Seats', 'Sunroof'] },
            { type: 'bike', make: 'Honda', model: 'CD 70', year: 2015, mileage: 20000, price: 80000, fuel: 'Petrol', engine: '70cc', color: 'Black', location: 'Lahore', description: 'Reliable bike', features: ['Electric Start'] },
            { type: 'bike', make: 'Suzuki', model: 'GS 150', year: 2018, mileage: 10000, price: 120000, fuel: 'Petrol', engine: '150cc', color: 'Red', location: 'Karachi', description: 'Sporty bike', features: ['Disc Brake'] }
        ];
        
        await Vehicle.deleteMany({});
        await Vehicle.insertMany(vehicleData);
        
        res.json({ success: true, message: 'Database seeded successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 VehicleHub Server running on http://localhost:${PORT}`);
    console.log(`📊 Admin Panel: http://localhost:${PORT}/admin.html`);
    console.log(`🔗 API Base: http://localhost:${PORT}/api`);
});

// Export for testing
module.exports = app;

