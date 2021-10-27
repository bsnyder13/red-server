const UserModel = require("./user");
const MovieModel = require("./movie");
const NoteModel = require("./note");

UserModel.hasMany(MovieModel);
MovieModel.belongsTo(UserModel);

UserModel.hasMany(NoteModel);
NoteModel.belongsTo(UserModel);

module.exports = {
   UserModel,
   MovieModel,
   NoteModel,
};