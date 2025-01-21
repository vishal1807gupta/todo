import bcrypt from 'bcryptjs';
import User from '../models/user.js';
import jwt from 'jsonwebtoken';

const JWT_SECRET='ghghghsfdgfhjgjdgtyk';

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (password.length < 6)
    return res.status(400).json({
      success: false,
      message: 'Abe 6 characters se jyada ka password rakh chutiye 😝',
    });
  const emailLowerCase = email.toLowerCase();
  const existedUser = await User.findOne({ email: emailLowerCase });
  if (existedUser)
    return res
      .status(400)
      .json({ success: false,  message: "Abe chutiye muth marna tujhe yaad h pr ye yaad nhi ki already registered h 😝" });
  const hashedPassword = await bcrypt.hash(password, 12);
  const user = await User.create({
    name,
    email: emailLowerCase,
    password: hashedPassword,
  });
  const { _id: id} = user;
  const token = jwt.sign({ id, name, email}, JWT_SECRET, {
    expiresIn: '1h',
  });
  res.status(201).json({
    success: true,
    result: { id, name, email, token},
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const emailLowerCase = email.toLowerCase();
  const existedUser = await User.findOne({ email: emailLowerCase });
  if (!existedUser){
    return res
      .status(404)
      .json({ success: false, message: "Abe chutiye pehle register to kr 😝" });
  }
  const correctPassword = await bcrypt.compare(password, existedUser.password);
  if (!correctPassword)
    return res
      .status(400)
      .json({ success: false, message: 'Sale subah jo ladki dekhi thi uski sakal yaad h pr password nahi 🤣' });

  const { _id: id, name} = existedUser;
  const token = jwt.sign({ id, name, email}, JWT_SECRET, {
    expiresIn: '1h',
  });
  res.status(200).json({
    success: true,
    result: { id, name, email: emailLowerCase, token},
  });
};

export const getUsers = async (req, res) => {
  const {email} = req.user;
  const emailLowerCase = email.toLowerCase();
  const user = await User.findOne({ email: emailLowerCase });
  res.status(200).json({ success: true, result: user.name });
};