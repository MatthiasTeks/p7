const validateEmail = (req, res, next) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    const email = req.body.email;

    if (!emailRegex.test(email)) {
        return res.status(400).send({
            error: "Adresse e-mail non valide"
        });
    }

    next();
}

module.exports = validateEmail;