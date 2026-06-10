const { UserService } = require("../services/users.service")

exports.UserController = class {
    static async add(req, res, next) {
        try {
            const userData = req.body;
            const result = await UserService.AddUser(userData);
            return res.status(201).json(result);
        } catch (err) { next(err) };
    }

    static async remove(req, res, next) {
        try {
            const { id } = req.params;
            const result = await UserService.RemoveUser(+id);
            return res.status(200).json(result);
        } catch (err) { next(err) };
    }

    static async all(req, res, next) {
        try {
            const result = await UserService.getAll();
            res.json(result);
        } catch (err) { next(err) };
    }

    static async update(req, res, next) {
        try {
            const { id } = req.params;
            const result = await UserService.updateUser(+id,req.body)
            res.sendStatus(201).json({ message:`id ${id}: user updated!`});
        } catch (err) { next(err) };  
    }
}