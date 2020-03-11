    const fs = require("fs");
    const inquirer = require("inquirer");
    const axios = require("axios");

    // prompt to get username and go from there
    inquirer
        .prompt([
            {
                type: "input",
                name: "github",
                message: "Enter your GitHub username."
            }
        ])
        .then(function(response) {
            fs.writeFile("username.json", JSON.stringify(response), function(err) {
                if (err) {
                    return console.log(err);
                };
            });

            console.log("It works!");

            username = response.username;
            gitHub = "https://api.github.com/users/" + username;

            console.log(gitHub);

            axios.get(gitHub).then(function(userInfo) {
                email = userInfo.data.email;
                picture = userInfo.data.avatar_url;

                console.log(userInfo);
            });
        });
    // prompt questions
    inquirer
        .prompt([
            {
                type: "input",
                name: "projectTitle",
                message: "Enter the title of your project."
            },
            {
                type: "input",
                name: "contributors",
                message: "Enter all of the projects contributors."
            },
            {
                type: "input",
                name: "description",
                message: "Write a brief description of your project."
            },
            {
                type: "input",
                name: "license",
                message: "Explain how your project is licensed/copyrighted."
            },
            {
                type: "input",
                name: "usage",
                message: "Explain what your project is used for."
            },
            {
                type: "input",
                name: "FAQ",
                message: "Write some frequently asked questions and their answers."
            },
            {
                type: "input",
                name: "installation",
                message: "Give instructions on how to install your project."
            },
            {
                type: "input",
                name: "tests",
                message: "Enter what tests were run to ensure your project works as intended."
            }
        ])
        .then(function(response) {
            let userInput = "${response.projectTitle} ${response.contributors} \n # ${response.description} ${response.license} ${response.usage} ${response.FAQ} ${response.installation} ${response.tests} ${response.tests}";
            
            fs.appendFile("README.md", userInput, function(err) {
                if (err) {
                    return console.log(err);
                }
            })
        });
