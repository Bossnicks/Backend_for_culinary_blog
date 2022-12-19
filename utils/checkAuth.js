import JsonWebToken from "jsonwebtoken";

export default (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

    if(token) {
        try {
            const decoded = JsonWebToken.verify(token, 'secret123');
            req.userId = decoded._id;
            next();
        } catch(e) {
            return res.status(403).json({
                message: "Нет доступа",
            });
        }
    }  else {
        return res.status(403).json({
            message: "Нет доступа",
        });
    }

}