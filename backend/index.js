import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import dbConnection from './config/dbConnection.js';
const app = express();
dotenv.config();
import authRouter from './routes/authRouter.js';
import memberRouter from './routes/memberRouter.js';
import attendanceRouter from "./routes/attendaceRouter.js";
import planRouter from './routes/planRouter.js';
import adminRouter from './routes/adminRoute.js';


app.use(cors());
app.use(express.json());


dbConnection();

app.get('/', (req, res) => {
  res.send('Welcome to the Gym Management System API');
});
app.use('/api/auth', authRouter); // 🔹 Use the auth router
app.use('/api/members', memberRouter); // 🔹 Use the member router
app.use('/api/attendance', attendanceRouter); // 🔹 Use the attendance router
app.use('/api/plans', planRouter); // 🔹 Use the plan router
app.use('/api/admin', adminRouter); // 🔹 Use the admin router



app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

