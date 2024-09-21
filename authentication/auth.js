import base64 from "base-64";

function decodeAuthHeader(authHeader){
    const encodeHeader = authHeader
      .trim()
      .replace(/Basic\s+/i,'');
    const decodeHeader = base64.decode(encodeHeader);
    return decodeHeader.split(":");
}

function authMiddleWare(req,res,next){
    const [username,password] = decodeAuthHeader(req.headers.authorization || '');
    if(username==='admin' && password==='admin'){
        return next();
    }

    res.set('WWW-Authenticate','Basic realm="admin_pages"');
    res.status(401).send('Authentication required.');
}

export default authMiddleWare;