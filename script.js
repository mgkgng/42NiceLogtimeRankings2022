import fetch from 'node-fetch'

async function getDataFromAPI() {
	try {
		const response = await fetch('https://api.intra.42.fr/oauth/token', {
			method: 'POST',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded', },
			body: `grant_type=client_credentials&client_id=${UID}&client_secret=${SECRET}`,
		});
		const data = await response.json();
		const token = data.access_token;

		let pageNb = 0;
		let allCampusUsers = [];
		while (++pageNb) {
			const params = new URLSearchParams();
			params.set('filter[campus_id]', 30);
			params.set('page[number]', pageNb)
			params.set('page[size]', 100);
			const apiResponse = await fetch('https://api.intra.42.fr/v2/campus_users/?${params}', {
				method: 'GET',
				headers: { Authorization: `Bearer ${token}`, },
			});
			const apiData = await apiResponse.json();
			if (!apiData.length)
				break ;
			allCampusUsers = allCampusUsers.concat(apiData);
			console.log(pageNb, allCampusUsers);
			await new Promise(resolve => setTimeout(resolve, 500));
		}
	} catch (error) {
		console.error(error);
	}
}

getDataFromAPI();