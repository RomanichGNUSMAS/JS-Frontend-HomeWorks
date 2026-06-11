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

    static async updateUser(id,rawData,currentEmail) {
        const ifExists = prisma.user.findFirst({
            where : {id}
        })
        const isEmailNotFound = rawData.email?.trim() ? await prisma.user.findUnique({
            where: { email:rawData.email }
        }) : false;
        if(isEmailNotFound && isEmailNotFound.email == currentEmail) throw new Error('cannot change same email')
        if(isEmailNotFound) throw new Error('cannot update user that mail is exist for another user')
        if(!ifExists) throw new Error('user not found');
        const cleanObj = {};
        ['id','email','name','salary'].forEach(t => {
            cleanObj[t] = rawData[t]
        })
        return UserRepository.updateUserFromTable(id,cleanObj);
    }
}