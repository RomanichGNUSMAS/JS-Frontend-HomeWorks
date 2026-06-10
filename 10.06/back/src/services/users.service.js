const { prisma } = require("../configs/db");
const { UserRepository } = require("../repositories/users.repository");

exports.UserService = class {
    static async AddUser(rawData) {
        const ifExists = await prisma.user.findUnique({
            select: { email: true },
            where: { email: rawData.email }
        })

        if(ifExists) {
            throw new Error('the user with this email exists');
        }
        return UserRepository.AddUserToTable(rawData);
    }

    static async RemoveUser(id) {
        const ifExists = await prisma.user.findFirst({
            where: { id:id }
        })
        if(!ifExists) throw new Error('user not exist');
        return UserRepository.RemoveUserFromTable(id);
    }

    static async getAll() {
        return UserRepository.getAll();
    }

    static async updateUser(id,rawData) {
        const ifExists = prisma.user.findFirst({
            where : {id}
        })
        const isEmailNotFound = rawData.email?.trim() ? prisma.user.findUnique({
            where: { email:rawData.email }
        }) : false;
        if(isEmailNotFound) throw new Error('cannot update user that mail is exist for another user')
        if(!ifExists) throw new Error('user not found');
        return UserRepository.updateUserFromTable(id,rawData);
    }
}