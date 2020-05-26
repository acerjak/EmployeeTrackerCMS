const { prompt} = require( 'inquirer');
const cTable = require('console.table');

//starting prompt
prompt([
    {
        type: 'list',
        name: 'trackerStart',
        message: 'What would you like to do?',
        choices: [
            {
                name: 'View All Employees'
            },
            {
                name: 'View All Employees by Department'
            },
            {
                name: 'View All Employees by Manager'
            },
            {
                name: 'Add Employee'
            },
            {
                name: 'Remove Employee'
            },
            {
                name: 'Update Employee Role'
            },
            {
                name: 'Update Employee Manager'
            },
            {
                name: 'View All Roles'
            }
        ]
    }
])
    .then(response=> {
        console.log(response)
        
    })