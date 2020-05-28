const {
    prompt
} = require('inquirer');
const mysql = require('mysql2')
const cTable = require('console.table');

//define name of database
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Zoe2020!',
    database: 'employeetracker_db'
})
//connecting the database
connection.connect(function (err) {
    if (err) throw err;
    // console.log("connected as id " + connection.threadId + "\n");
    mainQuestions();
});

//define start of application
let mainQuestions = () => {
    //main questions prompt
    prompt([{
            type: 'list',
            name: 'trackerStart',
            message: 'What would you like to do?',
            choices: ['View All Employees', 'View All Departments', 'View All Roles', 
                'View All Employees by Manager', 'Add Employee', 'Add Department', 'Add Role', 
                'Update Employee Role', 'Finish'
            ]
        }])
        //take response of trackerStart and 
        .then(({
            trackerStart
        }) => {
            console.log(trackerStart)
            switch (trackerStart) {
                case 'View All Employees':
                    // console.log('view employees')
                    viewEmployees()
                    break
                case 'View All Departments':
                    // console.log('view departments')
                    viewDepartments()
                    break
                case 'View All Roles':
                    // console.log('view roles')
                    viewRoles()
                    break
                case 'View All Employees by Manager':
                    // console.log('view employees by manager')
                    viewByManager()
                    break
                case 'Add Employee':
                    // console.log('add employee')
                    addEmployee()
                    break
                case 'Add Department':
                    // console.log('add department')
                    addDepartment()
                    break
                case 'Add Role':
                    // console.log('add role')
                    addRole()
                    break
                    // case 'Remove Employee':
                    //     console.log('remove employee')
                    //     removeEmployee()
                    //     break
                case 'Update Employee Role':
                    console.log('update role')
                    updateRole()
                    break
                    // case 'Update Employee Manager':
                    //     console.log('update manager')
                    //     updateManager()
                    //     break
                case 'Finish':
                    console.log('finish')
                    connection.end()
                    process.exit()
                    break
            }
        })
}
//read db and display table of all employees
let viewEmployees = () => {
    connection.query('SELECT employee.first_name AS "first name", employee.last_name AS "last name", department.name AS department, role.title, role.salary, CONCAT (manager.first_name, " " , manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON department.id = role.department_id LEFT JOIN employee manager ON employee.manager_id = manager.id', function (err, res) {
        if (err) throw err;
        console.table(res)
        mainQuestions()
    })
}
//read db and display table of all departments
let viewDepartments = () => {
    connection.query('SELECT department.name AS departments FROM department', function (err, res) {
        if (err) throw err;
        console.table(res)
        mainQuestions()
    })
}
//read db and display table of all roles
let viewRoles = () => {
    connection.query('SELECT role.title AS roles FROM role', function (err, res) {
        if (err) throw err;
        console.table(res)
        mainQuestions()
    })
}
//read db and display table of employees by manager
let viewByManager = () => {
    connection.query('SELECT employee.first_name AS "first name", employee.last_name AS "last name", CONCAT (manager.first_name, " " , manager.last_name) AS manager FROM employee LEFT JOIN employee manager ON employee.manager_id = manager.id', function (err, res) {
        if (err) throw err;
        console.table(res)
        mainQuestions()
    })
}
//add new employee
let addEmployee = () => {
    connection.query('SELECT * FROM employee', function (err, res) {
        if (err) throw err;
        let managers = res.filter((employee) => !employee.manager_id)
        // console.log("MANAGERS: ", managers)

        connection.query('SELECT * FROM role', function (err, res) {
            if (err) throw err;
            let roles = res
            // .filter((role) => role.id, role.title)
            // console.log("ROLES: ", roles)
            prompt([{
                        type: 'list',
                        name: 'employeeRole',
                        message: 'What is the role of the employee?',
                        choices: roles.map(({
                            id,
                            title
                        }) => ({
                            name: title,
                            value: id
                        }))
                    },
                    {
                        type: 'list',
                        name: 'employeeManager',
                        message: "Who is the employee's manager?",
                        choices: managers.map(manager => ({
                            name: `${manager.first_name} ${manager.last_name}`,
                            value: manager.id
                        }))
                    },
                    {
                        type: 'input',
                        name: 'first_name',
                        message: "What is the employee's first name?",
                    },
                    {
                        type: 'input',
                        name: 'last_name',
                        message: "What is the employee's last name?",
                    }
                ])
                .then(({
                    first_name,
                    last_name,
                    employeeRole,
                    employeeManager
                }) => {
                    // console.log(first_name, last_name,employeeRole, employeeManager)
                    connection.query('INSERT INTO employee SET ?', {
                            first_name: `${first_name}`,
                            last_name: `${last_name}`,
                            role_id: `${employeeRole}`,
                            manager_id: `${employeeManager}`
                        },
                        function (err, res) {
                            if (err) throw err;
                            console.log(res.affectedRows + " employee inserted!");
                            mainQuestions()
                        })
                })
        })
    })
}
//add new department
let addDepartment = () => {
    prompt([{
            type: 'input',
            name: 'department',
            message: 'Please enter the name of the department'
        }])
        .then(({
            department
        }) => {
            // console.log(department)
            connection.query('INSERT INTO department SET ?', {
                    name: `${department}`
                },
                function (err, res) {
                    if (err) throw err;
                    console.log(res.affectedRows + " department inserted!");
                    mainQuestions()
                })
        })
}
//add new role
let addRole = () => {
    connection.query('SELECT * FROM department', function (err, res) {
        if (err) throw err;
        let departments = res
        // console.log("DEPARTMENTS", res)
    prompt([
        {
            type: 'list',
            name: 'departmentId',
            message: "Please choose the department of the new role:",
            choices: departments.map(departments => ({
                name: `${departments.name}`,
                value: departments.id
            }))
        },
        {
                type: 'input',
                name: 'title',
                message: 'Please enter the title:'
            },
            {
                type: 'input',
                name: 'salary',
                message: 'Please enter the yearly salary:'
            }
        ])
        .then(({ departmentId, title, salary }) => {
            connection.query('INSERT INTO role SET ?', {
                title: `${title}`,
                salary: `${salary}`,
                department_id: `${departmentId}`,
            },
            function (err, res) {if (err) throw err;
            console.log(res.affectedRows + " role added!");
            mainQuestions()
            })
        })
    }
)}

// 
            // // let newRole = new Role(title, salary, department)
            // if (department === 'Sales') {
            //     department = 1
            //     console.log(department)
            //     connection.query('INSERT INTO role SET ?', {
            //             title: `${title}`,
            //             salary: `${salary}`,
            //             department_id: `${department}`
            //         },
            //         function (err, res) {
            //             if (err) throw err;
            //             console.log(res.affectedRows + " role inserted!");
            //             mainQuestions()
            //         })
            // } else if (department === 'Engineering') {
            //     department = 2
            //     console.log(department)
            // } else if (department === 'Legal') {
            //     department = 3
            //     console.log(department)
            //     connection.query('INSERT INTO role SET ?', {
            //             title: `${title}`,
            //             salary: `${salary}`,
            //             department_id: `${department}`
            //         },
            //         function (err, res) {
            //             if (err) throw err;
            //             console.log(res.affectedRows + " role inserted!");
            //             mainQuestions()
            //         })
            // } else if (department === 'Finance') {
            //     department = 4
            //     console.log(department)
            //     connection.query('INSERT INTO role SET ?', {
            //             title: `${title}`,
            //             salary: `${salary}`,
            //             department_id: `${department}`
            //         },
            //         function (err, res) {
            //             if (err) throw err;
            //             console.log(res.affectedRows + " role inserted!");
            //             mainQuestions()
            //         })
            // } else if (department === 'Administrative') {
            //     department = 5
            //     console.log(department)
            //     connection.query('INSERT INTO role SET ?', {
            //             title: `${title}`,
            //             salary: `${salary}`,
            //             department_id: `${department}`
            //         },
            // console.log(title, salary, department)                    
//             function (err, res) {
//                         if (err) throw err;
//                         console.log(res.affectedRows + " role inserted!");
//                         mainQuestions()
//                     })
//             } else {
//                 addDepartment()
//             }
//         })
//     })
// }
//update role of employee
let updateRole = () => {
    connection.query('SELECT * FROM employee', function (err, res) {
        if (err) throw err;
        let employee = res
        // console.log("MANAGERS: ", managers)
    connection.query('SELECT * FROM role', function (err, res) {
        if (err) throw err;
        let roles = res
            // .filter((role) => role.id, role.title)
            // console.log("ROLES: ", roles)
        prompt(
            [
                {
                    type: 'list',
                    name: 'employeeId',
                    message: "Who is the employee?",
                    choices: employee.map(employee => ({
                        name: `${employee.first_name} ${employee.last_name}`,
                        value: employee.id
                    }))
                },
                {
                    type: 'list',
                    name: 'roleId',
                    message: 'What is the role of the employee?',
                    choices: roles.map(({ id, title}) => ({
                        name: title,
                        value: id
                    }))
                },
            ])
            .then(({ employeeId,roleId }) => {
                connection.query('UPDATE employee SET role_id = ? WHERE id = ?', [roleId, employeeId],
                function (err, res) {if (err) throw err;
                console.log(res.affectedRows + " role updated!");
                mainQuestions()
                })
            })
    })
    })
}
// connection.query('INSERT INTO employee SET ?',
// {

// })
//choices[{name:"Attorney",value:4}]

// before the inquiere build the choicesrole and the choice manager 
// [
//     {
//         name: 'Sales Lead',
//         value: 1
//     },
//     {
//         name: 'Salesperson',
//         value: 2
//     },
//     {
//         name: 'Lead Engineer',
//         value: 3
//     },
//     {
//         name: 'Software Engineer',
//         value: 4
//     },
//     {
//         name: 'Accountant',
//         value: 5
//     },
//     {
//         name: 'Legal Team Lead',
//         value: 6
//     },
//     {
//         name: 'Lawyer',
//         value: 7
//     },
//     {
//         name: 'Adminstrative Assistant',
//         value: 8
//     }

// ]