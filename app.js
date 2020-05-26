const { prompt} = require( 'inquirer');
const cTable = require('console.table');

//starting prompt
prompt([
    {
        type: 'list',
        name: 'trackerStart',
        message: 'What would you like to do?',
        choices: ['View All Employees', 'View All Employees by Department', 
        'View All Employees by Manager','Add Employee','Remove Employee', 
        'Update Employee Role', 'Update Employee Manager', 'View All Roles']
    }
])
    .then(({trackerStart})=> {
        console.log(trackerStart)
        switch (trackerStart) {
            case 'View All Employees':
                console.log('view employees')

                break
            case 'View All Employees by Department':
                console.log('view employees by department')

                break
            case 'View All Employees by Manager':
                console.log('view employees by manager')

                break
            case 'Add Employee':
                console.log('add employee')

                break
            case 'Remove Employee':
                console.log('remove employee')

                break
            case 'Update Employee Role':
                console.log('update role')

                break
            case 'Update Employee Manager':
                console.log('update manager')

                break
            case 'View All Roles':
                console.log('view roles')

                break
        }
        
    })