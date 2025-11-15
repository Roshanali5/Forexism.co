const mongoose = require('mongoose');
const User = require('./models/User');

async function createAdminUser() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Check if admin user already exists
        let adminUser = await User.findOne({ email: 'admin@forexism.com' });
        
        if (!adminUser) {
            // Create admin user
            adminUser = await User.create({
                name: 'System Admin',
                email: 'admin@forexism.com',
                password: 'admin123',
                isAdmin: true
            });
            console.log('✅ Admin user created:', adminUser.email);
        } else {
            // Make sure existing user is admin
            adminUser.isAdmin = true;
            await adminUser.save();
            console.log('✅ Existing user made admin:', adminUser.email);
        }

        // Also make our test user admin
        const testUser = await User.findOneAndUpdate(
            { email: 'admin@test.com' },
            { isAdmin: true },
            { new: true }
        );
        
        if (testUser) {
            console.log('✅ Test user made admin:', testUser.email);
        } else {
            console.log('❌ Test user not found');
        }

        // List all admin users
        const adminUsers = await User.find({ isAdmin: true });
        console.log('\n📋 All Admin Users:');
        adminUsers.forEach(user => {
            console.log('-', user.email, 'isAdmin:', user.isAdmin);
        });

        process.exit();
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

createAdminUser();
