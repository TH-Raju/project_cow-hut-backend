import mongoose from "mongoose";
import app from "./app";
import config from "./config";
async function main() {
    try {
        await mongoose.connect(config.db_url as string);
        console.log(`Database is connected Successfully`);

        app.listen(config.port, () => {
            console.log(`Application listening on port ${config.port}`)
        })
    } catch (error) {
        console.log(`failed to connect Database`);
    }
}

main()