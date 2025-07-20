
import { serve } from '@hono/node-server'
import { Hono } from 'hono'
//import { serveStatic } from 'hono/serve-static'
import { serveStatic } from '@hono/node-server/serve-static'
import { streamText } from "hono/streaming";
import { cors } from 'hono/cors'

const app = new Hono()

app.use('*', cors(
    {
        origin: '*',
        allowMethods: ['GET'],
        allowHeaders: ['Content-Type'],
    }
))

app.get('/', (c) => {
  return c.text('Hello Hono!')
})


app.get("/streamText", (c) => {
  return streamText(c, async (stream) => {
    // Write a text with a new line ('\n').
    await stream.writeln("Hello");
    // Wait 1 second.
    await stream.sleep(1000);
    // Write a text without a new line.
    await stream.write(`Hono!`);
  });
});



serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})


