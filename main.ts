import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { getSchemas } from "./bootstrap/bootstrap";
import {createConnection, createConnections} from 'typeorm'
import { PostgresConnectionOptions} from 'typeorm/driver/postgres/PostgresConnectionOptions'
(async () => {
    // connect to databse
    const options  : PostgresConnectionOptions= {
        type: "postgres",
        host: "localhost",
        port: 5432,
        username: "user",
        password: "password",
        database:'twitter',
        synchronize:true,
        logging:false,
        entities:[__dirname + "/**/*/*.model.ts"]
    };
    await createConnection(options)
    console.log('connection created ')
    const schema = await getSchemas();
    const server = new ApolloServer({
        schema
    });
    const { url } = await server.listen(process.env.PORT || 5000);
    console.log(`server is listening on ${url}`);
})();
