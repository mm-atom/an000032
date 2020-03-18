const test = require('ava');

const { default: a31 } = require('@mmstudio/an000031');
const { default: a } = require('../dist/index');

test('使用票根登陆', async (t) => {
	const userid = 'taoqiufeng';
	const token = 'taoqf';
	const ip = '127.0.0.1';
	const ra31 = await a31(userid, 'taoqf001', token, ip);
	t.is(ra31.userid, userid);
	const user = await a(userid, token, ip);
	t.is(user.userid, userid);
});

test('使用票根登陆,失败', async (t) => {
	const userid = 'taoqiufeng';
	const token = 'mm';
	const ip = '127.0.0.1';
	const user = await a(userid, token, ip);
	t.is(user, null);
});
