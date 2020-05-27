const { prompt} = require( 'inquirer');
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
connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    mainQuestions();
  });
  
//define start of application
let mainQuestions = () => {
//main questions prompt
prompt([
    {
        type: 'list',
        name: 'trackerStart',
        message: 'What would you like to do?',
        choices: ['View All Employees', 'View All Employees by Department', 
        'View All Employees by Manager','Add Employee','Remove Employee', 
        'Update Employee Role', 'Update Employee Manager', 'View All Roles', 'Finish']
    }
])
//take response of trackerStart and 
    .then(({trackerStart})=> {
        console.log(trackerStart)
        switch (trackerStart) {
            case 'View All Employees':
                console.log('view employees')
                showEmployees()
                break
            case 'View All Departments':
                console.log('view departments')
                showDepartment()
                break
            case 'View All Employees by Manager':
                console.log('view employees by manager')
                showManager()
                break
            case 'Add Employee':
                console.log('add employee')
                addEmployee()
                break
            case 'Remove Employee':
                console.log('remove employee')
                removeEmployee()
                break
            case 'Update Employee Role':
                console.log('update role')
                updateRole()
                break
            case 'Update Employee Manager':
                console.log('update manager')
                updateManager()
                break
            case 'View All Roles':
                console.log('view roles')
                viewRoles()
                break
            case 'Finish':
                console.log('finish')
                connection.end()
                process.exit()
                break
        }
        
    })
}
//read db and display table of all employees
let showEmployees = () => {
    connection.query('SELECT employee.first_name AS "first name", employee.last_name AS "last name", department.name AS department, role.title, role.salary, CONCAT (manager.first_name, " " , manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON department.id = role.department_id LEFT JOIN employee manager ON employee.manager_id = manager.id', function(err, res) {
        if (err) throw err;
        console.table(res)
        mainQuestions()
    })
        
}

//read data by department
let showDepartment = () => {
    connection.query('SELECT * FROM department', function(err, res) {
        if (err) throw err;
        console.table(res)
        mainQuestions()
    })
}


///

//choices[{name:"Attorney",value:4}]

// before the inquiere build the choicesrole and the choice manager