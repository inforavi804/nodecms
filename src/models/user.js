import mongoose from 'mongoose';
import Validator from 'validatorjs';
import jwt from 'jsonwebtoken';
import Constant from '../constants/constants';

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
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

UserSchema.methods.validPassword = function( pwd ) {
    return ( this.password === pwd );
};

UserSchema.methods.generateJwt = function() {

	var expiry = new Date();
	expiry.setDate(expiry.getDate() + 7);
	
	return jwt.sign({
			_id: this._id,
			email: this.email,
			name: this.name,
			exp: parseInt(expiry.getTime() / 1000),
	}, Constant.AWT_PUBLIC_SECRET);
};

const User = mongoose.model('User', UserSchema);
export default User;