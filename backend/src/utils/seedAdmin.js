import bcrypt from 'bcryptjs';
import Admin from '../models/Admin.js';

export async function seedDefaultAdmin() {
  const defaultEmail = process.env.DEFAULT_ADMIN_EMAIL || 'admin@gmail.com';
  const defaultPass = process.env.DEFAULT_ADMIN_PASS || 'admin123';

  const exists = await Admin.findOne({ email: defaultEmail });
  if (exists) {
    console.log('ℹ️  Default admin already exists');
    return;
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(defaultPass, salt);
  const admin = new Admin({ email: defaultEmail, password: hash, name: 'Site Admin' });
  await admin.save();
  console.log(`✅ Seeded default admin: ${defaultEmail}`);
}

export default seedDefaultAdmin;
