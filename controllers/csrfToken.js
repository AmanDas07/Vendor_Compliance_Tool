import { Router } from "express";

const csrf = Router();
csrf.get('/csrf-token', (req, res) => {
    console.log(req.csrfToken());
    res.status(200).json({ csrfToken: req.csrfToken() });
});

export default csrf;