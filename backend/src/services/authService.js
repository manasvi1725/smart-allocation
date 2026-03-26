const { supabaseAuth } = require('../config/supabase');
const pool = require('../config/db');
const jwt = require('jsonwebtoken');

// =========================
// SIGNUP SERVICE
// =========================
const signupUser = async ({
  email,
  password,
  role,
  full_name,
  phone,
  city,
  state,
  organization_name,
}) => {
  // 1. Create auth user in Supabase Auth
  const { data: authData, error: authError } =
    await supabaseAuth.auth.signUp({
      email,
      password,
    });

  if (authError) throw new Error(authError.message);

  const user = authData.user;
  if (!user) throw new Error('User creation failed');

  // 2. Insert into profiles table using PostgreSQL directly
  const insertProfileQuery = `
    INSERT INTO profiles (id, role, full_name, email, phone, city, state)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;
  `;

  const profileResult = await pool.query(insertProfileQuery, [
    user.id,
    role,
    full_name,
    email,
    phone,
    city,
    state,
  ]);

  const profile = profileResult.rows[0];

  // 3. If NGO, insert NGO profile
  if (role === 'ngo') {
    const ngoQuery = `
      INSERT INTO ngo_profiles (user_id, organization_name)
      VALUES ($1, $2);
    `;

    await pool.query(ngoQuery, [
      user.id,
      organization_name || full_name,
    ]);
  }

  return {
    user,
    profile,
  };
};

// =========================
// LOGIN SERVICE
// =========================
const loginUser = async ({ email, password }) => {
  console.log('=== LOGIN SERVICE ===');
  console.log('LOGIN EMAIL:', email);

  // 1. Login using Supabase Auth
  const { data: authData, error: authError } =
    await supabaseAuth.auth.signInWithPassword({
      email,
      password,
    });

  if (authError) throw new Error(authError.message);

  const user = authData.user;
  const session = authData.session;

  console.log('LOGIN SUCCESS USER:', user);

  if (!user) throw new Error('Login failed');

  // 2. Fetch profile using PostgreSQL directly
  const profileQuery = `
    SELECT *
    FROM profiles
    WHERE id = $1
    LIMIT 1;
  `;

  const profileResult = await pool.query(profileQuery, [user.id]);
  const profile = profileResult.rows[0];

  console.log('PROFILE LOOKUP RESULT:', profile);

  if (!profile) {
    throw new Error('No profile found for this user');
  }

  // 3. Create backend JWT
  const token = jwt.sign(
    {
      user_id: profile.id,
      email: profile.email,
      role: profile.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  return {
    token,
    user: profile,
    supabase_session: session,
  };
};

// =========================
// GET CURRENT USER SERVICE
// =========================
const getCurrentUser = async (userId) => {
  const query = `
    SELECT *
    FROM profiles
    WHERE id = $1
    LIMIT 1;
  `;

  const result = await pool.query(query, [userId]);
  const user = result.rows[0];

  if (!user) {
    throw new Error('No profile found for this user');
  }

  return user;
};

module.exports = {
  signupUser,
  loginUser,
  getCurrentUser,
};