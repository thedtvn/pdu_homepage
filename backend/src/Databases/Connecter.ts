import mongoose from 'mongoose';

export default async function Connect(url: string) {
    try {
        await mongoose.connect(url);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }   
}