import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { prettyJSON } from 'hono/pretty-json';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL ?? '',
  process.env.SUPABASE_ANON_KEY ?? ''
);

const app = new Hono();
app.use('*', prettyJSON());
app.use('*', cors());
app.notFound((c) => c.json({ message: 'Not Found', ok: false }, 404));

app.get('/', (c) => c.text('Hello Bun! 123'));

app.get('/auth/signup', async (c) => {
  const { data, error } = await supabase.auth.signUp({
    email: 'example@email.com',
    password: '0ri0N123',
  });

  console.log(data, error);
  return c.json({ data, error });
});

app.get('auth/signin', async (c) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: 'example@email.com',
    password: '0ri0N123',
  });

  return c.json({ data, error });
});

app.get('/auth/signout', async (c) => {
  const { error } = await supabase.auth.signOut();

  return c.json({ success: true, message: 'Signed Out' });
});

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNjk1MDczMjA1LCJpYXQiOjE2OTUwNjk2MDUsInN1YiI6ImIxNmM1ZjdhLTE1MjEtNDAyYi05ZDNhLTE4ZjhlZTBhN2JiOSIsImVtYWlsIjoiZXhhbXBsZUBlbWFpbC5jb20iLCJwaG9uZSI6IiIsImFwcF9tZXRhZGF0YSI6eyJwcm92aWRlciI6ImVtYWlsIiwicHJvdmlkZXJzIjpbImVtYWlsIl19LCJ1c2VyX21ldGFkYXRhIjp7fSwicm9sZSI6ImF1dGhlbnRpY2F0ZWQiLCJhYWwiOiJhYWwxIiwiYW1yIjpbeyJtZXRob2QiOiJwYXNzd29yZCIsInRpbWVzdGFtcCI6MTY5NTA2OTYwNX1dLCJzZXNzaW9uX2lkIjoiNDJhODlkNjAtMDYxOS00Nzk3LTg1ZDMtZGFhOTFhY2MyMzAzIn0.6G0dKwXx9MqbNtEaG2pVDW7wtCLT93SkHtKlsPuSu5Y';

app.get('auth/whoami', async (c) => {
  const { data, error } = await supabase.auth.getUser(token);

  return c.json(data);
});

app.get('/posts/:id', (c) => {
  const page = c.req.query('page');
  const id = c.req.param('id');
  return new Response(`You want see ${page} of ${id}`);
});

export default app;
