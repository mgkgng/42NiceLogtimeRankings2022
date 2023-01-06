# 42NiceLogtimeRankings2022 🏖

## 💁🏻‍♂️ Introduction
This little project was born out of a discussion with friends about the previous year and a desire to improve my skills in writing scripts using JS and working with REST APIs. It may also be a helpful resource for those interested in using the 42 API in their own projects. For those who are curious about the results of this project, be sure to check out the result.txt file 😉

## 🧑🏻‍💻 Usage
First of all, you'll need to have Node.js installed on your machine to use this script. If you don't have it already, go to the Node.js website and follow the instructions to install it. Once you have Node.js set up, follow these steps to run the script:

1. Open a terminal and navigate to the directory where you have cloned or downloaded the project.
Run the following command to install all the required packages:

        npm install

2. In the script.js file, replace the placeholders YOUR UID and YOUR SECRET KEY with your own API information.

3. Run the script by typing the following command in the terminal:

        node script.js

The script will make requests to the API and write the results to a file named result.txt. Note that there may be a short delay while the script is running due to the API's request rate limit.
Once the script has finished running, you can find the results in the result.txt file.

## 🧙🏻‍♀️ Customizations

There are a couple of options you can customize in this script:

1. By default, the script only includes active students in the final results. If you want to include all students (including those who passed the Piscine and got blackholed out), you can change this line of code (line 64):

        allCampusUsers = allCampusUsers.concat(apiData.filter(user => user['active?'] == true));
    to this:

        allCampusUsers = allCampusUsers.concat(apiData);

2. To protect the privacy of students, the script masks the login IDs of all students except for the first two characters. If you want to see the full login IDs, you can change this line of code (line 29):

        let loginStr = formatLogin(data.login, true).padEnd(12, ' ');    
    to this:

        let loginStr = formatLogin(data.login, false).padEnd(12, ' ');

Enjoy the results and let me know if you have any further questions! 😁
