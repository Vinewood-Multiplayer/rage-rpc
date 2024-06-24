'use strict';
var e;
Object.defineProperty(exports, '__esModule', { value: !0 }),
	(function (e) {
		(e.Blip = 'b'),
			(e.Checkpoint = 'cp'),
			(e.Colshape = 'c'),
			(e.Label = 'l'),
			(e.Marker = 'm'),
			(e.Object = 'o'),
			(e.Pickup = 'p'),
			(e.Player = 'pl'),
			(e.Vehicle = 'v');
	})(e || (e = {}));
let r = !1;
function getEnvironment() {
	if (mp.joaat) return 'server';
	if (mp.game && mp.game.joaat) return 'client';
	if (mp.trigger) return 'cef';
	throw new Error('Unknown RAGE environment');
}
function log(e, t = 'info') {
	if (!r) return;
	const n = getEnvironment(),
		o = mp.console;
	(o ? mp.console : console)[o ? { info: 'logInfo', error: 'logError', warn: 'logWarn' }[t] : 'info' === t ? 'log' : t](`RPC (${n}): ${e}`);
}
function isObjectMpType(r, t) {
	const n = 'client' === getEnvironment();
	if (r && 'object' == typeof r && void 0 !== r.id) {
		const validate = (e, t, o) => (n ? r.type === e && t.at(r.id) === r : r instanceof o);
		switch (t) {
			case e.Blip:
				return validate('blip', mp.blips, mp.Blip);
			case e.Checkpoint:
				return validate('checkpoint', mp.checkpoints, mp.Checkpoint);
			case e.Colshape:
				return validate('colshape', mp.colshapes, mp.Colshape);
			case e.Label:
				return validate('textlabel', mp.labels, mp.TextLabel);
			case e.Marker:
				return validate('marker', mp.markers, mp.Marker);
			case e.Object:
				return validate('object', mp.objects, mp.Object);
			case e.Pickup:
				return validate('pickup', mp.pickups, mp.Pickup);
			case e.Player:
				return validate('player', mp.players, mp.Player);
			case e.Vehicle:
				return validate('vehicle', mp.vehicles, mp.Vehicle);
		}
	}
	return !1;
}
function generateId() {
	const e = (46656 * Math.random()) | 0,
		r = (46656 * Math.random()) | 0;
	return `000${e.toString(36)}`.slice(-3) + `000${r.toString(36)}`.slice(-3);
}
function stringifyData(r) {
	const t = getEnvironment();
	return JSON.stringify(r, (r, n) => {
		if ('client' === t || ('server' === t && n && 'object' == typeof n)) {
			let r;
			if (
				(isObjectMpType(n, e.Blip)
					? (r = e.Blip)
					: isObjectMpType(n, e.Checkpoint)
					? (r = e.Checkpoint)
					: isObjectMpType(n, e.Colshape)
					? (r = e.Colshape)
					: isObjectMpType(n, e.Marker)
					? (r = e.Marker)
					: isObjectMpType(n, e.Object)
					? (r = e.Object)
					: isObjectMpType(n, e.Pickup)
					? (r = e.Pickup)
					: isObjectMpType(n, e.Player)
					? (r = e.Player)
					: isObjectMpType(n, e.Vehicle) && (r = e.Vehicle),
				r)
			)
				return { __t: r, i: 'number' == typeof n.remoteId ? n.remoteId : n.id };
		}
		return n;
	});
}
function promiseTimeout(e, r) {
	return 'number' == typeof r
		? Promise.race([
				new Promise((e, t) => {
					setTimeout(() => t('TIMEOUT'), r);
				}),
				e
		  ])
		: e;
}
function isBrowserValid(e) {
	try {
		e.url;
	} catch (e) {
		return !1;
	}
	return !0;
}
const t = 'PROCEDURE_NOT_FOUND',
	n = 3e4,
	o = '__rpc:id',
	s = '__rpc:process',
	i = '__rpc:processPartial',
	c = '__rpc:browserRegister',
	a = '__rpc:browserUnregister',
	l = '__rpc:triggerEvent',
	p = '__rpc:triggerEventBrowsers',
	g = getEnvironment(),
	m = 'cef' === g ? window : global;
if (
	(m[i] ||
		((m.__rpcPartialData = {}),
		(m[i] = (e, r, t, n, o) => {
			'server' !== g && ((o = n), (n = t), (t = r), (r = e)),
				m.__rpcPartialData[r] || (m.__rpcPartialData[r] = new Array(n)),
				(m.__rpcPartialData[r][t] = o),
				m.__rpcPartialData[r].includes(void 0) ||
					('server' === g ? m[s](e, m.__rpcPartialData[r].join('')) : m[s](m.__rpcPartialData[r].join('')), delete m.__rpcPartialData[r]);
		})),
	!m[s])
) {
	if (
		((m.__rpcListeners = {}),
		(m.__rpcPending = {}),
		(m.__rpcEvListeners = {}),
		(m[s] = (r, t) => {
			'server' !== g && (t = r);
			const n = (function parseData(r) {
				const t = getEnvironment();
				return JSON.parse(r, (r, n) => {
					if (
						('client' === t || 'server' === t) &&
						n &&
						'object' == typeof n &&
						'string' == typeof n.__t &&
						'number' == typeof n.i &&
						2 === Object.keys(n).length
					) {
						const r = n.i;
						let o;
						switch (n.__t) {
							case e.Blip:
								o = mp.blips;
								break;
							case e.Checkpoint:
								o = mp.checkpoints;
								break;
							case e.Colshape:
								o = mp.colshapes;
								break;
							case e.Label:
								o = mp.labels;
								break;
							case e.Marker:
								o = mp.markers;
								break;
							case e.Object:
								o = mp.objects;
								break;
							case e.Pickup:
								o = mp.pickups;
								break;
							case e.Player:
								o = mp.players;
								break;
							case e.Vehicle:
								o = mp.vehicles;
						}
						if (o) return o['client' === t ? 'atRemoteId' : 'at'](r);
					}
					return n;
				});
			})(t);
			if (n.req) {
				const e = { id: n.id, environment: n.fenv || n.env };
				'server' === g && (e.player = r);
				const t = { ret: 1, id: n.id, env: g };
				let o;
				switch (g) {
					case 'server':
						o = (r) => sendEventData(r, e.player);
						break;
					case 'client':
						if ('server' === n.env) o = (e) => sendEventData(e);
						else if ('cef' === n.env) {
							const r = n.b && m.__rpcBrowsers[n.b];
							(e.browser = r), (o = (e) => r && isBrowserValid(r) && passEventToBrowser(r, e, !0));
						}
						break;
					default:
						o = (e) => mp.trigger(s, stringifyData(e));
				}
				if (o) {
					const r = callProcedure(n.name, n.args, e);
					n.noRet || r.then((e) => o({ ...t, res: e })).catch((e) => o({ ...t, err: e || null }));
				}
			} else if (n.ret) {
				const e = m.__rpcPending[n.id];
				if ('server' === g && e.player !== r) return;
				e && (e.resolve(n.hasOwnProperty('err') ? Promise.reject(n.err) : Promise.resolve(n.res)), delete m.__rpcPending[n.id]);
			}
		}),
		'cef' === g)
	)
		void 0 === m[o] &&
			(m[o] = new Promise((e) => {
				window.name ? e(window.name) : (m[`${o}:resolve`] = e);
			}));
	else if ((mp.events.add(s, m[s]), mp.events.add(i, m[i]), 'client' === g)) {
		register('__rpc:callServer', ([e, r, t], n) => _callServer(e, r, { fenv: n.environment, noRet: t })),
			register('__rpc:callBrowsers', ([e, r, t], n) => _callBrowsers(null, e, r, { fenv: n.environment, noRet: t })),
			(m.__rpcBrowsers = {});
		const initBrowser = (e) => {
			const r = generateId();
			Object.keys(m.__rpcBrowsers).forEach((r) => {
				const t = m.__rpcBrowsers[r];
				(t && isBrowserValid(t) && t !== e) || delete m.__rpcBrowsers[r];
			}),
				(m.__rpcBrowsers[r] = e),
				e.execute(
					`\n                    window.name = '${r}';\n                    if(typeof window['${o}'] === 'undefined'){\n                        window['${o}'] = Promise.resolve(window.name);\n                    }else{\n                        window['${o}:resolve'](window.name);\n                    }\n                `
				);
		};
		mp.browsers.forEach(initBrowser),
			mp.events.add('browserCreated', initBrowser),
			(m.__rpcBrowserProcedures = {}),
			mp.events.add(c, (e) => {
				const [r, t] = JSON.parse(e);
				m.__rpcBrowserProcedures[t] = r;
			}),
			mp.events.add(a, (e) => {
				const [r, t] = JSON.parse(e);
				m.__rpcBrowserProcedures[t] === r && delete m.__rpcBrowserProcedures[t];
			}),
			register(p, ([e, r], t) => {
				Object.keys(m.__rpcBrowsers).forEach((n) => {
					const o = m.__rpcBrowsers[n];
					o && isBrowserValid(o) ? _callBrowser(o, l, [e, r], { fenv: t.environment, noRet: 1 }) : delete m.__rpcBrowsers[n];
				});
			});
	}
	register(l, ([e, r], t) => callEvent(e, r, t));
}
function passEventToBrowser(e, r, n) {
	const o = stringifyData(r);
	e.execute(
		`var process = window["${s}"]; if(process){ process(${JSON.stringify(o)}); }else{ ${
			n ? '' : `mp.trigger("${s}", '{"ret":1,"id":"${r.id}","err":"${t}","env":"cef"}');`
		} }`
	);
}
function callProcedure(e, r, n) {
	const o = m.__rpcListeners[e];
	return o ? Promise.resolve(o(r, n)) : Promise.reject(`${t} (${e})`);
}
function sendEventData(e, r) {
	const t = { client: (e, ...r) => mp.events.callRemote(e, ...r), server: (e, ...t) => r.call(e, [...t]) },
		o = e.env,
		c = stringifyData(e);
	if (c.length > n) {
		const r = (function chunkSubstr(e, r) {
			const t = [];
			for (let n = 0; n <= e.length - 1; n += r) t.push(e.substr(n, Math.min(r, e.length - n)));
			return t;
		})(c, n);
		r.forEach((n, s) => {
			t[o](i, e.id, s, r.length, n);
		});
	} else t[o](s, c);
}
function register(e, r) {
	if ('string' != typeof e || !r || 'function' != typeof r) throw new Error(`register expects 2 arguments: "name" and "cb" - ("${e}")`);
	return (
		log(`Registered procedure "${e}"`),
		'cef' === g && m[o].then((r) => mp.trigger(c, JSON.stringify([r, e]))),
		(m.__rpcListeners[e] = r),
		() => unregister(e)
	);
}
function unregister(e) {
	if ('string' != typeof e) throw new Error(`unregister expects 1 argument: "name" - ("${e}")`);
	log(`Unregistered procedure "${e}"`), 'cef' === g && m[o].then((r) => mp.trigger(a, JSON.stringify([r, e]))), (m.__rpcListeners[e] = void 0);
}
function call(e, r, t = {}) {
	return 'string' != typeof e
		? Promise.reject(`call expects 1 to 3 arguments: "name", optional "args", and optional "options" - ("${e}")`)
		: promiseTimeout(callProcedure(e, r, { environment: g }), t.timeout);
}
function _callServer(e, r, t = {}) {
	switch (g) {
		case 'server':
			return call(e, r);
		case 'client': {
			const n = generateId();
			return new Promise((o) => {
				t.noRet || (m.__rpcPending[n] = { resolve: o });
				sendEventData({ req: 1, id: n, name: e, env: g, args: r, ...t });
			});
		}
		case 'cef':
			return callClient('__rpc:callServer', [e, r, Number(t.noRet)]);
	}
}
function _callClient(e, r, t, n = {}) {
	switch (g) {
		case 'client':
			return call(r, t);
		case 'server': {
			const o = generateId();
			return new Promise((s) => {
				n.noRet || (m.__rpcPending[o] = { resolve: s, player: e });
				sendEventData({ req: 1, id: o, name: r, env: g, args: t, ...n }, e);
			});
		}
		case 'cef': {
			const e = generateId();
			return m[o].then(
				(o) =>
					new Promise((i) => {
						n.noRet || (m.__rpcPending[e] = { resolve: i });
						const c = { b: o, req: 1, id: e, name: r, env: g, args: t, ...n };
						mp.trigger(s, stringifyData(c));
					})
			);
		}
	}
}
function callClient(e, r, t, n = {}) {
	switch (g) {
		case 'client':
			if (((n = t || {}), (t = r), (r = e), (e = null), 'string' != typeof r))
				return Promise.reject(
					`callClient from the client expects 1 to 3 arguments: "name", optional "args", and optional "options" - ("${r}")`
				);
			break;
		case 'server':
			if ('string' != typeof r || 'object' != typeof e)
				return Promise.reject(
					`callClient from the server expects 2 to 4 arguments: "player", "name", optional "args", and optional "options" - ("${r}")`
				);
			break;
		case 'cef':
			if (((n = t || {}), (t = r), (r = e), (e = null), 'string' != typeof r))
				return Promise.reject(
					`callClient from the browser expects 1 to 3 arguments: "name", optional "args", and optional "options" - ("${r}")`
				);
	}
	const o = {};
	return n.noRet && (o.noRet = 1), promiseTimeout(_callClient(e, r, t, o), n.timeout);
}
function _callBrowser(e, r, t, n = {}) {
	return new Promise((o) => {
		const s = generateId();
		n.noRet || (m.__rpcPending[s] = { resolve: o }), passEventToBrowser(e, { req: 1, id: s, name: r, env: g, args: t, ...n }, !1);
	});
}
function _callBrowsers(e, r, n, o = {}) {
	switch (g) {
		case 'client': {
			const e = m.__rpcBrowserProcedures[r];
			if (!e) return Promise.reject(`${t} (${r})`);
			const s = m.__rpcBrowsers[e];
			return s && isBrowserValid(s) ? _callBrowser(s, r, n, o) : Promise.reject(`${t} (${r})`);
		}
		case 'server':
			return _callClient(e, '__rpc:callBrowsers', [r, n, Number(o.noRet)], o);
		case 'cef':
			return _callClient(null, '__rpc:callBrowsers', [r, n, Number(o.noRet)], o);
	}
}
function callEvent(e, r, t) {
	const n = m.__rpcEvListeners[e];
	n && n.forEach((e) => e(r, t));
}
function off(e, r) {
	if ('string' != typeof e || !r || 'function' != typeof r) throw new Error(`off expects 2 arguments: "name" and "cb" - ("${e}")`);
	const t = m.__rpcEvListeners[e];
	t && (log(`Unregistered procedure listener "${e}"`), t.delete(r));
}
(exports.call = call),
	(exports.callBrowser = function callBrowser(e, r, t, n = {}) {
		if ('client' !== g) return Promise.reject(`callBrowser can only be used in the client environment - ("${r}")`);
		if (!isBrowserValid(e) || 'string' != typeof r)
			return Promise.reject(`callBrowser expects 2 to 4 arguments: "browser", "name", optional "args", and optional "options" - ("${r}")`);
		const o = {};
		return n.noRet && (o.noRet = 1), promiseTimeout(_callBrowser(e, r, t, o), n.timeout);
	}),
	(exports.callBrowsers = function callBrowsers(e, r, t, n = {}) {
		let o;
		const s = {};
		switch (g) {
			case 'client':
			case 'cef':
				if (((n = t || {}), (t = r), 'string' != typeof (r = e)))
					return Promise.reject(
						`callBrowsers from the client or browser expects 1 to 3 arguments: "name", optional "args", and optional "options" - ("${r}")`
					);
				n.noRet && (s.noRet = 1), (o = _callBrowsers(null, r, t, s));
				break;
			case 'server':
				if ('string' != typeof r || 'object' != typeof e)
					return Promise.reject(
						`callBrowsers from the server expects 2 to 4 arguments: "player", "name", optional "args", and optional "options" - ("${r}")`
					);
				n.noRet && (s.noRet = 1), (o = _callBrowsers(e, r, t, s));
		}
		if (o) return promiseTimeout(o, n.timeout);
	}),
	(exports.callClient = callClient),
	(exports.callServer = function callServer(e, r, t = {}) {
		if ('string' != typeof e)
			return Promise.reject(`callServer expects 1 to 3 arguments: "name", optional "args", and optional "options" - ("${e}")`);
		const n = {};
		return t.noRet && (n.noRet = 1), promiseTimeout(_callServer(e, r, n), t.timeout);
	}),
	(exports.off = off),
	(exports.on = function on(e, r) {
		if ('string' != typeof e || !r || 'function' != typeof r) throw new Error(`on expects 2 arguments: "name" and "cb" - ("${e}")`);
		log(`Registered procedure listener "${e}"`);
		const t = m.__rpcEvListeners[e] || new Set();
		return t.add(r), (m.__rpcEvListeners[e] = t), () => off(e, r);
	}),
	(exports.register = register),
	(exports.setDebugMode = function setDebugMode(e) {
		r = e;
	}),
	(exports.trigger = function trigger(e, r) {
		if ('string' != typeof e) throw new Error(`trigger expects 1 or 2 arguments: "name", and optional "args" - ("${e}")`);
		callEvent(e, r, { environment: g });
	}),
	(exports.triggerBrowser = function triggerBrowser(e, r, t) {
		if ('client' !== g) throw new Error(`callBrowser can only be used in the client environment - ("${r}")`);
		if (!isBrowserValid(e) || 'string' != typeof r)
			throw new Error(`callBrowser expects 2 or 3 arguments: "browser", "name", and optional "args" - ("${r}")`);
		_callBrowser(e, l, [r, t], { noRet: 1 });
	}),
	(exports.triggerBrowsers = function triggerBrowsers(e, r, t) {
		switch (g) {
			case 'client':
			case 'cef':
				if (((t = r), (r = e), (e = null), 'string' != typeof r))
					throw new Error(`triggerBrowsers from the client or browser expects 1 or 2 arguments: "name", and optional "args" - ("${r}")`);
				break;
			case 'server':
				if ('string' != typeof r || 'object' != typeof e)
					throw new Error(`triggerBrowsers from the server expects 2 or 3 arguments: "player", "name", and optional "args" - ("${r}")`);
		}
		_callClient(e, p, [r, t], { noRet: 1 });
	}),
	(exports.triggerClient = function triggerClient(e, r, t) {
		switch (g) {
			case 'client':
				if (((t = r), (r = e), (e = null), 'string' != typeof r))
					throw new Error(`triggerClient from the client expects 1 or 2 arguments: "name", and optional "args" - ("${r}")`);
				break;
			case 'server':
				if ('string' != typeof r || 'object' != typeof e)
					throw new Error(`triggerClient from the server expects 2 or 3 arguments: "player", "name", and optional "args" - ("${r}")`);
				break;
			case 'cef':
				if (((t = r), (r = e), (e = null), 'string' != typeof r))
					throw new Error(`triggerClient from the browser expects 1 or 2 arguments: "name", and optional "args" - ("${r}")`);
		}
		_callClient(e, l, [r, t], { noRet: 1 });
	}),
	(exports.triggerServer = function triggerServer(e, r) {
		if ('string' != typeof e) throw new Error(`triggerServer expects 1 or 2 arguments: "name", and optional "args" - ("${e}")`);
		_callServer(l, [e, r], { noRet: 1 });
	}),
	(exports.unregister = unregister),
	(exports.version = '0.2.6');
