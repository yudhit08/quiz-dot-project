module.exports = (mongoose) => {
	const User = mongoose.model(
		"user",
		mongoose.Schema(
			{
				username: {
          type: String,
          required: true,
          unique: true
        },
        email: {
          type: String,
          required: true,
          unique: true
        },
        password: {
          type: String,
          required: true
        },
        highscore: {
          type: Number,
          default: 0
        }
			},
			{ timestamps: true }
		)
	);

	return User;
};
