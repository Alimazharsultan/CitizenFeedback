const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
	blockNo: {
		type: Number,
        required: true,
        unique: true
	},
	userName: {
        type: String,
		required: true,
	},
    description: {
        type: String,
        required: true,
    },
	
});

module.exports = User = mongoose.model('Complaints', complaintSchema);
