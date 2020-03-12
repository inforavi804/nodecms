import mongoose from 'mongoose';
import Validator from 'validatorjs';

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
     	//required: [true, 'Please enter a full name'],
     	index: true,
	},
	username: {
    	type: String,
    	unique: true,
  	},
	email:{
		type: String,
		lowercase: true,
		unique: true,
		index:true,
		//required: true,
		trim: true
	},
	password: String,
	age: { type: Number, min: 0 },
    role: {
     	type: String,
     	default: 'user',
    }
    // { timestamps: true },
});

UserSchema.statics.validateCreate = (obj) => {
	let rules = {
	   name: 'required',
	   username: 'required',
	   email: 'required'
	};
	return new Validator(obj, rules);
 };

const User = mongoose.model('User', UserSchema);
export default User;