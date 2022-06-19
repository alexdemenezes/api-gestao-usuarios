import express from 'express'
import UsersRoutes from './components/users/UsersRoutes';
import LoginRoutes from './components/login/LoginRoutes';
import PsRecoveryRoutes from './components/passwordRecovery/PsRecoveryRoutes'

const app = express();

app.use(express.json());
app.use('/login',LoginRoutes);
app.use('/user', UsersRoutes);
app.use('/recovery', PsRecoveryRoutes);


export default app;