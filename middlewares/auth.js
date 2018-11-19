const { verifyToken } = require('../lib/token');

exports.isAuthenticated = (req, res, next)=>{
    //토큰 취득
    const token = req.body.token || req.query.token || req.headers.authorization;
    // 토큰 미존재: 로그인하지 않은 사용자
    if(!token){
        return res.status(403).json({
            success: false, message: '토큰이 존재하지 않습니다.'
        });
    }
    // 토큰 검증
    (async ()=>{
        try{
            const decodedToken = await verifyToken(token);
            req.decodedToken = decodedToken;
            next();
        } catch(error){
            res.status(403).json({ success: false, message: err.message });
        }
    })();
}