const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
	const authHeader = req.headers.authorization;
	const jwtConfigSecret = "marketplace";
	const { promisify } = require("util");

	if (!authHeader) {
		return res.status(401).json({ error: "Token not provider" });
	}

	const [, token] = authHeader.split(" ");

	try {
		const decoded = await promisify(jwt.verify)(token, jwtConfigSecret);
		req.userId = decoded.id;
		return next();
	} catch (err) {
		return res.status(401).json({ error: "Token invalid" });
	}
};
