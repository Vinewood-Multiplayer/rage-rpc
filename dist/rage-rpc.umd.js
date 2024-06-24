!(function (e, r) {
	'object' == typeof exports && 'undefined' != typeof module
		? r(exports)
		: 'function' == typeof define && define.amd
		? define(['exports'], r)
		: r(((e = 'undefined' != typeof globalThis ? globalThis : e || self).rpc = {}));
})(this, function (e) {
	'use strict';
	var r;
	!(function (e) {
		(e.Blip = 'b'),
			(e.Checkpoint = 'cp'),
			(e.Colshape = 'c'),
			(e.Label = 'l'),
			(e.Marker = 'm'),
			(e.Object = 'o'),
			(e.Pickup = 'p'),
			(e.Player = 'pl'),
			(e.Vehicle = 'v');
	})(r || (r = {}));
	let t = !1;
	function getEnvironment() {
		if (mp.joaat) return 'server';
		if (mp.game && mp.game.joaat) return 'client';
		if (mp.trigger) return 'cef';
		throw new Error('Unknown RAGE environment');
	}
	function log(e, r = 'info') {
		if (!t) return;
		const n = getEnvironment(),
			o = mp.console;
		(o ? mp.console : console)[o ? { info: 'logInfo', error: 'logError', warn: 'logWarn' }[r] : 'info' === r ? 'log' : r](`RPC (${n}): ${e}`);
	}
	function isObjectMpType(e, t) {
		const n = 'client' === getEnvironment();
		if (e && 'object' == typeof e && void 0 !== e.id) {
			const validate = (r, t, o) => (n ? e.type === r && t.at(e.id) === e : e instanceof o);
			switch (t) {
				case r.Blip:
					return validate('blip', mp.blips, mp.Blip);
				case r.Checkpoint:
					return validate('checkpoint', mp.checkpoints, mp.Checkpoint);
				case r.Colshape:
					return validate('colshape', mp.colshapes, mp.Colshape);
				case r.Label:
					return validate('textlabel', mp.labels, mp.TextLabel);
				case r.Marker:
					return validate('marker', mp.markers, mp.Marker);
				case r.Object:
					return validate('object', mp.objects, mp.Object);
				case r.Pickup:
					return validate('pickup', mp.pickups, mp.Pickup);
				case r.Player:
					return validate('player', mp.players, mp.Player);
				case r.Vehicle:
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
	function stringifyData(e) {
		const t = getEnvironment();
		return JSON.stringify(e, (e, n) => {
			if ('client' === t || ('server' === t && n && 'object' == typeof n)) {
				let e;
				if (
					(isObjectMpType(n, r.Blip)
						? (e = r.Blip)
						: isObjectMpType(n, r.Checkpoint)
						? (e = r.Checkpoint)
						: isObjectMpType(n, r.Colshape)
						? (e = r.Colshape)
						: isObjectMpType(n, r.Marker)
						? (e = r.Marker)
						: isObjectMpType(n, r.Object)
						? (e = r.Object)
						: isObjectMpType(n, r.Pickup)
						? (e = r.Pickup)
						: isObjectMpType(n, r.Player)
						? (e = r.Player)
						: isObjectMpType(n, r.Vehicle) && (e = r.Vehicle),
					e)
				)
					return { __t: e, i: 'number' == typeof n.remoteId ? n.remoteId : n.id };
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
	const n = 'PROCEDURE_NOT_FOUND',
		o = 3e4,
		s = '__rpc:id',
		i = '__rpc:process',
		c = '__rpc:processPartial',
		a = '__rpc:browserRegister',
		l = '__rpc:browserUnregister',
		p = '__rpc:triggerEvent',
		f = '__rpc:triggerEventBrowsers',
		u = getEnvironment(),
		g = 'cef' === u ? window : global;
	if (
		(g[c] ||
			((g.__rpcPartialData = {}),
			(g[c] = (e, r, t, n, o) => {
				'server' !== u && ((o = n), (n = t), (t = r), (r = e)),
					g.__rpcPartialData[r] || (g.__rpcPartialData[r] = new Array(n)),
					(g.__rpcPartialData[r][t] = o),
					g.__rpcPartialData[r].includes(void 0) ||
						('server' === u ? g[i](e, g.__rpcPartialData[r].join('')) : g[i](g.__rpcPartialData[r].join('')),
						delete g.__rpcPartialData[r]);
			})),
		!g[i])
	) {
		if (
			((g.__rpcListeners = {}),
			(g.__rpcPending = {}),
			(g.__rpcEvListeners = {}),
			(g[i] = (e, t) => {
				'server' !== u && (t = e);
				const n = (function parseData(e) {
					const t = getEnvironment();
					return JSON.parse(e, (e, n) => {
						if (
							('client' === t || 'server' === t) &&
							n &&
							'object' == typeof n &&
							'string' == typeof n.__t &&
							'number' == typeof n.i &&
							2 === Object.keys(n).length
						) {
							const e = n.i;
							let o;
							switch (n.__t) {
								case r.Blip:
									o = mp.blips;
									break;
								case r.Checkpoint:
									o = mp.checkpoints;
									break;
								case r.Colshape:
									o = mp.colshapes;
									break;
								case r.Label:
									o = mp.labels;
									break;
								case r.Marker:
									o = mp.markers;
									break;
								case r.Object:
									o = mp.objects;
									break;
								case r.Pickup:
									o = mp.pickups;
									break;
								case r.Player:
									o = mp.players;
									break;
								case r.Vehicle:
									o = mp.vehicles;
							}
							if (o) return o['client' === t ? 'atRemoteId' : 'at'](e);
						}
						return n;
					});
				})(t);
				if (n.req) {
					const r = { id: n.id, environment: n.fenv || n.env };
					'server' === u && (r.player = e);
					const t = { ret: 1, id: n.id, env: u };
					let o;
					switch (u) {
						case 'server':
							o = (e) => sendEventData(e, r.player);
							break;
						case 'client':
							if ('server' === n.env) o = (e) => sendEventData(e);
							else if ('cef' === n.env) {
								const e = n.b && g.__rpcBrowsers[n.b];
								(r.browser = e), (o = (r) => e && isBrowserValid(e) && passEventToBrowser(e, r, !0));
							}
							break;
						default:
							o = (e) => mp.trigger(i, stringifyData(e));
					}
					if (o) {
						const e = callProcedure(n.name, n.args, r);
						n.noRet || e.then((e) => o({ ...t, res: e })).catch((e) => o({ ...t, err: e || null }));
					}
				} else if (n.ret) {
					const r = g.__rpcPending[n.id];
					if ('server' === u && r.player !== e) return;
					r && (r.resolve(n.hasOwnProperty('err') ? Promise.reject(n.err) : Promise.resolve(n.res)), delete g.__rpcPending[n.id]);
				}
			}),
			'cef' === u)
		)
			void 0 === g[s] &&
				(g[s] = new Promise((e) => {
					window.name ? e(window.name) : (g[`${s}:resolve`] = e);
				}));
		else if ((mp.events.add(i, g[i]), mp.events.add(c, g[c]), 'client' === u)) {
			register('__rpc:callServer', ([e, r, t], n) => _callServer(e, r, { fenv: n.environment, noRet: t })),
				register('__rpc:callBrowsers', ([e, r, t], n) => _callBrowsers(null, e, r, { fenv: n.environment, noRet: t })),
				(g.__rpcBrowsers = {});
			const initBrowser = (e) => {
				const r = generateId();
				Object.keys(g.__rpcBrowsers).forEach((r) => {
					const t = g.__rpcBrowsers[r];
					(t && isBrowserValid(t) && t !== e) || delete g.__rpcBrowsers[r];
				}),
					(g.__rpcBrowsers[r] = e),
					e.execute(
						`\n                    window.name = '${r}';\n                    if(typeof window['${s}'] === 'undefined'){\n                        window['${s}'] = Promise.resolve(window.name);\n                    }else{\n                        window['${s}:resolve'](window.name);\n                    }\n                `
					);
			};
			mp.browsers.forEach(initBrowser),
				mp.events.add('browserCreated', initBrowser),
				(g.__rpcBrowserProcedures = {}),
				mp.events.add(a, (e) => {
					const [r, t] = JSON.parse(e);
					g.__rpcBrowserProcedures[t] = r;
				}),
				mp.events.add(l, (e) => {
					const [r, t] = JSON.parse(e);
					g.__rpcBrowserProcedures[t] === r && delete g.__rpcBrowserProcedures[t];
				}),
				register(f, ([e, r], t) => {
					Object.keys(g.__rpcBrowsers).forEach((n) => {
						const o = g.__rpcBrowsers[n];
						o && isBrowserValid(o) ? _callBrowser(o, p, [e, r], { fenv: t.environment, noRet: 1 }) : delete g.__rpcBrowsers[n];
					});
				});
		}
		register(p, ([e, r], t) => callEvent(e, r, t));
	}
	function passEventToBrowser(e, r, t) {
		const o = stringifyData(r);
		e.execute(
			`var process = window["${i}"]; if(process){ process(${JSON.stringify(o)}); }else{ ${
				t ? '' : `mp.trigger("${i}", '{"ret":1,"id":"${r.id}","err":"${n}","env":"cef"}');`
			} }`
		);
	}
	function callProcedure(e, r, t) {
		const o = g.__rpcListeners[e];
		return o ? Promise.resolve(o(r, t)) : Promise.reject(`${n} (${e})`);
	}
	function sendEventData(e, r) {
		const t = { client: (e, ...r) => mp.events.callRemote(e, ...r), server: (e, ...t) => r.call(e, [...t]) },
			n = e.env,
			s = stringifyData(e);
		if (s.length > o) {
			const r = (function chunkSubstr(e, r) {
				const t = [];
				for (let n = 0; n <= e.length - 1; n += r) t.push(e.substr(n, Math.min(r, e.length - n)));
				return t;
			})(s, o);
			r.forEach((o, s) => {
				t[n](c, e.id, s, r.length, o);
			});
		} else t[n](i, s);
	}
	function register(e, r) {
		if ('string' != typeof e || !r || 'function' != typeof r) throw new Error(`register expects 2 arguments: "name" and "cb" - ("${e}")`);
		return (
			log(`Registered procedure "${e}"`),
			'cef' === u && g[s].then((r) => mp.trigger(a, JSON.stringify([r, e]))),
			(g.__rpcListeners[e] = r),
			() => unregister(e)
		);
	}
	function unregister(e) {
		if ('string' != typeof e) throw new Error(`unregister expects 1 argument: "name" - ("${e}")`);
		log(`Unregistered procedure "${e}"`), 'cef' === u && g[s].then((r) => mp.trigger(l, JSON.stringify([r, e]))), (g.__rpcListeners[e] = void 0);
	}
	function call(e, r, t = {}) {
		return 'string' != typeof e
			? Promise.reject(`call expects 1 to 3 arguments: "name", optional "args", and optional "options" - ("${e}")`)
			: promiseTimeout(callProcedure(e, r, { environment: u }), t.timeout);
	}
	function _callServer(e, r, t = {}) {
		switch (u) {
			case 'server':
				return call(e, r);
			case 'client': {
				const n = generateId();
				return new Promise((o) => {
					t.noRet || (g.__rpcPending[n] = { resolve: o });
					sendEventData({ req: 1, id: n, name: e, env: u, args: r, ...t });
				});
			}
			case 'cef':
				return callClient('__rpc:callServer', [e, r, Number(t.noRet)]);
		}
	}
	function _callClient(e, r, t, n = {}) {
		switch (u) {
			case 'client':
				return call(r, t);
			case 'server': {
				const o = generateId();
				return new Promise((s) => {
					n.noRet || (g.__rpcPending[o] = { resolve: s, player: e });
					sendEventData({ req: 1, id: o, name: r, env: u, args: t, ...n }, e);
				});
			}
			case 'cef': {
				const e = generateId();
				return g[s].then(
					(o) =>
						new Promise((s) => {
							n.noRet || (g.__rpcPending[e] = { resolve: s });
							const c = { b: o, req: 1, id: e, name: r, env: u, args: t, ...n };
							mp.trigger(i, stringifyData(c));
						})
				);
			}
		}
	}
	function callClient(e, r, t, n = {}) {
		switch (u) {
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
			n.noRet || (g.__rpcPending[s] = { resolve: o }), passEventToBrowser(e, { req: 1, id: s, name: r, env: u, args: t, ...n }, !1);
		});
	}
	function _callBrowsers(e, r, t, o = {}) {
		switch (u) {
			case 'client': {
				const e = g.__rpcBrowserProcedures[r];
				if (!e) return Promise.reject(`${n} (${r})`);
				const s = g.__rpcBrowsers[e];
				return s && isBrowserValid(s) ? _callBrowser(s, r, t, o) : Promise.reject(`${n} (${r})`);
			}
			case 'server':
				return _callClient(e, '__rpc:callBrowsers', [r, t, Number(o.noRet)], o);
			case 'cef':
				return _callClient(null, '__rpc:callBrowsers', [r, t, Number(o.noRet)], o);
		}
	}
	function callEvent(e, r, t) {
		const n = g.__rpcEvListeners[e];
		n && n.forEach((e) => e(r, t));
	}
	function off(e, r) {
		if ('string' != typeof e || !r || 'function' != typeof r) throw new Error(`off expects 2 arguments: "name" and "cb" - ("${e}")`);
		const t = g.__rpcEvListeners[e];
		t && (log(`Unregistered procedure listener "${e}"`), t.delete(r));
	}
	(e.call = call),
		(e.callBrowser = function callBrowser(e, r, t, n = {}) {
			if ('client' !== u) return Promise.reject(`callBrowser can only be used in the client environment - ("${r}")`);
			if (!isBrowserValid(e) || 'string' != typeof r)
				return Promise.reject(`callBrowser expects 2 to 4 arguments: "browser", "name", optional "args", and optional "options" - ("${r}")`);
			const o = {};
			return n.noRet && (o.noRet = 1), promiseTimeout(_callBrowser(e, r, t, o), n.timeout);
		}),
		(e.callBrowsers = function callBrowsers(e, r, t, n = {}) {
			let o;
			const s = {};
			switch (u) {
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
		(e.callClient = callClient),
		(e.callServer = function callServer(e, r, t = {}) {
			if ('string' != typeof e)
				return Promise.reject(`callServer expects 1 to 3 arguments: "name", optional "args", and optional "options" - ("${e}")`);
			const n = {};
			return t.noRet && (n.noRet = 1), promiseTimeout(_callServer(e, r, n), t.timeout);
		}),
		(e.off = off),
		(e.on = function on(e, r) {
			if ('string' != typeof e || !r || 'function' != typeof r) throw new Error(`on expects 2 arguments: "name" and "cb" - ("${e}")`);
			log(`Registered procedure listener "${e}"`);
			const t = g.__rpcEvListeners[e] || new Set();
			return t.add(r), (g.__rpcEvListeners[e] = t), () => off(e, r);
		}),
		(e.register = register),
		(e.setDebugMode = function setDebugMode(e) {
			t = e;
		}),
		(e.trigger = function trigger(e, r) {
			if ('string' != typeof e) throw new Error(`trigger expects 1 or 2 arguments: "name", and optional "args" - ("${e}")`);
			callEvent(e, r, { environment: u });
		}),
		(e.triggerBrowser = function triggerBrowser(e, r, t) {
			if ('client' !== u) throw new Error(`callBrowser can only be used in the client environment - ("${r}")`);
			if (!isBrowserValid(e) || 'string' != typeof r)
				throw new Error(`callBrowser expects 2 or 3 arguments: "browser", "name", and optional "args" - ("${r}")`);
			_callBrowser(e, p, [r, t], { noRet: 1 });
		}),
		(e.triggerBrowsers = function triggerBrowsers(e, r, t) {
			switch (u) {
				case 'client':
				case 'cef':
					if (((t = r), (r = e), (e = null), 'string' != typeof r))
						throw new Error(
							`triggerBrowsers from the client or browser expects 1 or 2 arguments: "name", and optional "args" - ("${r}")`
						);
					break;
				case 'server':
					if ('string' != typeof r || 'object' != typeof e)
						throw new Error(`triggerBrowsers from the server expects 2 or 3 arguments: "player", "name", and optional "args" - ("${r}")`);
			}
			_callClient(e, f, [r, t], { noRet: 1 });
		}),
		(e.triggerClient = function triggerClient(e, r, t) {
			switch (u) {
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
			_callClient(e, p, [r, t], { noRet: 1 });
		}),
		(e.triggerServer = function triggerServer(e, r) {
			if ('string' != typeof e) throw new Error(`triggerServer expects 1 or 2 arguments: "name", and optional "args" - ("${e}")`);
			_callServer(p, [e, r], { noRet: 1 });
		}),
		(e.unregister = unregister),
		(e.version = '0.2.6'),
		Object.defineProperty(e, '__esModule', { value: !0 });
});
