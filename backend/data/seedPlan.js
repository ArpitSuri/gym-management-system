import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Plan from '../models/planModel.js';


dotenv.config();

const plans = [
    {
        name: 'Basic Plan',
        price: 10,
        description: 'Access to gym during working hours.',
    },
    {
        name: 'Standard Plan',
        price: 25,
        description: 'Includes group classes and gym access.',
    },
    {
        name: 'Premium Plan',
        price: 50,
        description: '24/7 gym access, personal trainer sessions.',
    },
    {
        name: 'Family Plan',
        price: 80,
        description: 'Access for up to 4 family members.',
    },
];

const seedPlans = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('Connected to DB');

        // Optional: Clear existing plans
        await Plan.deleteMany({});
        console.log('Existing plans deleted');

        // Insert seed data
        await Plan.insertMany(plans);
        console.log('Plans seeded successfully');

        mongoose.disconnect();
    } catch (error) {
        console.error('Error seeding plans:', error);
        mongoose.disconnect();
    }
};

seedPlans();
