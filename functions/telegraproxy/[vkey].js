export async function onRequestGet({ request }) {
	const { url, method, headers, body } = request;
	const newUrl = new URL(url);
	return fetch(`https://telegra.ph${newUrl.pathname.replace('telegraproxy', 'file')}`, { method, headers, body });
}
