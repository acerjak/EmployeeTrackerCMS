const { prompt} = require( 'inquirer')

//starting prompt
prompt([
    {
        type: 'list',
        name: 'main',
        message: 'Please select from the below options:',
        choices: [
            {
                name: 'Add departments, roles, and/or employees'
            },
            {
                name: 'View departments, roles, and employees'
            },
            {
                name: 'Update employee roles'
            }
        ]
    }
])