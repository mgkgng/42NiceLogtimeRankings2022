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

2. By default, this script shows the full login IDs, but you have the option to mask the login IDs except for the first two characters for added privacy as you can see an example in the result.txt file in this repository. To do this, simply change this line of code (line 29):

        let loginStr = formatLogin(data.login, false).padEnd(12, ' ');    
 
    to this:

        let loginStr = formatLogin(data.login, true).padEnd(12, ' ');
        
3. By default, this script checks logtime data for the entire year of 2022. However, if you want to customize the date range that is checked, you can simply modify these lines of code (line 77-78):

        params.set('begin_at', '2022-01-01');
        params.set('end_at', '2022-12-31');

4. By default, this script is set to retrieve logtime data for the Nice campus using its id (41) in the API request. However, if you want to retrieve data for a different campus, you can modify this line of code (line 57-60):

        const apiResponse = await fetch(https://api.intra.42.fr/v2/campus/41/users?&${params.toString()}, {
                method: 'GET',
                headers: { Authorization: Bearer ${token}, },
        });

    You could simply replace the 41 with the id of the desired campus. Note that you will need to know the id of the campus you want to retrieve data for.


Enjoy the results and let me know if you have any further questions! 😁
