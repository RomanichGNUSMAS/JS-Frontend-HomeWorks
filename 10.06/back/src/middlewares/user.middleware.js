exports.UserMiddleware = class {
    static checkFields(req,res,next) {
        const { name,email,salary } = req.body;
        if(!name?.trim() || !email?.trim() || !salary|| isNaN(+salary)) {
            next({ message:"invalid credentials" });
        }
        next();
    }

    static checkId(req,res,next) {
        const { id } = req.params;
        if(!id || isNaN(+id)) next({ message:"id not defined" });
        next();
    }
}