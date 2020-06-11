const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

//empty array to push teamMembers data into:
const teamMembers = [];

//renders the array into html:
render(teamMembers);

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
const managerInfo = [
  {
    type: "input",
    name: "name",
    message: "Enter the Manager's name",
  },

  {
    type: "input",
    name: "id",
    message: "Enter the Manager's ID:",
  },

  {
    type: "input",
    name: "email",
    message: "Enter the Manager's email address:",
  },

  {
    type: "input",
    name: "officeNumber",
    message: "Enter the Manager's office number:",
  },
];

const addMember = [
  {
    type: "list",
    name: "role",
    message: "Which type of team member would you like to add?",
    choices: ["Engineer", "Intern", "Do not add another team member"],
  },
];

const engineerInfo = [
  {
    type: "input",
    name: "name",
    message: "Enter the engineer's name:",
  },

  {
    type: "input",
    name: "id",
    message: "Enter the engineer's ID:",
  },

  {
    type: "input",
    name: "email",
    message: "Enter the engineer's email address:",
  },

  {
    type: "input",
    name: "github",
    message: "Enter the engineer's GitHub username:",
  },
];

const internInfo = [
  {
    type: "input",
    name: "name",
    message: "Enter the intern's name:",
  },

  {
    type: "input",
    name: "id",
    message: "Enter the intern's ID:",
  },

  {
    type: "input",
    name: "email",
    message: "Enter the intern's email address:",
  },

  {
    type: "input",
    name: "school",
    message: "Enter the name of the intern's school:",
  },
];

//prompt Manager questions then checkRole

const addManager = () => {
  inquirer.prompt(managerInfo).then((answers) => {
    console.log(answers);

    const manager = new Manager(
      answers.name,
      answers.id,
      answers.email,
      answers.officeNumber
    );

    pushToArray(manager);
    console.log("ARRAY", teamMembers);
    addAnother();
  });
};

// prompts the engineer quetions:

const addEngineer = () => {
  inquirer.prompt(engineerInfo).then((answers) => {
    console.log(answers);

    const engineer = new Engineer(
      answers.name,
      answers.id,
      answers.email,
      answers.github
    );

    pushToArray(engineer);
    addAnother();
  });
};

// prompts the intern questions:

const addIntern = () => {
  inquirer.prompt(internInfo).then((answers) => {
    console.log(answers);

    const intern = new Intern(
      answers.name,
      answers.id,
      answers.email,
      answers.school
    );

    pushToArray(intern);
    addAnother();
  });
};

// asks if the user wants to add another team member, then checks the role, and finally runs the function for that role:

const addAnother = () => {
  inquirer.prompt(addMember).then((answers) => {
    if (answers.role === "Engineer") {
      addEngineer();
    } else if (answers.role === "Intern") {
      addIntern();
    } else {
      buildTeam();
    }
  });
};

// The answers are pushed into the teamMembers array.  The teamMembers array is called in the render function to render the information into html.

const pushToArray = (answers) => {
  teamMembers.push(answers);
  // console.log(teamMembers);
};

const buildTeam = () => {
  // How the data will be displayed once it's gathered into the array:

  fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
};

addManager();

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
