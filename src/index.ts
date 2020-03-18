import { createHash } from 'crypto';
import an14 from '@mmstudio/an000014';
import an16 from '@mmstudio/an000016';
import { v4 as uuid } from 'uuid';

export interface IUserInfo {
	id: string;
	userid: string;
	info: { [key: string]: string };
	sessionid: string;
}

const db = 'sys';

export default async function login(usr: string, token: string, ip: string) {
	const sql = 'select t1.id as id, t2.identifier as userid, t1.info as info from users as t1 join user_auths as t2 on t1.id=t2.user_id where t2.identity_type=$1 and t2.identifier=$2 and t2.credential=$3';
	const [ran14] = await an14<IUserInfo>(db, [sql, ['rememberme', usr, md5(token)]]);
	if (ran14.length === 0) {
		return null;
	}
	const a = await an14<IUserInfo>(db, ['update user_auths set ip=$1,last_active=$2 where identity_type=$3 and identifier=$4', [ip, new Date().getTime(), 'rememberme', usr]]);
	console.error(a);
	const sessionid = uuid();
	const userinfo = ran14[0];
	userinfo.sessionid = sessionid;
	await an16(sessionid, userinfo);
	return userinfo;
}

/**
 * md5加密
 * @param algorithm 算法 md5
 * @see 文档：<http://nodejs.cn/api/crypto.html#crypto_crypto_createhash_algorithm_options>
 * @param content 内容
 */
function md5(content: string) {
	return createHash('md5').update(content).digest('hex');
}
