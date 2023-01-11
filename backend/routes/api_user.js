const {User} = require("../db_models.js");
const {Department} = require("../db_models.js");

const { Op } = require("sequelize");

















// Get Department by id
const getDepartmentsForUser = async (req, res) => {
    try {
        if(!req.auth.user.id){return;}
        var userId = req.auth.user.id;
        var user = await User.findByPk(userId);
        // console.log(await user.getDepartments());
        // console.log(await user.getUserDepartmentRoles());
        var udrList = await user.getUserDepartmentRoles();
        // console.log(udrList[0]);
        // udrList.for
        var idArray = [];
        for await (const udr of udrList){
                idArray.push(udr.department_id);
        }
        
        
        idArray.push(req.auth.user.id);
        const department = await Department.findAll({
            where: {
                owner_id:{[Op.or]:idArray}
            }
        });
        
        res.send(department ? department : {"message":"No record found"});
    } catch (err) {
        console.log(err);
    }
}

module.exports = {getDepartmentsForUser};