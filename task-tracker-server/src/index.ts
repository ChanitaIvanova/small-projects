import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import mongoose from 'mongoose';
import { schema } from './schema';
import { resolvers } from './resolvers';
import { AuthService } from './services/AuthService';
import cors from 'cors';
import { errorHandler } from './utils/ErrorHandler';
const app = express();

app.use(cors());

app.use('/graphql', graphqlHTTP((req) => {
    const token = req.headers.authorization?.split(" ")[1];
    let userId = null;

    if (token) {
        try {
            const decoded = AuthService.decodeToken(token);
            userId = decoded.userId;
        } catch (err) {
            console.warn("Invalid token");
        }
    }

    return {
        schema,
        rootValue: resolvers,
        context: { userId },
        graphiql: true,
        customFormatErrorFn: errorHandler
    };
}));

mongoose.connect(process.env.MONGO_URL!)
    .then(() => console.log('✅ MongoDB connected'))
    .catch(err => console.error('❌ MongoDB connection error:', err));

app.listen(4000, () => {
    console.log('GraphQL server running at http://localhost:4000/graphql');
});