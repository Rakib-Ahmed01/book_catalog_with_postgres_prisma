/* eslint-disable no-console */
import { Server } from 'http';
import util from 'util';
import app from './app';
import env from './config';

util.inspect.defaultOptions.depth = null;

let server: Server;

process.on('uncaughtException', (error) => {
  console.log(error);
  process.exit(1);
});

const port = env.port;

export async function connectDb() {
  try {
    server = app.listen(port, () => {
      console.log(`Book Server listening on port ${port}`);
    });
  } catch (error) {
    console.log(`Failed to connect to database:`, error);
    process.exit(1);
  }

  process.on('unhandledRejection', (error) => {
    console.log(error);
    if (server) {
      server.close();
      process.exit(1);
    } else {
      process.exit(1);
    }
  });
}

connectDb();

process.on('SIGTERM', () => {
  console.log('SIGTERM received...');
  if (server) {
    server.close();
    process.exit(1);
  } else {
    process.exit(1);
  }
});
