import express, { Router } from 'express';
import userRoutes from './userRoutes';

const router: Router = express.Router();

// Mount all routes
router.use('/users', userRoutes);

// Add more routes here as you create them
// router.use('/products', productRoutes);
// router.use('/orders', orderRoutes);
// router.use('/cart', cartRoutes);

export default router;
