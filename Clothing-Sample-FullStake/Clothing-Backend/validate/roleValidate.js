const validateRegistration = (req, res, next) => {
    if (req.body.role) {
        return res.status(400).json({ message: "Không cho phép" });
    }
    next();
};

module.exports = validateRegistration;
