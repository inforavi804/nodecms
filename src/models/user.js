import mongoose from 'mongoose';

var userSchema = new mongoose.Schema({
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

const User = mongoose.model('User', userSchema);
export default User;