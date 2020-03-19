import mongoose from 'mongoose';
import Validator from 'validatorjs';

const UserDetailsSchema = new mongoose.Schema({
	
	username: String,
	password: String
});

UserDetailsSchema.statics.validateCreate = (obj) => {
	let rules = {
	   	username: 'required',
	   	password: 'required'
	};
	return new Validator(obj, rules);
 };

const UserDetails = mongoose.model('UserDetails', UserDetailsSchema);

export default UserDetails;
