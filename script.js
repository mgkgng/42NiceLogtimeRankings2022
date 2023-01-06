import fetch from 'node-fetch';
import * as fs from 'fs';

const UID = 'YOUR UID';
const SECRET = 'YOUR SECRET KEY';

function getSeconds(time) {
	let timeSplit = time.split(':');
	return (timeSplit[0] * 3600 + timeSplit[1] * 60 + Math.round(timeSplit[2]));
}

function getFullLogtime(data) {
	let total = 0;
	for (let t of Object.values(data))
		total += getSeconds(t);
	return (total);
}

function formatTime(secs) {
	return (`${Math.floor(secs / 3600)}h ${Math.floor(secs / 60) % 60}m ${secs % 60}s`);
}

function formatResult(login, logtime, rank) {
	let rankStr = (rank.toString() + '.').padEnd(5, ' ');
	let loginStr = login.padEnd(12, ' ');
	return (rankStr + '| ' + loginStr + '| ' + formatTime(logtime));
}

async function getToken() {
	try {
		const response = await fetch('https://api.intra.42.fr/oauth/token', {
			method: 'POST',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded', },
			body: `grant_type=client_credentials&client_id=${UID}&client_secret=${SECRET}`,
		});
		const data = await response.json();
		return (data.access_token);
	} catch (e) {
		console.error(e);
	}
}

async function getCampusUsers(token) {
	try {
		let pageNb = 0;
		let allCampusUsers = [];
		while (++pageNb) {
			const params = new URLSearchParams();
			params.set('filter[kind]', 'student');
			params.set('page[number]', pageNb);
			params.set('page[size]', 100);
			const apiResponse = await fetch(`https://api.intra.42.fr/v2/campus/41/users?&${params.toString()}`, {
				method: 'GET',
				headers: { Authorization: `Bearer ${token}`, },
			});
			const apiData = await apiResponse.json();
			if (!apiData.length)
				break ;
			allCampusUsers = allCampusUsers.concat(apiData.filter(user => user['active?'] == true));
			await new Promise(resolve => setTimeout(resolve, 500));
		}
		return (allCampusUsers);
	} catch (e) {
		console.error(e);
	}
}

async function getLogtimeRecords(token, login) {
	try {
		console.error(login);
		const params = new URLSearchParams();
		params.set('begin_at', '2022-01-01');
		params.set('end_at', '2022-12-31');
		const apiResponse = await fetch(`https://api.intra.42.fr/v2/users/${login}/locations_stats?&${params.toString()}`, {
			method: 'GET',
			headers: { Authorization: `Bearer ${token}`, },
		});
		const apiData = await apiResponse.json();
		return (apiData);
	} catch (e) {
		console.log(e);
	} 
}

async function getData() {
	const token = await getToken();
	const allCampusUsers = await getCampusUsers(token);
	let res = [];

	for (let user of allCampusUsers) {
		let records = await getLogtimeRecords(token, user.login)	
		if (records)		
			res.push({login: user.login, logtime: getFullLogtime(records)});
		await new Promise(resolve => setTimeout(resolve, 500));
	}
	res.sort((a, b) => { return b.logtime - a.logtime; });
	return (res);
}

function writeData(dataset) {
	let filename = 'result.txt'
	fs.writeFileSync(filename, '');
	for (let i = 0; i < dataset.length; i++)
		fs.appendFileSync(filename, formatResult(dataset[i].login, dataset[i].logtime, i + 1) + '\n');
}

async function run() {
	let dataset = await getData();
	writeData(dataset);
	console.log('Done!');
}
	
run();