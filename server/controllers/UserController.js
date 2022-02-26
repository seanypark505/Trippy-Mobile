import mongoose from 'mongoose';




const addUser = async (email, password, fName, lName) => {
  const user = new User({
    email: email,
    password: password,
    fName: fName,
    lName: lName,
  });
  return user.save();
};
