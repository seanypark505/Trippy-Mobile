const List = require('../models/List');

// Create a list item
exports.addToList = async (listId, listItem) => {
    const user = new User({
      email: email,
      password: password,
      fName: fName,
      lName: lName,
    });
    return user.save();
  };
  
  // Find user
  exports.findUserById = async (id) => {
    const query = User.findById(id).populate('events')
    return query.exec();
  };
  
  // Update user
  exports.updateUserById = async (id, email, password, fName, lName) => {
    const result = await User.updateOne(
      { _id: id },
      {
        email: email,
        password: password,
        fName: fName,
        lName: lName,
      },
      { omitUndefined: true }
    );
  
    if (result.n === 0) {
      throw 'User does not exist';
    } else {
      return result.nModified;
    }
  };
  
  // Delete user
  exports.deleteUserById = async (id) => {
    const result = await User.deleteOne({ _id: id });
    return result.deletedCount;
  };