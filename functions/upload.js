export async function onRequest({ request }) {
	const { url, method, headers, body } = request;
	const newUrl = new URL(url);
	const res = await fetch('https://telegra.ph' + newUrl.pathname + newUrl.search, { method, headers, body });
	const resText = await res.text();
	let ResUrl = '';
	try {
		ResUrl = `https://${newUrl.hostname}/v2/${JSON.parse(resText)[0].src.replace('/file/', '')}`;
	} catch (error) {
		ResUrl = 'Failed';
	}
	const newRes = new Response(ResUrl);
	newRes.headers.set('Access-Control-Allow-Origin', '*');
	return newRes;
}
