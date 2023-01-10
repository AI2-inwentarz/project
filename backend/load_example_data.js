const {User,Department} = require("./db_models.js");
const bcrypt = require('bcrypt');

(async function() {
    console.log(User);
    const salt = await bcrypt.genSaltSync(12);
    var hashedpassword = bcrypt.hashSync("password", salt);
    const user = await User.create({login:"admin2",password:hashedpassword});
    console.log(user);
    
    console.log(Department);
    const department = await Department.create({name:"department1",owner_id:user.id});
    console.log(department);




    // console.log(await user.getDepartment());

    const awesomeDepartment = await Department.findOne({
        where: {
            name: "department1"
        },
        include: User
      });
      console.log(awesomeDepartment.id);
      console.log(awesomeDepartment);
      console.log(awesomeDepartment.getUser());
      console.log(awesomeDepartment.User.id);

    const awesomeUser = await User.findOne({
        where: {
            login: "admin2"
        },
        include: Department
      });
      console.log(awesomeUser.id);
      console.log(awesomeUser);
      console.log(awesomeUser.getDepartments());
      console.log(awesomeUser.Departments[0].id);
      console.log(awesomeUser.Departments[0].name);





  })();

