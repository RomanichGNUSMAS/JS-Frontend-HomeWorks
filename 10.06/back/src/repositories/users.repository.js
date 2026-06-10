const { prisma } = require("../configs/db")

exports.UserRepository = class {
    static async AddUserToTable(rawData) {
        return prisma.user.create({
            data: rawData
        })
    }

    static async RemoveUserFromTable(id) {
        return prisma.user.delete({
            where: { id }
        })   
    }

    static async getAll() {
        return prisma.user.findMany()
    }

    static async updateUserFromTable(id,rawData) {
        return prisma.user.update({ 
            where : { id },
            data : rawData
        })
    }
}