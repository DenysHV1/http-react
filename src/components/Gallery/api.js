import axios from 'axios';

export const api = async (query, page) => {
	console.log(page);
	const BASE_URL = 'https://pixabay.com/api/';
	const KEY = '21553593-5dff095819739d8fe44d39f5a';
	const url = `${BASE_URL}?key=${KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&per_page=15&page=${page}`;

	const response = await axios.get(url);
	return response.data;
};
