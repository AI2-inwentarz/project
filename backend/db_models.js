const { DataTypes } = require('sequelize');
const { sequelize } = require("./db.js");

const User = sequelize.define('User', {
    // Model attributes are defined here
    login: {
      type: DataTypes.STRING(60),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(120),
      allowNull: false
    },
    firstname: {
      type: DataTypes.STRING(60)
    },
    surname: {
      type: DataTypes.STRING(60)
    },
    role: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    job_title: {
      type: DataTypes.STRING(200)
    },
    phone: {
      type: DataTypes.STRING(12)
    },
  }, {
    // Other model options go here
  });
  
  // `sequelize.define` also returns the model
  //console.log(Users === sequelize.models.Users); // true

  //Users.sync();

  const UserDepartmentRole = sequelize.define('UserDepartmentRole', {
    // Model attributes are defined here
    role: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    department_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    // Other model options go here
  });
const Department = sequelize.define('Department', {
    // Model attributes are defined here
    name: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    shortname: {
      type: DataTypes.STRING(100)
    },
    description: {
      type: DataTypes.TEXT
    },
    shortdescription: {
      type: DataTypes.STRING(500)
    },
    adress: {
      type: DataTypes.STRING(120)
    },
    affiliation: {
      type: DataTypes.STRING(200)
    },
    owner_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    // Other model options go here
  });
const ItemCategory = sequelize.define('ItemCategory', {
    // Model attributes are defined here
    name: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(200)
    },
    inventory_tag: {
      type: DataTypes.STRING(200)
    },
    department_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    // Other model options go here
  });
const Room = sequelize.define('Room', {
    // Model attributes are defined here
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    longname: {
      type: DataTypes.STRING(200)
    },
    description: {
      type: DataTypes.TEXT
    },
    tag: {
      type: DataTypes.STRING(80)
    },
    department_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    // Other model options go here
  });
const Item = sequelize.define('Item', {
    // Model attributes are defined here
    name: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    },
    inventory_tag: {
      type: DataTypes.STRING(200)
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    room_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    department_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    // Other model options go here
  });

  User.hasMany(UserDepartmentRole,{
    foreignKey: 'user_id'
  });
  UserDepartmentRole.belongsTo(User,{
    foreignKey: 'user_id'
  });

  User.hasMany(Department,{
    foreignKey: 'owner_id'
  });
  Department.belongsTo(User,{
    foreignKey: 'owner_id'
  });

  Department.hasMany(UserDepartmentRole,{
    foreignKey: 'department_id'
  });
  UserDepartmentRole.belongsTo(Department,{
    foreignKey: 'department_id'
  });

  Department.hasMany(ItemCategory,{
    foreignKey: 'department_id'
  });
  ItemCategory.belongsTo(Department,{
    foreignKey: 'department_id'
  });

  Department.hasMany(Room,{
    foreignKey: 'department_id'
  });
  Room.belongsTo(Department,{
    foreignKey: 'department_id'
  });

  Department.hasMany(Item,{
    foreignKey: 'department_id'
  });
  Item.belongsTo(Department,{
    foreignKey: 'department_id'
  });

  ItemCategory.hasMany(Item,{
    foreignKey: 'category_id'
  });
  Item.belongsTo(ItemCategory,{
    foreignKey: 'category_id'
  });

  Room.hasMany(Item,{
    foreignKey: 'room_id'
  });
  Item.belongsTo(Room,{
    foreignKey: 'room_id'
  });



module.exports = {User,Department,UserDepartmentRole,ItemCategory,Room,Item};
