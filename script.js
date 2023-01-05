import fetch from 'node-fetch'

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
			params.set('page[number]', pageNb - 1);
			params.set('page[size]', 100);
			const apiResponse = await fetch(`https://api.intra.42.fr/v2/campus/41/users?&${params.toString()}`, {
				method: 'GET',
				headers: { Authorization: `Bearer ${token}`, },
			});
			const apiData = await apiResponse.json();
			if (!apiData.length) {
				console.error("hello?");
				break ;
			}
			allCampusUsers = allCampusUsers.concat(apiData);
			console.log(pageNb - 1, allCampusUsers.length);
			await new Promise(resolve => setTimeout(resolve, 500));
		}
		return (allCampusUsers);
	} catch (e) {
		console.error(e);
	}
}

async function getDataFromAPI() {
	try {
		const token = await getToken();
		// // const allCampusUsers = await getCampusUsers(token);
		
		// console.log(allCampusUsers[0]);
		
		const params = new URLSearchParams();
		params.set('begin_at', '2022-01-01');
		params.set('end_at', '2022-12-31');
		const apiResponse = await fetch(`https://api.intra.42.fr/v2/users/min-kang/locations_stats?&${params.toString()}`, {
			method: 'GET',
			headers: { Authorization: `Bearer ${token}`, },
		});
		const apiData = await apiResponse.json();
		console.log(apiData);
	} catch (error) {
		console.error(error);
	}
}
	

getDataFromAPI();