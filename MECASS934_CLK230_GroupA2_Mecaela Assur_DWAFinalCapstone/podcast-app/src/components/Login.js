import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

//Initialize Supabas client with your projet details
const supabase = createClient('https://your-project-url.supabase.co', 'your-public-anon-key');

//Login component handlesuser authentication
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

//Function to handle user login
  const handleLogin = async () => {
    const { user, error } = await supabase.auth.signIn({ email, password });
    if (error) console.error('Error logging in:', error.message); //Log any errors
    else console.log('Logged in:', user); //Log successful login
  };

  return (
    <div>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;