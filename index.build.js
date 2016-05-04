!function () {
window.WebComponents = window.WebComponents || { flags: {} };
var e = 'webcomponents-lite.js', t = document.querySelector('script[src*="' + e + '"]'), n = {};
if (!n.noOpts) {
if (location.search.slice(1).split('&').forEach(function (e) {
var t, o = e.split('=');
o[0] && (t = o[0].match(/wc-(.+)/)) && (n[t[1]] = o[1] || !0);
}), t)
for (var o, r = 0; o = t.attributes[r]; r++)
'src' !== o.name && (n[o.name] = o.value || !0);
if (n.log && n.log.split) {
var i = n.log.split(',');
n.log = {}, i.forEach(function (e) {
n.log[e] = !0;
});
} else
n.log = {};
}
n.register && (window.CustomElements = window.CustomElements || { flags: {} }, window.CustomElements.flags.register = n.register), WebComponents.flags = n;
}(), function (e) {
'use strict';
function t(e) {
return void 0 !== h[e];
}
function n() {
s.call(this), this._isInvalid = !0;
}
function o(e) {
return '' == e && n.call(this), e.toLowerCase();
}
function r(e) {
var t = e.charCodeAt(0);
return t > 32 && 127 > t && -1 == [
34,
35,
60,
62,
63,
96
].indexOf(t) ? e : encodeURIComponent(e);
}
function i(e) {
var t = e.charCodeAt(0);
return t > 32 && 127 > t && -1 == [
34,
35,
60,
62,
96
].indexOf(t) ? e : encodeURIComponent(e);
}
function a(e, a, s) {
function c(e) {
g.push(e);
}
var d = a || 'scheme start', l = 0, u = '', w = !1, _ = !1, g = [];
e:
for (; (e[l - 1] != p || 0 == l) && !this._isInvalid;) {
var b = e[l];
switch (d) {
case 'scheme start':
if (!b || !m.test(b)) {
if (a) {
c('Invalid scheme.');
break e;
}
u = '', d = 'no scheme';
continue;
}
u += b.toLowerCase(), d = 'scheme';
break;
case 'scheme':
if (b && v.test(b))
u += b.toLowerCase();
else {
if (':' != b) {
if (a) {
if (p == b)
break e;
c('Code point not allowed in scheme: ' + b);
break e;
}
u = '', l = 0, d = 'no scheme';
continue;
}
if (this._scheme = u, u = '', a)
break e;
t(this._scheme) && (this._isRelative = !0), d = 'file' == this._scheme ? 'relative' : this._isRelative && s && s._scheme == this._scheme ? 'relative or authority' : this._isRelative ? 'authority first slash' : 'scheme data';
}
break;
case 'scheme data':
'?' == b ? (this._query = '?', d = 'query') : '#' == b ? (this._fragment = '#', d = 'fragment') : p != b && '\t' != b && '\n' != b && '\r' != b && (this._schemeData += r(b));
break;
case 'no scheme':
if (s && t(s._scheme)) {
d = 'relative';
continue;
}
c('Missing scheme.'), n.call(this);
break;
case 'relative or authority':
if ('/' != b || '/' != e[l + 1]) {
c('Expected /, got: ' + b), d = 'relative';
continue;
}
d = 'authority ignore slashes';
break;
case 'relative':
if (this._isRelative = !0, 'file' != this._scheme && (this._scheme = s._scheme), p == b) {
this._host = s._host, this._port = s._port, this._path = s._path.slice(), this._query = s._query, this._username = s._username, this._password = s._password;
break e;
}
if ('/' == b || '\\' == b)
'\\' == b && c('\\ is an invalid code point.'), d = 'relative slash';
else if ('?' == b)
this._host = s._host, this._port = s._port, this._path = s._path.slice(), this._query = '?', this._username = s._username, this._password = s._password, d = 'query';
else {
if ('#' != b) {
var y = e[l + 1], E = e[l + 2];
('file' != this._scheme || !m.test(b) || ':' != y && '|' != y || p != E && '/' != E && '\\' != E && '?' != E && '#' != E) && (this._host = s._host, this._port = s._port, this._username = s._username, this._password = s._password, this._path = s._path.slice(), this._path.pop()), d = 'relative path';
continue;
}
this._host = s._host, this._port = s._port, this._path = s._path.slice(), this._query = s._query, this._fragment = '#', this._username = s._username, this._password = s._password, d = 'fragment';
}
break;
case 'relative slash':
if ('/' != b && '\\' != b) {
'file' != this._scheme && (this._host = s._host, this._port = s._port, this._username = s._username, this._password = s._password), d = 'relative path';
continue;
}
'\\' == b && c('\\ is an invalid code point.'), d = 'file' == this._scheme ? 'file host' : 'authority ignore slashes';
break;
case 'authority first slash':
if ('/' != b) {
c('Expected \'/\', got: ' + b), d = 'authority ignore slashes';
continue;
}
d = 'authority second slash';
break;
case 'authority second slash':
if (d = 'authority ignore slashes', '/' != b) {
c('Expected \'/\', got: ' + b);
continue;
}
break;
case 'authority ignore slashes':
if ('/' != b && '\\' != b) {
d = 'authority';
continue;
}
c('Expected authority, got: ' + b);
break;
case 'authority':
if ('@' == b) {
w && (c('@ already seen.'), u += '%40'), w = !0;
for (var L = 0; L < u.length; L++) {
var N = u[L];
if ('\t' != N && '\n' != N && '\r' != N)
if (':' != N || null !== this._password) {
var M = r(N);
null !== this._password ? this._password += M : this._username += M;
} else
this._password = '';
else
c('Invalid whitespace in authority.');
}
u = '';
} else {
if (p == b || '/' == b || '\\' == b || '?' == b || '#' == b) {
l -= u.length, u = '', d = 'host';
continue;
}
u += b;
}
break;
case 'file host':
if (p == b || '/' == b || '\\' == b || '?' == b || '#' == b) {
2 != u.length || !m.test(u[0]) || ':' != u[1] && '|' != u[1] ? 0 == u.length ? d = 'relative path start' : (this._host = o.call(this, u), u = '', d = 'relative path start') : d = 'relative path';
continue;
}
'\t' == b || '\n' == b || '\r' == b ? c('Invalid whitespace in file host.') : u += b;
break;
case 'host':
case 'hostname':
if (':' != b || _) {
if (p == b || '/' == b || '\\' == b || '?' == b || '#' == b) {
if (this._host = o.call(this, u), u = '', d = 'relative path start', a)
break e;
continue;
}
'\t' != b && '\n' != b && '\r' != b ? ('[' == b ? _ = !0 : ']' == b && (_ = !1), u += b) : c('Invalid code point in host/hostname: ' + b);
} else if (this._host = o.call(this, u), u = '', d = 'port', 'hostname' == a)
break e;
break;
case 'port':
if (/[0-9]/.test(b))
u += b;
else {
if (p == b || '/' == b || '\\' == b || '?' == b || '#' == b || a) {
if ('' != u) {
var T = parseInt(u, 10);
T != h[this._scheme] && (this._port = T + ''), u = '';
}
if (a)
break e;
d = 'relative path start';
continue;
}
'\t' == b || '\n' == b || '\r' == b ? c('Invalid code point in port: ' + b) : n.call(this);
}
break;
case 'relative path start':
if ('\\' == b && c('\'\\\' not allowed in path.'), d = 'relative path', '/' != b && '\\' != b)
continue;
break;
case 'relative path':
if (p != b && '/' != b && '\\' != b && (a || '?' != b && '#' != b))
'\t' != b && '\n' != b && '\r' != b && (u += r(b));
else {
'\\' == b && c('\\ not allowed in relative path.');
var O;
(O = f[u.toLowerCase()]) && (u = O), '..' == u ? (this._path.pop(), '/' != b && '\\' != b && this._path.push('')) : '.' == u && '/' != b && '\\' != b ? this._path.push('') : '.' != u && ('file' == this._scheme && 0 == this._path.length && 2 == u.length && m.test(u[0]) && '|' == u[1] && (u = u[0] + ':'), this._path.push(u)), u = '', '?' == b ? (this._query = '?', d = 'query') : '#' == b && (this._fragment = '#', d = 'fragment');
}
break;
case 'query':
a || '#' != b ? p != b && '\t' != b && '\n' != b && '\r' != b && (this._query += i(b)) : (this._fragment = '#', d = 'fragment');
break;
case 'fragment':
p != b && '\t' != b && '\n' != b && '\r' != b && (this._fragment += b);
}
l++;
}
}
function s() {
this._scheme = '', this._schemeData = '', this._username = '', this._password = null, this._host = '', this._port = '', this._path = [], this._query = '', this._fragment = '', this._isInvalid = !1, this._isRelative = !1;
}
function c(e, t) {
void 0 === t || t instanceof c || (t = new c(String(t))), this._url = e, s.call(this);
var n = e.replace(/^[ \t\r\n\f]+|[ \t\r\n\f]+$/g, '');
a.call(this, n, null, t);
}
var d = !1;
if (!e.forceJURL)
try {
var l = new URL('b', 'http://a');
l.pathname = 'c%20d', d = 'http://a/c%20d' === l.href;
} catch (u) {
}
if (!d) {
var h = Object.create(null);
h.ftp = 21, h.file = 0, h.gopher = 70, h.http = 80, h.https = 443, h.ws = 80, h.wss = 443;
var f = Object.create(null);
f['%2e'] = '.', f['.%2e'] = '..', f['%2e.'] = '..', f['%2e%2e'] = '..';
var p = void 0, m = /[a-zA-Z]/, v = /[a-zA-Z0-9\+\-\.]/;
c.prototype = {
toString: function () {
return this.href;
},
get href() {
if (this._isInvalid)
return this._url;
var e = '';
return '' == this._username && null == this._password || (e = this._username + (null != this._password ? ':' + this._password : '') + '@'), this.protocol + (this._isRelative ? '//' + e + this.host : '') + this.pathname + this._query + this._fragment;
},
set href(e) {
s.call(this), a.call(this, e);
},
get protocol() {
return this._scheme + ':';
},
set protocol(e) {
this._isInvalid || a.call(this, e + ':', 'scheme start');
},
get host() {
return this._isInvalid ? '' : this._port ? this._host + ':' + this._port : this._host;
},
set host(e) {
!this._isInvalid && this._isRelative && a.call(this, e, 'host');
},
get hostname() {
return this._host;
},
set hostname(e) {
!this._isInvalid && this._isRelative && a.call(this, e, 'hostname');
},
get port() {
return this._port;
},
set port(e) {
!this._isInvalid && this._isRelative && a.call(this, e, 'port');
},
get pathname() {
return this._isInvalid ? '' : this._isRelative ? '/' + this._path.join('/') : this._schemeData;
},
set pathname(e) {
!this._isInvalid && this._isRelative && (this._path = [], a.call(this, e, 'relative path start'));
},
get search() {
return this._isInvalid || !this._query || '?' == this._query ? '' : this._query;
},
set search(e) {
!this._isInvalid && this._isRelative && (this._query = '?', '?' == e[0] && (e = e.slice(1)), a.call(this, e, 'query'));
},
get hash() {
return this._isInvalid || !this._fragment || '#' == this._fragment ? '' : this._fragment;
},
set hash(e) {
this._isInvalid || (this._fragment = '#', '#' == e[0] && (e = e.slice(1)), a.call(this, e, 'fragment'));
},
get origin() {
var e;
if (this._isInvalid || !this._scheme)
return '';
switch (this._scheme) {
case 'data':
case 'file':
case 'javascript':
case 'mailto':
return 'null';
}
return e = this.host, e ? this._scheme + '://' + e : '';
}
};
var w = e.URL;
w && (c.createObjectURL = function (e) {
return w.createObjectURL.apply(w, arguments);
}, c.revokeObjectURL = function (e) {
w.revokeObjectURL(e);
}), e.URL = c;
}
}(self), 'undefined' == typeof WeakMap && !function () {
var e = Object.defineProperty, t = Date.now() % 1000000000, n = function () {
this.name = '__st' + (1000000000 * Math.random() >>> 0) + (t++ + '__');
};
n.prototype = {
set: function (t, n) {
var o = t[this.name];
return o && o[0] === t ? o[1] = n : e(t, this.name, {
value: [
t,
n
],
writable: !0
}), this;
},
get: function (e) {
var t;
return (t = e[this.name]) && t[0] === e ? t[1] : void 0;
},
'delete': function (e) {
var t = e[this.name];
return t && t[0] === e ? (t[0] = t[1] = void 0, !0) : !1;
},
has: function (e) {
var t = e[this.name];
return t ? t[0] === e : !1;
}
}, window.WeakMap = n;
}(), function (e) {
function t(e) {
b.push(e), g || (g = !0, m(o));
}
function n(e) {
return window.ShadowDOMPolyfill && window.ShadowDOMPolyfill.wrapIfNeeded(e) || e;
}
function o() {
g = !1;
var e = b;
b = [], e.sort(function (e, t) {
return e.uid_ - t.uid_;
});
var t = !1;
e.forEach(function (e) {
var n = e.takeRecords();
r(e), n.length && (e.callback_(n, e), t = !0);
}), t && o();
}
function r(e) {
e.nodes_.forEach(function (t) {
var n = v.get(t);
n && n.forEach(function (t) {
t.observer === e && t.removeTransientObservers();
});
});
}
function i(e, t) {
for (var n = e; n; n = n.parentNode) {
var o = v.get(n);
if (o)
for (var r = 0; r < o.length; r++) {
var i = o[r], a = i.options;
if (n === e || a.subtree) {
var s = t(a);
s && i.enqueue(s);
}
}
}
}
function a(e) {
this.callback_ = e, this.nodes_ = [], this.records_ = [], this.uid_ = ++y;
}
function s(e, t) {
this.type = e, this.target = t, this.addedNodes = [], this.removedNodes = [], this.previousSibling = null, this.nextSibling = null, this.attributeName = null, this.attributeNamespace = null, this.oldValue = null;
}
function c(e) {
var t = new s(e.type, e.target);
return t.addedNodes = e.addedNodes.slice(), t.removedNodes = e.removedNodes.slice(), t.previousSibling = e.previousSibling, t.nextSibling = e.nextSibling, t.attributeName = e.attributeName, t.attributeNamespace = e.attributeNamespace, t.oldValue = e.oldValue, t;
}
function d(e, t) {
return E = new s(e, t);
}
function l(e) {
return L ? L : (L = c(E), L.oldValue = e, L);
}
function u() {
E = L = void 0;
}
function h(e) {
return e === L || e === E;
}
function f(e, t) {
return e === t ? e : L && h(e) ? L : null;
}
function p(e, t, n) {
this.observer = e, this.target = t, this.options = n, this.transientObservedNodes = [];
}
if (!e.JsMutationObserver) {
var m, v = new WeakMap();
if (/Trident|Edge/.test(navigator.userAgent))
m = setTimeout;
else if (window.setImmediate)
m = window.setImmediate;
else {
var w = [], _ = String(Math.random());
window.addEventListener('message', function (e) {
if (e.data === _) {
var t = w;
w = [], t.forEach(function (e) {
e();
});
}
}), m = function (e) {
w.push(e), window.postMessage(_, '*');
};
}
var g = !1, b = [], y = 0;
a.prototype = {
observe: function (e, t) {
if (e = n(e), !t.childList && !t.attributes && !t.characterData || t.attributeOldValue && !t.attributes || t.attributeFilter && t.attributeFilter.length && !t.attributes || t.characterDataOldValue && !t.characterData)
throw new SyntaxError();
var o = v.get(e);
o || v.set(e, o = []);
for (var r, i = 0; i < o.length; i++)
if (o[i].observer === this) {
r = o[i], r.removeListeners(), r.options = t;
break;
}
r || (r = new p(this, e, t), o.push(r), this.nodes_.push(e)), r.addListeners();
},
disconnect: function () {
this.nodes_.forEach(function (e) {
for (var t = v.get(e), n = 0; n < t.length; n++) {
var o = t[n];
if (o.observer === this) {
o.removeListeners(), t.splice(n, 1);
break;
}
}
}, this), this.records_ = [];
},
takeRecords: function () {
var e = this.records_;
return this.records_ = [], e;
}
};
var E, L;
p.prototype = {
enqueue: function (e) {
var n = this.observer.records_, o = n.length;
if (n.length > 0) {
var r = n[o - 1], i = f(r, e);
if (i)
return void (n[o - 1] = i);
} else
t(this.observer);
n[o] = e;
},
addListeners: function () {
this.addListeners_(this.target);
},
addListeners_: function (e) {
var t = this.options;
t.attributes && e.addEventListener('DOMAttrModified', this, !0), t.characterData && e.addEventListener('DOMCharacterDataModified', this, !0), t.childList && e.addEventListener('DOMNodeInserted', this, !0), (t.childList || t.subtree) && e.addEventListener('DOMNodeRemoved', this, !0);
},
removeListeners: function () {
this.removeListeners_(this.target);
},
removeListeners_: function (e) {
var t = this.options;
t.attributes && e.removeEventListener('DOMAttrModified', this, !0), t.characterData && e.removeEventListener('DOMCharacterDataModified', this, !0), t.childList && e.removeEventListener('DOMNodeInserted', this, !0), (t.childList || t.subtree) && e.removeEventListener('DOMNodeRemoved', this, !0);
},
addTransientObserver: function (e) {
if (e !== this.target) {
this.addListeners_(e), this.transientObservedNodes.push(e);
var t = v.get(e);
t || v.set(e, t = []), t.push(this);
}
},
removeTransientObservers: function () {
var e = this.transientObservedNodes;
this.transientObservedNodes = [], e.forEach(function (e) {
this.removeListeners_(e);
for (var t = v.get(e), n = 0; n < t.length; n++)
if (t[n] === this) {
t.splice(n, 1);
break;
}
}, this);
},
handleEvent: function (e) {
switch (e.stopImmediatePropagation(), e.type) {
case 'DOMAttrModified':
var t = e.attrName, n = e.relatedNode.namespaceURI, o = e.target, r = new d('attributes', o);
r.attributeName = t, r.attributeNamespace = n;
var a = e.attrChange === MutationEvent.ADDITION ? null : e.prevValue;
i(o, function (e) {
return !e.attributes || e.attributeFilter && e.attributeFilter.length && -1 === e.attributeFilter.indexOf(t) && -1 === e.attributeFilter.indexOf(n) ? void 0 : e.attributeOldValue ? l(a) : r;
});
break;
case 'DOMCharacterDataModified':
var o = e.target, r = d('characterData', o), a = e.prevValue;
i(o, function (e) {
return e.characterData ? e.characterDataOldValue ? l(a) : r : void 0;
});
break;
case 'DOMNodeRemoved':
this.addTransientObserver(e.target);
case 'DOMNodeInserted':
var s, c, h = e.target;
'DOMNodeInserted' === e.type ? (s = [h], c = []) : (s = [], c = [h]);
var f = h.previousSibling, p = h.nextSibling, r = d('childList', e.target.parentNode);
r.addedNodes = s, r.removedNodes = c, r.previousSibling = f, r.nextSibling = p, i(e.relatedNode, function (e) {
return e.childList ? r : void 0;
});
}
u();
}
}, e.JsMutationObserver = a, e.MutationObserver || (e.MutationObserver = a, a._isPolyfilled = !0);
}
}(self), function () {
function e(e) {
switch (e) {
case '&':
return '&amp;';
case '<':
return '&lt;';
case '>':
return '&gt;';
case '\xA0':
return '&nbsp;';
}
}
function t(t) {
return t.replace(u, e);
}
var n = 'undefined' == typeof HTMLTemplateElement, o = function () {
if (!n) {
var e = document.createDocumentFragment(), t = document.createElement('template');
e.appendChild(t), t.content.appendChild(document.createElement('div'));
var o = e.cloneNode(!0);
return 0 === o.firstChild.content.childNodes.length;
}
}(), r = 'template', i = function () {
};
if (n) {
var a = document.implementation.createHTMLDocument('template'), s = !0, c = document.createElement('style');
c.textContent = r + '{display:none;}';
var d = document.head;
d.insertBefore(c, d.firstElementChild), i.prototype = Object.create(HTMLElement.prototype), i.decorate = function (e) {
if (!e.content) {
e.content = a.createDocumentFragment();
for (var n; n = e.firstChild;)
e.content.appendChild(n);
if (s)
try {
Object.defineProperty(e, 'innerHTML', {
get: function () {
for (var e = '', n = this.content.firstChild; n; n = n.nextSibling)
e += n.outerHTML || t(n.data);
return e;
},
set: function (e) {
for (a.body.innerHTML = e, i.bootstrap(a); this.content.firstChild;)
this.content.removeChild(this.content.firstChild);
for (; a.body.firstChild;)
this.content.appendChild(a.body.firstChild);
},
configurable: !0
}), e.cloneNode = function (e) {
return i.cloneNode(this, e);
};
} catch (o) {
s = !1;
}
i.bootstrap(e.content);
}
}, i.bootstrap = function (e) {
for (var t, n = e.querySelectorAll(r), o = 0, a = n.length; a > o && (t = n[o]); o++)
i.decorate(t);
}, document.addEventListener('DOMContentLoaded', function () {
i.bootstrap(document);
});
var l = document.createElement;
document.createElement = function () {
'use strict';
var e = l.apply(document, arguments);
return 'template' == e.localName && i.decorate(e), e;
};
var u = /[&\u00A0<>]/g;
}
if (n || o) {
var h = Node.prototype.cloneNode;
i.cloneNode = function (e, t) {
var n = h.call(e);
return this.decorate && this.decorate(n), t && (n.content.appendChild(h.call(e.content, !0)), this.fixClonedDom(n.content, e.content)), n;
}, i.fixClonedDom = function (e, t) {
for (var n, o, i = t.querySelectorAll(r), a = e.querySelectorAll(r), s = 0, c = a.length; c > s; s++)
o = i[s], n = a[s], this.decorate && this.decorate(o), n.parentNode.replaceChild(o.cloneNode(!0), n);
};
var f = document.importNode;
Node.prototype.cloneNode = function (e) {
var t = h.call(this, e);
return e && i.fixClonedDom(t, this), t;
}, document.importNode = function (e, t) {
if (e.localName === r)
return i.cloneNode(e, t);
var n = f.call(document, e, t);
return t && i.fixClonedDom(n, e), n;
}, o && (HTMLTemplateElement.prototype.cloneNode = function (e) {
return i.cloneNode(this, e);
});
}
n && (HTMLTemplateElement = i);
}(), function (e) {
'use strict';
if (!window.performance) {
var t = Date.now();
window.performance = {
now: function () {
return Date.now() - t;
}
};
}
window.requestAnimationFrame || (window.requestAnimationFrame = function () {
var e = window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;
return e ? function (t) {
return e(function () {
t(performance.now());
});
} : function (e) {
return window.setTimeout(e, 1000 / 60);
};
}()), window.cancelAnimationFrame || (window.cancelAnimationFrame = function () {
return window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || function (e) {
clearTimeout(e);
};
}());
var n = function () {
var e = document.createEvent('Event');
return e.initEvent('foo', !0, !0), e.preventDefault(), e.defaultPrevented;
}();
if (!n) {
var o = Event.prototype.preventDefault;
Event.prototype.preventDefault = function () {
this.cancelable && (o.call(this), Object.defineProperty(this, 'defaultPrevented', {
get: function () {
return !0;
},
configurable: !0
}));
};
}
var r = /Trident/.test(navigator.userAgent);
if ((!window.CustomEvent || r && 'function' != typeof window.CustomEvent) && (window.CustomEvent = function (e, t) {
t = t || {};
var n = document.createEvent('CustomEvent');
return n.initCustomEvent(e, Boolean(t.bubbles), Boolean(t.cancelable), t.detail), n;
}, window.CustomEvent.prototype = window.Event.prototype), !window.Event || r && 'function' != typeof window.Event) {
var i = window.Event;
window.Event = function (e, t) {
t = t || {};
var n = document.createEvent('Event');
return n.initEvent(e, Boolean(t.bubbles), Boolean(t.cancelable)), n;
}, window.Event.prototype = i.prototype;
}
}(window.WebComponents), window.HTMLImports = window.HTMLImports || { flags: {} }, function (e) {
function t(e, t) {
t = t || p, o(function () {
i(e, t);
}, t);
}
function n(e) {
return 'complete' === e.readyState || e.readyState === w;
}
function o(e, t) {
if (n(t))
e && e();
else {
var r = function () {
'complete' !== t.readyState && t.readyState !== w || (t.removeEventListener(_, r), o(e, t));
};
t.addEventListener(_, r);
}
}
function r(e) {
e.target.__loaded = !0;
}
function i(e, t) {
function n() {
c == d && e && e({
allImports: s,
loadedImports: l,
errorImports: u
});
}
function o(e) {
r(e), l.push(this), c++, n();
}
function i(e) {
u.push(this), c++, n();
}
var s = t.querySelectorAll('link[rel=import]'), c = 0, d = s.length, l = [], u = [];
if (d)
for (var h, f = 0; d > f && (h = s[f]); f++)
a(h) ? (l.push(this), c++, n()) : (h.addEventListener('load', o), h.addEventListener('error', i));
else
n();
}
function a(e) {
return u ? e.__loaded || e['import'] && 'loading' !== e['import'].readyState : e.__importParsed;
}
function s(e) {
for (var t, n = 0, o = e.length; o > n && (t = e[n]); n++)
c(t) && d(t);
}
function c(e) {
return 'link' === e.localName && 'import' === e.rel;
}
function d(e) {
var t = e['import'];
t ? r({ target: e }) : (e.addEventListener('load', r), e.addEventListener('error', r));
}
var l = 'import', u = Boolean(l in document.createElement('link')), h = Boolean(window.ShadowDOMPolyfill), f = function (e) {
return h ? window.ShadowDOMPolyfill.wrapIfNeeded(e) : e;
}, p = f(document), m = {
get: function () {
var e = window.HTMLImports.currentScript || document.currentScript || ('complete' !== document.readyState ? document.scripts[document.scripts.length - 1] : null);
return f(e);
},
configurable: !0
};
Object.defineProperty(document, '_currentScript', m), Object.defineProperty(p, '_currentScript', m);
var v = /Trident/.test(navigator.userAgent), w = v ? 'complete' : 'interactive', _ = 'readystatechange';
u && (new MutationObserver(function (e) {
for (var t, n = 0, o = e.length; o > n && (t = e[n]); n++)
t.addedNodes && s(t.addedNodes);
}).observe(document.head, { childList: !0 }), function () {
if ('loading' === document.readyState)
for (var e, t = document.querySelectorAll('link[rel=import]'), n = 0, o = t.length; o > n && (e = t[n]); n++)
d(e);
}()), t(function (e) {
window.HTMLImports.ready = !0, window.HTMLImports.readyTime = new Date().getTime();
var t = p.createEvent('CustomEvent');
t.initCustomEvent('HTMLImportsLoaded', !0, !0, e), p.dispatchEvent(t);
}), e.IMPORT_LINK_TYPE = l, e.useNative = u, e.rootDocument = p, e.whenReady = t, e.isIE = v;
}(window.HTMLImports), function (e) {
var t = [], n = function (e) {
t.push(e);
}, o = function () {
t.forEach(function (t) {
t(e);
});
};
e.addModule = n, e.initializeModules = o;
}(window.HTMLImports), window.HTMLImports.addModule(function (e) {
var t = /(url\()([^)]*)(\))/g, n = /(@import[\s]+(?!url\())([^;]*)(;)/g, o = {
resolveUrlsInStyle: function (e, t) {
var n = e.ownerDocument, o = n.createElement('a');
return e.textContent = this.resolveUrlsInCssText(e.textContent, t, o), e;
},
resolveUrlsInCssText: function (e, o, r) {
var i = this.replaceUrls(e, r, o, t);
return i = this.replaceUrls(i, r, o, n);
},
replaceUrls: function (e, t, n, o) {
return e.replace(o, function (e, o, r, i) {
var a = r.replace(/["']/g, '');
return n && (a = new URL(a, n).href), t.href = a, a = t.href, o + '\'' + a + '\'' + i;
});
}
};
e.path = o;
}), window.HTMLImports.addModule(function (e) {
var t = {
async: !0,
ok: function (e) {
return e.status >= 200 && e.status < 300 || 304 === e.status || 0 === e.status;
},
load: function (n, o, r) {
var i = new XMLHttpRequest();
return (e.flags.debug || e.flags.bust) && (n += '?' + Math.random()), i.open('GET', n, t.async), i.addEventListener('readystatechange', function (e) {
if (4 === i.readyState) {
var n = null;
try {
var a = i.getResponseHeader('Location');
a && (n = '/' === a.substr(0, 1) ? location.origin + a : a);
} catch (e) {
console.error(e.message);
}
o.call(r, !t.ok(i) && i, i.response || i.responseText, n);
}
}), i.send(), i;
},
loadDocument: function (e, t, n) {
this.load(e, t, n).responseType = 'document';
}
};
e.xhr = t;
}), window.HTMLImports.addModule(function (e) {
var t = e.xhr, n = e.flags, o = function (e, t) {
this.cache = {}, this.onload = e, this.oncomplete = t, this.inflight = 0, this.pending = {};
};
o.prototype = {
addNodes: function (e) {
this.inflight += e.length;
for (var t, n = 0, o = e.length; o > n && (t = e[n]); n++)
this.require(t);
this.checkDone();
},
addNode: function (e) {
this.inflight++, this.require(e), this.checkDone();
},
require: function (e) {
var t = e.src || e.href;
e.__nodeUrl = t, this.dedupe(t, e) || this.fetch(t, e);
},
dedupe: function (e, t) {
if (this.pending[e])
return this.pending[e].push(t), !0;
return this.cache[e] ? (this.onload(e, t, this.cache[e]), this.tail(), !0) : (this.pending[e] = [t], !1);
},
fetch: function (e, o) {
if (n.load && console.log('fetch', e, o), e)
if (e.match(/^data:/)) {
var r = e.split(','), i = r[0], a = r[1];
a = i.indexOf(';base64') > -1 ? atob(a) : decodeURIComponent(a), setTimeout(function () {
this.receive(e, o, null, a);
}.bind(this), 0);
} else {
var s = function (t, n, r) {
this.receive(e, o, t, n, r);
}.bind(this);
t.load(e, s);
}
else
setTimeout(function () {
this.receive(e, o, { error: 'href must be specified' }, null);
}.bind(this), 0);
},
receive: function (e, t, n, o, r) {
this.cache[e] = o;
for (var i, a = this.pending[e], s = 0, c = a.length; c > s && (i = a[s]); s++)
this.onload(e, i, o, n, r), this.tail();
this.pending[e] = null;
},
tail: function () {
--this.inflight, this.checkDone();
},
checkDone: function () {
this.inflight || this.oncomplete();
}
}, e.Loader = o;
}), window.HTMLImports.addModule(function (e) {
var t = function (e) {
this.addCallback = e, this.mo = new MutationObserver(this.handler.bind(this));
};
t.prototype = {
handler: function (e) {
for (var t, n = 0, o = e.length; o > n && (t = e[n]); n++)
'childList' === t.type && t.addedNodes.length && this.addedNodes(t.addedNodes);
},
addedNodes: function (e) {
this.addCallback && this.addCallback(e);
for (var t, n = 0, o = e.length; o > n && (t = e[n]); n++)
t.children && t.children.length && this.addedNodes(t.children);
},
observe: function (e) {
this.mo.observe(e, {
childList: !0,
subtree: !0
});
}
}, e.Observer = t;
}), window.HTMLImports.addModule(function (e) {
function t(e) {
return 'link' === e.localName && e.rel === l;
}
function n(e) {
var t = o(e);
return 'data:text/javascript;charset=utf-8,' + encodeURIComponent(t);
}
function o(e) {
return e.textContent + r(e);
}
function r(e) {
var t = e.ownerDocument;
t.__importedScripts = t.__importedScripts || 0;
var n = e.ownerDocument.baseURI, o = t.__importedScripts ? '-' + t.__importedScripts : '';
return t.__importedScripts++, '\n//# sourceURL=' + n + o + '.js\n';
}
function i(e) {
var t = e.ownerDocument.createElement('style');
return t.textContent = e.textContent, a.resolveUrlsInStyle(t), t;
}
var a = e.path, s = e.rootDocument, c = e.flags, d = e.isIE, l = e.IMPORT_LINK_TYPE, u = 'link[rel=' + l + ']', h = {
documentSelectors: u,
importsSelectors: [
u,
'link[rel=stylesheet]:not([type])',
'style:not([type])',
'script:not([type])',
'script[type="application/javascript"]',
'script[type="text/javascript"]'
].join(','),
map: {
link: 'parseLink',
script: 'parseScript',
style: 'parseStyle'
},
dynamicElements: [],
parseNext: function () {
var e = this.nextToParse();
e && this.parse(e);
},
parse: function (e) {
if (this.isParsed(e))
return void (c.parse && console.log('[%s] is already parsed', e.localName));
var t = this[this.map[e.localName]];
t && (this.markParsing(e), t.call(this, e));
},
parseDynamic: function (e, t) {
this.dynamicElements.push(e), t || this.parseNext();
},
markParsing: function (e) {
c.parse && console.log('parsing', e), this.parsingElement = e;
},
markParsingComplete: function (e) {
e.__importParsed = !0, this.markDynamicParsingComplete(e), e.__importElement && (e.__importElement.__importParsed = !0, this.markDynamicParsingComplete(e.__importElement)), this.parsingElement = null, c.parse && console.log('completed', e);
},
markDynamicParsingComplete: function (e) {
var t = this.dynamicElements.indexOf(e);
t >= 0 && this.dynamicElements.splice(t, 1);
},
parseImport: function (e) {
if (e['import'] = e.__doc, window.HTMLImports.__importsParsingHook && window.HTMLImports.__importsParsingHook(e), e['import'] && (e['import'].__importParsed = !0), this.markParsingComplete(e), e.__resource && !e.__error ? e.dispatchEvent(new CustomEvent('load', { bubbles: !1 })) : e.dispatchEvent(new CustomEvent('error', { bubbles: !1 })), e.__pending)
for (var t; e.__pending.length;)
t = e.__pending.shift(), t && t({ target: e });
this.parseNext();
},
parseLink: function (e) {
t(e) ? this.parseImport(e) : (e.href = e.href, this.parseGeneric(e));
},
parseStyle: function (e) {
var t = e;
e = i(e), t.__appliedElement = e, e.__importElement = t, this.parseGeneric(e);
},
parseGeneric: function (e) {
this.trackElement(e), this.addElementToDocument(e);
},
rootImportForElement: function (e) {
for (var t = e; t.ownerDocument.__importLink;)
t = t.ownerDocument.__importLink;
return t;
},
addElementToDocument: function (e) {
var t = this.rootImportForElement(e.__importElement || e);
t.parentNode.insertBefore(e, t);
},
trackElement: function (e, t) {
var n = this, o = function (r) {
e.removeEventListener('load', o), e.removeEventListener('error', o), t && t(r), n.markParsingComplete(e), n.parseNext();
};
if (e.addEventListener('load', o), e.addEventListener('error', o), d && 'style' === e.localName) {
var r = !1;
if (-1 == e.textContent.indexOf('@import'))
r = !0;
else if (e.sheet) {
r = !0;
for (var i, a = e.sheet.cssRules, s = a ? a.length : 0, c = 0; s > c && (i = a[c]); c++)
i.type === CSSRule.IMPORT_RULE && (r = r && Boolean(i.styleSheet));
}
r && setTimeout(function () {
e.dispatchEvent(new CustomEvent('load', { bubbles: !1 }));
});
}
},
parseScript: function (t) {
var o = document.createElement('script');
o.__importElement = t, o.src = t.src ? t.src : n(t), e.currentScript = t, this.trackElement(o, function (t) {
o.parentNode && o.parentNode.removeChild(o), e.currentScript = null;
}), this.addElementToDocument(o);
},
nextToParse: function () {
return this._mayParse = [], !this.parsingElement && (this.nextToParseInDoc(s) || this.nextToParseDynamic());
},
nextToParseInDoc: function (e, n) {
if (e && this._mayParse.indexOf(e) < 0) {
this._mayParse.push(e);
for (var o, r = e.querySelectorAll(this.parseSelectorsForNode(e)), i = 0, a = r.length; a > i && (o = r[i]); i++)
if (!this.isParsed(o))
return this.hasResource(o) ? t(o) ? this.nextToParseInDoc(o.__doc, o) : o : void 0;
}
return n;
},
nextToParseDynamic: function () {
return this.dynamicElements[0];
},
parseSelectorsForNode: function (e) {
var t = e.ownerDocument || e;
return t === s ? this.documentSelectors : this.importsSelectors;
},
isParsed: function (e) {
return e.__importParsed;
},
needsDynamicParsing: function (e) {
return this.dynamicElements.indexOf(e) >= 0;
},
hasResource: function (e) {
return !t(e) || void 0 !== e.__doc;
}
};
e.parser = h, e.IMPORT_SELECTOR = u;
}), window.HTMLImports.addModule(function (e) {
function t(e) {
return n(e, a);
}
function n(e, t) {
return 'link' === e.localName && e.getAttribute('rel') === t;
}
function o(e) {
return !!Object.getOwnPropertyDescriptor(e, 'baseURI');
}
function r(e, t) {
var n = document.implementation.createHTMLDocument(a);
n._URL = t;
var r = n.createElement('base');
r.setAttribute('href', t), n.baseURI || o(n) || Object.defineProperty(n, 'baseURI', { value: t });
var i = n.createElement('meta');
return i.setAttribute('charset', 'utf-8'), n.head.appendChild(i), n.head.appendChild(r), n.body.innerHTML = e, window.HTMLTemplateElement && HTMLTemplateElement.bootstrap && HTMLTemplateElement.bootstrap(n), n;
}
var i = e.flags, a = e.IMPORT_LINK_TYPE, s = e.IMPORT_SELECTOR, c = e.rootDocument, d = e.Loader, l = e.Observer, u = e.parser, h = {
documents: {},
documentPreloadSelectors: s,
importsPreloadSelectors: [s].join(','),
loadNode: function (e) {
f.addNode(e);
},
loadSubtree: function (e) {
var t = this.marshalNodes(e);
f.addNodes(t);
},
marshalNodes: function (e) {
return e.querySelectorAll(this.loadSelectorsForNode(e));
},
loadSelectorsForNode: function (e) {
var t = e.ownerDocument || e;
return t === c ? this.documentPreloadSelectors : this.importsPreloadSelectors;
},
loaded: function (e, n, o, a, s) {
if (i.load && console.log('loaded', e, n), n.__resource = o, n.__error = a, t(n)) {
var c = this.documents[e];
void 0 === c && (c = a ? null : r(o, s || e), c && (c.__importLink = n, this.bootDocument(c)), this.documents[e] = c), n.__doc = c;
}
u.parseNext();
},
bootDocument: function (e) {
this.loadSubtree(e), this.observer.observe(e), u.parseNext();
},
loadedAll: function () {
u.parseNext();
}
}, f = new d(h.loaded.bind(h), h.loadedAll.bind(h));
if (h.observer = new l(), !document.baseURI) {
var p = {
get: function () {
var e = document.querySelector('base');
return e ? e.href : window.location.href;
},
configurable: !0
};
Object.defineProperty(document, 'baseURI', p), Object.defineProperty(c, 'baseURI', p);
}
e.importer = h, e.importLoader = f;
}), window.HTMLImports.addModule(function (e) {
var t = e.parser, n = e.importer, o = {
added: function (e) {
for (var o, r, i, a, s = 0, c = e.length; c > s && (a = e[s]); s++)
o || (o = a.ownerDocument, r = t.isParsed(o)), i = this.shouldLoadNode(a), i && n.loadNode(a), this.shouldParseNode(a) && r && t.parseDynamic(a, i);
},
shouldLoadNode: function (e) {
return 1 === e.nodeType && r.call(e, n.loadSelectorsForNode(e));
},
shouldParseNode: function (e) {
return 1 === e.nodeType && r.call(e, t.parseSelectorsForNode(e));
}
};
n.observer.addCallback = o.added.bind(o);
var r = HTMLElement.prototype.matches || HTMLElement.prototype.matchesSelector || HTMLElement.prototype.webkitMatchesSelector || HTMLElement.prototype.mozMatchesSelector || HTMLElement.prototype.msMatchesSelector;
}), function (e) {
function t() {
window.HTMLImports.importer.bootDocument(o);
}
var n = e.initializeModules;
e.isIE;
if (!e.useNative) {
n();
var o = e.rootDocument;
'complete' === document.readyState || 'interactive' === document.readyState && !window.attachEvent ? t() : document.addEventListener('DOMContentLoaded', t);
}
}(window.HTMLImports), window.CustomElements = window.CustomElements || { flags: {} }, function (e) {
var t = e.flags, n = [], o = function (e) {
n.push(e);
}, r = function () {
n.forEach(function (t) {
t(e);
});
};
e.addModule = o, e.initializeModules = r, e.hasNative = Boolean(document.registerElement), e.isIE = /Trident/.test(navigator.userAgent), e.useNative = !t.register && e.hasNative && !window.ShadowDOMPolyfill && (!window.HTMLImports || window.HTMLImports.useNative);
}(window.CustomElements), window.CustomElements.addModule(function (e) {
function t(e, t) {
n(e, function (e) {
return t(e) ? !0 : void o(e, t);
}), o(e, t);
}
function n(e, t, o) {
var r = e.firstElementChild;
if (!r)
for (r = e.firstChild; r && r.nodeType !== Node.ELEMENT_NODE;)
r = r.nextSibling;
for (; r;)
t(r, o) !== !0 && n(r, t, o), r = r.nextElementSibling;
return null;
}
function o(e, n) {
for (var o = e.shadowRoot; o;)
t(o, n), o = o.olderShadowRoot;
}
function r(e, t) {
i(e, t, []);
}
function i(e, t, n) {
if (e = window.wrap(e), !(n.indexOf(e) >= 0)) {
n.push(e);
for (var o, r = e.querySelectorAll('link[rel=' + a + ']'), s = 0, c = r.length; c > s && (o = r[s]); s++)
o['import'] && i(o['import'], t, n);
t(e);
}
}
var a = window.HTMLImports ? window.HTMLImports.IMPORT_LINK_TYPE : 'none';
e.forDocumentTree = r, e.forSubtree = t;
}), window.CustomElements.addModule(function (e) {
function t(e, t) {
return n(e, t) || o(e, t);
}
function n(t, n) {
return e.upgrade(t, n) ? !0 : void (n && a(t));
}
function o(e, t) {
g(e, function (e) {
return n(e, t) ? !0 : void 0;
});
}
function r(e) {
L.push(e), E || (E = !0, setTimeout(i));
}
function i() {
E = !1;
for (var e, t = L, n = 0, o = t.length; o > n && (e = t[n]); n++)
e();
L = [];
}
function a(e) {
y ? r(function () {
s(e);
}) : s(e);
}
function s(e) {
e.__upgraded__ && !e.__attached && (e.__attached = !0, e.attachedCallback && e.attachedCallback());
}
function c(e) {
d(e), g(e, function (e) {
d(e);
});
}
function d(e) {
y ? r(function () {
l(e);
}) : l(e);
}
function l(e) {
e.__upgraded__ && e.__attached && (e.__attached = !1, e.detachedCallback && e.detachedCallback());
}
function u(e) {
for (var t = e, n = window.wrap(document); t;) {
if (t == n)
return !0;
t = t.parentNode || t.nodeType === Node.DOCUMENT_FRAGMENT_NODE && t.host;
}
}
function h(e) {
if (e.shadowRoot && !e.shadowRoot.__watched) {
_.dom && console.log('watching shadow-root for: ', e.localName);
for (var t = e.shadowRoot; t;)
m(t), t = t.olderShadowRoot;
}
}
function f(e, n) {
if (_.dom) {
var o = n[0];
if (o && 'childList' === o.type && o.addedNodes && o.addedNodes) {
for (var r = o.addedNodes[0]; r && r !== document && !r.host;)
r = r.parentNode;
var i = r && (r.URL || r._URL || r.host && r.host.localName) || '';
i = i.split('/?').shift().split('/').pop();
}
console.group('mutations (%d) [%s]', n.length, i || '');
}
var a = u(e);
n.forEach(function (e) {
'childList' === e.type && (N(e.addedNodes, function (e) {
e.localName && t(e, a);
}), N(e.removedNodes, function (e) {
e.localName && c(e);
}));
}), _.dom && console.groupEnd();
}
function p(e) {
for (e = window.wrap(e), e || (e = window.wrap(document)); e.parentNode;)
e = e.parentNode;
var t = e.__observer;
t && (f(e, t.takeRecords()), i());
}
function m(e) {
if (!e.__observer) {
var t = new MutationObserver(f.bind(this, e));
t.observe(e, {
childList: !0,
subtree: !0
}), e.__observer = t;
}
}
function v(e) {
e = window.wrap(e), _.dom && console.group('upgradeDocument: ', e.baseURI.split('/').pop());
var n = e === window.wrap(document);
t(e, n), m(e), _.dom && console.groupEnd();
}
function w(e) {
b(e, v);
}
var _ = e.flags, g = e.forSubtree, b = e.forDocumentTree, y = window.MutationObserver._isPolyfilled && _['throttle-attached'];
e.hasPolyfillMutations = y, e.hasThrottledAttached = y;
var E = !1, L = [], N = Array.prototype.forEach.call.bind(Array.prototype.forEach), M = Element.prototype.createShadowRoot;
M && (Element.prototype.createShadowRoot = function () {
var e = M.call(this);
return window.CustomElements.watchShadow(this), e;
}), e.watchShadow = h, e.upgradeDocumentTree = w, e.upgradeDocument = v, e.upgradeSubtree = o, e.upgradeAll = t, e.attached = a, e.takeRecords = p;
}), window.CustomElements.addModule(function (e) {
function t(t, o) {
if ('template' === t.localName && window.HTMLTemplateElement && HTMLTemplateElement.decorate && HTMLTemplateElement.decorate(t), !t.__upgraded__ && t.nodeType === Node.ELEMENT_NODE) {
var r = t.getAttribute('is'), i = e.getRegisteredDefinition(t.localName) || e.getRegisteredDefinition(r);
if (i && (r && i.tag == t.localName || !r && !i['extends']))
return n(t, i, o);
}
}
function n(t, n, r) {
return a.upgrade && console.group('upgrade:', t.localName), n.is && t.setAttribute('is', n.is), o(t, n), t.__upgraded__ = !0, i(t), r && e.attached(t), e.upgradeSubtree(t, r), a.upgrade && console.groupEnd(), t;
}
function o(e, t) {
Object.__proto__ ? e.__proto__ = t.prototype : (r(e, t.prototype, t['native']), e.__proto__ = t.prototype);
}
function r(e, t, n) {
for (var o = {}, r = t; r !== n && r !== HTMLElement.prototype;) {
for (var i, a = Object.getOwnPropertyNames(r), s = 0; i = a[s]; s++)
o[i] || (Object.defineProperty(e, i, Object.getOwnPropertyDescriptor(r, i)), o[i] = 1);
r = Object.getPrototypeOf(r);
}
}
function i(e) {
e.createdCallback && e.createdCallback();
}
var a = e.flags;
e.upgrade = t, e.upgradeWithDefinition = n, e.implementPrototype = o;
}), window.CustomElements.addModule(function (e) {
function t(t, o) {
var c = o || {};
if (!t)
throw new Error('document.registerElement: first argument `name` must not be empty');
if (t.indexOf('-') < 0)
throw new Error('document.registerElement: first argument (\'name\') must contain a dash (\'-\'). Argument provided was \'' + String(t) + '\'.');
if (r(t))
throw new Error('Failed to execute \'registerElement\' on \'Document\': Registration failed for type \'' + String(t) + '\'. The type name is invalid.');
if (d(t))
throw new Error('DuplicateDefinitionError: a type with name \'' + String(t) + '\' is already registered');
return c.prototype || (c.prototype = Object.create(HTMLElement.prototype)), c.__name = t.toLowerCase(), c.lifecycle = c.lifecycle || {}, c.ancestry = i(c['extends']), a(c), s(c), n(c.prototype), l(c.__name, c), c.ctor = u(c), c.ctor.prototype = c.prototype, c.prototype.constructor = c.ctor, e.ready && w(document), c.ctor;
}
function n(e) {
if (!e.setAttribute._polyfilled) {
var t = e.setAttribute;
e.setAttribute = function (e, n) {
o.call(this, e, n, t);
};
var n = e.removeAttribute;
e.removeAttribute = function (e) {
o.call(this, e, null, n);
}, e.setAttribute._polyfilled = !0;
}
}
function o(e, t, n) {
e = e.toLowerCase();
var o = this.getAttribute(e);
n.apply(this, arguments);
var r = this.getAttribute(e);
this.attributeChangedCallback && r !== o && this.attributeChangedCallback(e, o, r);
}
function r(e) {
for (var t = 0; t < E.length; t++)
if (e === E[t])
return !0;
}
function i(e) {
var t = d(e);
return t ? i(t['extends']).concat([t]) : [];
}
function a(e) {
for (var t, n = e['extends'], o = 0; t = e.ancestry[o]; o++)
n = t.is && t.tag;
e.tag = n || e.__name, n && (e.is = e.__name);
}
function s(e) {
if (!Object.__proto__) {
var t = HTMLElement.prototype;
if (e.is) {
var n = document.createElement(e.tag);
t = Object.getPrototypeOf(n);
}
for (var o, r = e.prototype, i = !1; r;)
r == t && (i = !0), o = Object.getPrototypeOf(r), o && (r.__proto__ = o), r = o;
i || console.warn(e.tag + ' prototype not found in prototype chain for ' + e.is), e['native'] = t;
}
}
function c(e) {
return g(M(e.tag), e);
}
function d(e) {
return e ? L[e.toLowerCase()] : void 0;
}
function l(e, t) {
L[e] = t;
}
function u(e) {
return function () {
return c(e);
};
}
function h(e, t, n) {
return e === N ? f(t, n) : T(e, t);
}
function f(e, t) {
e && (e = e.toLowerCase()), t && (t = t.toLowerCase());
var n = d(t || e);
if (n) {
if (e == n.tag && t == n.is)
return new n.ctor();
if (!t && !n.is)
return new n.ctor();
}
var o;
return t ? (o = f(e), o.setAttribute('is', t), o) : (o = M(e), e.indexOf('-') >= 0 && b(o, HTMLElement), o);
}
function p(e, t) {
var n = e[t];
e[t] = function () {
var e = n.apply(this, arguments);
return _(e), e;
};
}
var m, v = e.isIE, w = e.upgradeDocumentTree, _ = e.upgradeAll, g = e.upgradeWithDefinition, b = e.implementPrototype, y = e.useNative, E = [
'annotation-xml',
'color-profile',
'font-face',
'font-face-src',
'font-face-uri',
'font-face-format',
'font-face-name',
'missing-glyph'
], L = {}, N = 'http://www.w3.org/1999/xhtml', M = document.createElement.bind(document), T = document.createElementNS.bind(document);
m = Object.__proto__ || y ? function (e, t) {
return e instanceof t;
} : function (e, t) {
if (e instanceof t)
return !0;
for (var n = e; n;) {
if (n === t.prototype)
return !0;
n = n.__proto__;
}
return !1;
}, p(Node.prototype, 'cloneNode'), p(document, 'importNode'), v && !function () {
var e = document.importNode;
document.importNode = function () {
var t = e.apply(document, arguments);
if (t.nodeType == t.DOCUMENT_FRAGMENT_NODE) {
var n = document.createDocumentFragment();
return n.appendChild(t), n;
}
return t;
};
}(), document.registerElement = t, document.createElement = f, document.createElementNS = h, e.registry = L, e['instanceof'] = m, e.reservedTagList = E, e.getRegisteredDefinition = d, document.register = document.registerElement;
}), function (e) {
function t() {
i(window.wrap(document)), window.CustomElements.ready = !0;
var e = window.requestAnimationFrame || function (e) {
setTimeout(e, 16);
};
e(function () {
setTimeout(function () {
window.CustomElements.readyTime = Date.now(), window.HTMLImports && (window.CustomElements.elapsed = window.CustomElements.readyTime - window.HTMLImports.readyTime), document.dispatchEvent(new CustomEvent('WebComponentsReady', { bubbles: !0 }));
});
});
}
var n = e.useNative, o = e.initializeModules;
e.isIE;
if (n) {
var r = function () {
};
e.watchShadow = r, e.upgrade = r, e.upgradeAll = r, e.upgradeDocumentTree = r, e.upgradeSubtree = r, e.takeRecords = r, e['instanceof'] = function (e, t) {
return e instanceof t;
};
} else
o();
var i = e.upgradeDocumentTree, a = e.upgradeDocument;
if (window.wrap || (window.ShadowDOMPolyfill ? (window.wrap = window.ShadowDOMPolyfill.wrapIfNeeded, window.unwrap = window.ShadowDOMPolyfill.unwrapIfNeeded) : window.wrap = window.unwrap = function (e) {
return e;
}), window.HTMLImports && (window.HTMLImports.__importsParsingHook = function (e) {
e['import'] && a(wrap(e['import']));
}), 'complete' === document.readyState || e.flags.eager)
t();
else if ('interactive' !== document.readyState || window.attachEvent || window.HTMLImports && !window.HTMLImports.ready) {
var s = window.HTMLImports && !window.HTMLImports.ready ? 'HTMLImportsLoaded' : 'DOMContentLoaded';
window.addEventListener(s, t);
} else
t();
}(window.CustomElements), function (e) {
var t = document.createElement('style');
t.textContent = 'body {transition: opacity ease-in 0.2s; } \nbody[unresolved] {opacity: 0; display: block; overflow: hidden; position: relative; } \n';
var n = document.querySelector('head');
n.insertBefore(t, n.firstChild);
}(window.WebComponents);
console.warn('This file is deprecated. Please use `iron-flex-layout/iron-flex-layout-classes.html`, and one of the specific dom-modules instead');
console.warn('This file is deprecated. Please use `iron-flex-layout/iron-flex-layout-classes.html`, and one of the specific dom-modules instead');
(function () {
function resolve() {
document.body.removeAttribute('unresolved');
}
if (window.WebComponents) {
addEventListener('WebComponentsReady', resolve);
} else {
if (document.readyState === 'interactive' || document.readyState === 'complete') {
resolve();
} else {
addEventListener('DOMContentLoaded', resolve);
}
}
}());
window.Polymer = {
Settings: function () {
var settings = window.Polymer || {};
var parts = location.search.slice(1).split('&');
for (var i = 0, o; i < parts.length && (o = parts[i]); i++) {
o = o.split('=');
o[0] && (settings[o[0]] = o[1] || true);
}
settings.wantShadow = settings.dom === 'shadow';
settings.hasShadow = Boolean(Element.prototype.createShadowRoot);
settings.nativeShadow = settings.hasShadow && !window.ShadowDOMPolyfill;
settings.useShadow = settings.wantShadow && settings.hasShadow;
settings.hasNativeImports = Boolean('import' in document.createElement('link'));
settings.useNativeImports = settings.hasNativeImports;
settings.useNativeCustomElements = !window.CustomElements || window.CustomElements.useNative;
settings.useNativeShadow = settings.useShadow && settings.nativeShadow;
settings.usePolyfillProto = !settings.useNativeCustomElements && !Object.__proto__;
return settings;
}()
};
(function () {
var userPolymer = window.Polymer;
window.Polymer = function (prototype) {
if (typeof prototype === 'function') {
prototype = prototype.prototype;
}
if (!prototype) {
prototype = {};
}
var factory = desugar(prototype);
prototype = factory.prototype;
var options = { prototype: prototype };
if (prototype.extends) {
options.extends = prototype.extends;
}
Polymer.telemetry._registrate(prototype);
document.registerElement(prototype.is, options);
return factory;
};
var desugar = function (prototype) {
var base = Polymer.Base;
if (prototype.extends) {
base = Polymer.Base._getExtendedPrototype(prototype.extends);
}
prototype = Polymer.Base.chainObject(prototype, base);
prototype.registerCallback();
return prototype.constructor;
};
if (userPolymer) {
for (var i in userPolymer) {
Polymer[i] = userPolymer[i];
}
}
Polymer.Class = desugar;
}());
Polymer.telemetry = {
registrations: [],
_regLog: function (prototype) {
console.log('[' + prototype.is + ']: registered');
},
_registrate: function (prototype) {
this.registrations.push(prototype);
Polymer.log && this._regLog(prototype);
},
dumpRegistrations: function () {
this.registrations.forEach(this._regLog);
}
};
Object.defineProperty(window, 'currentImport', {
enumerable: true,
configurable: true,
get: function () {
return (document._currentScript || document.currentScript).ownerDocument;
}
});
Polymer.RenderStatus = {
_ready: false,
_callbacks: [],
whenReady: function (cb) {
if (this._ready) {
cb();
} else {
this._callbacks.push(cb);
}
},
_makeReady: function () {
this._ready = true;
for (var i = 0; i < this._callbacks.length; i++) {
this._callbacks[i]();
}
this._callbacks = [];
},
_catchFirstRender: function () {
requestAnimationFrame(function () {
Polymer.RenderStatus._makeReady();
});
},
_afterNextRenderQueue: [],
_waitingNextRender: false,
afterNextRender: function (element, fn, args) {
this._watchNextRender();
this._afterNextRenderQueue.push([
element,
fn,
args
]);
},
_watchNextRender: function () {
if (!this._waitingNextRender) {
this._waitingNextRender = true;
var fn = function () {
Polymer.RenderStatus._flushNextRender();
};
if (!this._ready) {
this.whenReady(fn);
} else {
requestAnimationFrame(fn);
}
}
},
_flushNextRender: function () {
var self = this;
setTimeout(function () {
self._flushRenderCallbacks(self._afterNextRenderQueue);
self._afterNextRenderQueue = [];
self._waitingNextRender = false;
});
},
_flushRenderCallbacks: function (callbacks) {
for (var i = 0, h; i < callbacks.length; i++) {
h = callbacks[i];
h[1].apply(h[0], h[2] || Polymer.nar);
}
}
};
if (window.HTMLImports) {
HTMLImports.whenReady(function () {
Polymer.RenderStatus._catchFirstRender();
});
} else {
Polymer.RenderStatus._catchFirstRender();
}
Polymer.ImportStatus = Polymer.RenderStatus;
Polymer.ImportStatus.whenLoaded = Polymer.ImportStatus.whenReady;
(function () {
'use strict';
var settings = Polymer.Settings;
Polymer.Base = {
__isPolymerInstance__: true,
_addFeature: function (feature) {
this.extend(this, feature);
},
registerCallback: function () {
this._desugarBehaviors();
this._doBehavior('beforeRegister');
this._registerFeatures();
if (!settings.lazyRegister) {
this.ensureRegisterFinished();
}
},
createdCallback: function () {
if (!this.__hasRegisterFinished) {
this._ensureRegisterFinished(this.__proto__);
}
Polymer.telemetry.instanceCount++;
this.root = this;
this._doBehavior('created');
this._initFeatures();
},
ensureRegisterFinished: function () {
this._ensureRegisterFinished(this);
},
_ensureRegisterFinished: function (proto) {
if (proto.__hasRegisterFinished !== proto.is) {
proto.__hasRegisterFinished = proto.is;
if (proto._finishRegisterFeatures) {
proto._finishRegisterFeatures();
}
proto._doBehavior('registered');
}
},
attachedCallback: function () {
var self = this;
Polymer.RenderStatus.whenReady(function () {
self.isAttached = true;
self._doBehavior('attached');
});
},
detachedCallback: function () {
this.isAttached = false;
this._doBehavior('detached');
},
attributeChangedCallback: function (name, oldValue, newValue) {
this._attributeChangedImpl(name);
this._doBehavior('attributeChanged', [
name,
oldValue,
newValue
]);
},
_attributeChangedImpl: function (name) {
this._setAttributeToProperty(this, name);
},
extend: function (prototype, api) {
if (prototype && api) {
var n$ = Object.getOwnPropertyNames(api);
for (var i = 0, n; i < n$.length && (n = n$[i]); i++) {
this.copyOwnProperty(n, api, prototype);
}
}
return prototype || api;
},
mixin: function (target, source) {
for (var i in source) {
target[i] = source[i];
}
return target;
},
copyOwnProperty: function (name, source, target) {
var pd = Object.getOwnPropertyDescriptor(source, name);
if (pd) {
Object.defineProperty(target, name, pd);
}
},
_log: console.log.apply.bind(console.log, console),
_warn: console.warn.apply.bind(console.warn, console),
_error: console.error.apply.bind(console.error, console),
_logf: function () {
return this._logPrefix.concat([this.is]).concat(Array.prototype.slice.call(arguments, 0));
}
};
Polymer.Base._logPrefix = function () {
var color = window.chrome || /firefox/i.test(navigator.userAgent);
return color ? [
'%c[%s::%s]:',
'font-weight: bold; background-color:#EEEE00;'
] : ['[%s::%s]:'];
}();
Polymer.Base.chainObject = function (object, inherited) {
if (object && inherited && object !== inherited) {
if (!Object.__proto__) {
object = Polymer.Base.extend(Object.create(inherited), object);
}
object.__proto__ = inherited;
}
return object;
};
Polymer.Base = Polymer.Base.chainObject(Polymer.Base, HTMLElement.prototype);
if (window.CustomElements) {
Polymer.instanceof = CustomElements.instanceof;
} else {
Polymer.instanceof = function (obj, ctor) {
return obj instanceof ctor;
};
}
Polymer.isInstance = function (obj) {
return Boolean(obj && obj.__isPolymerInstance__);
};
Polymer.telemetry.instanceCount = 0;
}());
(function () {
var modules = {};
var lcModules = {};
var findModule = function (id) {
return modules[id] || lcModules[id.toLowerCase()];
};
var DomModule = function () {
return document.createElement('dom-module');
};
DomModule.prototype = Object.create(HTMLElement.prototype);
Polymer.Base.extend(DomModule.prototype, {
constructor: DomModule,
createdCallback: function () {
this.register();
},
register: function (id) {
id = id || this.id || this.getAttribute('name') || this.getAttribute('is');
if (id) {
this.id = id;
modules[id] = this;
lcModules[id.toLowerCase()] = this;
}
},
import: function (id, selector) {
if (id) {
var m = findModule(id);
if (!m) {
forceDomModulesUpgrade();
m = findModule(id);
}
if (m && selector) {
m = m.querySelector(selector);
}
return m;
}
}
});
var cePolyfill = window.CustomElements && !CustomElements.useNative;
document.registerElement('dom-module', DomModule);
function forceDomModulesUpgrade() {
if (cePolyfill) {
var script = document._currentScript || document.currentScript;
var doc = script && script.ownerDocument || document;
var modules = doc.querySelectorAll('dom-module');
for (var i = modules.length - 1, m; i >= 0 && (m = modules[i]); i--) {
if (m.__upgraded__) {
return;
} else {
CustomElements.upgrade(m);
}
}
}
}
}());
Polymer.Base._addFeature({
_prepIs: function () {
if (!this.is) {
var module = (document._currentScript || document.currentScript).parentNode;
if (module.localName === 'dom-module') {
var id = module.id || module.getAttribute('name') || module.getAttribute('is');
this.is = id;
}
}
if (this.is) {
this.is = this.is.toLowerCase();
}
}
});
Polymer.Base._addFeature({
behaviors: [],
_desugarBehaviors: function () {
if (this.behaviors.length) {
this.behaviors = this._desugarSomeBehaviors(this.behaviors);
}
},
_desugarSomeBehaviors: function (behaviors) {
var behaviorSet = [];
behaviors = this._flattenBehaviorsList(behaviors);
for (var i = behaviors.length - 1; i >= 0; i--) {
var b = behaviors[i];
if (behaviorSet.indexOf(b) === -1) {
this._mixinBehavior(b);
behaviorSet.unshift(b);
}
}
return behaviorSet;
},
_flattenBehaviorsList: function (behaviors) {
var flat = [];
for (var i = 0; i < behaviors.length; i++) {
var b = behaviors[i];
if (b instanceof Array) {
flat = flat.concat(this._flattenBehaviorsList(b));
} else if (b) {
flat.push(b);
} else {
this._warn(this._logf('_flattenBehaviorsList', 'behavior is null, check for missing or 404 import'));
}
}
return flat;
},
_mixinBehavior: function (b) {
var n$ = Object.getOwnPropertyNames(b);
for (var i = 0, n; i < n$.length && (n = n$[i]); i++) {
if (!Polymer.Base._behaviorProperties[n] && !this.hasOwnProperty(n)) {
this.copyOwnProperty(n, b, this);
}
}
},
_prepBehaviors: function () {
this._prepFlattenedBehaviors(this.behaviors);
},
_prepFlattenedBehaviors: function (behaviors) {
for (var i = 0, l = behaviors.length; i < l; i++) {
this._prepBehavior(behaviors[i]);
}
this._prepBehavior(this);
},
_doBehavior: function (name, args) {
for (var i = 0; i < this.behaviors.length; i++) {
this._invokeBehavior(this.behaviors[i], name, args);
}
this._invokeBehavior(this, name, args);
},
_invokeBehavior: function (b, name, args) {
var fn = b[name];
if (fn) {
fn.apply(this, args || Polymer.nar);
}
},
_marshalBehaviors: function () {
for (var i = 0; i < this.behaviors.length; i++) {
this._marshalBehavior(this.behaviors[i]);
}
this._marshalBehavior(this);
}
});
Polymer.Base._behaviorProperties = {
hostAttributes: true,
beforeRegister: true,
registered: true,
properties: true,
observers: true,
listeners: true,
created: true,
attached: true,
detached: true,
attributeChanged: true,
ready: true
};
Polymer.Base._addFeature({
_getExtendedPrototype: function (tag) {
return this._getExtendedNativePrototype(tag);
},
_nativePrototypes: {},
_getExtendedNativePrototype: function (tag) {
var p = this._nativePrototypes[tag];
if (!p) {
var np = this.getNativePrototype(tag);
p = this.extend(Object.create(np), Polymer.Base);
this._nativePrototypes[tag] = p;
}
return p;
},
getNativePrototype: function (tag) {
return Object.getPrototypeOf(document.createElement(tag));
}
});
Polymer.Base._addFeature({
_prepConstructor: function () {
this._factoryArgs = this.extends ? [
this.extends,
this.is
] : [this.is];
var ctor = function () {
return this._factory(arguments);
};
if (this.hasOwnProperty('extends')) {
ctor.extends = this.extends;
}
Object.defineProperty(this, 'constructor', {
value: ctor,
writable: true,
configurable: true
});
ctor.prototype = this;
},
_factory: function (args) {
var elt = document.createElement.apply(document, this._factoryArgs);
if (this.factoryImpl) {
this.factoryImpl.apply(elt, args);
}
return elt;
}
});
Polymer.nob = Object.create(null);
Polymer.Base._addFeature({
properties: {},
getPropertyInfo: function (property) {
var info = this._getPropertyInfo(property, this.properties);
if (!info) {
for (var i = 0; i < this.behaviors.length; i++) {
info = this._getPropertyInfo(property, this.behaviors[i].properties);
if (info) {
return info;
}
}
}
return info || Polymer.nob;
},
_getPropertyInfo: function (property, properties) {
var p = properties && properties[property];
if (typeof p === 'function') {
p = properties[property] = { type: p };
}
if (p) {
p.defined = true;
}
return p;
},
_prepPropertyInfo: function () {
this._propertyInfo = {};
for (var i = 0; i < this.behaviors.length; i++) {
this._addPropertyInfo(this._propertyInfo, this.behaviors[i].properties);
}
this._addPropertyInfo(this._propertyInfo, this.properties);
this._addPropertyInfo(this._propertyInfo, this._propertyEffects);
},
_addPropertyInfo: function (target, source) {
if (source) {
var t, s;
for (var i in source) {
t = target[i];
s = source[i];
if (i[0] === '_' && !s.readOnly) {
continue;
}
if (!target[i]) {
target[i] = {
type: typeof s === 'function' ? s : s.type,
readOnly: s.readOnly,
attribute: Polymer.CaseMap.camelToDashCase(i)
};
} else {
if (!t.type) {
t.type = s.type;
}
if (!t.readOnly) {
t.readOnly = s.readOnly;
}
}
}
}
}
});
Polymer.CaseMap = {
_caseMap: {},
_rx: {
dashToCamel: /-[a-z]/g,
camelToDash: /([A-Z])/g
},
dashToCamelCase: function (dash) {
return this._caseMap[dash] || (this._caseMap[dash] = dash.indexOf('-') < 0 ? dash : dash.replace(this._rx.dashToCamel, function (m) {
return m[1].toUpperCase();
}));
},
camelToDashCase: function (camel) {
return this._caseMap[camel] || (this._caseMap[camel] = camel.replace(this._rx.camelToDash, '-$1').toLowerCase());
}
};
Polymer.Base._addFeature({
_addHostAttributes: function (attributes) {
if (!this._aggregatedAttributes) {
this._aggregatedAttributes = {};
}
if (attributes) {
this.mixin(this._aggregatedAttributes, attributes);
}
},
_marshalHostAttributes: function () {
if (this._aggregatedAttributes) {
this._applyAttributes(this, this._aggregatedAttributes);
}
},
_applyAttributes: function (node, attr$) {
for (var n in attr$) {
if (!this.hasAttribute(n) && n !== 'class') {
var v = attr$[n];
this.serializeValueToAttribute(v, n, this);
}
}
},
_marshalAttributes: function () {
this._takeAttributesToModel(this);
},
_takeAttributesToModel: function (model) {
if (this.hasAttributes()) {
for (var i in this._propertyInfo) {
var info = this._propertyInfo[i];
if (this.hasAttribute(info.attribute)) {
this._setAttributeToProperty(model, info.attribute, i, info);
}
}
}
},
_setAttributeToProperty: function (model, attribute, property, info) {
if (!this._serializing) {
property = property || Polymer.CaseMap.dashToCamelCase(attribute);
info = info || this._propertyInfo && this._propertyInfo[property];
if (info && !info.readOnly) {
var v = this.getAttribute(attribute);
model[property] = this.deserialize(v, info.type);
}
}
},
_serializing: false,
reflectPropertyToAttribute: function (property, attribute, value) {
this._serializing = true;
value = value === undefined ? this[property] : value;
this.serializeValueToAttribute(value, attribute || Polymer.CaseMap.camelToDashCase(property));
this._serializing = false;
},
serializeValueToAttribute: function (value, attribute, node) {
var str = this.serialize(value);
node = node || this;
if (str === undefined) {
node.removeAttribute(attribute);
} else {
node.setAttribute(attribute, str);
}
},
deserialize: function (value, type) {
switch (type) {
case Number:
value = Number(value);
break;
case Boolean:
value = value != null;
break;
case Object:
try {
value = JSON.parse(value);
} catch (x) {
}
break;
case Array:
try {
value = JSON.parse(value);
} catch (x) {
value = null;
console.warn('Polymer::Attributes: couldn`t decode Array as JSON');
}
break;
case Date:
value = new Date(value);
break;
case String:
default:
break;
}
return value;
},
serialize: function (value) {
switch (typeof value) {
case 'boolean':
return value ? '' : undefined;
case 'object':
if (value instanceof Date) {
return value.toString();
} else if (value) {
try {
return JSON.stringify(value);
} catch (x) {
return '';
}
}
default:
return value != null ? value : undefined;
}
}
});
Polymer.version = '1.4.0';
Polymer.Base._addFeature({
_registerFeatures: function () {
this._prepIs();
this._prepBehaviors();
this._prepConstructor();
this._prepPropertyInfo();
},
_prepBehavior: function (b) {
this._addHostAttributes(b.hostAttributes);
},
_marshalBehavior: function (b) {
},
_initFeatures: function () {
this._marshalHostAttributes();
this._marshalBehaviors();
}
});
Polymer.Base._addFeature({
_prepTemplate: function () {
if (this._template === undefined) {
this._template = Polymer.DomModule.import(this.is, 'template');
}
if (this._template && this._template.hasAttribute('is')) {
this._warn(this._logf('_prepTemplate', 'top-level Polymer template ' + 'must not be a type-extension, found', this._template, 'Move inside simple <template>.'));
}
if (this._template && !this._template.content && window.HTMLTemplateElement && HTMLTemplateElement.decorate) {
HTMLTemplateElement.decorate(this._template);
}
},
_stampTemplate: function () {
if (this._template) {
this.root = this.instanceTemplate(this._template);
}
},
instanceTemplate: function (template) {
var dom = document.importNode(template._content || template.content, true);
return dom;
}
});
(function () {
var baseAttachedCallback = Polymer.Base.attachedCallback;
Polymer.Base._addFeature({
_hostStack: [],
ready: function () {
},
_registerHost: function (host) {
this.dataHost = host = host || Polymer.Base._hostStack[Polymer.Base._hostStack.length - 1];
if (host && host._clients) {
host._clients.push(this);
}
this._clients = null;
this._clientsReadied = false;
},
_beginHosting: function () {
Polymer.Base._hostStack.push(this);
if (!this._clients) {
this._clients = [];
}
},
_endHosting: function () {
Polymer.Base._hostStack.pop();
},
_tryReady: function () {
this._readied = false;
if (this._canReady()) {
this._ready();
}
},
_canReady: function () {
return !this.dataHost || this.dataHost._clientsReadied;
},
_ready: function () {
this._beforeClientsReady();
if (this._template) {
this._setupRoot();
this._readyClients();
}
this._clientsReadied = true;
this._clients = null;
this._afterClientsReady();
this._readySelf();
},
_readyClients: function () {
this._beginDistribute();
var c$ = this._clients;
if (c$) {
for (var i = 0, l = c$.length, c; i < l && (c = c$[i]); i++) {
c._ready();
}
}
this._finishDistribute();
},
_readySelf: function () {
this._doBehavior('ready');
this._readied = true;
if (this._attachedPending) {
this._attachedPending = false;
this.attachedCallback();
}
},
_beforeClientsReady: function () {
},
_afterClientsReady: function () {
},
_beforeAttached: function () {
},
attachedCallback: function () {
if (this._readied) {
this._beforeAttached();
baseAttachedCallback.call(this);
} else {
this._attachedPending = true;
}
}
});
}());
Polymer.ArraySplice = function () {
function newSplice(index, removed, addedCount) {
return {
index: index,
removed: removed,
addedCount: addedCount
};
}
var EDIT_LEAVE = 0;
var EDIT_UPDATE = 1;
var EDIT_ADD = 2;
var EDIT_DELETE = 3;
function ArraySplice() {
}
ArraySplice.prototype = {
calcEditDistances: function (current, currentStart, currentEnd, old, oldStart, oldEnd) {
var rowCount = oldEnd - oldStart + 1;
var columnCount = currentEnd - currentStart + 1;
var distances = new Array(rowCount);
for (var i = 0; i < rowCount; i++) {
distances[i] = new Array(columnCount);
distances[i][0] = i;
}
for (var j = 0; j < columnCount; j++)
distances[0][j] = j;
for (i = 1; i < rowCount; i++) {
for (j = 1; j < columnCount; j++) {
if (this.equals(current[currentStart + j - 1], old[oldStart + i - 1]))
distances[i][j] = distances[i - 1][j - 1];
else {
var north = distances[i - 1][j] + 1;
var west = distances[i][j - 1] + 1;
distances[i][j] = north < west ? north : west;
}
}
}
return distances;
},
spliceOperationsFromEditDistances: function (distances) {
var i = distances.length - 1;
var j = distances[0].length - 1;
var current = distances[i][j];
var edits = [];
while (i > 0 || j > 0) {
if (i == 0) {
edits.push(EDIT_ADD);
j--;
continue;
}
if (j == 0) {
edits.push(EDIT_DELETE);
i--;
continue;
}
var northWest = distances[i - 1][j - 1];
var west = distances[i - 1][j];
var north = distances[i][j - 1];
var min;
if (west < north)
min = west < northWest ? west : northWest;
else
min = north < northWest ? north : northWest;
if (min == northWest) {
if (northWest == current) {
edits.push(EDIT_LEAVE);
} else {
edits.push(EDIT_UPDATE);
current = northWest;
}
i--;
j--;
} else if (min == west) {
edits.push(EDIT_DELETE);
i--;
current = west;
} else {
edits.push(EDIT_ADD);
j--;
current = north;
}
}
edits.reverse();
return edits;
},
calcSplices: function (current, currentStart, currentEnd, old, oldStart, oldEnd) {
var prefixCount = 0;
var suffixCount = 0;
var minLength = Math.min(currentEnd - currentStart, oldEnd - oldStart);
if (currentStart == 0 && oldStart == 0)
prefixCount = this.sharedPrefix(current, old, minLength);
if (currentEnd == current.length && oldEnd == old.length)
suffixCount = this.sharedSuffix(current, old, minLength - prefixCount);
currentStart += prefixCount;
oldStart += prefixCount;
currentEnd -= suffixCount;
oldEnd -= suffixCount;
if (currentEnd - currentStart == 0 && oldEnd - oldStart == 0)
return [];
if (currentStart == currentEnd) {
var splice = newSplice(currentStart, [], 0);
while (oldStart < oldEnd)
splice.removed.push(old[oldStart++]);
return [splice];
} else if (oldStart == oldEnd)
return [newSplice(currentStart, [], currentEnd - currentStart)];
var ops = this.spliceOperationsFromEditDistances(this.calcEditDistances(current, currentStart, currentEnd, old, oldStart, oldEnd));
splice = undefined;
var splices = [];
var index = currentStart;
var oldIndex = oldStart;
for (var i = 0; i < ops.length; i++) {
switch (ops[i]) {
case EDIT_LEAVE:
if (splice) {
splices.push(splice);
splice = undefined;
}
index++;
oldIndex++;
break;
case EDIT_UPDATE:
if (!splice)
splice = newSplice(index, [], 0);
splice.addedCount++;
index++;
splice.removed.push(old[oldIndex]);
oldIndex++;
break;
case EDIT_ADD:
if (!splice)
splice = newSplice(index, [], 0);
splice.addedCount++;
index++;
break;
case EDIT_DELETE:
if (!splice)
splice = newSplice(index, [], 0);
splice.removed.push(old[oldIndex]);
oldIndex++;
break;
}
}
if (splice) {
splices.push(splice);
}
return splices;
},
sharedPrefix: function (current, old, searchLength) {
for (var i = 0; i < searchLength; i++)
if (!this.equals(current[i], old[i]))
return i;
return searchLength;
},
sharedSuffix: function (current, old, searchLength) {
var index1 = current.length;
var index2 = old.length;
var count = 0;
while (count < searchLength && this.equals(current[--index1], old[--index2]))
count++;
return count;
},
calculateSplices: function (current, previous) {
return this.calcSplices(current, 0, current.length, previous, 0, previous.length);
},
equals: function (currentValue, previousValue) {
return currentValue === previousValue;
}
};
return new ArraySplice();
}();
Polymer.domInnerHTML = function () {
var escapeAttrRegExp = /[&\u00A0"]/g;
var escapeDataRegExp = /[&\u00A0<>]/g;
function escapeReplace(c) {
switch (c) {
case '&':
return '&amp;';
case '<':
return '&lt;';
case '>':
return '&gt;';
case '"':
return '&quot;';
case '\xA0':
return '&nbsp;';
}
}
function escapeAttr(s) {
return s.replace(escapeAttrRegExp, escapeReplace);
}
function escapeData(s) {
return s.replace(escapeDataRegExp, escapeReplace);
}
function makeSet(arr) {
var set = {};
for (var i = 0; i < arr.length; i++) {
set[arr[i]] = true;
}
return set;
}
var voidElements = makeSet([
'area',
'base',
'br',
'col',
'command',
'embed',
'hr',
'img',
'input',
'keygen',
'link',
'meta',
'param',
'source',
'track',
'wbr'
]);
var plaintextParents = makeSet([
'style',
'script',
'xmp',
'iframe',
'noembed',
'noframes',
'plaintext',
'noscript'
]);
function getOuterHTML(node, parentNode, composed) {
switch (node.nodeType) {
case Node.ELEMENT_NODE:
var tagName = node.localName;
var s = '<' + tagName;
var attrs = node.attributes;
for (var i = 0, attr; attr = attrs[i]; i++) {
s += ' ' + attr.name + '="' + escapeAttr(attr.value) + '"';
}
s += '>';
if (voidElements[tagName]) {
return s;
}
return s + getInnerHTML(node, composed) + '</' + tagName + '>';
case Node.TEXT_NODE:
var data = node.data;
if (parentNode && plaintextParents[parentNode.localName]) {
return data;
}
return escapeData(data);
case Node.COMMENT_NODE:
return '<!--' + node.data + '-->';
default:
console.error(node);
throw new Error('not implemented');
}
}
function getInnerHTML(node, composed) {
if (node instanceof HTMLTemplateElement)
node = node.content;
var s = '';
var c$ = Polymer.dom(node).childNodes;
for (var i = 0, l = c$.length, child; i < l && (child = c$[i]); i++) {
s += getOuterHTML(child, node, composed);
}
return s;
}
return { getInnerHTML: getInnerHTML };
}();
(function () {
'use strict';
var nativeInsertBefore = Element.prototype.insertBefore;
var nativeAppendChild = Element.prototype.appendChild;
var nativeRemoveChild = Element.prototype.removeChild;
Polymer.TreeApi = {
arrayCopyChildNodes: function (parent) {
var copy = [], i = 0;
for (var n = parent.firstChild; n; n = n.nextSibling) {
copy[i++] = n;
}
return copy;
},
arrayCopyChildren: function (parent) {
var copy = [], i = 0;
for (var n = parent.firstElementChild; n; n = n.nextElementSibling) {
copy[i++] = n;
}
return copy;
},
arrayCopy: function (a$) {
var l = a$.length;
var copy = new Array(l);
for (var i = 0; i < l; i++) {
copy[i] = a$[i];
}
return copy;
}
};
Polymer.TreeApi.Logical = {
hasParentNode: function (node) {
return Boolean(node.__dom && node.__dom.parentNode);
},
hasChildNodes: function (node) {
return Boolean(node.__dom && node.__dom.childNodes !== undefined);
},
getChildNodes: function (node) {
return this.hasChildNodes(node) ? this._getChildNodes(node) : node.childNodes;
},
_getChildNodes: function (node) {
if (!node.__dom.childNodes) {
node.__dom.childNodes = [];
for (var n = node.__dom.firstChild; n; n = n.__dom.nextSibling) {
node.__dom.childNodes.push(n);
}
}
return node.__dom.childNodes;
},
getParentNode: function (node) {
return node.__dom && node.__dom.parentNode !== undefined ? node.__dom.parentNode : node.parentNode;
},
getFirstChild: function (node) {
return node.__dom && node.__dom.firstChild !== undefined ? node.__dom.firstChild : node.firstChild;
},
getLastChild: function (node) {
return node.__dom && node.__dom.lastChild !== undefined ? node.__dom.lastChild : node.lastChild;
},
getNextSibling: function (node) {
return node.__dom && node.__dom.nextSibling !== undefined ? node.__dom.nextSibling : node.nextSibling;
},
getPreviousSibling: function (node) {
return node.__dom && node.__dom.previousSibling !== undefined ? node.__dom.previousSibling : node.previousSibling;
},
getFirstElementChild: function (node) {
return node.__dom && node.__dom.firstChild !== undefined ? this._getFirstElementChild(node) : node.firstElementChild;
},
_getFirstElementChild: function (node) {
var n = node.__dom.firstChild;
while (n && n.nodeType !== Node.ELEMENT_NODE) {
n = n.__dom.nextSibling;
}
return n;
},
getLastElementChild: function (node) {
return node.__dom && node.__dom.lastChild !== undefined ? this._getLastElementChild(node) : node.lastElementChild;
},
_getLastElementChild: function (node) {
var n = node.__dom.lastChild;
while (n && n.nodeType !== Node.ELEMENT_NODE) {
n = n.__dom.previousSibling;
}
return n;
},
getNextElementSibling: function (node) {
return node.__dom && node.__dom.nextSibling !== undefined ? this._getNextElementSibling(node) : node.nextElementSibling;
},
_getNextElementSibling: function (node) {
var n = node.__dom.nextSibling;
while (n && n.nodeType !== Node.ELEMENT_NODE) {
n = n.__dom.nextSibling;
}
return n;
},
getPreviousElementSibling: function (node) {
return node.__dom && node.__dom.previousSibling !== undefined ? this._getPreviousElementSibling(node) : node.previousElementSibling;
},
_getPreviousElementSibling: function (node) {
var n = node.__dom.previousSibling;
while (n && n.nodeType !== Node.ELEMENT_NODE) {
n = n.__dom.previousSibling;
}
return n;
},
saveChildNodes: function (node) {
if (!this.hasChildNodes(node)) {
node.__dom = node.__dom || {};
node.__dom.firstChild = node.firstChild;
node.__dom.lastChild = node.lastChild;
node.__dom.childNodes = [];
for (var n = node.firstChild; n; n = n.nextSibling) {
n.__dom = n.__dom || {};
n.__dom.parentNode = node;
node.__dom.childNodes.push(n);
n.__dom.nextSibling = n.nextSibling;
n.__dom.previousSibling = n.previousSibling;
}
}
},
recordInsertBefore: function (node, container, ref_node) {
container.__dom.childNodes = null;
if (node.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
for (var n = node.firstChild; n; n = n.nextSibling) {
this._linkNode(n, container, ref_node);
}
} else {
this._linkNode(node, container, ref_node);
}
},
_linkNode: function (node, container, ref_node) {
node.__dom = node.__dom || {};
container.__dom = container.__dom || {};
if (ref_node) {
ref_node.__dom = ref_node.__dom || {};
}
node.__dom.previousSibling = ref_node ? ref_node.__dom.previousSibling : container.__dom.lastChild;
if (node.__dom.previousSibling) {
node.__dom.previousSibling.__dom.nextSibling = node;
}
node.__dom.nextSibling = ref_node;
if (node.__dom.nextSibling) {
node.__dom.nextSibling.__dom.previousSibling = node;
}
node.__dom.parentNode = container;
if (ref_node) {
if (ref_node === container.__dom.firstChild) {
container.__dom.firstChild = node;
}
} else {
container.__dom.lastChild = node;
if (!container.__dom.firstChild) {
container.__dom.firstChild = node;
}
}
container.__dom.childNodes = null;
},
recordRemoveChild: function (node, container) {
node.__dom = node.__dom || {};
container.__dom = container.__dom || {};
if (node === container.__dom.firstChild) {
container.__dom.firstChild = node.__dom.nextSibling;
}
if (node === container.__dom.lastChild) {
container.__dom.lastChild = node.__dom.previousSibling;
}
var p = node.__dom.previousSibling;
var n = node.__dom.nextSibling;
if (p) {
p.__dom.nextSibling = n;
}
if (n) {
n.__dom.previousSibling = p;
}
node.__dom.parentNode = node.__dom.previousSibling = node.__dom.nextSibling = undefined;
container.__dom.childNodes = null;
}
};
Polymer.TreeApi.Composed = {
getChildNodes: function (node) {
return Polymer.TreeApi.arrayCopyChildNodes(node);
},
getParentNode: function (node) {
return node.parentNode;
},
clearChildNodes: function (node) {
node.textContent = '';
},
insertBefore: function (parentNode, newChild, refChild) {
return nativeInsertBefore.call(parentNode, newChild, refChild || null);
},
appendChild: function (parentNode, newChild) {
return nativeAppendChild.call(parentNode, newChild);
},
removeChild: function (parentNode, node) {
return nativeRemoveChild.call(parentNode, node);
}
};
}());
Polymer.DomApi = function () {
'use strict';
var Settings = Polymer.Settings;
var TreeApi = Polymer.TreeApi;
var DomApi = function (node) {
this.node = needsToWrap ? DomApi.wrap(node) : node;
};
var needsToWrap = Settings.hasShadow && !Settings.nativeShadow;
DomApi.wrap = window.wrap ? window.wrap : function (node) {
return node;
};
DomApi.prototype = {
flush: function () {
Polymer.dom.flush();
},
deepContains: function (node) {
if (this.node.contains(node)) {
return true;
}
var n = node;
var doc = node.ownerDocument;
while (n && n !== doc && n !== this.node) {
n = Polymer.dom(n).parentNode || n.host;
}
return n === this.node;
},
queryDistributedElements: function (selector) {
var c$ = this.getEffectiveChildNodes();
var list = [];
for (var i = 0, l = c$.length, c; i < l && (c = c$[i]); i++) {
if (c.nodeType === Node.ELEMENT_NODE && DomApi.matchesSelector.call(c, selector)) {
list.push(c);
}
}
return list;
},
getEffectiveChildNodes: function () {
var list = [];
var c$ = this.childNodes;
for (var i = 0, l = c$.length, c; i < l && (c = c$[i]); i++) {
if (c.localName === CONTENT) {
var d$ = dom(c).getDistributedNodes();
for (var j = 0; j < d$.length; j++) {
list.push(d$[j]);
}
} else {
list.push(c);
}
}
return list;
},
observeNodes: function (callback) {
if (callback) {
if (!this.observer) {
this.observer = this.node.localName === CONTENT ? new DomApi.DistributedNodesObserver(this) : new DomApi.EffectiveNodesObserver(this);
}
return this.observer.addListener(callback);
}
},
unobserveNodes: function (handle) {
if (this.observer) {
this.observer.removeListener(handle);
}
},
notifyObserver: function () {
if (this.observer) {
this.observer.notify();
}
},
_query: function (matcher, node, halter) {
node = node || this.node;
var list = [];
this._queryElements(TreeApi.Logical.getChildNodes(node), matcher, halter, list);
return list;
},
_queryElements: function (elements, matcher, halter, list) {
for (var i = 0, l = elements.length, c; i < l && (c = elements[i]); i++) {
if (c.nodeType === Node.ELEMENT_NODE) {
if (this._queryElement(c, matcher, halter, list)) {
return true;
}
}
}
},
_queryElement: function (node, matcher, halter, list) {
var result = matcher(node);
if (result) {
list.push(node);
}
if (halter && halter(result)) {
return result;
}
this._queryElements(TreeApi.Logical.getChildNodes(node), matcher, halter, list);
}
};
var CONTENT = DomApi.CONTENT = 'content';
var dom = DomApi.factory = function (node) {
node = node || document;
if (!node.__domApi) {
node.__domApi = new DomApi.ctor(node);
}
return node.__domApi;
};
DomApi.hasApi = function (node) {
return Boolean(node.__domApi);
};
DomApi.ctor = DomApi;
Polymer.dom = function (obj, patch) {
if (obj instanceof Event) {
return Polymer.EventApi.factory(obj);
} else {
return DomApi.factory(obj, patch);
}
};
var p = Element.prototype;
DomApi.matchesSelector = p.matches || p.matchesSelector || p.mozMatchesSelector || p.msMatchesSelector || p.oMatchesSelector || p.webkitMatchesSelector;
return DomApi;
}();
(function () {
'use strict';
var Settings = Polymer.Settings;
var DomApi = Polymer.DomApi;
var dom = DomApi.factory;
var TreeApi = Polymer.TreeApi;
var getInnerHTML = Polymer.domInnerHTML.getInnerHTML;
var CONTENT = DomApi.CONTENT;
if (Settings.useShadow) {
return;
}
var nativeCloneNode = Element.prototype.cloneNode;
var nativeImportNode = Document.prototype.importNode;
Polymer.Base.extend(DomApi.prototype, {
_lazyDistribute: function (host) {
if (host.shadyRoot && host.shadyRoot._distributionClean) {
host.shadyRoot._distributionClean = false;
Polymer.dom.addDebouncer(host.debounce('_distribute', host._distributeContent));
}
},
appendChild: function (node) {
return this.insertBefore(node);
},
insertBefore: function (node, ref_node) {
if (ref_node && TreeApi.Logical.getParentNode(ref_node) !== this.node) {
throw Error('The ref_node to be inserted before is not a child ' + 'of this node');
}
if (node.nodeType !== Node.DOCUMENT_FRAGMENT_NODE) {
var parent = TreeApi.Logical.getParentNode(node);
if (parent) {
if (DomApi.hasApi(parent)) {
dom(parent).notifyObserver();
}
this._removeNode(node);
} else {
this._removeOwnerShadyRoot(node);
}
}
if (!this._addNode(node, ref_node)) {
if (ref_node) {
ref_node = ref_node.localName === CONTENT ? this._firstComposedNode(ref_node) : ref_node;
}
var container = this.node._isShadyRoot ? this.node.host : this.node;
if (ref_node) {
TreeApi.Composed.insertBefore(container, node, ref_node);
} else {
TreeApi.Composed.appendChild(container, node);
}
}
this.notifyObserver();
return node;
},
_addNode: function (node, ref_node) {
var root = this.getOwnerRoot();
if (root) {
var ipAdded = this._maybeAddInsertionPoint(node, this.node);
if (!root._invalidInsertionPoints) {
root._invalidInsertionPoints = ipAdded;
}
this._addNodeToHost(root.host, node);
}
if (TreeApi.Logical.hasChildNodes(this.node)) {
TreeApi.Logical.recordInsertBefore(node, this.node, ref_node);
}
var handled = this._maybeDistribute(node) || this.node.shadyRoot;
if (handled) {
if (node.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
while (node.firstChild) {
TreeApi.Composed.removeChild(node, node.firstChild);
}
} else {
var parent = TreeApi.Composed.getParentNode(node);
if (parent) {
TreeApi.Composed.removeChild(parent, node);
}
}
}
return handled;
},
removeChild: function (node) {
if (TreeApi.Logical.getParentNode(node) !== this.node) {
throw Error('The node to be removed is not a child of this node: ' + node);
}
if (!this._removeNode(node)) {
var container = this.node._isShadyRoot ? this.node.host : this.node;
var parent = TreeApi.Composed.getParentNode(node);
if (container === parent) {
TreeApi.Composed.removeChild(container, node);
}
}
this.notifyObserver();
return node;
},
_removeNode: function (node) {
var logicalParent = TreeApi.Logical.hasParentNode(node) && TreeApi.Logical.getParentNode(node);
var distributed;
var root = this._ownerShadyRootForNode(node);
if (logicalParent) {
distributed = dom(node)._maybeDistributeParent();
TreeApi.Logical.recordRemoveChild(node, logicalParent);
if (root && this._removeDistributedChildren(root, node)) {
root._invalidInsertionPoints = true;
this._lazyDistribute(root.host);
}
}
this._removeOwnerShadyRoot(node);
if (root) {
this._removeNodeFromHost(root.host, node);
}
return distributed;
},
replaceChild: function (node, ref_node) {
this.insertBefore(node, ref_node);
this.removeChild(ref_node);
return node;
},
_hasCachedOwnerRoot: function (node) {
return Boolean(node._ownerShadyRoot !== undefined);
},
getOwnerRoot: function () {
return this._ownerShadyRootForNode(this.node);
},
_ownerShadyRootForNode: function (node) {
if (!node) {
return;
}
var root = node._ownerShadyRoot;
if (root === undefined) {
if (node._isShadyRoot) {
root = node;
} else {
var parent = TreeApi.Logical.getParentNode(node);
if (parent) {
root = parent._isShadyRoot ? parent : this._ownerShadyRootForNode(parent);
} else {
root = null;
}
}
if (root || document.documentElement.contains(node)) {
node._ownerShadyRoot = root;
}
}
return root;
},
_maybeDistribute: function (node) {
var fragContent = node.nodeType === Node.DOCUMENT_FRAGMENT_NODE && !node.__noContent && dom(node).querySelector(CONTENT);
var wrappedContent = fragContent && TreeApi.Logical.getParentNode(fragContent).nodeType !== Node.DOCUMENT_FRAGMENT_NODE;
var hasContent = fragContent || node.localName === CONTENT;
if (hasContent) {
var root = this.getOwnerRoot();
if (root) {
this._lazyDistribute(root.host);
}
}
var needsDist = this._nodeNeedsDistribution(this.node);
if (needsDist) {
this._lazyDistribute(this.node);
}
return needsDist || hasContent && !wrappedContent;
},
_maybeAddInsertionPoint: function (node, parent) {
var added;
if (node.nodeType === Node.DOCUMENT_FRAGMENT_NODE && !node.__noContent) {
var c$ = dom(node).querySelectorAll(CONTENT);
for (var i = 0, n, np, na; i < c$.length && (n = c$[i]); i++) {
np = TreeApi.Logical.getParentNode(n);
if (np === node) {
np = parent;
}
na = this._maybeAddInsertionPoint(n, np);
added = added || na;
}
} else if (node.localName === CONTENT) {
TreeApi.Logical.saveChildNodes(parent);
TreeApi.Logical.saveChildNodes(node);
added = true;
}
return added;
},
_updateInsertionPoints: function (host) {
var i$ = host.shadyRoot._insertionPoints = dom(host.shadyRoot).querySelectorAll(CONTENT);
for (var i = 0, c; i < i$.length; i++) {
c = i$[i];
TreeApi.Logical.saveChildNodes(c);
TreeApi.Logical.saveChildNodes(TreeApi.Logical.getParentNode(c));
}
},
_nodeNeedsDistribution: function (node) {
return node && node.shadyRoot && DomApi.hasInsertionPoint(node.shadyRoot);
},
_addNodeToHost: function (host, node) {
if (host._elementAdd) {
host._elementAdd(node);
}
},
_removeNodeFromHost: function (host, node) {
if (host._elementRemove) {
host._elementRemove(node);
}
},
_removeDistributedChildren: function (root, container) {
var hostNeedsDist;
var ip$ = root._insertionPoints;
for (var i = 0; i < ip$.length; i++) {
var content = ip$[i];
if (this._contains(container, content)) {
var dc$ = dom(content).getDistributedNodes();
for (var j = 0; j < dc$.length; j++) {
hostNeedsDist = true;
var node = dc$[j];
var parent = TreeApi.Composed.getParentNode(node);
if (parent) {
TreeApi.Composed.removeChild(parent, node);
}
}
}
}
return hostNeedsDist;
},
_contains: function (container, node) {
while (node) {
if (node == container) {
return true;
}
node = TreeApi.Logical.getParentNode(node);
}
},
_removeOwnerShadyRoot: function (node) {
if (this._hasCachedOwnerRoot(node)) {
var c$ = TreeApi.Logical.getChildNodes(node);
for (var i = 0, l = c$.length, n; i < l && (n = c$[i]); i++) {
this._removeOwnerShadyRoot(n);
}
}
node._ownerShadyRoot = undefined;
},
_firstComposedNode: function (content) {
var n$ = dom(content).getDistributedNodes();
for (var i = 0, l = n$.length, n, p$; i < l && (n = n$[i]); i++) {
p$ = dom(n).getDestinationInsertionPoints();
if (p$[p$.length - 1] === content) {
return n;
}
}
},
querySelector: function (selector) {
var result = this._query(function (n) {
return DomApi.matchesSelector.call(n, selector);
}, this.node, function (n) {
return Boolean(n);
})[0];
return result || null;
},
querySelectorAll: function (selector) {
return this._query(function (n) {
return DomApi.matchesSelector.call(n, selector);
}, this.node);
},
getDestinationInsertionPoints: function () {
return this.node._destinationInsertionPoints || [];
},
getDistributedNodes: function () {
return this.node._distributedNodes || [];
},
_clear: function () {
while (this.childNodes.length) {
this.removeChild(this.childNodes[0]);
}
},
setAttribute: function (name, value) {
this.node.setAttribute(name, value);
this._maybeDistributeParent();
},
removeAttribute: function (name) {
this.node.removeAttribute(name);
this._maybeDistributeParent();
},
_maybeDistributeParent: function () {
if (this._nodeNeedsDistribution(this.parentNode)) {
this._lazyDistribute(this.parentNode);
return true;
}
},
cloneNode: function (deep) {
var n = nativeCloneNode.call(this.node, false);
if (deep) {
var c$ = this.childNodes;
var d = dom(n);
for (var i = 0, nc; i < c$.length; i++) {
nc = dom(c$[i]).cloneNode(true);
d.appendChild(nc);
}
}
return n;
},
importNode: function (externalNode, deep) {
var doc = this.node instanceof Document ? this.node : this.node.ownerDocument;
var n = nativeImportNode.call(doc, externalNode, false);
if (deep) {
var c$ = TreeApi.Logical.getChildNodes(externalNode);
var d = dom(n);
for (var i = 0, nc; i < c$.length; i++) {
nc = dom(doc).importNode(c$[i], true);
d.appendChild(nc);
}
}
return n;
},
_getComposedInnerHTML: function () {
return getInnerHTML(this.node, true);
}
});
Object.defineProperties(DomApi.prototype, {
activeElement: {
get: function () {
var active = document.activeElement;
if (!active) {
return null;
}
var isShadyRoot = !!this.node._isShadyRoot;
if (this.node !== document) {
if (!isShadyRoot) {
return null;
}
if (this.node.host === active || !this.node.host.contains(active)) {
return null;
}
}
var activeRoot = dom(active).getOwnerRoot();
while (activeRoot && activeRoot !== this.node) {
active = activeRoot.host;
activeRoot = dom(active).getOwnerRoot();
}
if (this.node === document) {
return activeRoot ? null : active;
} else {
return activeRoot === this.node ? active : null;
}
},
configurable: true
},
childNodes: {
get: function () {
var c$ = TreeApi.Logical.getChildNodes(this.node);
return Array.isArray(c$) ? c$ : TreeApi.arrayCopyChildNodes(this.node);
},
configurable: true
},
children: {
get: function () {
if (TreeApi.Logical.hasChildNodes(this.node)) {
return Array.prototype.filter.call(this.childNodes, function (n) {
return n.nodeType === Node.ELEMENT_NODE;
});
} else {
return TreeApi.arrayCopyChildren(this.node);
}
},
configurable: true
},
parentNode: {
get: function () {
return TreeApi.Logical.getParentNode(this.node);
},
configurable: true
},
firstChild: {
get: function () {
return TreeApi.Logical.getFirstChild(this.node);
},
configurable: true
},
lastChild: {
get: function () {
return TreeApi.Logical.getLastChild(this.node);
},
configurable: true
},
nextSibling: {
get: function () {
return TreeApi.Logical.getNextSibling(this.node);
},
configurable: true
},
previousSibling: {
get: function () {
return TreeApi.Logical.getPreviousSibling(this.node);
},
configurable: true
},
firstElementChild: {
get: function () {
return TreeApi.Logical.getFirstElementChild(this.node);
},
configurable: true
},
lastElementChild: {
get: function () {
return TreeApi.Logical.getLastElementChild(this.node);
},
configurable: true
},
nextElementSibling: {
get: function () {
return TreeApi.Logical.getNextElementSibling(this.node);
},
configurable: true
},
previousElementSibling: {
get: function () {
return TreeApi.Logical.getPreviousElementSibling(this.node);
},
configurable: true
},
textContent: {
get: function () {
var nt = this.node.nodeType;
if (nt === Node.TEXT_NODE || nt === Node.COMMENT_NODE) {
return this.node.textContent;
} else {
var tc = [];
for (var i = 0, cn = this.childNodes, c; c = cn[i]; i++) {
if (c.nodeType !== Node.COMMENT_NODE) {
tc.push(c.textContent);
}
}
return tc.join('');
}
},
set: function (text) {
var nt = this.node.nodeType;
if (nt === Node.TEXT_NODE || nt === Node.COMMENT_NODE) {
this.node.textContent = text;
} else {
this._clear();
if (text) {
this.appendChild(document.createTextNode(text));
}
}
},
configurable: true
},
innerHTML: {
get: function () {
var nt = this.node.nodeType;
if (nt === Node.TEXT_NODE || nt === Node.COMMENT_NODE) {
return null;
} else {
return getInnerHTML(this.node);
}
},
set: function (text) {
var nt = this.node.nodeType;
if (nt !== Node.TEXT_NODE || nt !== Node.COMMENT_NODE) {
this._clear();
var d = document.createElement('div');
d.innerHTML = text;
var c$ = TreeApi.arrayCopyChildNodes(d);
for (var i = 0; i < c$.length; i++) {
this.appendChild(c$[i]);
}
}
},
configurable: true
}
});
DomApi.hasInsertionPoint = function (root) {
return Boolean(root && root._insertionPoints.length);
};
}());
(function () {
'use strict';
var Settings = Polymer.Settings;
var TreeApi = Polymer.TreeApi;
var DomApi = Polymer.DomApi;
if (!Settings.useShadow) {
return;
}
Polymer.Base.extend(DomApi.prototype, {
querySelectorAll: function (selector) {
return TreeApi.arrayCopy(this.node.querySelectorAll(selector));
},
getOwnerRoot: function () {
var n = this.node;
while (n) {
if (n.nodeType === Node.DOCUMENT_FRAGMENT_NODE && n.host) {
return n;
}
n = n.parentNode;
}
},
importNode: function (externalNode, deep) {
var doc = this.node instanceof Document ? this.node : this.node.ownerDocument;
return doc.importNode(externalNode, deep);
},
getDestinationInsertionPoints: function () {
var n$ = this.node.getDestinationInsertionPoints && this.node.getDestinationInsertionPoints();
return n$ ? TreeApi.arrayCopy(n$) : [];
},
getDistributedNodes: function () {
var n$ = this.node.getDistributedNodes && this.node.getDistributedNodes();
return n$ ? TreeApi.arrayCopy(n$) : [];
}
});
Object.defineProperties(DomApi.prototype, {
activeElement: {
get: function () {
var node = DomApi.wrap(this.node);
var activeElement = node.activeElement;
return node.contains(activeElement) ? activeElement : null;
},
configurable: true
},
childNodes: {
get: function () {
return TreeApi.arrayCopyChildNodes(this.node);
},
configurable: true
},
children: {
get: function () {
return TreeApi.arrayCopyChildren(this.node);
},
configurable: true
},
textContent: {
get: function () {
return this.node.textContent;
},
set: function (value) {
return this.node.textContent = value;
},
configurable: true
},
innerHTML: {
get: function () {
return this.node.innerHTML;
},
set: function (value) {
return this.node.innerHTML = value;
},
configurable: true
}
});
var forwardMethods = function (m$) {
for (var i = 0; i < m$.length; i++) {
forwardMethod(m$[i]);
}
};
var forwardMethod = function (method) {
DomApi.prototype[method] = function () {
return this.node[method].apply(this.node, arguments);
};
};
forwardMethods([
'cloneNode',
'appendChild',
'insertBefore',
'removeChild',
'replaceChild',
'setAttribute',
'removeAttribute',
'querySelector'
]);
var forwardProperties = function (f$) {
for (var i = 0; i < f$.length; i++) {
forwardProperty(f$[i]);
}
};
var forwardProperty = function (name) {
Object.defineProperty(DomApi.prototype, name, {
get: function () {
return this.node[name];
},
configurable: true
});
};
forwardProperties([
'parentNode',
'firstChild',
'lastChild',
'nextSibling',
'previousSibling',
'firstElementChild',
'lastElementChild',
'nextElementSibling',
'previousElementSibling'
]);
}());
Polymer.Base.extend(Polymer.dom, {
_flushGuard: 0,
_FLUSH_MAX: 100,
_needsTakeRecords: !Polymer.Settings.useNativeCustomElements,
_debouncers: [],
_staticFlushList: [],
_finishDebouncer: null,
flush: function () {
this._flushGuard = 0;
this._prepareFlush();
while (this._debouncers.length && this._flushGuard < this._FLUSH_MAX) {
while (this._debouncers.length) {
this._debouncers.shift().complete();
}
if (this._finishDebouncer) {
this._finishDebouncer.complete();
}
this._prepareFlush();
this._flushGuard++;
}
if (this._flushGuard >= this._FLUSH_MAX) {
console.warn('Polymer.dom.flush aborted. Flush may not be complete.');
}
},
_prepareFlush: function () {
if (this._needsTakeRecords) {
CustomElements.takeRecords();
}
for (var i = 0; i < this._staticFlushList.length; i++) {
this._staticFlushList[i]();
}
},
addStaticFlush: function (fn) {
this._staticFlushList.push(fn);
},
removeStaticFlush: function (fn) {
var i = this._staticFlushList.indexOf(fn);
if (i >= 0) {
this._staticFlushList.splice(i, 1);
}
},
addDebouncer: function (debouncer) {
this._debouncers.push(debouncer);
this._finishDebouncer = Polymer.Debounce(this._finishDebouncer, this._finishFlush);
},
_finishFlush: function () {
Polymer.dom._debouncers = [];
}
});
Polymer.EventApi = function () {
'use strict';
var DomApi = Polymer.DomApi.ctor;
var Settings = Polymer.Settings;
DomApi.Event = function (event) {
this.event = event;
};
if (Settings.useShadow) {
DomApi.Event.prototype = {
get rootTarget() {
return this.event.path[0];
},
get localTarget() {
return this.event.target;
},
get path() {
var path = this.event.path;
if (!Array.isArray(path)) {
path = Array.prototype.slice.call(path);
}
return path;
}
};
} else {
DomApi.Event.prototype = {
get rootTarget() {
return this.event.target;
},
get localTarget() {
var current = this.event.currentTarget;
var currentRoot = current && Polymer.dom(current).getOwnerRoot();
var p$ = this.path;
for (var i = 0; i < p$.length; i++) {
if (Polymer.dom(p$[i]).getOwnerRoot() === currentRoot) {
return p$[i];
}
}
},
get path() {
if (!this.event._path) {
var path = [];
var current = this.rootTarget;
while (current) {
path.push(current);
var insertionPoints = Polymer.dom(current).getDestinationInsertionPoints();
if (insertionPoints.length) {
for (var i = 0; i < insertionPoints.length - 1; i++) {
path.push(insertionPoints[i]);
}
current = insertionPoints[insertionPoints.length - 1];
} else {
current = Polymer.dom(current).parentNode || current.host;
}
}
path.push(window);
this.event._path = path;
}
return this.event._path;
}
};
}
var factory = function (event) {
if (!event.__eventApi) {
event.__eventApi = new DomApi.Event(event);
}
return event.__eventApi;
};
return { factory: factory };
}();
(function () {
'use strict';
var DomApi = Polymer.DomApi.ctor;
var useShadow = Polymer.Settings.useShadow;
Object.defineProperty(DomApi.prototype, 'classList', {
get: function () {
if (!this._classList) {
this._classList = new DomApi.ClassList(this);
}
return this._classList;
},
configurable: true
});
DomApi.ClassList = function (host) {
this.domApi = host;
this.node = host.node;
};
DomApi.ClassList.prototype = {
add: function () {
this.node.classList.add.apply(this.node.classList, arguments);
this._distributeParent();
},
remove: function () {
this.node.classList.remove.apply(this.node.classList, arguments);
this._distributeParent();
},
toggle: function () {
this.node.classList.toggle.apply(this.node.classList, arguments);
this._distributeParent();
},
_distributeParent: function () {
if (!useShadow) {
this.domApi._maybeDistributeParent();
}
},
contains: function () {
return this.node.classList.contains.apply(this.node.classList, arguments);
}
};
}());
(function () {
'use strict';
var DomApi = Polymer.DomApi.ctor;
var Settings = Polymer.Settings;
DomApi.EffectiveNodesObserver = function (domApi) {
this.domApi = domApi;
this.node = this.domApi.node;
this._listeners = [];
};
DomApi.EffectiveNodesObserver.prototype = {
addListener: function (callback) {
if (!this._isSetup) {
this._setup();
this._isSetup = true;
}
var listener = {
fn: callback,
_nodes: []
};
this._listeners.push(listener);
this._scheduleNotify();
return listener;
},
removeListener: function (handle) {
var i = this._listeners.indexOf(handle);
if (i >= 0) {
this._listeners.splice(i, 1);
handle._nodes = [];
}
if (!this._hasListeners()) {
this._cleanup();
this._isSetup = false;
}
},
_setup: function () {
this._observeContentElements(this.domApi.childNodes);
},
_cleanup: function () {
this._unobserveContentElements(this.domApi.childNodes);
},
_hasListeners: function () {
return Boolean(this._listeners.length);
},
_scheduleNotify: function () {
if (this._debouncer) {
this._debouncer.stop();
}
this._debouncer = Polymer.Debounce(this._debouncer, this._notify);
this._debouncer.context = this;
Polymer.dom.addDebouncer(this._debouncer);
},
notify: function () {
if (this._hasListeners()) {
this._scheduleNotify();
}
},
_notify: function () {
this._beforeCallListeners();
this._callListeners();
},
_beforeCallListeners: function () {
this._updateContentElements();
},
_updateContentElements: function () {
this._observeContentElements(this.domApi.childNodes);
},
_observeContentElements: function (elements) {
for (var i = 0, n; i < elements.length && (n = elements[i]); i++) {
if (this._isContent(n)) {
n.__observeNodesMap = n.__observeNodesMap || new WeakMap();
if (!n.__observeNodesMap.has(this)) {
n.__observeNodesMap.set(this, this._observeContent(n));
}
}
}
},
_observeContent: function (content) {
var self = this;
var h = Polymer.dom(content).observeNodes(function () {
self._scheduleNotify();
});
h._avoidChangeCalculation = true;
return h;
},
_unobserveContentElements: function (elements) {
for (var i = 0, n, h; i < elements.length && (n = elements[i]); i++) {
if (this._isContent(n)) {
h = n.__observeNodesMap.get(this);
if (h) {
Polymer.dom(n).unobserveNodes(h);
n.__observeNodesMap.delete(this);
}
}
}
},
_isContent: function (node) {
return node.localName === 'content';
},
_callListeners: function () {
var o$ = this._listeners;
var nodes = this._getEffectiveNodes();
for (var i = 0, o; i < o$.length && (o = o$[i]); i++) {
var info = this._generateListenerInfo(o, nodes);
if (info || o._alwaysNotify) {
this._callListener(o, info);
}
}
},
_getEffectiveNodes: function () {
return this.domApi.getEffectiveChildNodes();
},
_generateListenerInfo: function (listener, newNodes) {
if (listener._avoidChangeCalculation) {
return true;
}
var oldNodes = listener._nodes;
var info = {
target: this.node,
addedNodes: [],
removedNodes: []
};
var splices = Polymer.ArraySplice.calculateSplices(newNodes, oldNodes);
for (var i = 0, s; i < splices.length && (s = splices[i]); i++) {
for (var j = 0, n; j < s.removed.length && (n = s.removed[j]); j++) {
info.removedNodes.push(n);
}
}
for (i = 0, s; i < splices.length && (s = splices[i]); i++) {
for (j = s.index; j < s.index + s.addedCount; j++) {
info.addedNodes.push(newNodes[j]);
}
}
listener._nodes = newNodes;
if (info.addedNodes.length || info.removedNodes.length) {
return info;
}
},
_callListener: function (listener, info) {
return listener.fn.call(this.node, info);
},
enableShadowAttributeTracking: function () {
}
};
if (Settings.useShadow) {
var baseSetup = DomApi.EffectiveNodesObserver.prototype._setup;
var baseCleanup = DomApi.EffectiveNodesObserver.prototype._cleanup;
Polymer.Base.extend(DomApi.EffectiveNodesObserver.prototype, {
_setup: function () {
if (!this._observer) {
var self = this;
this._mutationHandler = function (mxns) {
if (mxns && mxns.length) {
self._scheduleNotify();
}
};
this._observer = new MutationObserver(this._mutationHandler);
this._boundFlush = function () {
self._flush();
};
Polymer.dom.addStaticFlush(this._boundFlush);
this._observer.observe(this.node, { childList: true });
}
baseSetup.call(this);
},
_cleanup: function () {
this._observer.disconnect();
this._observer = null;
this._mutationHandler = null;
Polymer.dom.removeStaticFlush(this._boundFlush);
baseCleanup.call(this);
},
_flush: function () {
if (this._observer) {
this._mutationHandler(this._observer.takeRecords());
}
},
enableShadowAttributeTracking: function () {
if (this._observer) {
this._makeContentListenersAlwaysNotify();
this._observer.disconnect();
this._observer.observe(this.node, {
childList: true,
attributes: true,
subtree: true
});
var root = this.domApi.getOwnerRoot();
var host = root && root.host;
if (host && Polymer.dom(host).observer) {
Polymer.dom(host).observer.enableShadowAttributeTracking();
}
}
},
_makeContentListenersAlwaysNotify: function () {
for (var i = 0, h; i < this._listeners.length; i++) {
h = this._listeners[i];
h._alwaysNotify = h._isContentListener;
}
}
});
}
}());
(function () {
'use strict';
var DomApi = Polymer.DomApi.ctor;
var Settings = Polymer.Settings;
DomApi.DistributedNodesObserver = function (domApi) {
DomApi.EffectiveNodesObserver.call(this, domApi);
};
DomApi.DistributedNodesObserver.prototype = Object.create(DomApi.EffectiveNodesObserver.prototype);
Polymer.Base.extend(DomApi.DistributedNodesObserver.prototype, {
_setup: function () {
},
_cleanup: function () {
},
_beforeCallListeners: function () {
},
_getEffectiveNodes: function () {
return this.domApi.getDistributedNodes();
}
});
if (Settings.useShadow) {
Polymer.Base.extend(DomApi.DistributedNodesObserver.prototype, {
_setup: function () {
if (!this._observer) {
var root = this.domApi.getOwnerRoot();
var host = root && root.host;
if (host) {
var self = this;
this._observer = Polymer.dom(host).observeNodes(function () {
self._scheduleNotify();
});
this._observer._isContentListener = true;
if (this._hasAttrSelect()) {
Polymer.dom(host).observer.enableShadowAttributeTracking();
}
}
}
},
_hasAttrSelect: function () {
var select = this.node.getAttribute('select');
return select && select.match(/[[.]+/);
},
_cleanup: function () {
var root = this.domApi.getOwnerRoot();
var host = root && root.host;
if (host) {
Polymer.dom(host).unobserveNodes(this._observer);
}
this._observer = null;
}
});
}
}());
(function () {
var DomApi = Polymer.DomApi;
var TreeApi = Polymer.TreeApi;
Polymer.Base._addFeature({
_prepShady: function () {
this._useContent = this._useContent || Boolean(this._template);
},
_setupShady: function () {
this.shadyRoot = null;
if (!this.__domApi) {
this.__domApi = null;
}
if (!this.__dom) {
this.__dom = null;
}
if (!this._ownerShadyRoot) {
this._ownerShadyRoot = undefined;
}
},
_poolContent: function () {
if (this._useContent) {
TreeApi.Logical.saveChildNodes(this);
}
},
_setupRoot: function () {
if (this._useContent) {
this._createLocalRoot();
if (!this.dataHost) {
upgradeLogicalChildren(TreeApi.Logical.getChildNodes(this));
}
}
},
_createLocalRoot: function () {
this.shadyRoot = this.root;
this.shadyRoot._distributionClean = false;
this.shadyRoot._hasDistributed = false;
this.shadyRoot._isShadyRoot = true;
this.shadyRoot._dirtyRoots = [];
var i$ = this.shadyRoot._insertionPoints = !this._notes || this._notes._hasContent ? this.shadyRoot.querySelectorAll('content') : [];
TreeApi.Logical.saveChildNodes(this.shadyRoot);
for (var i = 0, c; i < i$.length; i++) {
c = i$[i];
TreeApi.Logical.saveChildNodes(c);
TreeApi.Logical.saveChildNodes(c.parentNode);
}
this.shadyRoot.host = this;
},
get domHost() {
var root = Polymer.dom(this).getOwnerRoot();
return root && root.host;
},
distributeContent: function (updateInsertionPoints) {
if (this.shadyRoot) {
this.shadyRoot._invalidInsertionPoints = this.shadyRoot._invalidInsertionPoints || updateInsertionPoints;
var host = getTopDistributingHost(this);
Polymer.dom(this)._lazyDistribute(host);
}
},
_distributeContent: function () {
if (this._useContent && !this.shadyRoot._distributionClean) {
if (this.shadyRoot._invalidInsertionPoints) {
Polymer.dom(this)._updateInsertionPoints(this);
this.shadyRoot._invalidInsertionPoints = false;
}
this._beginDistribute();
this._distributeDirtyRoots();
this._finishDistribute();
}
},
_beginDistribute: function () {
if (this._useContent && DomApi.hasInsertionPoint(this.shadyRoot)) {
this._resetDistribution();
this._distributePool(this.shadyRoot, this._collectPool());
}
},
_distributeDirtyRoots: function () {
var c$ = this.shadyRoot._dirtyRoots;
for (var i = 0, l = c$.length, c; i < l && (c = c$[i]); i++) {
c._distributeContent();
}
this.shadyRoot._dirtyRoots = [];
},
_finishDistribute: function () {
if (this._useContent) {
this.shadyRoot._distributionClean = true;
if (DomApi.hasInsertionPoint(this.shadyRoot)) {
this._composeTree();
notifyContentObservers(this.shadyRoot);
} else {
if (!this.shadyRoot._hasDistributed) {
TreeApi.Composed.clearChildNodes(this);
this.appendChild(this.shadyRoot);
} else {
var children = this._composeNode(this);
this._updateChildNodes(this, children);
}
}
if (!this.shadyRoot._hasDistributed) {
notifyInitialDistribution(this);
}
this.shadyRoot._hasDistributed = true;
}
},
elementMatches: function (selector, node) {
node = node || this;
return DomApi.matchesSelector.call(node, selector);
},
_resetDistribution: function () {
var children = TreeApi.Logical.getChildNodes(this);
for (var i = 0; i < children.length; i++) {
var child = children[i];
if (child._destinationInsertionPoints) {
child._destinationInsertionPoints = undefined;
}
if (isInsertionPoint(child)) {
clearDistributedDestinationInsertionPoints(child);
}
}
var root = this.shadyRoot;
var p$ = root._insertionPoints;
for (var j = 0; j < p$.length; j++) {
p$[j]._distributedNodes = [];
}
},
_collectPool: function () {
var pool = [];
var children = TreeApi.Logical.getChildNodes(this);
for (var i = 0; i < children.length; i++) {
var child = children[i];
if (isInsertionPoint(child)) {
pool.push.apply(pool, child._distributedNodes);
} else {
pool.push(child);
}
}
return pool;
},
_distributePool: function (node, pool) {
var p$ = node._insertionPoints;
for (var i = 0, l = p$.length, p; i < l && (p = p$[i]); i++) {
this._distributeInsertionPoint(p, pool);
maybeRedistributeParent(p, this);
}
},
_distributeInsertionPoint: function (content, pool) {
var anyDistributed = false;
for (var i = 0, l = pool.length, node; i < l; i++) {
node = pool[i];
if (!node) {
continue;
}
if (this._matchesContentSelect(node, content)) {
distributeNodeInto(node, content);
pool[i] = undefined;
anyDistributed = true;
}
}
if (!anyDistributed) {
var children = TreeApi.Logical.getChildNodes(content);
for (var j = 0; j < children.length; j++) {
distributeNodeInto(children[j], content);
}
}
},
_composeTree: function () {
this._updateChildNodes(this, this._composeNode(this));
var p$ = this.shadyRoot._insertionPoints;
for (var i = 0, l = p$.length, p, parent; i < l && (p = p$[i]); i++) {
parent = TreeApi.Logical.getParentNode(p);
if (!parent._useContent && parent !== this && parent !== this.shadyRoot) {
this._updateChildNodes(parent, this._composeNode(parent));
}
}
},
_composeNode: function (node) {
var children = [];
var c$ = TreeApi.Logical.getChildNodes(node.shadyRoot || node);
for (var i = 0; i < c$.length; i++) {
var child = c$[i];
if (isInsertionPoint(child)) {
var distributedNodes = child._distributedNodes;
for (var j = 0; j < distributedNodes.length; j++) {
var distributedNode = distributedNodes[j];
if (isFinalDestination(child, distributedNode)) {
children.push(distributedNode);
}
}
} else {
children.push(child);
}
}
return children;
},
_updateChildNodes: function (container, children) {
var composed = TreeApi.Composed.getChildNodes(container);
var splices = Polymer.ArraySplice.calculateSplices(children, composed);
for (var i = 0, d = 0, s; i < splices.length && (s = splices[i]); i++) {
for (var j = 0, n; j < s.removed.length && (n = s.removed[j]); j++) {
if (TreeApi.Composed.getParentNode(n) === container) {
TreeApi.Composed.removeChild(container, n);
}
composed.splice(s.index + d, 1);
}
d -= s.addedCount;
}
for (var i = 0, s, next; i < splices.length && (s = splices[i]); i++) {
next = composed[s.index];
for (j = s.index, n; j < s.index + s.addedCount; j++) {
n = children[j];
TreeApi.Composed.insertBefore(container, n, next);
composed.splice(j, 0, n);
}
}
},
_matchesContentSelect: function (node, contentElement) {
var select = contentElement.getAttribute('select');
if (!select) {
return true;
}
select = select.trim();
if (!select) {
return true;
}
if (!(node instanceof Element)) {
return false;
}
var validSelectors = /^(:not\()?[*.#[a-zA-Z_|]/;
if (!validSelectors.test(select)) {
return false;
}
return this.elementMatches(select, node);
},
_elementAdd: function () {
},
_elementRemove: function () {
}
});
function distributeNodeInto(child, insertionPoint) {
insertionPoint._distributedNodes.push(child);
var points = child._destinationInsertionPoints;
if (!points) {
child._destinationInsertionPoints = [insertionPoint];
} else {
points.push(insertionPoint);
}
}
function clearDistributedDestinationInsertionPoints(content) {
var e$ = content._distributedNodes;
if (e$) {
for (var i = 0; i < e$.length; i++) {
var d = e$[i]._destinationInsertionPoints;
if (d) {
d.splice(d.indexOf(content) + 1, d.length);
}
}
}
}
function maybeRedistributeParent(content, host) {
var parent = TreeApi.Logical.getParentNode(content);
if (parent && parent.shadyRoot && DomApi.hasInsertionPoint(parent.shadyRoot) && parent.shadyRoot._distributionClean) {
parent.shadyRoot._distributionClean = false;
host.shadyRoot._dirtyRoots.push(parent);
}
}
function isFinalDestination(insertionPoint, node) {
var points = node._destinationInsertionPoints;
return points && points[points.length - 1] === insertionPoint;
}
function isInsertionPoint(node) {
return node.localName == 'content';
}
function getTopDistributingHost(host) {
while (host && hostNeedsRedistribution(host)) {
host = host.domHost;
}
return host;
}
function hostNeedsRedistribution(host) {
var c$ = TreeApi.Logical.getChildNodes(host);
for (var i = 0, c; i < c$.length; i++) {
c = c$[i];
if (c.localName && c.localName === 'content') {
return host.domHost;
}
}
}
function notifyContentObservers(root) {
for (var i = 0, c; i < root._insertionPoints.length; i++) {
c = root._insertionPoints[i];
if (DomApi.hasApi(c)) {
Polymer.dom(c).notifyObserver();
}
}
}
function notifyInitialDistribution(host) {
if (DomApi.hasApi(host)) {
Polymer.dom(host).notifyObserver();
}
}
var needsUpgrade = window.CustomElements && !CustomElements.useNative;
function upgradeLogicalChildren(children) {
if (needsUpgrade && children) {
for (var i = 0; i < children.length; i++) {
CustomElements.upgrade(children[i]);
}
}
}
}());
if (Polymer.Settings.useShadow) {
Polymer.Base._addFeature({
_poolContent: function () {
},
_beginDistribute: function () {
},
distributeContent: function () {
},
_distributeContent: function () {
},
_finishDistribute: function () {
},
_createLocalRoot: function () {
this.createShadowRoot();
this.shadowRoot.appendChild(this.root);
this.root = this.shadowRoot;
}
});
}
Polymer.Async = {
_currVal: 0,
_lastVal: 0,
_callbacks: [],
_twiddleContent: 0,
_twiddle: document.createTextNode(''),
run: function (callback, waitTime) {
if (waitTime > 0) {
return ~setTimeout(callback, waitTime);
} else {
this._twiddle.textContent = this._twiddleContent++;
this._callbacks.push(callback);
return this._currVal++;
}
},
cancel: function (handle) {
if (handle < 0) {
clearTimeout(~handle);
} else {
var idx = handle - this._lastVal;
if (idx >= 0) {
if (!this._callbacks[idx]) {
throw 'invalid async handle: ' + handle;
}
this._callbacks[idx] = null;
}
}
},
_atEndOfMicrotask: function () {
var len = this._callbacks.length;
for (var i = 0; i < len; i++) {
var cb = this._callbacks[i];
if (cb) {
try {
cb();
} catch (e) {
i++;
this._callbacks.splice(0, i);
this._lastVal += i;
this._twiddle.textContent = this._twiddleContent++;
throw e;
}
}
}
this._callbacks.splice(0, len);
this._lastVal += len;
}
};
new window.MutationObserver(function () {
Polymer.Async._atEndOfMicrotask();
}).observe(Polymer.Async._twiddle, { characterData: true });
Polymer.Debounce = function () {
var Async = Polymer.Async;
var Debouncer = function (context) {
this.context = context;
var self = this;
this.boundComplete = function () {
self.complete();
};
};
Debouncer.prototype = {
go: function (callback, wait) {
var h;
this.finish = function () {
Async.cancel(h);
};
h = Async.run(this.boundComplete, wait);
this.callback = callback;
},
stop: function () {
if (this.finish) {
this.finish();
this.finish = null;
}
},
complete: function () {
if (this.finish) {
this.stop();
this.callback.call(this.context);
}
}
};
function debounce(debouncer, callback, wait) {
if (debouncer) {
debouncer.stop();
} else {
debouncer = new Debouncer(this);
}
debouncer.go(callback, wait);
return debouncer;
}
return debounce;
}();
Polymer.Base._addFeature({
_setupDebouncers: function () {
this._debouncers = {};
},
debounce: function (jobName, callback, wait) {
return this._debouncers[jobName] = Polymer.Debounce.call(this, this._debouncers[jobName], callback, wait);
},
isDebouncerActive: function (jobName) {
var debouncer = this._debouncers[jobName];
return !!(debouncer && debouncer.finish);
},
flushDebouncer: function (jobName) {
var debouncer = this._debouncers[jobName];
if (debouncer) {
debouncer.complete();
}
},
cancelDebouncer: function (jobName) {
var debouncer = this._debouncers[jobName];
if (debouncer) {
debouncer.stop();
}
}
});
Polymer.DomModule = document.createElement('dom-module');
Polymer.Base._addFeature({
_registerFeatures: function () {
this._prepIs();
this._prepBehaviors();
this._prepConstructor();
this._prepTemplate();
this._prepShady();
this._prepPropertyInfo();
},
_prepBehavior: function (b) {
this._addHostAttributes(b.hostAttributes);
},
_initFeatures: function () {
this._registerHost();
if (this._template) {
this._poolContent();
this._beginHosting();
this._stampTemplate();
this._endHosting();
}
this._marshalHostAttributes();
this._setupDebouncers();
this._marshalBehaviors();
this._tryReady();
},
_marshalBehavior: function (b) {
}
});
Polymer.nar = [];
Polymer.Annotations = {
parseAnnotations: function (template) {
var list = [];
var content = template._content || template.content;
this._parseNodeAnnotations(content, list, template.hasAttribute('strip-whitespace'));
return list;
},
_parseNodeAnnotations: function (node, list, stripWhiteSpace) {
return node.nodeType === Node.TEXT_NODE ? this._parseTextNodeAnnotation(node, list) : this._parseElementAnnotations(node, list, stripWhiteSpace);
},
_bindingRegex: function () {
var IDENT = '(?:' + '[a-zA-Z_$][\\w.:$\\-*]*' + ')';
var NUMBER = '(?:' + '[-+]?[0-9]*\\.?[0-9]+(?:[eE][-+]?[0-9]+)?' + ')';
var SQUOTE_STRING = '(?:' + '\'(?:[^\'\\\\]|\\\\.)*\'' + ')';
var DQUOTE_STRING = '(?:' + '"(?:[^"\\\\]|\\\\.)*"' + ')';
var STRING = '(?:' + SQUOTE_STRING + '|' + DQUOTE_STRING + ')';
var ARGUMENT = '(?:' + IDENT + '|' + NUMBER + '|' + STRING + '\\s*' + ')';
var ARGUMENTS = '(?:' + ARGUMENT + '(?:,\\s*' + ARGUMENT + ')*' + ')';
var ARGUMENT_LIST = '(?:' + '\\(\\s*' + '(?:' + ARGUMENTS + '?' + ')' + '\\)\\s*' + ')';
var BINDING = '(' + IDENT + '\\s*' + ARGUMENT_LIST + '?' + ')';
var OPEN_BRACKET = '(\\[\\[|{{)' + '\\s*';
var CLOSE_BRACKET = '(?:]]|}})';
var NEGATE = '(?:(!)\\s*)?';
var EXPRESSION = OPEN_BRACKET + NEGATE + BINDING + CLOSE_BRACKET;
return new RegExp(EXPRESSION, 'g');
}(),
_parseBindings: function (text) {
var re = this._bindingRegex;
var parts = [];
var lastIndex = 0;
var m;
while ((m = re.exec(text)) !== null) {
if (m.index > lastIndex) {
parts.push({ literal: text.slice(lastIndex, m.index) });
}
var mode = m[1][0];
var negate = Boolean(m[2]);
var value = m[3].trim();
var customEvent, notifyEvent, colon;
if (mode == '{' && (colon = value.indexOf('::')) > 0) {
notifyEvent = value.substring(colon + 2);
value = value.substring(0, colon);
customEvent = true;
}
parts.push({
compoundIndex: parts.length,
value: value,
mode: mode,
negate: negate,
event: notifyEvent,
customEvent: customEvent
});
lastIndex = re.lastIndex;
}
if (lastIndex && lastIndex < text.length) {
var literal = text.substring(lastIndex);
if (literal) {
parts.push({ literal: literal });
}
}
if (parts.length) {
return parts;
}
},
_literalFromParts: function (parts) {
var s = '';
for (var i = 0; i < parts.length; i++) {
var literal = parts[i].literal;
s += literal || '';
}
return s;
},
_parseTextNodeAnnotation: function (node, list) {
var parts = this._parseBindings(node.textContent);
if (parts) {
node.textContent = this._literalFromParts(parts) || ' ';
var annote = {
bindings: [{
kind: 'text',
name: 'textContent',
parts: parts,
isCompound: parts.length !== 1
}]
};
list.push(annote);
return annote;
}
},
_parseElementAnnotations: function (element, list, stripWhiteSpace) {
var annote = {
bindings: [],
events: []
};
if (element.localName === 'content') {
list._hasContent = true;
}
this._parseChildNodesAnnotations(element, annote, list, stripWhiteSpace);
if (element.attributes) {
this._parseNodeAttributeAnnotations(element, annote, list);
if (this.prepElement) {
this.prepElement(element);
}
}
if (annote.bindings.length || annote.events.length || annote.id) {
list.push(annote);
}
return annote;
},
_parseChildNodesAnnotations: function (root, annote, list, stripWhiteSpace) {
if (root.firstChild) {
var node = root.firstChild;
var i = 0;
while (node) {
var next = node.nextSibling;
if (node.localName === 'template' && !node.hasAttribute('preserve-content')) {
this._parseTemplate(node, i, list, annote);
}
if (node.nodeType === Node.TEXT_NODE) {
var n = next;
while (n && n.nodeType === Node.TEXT_NODE) {
node.textContent += n.textContent;
next = n.nextSibling;
root.removeChild(n);
n = next;
}
if (stripWhiteSpace && !node.textContent.trim()) {
root.removeChild(node);
i--;
}
}
if (node.parentNode) {
var childAnnotation = this._parseNodeAnnotations(node, list, stripWhiteSpace);
if (childAnnotation) {
childAnnotation.parent = annote;
childAnnotation.index = i;
}
}
node = next;
i++;
}
}
},
_parseTemplate: function (node, index, list, parent) {
var content = document.createDocumentFragment();
content._notes = this.parseAnnotations(node);
content.appendChild(node.content);
list.push({
bindings: Polymer.nar,
events: Polymer.nar,
templateContent: content,
parent: parent,
index: index
});
},
_parseNodeAttributeAnnotations: function (node, annotation) {
var attrs = Array.prototype.slice.call(node.attributes);
for (var i = attrs.length - 1, a; a = attrs[i]; i--) {
var n = a.name;
var v = a.value;
var b;
if (n.slice(0, 3) === 'on-') {
node.removeAttribute(n);
annotation.events.push({
name: n.slice(3),
value: v
});
} else if (b = this._parseNodeAttributeAnnotation(node, n, v)) {
annotation.bindings.push(b);
} else if (n === 'id') {
annotation.id = v;
}
}
},
_parseNodeAttributeAnnotation: function (node, name, value) {
var parts = this._parseBindings(value);
if (parts) {
var origName = name;
var kind = 'property';
if (name[name.length - 1] == '$') {
name = name.slice(0, -1);
kind = 'attribute';
}
var literal = this._literalFromParts(parts);
if (literal && kind == 'attribute') {
node.setAttribute(name, literal);
}
if (node.localName === 'input' && origName === 'value') {
node.setAttribute(origName, '');
}
node.removeAttribute(origName);
var propertyName = Polymer.CaseMap.dashToCamelCase(name);
if (kind === 'property') {
name = propertyName;
}
return {
kind: kind,
name: name,
propertyName: propertyName,
parts: parts,
literal: literal,
isCompound: parts.length !== 1
};
}
},
findAnnotatedNode: function (root, annote) {
var parent = annote.parent && Polymer.Annotations.findAnnotatedNode(root, annote.parent);
if (parent) {
for (var n = parent.firstChild, i = 0; n; n = n.nextSibling) {
if (annote.index === i++) {
return n;
}
}
} else {
return root;
}
}
};
(function () {
function resolveCss(cssText, ownerDocument) {
return cssText.replace(CSS_URL_RX, function (m, pre, url, post) {
return pre + '\'' + resolve(url.replace(/["']/g, ''), ownerDocument) + '\'' + post;
});
}
function resolveAttrs(element, ownerDocument) {
for (var name in URL_ATTRS) {
var a$ = URL_ATTRS[name];
for (var i = 0, l = a$.length, a, at, v; i < l && (a = a$[i]); i++) {
if (name === '*' || element.localName === name) {
at = element.attributes[a];
v = at && at.value;
if (v && v.search(BINDING_RX) < 0) {
at.value = a === 'style' ? resolveCss(v, ownerDocument) : resolve(v, ownerDocument);
}
}
}
}
}
function resolve(url, ownerDocument) {
if (url && url[0] === '#') {
return url;
}
var resolver = getUrlResolver(ownerDocument);
resolver.href = url;
return resolver.href || url;
}
var tempDoc;
var tempDocBase;
function resolveUrl(url, baseUri) {
if (!tempDoc) {
tempDoc = document.implementation.createHTMLDocument('temp');
tempDocBase = tempDoc.createElement('base');
tempDoc.head.appendChild(tempDocBase);
}
tempDocBase.href = baseUri;
return resolve(url, tempDoc);
}
function getUrlResolver(ownerDocument) {
return ownerDocument.__urlResolver || (ownerDocument.__urlResolver = ownerDocument.createElement('a'));
}
var CSS_URL_RX = /(url\()([^)]*)(\))/g;
var URL_ATTRS = {
'*': [
'href',
'src',
'style',
'url'
],
form: ['action']
};
var BINDING_RX = /\{\{|\[\[/;
Polymer.ResolveUrl = {
resolveCss: resolveCss,
resolveAttrs: resolveAttrs,
resolveUrl: resolveUrl
};
}());
Polymer.Base._addFeature({
_prepAnnotations: function () {
if (!this._template) {
this._notes = [];
} else {
var self = this;
Polymer.Annotations.prepElement = function (element) {
self._prepElement(element);
};
if (this._template._content && this._template._content._notes) {
this._notes = this._template._content._notes;
} else {
this._notes = Polymer.Annotations.parseAnnotations(this._template);
this._processAnnotations(this._notes);
}
Polymer.Annotations.prepElement = null;
}
},
_processAnnotations: function (notes) {
for (var i = 0; i < notes.length; i++) {
var note = notes[i];
for (var j = 0; j < note.bindings.length; j++) {
var b = note.bindings[j];
for (var k = 0; k < b.parts.length; k++) {
var p = b.parts[k];
if (!p.literal) {
var signature = this._parseMethod(p.value);
if (signature) {
p.signature = signature;
} else {
p.model = this._modelForPath(p.value);
}
}
}
}
if (note.templateContent) {
this._processAnnotations(note.templateContent._notes);
var pp = note.templateContent._parentProps = this._discoverTemplateParentProps(note.templateContent._notes);
var bindings = [];
for (var prop in pp) {
bindings.push({
index: note.index,
kind: 'property',
name: '_parent_' + prop,
parts: [{
mode: '{',
model: prop,
value: prop
}]
});
}
note.bindings = note.bindings.concat(bindings);
}
}
},
_discoverTemplateParentProps: function (notes) {
var pp = {};
for (var i = 0, n; i < notes.length && (n = notes[i]); i++) {
for (var j = 0, b$ = n.bindings, b; j < b$.length && (b = b$[j]); j++) {
for (var k = 0, p$ = b.parts, p; k < p$.length && (p = p$[k]); k++) {
if (p.signature) {
var args = p.signature.args;
for (var kk = 0; kk < args.length; kk++) {
var model = args[kk].model;
if (model) {
pp[model] = true;
}
}
} else {
if (p.model) {
pp[p.model] = true;
}
}
}
}
if (n.templateContent) {
var tpp = n.templateContent._parentProps;
Polymer.Base.mixin(pp, tpp);
}
}
return pp;
},
_prepElement: function (element) {
Polymer.ResolveUrl.resolveAttrs(element, this._template.ownerDocument);
},
_findAnnotatedNode: Polymer.Annotations.findAnnotatedNode,
_marshalAnnotationReferences: function () {
if (this._template) {
this._marshalIdNodes();
this._marshalAnnotatedNodes();
this._marshalAnnotatedListeners();
}
},
_configureAnnotationReferences: function () {
var notes = this._notes;
var nodes = this._nodes;
for (var i = 0; i < notes.length; i++) {
var note = notes[i];
var node = nodes[i];
this._configureTemplateContent(note, node);
this._configureCompoundBindings(note, node);
}
},
_configureTemplateContent: function (note, node) {
if (note.templateContent) {
node._content = note.templateContent;
}
},
_configureCompoundBindings: function (note, node) {
var bindings = note.bindings;
for (var i = 0; i < bindings.length; i++) {
var binding = bindings[i];
if (binding.isCompound) {
var storage = node.__compoundStorage__ || (node.__compoundStorage__ = {});
var parts = binding.parts;
var literals = new Array(parts.length);
for (var j = 0; j < parts.length; j++) {
literals[j] = parts[j].literal;
}
var name = binding.name;
storage[name] = literals;
if (binding.literal && binding.kind == 'property') {
if (node._configValue) {
node._configValue(name, binding.literal);
} else {
node[name] = binding.literal;
}
}
}
}
},
_marshalIdNodes: function () {
this.$ = {};
for (var i = 0, l = this._notes.length, a; i < l && (a = this._notes[i]); i++) {
if (a.id) {
this.$[a.id] = this._findAnnotatedNode(this.root, a);
}
}
},
_marshalAnnotatedNodes: function () {
if (this._notes && this._notes.length) {
var r = new Array(this._notes.length);
for (var i = 0; i < this._notes.length; i++) {
r[i] = this._findAnnotatedNode(this.root, this._notes[i]);
}
this._nodes = r;
}
},
_marshalAnnotatedListeners: function () {
for (var i = 0, l = this._notes.length, a; i < l && (a = this._notes[i]); i++) {
if (a.events && a.events.length) {
var node = this._findAnnotatedNode(this.root, a);
for (var j = 0, e$ = a.events, e; j < e$.length && (e = e$[j]); j++) {
this.listen(node, e.name, e.value);
}
}
}
}
});
Polymer.Base._addFeature({
listeners: {},
_listenListeners: function (listeners) {
var node, name, eventName;
for (eventName in listeners) {
if (eventName.indexOf('.') < 0) {
node = this;
name = eventName;
} else {
name = eventName.split('.');
node = this.$[name[0]];
name = name[1];
}
this.listen(node, name, listeners[eventName]);
}
},
listen: function (node, eventName, methodName) {
var handler = this._recallEventHandler(this, eventName, node, methodName);
if (!handler) {
handler = this._createEventHandler(node, eventName, methodName);
}
if (handler._listening) {
return;
}
this._listen(node, eventName, handler);
handler._listening = true;
},
_boundListenerKey: function (eventName, methodName) {
return eventName + ':' + methodName;
},
_recordEventHandler: function (host, eventName, target, methodName, handler) {
var hbl = host.__boundListeners;
if (!hbl) {
hbl = host.__boundListeners = new WeakMap();
}
var bl = hbl.get(target);
if (!bl) {
bl = {};
hbl.set(target, bl);
}
var key = this._boundListenerKey(eventName, methodName);
bl[key] = handler;
},
_recallEventHandler: function (host, eventName, target, methodName) {
var hbl = host.__boundListeners;
if (!hbl) {
return;
}
var bl = hbl.get(target);
if (!bl) {
return;
}
var key = this._boundListenerKey(eventName, methodName);
return bl[key];
},
_createEventHandler: function (node, eventName, methodName) {
var host = this;
var handler = function (e) {
if (host[methodName]) {
host[methodName](e, e.detail);
} else {
host._warn(host._logf('_createEventHandler', 'listener method `' + methodName + '` not defined'));
}
};
handler._listening = false;
this._recordEventHandler(host, eventName, node, methodName, handler);
return handler;
},
unlisten: function (node, eventName, methodName) {
var handler = this._recallEventHandler(this, eventName, node, methodName);
if (handler) {
this._unlisten(node, eventName, handler);
handler._listening = false;
}
},
_listen: function (node, eventName, handler) {
node.addEventListener(eventName, handler);
},
_unlisten: function (node, eventName, handler) {
node.removeEventListener(eventName, handler);
}
});
(function () {
'use strict';
var wrap = Polymer.DomApi.wrap;
var HAS_NATIVE_TA = typeof document.head.style.touchAction === 'string';
var GESTURE_KEY = '__polymerGestures';
var HANDLED_OBJ = '__polymerGesturesHandled';
var TOUCH_ACTION = '__polymerGesturesTouchAction';
var TAP_DISTANCE = 25;
var TRACK_DISTANCE = 5;
var TRACK_LENGTH = 2;
var MOUSE_TIMEOUT = 2500;
var MOUSE_EVENTS = [
'mousedown',
'mousemove',
'mouseup',
'click'
];
var MOUSE_WHICH_TO_BUTTONS = [
0,
1,
4,
2
];
var MOUSE_HAS_BUTTONS = function () {
try {
return new MouseEvent('test', { buttons: 1 }).buttons === 1;
} catch (e) {
return false;
}
}();
var IS_TOUCH_ONLY = navigator.userAgent.match(/iP(?:[oa]d|hone)|Android/);
var mouseCanceller = function (mouseEvent) {
mouseEvent[HANDLED_OBJ] = { skip: true };
if (mouseEvent.type === 'click') {
var path = Polymer.dom(mouseEvent).path;
for (var i = 0; i < path.length; i++) {
if (path[i] === POINTERSTATE.mouse.target) {
return;
}
}
mouseEvent.preventDefault();
mouseEvent.stopPropagation();
}
};
function setupTeardownMouseCanceller(setup) {
for (var i = 0, en; i < MOUSE_EVENTS.length; i++) {
en = MOUSE_EVENTS[i];
if (setup) {
document.addEventListener(en, mouseCanceller, true);
} else {
document.removeEventListener(en, mouseCanceller, true);
}
}
}
function ignoreMouse() {
if (IS_TOUCH_ONLY) {
return;
}
if (!POINTERSTATE.mouse.mouseIgnoreJob) {
setupTeardownMouseCanceller(true);
}
var unset = function () {
setupTeardownMouseCanceller();
POINTERSTATE.mouse.target = null;
POINTERSTATE.mouse.mouseIgnoreJob = null;
};
POINTERSTATE.mouse.mouseIgnoreJob = Polymer.Debounce(POINTERSTATE.mouse.mouseIgnoreJob, unset, MOUSE_TIMEOUT);
}
function hasLeftMouseButton(ev) {
var type = ev.type;
if (MOUSE_EVENTS.indexOf(type) === -1) {
return false;
}
if (type === 'mousemove') {
var buttons = ev.buttons === undefined ? 1 : ev.buttons;
if (ev instanceof window.MouseEvent && !MOUSE_HAS_BUTTONS) {
buttons = MOUSE_WHICH_TO_BUTTONS[ev.which] || 0;
}
return Boolean(buttons & 1);
} else {
var button = ev.button === undefined ? 0 : ev.button;
return button === 0;
}
}
function isSyntheticClick(ev) {
if (ev.type === 'click') {
if (ev.detail === 0) {
return true;
}
var t = Gestures.findOriginalTarget(ev);
var bcr = t.getBoundingClientRect();
var x = ev.pageX, y = ev.pageY;
return !(x >= bcr.left && x <= bcr.right && (y >= bcr.top && y <= bcr.bottom));
}
return false;
}
var POINTERSTATE = {
mouse: {
target: null,
mouseIgnoreJob: null
},
touch: {
x: 0,
y: 0,
id: -1,
scrollDecided: false
}
};
function firstTouchAction(ev) {
var path = Polymer.dom(ev).path;
var ta = 'auto';
for (var i = 0, n; i < path.length; i++) {
n = path[i];
if (n[TOUCH_ACTION]) {
ta = n[TOUCH_ACTION];
break;
}
}
return ta;
}
function trackDocument(stateObj, movefn, upfn) {
stateObj.movefn = movefn;
stateObj.upfn = upfn;
document.addEventListener('mousemove', movefn);
document.addEventListener('mouseup', upfn);
}
function untrackDocument(stateObj) {
document.removeEventListener('mousemove', stateObj.movefn);
document.removeEventListener('mouseup', stateObj.upfn);
stateObj.movefn = null;
stateObj.upfn = null;
}
var Gestures = {
gestures: {},
recognizers: [],
deepTargetFind: function (x, y) {
var node = document.elementFromPoint(x, y);
var next = node;
while (next && next.shadowRoot) {
next = next.shadowRoot.elementFromPoint(x, y);
if (next) {
node = next;
}
}
return node;
},
findOriginalTarget: function (ev) {
if (ev.path) {
return ev.path[0];
}
return ev.target;
},
handleNative: function (ev) {
var handled;
var type = ev.type;
var node = wrap(ev.currentTarget);
var gobj = node[GESTURE_KEY];
if (!gobj) {
return;
}
var gs = gobj[type];
if (!gs) {
return;
}
if (!ev[HANDLED_OBJ]) {
ev[HANDLED_OBJ] = {};
if (type.slice(0, 5) === 'touch') {
var t = ev.changedTouches[0];
if (type === 'touchstart') {
if (ev.touches.length === 1) {
POINTERSTATE.touch.id = t.identifier;
}
}
if (POINTERSTATE.touch.id !== t.identifier) {
return;
}
if (!HAS_NATIVE_TA) {
if (type === 'touchstart' || type === 'touchmove') {
Gestures.handleTouchAction(ev);
}
}
if (type === 'touchend' && !ev.__polymerSimulatedTouch) {
POINTERSTATE.mouse.target = Polymer.dom(ev).rootTarget;
ignoreMouse(true);
}
}
}
handled = ev[HANDLED_OBJ];
if (handled.skip) {
return;
}
var recognizers = Gestures.recognizers;
for (var i = 0, r; i < recognizers.length; i++) {
r = recognizers[i];
if (gs[r.name] && !handled[r.name]) {
if (r.flow && r.flow.start.indexOf(ev.type) > -1 && r.reset) {
r.reset();
}
}
}
for (i = 0, r; i < recognizers.length; i++) {
r = recognizers[i];
if (gs[r.name] && !handled[r.name]) {
handled[r.name] = true;
r[type](ev);
}
}
},
handleTouchAction: function (ev) {
var t = ev.changedTouches[0];
var type = ev.type;
if (type === 'touchstart') {
POINTERSTATE.touch.x = t.clientX;
POINTERSTATE.touch.y = t.clientY;
POINTERSTATE.touch.scrollDecided = false;
} else if (type === 'touchmove') {
if (POINTERSTATE.touch.scrollDecided) {
return;
}
POINTERSTATE.touch.scrollDecided = true;
var ta = firstTouchAction(ev);
var prevent = false;
var dx = Math.abs(POINTERSTATE.touch.x - t.clientX);
var dy = Math.abs(POINTERSTATE.touch.y - t.clientY);
if (!ev.cancelable) {
} else if (ta === 'none') {
prevent = true;
} else if (ta === 'pan-x') {
prevent = dy > dx;
} else if (ta === 'pan-y') {
prevent = dx > dy;
}
if (prevent) {
ev.preventDefault();
} else {
Gestures.prevent('track');
}
}
},
add: function (node, evType, handler) {
node = wrap(node);
var recognizer = this.gestures[evType];
var deps = recognizer.deps;
var name = recognizer.name;
var gobj = node[GESTURE_KEY];
if (!gobj) {
node[GESTURE_KEY] = gobj = {};
}
for (var i = 0, dep, gd; i < deps.length; i++) {
dep = deps[i];
if (IS_TOUCH_ONLY && MOUSE_EVENTS.indexOf(dep) > -1) {
continue;
}
gd = gobj[dep];
if (!gd) {
gobj[dep] = gd = { _count: 0 };
}
if (gd._count === 0) {
node.addEventListener(dep, this.handleNative);
}
gd[name] = (gd[name] || 0) + 1;
gd._count = (gd._count || 0) + 1;
}
node.addEventListener(evType, handler);
if (recognizer.touchAction) {
this.setTouchAction(node, recognizer.touchAction);
}
},
remove: function (node, evType, handler) {
node = wrap(node);
var recognizer = this.gestures[evType];
var deps = recognizer.deps;
var name = recognizer.name;
var gobj = node[GESTURE_KEY];
if (gobj) {
for (var i = 0, dep, gd; i < deps.length; i++) {
dep = deps[i];
gd = gobj[dep];
if (gd && gd[name]) {
gd[name] = (gd[name] || 1) - 1;
gd._count = (gd._count || 1) - 1;
if (gd._count === 0) {
node.removeEventListener(dep, this.handleNative);
}
}
}
}
node.removeEventListener(evType, handler);
},
register: function (recog) {
this.recognizers.push(recog);
for (var i = 0; i < recog.emits.length; i++) {
this.gestures[recog.emits[i]] = recog;
}
},
findRecognizerByEvent: function (evName) {
for (var i = 0, r; i < this.recognizers.length; i++) {
r = this.recognizers[i];
for (var j = 0, n; j < r.emits.length; j++) {
n = r.emits[j];
if (n === evName) {
return r;
}
}
}
return null;
},
setTouchAction: function (node, value) {
if (HAS_NATIVE_TA) {
node.style.touchAction = value;
}
node[TOUCH_ACTION] = value;
},
fire: function (target, type, detail) {
var ev = Polymer.Base.fire(type, detail, {
node: target,
bubbles: true,
cancelable: true
});
if (ev.defaultPrevented) {
var se = detail.sourceEvent;
if (se && se.preventDefault) {
se.preventDefault();
}
}
},
prevent: function (evName) {
var recognizer = this.findRecognizerByEvent(evName);
if (recognizer.info) {
recognizer.info.prevent = true;
}
}
};
Gestures.register({
name: 'downup',
deps: [
'mousedown',
'touchstart',
'touchend'
],
flow: {
start: [
'mousedown',
'touchstart'
],
end: [
'mouseup',
'touchend'
]
},
emits: [
'down',
'up'
],
info: {
movefn: null,
upfn: null
},
reset: function () {
untrackDocument(this.info);
},
mousedown: function (e) {
if (!hasLeftMouseButton(e)) {
return;
}
var t = Gestures.findOriginalTarget(e);
var self = this;
var movefn = function movefn(e) {
if (!hasLeftMouseButton(e)) {
self.fire('up', t, e);
untrackDocument(self.info);
}
};
var upfn = function upfn(e) {
if (hasLeftMouseButton(e)) {
self.fire('up', t, e);
}
untrackDocument(self.info);
};
trackDocument(this.info, movefn, upfn);
this.fire('down', t, e);
},
touchstart: function (e) {
this.fire('down', Gestures.findOriginalTarget(e), e.changedTouches[0]);
},
touchend: function (e) {
this.fire('up', Gestures.findOriginalTarget(e), e.changedTouches[0]);
},
fire: function (type, target, event) {
Gestures.fire(target, type, {
x: event.clientX,
y: event.clientY,
sourceEvent: event,
prevent: function (e) {
return Gestures.prevent(e);
}
});
}
});
Gestures.register({
name: 'track',
touchAction: 'none',
deps: [
'mousedown',
'touchstart',
'touchmove',
'touchend'
],
flow: {
start: [
'mousedown',
'touchstart'
],
end: [
'mouseup',
'touchend'
]
},
emits: ['track'],
info: {
x: 0,
y: 0,
state: 'start',
started: false,
moves: [],
addMove: function (move) {
if (this.moves.length > TRACK_LENGTH) {
this.moves.shift();
}
this.moves.push(move);
},
movefn: null,
upfn: null,
prevent: false
},
reset: function () {
this.info.state = 'start';
this.info.started = false;
this.info.moves = [];
this.info.x = 0;
this.info.y = 0;
this.info.prevent = false;
untrackDocument(this.info);
},
hasMovedEnough: function (x, y) {
if (this.info.prevent) {
return false;
}
if (this.info.started) {
return true;
}
var dx = Math.abs(this.info.x - x);
var dy = Math.abs(this.info.y - y);
return dx >= TRACK_DISTANCE || dy >= TRACK_DISTANCE;
},
mousedown: function (e) {
if (!hasLeftMouseButton(e)) {
return;
}
var t = Gestures.findOriginalTarget(e);
var self = this;
var movefn = function movefn(e) {
var x = e.clientX, y = e.clientY;
if (self.hasMovedEnough(x, y)) {
self.info.state = self.info.started ? e.type === 'mouseup' ? 'end' : 'track' : 'start';
if (self.info.state === 'start') {
Gestures.prevent('tap');
}
self.info.addMove({
x: x,
y: y
});
if (!hasLeftMouseButton(e)) {
self.info.state = 'end';
untrackDocument(self.info);
}
self.fire(t, e);
self.info.started = true;
}
};
var upfn = function upfn(e) {
if (self.info.started) {
movefn(e);
}
untrackDocument(self.info);
};
trackDocument(this.info, movefn, upfn);
this.info.x = e.clientX;
this.info.y = e.clientY;
},
touchstart: function (e) {
var ct = e.changedTouches[0];
this.info.x = ct.clientX;
this.info.y = ct.clientY;
},
touchmove: function (e) {
var t = Gestures.findOriginalTarget(e);
var ct = e.changedTouches[0];
var x = ct.clientX, y = ct.clientY;
if (this.hasMovedEnough(x, y)) {
if (this.info.state === 'start') {
Gestures.prevent('tap');
}
this.info.addMove({
x: x,
y: y
});
this.fire(t, ct);
this.info.state = 'track';
this.info.started = true;
}
},
touchend: function (e) {
var t = Gestures.findOriginalTarget(e);
var ct = e.changedTouches[0];
if (this.info.started) {
this.info.state = 'end';
this.info.addMove({
x: ct.clientX,
y: ct.clientY
});
this.fire(t, ct);
}
},
fire: function (target, touch) {
var secondlast = this.info.moves[this.info.moves.length - 2];
var lastmove = this.info.moves[this.info.moves.length - 1];
var dx = lastmove.x - this.info.x;
var dy = lastmove.y - this.info.y;
var ddx, ddy = 0;
if (secondlast) {
ddx = lastmove.x - secondlast.x;
ddy = lastmove.y - secondlast.y;
}
return Gestures.fire(target, 'track', {
state: this.info.state,
x: touch.clientX,
y: touch.clientY,
dx: dx,
dy: dy,
ddx: ddx,
ddy: ddy,
sourceEvent: touch,
hover: function () {
return Gestures.deepTargetFind(touch.clientX, touch.clientY);
}
});
}
});
Gestures.register({
name: 'tap',
deps: [
'mousedown',
'click',
'touchstart',
'touchend'
],
flow: {
start: [
'mousedown',
'touchstart'
],
end: [
'click',
'touchend'
]
},
emits: ['tap'],
info: {
x: NaN,
y: NaN,
prevent: false
},
reset: function () {
this.info.x = NaN;
this.info.y = NaN;
this.info.prevent = false;
},
save: function (e) {
this.info.x = e.clientX;
this.info.y = e.clientY;
},
mousedown: function (e) {
if (hasLeftMouseButton(e)) {
this.save(e);
}
},
click: function (e) {
if (hasLeftMouseButton(e)) {
this.forward(e);
}
},
touchstart: function (e) {
this.save(e.changedTouches[0]);
},
touchend: function (e) {
this.forward(e.changedTouches[0]);
},
forward: function (e) {
var dx = Math.abs(e.clientX - this.info.x);
var dy = Math.abs(e.clientY - this.info.y);
var t = Gestures.findOriginalTarget(e);
if (isNaN(dx) || isNaN(dy) || dx <= TAP_DISTANCE && dy <= TAP_DISTANCE || isSyntheticClick(e)) {
if (!this.info.prevent) {
Gestures.fire(t, 'tap', {
x: e.clientX,
y: e.clientY,
sourceEvent: e
});
}
}
}
});
var DIRECTION_MAP = {
x: 'pan-x',
y: 'pan-y',
none: 'none',
all: 'auto'
};
Polymer.Base._addFeature({
_setupGestures: function () {
this.__polymerGestures = null;
},
_listen: function (node, eventName, handler) {
if (Gestures.gestures[eventName]) {
Gestures.add(node, eventName, handler);
} else {
node.addEventListener(eventName, handler);
}
},
_unlisten: function (node, eventName, handler) {
if (Gestures.gestures[eventName]) {
Gestures.remove(node, eventName, handler);
} else {
node.removeEventListener(eventName, handler);
}
},
setScrollDirection: function (direction, node) {
node = node || this;
Gestures.setTouchAction(node, DIRECTION_MAP[direction] || 'auto');
}
});
Polymer.Gestures = Gestures;
}());
Polymer.Base._addFeature({
$$: function (slctr) {
return Polymer.dom(this.root).querySelector(slctr);
},
toggleClass: function (name, bool, node) {
node = node || this;
if (arguments.length == 1) {
bool = !node.classList.contains(name);
}
if (bool) {
Polymer.dom(node).classList.add(name);
} else {
Polymer.dom(node).classList.remove(name);
}
},
toggleAttribute: function (name, bool, node) {
node = node || this;
if (arguments.length == 1) {
bool = !node.hasAttribute(name);
}
if (bool) {
Polymer.dom(node).setAttribute(name, '');
} else {
Polymer.dom(node).removeAttribute(name);
}
},
classFollows: function (name, toElement, fromElement) {
if (fromElement) {
Polymer.dom(fromElement).classList.remove(name);
}
if (toElement) {
Polymer.dom(toElement).classList.add(name);
}
},
attributeFollows: function (name, toElement, fromElement) {
if (fromElement) {
Polymer.dom(fromElement).removeAttribute(name);
}
if (toElement) {
Polymer.dom(toElement).setAttribute(name, '');
}
},
getEffectiveChildNodes: function () {
return Polymer.dom(this).getEffectiveChildNodes();
},
getEffectiveChildren: function () {
var list = Polymer.dom(this).getEffectiveChildNodes();
return list.filter(function (n) {
return n.nodeType === Node.ELEMENT_NODE;
});
},
getEffectiveTextContent: function () {
var cn = this.getEffectiveChildNodes();
var tc = [];
for (var i = 0, c; c = cn[i]; i++) {
if (c.nodeType !== Node.COMMENT_NODE) {
tc.push(Polymer.dom(c).textContent);
}
}
return tc.join('');
},
queryEffectiveChildren: function (slctr) {
var e$ = Polymer.dom(this).queryDistributedElements(slctr);
return e$ && e$[0];
},
queryAllEffectiveChildren: function (slctr) {
return Polymer.dom(this).queryDistributedElements(slctr);
},
getContentChildNodes: function (slctr) {
var content = Polymer.dom(this.root).querySelector(slctr || 'content');
return content ? Polymer.dom(content).getDistributedNodes() : [];
},
getContentChildren: function (slctr) {
return this.getContentChildNodes(slctr).filter(function (n) {
return n.nodeType === Node.ELEMENT_NODE;
});
},
fire: function (type, detail, options) {
options = options || Polymer.nob;
var node = options.node || this;
detail = detail === null || detail === undefined ? {} : detail;
var bubbles = options.bubbles === undefined ? true : options.bubbles;
var cancelable = Boolean(options.cancelable);
var useCache = options._useCache;
var event = this._getEvent(type, bubbles, cancelable, useCache);
event.detail = detail;
if (useCache) {
this.__eventCache[type] = null;
}
node.dispatchEvent(event);
if (useCache) {
this.__eventCache[type] = event;
}
return event;
},
__eventCache: {},
_getEvent: function (type, bubbles, cancelable, useCache) {
var event = useCache && this.__eventCache[type];
if (!event || (event.bubbles != bubbles || event.cancelable != cancelable)) {
event = new Event(type, {
bubbles: Boolean(bubbles),
cancelable: cancelable
});
}
return event;
},
async: function (callback, waitTime) {
var self = this;
return Polymer.Async.run(function () {
callback.call(self);
}, waitTime);
},
cancelAsync: function (handle) {
Polymer.Async.cancel(handle);
},
arrayDelete: function (path, item) {
var index;
if (Array.isArray(path)) {
index = path.indexOf(item);
if (index >= 0) {
return path.splice(index, 1);
}
} else {
var arr = this._get(path);
index = arr.indexOf(item);
if (index >= 0) {
return this.splice(path, index, 1);
}
}
},
transform: function (transform, node) {
node = node || this;
node.style.webkitTransform = transform;
node.style.transform = transform;
},
translate3d: function (x, y, z, node) {
node = node || this;
this.transform('translate3d(' + x + ',' + y + ',' + z + ')', node);
},
importHref: function (href, onload, onerror, optAsync) {
var l = document.createElement('link');
l.rel = 'import';
l.href = href;
optAsync = Boolean(optAsync);
if (optAsync) {
l.setAttribute('async', '');
}
var self = this;
if (onload) {
l.onload = function (e) {
return onload.call(self, e);
};
}
if (onerror) {
l.onerror = function (e) {
return onerror.call(self, e);
};
}
document.head.appendChild(l);
return l;
},
create: function (tag, props) {
var elt = document.createElement(tag);
if (props) {
for (var n in props) {
elt[n] = props[n];
}
}
return elt;
},
isLightDescendant: function (node) {
return this !== node && this.contains(node) && Polymer.dom(this).getOwnerRoot() === Polymer.dom(node).getOwnerRoot();
},
isLocalDescendant: function (node) {
return this.root === Polymer.dom(node).getOwnerRoot();
}
});
Polymer.Bind = {
_dataEventCache: {},
prepareModel: function (model) {
Polymer.Base.mixin(model, this._modelApi);
},
_modelApi: {
_notifyChange: function (source, event, value) {
value = value === undefined ? this[source] : value;
event = event || Polymer.CaseMap.camelToDashCase(source) + '-changed';
this.fire(event, { value: value }, {
bubbles: false,
cancelable: false,
_useCache: true
});
},
_propertySetter: function (property, value, effects, fromAbove) {
var old = this.__data__[property];
if (old !== value && (old === old || value === value)) {
this.__data__[property] = value;
if (typeof value == 'object') {
this._clearPath(property);
}
if (this._propertyChanged) {
this._propertyChanged(property, value, old);
}
if (effects) {
this._effectEffects(property, value, effects, old, fromAbove);
}
}
return old;
},
__setProperty: function (property, value, quiet, node) {
node = node || this;
var effects = node._propertyEffects && node._propertyEffects[property];
if (effects) {
node._propertySetter(property, value, effects, quiet);
} else {
node[property] = value;
}
},
_effectEffects: function (property, value, effects, old, fromAbove) {
for (var i = 0, l = effects.length, fx; i < l && (fx = effects[i]); i++) {
fx.fn.call(this, property, value, fx.effect, old, fromAbove);
}
},
_clearPath: function (path) {
for (var prop in this.__data__) {
if (prop.indexOf(path + '.') === 0) {
this.__data__[prop] = undefined;
}
}
}
},
ensurePropertyEffects: function (model, property) {
if (!model._propertyEffects) {
model._propertyEffects = {};
}
var fx = model._propertyEffects[property];
if (!fx) {
fx = model._propertyEffects[property] = [];
}
return fx;
},
addPropertyEffect: function (model, property, kind, effect) {
var fx = this.ensurePropertyEffects(model, property);
var propEffect = {
kind: kind,
effect: effect,
fn: Polymer.Bind['_' + kind + 'Effect']
};
fx.push(propEffect);
return propEffect;
},
createBindings: function (model) {
var fx$ = model._propertyEffects;
if (fx$) {
for (var n in fx$) {
var fx = fx$[n];
fx.sort(this._sortPropertyEffects);
this._createAccessors(model, n, fx);
}
}
},
_sortPropertyEffects: function () {
var EFFECT_ORDER = {
'compute': 0,
'annotation': 1,
'annotatedComputation': 2,
'reflect': 3,
'notify': 4,
'observer': 5,
'complexObserver': 6,
'function': 7
};
return function (a, b) {
return EFFECT_ORDER[a.kind] - EFFECT_ORDER[b.kind];
};
}(),
_createAccessors: function (model, property, effects) {
var defun = {
get: function () {
return this.__data__[property];
}
};
var setter = function (value) {
this._propertySetter(property, value, effects);
};
var info = model.getPropertyInfo && model.getPropertyInfo(property);
if (info && info.readOnly) {
if (!info.computed) {
model['_set' + this.upper(property)] = setter;
}
} else {
defun.set = setter;
}
Object.defineProperty(model, property, defun);
},
upper: function (name) {
return name[0].toUpperCase() + name.substring(1);
},
_addAnnotatedListener: function (model, index, property, path, event, negated) {
if (!model._bindListeners) {
model._bindListeners = [];
}
var fn = this._notedListenerFactory(property, path, this._isStructured(path), negated);
var eventName = event || Polymer.CaseMap.camelToDashCase(property) + '-changed';
model._bindListeners.push({
index: index,
property: property,
path: path,
changedFn: fn,
event: eventName
});
},
_isStructured: function (path) {
return path.indexOf('.') > 0;
},
_isEventBogus: function (e, target) {
return e.path && e.path[0] !== target;
},
_notedListenerFactory: function (property, path, isStructured, negated) {
return function (target, value, targetPath) {
if (targetPath) {
this._notifyPath(this._fixPath(path, property, targetPath), value);
} else {
value = target[property];
if (negated) {
value = !value;
}
if (!isStructured) {
this[path] = value;
} else {
if (this.__data__[path] != value) {
this.set(path, value);
}
}
}
};
},
prepareInstance: function (inst) {
inst.__data__ = Object.create(null);
},
setupBindListeners: function (inst) {
var b$ = inst._bindListeners;
for (var i = 0, l = b$.length, info; i < l && (info = b$[i]); i++) {
var node = inst._nodes[info.index];
this._addNotifyListener(node, inst, info.event, info.changedFn);
}
},
_addNotifyListener: function (element, context, event, changedFn) {
element.addEventListener(event, function (e) {
return context._notifyListener(changedFn, e);
});
}
};
Polymer.Base.extend(Polymer.Bind, {
_shouldAddListener: function (effect) {
return effect.name && effect.kind != 'attribute' && effect.kind != 'text' && !effect.isCompound && effect.parts[0].mode === '{';
},
_annotationEffect: function (source, value, effect) {
if (source != effect.value) {
value = this._get(effect.value);
this.__data__[effect.value] = value;
}
var calc = effect.negate ? !value : value;
if (!effect.customEvent || this._nodes[effect.index][effect.name] !== calc) {
return this._applyEffectValue(effect, calc);
}
},
_reflectEffect: function (source, value, effect) {
this.reflectPropertyToAttribute(source, effect.attribute, value);
},
_notifyEffect: function (source, value, effect, old, fromAbove) {
if (!fromAbove) {
this._notifyChange(source, effect.event, value);
}
},
_functionEffect: function (source, value, fn, old, fromAbove) {
fn.call(this, source, value, old, fromAbove);
},
_observerEffect: function (source, value, effect, old) {
var fn = this[effect.method];
if (fn) {
fn.call(this, value, old);
} else {
this._warn(this._logf('_observerEffect', 'observer method `' + effect.method + '` not defined'));
}
},
_complexObserverEffect: function (source, value, effect) {
var fn = this[effect.method];
if (fn) {
var args = Polymer.Bind._marshalArgs(this.__data__, effect, source, value);
if (args) {
fn.apply(this, args);
}
} else if (effect.dynamicFn) {
} else {
this._warn(this._logf('_complexObserverEffect', 'observer method `' + effect.method + '` not defined'));
}
},
_computeEffect: function (source, value, effect) {
var fn = this[effect.method];
if (fn) {
var args = Polymer.Bind._marshalArgs(this.__data__, effect, source, value);
if (args) {
var computedvalue = fn.apply(this, args);
this.__setProperty(effect.name, computedvalue);
}
} else if (effect.dynamicFn) {
} else {
this._warn(this._logf('_computeEffect', 'compute method `' + effect.method + '` not defined'));
}
},
_annotatedComputationEffect: function (source, value, effect) {
var computedHost = this._rootDataHost || this;
var fn = computedHost[effect.method];
if (fn) {
var args = Polymer.Bind._marshalArgs(this.__data__, effect, source, value);
if (args) {
var computedvalue = fn.apply(computedHost, args);
if (effect.negate) {
computedvalue = !computedvalue;
}
this._applyEffectValue(effect, computedvalue);
}
} else if (effect.dynamicFn) {
} else {
computedHost._warn(computedHost._logf('_annotatedComputationEffect', 'compute method `' + effect.method + '` not defined'));
}
},
_marshalArgs: function (model, effect, path, value) {
var values = [];
var args = effect.args;
var bailoutEarly = args.length > 1 || effect.dynamicFn;
for (var i = 0, l = args.length; i < l; i++) {
var arg = args[i];
var name = arg.name;
var v;
if (arg.literal) {
v = arg.value;
} else if (arg.structured) {
v = Polymer.Base._get(name, model);
} else {
v = model[name];
}
if (bailoutEarly && v === undefined) {
return;
}
if (arg.wildcard) {
var baseChanged = name.indexOf(path + '.') === 0;
var matches = effect.trigger.name.indexOf(name) === 0 && !baseChanged;
values[i] = {
path: matches ? path : name,
value: matches ? value : v,
base: v
};
} else {
values[i] = v;
}
}
return values;
}
});
Polymer.Base._addFeature({
_addPropertyEffect: function (property, kind, effect) {
var prop = Polymer.Bind.addPropertyEffect(this, property, kind, effect);
prop.pathFn = this['_' + prop.kind + 'PathEffect'];
},
_prepEffects: function () {
Polymer.Bind.prepareModel(this);
this._addAnnotationEffects(this._notes);
},
_prepBindings: function () {
Polymer.Bind.createBindings(this);
},
_addPropertyEffects: function (properties) {
if (properties) {
for (var p in properties) {
var prop = properties[p];
if (prop.observer) {
this._addObserverEffect(p, prop.observer);
}
if (prop.computed) {
prop.readOnly = true;
this._addComputedEffect(p, prop.computed);
}
if (prop.notify) {
this._addPropertyEffect(p, 'notify', { event: Polymer.CaseMap.camelToDashCase(p) + '-changed' });
}
if (prop.reflectToAttribute) {
var attr = Polymer.CaseMap.camelToDashCase(p);
if (attr[0] === '-') {
this._warn(this._logf('_addPropertyEffects', 'Property ' + p + ' cannot be reflected to attribute ' + attr + ' because "-" is not a valid starting attribute name. Use a lowercase first letter for the property instead.'));
} else {
this._addPropertyEffect(p, 'reflect', { attribute: attr });
}
}
if (prop.readOnly) {
Polymer.Bind.ensurePropertyEffects(this, p);
}
}
}
},
_addComputedEffect: function (name, expression) {
var sig = this._parseMethod(expression);
var dynamicFn = sig.dynamicFn;
for (var i = 0, arg; i < sig.args.length && (arg = sig.args[i]); i++) {
this._addPropertyEffect(arg.model, 'compute', {
method: sig.method,
args: sig.args,
trigger: arg,
name: name,
dynamicFn: dynamicFn
});
}
if (dynamicFn) {
this._addPropertyEffect(sig.method, 'compute', {
method: sig.method,
args: sig.args,
trigger: null,
name: name,
dynamicFn: dynamicFn
});
}
},
_addObserverEffect: function (property, observer) {
this._addPropertyEffect(property, 'observer', {
method: observer,
property: property
});
},
_addComplexObserverEffects: function (observers) {
if (observers) {
for (var i = 0, o; i < observers.length && (o = observers[i]); i++) {
this._addComplexObserverEffect(o);
}
}
},
_addComplexObserverEffect: function (observer) {
var sig = this._parseMethod(observer);
if (!sig) {
throw new Error('Malformed observer expression \'' + observer + '\'');
}
var dynamicFn = sig.dynamicFn;
for (var i = 0, arg; i < sig.args.length && (arg = sig.args[i]); i++) {
this._addPropertyEffect(arg.model, 'complexObserver', {
method: sig.method,
args: sig.args,
trigger: arg,
dynamicFn: dynamicFn
});
}
if (dynamicFn) {
this._addPropertyEffect(sig.method, 'complexObserver', {
method: sig.method,
args: sig.args,
trigger: null,
dynamicFn: dynamicFn
});
}
},
_addAnnotationEffects: function (notes) {
for (var i = 0, note; i < notes.length && (note = notes[i]); i++) {
var b$ = note.bindings;
for (var j = 0, binding; j < b$.length && (binding = b$[j]); j++) {
this._addAnnotationEffect(binding, i);
}
}
},
_addAnnotationEffect: function (note, index) {
if (Polymer.Bind._shouldAddListener(note)) {
Polymer.Bind._addAnnotatedListener(this, index, note.name, note.parts[0].value, note.parts[0].event, note.parts[0].negate);
}
for (var i = 0; i < note.parts.length; i++) {
var part = note.parts[i];
if (part.signature) {
this._addAnnotatedComputationEffect(note, part, index);
} else if (!part.literal) {
if (note.kind === 'attribute' && note.name[0] === '-') {
this._warn(this._logf('_addAnnotationEffect', 'Cannot set attribute ' + note.name + ' because "-" is not a valid attribute starting character'));
} else {
this._addPropertyEffect(part.model, 'annotation', {
kind: note.kind,
index: index,
name: note.name,
propertyName: note.propertyName,
value: part.value,
isCompound: note.isCompound,
compoundIndex: part.compoundIndex,
event: part.event,
customEvent: part.customEvent,
negate: part.negate
});
}
}
}
},
_addAnnotatedComputationEffect: function (note, part, index) {
var sig = part.signature;
if (sig.static) {
this.__addAnnotatedComputationEffect('__static__', index, note, part, null);
} else {
for (var i = 0, arg; i < sig.args.length && (arg = sig.args[i]); i++) {
if (!arg.literal) {
this.__addAnnotatedComputationEffect(arg.model, index, note, part, arg);
}
}
if (sig.dynamicFn) {
this.__addAnnotatedComputationEffect(sig.method, index, note, part, null);
}
}
},
__addAnnotatedComputationEffect: function (property, index, note, part, trigger) {
this._addPropertyEffect(property, 'annotatedComputation', {
index: index,
isCompound: note.isCompound,
compoundIndex: part.compoundIndex,
kind: note.kind,
name: note.name,
negate: part.negate,
method: part.signature.method,
args: part.signature.args,
trigger: trigger,
dynamicFn: part.signature.dynamicFn
});
},
_parseMethod: function (expression) {
var m = expression.match(/([^\s]+?)\(([\s\S]*)\)/);
if (m) {
var sig = {
method: m[1],
static: true
};
if (this.getPropertyInfo(sig.method) !== Polymer.nob) {
sig.static = false;
sig.dynamicFn = true;
}
if (m[2].trim()) {
var args = m[2].replace(/\\,/g, '&comma;').split(',');
return this._parseArgs(args, sig);
} else {
sig.args = Polymer.nar;
return sig;
}
}
},
_parseArgs: function (argList, sig) {
sig.args = argList.map(function (rawArg) {
var arg = this._parseArg(rawArg);
if (!arg.literal) {
sig.static = false;
}
return arg;
}, this);
return sig;
},
_parseArg: function (rawArg) {
var arg = rawArg.trim().replace(/&comma;/g, ',').replace(/\\(.)/g, '$1');
var a = { name: arg };
var fc = arg[0];
if (fc === '-') {
fc = arg[1];
}
if (fc >= '0' && fc <= '9') {
fc = '#';
}
switch (fc) {
case '\'':
case '"':
a.value = arg.slice(1, -1);
a.literal = true;
break;
case '#':
a.value = Number(arg);
a.literal = true;
break;
}
if (!a.literal) {
a.model = this._modelForPath(arg);
a.structured = arg.indexOf('.') > 0;
if (a.structured) {
a.wildcard = arg.slice(-2) == '.*';
if (a.wildcard) {
a.name = arg.slice(0, -2);
}
}
}
return a;
},
_marshalInstanceEffects: function () {
Polymer.Bind.prepareInstance(this);
if (this._bindListeners) {
Polymer.Bind.setupBindListeners(this);
}
},
_applyEffectValue: function (info, value) {
var node = this._nodes[info.index];
var property = info.name;
if (info.isCompound) {
var storage = node.__compoundStorage__[property];
storage[info.compoundIndex] = value;
value = storage.join('');
}
if (info.kind == 'attribute') {
this.serializeValueToAttribute(value, property, node);
} else {
if (property === 'className') {
value = this._scopeElementClass(node, value);
}
if (property === 'textContent' || node.localName == 'input' && property == 'value') {
value = value == undefined ? '' : value;
}
var pinfo;
if (!node._propertyInfo || !(pinfo = node._propertyInfo[property]) || !pinfo.readOnly) {
this.__setProperty(property, value, false, node);
}
}
},
_executeStaticEffects: function () {
if (this._propertyEffects && this._propertyEffects.__static__) {
this._effectEffects('__static__', null, this._propertyEffects.__static__);
}
}
});
(function () {
var usePolyfillProto = Polymer.Settings.usePolyfillProto;
Polymer.Base._addFeature({
_setupConfigure: function (initialConfig) {
this._config = {};
this._handlers = [];
this._aboveConfig = null;
if (initialConfig) {
for (var i in initialConfig) {
if (initialConfig[i] !== undefined) {
this._config[i] = initialConfig[i];
}
}
}
},
_marshalAttributes: function () {
this._takeAttributesToModel(this._config);
},
_attributeChangedImpl: function (name) {
var model = this._clientsReadied ? this : this._config;
this._setAttributeToProperty(model, name);
},
_configValue: function (name, value) {
var info = this._propertyInfo[name];
if (!info || !info.readOnly) {
this._config[name] = value;
}
},
_beforeClientsReady: function () {
this._configure();
},
_configure: function () {
this._configureAnnotationReferences();
this._aboveConfig = this.mixin({}, this._config);
var config = {};
for (var i = 0; i < this.behaviors.length; i++) {
this._configureProperties(this.behaviors[i].properties, config);
}
this._configureProperties(this.properties, config);
this.mixin(config, this._aboveConfig);
this._config = config;
if (this._clients && this._clients.length) {
this._distributeConfig(this._config);
}
},
_configureProperties: function (properties, config) {
for (var i in properties) {
var c = properties[i];
if (!usePolyfillProto && this.hasOwnProperty(i) && this._propertyEffects && this._propertyEffects[i]) {
config[i] = this[i];
delete this[i];
} else if (c.value !== undefined) {
var value = c.value;
if (typeof value == 'function') {
value = value.call(this, this._config);
}
config[i] = value;
}
}
},
_distributeConfig: function (config) {
var fx$ = this._propertyEffects;
if (fx$) {
for (var p in config) {
var fx = fx$[p];
if (fx) {
for (var i = 0, l = fx.length, x; i < l && (x = fx[i]); i++) {
if (x.kind === 'annotation' && !x.isCompound) {
var node = this._nodes[x.effect.index];
var name = x.effect.propertyName;
var isAttr = x.effect.kind == 'attribute';
var hasEffect = node._propertyEffects && node._propertyEffects[name];
if (node._configValue && (hasEffect || !isAttr)) {
var value = p === x.effect.value ? config[p] : this._get(x.effect.value, config);
if (isAttr) {
value = node.deserialize(this.serialize(value), node._propertyInfo[name].type);
}
node._configValue(name, value);
}
}
}
}
}
}
},
_afterClientsReady: function () {
this._executeStaticEffects();
this._applyConfig(this._config, this._aboveConfig);
this._flushHandlers();
},
_applyConfig: function (config, aboveConfig) {
for (var n in config) {
if (this[n] === undefined) {
this.__setProperty(n, config[n], n in aboveConfig);
}
}
},
_notifyListener: function (fn, e) {
if (!Polymer.Bind._isEventBogus(e, e.target)) {
var value, path;
if (e.detail) {
value = e.detail.value;
path = e.detail.path;
}
if (!this._clientsReadied) {
this._queueHandler([
fn,
e.target,
value,
path
]);
} else {
return fn.call(this, e.target, value, path);
}
}
},
_queueHandler: function (args) {
this._handlers.push(args);
},
_flushHandlers: function () {
var h$ = this._handlers;
for (var i = 0, l = h$.length, h; i < l && (h = h$[i]); i++) {
h[0].call(this, h[1], h[2], h[3]);
}
this._handlers = [];
}
});
}());
(function () {
'use strict';
Polymer.Base._addFeature({
notifyPath: function (path, value, fromAbove) {
var info = {};
this._get(path, this, info);
if (info.path) {
this._notifyPath(info.path, value, fromAbove);
}
},
_notifyPath: function (path, value, fromAbove) {
var old = this._propertySetter(path, value);
if (old !== value && (old === old || value === value)) {
this._pathEffector(path, value);
if (!fromAbove) {
this._notifyPathUp(path, value);
}
return true;
}
},
_getPathParts: function (path) {
if (Array.isArray(path)) {
var parts = [];
for (var i = 0; i < path.length; i++) {
var args = path[i].toString().split('.');
for (var j = 0; j < args.length; j++) {
parts.push(args[j]);
}
}
return parts;
} else {
return path.toString().split('.');
}
},
set: function (path, value, root) {
var prop = root || this;
var parts = this._getPathParts(path);
var array;
var last = parts[parts.length - 1];
if (parts.length > 1) {
for (var i = 0; i < parts.length - 1; i++) {
var part = parts[i];
if (array && part[0] == '#') {
prop = Polymer.Collection.get(array).getItem(part);
} else {
prop = prop[part];
if (array && parseInt(part, 10) == part) {
parts[i] = Polymer.Collection.get(array).getKey(prop);
}
}
if (!prop) {
return;
}
array = Array.isArray(prop) ? prop : null;
}
if (array) {
var coll = Polymer.Collection.get(array);
var old, key;
if (last[0] == '#') {
key = last;
old = coll.getItem(key);
last = array.indexOf(old);
coll.setItem(key, value);
} else if (parseInt(last, 10) == last) {
old = prop[last];
key = coll.getKey(old);
parts[i] = key;
coll.setItem(key, value);
}
}
prop[last] = value;
if (!root) {
this._notifyPath(parts.join('.'), value);
}
} else {
prop[path] = value;
}
},
get: function (path, root) {
return this._get(path, root);
},
_get: function (path, root, info) {
var prop = root || this;
var parts = this._getPathParts(path);
var array;
for (var i = 0; i < parts.length; i++) {
if (!prop) {
return;
}
var part = parts[i];
if (array && part[0] == '#') {
prop = Polymer.Collection.get(array).getItem(part);
} else {
prop = prop[part];
if (info && array && parseInt(part, 10) == part) {
parts[i] = Polymer.Collection.get(array).getKey(prop);
}
}
array = Array.isArray(prop) ? prop : null;
}
if (info) {
info.path = parts.join('.');
}
return prop;
},
_pathEffector: function (path, value) {
var model = this._modelForPath(path);
var fx$ = this._propertyEffects && this._propertyEffects[model];
if (fx$) {
for (var i = 0, fx; i < fx$.length && (fx = fx$[i]); i++) {
var fxFn = fx.pathFn;
if (fxFn) {
fxFn.call(this, path, value, fx.effect);
}
}
}
if (this._boundPaths) {
this._notifyBoundPaths(path, value);
}
},
_annotationPathEffect: function (path, value, effect) {
if (effect.value === path || effect.value.indexOf(path + '.') === 0) {
Polymer.Bind._annotationEffect.call(this, path, value, effect);
} else if (path.indexOf(effect.value + '.') === 0 && !effect.negate) {
var node = this._nodes[effect.index];
if (node && node._notifyPath) {
var p = this._fixPath(effect.name, effect.value, path);
node._notifyPath(p, value, true);
}
}
},
_complexObserverPathEffect: function (path, value, effect) {
if (this._pathMatchesEffect(path, effect)) {
Polymer.Bind._complexObserverEffect.call(this, path, value, effect);
}
},
_computePathEffect: function (path, value, effect) {
if (this._pathMatchesEffect(path, effect)) {
Polymer.Bind._computeEffect.call(this, path, value, effect);
}
},
_annotatedComputationPathEffect: function (path, value, effect) {
if (this._pathMatchesEffect(path, effect)) {
Polymer.Bind._annotatedComputationEffect.call(this, path, value, effect);
}
},
_pathMatchesEffect: function (path, effect) {
var effectArg = effect.trigger.name;
return effectArg == path || effectArg.indexOf(path + '.') === 0 || effect.trigger.wildcard && path.indexOf(effectArg) === 0;
},
linkPaths: function (to, from) {
this._boundPaths = this._boundPaths || {};
if (from) {
this._boundPaths[to] = from;
} else {
this.unlinkPaths(to);
}
},
unlinkPaths: function (path) {
if (this._boundPaths) {
delete this._boundPaths[path];
}
},
_notifyBoundPaths: function (path, value) {
for (var a in this._boundPaths) {
var b = this._boundPaths[a];
if (path.indexOf(a + '.') == 0) {
this._notifyPath(this._fixPath(b, a, path), value);
} else if (path.indexOf(b + '.') == 0) {
this._notifyPath(this._fixPath(a, b, path), value);
}
}
},
_fixPath: function (property, root, path) {
return property + path.slice(root.length);
},
_notifyPathUp: function (path, value) {
var rootName = this._modelForPath(path);
var dashCaseName = Polymer.CaseMap.camelToDashCase(rootName);
var eventName = dashCaseName + this._EVENT_CHANGED;
this.fire(eventName, {
path: path,
value: value
}, {
bubbles: false,
_useCache: true
});
},
_modelForPath: function (path) {
var dot = path.indexOf('.');
return dot < 0 ? path : path.slice(0, dot);
},
_EVENT_CHANGED: '-changed',
notifySplices: function (path, splices) {
var info = {};
var array = this._get(path, this, info);
this._notifySplices(array, info.path, splices);
},
_notifySplices: function (array, path, splices) {
var change = {
keySplices: Polymer.Collection.applySplices(array, splices),
indexSplices: splices
};
if (!array.hasOwnProperty('splices')) {
Object.defineProperty(array, 'splices', {
configurable: true,
writable: true
});
}
array.splices = change;
this._notifyPath(path + '.splices', change);
this._notifyPath(path + '.length', array.length);
change.keySplices = null;
change.indexSplices = null;
},
_notifySplice: function (array, path, index, added, removed) {
this._notifySplices(array, path, [{
index: index,
addedCount: added,
removed: removed,
object: array,
type: 'splice'
}]);
},
push: function (path) {
var info = {};
var array = this._get(path, this, info);
var args = Array.prototype.slice.call(arguments, 1);
var len = array.length;
var ret = array.push.apply(array, args);
if (args.length) {
this._notifySplice(array, info.path, len, args.length, []);
}
return ret;
},
pop: function (path) {
var info = {};
var array = this._get(path, this, info);
var hadLength = Boolean(array.length);
var args = Array.prototype.slice.call(arguments, 1);
var ret = array.pop.apply(array, args);
if (hadLength) {
this._notifySplice(array, info.path, array.length, 0, [ret]);
}
return ret;
},
splice: function (path, start) {
var info = {};
var array = this._get(path, this, info);
if (start < 0) {
start = array.length - Math.floor(-start);
} else {
start = Math.floor(start);
}
if (!start) {
start = 0;
}
var args = Array.prototype.slice.call(arguments, 1);
var ret = array.splice.apply(array, args);
var addedCount = Math.max(args.length - 2, 0);
if (addedCount || ret.length) {
this._notifySplice(array, info.path, start, addedCount, ret);
}
return ret;
},
shift: function (path) {
var info = {};
var array = this._get(path, this, info);
var hadLength = Boolean(array.length);
var args = Array.prototype.slice.call(arguments, 1);
var ret = array.shift.apply(array, args);
if (hadLength) {
this._notifySplice(array, info.path, 0, 0, [ret]);
}
return ret;
},
unshift: function (path) {
var info = {};
var array = this._get(path, this, info);
var args = Array.prototype.slice.call(arguments, 1);
var ret = array.unshift.apply(array, args);
if (args.length) {
this._notifySplice(array, info.path, 0, args.length, []);
}
return ret;
},
prepareModelNotifyPath: function (model) {
this.mixin(model, {
fire: Polymer.Base.fire,
_getEvent: Polymer.Base._getEvent,
__eventCache: Polymer.Base.__eventCache,
notifyPath: Polymer.Base.notifyPath,
_get: Polymer.Base._get,
_EVENT_CHANGED: Polymer.Base._EVENT_CHANGED,
_notifyPath: Polymer.Base._notifyPath,
_notifyPathUp: Polymer.Base._notifyPathUp,
_pathEffector: Polymer.Base._pathEffector,
_annotationPathEffect: Polymer.Base._annotationPathEffect,
_complexObserverPathEffect: Polymer.Base._complexObserverPathEffect,
_annotatedComputationPathEffect: Polymer.Base._annotatedComputationPathEffect,
_computePathEffect: Polymer.Base._computePathEffect,
_modelForPath: Polymer.Base._modelForPath,
_pathMatchesEffect: Polymer.Base._pathMatchesEffect,
_notifyBoundPaths: Polymer.Base._notifyBoundPaths,
_getPathParts: Polymer.Base._getPathParts
});
}
});
}());
Polymer.Base._addFeature({
resolveUrl: function (url) {
var module = Polymer.DomModule.import(this.is);
var root = '';
if (module) {
var assetPath = module.getAttribute('assetpath') || '';
root = Polymer.ResolveUrl.resolveUrl(assetPath, module.ownerDocument.baseURI);
}
return Polymer.ResolveUrl.resolveUrl(url, root);
}
});
Polymer.CssParse = function () {
return {
parse: function (text) {
text = this._clean(text);
return this._parseCss(this._lex(text), text);
},
_clean: function (cssText) {
return cssText.replace(this._rx.comments, '').replace(this._rx.port, '');
},
_lex: function (text) {
var root = {
start: 0,
end: text.length
};
var n = root;
for (var i = 0, l = text.length; i < l; i++) {
switch (text[i]) {
case this.OPEN_BRACE:
if (!n.rules) {
n.rules = [];
}
var p = n;
var previous = p.rules[p.rules.length - 1];
n = {
start: i + 1,
parent: p,
previous: previous
};
p.rules.push(n);
break;
case this.CLOSE_BRACE:
n.end = i + 1;
n = n.parent || root;
break;
}
}
return root;
},
_parseCss: function (node, text) {
var t = text.substring(node.start, node.end - 1);
node.parsedCssText = node.cssText = t.trim();
if (node.parent) {
var ss = node.previous ? node.previous.end : node.parent.start;
t = text.substring(ss, node.start - 1);
t = this._expandUnicodeEscapes(t);
t = t.replace(this._rx.multipleSpaces, ' ');
t = t.substring(t.lastIndexOf(';') + 1);
var s = node.parsedSelector = node.selector = t.trim();
node.atRule = s.indexOf(this.AT_START) === 0;
if (node.atRule) {
if (s.indexOf(this.MEDIA_START) === 0) {
node.type = this.types.MEDIA_RULE;
} else if (s.match(this._rx.keyframesRule)) {
node.type = this.types.KEYFRAMES_RULE;
node.keyframesName = node.selector.split(this._rx.multipleSpaces).pop();
}
} else {
if (s.indexOf(this.VAR_START) === 0) {
node.type = this.types.MIXIN_RULE;
} else {
node.type = this.types.STYLE_RULE;
}
}
}
var r$ = node.rules;
if (r$) {
for (var i = 0, l = r$.length, r; i < l && (r = r$[i]); i++) {
this._parseCss(r, text);
}
}
return node;
},
_expandUnicodeEscapes: function (s) {
return s.replace(/\\([0-9a-f]{1,6})\s/gi, function () {
var code = arguments[1], repeat = 6 - code.length;
while (repeat--) {
code = '0' + code;
}
return '\\' + code;
});
},
stringify: function (node, preserveProperties, text) {
text = text || '';
var cssText = '';
if (node.cssText || node.rules) {
var r$ = node.rules;
if (r$ && (preserveProperties || !this._hasMixinRules(r$))) {
for (var i = 0, l = r$.length, r; i < l && (r = r$[i]); i++) {
cssText = this.stringify(r, preserveProperties, cssText);
}
} else {
cssText = preserveProperties ? node.cssText : this.removeCustomProps(node.cssText);
cssText = cssText.trim();
if (cssText) {
cssText = '  ' + cssText + '\n';
}
}
}
if (cssText) {
if (node.selector) {
text += node.selector + ' ' + this.OPEN_BRACE + '\n';
}
text += cssText;
if (node.selector) {
text += this.CLOSE_BRACE + '\n\n';
}
}
return text;
},
_hasMixinRules: function (rules) {
return rules[0].selector.indexOf(this.VAR_START) === 0;
},
removeCustomProps: function (cssText) {
cssText = this.removeCustomPropAssignment(cssText);
return this.removeCustomPropApply(cssText);
},
removeCustomPropAssignment: function (cssText) {
return cssText.replace(this._rx.customProp, '').replace(this._rx.mixinProp, '');
},
removeCustomPropApply: function (cssText) {
return cssText.replace(this._rx.mixinApply, '').replace(this._rx.varApply, '');
},
types: {
STYLE_RULE: 1,
KEYFRAMES_RULE: 7,
MEDIA_RULE: 4,
MIXIN_RULE: 1000
},
OPEN_BRACE: '{',
CLOSE_BRACE: '}',
_rx: {
comments: /\/\*[^*]*\*+([^\/*][^*]*\*+)*\//gim,
port: /@import[^;]*;/gim,
customProp: /(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?(?:[;\n]|$)/gim,
mixinProp: /(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?{[^}]*?}(?:[;\n]|$)?/gim,
mixinApply: /@apply[\s]*\([^)]*?\)[\s]*(?:[;\n]|$)?/gim,
varApply: /[^;:]*?:[^;]*?var\([^;]*\)(?:[;\n]|$)?/gim,
keyframesRule: /^@[^\s]*keyframes/,
multipleSpaces: /\s+/g
},
VAR_START: '--',
MEDIA_START: '@media',
AT_START: '@'
};
}();
Polymer.StyleUtil = function () {
return {
MODULE_STYLES_SELECTOR: 'style, link[rel=import][type~=css], template',
INCLUDE_ATTR: 'include',
toCssText: function (rules, callback, preserveProperties) {
if (typeof rules === 'string') {
rules = this.parser.parse(rules);
}
if (callback) {
this.forEachRule(rules, callback);
}
return this.parser.stringify(rules, preserveProperties);
},
forRulesInStyles: function (styles, styleRuleCallback, keyframesRuleCallback) {
if (styles) {
for (var i = 0, l = styles.length, s; i < l && (s = styles[i]); i++) {
this.forEachRule(this.rulesForStyle(s), styleRuleCallback, keyframesRuleCallback);
}
}
},
rulesForStyle: function (style) {
if (!style.__cssRules && style.textContent) {
style.__cssRules = this.parser.parse(style.textContent);
}
return style.__cssRules;
},
isKeyframesSelector: function (rule) {
return rule.parent && rule.parent.type === this.ruleTypes.KEYFRAMES_RULE;
},
forEachRule: function (node, styleRuleCallback, keyframesRuleCallback) {
if (!node) {
return;
}
var skipRules = false;
if (node.type === this.ruleTypes.STYLE_RULE) {
styleRuleCallback(node);
} else if (keyframesRuleCallback && node.type === this.ruleTypes.KEYFRAMES_RULE) {
keyframesRuleCallback(node);
} else if (node.type === this.ruleTypes.MIXIN_RULE) {
skipRules = true;
}
var r$ = node.rules;
if (r$ && !skipRules) {
for (var i = 0, l = r$.length, r; i < l && (r = r$[i]); i++) {
this.forEachRule(r, styleRuleCallback, keyframesRuleCallback);
}
}
},
applyCss: function (cssText, moniker, target, contextNode) {
var style = this.createScopeStyle(cssText, moniker);
target = target || document.head;
var after = contextNode && contextNode.nextSibling || target.firstChild;
this.__lastHeadApplyNode = style;
return target.insertBefore(style, after);
},
createScopeStyle: function (cssText, moniker) {
var style = document.createElement('style');
if (moniker) {
style.setAttribute('scope', moniker);
}
style.textContent = cssText;
return style;
},
__lastHeadApplyNode: null,
applyStylePlaceHolder: function (moniker) {
var placeHolder = document.createComment(' Shady DOM styles for ' + moniker + ' ');
var after = this.__lastHeadApplyNode ? this.__lastHeadApplyNode.nextSibling : null;
var scope = document.head;
scope.insertBefore(placeHolder, after || scope.firstChild);
this.__lastHeadApplyNode = placeHolder;
return placeHolder;
},
cssFromModules: function (moduleIds, warnIfNotFound) {
var modules = moduleIds.trim().split(' ');
var cssText = '';
for (var i = 0; i < modules.length; i++) {
cssText += this.cssFromModule(modules[i], warnIfNotFound);
}
return cssText;
},
cssFromModule: function (moduleId, warnIfNotFound) {
var m = Polymer.DomModule.import(moduleId);
if (m && !m._cssText) {
m._cssText = this.cssFromElement(m);
}
if (!m && warnIfNotFound) {
console.warn('Could not find style data in module named', moduleId);
}
return m && m._cssText || '';
},
cssFromElement: function (element) {
var cssText = '';
var content = element.content || element;
var e$ = Polymer.TreeApi.arrayCopy(content.querySelectorAll(this.MODULE_STYLES_SELECTOR));
for (var i = 0, e; i < e$.length; i++) {
e = e$[i];
if (e.localName === 'template') {
cssText += this.cssFromElement(e);
} else {
if (e.localName === 'style') {
var include = e.getAttribute(this.INCLUDE_ATTR);
if (include) {
cssText += this.cssFromModules(include, true);
}
e = e.__appliedElement || e;
e.parentNode.removeChild(e);
cssText += this.resolveCss(e.textContent, element.ownerDocument);
} else if (e.import && e.import.body) {
cssText += this.resolveCss(e.import.body.textContent, e.import);
}
}
}
return cssText;
},
resolveCss: Polymer.ResolveUrl.resolveCss,
parser: Polymer.CssParse,
ruleTypes: Polymer.CssParse.types
};
}();
Polymer.StyleTransformer = function () {
var nativeShadow = Polymer.Settings.useNativeShadow;
var styleUtil = Polymer.StyleUtil;
var api = {
dom: function (node, scope, useAttr, shouldRemoveScope) {
this._transformDom(node, scope || '', useAttr, shouldRemoveScope);
},
_transformDom: function (node, selector, useAttr, shouldRemoveScope) {
if (node.setAttribute) {
this.element(node, selector, useAttr, shouldRemoveScope);
}
var c$ = Polymer.dom(node).childNodes;
for (var i = 0; i < c$.length; i++) {
this._transformDom(c$[i], selector, useAttr, shouldRemoveScope);
}
},
element: function (element, scope, useAttr, shouldRemoveScope) {
if (useAttr) {
if (shouldRemoveScope) {
element.removeAttribute(SCOPE_NAME);
} else {
element.setAttribute(SCOPE_NAME, scope);
}
} else {
if (scope) {
if (element.classList) {
if (shouldRemoveScope) {
element.classList.remove(SCOPE_NAME);
element.classList.remove(scope);
} else {
element.classList.add(SCOPE_NAME);
element.classList.add(scope);
}
} else if (element.getAttribute) {
var c = element.getAttribute(CLASS);
if (shouldRemoveScope) {
if (c) {
element.setAttribute(CLASS, c.replace(SCOPE_NAME, '').replace(scope, ''));
}
} else {
element.setAttribute(CLASS, (c ? c + ' ' : '') + SCOPE_NAME + ' ' + scope);
}
}
}
}
},
elementStyles: function (element, callback) {
var styles = element._styles;
var cssText = '';
for (var i = 0, l = styles.length, s; i < l && (s = styles[i]); i++) {
var rules = styleUtil.rulesForStyle(s);
cssText += nativeShadow ? styleUtil.toCssText(rules, callback) : this.css(rules, element.is, element.extends, callback, element._scopeCssViaAttr) + '\n\n';
}
return cssText.trim();
},
css: function (rules, scope, ext, callback, useAttr) {
var hostScope = this._calcHostScope(scope, ext);
scope = this._calcElementScope(scope, useAttr);
var self = this;
return styleUtil.toCssText(rules, function (rule) {
if (!rule.isScoped) {
self.rule(rule, scope, hostScope);
rule.isScoped = true;
}
if (callback) {
callback(rule, scope, hostScope);
}
});
},
_calcElementScope: function (scope, useAttr) {
if (scope) {
return useAttr ? CSS_ATTR_PREFIX + scope + CSS_ATTR_SUFFIX : CSS_CLASS_PREFIX + scope;
} else {
return '';
}
},
_calcHostScope: function (scope, ext) {
return ext ? '[is=' + scope + ']' : scope;
},
rule: function (rule, scope, hostScope) {
this._transformRule(rule, this._transformComplexSelector, scope, hostScope);
},
_transformRule: function (rule, transformer, scope, hostScope) {
var p$ = rule.selector.split(COMPLEX_SELECTOR_SEP);
if (!styleUtil.isKeyframesSelector(rule)) {
for (var i = 0, l = p$.length, p; i < l && (p = p$[i]); i++) {
p$[i] = transformer.call(this, p, scope, hostScope);
}
}
rule.selector = rule.transformedSelector = p$.join(COMPLEX_SELECTOR_SEP);
},
_transformComplexSelector: function (selector, scope, hostScope) {
var stop = false;
var hostContext = false;
var self = this;
selector = selector.replace(CONTENT_START, HOST + ' $1');
selector = selector.replace(SIMPLE_SELECTOR_SEP, function (m, c, s) {
if (!stop) {
var info = self._transformCompoundSelector(s, c, scope, hostScope);
stop = stop || info.stop;
hostContext = hostContext || info.hostContext;
c = info.combinator;
s = info.value;
} else {
s = s.replace(SCOPE_JUMP, ' ');
}
return c + s;
});
if (hostContext) {
selector = selector.replace(HOST_CONTEXT_PAREN, function (m, pre, paren, post) {
return pre + paren + ' ' + hostScope + post + COMPLEX_SELECTOR_SEP + ' ' + pre + hostScope + paren + post;
});
}
return selector;
},
_transformCompoundSelector: function (selector, combinator, scope, hostScope) {
var jumpIndex = selector.search(SCOPE_JUMP);
var hostContext = false;
if (selector.indexOf(HOST_CONTEXT) >= 0) {
hostContext = true;
} else if (selector.indexOf(HOST) >= 0) {
selector = selector.replace(HOST_PAREN, function (m, host, paren) {
return hostScope + paren;
});
selector = selector.replace(HOST, hostScope);
} else if (jumpIndex !== 0) {
selector = scope ? this._transformSimpleSelector(selector, scope) : selector;
}
if (selector.indexOf(CONTENT) >= 0) {
combinator = '';
}
var stop;
if (jumpIndex >= 0) {
selector = selector.replace(SCOPE_JUMP, ' ');
stop = true;
}
return {
value: selector,
combinator: combinator,
stop: stop,
hostContext: hostContext
};
},
_transformSimpleSelector: function (selector, scope) {
var p$ = selector.split(PSEUDO_PREFIX);
p$[0] += scope;
return p$.join(PSEUDO_PREFIX);
},
documentRule: function (rule) {
rule.selector = rule.parsedSelector;
this.normalizeRootSelector(rule);
if (!nativeShadow) {
this._transformRule(rule, this._transformDocumentSelector);
}
},
normalizeRootSelector: function (rule) {
if (rule.selector === ROOT) {
rule.selector = 'body';
}
},
_transformDocumentSelector: function (selector) {
return selector.match(SCOPE_JUMP) ? this._transformComplexSelector(selector, SCOPE_DOC_SELECTOR) : this._transformSimpleSelector(selector.trim(), SCOPE_DOC_SELECTOR);
},
SCOPE_NAME: 'style-scope'
};
var SCOPE_NAME = api.SCOPE_NAME;
var SCOPE_DOC_SELECTOR = ':not([' + SCOPE_NAME + '])' + ':not(.' + SCOPE_NAME + ')';
var COMPLEX_SELECTOR_SEP = ',';
var SIMPLE_SELECTOR_SEP = /(^|[\s>+~]+)((?:\[.+?\]|[^\s>+~=\[])+)/g;
var HOST = ':host';
var ROOT = ':root';
var HOST_PAREN = /(:host)(?:\(((?:\([^)(]*\)|[^)(]*)+?)\))/g;
var HOST_CONTEXT = ':host-context';
var HOST_CONTEXT_PAREN = /(.*)(?::host-context)(?:\(((?:\([^)(]*\)|[^)(]*)+?)\))(.*)/;
var CONTENT = '::content';
var SCOPE_JUMP = /::content|::shadow|\/deep\//;
var CSS_CLASS_PREFIX = '.';
var CSS_ATTR_PREFIX = '[' + SCOPE_NAME + '~=';
var CSS_ATTR_SUFFIX = ']';
var PSEUDO_PREFIX = ':';
var CLASS = 'class';
var CONTENT_START = new RegExp('^(' + CONTENT + ')');
return api;
}();
Polymer.StyleExtends = function () {
var styleUtil = Polymer.StyleUtil;
return {
hasExtends: function (cssText) {
return Boolean(cssText.match(this.rx.EXTEND));
},
transform: function (style) {
var rules = styleUtil.rulesForStyle(style);
var self = this;
styleUtil.forEachRule(rules, function (rule) {
self._mapRuleOntoParent(rule);
if (rule.parent) {
var m;
while (m = self.rx.EXTEND.exec(rule.cssText)) {
var extend = m[1];
var extendor = self._findExtendor(extend, rule);
if (extendor) {
self._extendRule(rule, extendor);
}
}
}
rule.cssText = rule.cssText.replace(self.rx.EXTEND, '');
});
return styleUtil.toCssText(rules, function (rule) {
if (rule.selector.match(self.rx.STRIP)) {
rule.cssText = '';
}
}, true);
},
_mapRuleOntoParent: function (rule) {
if (rule.parent) {
var map = rule.parent.map || (rule.parent.map = {});
var parts = rule.selector.split(',');
for (var i = 0, p; i < parts.length; i++) {
p = parts[i];
map[p.trim()] = rule;
}
return map;
}
},
_findExtendor: function (extend, rule) {
return rule.parent && rule.parent.map && rule.parent.map[extend] || this._findExtendor(extend, rule.parent);
},
_extendRule: function (target, source) {
if (target.parent !== source.parent) {
this._cloneAndAddRuleToParent(source, target.parent);
}
target.extends = target.extends || [];
target.extends.push(source);
source.selector = source.selector.replace(this.rx.STRIP, '');
source.selector = (source.selector && source.selector + ',\n') + target.selector;
if (source.extends) {
source.extends.forEach(function (e) {
this._extendRule(target, e);
}, this);
}
},
_cloneAndAddRuleToParent: function (rule, parent) {
rule = Object.create(rule);
rule.parent = parent;
if (rule.extends) {
rule.extends = rule.extends.slice();
}
parent.rules.push(rule);
},
rx: {
EXTEND: /@extends\(([^)]*)\)\s*?;/gim,
STRIP: /%[^,]*$/
}
};
}();
(function () {
var prepElement = Polymer.Base._prepElement;
var nativeShadow = Polymer.Settings.useNativeShadow;
var styleUtil = Polymer.StyleUtil;
var styleTransformer = Polymer.StyleTransformer;
var styleExtends = Polymer.StyleExtends;
Polymer.Base._addFeature({
_prepElement: function (element) {
if (this._encapsulateStyle) {
styleTransformer.element(element, this.is, this._scopeCssViaAttr);
}
prepElement.call(this, element);
},
_prepStyles: function () {
if (!nativeShadow) {
this._scopeStyle = styleUtil.applyStylePlaceHolder(this.is);
}
},
_prepShimStyles: function () {
if (this._template) {
if (this._encapsulateStyle === undefined) {
this._encapsulateStyle = !nativeShadow;
}
this._styles = this._collectStyles();
var cssText = styleTransformer.elementStyles(this);
this._prepStyleProperties();
if (!this._needsStyleProperties() && this._styles.length) {
styleUtil.applyCss(cssText, this.is, nativeShadow ? this._template.content : null, this._scopeStyle);
}
} else {
this._styles = [];
}
},
_collectStyles: function () {
var styles = [];
var cssText = '', m$ = this.styleModules;
if (m$) {
for (var i = 0, l = m$.length, m; i < l && (m = m$[i]); i++) {
cssText += styleUtil.cssFromModule(m);
}
}
cssText += styleUtil.cssFromModule(this.is);
var p = this._template && this._template.parentNode;
if (this._template && (!p || p.id.toLowerCase() !== this.is)) {
cssText += styleUtil.cssFromElement(this._template);
}
if (cssText) {
var style = document.createElement('style');
style.textContent = cssText;
if (styleExtends.hasExtends(style.textContent)) {
cssText = styleExtends.transform(style);
}
styles.push(style);
}
return styles;
},
_elementAdd: function (node) {
if (this._encapsulateStyle) {
if (node.__styleScoped) {
node.__styleScoped = false;
} else {
styleTransformer.dom(node, this.is, this._scopeCssViaAttr);
}
}
},
_elementRemove: function (node) {
if (this._encapsulateStyle) {
styleTransformer.dom(node, this.is, this._scopeCssViaAttr, true);
}
},
scopeSubtree: function (container, shouldObserve) {
if (nativeShadow) {
return;
}
var self = this;
var scopify = function (node) {
if (node.nodeType === Node.ELEMENT_NODE) {
var className = node.getAttribute('class');
node.setAttribute('class', self._scopeElementClass(node, className));
var n$ = node.querySelectorAll('*');
for (var i = 0, n; i < n$.length && (n = n$[i]); i++) {
className = n.getAttribute('class');
n.setAttribute('class', self._scopeElementClass(n, className));
}
}
};
scopify(container);
if (shouldObserve) {
var mo = new MutationObserver(function (mxns) {
for (var i = 0, m; i < mxns.length && (m = mxns[i]); i++) {
if (m.addedNodes) {
for (var j = 0; j < m.addedNodes.length; j++) {
scopify(m.addedNodes[j]);
}
}
}
});
mo.observe(container, {
childList: true,
subtree: true
});
return mo;
}
}
});
}());
Polymer.StyleProperties = function () {
'use strict';
var nativeShadow = Polymer.Settings.useNativeShadow;
var matchesSelector = Polymer.DomApi.matchesSelector;
var styleUtil = Polymer.StyleUtil;
var styleTransformer = Polymer.StyleTransformer;
return {
decorateStyles: function (styles) {
var self = this, props = {}, keyframes = [];
styleUtil.forRulesInStyles(styles, function (rule) {
self.decorateRule(rule);
self.collectPropertiesInCssText(rule.propertyInfo.cssText, props);
}, function onKeyframesRule(rule) {
keyframes.push(rule);
});
styles._keyframes = keyframes;
var names = [];
for (var i in props) {
names.push(i);
}
return names;
},
decorateRule: function (rule) {
if (rule.propertyInfo) {
return rule.propertyInfo;
}
var info = {}, properties = {};
var hasProperties = this.collectProperties(rule, properties);
if (hasProperties) {
info.properties = properties;
rule.rules = null;
}
info.cssText = this.collectCssText(rule);
rule.propertyInfo = info;
return info;
},
collectProperties: function (rule, properties) {
var info = rule.propertyInfo;
if (info) {
if (info.properties) {
Polymer.Base.mixin(properties, info.properties);
return true;
}
} else {
var m, rx = this.rx.VAR_ASSIGN;
var cssText = rule.parsedCssText;
var any;
while (m = rx.exec(cssText)) {
properties[m[1]] = (m[2] || m[3]).trim();
any = true;
}
return any;
}
},
collectCssText: function (rule) {
return this.collectConsumingCssText(rule.parsedCssText);
},
collectConsumingCssText: function (cssText) {
return cssText.replace(this.rx.BRACKETED, '').replace(this.rx.VAR_ASSIGN, '');
},
collectPropertiesInCssText: function (cssText, props) {
var m;
while (m = this.rx.VAR_CAPTURE.exec(cssText)) {
props[m[1]] = true;
var def = m[2];
if (def && def.match(this.rx.IS_VAR)) {
props[def] = true;
}
}
},
reify: function (props) {
var names = Object.getOwnPropertyNames(props);
for (var i = 0, n; i < names.length; i++) {
n = names[i];
props[n] = this.valueForProperty(props[n], props);
}
},
valueForProperty: function (property, props) {
if (property) {
if (property.indexOf(';') >= 0) {
property = this.valueForProperties(property, props);
} else {
var self = this;
var fn = function (all, prefix, value, fallback) {
var propertyValue = self.valueForProperty(props[value], props) || (props[fallback] ? self.valueForProperty(props[fallback], props) : fallback);
return prefix + (propertyValue || '');
};
property = property.replace(this.rx.VAR_MATCH, fn);
}
}
return property && property.trim() || '';
},
valueForProperties: function (property, props) {
var parts = property.split(';');
for (var i = 0, p, m; i < parts.length; i++) {
if (p = parts[i]) {
m = p.match(this.rx.MIXIN_MATCH);
if (m) {
p = this.valueForProperty(props[m[1]], props);
} else {
var colon = p.indexOf(':');
if (colon !== -1) {
var pp = p.substring(colon);
pp = pp.trim();
pp = this.valueForProperty(pp, props) || pp;
p = p.substring(0, colon) + pp;
}
}
parts[i] = p && p.lastIndexOf(';') === p.length - 1 ? p.slice(0, -1) : p || '';
}
}
return parts.join(';');
},
applyProperties: function (rule, props) {
var output = '';
if (!rule.propertyInfo) {
this.decorateRule(rule);
}
if (rule.propertyInfo.cssText) {
output = this.valueForProperties(rule.propertyInfo.cssText, props);
}
rule.cssText = output;
},
applyKeyframeTransforms: function (rule, keyframeTransforms) {
var input = rule.cssText;
var output = rule.cssText;
if (rule.hasAnimations == null) {
rule.hasAnimations = this.rx.ANIMATION_MATCH.test(input);
}
if (rule.hasAnimations) {
var transform;
if (rule.keyframeNamesToTransform == null) {
rule.keyframeNamesToTransform = [];
for (var keyframe in keyframeTransforms) {
transform = keyframeTransforms[keyframe];
output = transform(input);
if (input !== output) {
input = output;
rule.keyframeNamesToTransform.push(keyframe);
}
}
} else {
for (var i = 0; i < rule.keyframeNamesToTransform.length; ++i) {
transform = keyframeTransforms[rule.keyframeNamesToTransform[i]];
input = transform(input);
}
output = input;
}
}
rule.cssText = output;
},
propertyDataFromStyles: function (styles, element) {
var props = {}, self = this;
var o = [], i = 0;
styleUtil.forRulesInStyles(styles, function (rule) {
if (!rule.propertyInfo) {
self.decorateRule(rule);
}
if (element && rule.propertyInfo.properties && matchesSelector.call(element, rule.transformedSelector || rule.parsedSelector)) {
self.collectProperties(rule, props);
addToBitMask(i, o);
}
i++;
});
return {
properties: props,
key: o
};
},
scopePropertiesFromStyles: function (styles) {
if (!styles._scopeStyleProperties) {
styles._scopeStyleProperties = this.selectedPropertiesFromStyles(styles, this.SCOPE_SELECTORS);
}
return styles._scopeStyleProperties;
},
hostPropertiesFromStyles: function (styles) {
if (!styles._hostStyleProperties) {
styles._hostStyleProperties = this.selectedPropertiesFromStyles(styles, this.HOST_SELECTORS);
}
return styles._hostStyleProperties;
},
selectedPropertiesFromStyles: function (styles, selectors) {
var props = {}, self = this;
styleUtil.forRulesInStyles(styles, function (rule) {
if (!rule.propertyInfo) {
self.decorateRule(rule);
}
for (var i = 0; i < selectors.length; i++) {
if (rule.parsedSelector === selectors[i]) {
self.collectProperties(rule, props);
return;
}
}
});
return props;
},
transformStyles: function (element, properties, scopeSelector) {
var self = this;
var hostSelector = styleTransformer._calcHostScope(element.is, element.extends);
var rxHostSelector = element.extends ? '\\' + hostSelector.slice(0, -1) + '\\]' : hostSelector;
var hostRx = new RegExp(this.rx.HOST_PREFIX + rxHostSelector + this.rx.HOST_SUFFIX);
var keyframeTransforms = this._elementKeyframeTransforms(element, scopeSelector);
return styleTransformer.elementStyles(element, function (rule) {
self.applyProperties(rule, properties);
if (!nativeShadow && !Polymer.StyleUtil.isKeyframesSelector(rule) && rule.cssText) {
self.applyKeyframeTransforms(rule, keyframeTransforms);
self._scopeSelector(rule, hostRx, hostSelector, element._scopeCssViaAttr, scopeSelector);
}
});
},
_elementKeyframeTransforms: function (element, scopeSelector) {
var keyframesRules = element._styles._keyframes;
var keyframeTransforms = {};
if (!nativeShadow && keyframesRules) {
for (var i = 0, keyframesRule = keyframesRules[i]; i < keyframesRules.length; keyframesRule = keyframesRules[++i]) {
this._scopeKeyframes(keyframesRule, scopeSelector);
keyframeTransforms[keyframesRule.keyframesName] = this._keyframesRuleTransformer(keyframesRule);
}
}
return keyframeTransforms;
},
_keyframesRuleTransformer: function (keyframesRule) {
return function (cssText) {
return cssText.replace(keyframesRule.keyframesNameRx, keyframesRule.transformedKeyframesName);
};
},
_scopeKeyframes: function (rule, scopeId) {
rule.keyframesNameRx = new RegExp(rule.keyframesName, 'g');
rule.transformedKeyframesName = rule.keyframesName + '-' + scopeId;
rule.transformedSelector = rule.transformedSelector || rule.selector;
rule.selector = rule.transformedSelector.replace(rule.keyframesName, rule.transformedKeyframesName);
},
_scopeSelector: function (rule, hostRx, hostSelector, viaAttr, scopeId) {
rule.transformedSelector = rule.transformedSelector || rule.selector;
var selector = rule.transformedSelector;
var scope = viaAttr ? '[' + styleTransformer.SCOPE_NAME + '~=' + scopeId + ']' : '.' + scopeId;
var parts = selector.split(',');
for (var i = 0, l = parts.length, p; i < l && (p = parts[i]); i++) {
parts[i] = p.match(hostRx) ? p.replace(hostSelector, scope) : scope + ' ' + p;
}
rule.selector = parts.join(',');
},
applyElementScopeSelector: function (element, selector, old, viaAttr) {
var c = viaAttr ? element.getAttribute(styleTransformer.SCOPE_NAME) : element.getAttribute('class') || '';
var v = old ? c.replace(old, selector) : (c ? c + ' ' : '') + this.XSCOPE_NAME + ' ' + selector;
if (c !== v) {
if (viaAttr) {
element.setAttribute(styleTransformer.SCOPE_NAME, v);
} else {
element.setAttribute('class', v);
}
}
},
applyElementStyle: function (element, properties, selector, style) {
var cssText = style ? style.textContent || '' : this.transformStyles(element, properties, selector);
var s = element._customStyle;
if (s && !nativeShadow && s !== style) {
s._useCount--;
if (s._useCount <= 0 && s.parentNode) {
s.parentNode.removeChild(s);
}
}
if (nativeShadow || (!style || !style.parentNode)) {
if (nativeShadow && element._customStyle) {
element._customStyle.textContent = cssText;
style = element._customStyle;
} else if (cssText) {
style = styleUtil.applyCss(cssText, selector, nativeShadow ? element.root : null, element._scopeStyle);
}
}
if (style) {
style._useCount = style._useCount || 0;
if (element._customStyle != style) {
style._useCount++;
}
element._customStyle = style;
}
return style;
},
mixinCustomStyle: function (props, customStyle) {
var v;
for (var i in customStyle) {
v = customStyle[i];
if (v || v === 0) {
props[i] = v;
}
}
},
rx: {
VAR_ASSIGN: /(?:^|[;\s{]\s*)(--[\w-]*?)\s*:\s*(?:([^;{]*)|{([^}]*)})(?:(?=[;\s}])|$)/gi,
MIXIN_MATCH: /(?:^|\W+)@apply[\s]*\(([^)]*)\)/i,
VAR_MATCH: /(^|\W+)var\([\s]*([^,)]*)[\s]*,?[\s]*((?:[^,()]*)|(?:[^;()]*\([^;)]*\)))[\s]*?\)/gi,
VAR_CAPTURE: /\([\s]*(--[^,\s)]*)(?:,[\s]*(--[^,\s)]*))?(?:\)|,)/gi,
ANIMATION_MATCH: /(animation\s*:)|(animation-name\s*:)/,
IS_VAR: /^--/,
BRACKETED: /\{[^}]*\}/g,
HOST_PREFIX: '(?:^|[^.#[:])',
HOST_SUFFIX: '($|[.:[\\s>+~])'
},
HOST_SELECTORS: [':host'],
SCOPE_SELECTORS: [':root'],
XSCOPE_NAME: 'x-scope'
};
function addToBitMask(n, bits) {
var o = parseInt(n / 32);
var v = 1 << n % 32;
bits[o] = (bits[o] || 0) | v;
}
}();
(function () {
Polymer.StyleCache = function () {
this.cache = {};
};
Polymer.StyleCache.prototype = {
MAX: 100,
store: function (is, data, keyValues, keyStyles) {
data.keyValues = keyValues;
data.styles = keyStyles;
var s$ = this.cache[is] = this.cache[is] || [];
s$.push(data);
if (s$.length > this.MAX) {
s$.shift();
}
},
retrieve: function (is, keyValues, keyStyles) {
var cache = this.cache[is];
if (cache) {
for (var i = cache.length - 1, data; i >= 0; i--) {
data = cache[i];
if (keyStyles === data.styles && this._objectsEqual(keyValues, data.keyValues)) {
return data;
}
}
}
},
clear: function () {
this.cache = {};
},
_objectsEqual: function (target, source) {
var t, s;
for (var i in target) {
t = target[i], s = source[i];
if (!(typeof t === 'object' && t ? this._objectsStrictlyEqual(t, s) : t === s)) {
return false;
}
}
if (Array.isArray(target)) {
return target.length === source.length;
}
return true;
},
_objectsStrictlyEqual: function (target, source) {
return this._objectsEqual(target, source) && this._objectsEqual(source, target);
}
};
}());
Polymer.StyleDefaults = function () {
var styleProperties = Polymer.StyleProperties;
var StyleCache = Polymer.StyleCache;
var api = {
_styles: [],
_properties: null,
customStyle: {},
_styleCache: new StyleCache(),
addStyle: function (style) {
this._styles.push(style);
this._properties = null;
},
get _styleProperties() {
if (!this._properties) {
styleProperties.decorateStyles(this._styles);
this._styles._scopeStyleProperties = null;
this._properties = styleProperties.scopePropertiesFromStyles(this._styles);
styleProperties.mixinCustomStyle(this._properties, this.customStyle);
styleProperties.reify(this._properties);
}
return this._properties;
},
_needsStyleProperties: function () {
},
_computeStyleProperties: function () {
return this._styleProperties;
},
updateStyles: function (properties) {
this._properties = null;
if (properties) {
Polymer.Base.mixin(this.customStyle, properties);
}
this._styleCache.clear();
for (var i = 0, s; i < this._styles.length; i++) {
s = this._styles[i];
s = s.__importElement || s;
s._apply();
}
}
};
return api;
}();
(function () {
'use strict';
var serializeValueToAttribute = Polymer.Base.serializeValueToAttribute;
var propertyUtils = Polymer.StyleProperties;
var styleTransformer = Polymer.StyleTransformer;
var styleDefaults = Polymer.StyleDefaults;
var nativeShadow = Polymer.Settings.useNativeShadow;
Polymer.Base._addFeature({
_prepStyleProperties: function () {
this._ownStylePropertyNames = this._styles && this._styles.length ? propertyUtils.decorateStyles(this._styles) : null;
},
customStyle: null,
getComputedStyleValue: function (property) {
return this._styleProperties && this._styleProperties[property] || getComputedStyle(this).getPropertyValue(property);
},
_setupStyleProperties: function () {
this.customStyle = {};
this._styleCache = null;
this._styleProperties = null;
this._scopeSelector = null;
this._ownStyleProperties = null;
this._customStyle = null;
},
_needsStyleProperties: function () {
return Boolean(this._ownStylePropertyNames && this._ownStylePropertyNames.length);
},
_beforeAttached: function () {
if (!this._scopeSelector && this._needsStyleProperties()) {
this._updateStyleProperties();
}
},
_findStyleHost: function () {
var e = this, root;
while (root = Polymer.dom(e).getOwnerRoot()) {
if (Polymer.isInstance(root.host)) {
return root.host;
}
e = root.host;
}
return styleDefaults;
},
_updateStyleProperties: function () {
var info, scope = this._findStyleHost();
if (!scope._styleCache) {
scope._styleCache = new Polymer.StyleCache();
}
var scopeData = propertyUtils.propertyDataFromStyles(scope._styles, this);
scopeData.key.customStyle = this.customStyle;
info = scope._styleCache.retrieve(this.is, scopeData.key, this._styles);
var scopeCached = Boolean(info);
if (scopeCached) {
this._styleProperties = info._styleProperties;
} else {
this._computeStyleProperties(scopeData.properties);
}
this._computeOwnStyleProperties();
if (!scopeCached) {
info = styleCache.retrieve(this.is, this._ownStyleProperties, this._styles);
}
var globalCached = Boolean(info) && !scopeCached;
var style = this._applyStyleProperties(info);
if (!scopeCached) {
style = style && nativeShadow ? style.cloneNode(true) : style;
info = {
style: style,
_scopeSelector: this._scopeSelector,
_styleProperties: this._styleProperties
};
scopeData.key.customStyle = {};
this.mixin(scopeData.key.customStyle, this.customStyle);
scope._styleCache.store(this.is, info, scopeData.key, this._styles);
if (!globalCached) {
styleCache.store(this.is, Object.create(info), this._ownStyleProperties, this._styles);
}
}
},
_computeStyleProperties: function (scopeProps) {
var scope = this._findStyleHost();
if (!scope._styleProperties) {
scope._computeStyleProperties();
}
var props = Object.create(scope._styleProperties);
this.mixin(props, propertyUtils.hostPropertiesFromStyles(this._styles));
scopeProps = scopeProps || propertyUtils.propertyDataFromStyles(scope._styles, this).properties;
this.mixin(props, scopeProps);
this.mixin(props, propertyUtils.scopePropertiesFromStyles(this._styles));
propertyUtils.mixinCustomStyle(props, this.customStyle);
propertyUtils.reify(props);
this._styleProperties = props;
},
_computeOwnStyleProperties: function () {
var props = {};
for (var i = 0, n; i < this._ownStylePropertyNames.length; i++) {
n = this._ownStylePropertyNames[i];
props[n] = this._styleProperties[n];
}
this._ownStyleProperties = props;
},
_scopeCount: 0,
_applyStyleProperties: function (info) {
var oldScopeSelector = this._scopeSelector;
this._scopeSelector = info ? info._scopeSelector : this.is + '-' + this.__proto__._scopeCount++;
var style = propertyUtils.applyElementStyle(this, this._styleProperties, this._scopeSelector, info && info.style);
if (!nativeShadow) {
propertyUtils.applyElementScopeSelector(this, this._scopeSelector, oldScopeSelector, this._scopeCssViaAttr);
}
return style;
},
serializeValueToAttribute: function (value, attribute, node) {
node = node || this;
if (attribute === 'class' && !nativeShadow) {
var host = node === this ? this.domHost || this.dataHost : this;
if (host) {
value = host._scopeElementClass(node, value);
}
}
node = this.shadyRoot && this.shadyRoot._hasDistributed ? Polymer.dom(node) : node;
serializeValueToAttribute.call(this, value, attribute, node);
},
_scopeElementClass: function (element, selector) {
if (!nativeShadow && !this._scopeCssViaAttr) {
selector = (selector ? selector + ' ' : '') + SCOPE_NAME + ' ' + this.is + (element._scopeSelector ? ' ' + XSCOPE_NAME + ' ' + element._scopeSelector : '');
}
return selector;
},
updateStyles: function (properties) {
if (this.isAttached) {
if (properties) {
this.mixin(this.customStyle, properties);
}
if (this._needsStyleProperties()) {
this._updateStyleProperties();
} else {
this._styleProperties = null;
}
if (this._styleCache) {
this._styleCache.clear();
}
this._updateRootStyles();
}
},
_updateRootStyles: function (root) {
root = root || this.root;
var c$ = Polymer.dom(root)._query(function (e) {
return e.shadyRoot || e.shadowRoot;
});
for (var i = 0, l = c$.length, c; i < l && (c = c$[i]); i++) {
if (c.updateStyles) {
c.updateStyles();
}
}
}
});
Polymer.updateStyles = function (properties) {
styleDefaults.updateStyles(properties);
Polymer.Base._updateRootStyles(document);
};
var styleCache = new Polymer.StyleCache();
Polymer.customStyleCache = styleCache;
var SCOPE_NAME = styleTransformer.SCOPE_NAME;
var XSCOPE_NAME = propertyUtils.XSCOPE_NAME;
}());
Polymer.Base._addFeature({
_registerFeatures: function () {
this._prepIs();
this._prepConstructor();
this._prepStyles();
},
_finishRegisterFeatures: function () {
this._prepTemplate();
this._prepShimStyles();
this._prepAnnotations();
this._prepEffects();
this._prepBehaviors();
this._prepPropertyInfo();
this._prepBindings();
this._prepShady();
},
_prepBehavior: function (b) {
this._addPropertyEffects(b.properties);
this._addComplexObserverEffects(b.observers);
this._addHostAttributes(b.hostAttributes);
},
_initFeatures: function () {
this._setupGestures();
this._setupConfigure();
this._setupStyleProperties();
this._setupDebouncers();
this._setupShady();
this._registerHost();
if (this._template) {
this._poolContent();
this._beginHosting();
this._stampTemplate();
this._endHosting();
this._marshalAnnotationReferences();
}
this._marshalInstanceEffects();
this._marshalBehaviors();
this._marshalHostAttributes();
this._marshalAttributes();
this._tryReady();
},
_marshalBehavior: function (b) {
if (b.listeners) {
this._listenListeners(b.listeners);
}
}
});
(function () {
var propertyUtils = Polymer.StyleProperties;
var styleUtil = Polymer.StyleUtil;
var cssParse = Polymer.CssParse;
var styleDefaults = Polymer.StyleDefaults;
var styleTransformer = Polymer.StyleTransformer;
Polymer({
is: 'custom-style',
extends: 'style',
_template: null,
properties: { include: String },
ready: function () {
this._tryApply();
},
attached: function () {
this._tryApply();
},
_tryApply: function () {
if (!this._appliesToDocument) {
if (this.parentNode && this.parentNode.localName !== 'dom-module') {
this._appliesToDocument = true;
var e = this.__appliedElement || this;
styleDefaults.addStyle(e);
if (e.textContent || this.include) {
this._apply(true);
} else {
var self = this;
var observer = new MutationObserver(function () {
observer.disconnect();
self._apply(true);
});
observer.observe(e, { childList: true });
}
}
}
},
_apply: function (deferProperties) {
var e = this.__appliedElement || this;
if (this.include) {
e.textContent = styleUtil.cssFromModules(this.include, true) + e.textContent;
}
if (e.textContent) {
styleUtil.forEachRule(styleUtil.rulesForStyle(e), function (rule) {
styleTransformer.documentRule(rule);
});
var self = this;
var fn = function fn() {
self._applyCustomProperties(e);
};
if (this._pendingApplyProperties) {
cancelAnimationFrame(this._pendingApplyProperties);
this._pendingApplyProperties = null;
}
if (deferProperties) {
this._pendingApplyProperties = requestAnimationFrame(fn);
} else {
fn();
}
}
},
_applyCustomProperties: function (element) {
this._computeStyleProperties();
var props = this._styleProperties;
var rules = styleUtil.rulesForStyle(element);
element.textContent = styleUtil.toCssText(rules, function (rule) {
var css = rule.cssText = rule.parsedCssText;
if (rule.propertyInfo && rule.propertyInfo.cssText) {
css = cssParse.removeCustomPropAssignment(css);
rule.cssText = propertyUtils.valueForProperties(css, props);
}
});
}
});
}());
Polymer.Templatizer = {
properties: { __hideTemplateChildren__: { observer: '_showHideChildren' } },
_instanceProps: Polymer.nob,
_parentPropPrefix: '_parent_',
templatize: function (template) {
this._templatized = template;
if (!template._content) {
template._content = template.content;
}
if (template._content._ctor) {
this.ctor = template._content._ctor;
this._prepParentProperties(this.ctor.prototype, template);
return;
}
var archetype = Object.create(Polymer.Base);
this._customPrepAnnotations(archetype, template);
this._prepParentProperties(archetype, template);
archetype._prepEffects();
this._customPrepEffects(archetype);
archetype._prepBehaviors();
archetype._prepPropertyInfo();
archetype._prepBindings();
archetype._notifyPathUp = this._notifyPathUpImpl;
archetype._scopeElementClass = this._scopeElementClassImpl;
archetype.listen = this._listenImpl;
archetype._showHideChildren = this._showHideChildrenImpl;
archetype.__setPropertyOrig = this.__setProperty;
archetype.__setProperty = this.__setPropertyImpl;
var _constructor = this._constructorImpl;
var ctor = function TemplateInstance(model, host) {
_constructor.call(this, model, host);
};
ctor.prototype = archetype;
archetype.constructor = ctor;
template._content._ctor = ctor;
this.ctor = ctor;
},
_getRootDataHost: function () {
return this.dataHost && this.dataHost._rootDataHost || this.dataHost;
},
_showHideChildrenImpl: function (hide) {
var c = this._children;
for (var i = 0; i < c.length; i++) {
var n = c[i];
if (Boolean(hide) != Boolean(n.__hideTemplateChildren__)) {
if (n.nodeType === Node.TEXT_NODE) {
if (hide) {
n.__polymerTextContent__ = n.textContent;
n.textContent = '';
} else {
n.textContent = n.__polymerTextContent__;
}
} else if (n.style) {
if (hide) {
n.__polymerDisplay__ = n.style.display;
n.style.display = 'none';
} else {
n.style.display = n.__polymerDisplay__;
}
}
}
n.__hideTemplateChildren__ = hide;
}
},
__setPropertyImpl: function (property, value, fromAbove, node) {
if (node && node.__hideTemplateChildren__ && property == 'textContent') {
property = '__polymerTextContent__';
}
this.__setPropertyOrig(property, value, fromAbove, node);
},
_debounceTemplate: function (fn) {
Polymer.dom.addDebouncer(this.debounce('_debounceTemplate', fn));
},
_flushTemplates: function () {
Polymer.dom.flush();
},
_customPrepEffects: function (archetype) {
var parentProps = archetype._parentProps;
for (var prop in parentProps) {
archetype._addPropertyEffect(prop, 'function', this._createHostPropEffector(prop));
}
for (prop in this._instanceProps) {
archetype._addPropertyEffect(prop, 'function', this._createInstancePropEffector(prop));
}
},
_customPrepAnnotations: function (archetype, template) {
archetype._template = template;
var c = template._content;
if (!c._notes) {
var rootDataHost = archetype._rootDataHost;
if (rootDataHost) {
Polymer.Annotations.prepElement = function () {
rootDataHost._prepElement();
};
}
c._notes = Polymer.Annotations.parseAnnotations(template);
Polymer.Annotations.prepElement = null;
this._processAnnotations(c._notes);
}
archetype._notes = c._notes;
archetype._parentProps = c._parentProps;
},
_prepParentProperties: function (archetype, template) {
var parentProps = this._parentProps = archetype._parentProps;
if (this._forwardParentProp && parentProps) {
var proto = archetype._parentPropProto;
var prop;
if (!proto) {
for (prop in this._instanceProps) {
delete parentProps[prop];
}
proto = archetype._parentPropProto = Object.create(null);
if (template != this) {
Polymer.Bind.prepareModel(proto);
Polymer.Base.prepareModelNotifyPath(proto);
}
for (prop in parentProps) {
var parentProp = this._parentPropPrefix + prop;
var effects = [
{
kind: 'function',
effect: this._createForwardPropEffector(prop),
fn: Polymer.Bind._functionEffect
},
{
kind: 'notify',
fn: Polymer.Bind._notifyEffect,
effect: { event: Polymer.CaseMap.camelToDashCase(parentProp) + '-changed' }
}
];
Polymer.Bind._createAccessors(proto, parentProp, effects);
}
}
var self = this;
if (template != this) {
Polymer.Bind.prepareInstance(template);
template._forwardParentProp = function (source, value) {
self._forwardParentProp(source, value);
};
}
this._extendTemplate(template, proto);
template._pathEffector = function (path, value, fromAbove) {
return self._pathEffectorImpl(path, value, fromAbove);
};
}
},
_createForwardPropEffector: function (prop) {
return function (source, value) {
this._forwardParentProp(prop, value);
};
},
_createHostPropEffector: function (prop) {
var prefix = this._parentPropPrefix;
return function (source, value) {
this.dataHost._templatized[prefix + prop] = value;
};
},
_createInstancePropEffector: function (prop) {
return function (source, value, old, fromAbove) {
if (!fromAbove) {
this.dataHost._forwardInstanceProp(this, prop, value);
}
};
},
_extendTemplate: function (template, proto) {
var n$ = Object.getOwnPropertyNames(proto);
if (proto._propertySetter) {
template._propertySetter = proto._propertySetter;
}
for (var i = 0, n; i < n$.length && (n = n$[i]); i++) {
var val = template[n];
var pd = Object.getOwnPropertyDescriptor(proto, n);
Object.defineProperty(template, n, pd);
if (val !== undefined) {
template._propertySetter(n, val);
}
}
},
_showHideChildren: function (hidden) {
},
_forwardInstancePath: function (inst, path, value) {
},
_forwardInstanceProp: function (inst, prop, value) {
},
_notifyPathUpImpl: function (path, value) {
var dataHost = this.dataHost;
var dot = path.indexOf('.');
var root = dot < 0 ? path : path.slice(0, dot);
dataHost._forwardInstancePath.call(dataHost, this, path, value);
if (root in dataHost._parentProps) {
dataHost._templatized.notifyPath(dataHost._parentPropPrefix + path, value);
}
},
_pathEffectorImpl: function (path, value, fromAbove) {
if (this._forwardParentPath) {
if (path.indexOf(this._parentPropPrefix) === 0) {
var subPath = path.substring(this._parentPropPrefix.length);
var model = this._modelForPath(subPath);
if (model in this._parentProps) {
this._forwardParentPath(subPath, value);
}
}
}
Polymer.Base._pathEffector.call(this._templatized, path, value, fromAbove);
},
_constructorImpl: function (model, host) {
this._rootDataHost = host._getRootDataHost();
this._setupConfigure(model);
this._registerHost(host);
this._beginHosting();
this.root = this.instanceTemplate(this._template);
this.root.__noContent = !this._notes._hasContent;
this.root.__styleScoped = true;
this._endHosting();
this._marshalAnnotatedNodes();
this._marshalInstanceEffects();
this._marshalAnnotatedListeners();
var children = [];
for (var n = this.root.firstChild; n; n = n.nextSibling) {
children.push(n);
n._templateInstance = this;
}
this._children = children;
if (host.__hideTemplateChildren__) {
this._showHideChildren(true);
}
this._tryReady();
},
_listenImpl: function (node, eventName, methodName) {
var model = this;
var host = this._rootDataHost;
var handler = host._createEventHandler(node, eventName, methodName);
var decorated = function (e) {
e.model = model;
handler(e);
};
host._listen(node, eventName, decorated);
},
_scopeElementClassImpl: function (node, value) {
var host = this._rootDataHost;
if (host) {
return host._scopeElementClass(node, value);
}
},
stamp: function (model) {
model = model || {};
if (this._parentProps) {
var templatized = this._templatized;
for (var prop in this._parentProps) {
if (model[prop] === undefined) {
model[prop] = templatized[this._parentPropPrefix + prop];
}
}
}
return new this.ctor(model, this);
},
modelForElement: function (el) {
var model;
while (el) {
if (model = el._templateInstance) {
if (model.dataHost != this) {
el = model.dataHost;
} else {
return model;
}
} else {
el = el.parentNode;
}
}
}
};
Polymer({
is: 'dom-template',
extends: 'template',
_template: null,
behaviors: [Polymer.Templatizer],
ready: function () {
this.templatize(this);
}
});
Polymer._collections = new WeakMap();
Polymer.Collection = function (userArray) {
Polymer._collections.set(userArray, this);
this.userArray = userArray;
this.store = userArray.slice();
this.initMap();
};
Polymer.Collection.prototype = {
constructor: Polymer.Collection,
initMap: function () {
var omap = this.omap = new WeakMap();
var pmap = this.pmap = {};
var s = this.store;
for (var i = 0; i < s.length; i++) {
var item = s[i];
if (item && typeof item == 'object') {
omap.set(item, i);
} else {
pmap[item] = i;
}
}
},
add: function (item) {
var key = this.store.push(item) - 1;
if (item && typeof item == 'object') {
this.omap.set(item, key);
} else {
this.pmap[item] = key;
}
return '#' + key;
},
removeKey: function (key) {
if (key = this._parseKey(key)) {
this._removeFromMap(this.store[key]);
delete this.store[key];
}
},
_removeFromMap: function (item) {
if (item && typeof item == 'object') {
this.omap.delete(item);
} else {
delete this.pmap[item];
}
},
remove: function (item) {
var key = this.getKey(item);
this.removeKey(key);
return key;
},
getKey: function (item) {
var key;
if (item && typeof item == 'object') {
key = this.omap.get(item);
} else {
key = this.pmap[item];
}
if (key != undefined) {
return '#' + key;
}
},
getKeys: function () {
return Object.keys(this.store).map(function (key) {
return '#' + key;
});
},
_parseKey: function (key) {
if (key && key[0] == '#') {
return key.slice(1);
}
},
setItem: function (key, item) {
if (key = this._parseKey(key)) {
var old = this.store[key];
if (old) {
this._removeFromMap(old);
}
if (item && typeof item == 'object') {
this.omap.set(item, key);
} else {
this.pmap[item] = key;
}
this.store[key] = item;
}
},
getItem: function (key) {
if (key = this._parseKey(key)) {
return this.store[key];
}
},
getItems: function () {
var items = [], store = this.store;
for (var key in store) {
items.push(store[key]);
}
return items;
},
_applySplices: function (splices) {
var keyMap = {}, key;
for (var i = 0, s; i < splices.length && (s = splices[i]); i++) {
s.addedKeys = [];
for (var j = 0; j < s.removed.length; j++) {
key = this.getKey(s.removed[j]);
keyMap[key] = keyMap[key] ? null : -1;
}
for (j = 0; j < s.addedCount; j++) {
var item = this.userArray[s.index + j];
key = this.getKey(item);
key = key === undefined ? this.add(item) : key;
keyMap[key] = keyMap[key] ? null : 1;
s.addedKeys.push(key);
}
}
var removed = [];
var added = [];
for (key in keyMap) {
if (keyMap[key] < 0) {
this.removeKey(key);
removed.push(key);
}
if (keyMap[key] > 0) {
added.push(key);
}
}
return [{
removed: removed,
added: added
}];
}
};
Polymer.Collection.get = function (userArray) {
return Polymer._collections.get(userArray) || new Polymer.Collection(userArray);
};
Polymer.Collection.applySplices = function (userArray, splices) {
var coll = Polymer._collections.get(userArray);
return coll ? coll._applySplices(splices) : null;
};
Polymer({
is: 'dom-repeat',
extends: 'template',
_template: null,
properties: {
items: { type: Array },
as: {
type: String,
value: 'item'
},
indexAs: {
type: String,
value: 'index'
},
sort: {
type: Function,
observer: '_sortChanged'
},
filter: {
type: Function,
observer: '_filterChanged'
},
observe: {
type: String,
observer: '_observeChanged'
},
delay: Number,
renderedItemCount: {
type: Number,
notify: true,
readOnly: true
},
initialCount: {
type: Number,
observer: '_initializeChunking'
},
targetFramerate: {
type: Number,
value: 20
},
_targetFrameTime: {
type: Number,
computed: '_computeFrameTime(targetFramerate)'
}
},
behaviors: [Polymer.Templatizer],
observers: ['_itemsChanged(items.*)'],
created: function () {
this._instances = [];
this._pool = [];
this._limit = Infinity;
var self = this;
this._boundRenderChunk = function () {
self._renderChunk();
};
},
detached: function () {
this.__isDetached = true;
for (var i = 0; i < this._instances.length; i++) {
this._detachInstance(i);
}
},
attached: function () {
if (this.__isDetached) {
this.__isDetached = false;
var parent = Polymer.dom(Polymer.dom(this).parentNode);
for (var i = 0; i < this._instances.length; i++) {
this._attachInstance(i, parent);
}
}
},
ready: function () {
this._instanceProps = { __key__: true };
this._instanceProps[this.as] = true;
this._instanceProps[this.indexAs] = true;
if (!this.ctor) {
this.templatize(this);
}
},
_sortChanged: function (sort) {
var dataHost = this._getRootDataHost();
this._sortFn = sort && (typeof sort == 'function' ? sort : function () {
return dataHost[sort].apply(dataHost, arguments);
});
this._needFullRefresh = true;
if (this.items) {
this._debounceTemplate(this._render);
}
},
_filterChanged: function (filter) {
var dataHost = this._getRootDataHost();
this._filterFn = filter && (typeof filter == 'function' ? filter : function () {
return dataHost[filter].apply(dataHost, arguments);
});
this._needFullRefresh = true;
if (this.items) {
this._debounceTemplate(this._render);
}
},
_computeFrameTime: function (rate) {
return Math.ceil(1000 / rate);
},
_initializeChunking: function () {
if (this.initialCount) {
this._limit = this.initialCount;
this._chunkCount = this.initialCount;
this._lastChunkTime = performance.now();
}
},
_tryRenderChunk: function () {
if (this.items && this._limit < this.items.length) {
this.debounce('renderChunk', this._requestRenderChunk);
}
},
_requestRenderChunk: function () {
requestAnimationFrame(this._boundRenderChunk);
},
_renderChunk: function () {
var currChunkTime = performance.now();
var ratio = this._targetFrameTime / (currChunkTime - this._lastChunkTime);
this._chunkCount = Math.round(this._chunkCount * ratio) || 1;
this._limit += this._chunkCount;
this._lastChunkTime = currChunkTime;
this._debounceTemplate(this._render);
},
_observeChanged: function () {
this._observePaths = this.observe && this.observe.replace('.*', '.').split(' ');
},
_itemsChanged: function (change) {
if (change.path == 'items') {
if (Array.isArray(this.items)) {
this.collection = Polymer.Collection.get(this.items);
} else if (!this.items) {
this.collection = null;
} else {
this._error(this._logf('dom-repeat', 'expected array for `items`,' + ' found', this.items));
}
this._keySplices = [];
this._indexSplices = [];
this._needFullRefresh = true;
this._initializeChunking();
this._debounceTemplate(this._render);
} else if (change.path == 'items.splices') {
this._keySplices = this._keySplices.concat(change.value.keySplices);
this._indexSplices = this._indexSplices.concat(change.value.indexSplices);
this._debounceTemplate(this._render);
} else {
var subpath = change.path.slice(6);
this._forwardItemPath(subpath, change.value);
this._checkObservedPaths(subpath);
}
},
_checkObservedPaths: function (path) {
if (this._observePaths) {
path = path.substring(path.indexOf('.') + 1);
var paths = this._observePaths;
for (var i = 0; i < paths.length; i++) {
if (path.indexOf(paths[i]) === 0) {
this._needFullRefresh = true;
if (this.delay) {
this.debounce('render', this._render, this.delay);
} else {
this._debounceTemplate(this._render);
}
return;
}
}
}
},
render: function () {
this._needFullRefresh = true;
this._debounceTemplate(this._render);
this._flushTemplates();
},
_render: function () {
if (this._needFullRefresh) {
this._applyFullRefresh();
this._needFullRefresh = false;
} else if (this._keySplices.length) {
if (this._sortFn) {
this._applySplicesUserSort(this._keySplices);
} else {
if (this._filterFn) {
this._applyFullRefresh();
} else {
this._applySplicesArrayOrder(this._indexSplices);
}
}
} else {
}
this._keySplices = [];
this._indexSplices = [];
var keyToIdx = this._keyToInstIdx = {};
for (var i = this._instances.length - 1; i >= 0; i--) {
var inst = this._instances[i];
if (inst.isPlaceholder && i < this._limit) {
inst = this._insertInstance(i, inst.__key__);
} else if (!inst.isPlaceholder && i >= this._limit) {
inst = this._downgradeInstance(i, inst.__key__);
}
keyToIdx[inst.__key__] = i;
if (!inst.isPlaceholder) {
inst.__setProperty(this.indexAs, i, true);
}
}
this._pool.length = 0;
this._setRenderedItemCount(this._instances.length);
this.fire('dom-change');
this._tryRenderChunk();
},
_applyFullRefresh: function () {
var c = this.collection;
var keys;
if (this._sortFn) {
keys = c ? c.getKeys() : [];
} else {
keys = [];
var items = this.items;
if (items) {
for (var i = 0; i < items.length; i++) {
keys.push(c.getKey(items[i]));
}
}
}
var self = this;
if (this._filterFn) {
keys = keys.filter(function (a) {
return self._filterFn(c.getItem(a));
});
}
if (this._sortFn) {
keys.sort(function (a, b) {
return self._sortFn(c.getItem(a), c.getItem(b));
});
}
for (i = 0; i < keys.length; i++) {
var key = keys[i];
var inst = this._instances[i];
if (inst) {
inst.__key__ = key;
if (!inst.isPlaceholder && i < this._limit) {
inst.__setProperty(this.as, c.getItem(key), true);
}
} else if (i < this._limit) {
this._insertInstance(i, key);
} else {
this._insertPlaceholder(i, key);
}
}
for (var j = this._instances.length - 1; j >= i; j--) {
this._detachAndRemoveInstance(j);
}
},
_numericSort: function (a, b) {
return a - b;
},
_applySplicesUserSort: function (splices) {
var c = this.collection;
var keyMap = {};
var key;
for (var i = 0, s; i < splices.length && (s = splices[i]); i++) {
for (var j = 0; j < s.removed.length; j++) {
key = s.removed[j];
keyMap[key] = keyMap[key] ? null : -1;
}
for (j = 0; j < s.added.length; j++) {
key = s.added[j];
keyMap[key] = keyMap[key] ? null : 1;
}
}
var removedIdxs = [];
var addedKeys = [];
for (key in keyMap) {
if (keyMap[key] === -1) {
removedIdxs.push(this._keyToInstIdx[key]);
}
if (keyMap[key] === 1) {
addedKeys.push(key);
}
}
if (removedIdxs.length) {
removedIdxs.sort(this._numericSort);
for (i = removedIdxs.length - 1; i >= 0; i--) {
var idx = removedIdxs[i];
if (idx !== undefined) {
this._detachAndRemoveInstance(idx);
}
}
}
var self = this;
if (addedKeys.length) {
if (this._filterFn) {
addedKeys = addedKeys.filter(function (a) {
return self._filterFn(c.getItem(a));
});
}
addedKeys.sort(function (a, b) {
return self._sortFn(c.getItem(a), c.getItem(b));
});
var start = 0;
for (i = 0; i < addedKeys.length; i++) {
start = this._insertRowUserSort(start, addedKeys[i]);
}
}
},
_insertRowUserSort: function (start, key) {
var c = this.collection;
var item = c.getItem(key);
var end = this._instances.length - 1;
var idx = -1;
while (start <= end) {
var mid = start + end >> 1;
var midKey = this._instances[mid].__key__;
var cmp = this._sortFn(c.getItem(midKey), item);
if (cmp < 0) {
start = mid + 1;
} else if (cmp > 0) {
end = mid - 1;
} else {
idx = mid;
break;
}
}
if (idx < 0) {
idx = end + 1;
}
this._insertPlaceholder(idx, key);
return idx;
},
_applySplicesArrayOrder: function (splices) {
for (var i = 0, s; i < splices.length && (s = splices[i]); i++) {
for (var j = 0; j < s.removed.length; j++) {
this._detachAndRemoveInstance(s.index);
}
for (j = 0; j < s.addedKeys.length; j++) {
this._insertPlaceholder(s.index + j, s.addedKeys[j]);
}
}
},
_detachInstance: function (idx) {
var inst = this._instances[idx];
if (!inst.isPlaceholder) {
for (var i = 0; i < inst._children.length; i++) {
var el = inst._children[i];
Polymer.dom(inst.root).appendChild(el);
}
return inst;
}
},
_attachInstance: function (idx, parent) {
var inst = this._instances[idx];
if (!inst.isPlaceholder) {
parent.insertBefore(inst.root, this);
}
},
_detachAndRemoveInstance: function (idx) {
var inst = this._detachInstance(idx);
if (inst) {
this._pool.push(inst);
}
this._instances.splice(idx, 1);
},
_insertPlaceholder: function (idx, key) {
this._instances.splice(idx, 0, {
isPlaceholder: true,
__key__: key
});
},
_stampInstance: function (idx, key) {
var model = { __key__: key };
model[this.as] = this.collection.getItem(key);
model[this.indexAs] = idx;
return this.stamp(model);
},
_insertInstance: function (idx, key) {
var inst = this._pool.pop();
if (inst) {
inst.__setProperty(this.as, this.collection.getItem(key), true);
inst.__setProperty('__key__', key, true);
} else {
inst = this._stampInstance(idx, key);
}
var beforeRow = this._instances[idx + 1];
var beforeNode = beforeRow && !beforeRow.isPlaceholder ? beforeRow._children[0] : this;
var parentNode = Polymer.dom(this).parentNode;
Polymer.dom(parentNode).insertBefore(inst.root, beforeNode);
this._instances[idx] = inst;
return inst;
},
_downgradeInstance: function (idx, key) {
var inst = this._detachInstance(idx);
if (inst) {
this._pool.push(inst);
}
inst = {
isPlaceholder: true,
__key__: key
};
this._instances[idx] = inst;
return inst;
},
_showHideChildren: function (hidden) {
for (var i = 0; i < this._instances.length; i++) {
this._instances[i]._showHideChildren(hidden);
}
},
_forwardInstanceProp: function (inst, prop, value) {
if (prop == this.as) {
var idx;
if (this._sortFn || this._filterFn) {
idx = this.items.indexOf(this.collection.getItem(inst.__key__));
} else {
idx = inst[this.indexAs];
}
this.set('items.' + idx, value);
}
},
_forwardInstancePath: function (inst, path, value) {
if (path.indexOf(this.as + '.') === 0) {
this._notifyPath('items.' + inst.__key__ + '.' + path.slice(this.as.length + 1), value);
}
},
_forwardParentProp: function (prop, value) {
var i$ = this._instances;
for (var i = 0, inst; i < i$.length && (inst = i$[i]); i++) {
if (!inst.isPlaceholder) {
inst.__setProperty(prop, value, true);
}
}
},
_forwardParentPath: function (path, value) {
var i$ = this._instances;
for (var i = 0, inst; i < i$.length && (inst = i$[i]); i++) {
if (!inst.isPlaceholder) {
inst._notifyPath(path, value, true);
}
}
},
_forwardItemPath: function (path, value) {
if (this._keyToInstIdx) {
var dot = path.indexOf('.');
var key = path.substring(0, dot < 0 ? path.length : dot);
var idx = this._keyToInstIdx[key];
var inst = this._instances[idx];
if (inst && !inst.isPlaceholder) {
if (dot >= 0) {
path = this.as + '.' + path.substring(dot + 1);
inst._notifyPath(path, value, true);
} else {
inst.__setProperty(this.as, value, true);
}
}
}
},
itemForElement: function (el) {
var instance = this.modelForElement(el);
return instance && instance[this.as];
},
keyForElement: function (el) {
var instance = this.modelForElement(el);
return instance && instance.__key__;
},
indexForElement: function (el) {
var instance = this.modelForElement(el);
return instance && instance[this.indexAs];
}
});
Polymer({
is: 'array-selector',
_template: null,
properties: {
items: {
type: Array,
observer: 'clearSelection'
},
multi: {
type: Boolean,
value: false,
observer: 'clearSelection'
},
selected: {
type: Object,
notify: true
},
selectedItem: {
type: Object,
notify: true
},
toggle: {
type: Boolean,
value: false
}
},
clearSelection: function () {
if (Array.isArray(this.selected)) {
for (var i = 0; i < this.selected.length; i++) {
this.unlinkPaths('selected.' + i);
}
} else {
this.unlinkPaths('selected');
this.unlinkPaths('selectedItem');
}
if (this.multi) {
if (!this.selected || this.selected.length) {
this.selected = [];
this._selectedColl = Polymer.Collection.get(this.selected);
}
} else {
this.selected = null;
this._selectedColl = null;
}
this.selectedItem = null;
},
isSelected: function (item) {
if (this.multi) {
return this._selectedColl.getKey(item) !== undefined;
} else {
return this.selected == item;
}
},
deselect: function (item) {
if (this.multi) {
if (this.isSelected(item)) {
var skey = this._selectedColl.getKey(item);
this.arrayDelete('selected', item);
this.unlinkPaths('selected.' + skey);
}
} else {
this.selected = null;
this.selectedItem = null;
this.unlinkPaths('selected');
this.unlinkPaths('selectedItem');
}
},
select: function (item) {
var icol = Polymer.Collection.get(this.items);
var key = icol.getKey(item);
if (this.multi) {
if (this.isSelected(item)) {
if (this.toggle) {
this.deselect(item);
}
} else {
this.push('selected', item);
var skey = this._selectedColl.getKey(item);
this.linkPaths('selected.' + skey, 'items.' + key);
}
} else {
if (this.toggle && item == this.selected) {
this.deselect();
} else {
this.selected = item;
this.selectedItem = item;
this.linkPaths('selected', 'items.' + key);
this.linkPaths('selectedItem', 'items.' + key);
}
}
}
});
Polymer({
is: 'dom-if',
extends: 'template',
_template: null,
properties: {
'if': {
type: Boolean,
value: false,
observer: '_queueRender'
},
restamp: {
type: Boolean,
value: false,
observer: '_queueRender'
}
},
behaviors: [Polymer.Templatizer],
_queueRender: function () {
this._debounceTemplate(this._render);
},
detached: function () {
if (!this.parentNode || this.parentNode.nodeType == Node.DOCUMENT_FRAGMENT_NODE && (!Polymer.Settings.hasShadow || !(this.parentNode instanceof ShadowRoot))) {
this._teardownInstance();
}
},
attached: function () {
if (this.if && this.ctor) {
this.async(this._ensureInstance);
}
},
render: function () {
this._flushTemplates();
},
_render: function () {
if (this.if) {
if (!this.ctor) {
this.templatize(this);
}
this._ensureInstance();
this._showHideChildren();
} else if (this.restamp) {
this._teardownInstance();
}
if (!this.restamp && this._instance) {
this._showHideChildren();
}
if (this.if != this._lastIf) {
this.fire('dom-change');
this._lastIf = this.if;
}
},
_ensureInstance: function () {
var parentNode = Polymer.dom(this).parentNode;
if (parentNode) {
var parent = Polymer.dom(parentNode);
if (!this._instance) {
this._instance = this.stamp();
var root = this._instance.root;
parent.insertBefore(root, this);
} else {
var c$ = this._instance._children;
if (c$ && c$.length) {
var lastChild = Polymer.dom(this).previousSibling;
if (lastChild !== c$[c$.length - 1]) {
for (var i = 0, n; i < c$.length && (n = c$[i]); i++) {
parent.insertBefore(n, this);
}
}
}
}
}
},
_teardownInstance: function () {
if (this._instance) {
var c$ = this._instance._children;
if (c$ && c$.length) {
var parent = Polymer.dom(Polymer.dom(c$[0]).parentNode);
for (var i = 0, n; i < c$.length && (n = c$[i]); i++) {
parent.removeChild(n);
}
}
this._instance = null;
}
},
_showHideChildren: function () {
var hidden = this.__hideTemplateChildren__ || !this.if;
if (this._instance) {
this._instance._showHideChildren(hidden);
}
},
_forwardParentProp: function (prop, value) {
if (this._instance) {
this._instance[prop] = value;
}
},
_forwardParentPath: function (path, value) {
if (this._instance) {
this._instance._notifyPath(path, value, true);
}
}
});
Polymer({
is: 'dom-bind',
extends: 'template',
_template: null,
created: function () {
var self = this;
Polymer.RenderStatus.whenReady(function () {
if (document.readyState == 'loading') {
document.addEventListener('DOMContentLoaded', function () {
self._markImportsReady();
});
} else {
self._markImportsReady();
}
});
},
_ensureReady: function () {
if (!this._readied) {
this._readySelf();
}
},
_markImportsReady: function () {
this._importsReady = true;
this._ensureReady();
},
_registerFeatures: function () {
this._prepConstructor();
},
_insertChildren: function () {
var parentDom = Polymer.dom(Polymer.dom(this).parentNode);
parentDom.insertBefore(this.root, this);
},
_removeChildren: function () {
if (this._children) {
for (var i = 0; i < this._children.length; i++) {
this.root.appendChild(this._children[i]);
}
}
},
_initFeatures: function () {
},
_scopeElementClass: function (element, selector) {
if (this.dataHost) {
return this.dataHost._scopeElementClass(element, selector);
} else {
return selector;
}
},
_prepConfigure: function () {
var config = {};
for (var prop in this._propertyEffects) {
config[prop] = this[prop];
}
var setupConfigure = this._setupConfigure;
this._setupConfigure = function () {
setupConfigure.call(this, config);
};
},
attached: function () {
if (this._importsReady) {
this.render();
}
},
detached: function () {
this._removeChildren();
},
render: function () {
this._ensureReady();
if (!this._children) {
this._template = this;
this._prepAnnotations();
this._prepEffects();
this._prepBehaviors();
this._prepConfigure();
this._prepBindings();
this._prepPropertyInfo();
Polymer.Base._initFeatures.call(this);
this._children = Polymer.TreeApi.arrayCopyChildNodes(this.root);
}
this._insertChildren();
this.fire('dom-change');
}
});
(function () {
var metaDatas = {};
var metaArrays = {};
var singleton = null;
Polymer.IronMeta = Polymer({
is: 'iron-meta',
properties: {
type: {
type: String,
value: 'default',
observer: '_typeChanged'
},
key: {
type: String,
observer: '_keyChanged'
},
value: {
type: Object,
notify: true,
observer: '_valueChanged'
},
self: {
type: Boolean,
observer: '_selfChanged'
},
list: {
type: Array,
notify: true
}
},
hostAttributes: { hidden: true },
factoryImpl: function (config) {
if (config) {
for (var n in config) {
switch (n) {
case 'type':
case 'key':
case 'value':
this[n] = config[n];
break;
}
}
}
},
created: function () {
this._metaDatas = metaDatas;
this._metaArrays = metaArrays;
},
_keyChanged: function (key, old) {
this._resetRegistration(old);
},
_valueChanged: function (value) {
this._resetRegistration(this.key);
},
_selfChanged: function (self) {
if (self) {
this.value = this;
}
},
_typeChanged: function (type) {
this._unregisterKey(this.key);
if (!metaDatas[type]) {
metaDatas[type] = {};
}
this._metaData = metaDatas[type];
if (!metaArrays[type]) {
metaArrays[type] = [];
}
this.list = metaArrays[type];
this._registerKeyValue(this.key, this.value);
},
byKey: function (key) {
return this._metaData && this._metaData[key];
},
_resetRegistration: function (oldKey) {
this._unregisterKey(oldKey);
this._registerKeyValue(this.key, this.value);
},
_unregisterKey: function (key) {
this._unregister(key, this._metaData, this.list);
},
_registerKeyValue: function (key, value) {
this._register(key, value, this._metaData, this.list);
},
_register: function (key, value, data, list) {
if (key && data && value !== undefined) {
data[key] = value;
list.push(value);
}
},
_unregister: function (key, data, list) {
if (key && data) {
if (key in data) {
var value = data[key];
delete data[key];
this.arrayDelete(list, value);
}
}
}
});
Polymer.IronMeta.getIronMeta = function getIronMeta() {
if (singleton === null) {
singleton = new Polymer.IronMeta();
}
return singleton;
};
Polymer.IronMetaQuery = Polymer({
is: 'iron-meta-query',
properties: {
type: {
type: String,
value: 'default',
observer: '_typeChanged'
},
key: {
type: String,
observer: '_keyChanged'
},
value: {
type: Object,
notify: true,
readOnly: true
},
list: {
type: Array,
notify: true
}
},
factoryImpl: function (config) {
if (config) {
for (var n in config) {
switch (n) {
case 'type':
case 'key':
this[n] = config[n];
break;
}
}
}
},
created: function () {
this._metaDatas = metaDatas;
this._metaArrays = metaArrays;
},
_keyChanged: function (key) {
this._setValue(this._metaData && this._metaData[key]);
},
_typeChanged: function (type) {
this._metaData = metaDatas[type];
this.list = metaArrays[type];
if (this.key) {
this._keyChanged(this.key);
}
},
byKey: function (key) {
return this._metaData && this._metaData[key];
}
});
}());
Polymer({
is: 'iron-icon',
properties: {
icon: {
type: String,
observer: '_iconChanged'
},
theme: {
type: String,
observer: '_updateIcon'
},
src: {
type: String,
observer: '_srcChanged'
},
_meta: {
value: Polymer.Base.create('iron-meta', { type: 'iconset' }),
observer: '_updateIcon'
}
},
_DEFAULT_ICONSET: 'icons',
_iconChanged: function (icon) {
var parts = (icon || '').split(':');
this._iconName = parts.pop();
this._iconsetName = parts.pop() || this._DEFAULT_ICONSET;
this._updateIcon();
},
_srcChanged: function (src) {
this._updateIcon();
},
_usesIconset: function () {
return this.icon || !this.src;
},
_updateIcon: function () {
if (this._usesIconset()) {
if (this._img && this._img.parentNode) {
Polymer.dom(this.root).removeChild(this._img);
}
if (this._iconName === '') {
if (this._iconset) {
this._iconset.removeIcon(this);
}
} else if (this._iconsetName && this._meta) {
this._iconset = this._meta.byKey(this._iconsetName);
if (this._iconset) {
this._iconset.applyIcon(this, this._iconName, this.theme);
this.unlisten(window, 'iron-iconset-added', '_updateIcon');
} else {
this.listen(window, 'iron-iconset-added', '_updateIcon');
}
}
} else {
if (this._iconset) {
this._iconset.removeIcon(this);
}
if (!this._img) {
this._img = document.createElement('img');
this._img.style.width = '100%';
this._img.style.height = '100%';
this._img.draggable = false;
}
this._img.src = this.src;
Polymer.dom(this.root).appendChild(this._img);
}
}
});
Polymer({
is: 'iron-iconset-svg',
properties: {
name: {
type: String,
observer: '_nameChanged'
},
size: {
type: Number,
value: 24
}
},
attached: function () {
this.style.display = 'none';
},
getIconNames: function () {
this._icons = this._createIconMap();
return Object.keys(this._icons).map(function (n) {
return this.name + ':' + n;
}, this);
},
applyIcon: function (element, iconName) {
element = element.root || element;
this.removeIcon(element);
var svg = this._cloneIcon(iconName);
if (svg) {
var pde = Polymer.dom(element);
pde.insertBefore(svg, pde.childNodes[0]);
return element._svgIcon = svg;
}
return null;
},
removeIcon: function (element) {
if (element._svgIcon) {
Polymer.dom(element).removeChild(element._svgIcon);
element._svgIcon = null;
}
},
_nameChanged: function () {
new Polymer.IronMeta({
type: 'iconset',
key: this.name,
value: this
});
this.async(function () {
this.fire('iron-iconset-added', this, { node: window });
});
},
_createIconMap: function () {
var icons = Object.create(null);
Polymer.dom(this).querySelectorAll('[id]').forEach(function (icon) {
icons[icon.id] = icon;
});
return icons;
},
_cloneIcon: function (id) {
this._icons = this._icons || this._createIconMap();
return this._prepareSvgClone(this._icons[id], this.size);
},
_prepareSvgClone: function (sourceSvg, size) {
if (sourceSvg) {
var content = sourceSvg.cloneNode(true), svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg'), viewBox = content.getAttribute('viewBox') || '0 0 ' + size + ' ' + size;
svg.setAttribute('viewBox', viewBox);
svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
svg.style.cssText = 'pointer-events: none; display: block; width: 100%; height: 100%;';
svg.appendChild(content).removeAttribute('id');
return svg;
}
return null;
}
});
Polymer.IronResizableBehavior = {
properties: {
_parentResizable: {
type: Object,
observer: '_parentResizableChanged'
},
_notifyingDescendant: {
type: Boolean,
value: false
}
},
listeners: { 'iron-request-resize-notifications': '_onIronRequestResizeNotifications' },
created: function () {
this._interestedResizables = [];
this._boundNotifyResize = this.notifyResize.bind(this);
},
attached: function () {
this.fire('iron-request-resize-notifications', null, {
node: this,
bubbles: true,
cancelable: true
});
if (!this._parentResizable) {
window.addEventListener('resize', this._boundNotifyResize);
this.notifyResize();
}
},
detached: function () {
if (this._parentResizable) {
this._parentResizable.stopResizeNotificationsFor(this);
} else {
window.removeEventListener('resize', this._boundNotifyResize);
}
this._parentResizable = null;
},
notifyResize: function () {
if (!this.isAttached) {
return;
}
this._interestedResizables.forEach(function (resizable) {
if (this.resizerShouldNotify(resizable)) {
this._notifyDescendant(resizable);
}
}, this);
this._fireResize();
},
assignParentResizable: function (parentResizable) {
this._parentResizable = parentResizable;
},
stopResizeNotificationsFor: function (target) {
var index = this._interestedResizables.indexOf(target);
if (index > -1) {
this._interestedResizables.splice(index, 1);
this.unlisten(target, 'iron-resize', '_onDescendantIronResize');
}
},
resizerShouldNotify: function (element) {
return true;
},
_onDescendantIronResize: function (event) {
if (this._notifyingDescendant) {
event.stopPropagation();
return;
}
if (!Polymer.Settings.useShadow) {
this._fireResize();
}
},
_fireResize: function () {
this.fire('iron-resize', null, {
node: this,
bubbles: false
});
},
_onIronRequestResizeNotifications: function (event) {
var target = event.path ? event.path[0] : event.target;
if (target === this) {
return;
}
if (this._interestedResizables.indexOf(target) === -1) {
this._interestedResizables.push(target);
this.listen(target, 'iron-resize', '_onDescendantIronResize');
}
target.assignParentResizable(this);
this._notifyDescendant(target);
event.stopPropagation();
},
_parentResizableChanged: function (parentResizable) {
if (parentResizable) {
window.removeEventListener('resize', this._boundNotifyResize);
}
},
_notifyDescendant: function (descendant) {
if (!this.isAttached) {
return;
}
this._notifyingDescendant = true;
descendant.notifyResize();
this._notifyingDescendant = false;
}
};
Polymer.IronSelection = function (selectCallback) {
this.selection = [];
this.selectCallback = selectCallback;
};
Polymer.IronSelection.prototype = {
get: function () {
return this.multi ? this.selection.slice() : this.selection[0];
},
clear: function (excludes) {
this.selection.slice().forEach(function (item) {
if (!excludes || excludes.indexOf(item) < 0) {
this.setItemSelected(item, false);
}
}, this);
},
isSelected: function (item) {
return this.selection.indexOf(item) >= 0;
},
setItemSelected: function (item, isSelected) {
if (item != null) {
if (isSelected !== this.isSelected(item)) {
if (isSelected) {
this.selection.push(item);
} else {
var i = this.selection.indexOf(item);
if (i >= 0) {
this.selection.splice(i, 1);
}
}
if (this.selectCallback) {
this.selectCallback(item, isSelected);
}
}
}
},
select: function (item) {
if (this.multi) {
this.toggle(item);
} else if (this.get() !== item) {
this.setItemSelected(this.get(), false);
this.setItemSelected(item, true);
}
},
toggle: function (item) {
this.setItemSelected(item, !this.isSelected(item));
}
};
Polymer.IronSelectableBehavior = {
properties: {
attrForSelected: {
type: String,
value: null
},
selected: {
type: String,
notify: true
},
selectedItem: {
type: Object,
readOnly: true,
notify: true
},
activateEvent: {
type: String,
value: 'tap',
observer: '_activateEventChanged'
},
selectable: String,
selectedClass: {
type: String,
value: 'iron-selected'
},
selectedAttribute: {
type: String,
value: null
},
fallbackSelection: {
type: String,
value: null
},
items: {
type: Array,
readOnly: true,
notify: true,
value: function () {
return [];
}
},
_excludedLocalNames: {
type: Object,
value: function () {
return { 'template': 1 };
}
}
},
observers: [
'_updateAttrForSelected(attrForSelected)',
'_updateSelected(selected)',
'_checkFallback(fallbackSelection)'
],
created: function () {
this._bindFilterItem = this._filterItem.bind(this);
this._selection = new Polymer.IronSelection(this._applySelection.bind(this));
},
attached: function () {
this._observer = this._observeItems(this);
this._updateItems();
if (!this._shouldUpdateSelection) {
this._updateSelected();
}
this._addListener(this.activateEvent);
},
detached: function () {
if (this._observer) {
Polymer.dom(this).unobserveNodes(this._observer);
}
this._removeListener(this.activateEvent);
},
indexOf: function (item) {
return this.items.indexOf(item);
},
select: function (value) {
this.selected = value;
},
selectPrevious: function () {
var length = this.items.length;
var index = (Number(this._valueToIndex(this.selected)) - 1 + length) % length;
this.selected = this._indexToValue(index);
},
selectNext: function () {
var index = (Number(this._valueToIndex(this.selected)) + 1) % this.items.length;
this.selected = this._indexToValue(index);
},
forceSynchronousItemUpdate: function () {
this._updateItems();
},
get _shouldUpdateSelection() {
return this.selected != null;
},
_checkFallback: function () {
if (this._shouldUpdateSelection) {
this._updateSelected();
}
},
_addListener: function (eventName) {
this.listen(this, eventName, '_activateHandler');
},
_removeListener: function (eventName) {
this.unlisten(this, eventName, '_activateHandler');
},
_activateEventChanged: function (eventName, old) {
this._removeListener(old);
this._addListener(eventName);
},
_updateItems: function () {
var nodes = Polymer.dom(this).queryDistributedElements(this.selectable || '*');
nodes = Array.prototype.filter.call(nodes, this._bindFilterItem);
this._setItems(nodes);
},
_updateAttrForSelected: function () {
if (this._shouldUpdateSelection) {
this.selected = this._indexToValue(this.indexOf(this.selectedItem));
}
},
_updateSelected: function () {
this._selectSelected(this.selected);
},
_selectSelected: function (selected) {
this._selection.select(this._valueToItem(this.selected));
if (this.fallbackSelection && this.items.length && this._selection.get() === undefined) {
this.selected = this.fallbackSelection;
}
},
_filterItem: function (node) {
return !this._excludedLocalNames[node.localName];
},
_valueToItem: function (value) {
return value == null ? null : this.items[this._valueToIndex(value)];
},
_valueToIndex: function (value) {
if (this.attrForSelected) {
for (var i = 0, item; item = this.items[i]; i++) {
if (this._valueForItem(item) == value) {
return i;
}
}
} else {
return Number(value);
}
},
_indexToValue: function (index) {
if (this.attrForSelected) {
var item = this.items[index];
if (item) {
return this._valueForItem(item);
}
} else {
return index;
}
},
_valueForItem: function (item) {
var propValue = item[Polymer.CaseMap.dashToCamelCase(this.attrForSelected)];
return propValue != undefined ? propValue : item.getAttribute(this.attrForSelected);
},
_applySelection: function (item, isSelected) {
if (this.selectedClass) {
this.toggleClass(this.selectedClass, isSelected, item);
}
if (this.selectedAttribute) {
this.toggleAttribute(this.selectedAttribute, isSelected, item);
}
this._selectionChange();
this.fire('iron-' + (isSelected ? 'select' : 'deselect'), { item: item });
},
_selectionChange: function () {
this._setSelectedItem(this._selection.get());
},
_observeItems: function (node) {
return Polymer.dom(node).observeNodes(function (mutations) {
this._updateItems();
if (this._shouldUpdateSelection) {
this._updateSelected();
}
this.fire('iron-items-changed', mutations, {
bubbles: false,
cancelable: false
});
});
},
_activateHandler: function (e) {
var t = e.target;
var items = this.items;
while (t && t != this) {
var i = items.indexOf(t);
if (i >= 0) {
var value = this._indexToValue(i);
this._itemActivate(value, t);
return;
}
t = t.parentNode;
}
},
_itemActivate: function (value, item) {
if (!this.fire('iron-activate', {
selected: value,
item: item
}, { cancelable: true }).defaultPrevented) {
this.select(value);
}
}
};
Polymer({
is: 'iron-pages',
behaviors: [
Polymer.IronResizableBehavior,
Polymer.IronSelectableBehavior
],
properties: {
activateEvent: {
type: String,
value: null
}
},
observers: ['_selectedPageChanged(selected)'],
_selectedPageChanged: function (selected, old) {
this.async(this.notifyResize);
}
});
Polymer.IronMultiSelectableBehaviorImpl = {
properties: {
multi: {
type: Boolean,
value: false,
observer: 'multiChanged'
},
selectedValues: {
type: Array,
notify: true
},
selectedItems: {
type: Array,
readOnly: true,
notify: true
}
},
observers: ['_updateSelected(selectedValues.splices)'],
select: function (value) {
if (this.multi) {
if (this.selectedValues) {
this._toggleSelected(value);
} else {
this.selectedValues = [value];
}
} else {
this.selected = value;
}
},
multiChanged: function (multi) {
this._selection.multi = multi;
},
get _shouldUpdateSelection() {
return this.selected != null || this.selectedValues != null && this.selectedValues.length;
},
_updateAttrForSelected: function () {
if (!this.multi) {
Polymer.IronSelectableBehavior._updateAttrForSelected.apply(this);
} else if (this._shouldUpdateSelection) {
this.selectedValues = this.selectedItems.map(function (selectedItem) {
return this._indexToValue(this.indexOf(selectedItem));
}, this).filter(function (unfilteredValue) {
return unfilteredValue != null;
}, this);
}
},
_updateSelected: function () {
if (this.multi) {
this._selectMulti(this.selectedValues);
} else {
this._selectSelected(this.selected);
}
},
_selectMulti: function (values) {
if (values) {
var selectedItems = this._valuesToItems(values);
this._selection.clear(selectedItems);
for (var i = 0; i < selectedItems.length; i++) {
this._selection.setItemSelected(selectedItems[i], true);
}
if (this.fallbackSelection && this.items.length && !this._selection.get().length) {
var fallback = this._valueToItem(this.fallbackSelection);
if (fallback) {
this.selectedValues = [this.fallbackSelection];
}
}
} else {
this._selection.clear();
}
},
_selectionChange: function () {
var s = this._selection.get();
if (this.multi) {
this._setSelectedItems(s);
} else {
this._setSelectedItems([s]);
this._setSelectedItem(s);
}
},
_toggleSelected: function (value) {
var i = this.selectedValues.indexOf(value);
var unselected = i < 0;
if (unselected) {
this.push('selectedValues', value);
} else {
this.splice('selectedValues', i, 1);
}
},
_valuesToItems: function (values) {
return values == null ? null : values.map(function (value) {
return this._valueToItem(value);
}, this);
}
};
Polymer.IronMultiSelectableBehavior = [
Polymer.IronSelectableBehavior,
Polymer.IronMultiSelectableBehaviorImpl
];
Polymer({
is: 'iron-selector',
behaviors: [Polymer.IronMultiSelectableBehavior]
});
Polymer({
is: 'iron-media-query',
properties: {
queryMatches: {
type: Boolean,
value: false,
readOnly: true,
notify: true
},
query: {
type: String,
observer: 'queryChanged'
},
full: {
type: Boolean,
value: false
},
_boundMQHandler: {
value: function () {
return this.queryHandler.bind(this);
}
},
_mq: { value: null }
},
attached: function () {
this.style.display = 'none';
this.queryChanged();
},
detached: function () {
this._remove();
},
_add: function () {
if (this._mq) {
this._mq.addListener(this._boundMQHandler);
}
},
_remove: function () {
if (this._mq) {
this._mq.removeListener(this._boundMQHandler);
}
this._mq = null;
},
queryChanged: function () {
this._remove();
var query = this.query;
if (!query) {
return;
}
if (!this.full && query[0] !== '(') {
query = '(' + query + ')';
}
this._mq = window.matchMedia(query);
this._add();
this.queryHandler(this._mq);
},
queryHandler: function (mq) {
this._setQueryMatches(mq.matches);
}
});
(function () {
'use strict';
var sharedPanel = null;
function classNames(obj) {
var classes = [];
for (var key in obj) {
if (obj.hasOwnProperty(key) && obj[key]) {
classes.push(key);
}
}
return classes.join(' ');
}
Polymer({
is: 'paper-drawer-panel',
behaviors: [Polymer.IronResizableBehavior],
properties: {
defaultSelected: {
type: String,
value: 'main'
},
disableEdgeSwipe: {
type: Boolean,
value: false
},
disableSwipe: {
type: Boolean,
value: false
},
dragging: {
type: Boolean,
value: false,
readOnly: true,
notify: true
},
drawerWidth: {
type: String,
value: '256px'
},
edgeSwipeSensitivity: {
type: Number,
value: 30
},
forceNarrow: {
type: Boolean,
value: false
},
hasTransform: {
type: Boolean,
value: function () {
return 'transform' in this.style;
}
},
hasWillChange: {
type: Boolean,
value: function () {
return 'willChange' in this.style;
}
},
narrow: {
reflectToAttribute: true,
type: Boolean,
value: false,
readOnly: true,
notify: true
},
peeking: {
type: Boolean,
value: false,
readOnly: true,
notify: true
},
responsiveWidth: {
type: String,
value: '600px'
},
rightDrawer: {
type: Boolean,
value: false
},
selected: {
reflectToAttribute: true,
notify: true,
type: String,
value: null
},
drawerToggleAttribute: {
type: String,
value: 'paper-drawer-toggle'
},
drawerFocusSelector: {
type: String,
value: 'a[href]:not([tabindex="-1"]),' + 'area[href]:not([tabindex="-1"]),' + 'input:not([disabled]):not([tabindex="-1"]),' + 'select:not([disabled]):not([tabindex="-1"]),' + 'textarea:not([disabled]):not([tabindex="-1"]),' + 'button:not([disabled]):not([tabindex="-1"]),' + 'iframe:not([tabindex="-1"]),' + '[tabindex]:not([tabindex="-1"]),' + '[contentEditable=true]:not([tabindex="-1"])'
},
_transition: {
type: Boolean,
value: false
}
},
listeners: {
tap: '_onTap',
track: '_onTrack',
down: '_downHandler',
up: '_upHandler',
transitionend: '_onTransitionEnd'
},
observers: [
'_forceNarrowChanged(forceNarrow, defaultSelected)',
'_toggleFocusListener(selected)'
],
ready: function () {
this._transition = true;
this._boundFocusListener = this._didFocus.bind(this);
},
togglePanel: function () {
if (this._isMainSelected()) {
this.openDrawer();
} else {
this.closeDrawer();
}
},
openDrawer: function () {
this.selected = 'drawer';
},
closeDrawer: function () {
this.selected = 'main';
},
_onTransitionEnd: function (e) {
var target = Polymer.dom(e).localTarget;
if (target !== this) {
return;
}
if (e.propertyName === 'left' || e.propertyName === 'right') {
this.notifyResize();
}
if (e.propertyName === 'transform' && this.selected === 'drawer') {
var focusedChild = this._getAutoFocusedNode();
focusedChild && focusedChild.focus();
}
},
_computeIronSelectorClass: function (narrow, transition, dragging, rightDrawer, peeking) {
return classNames({
dragging: dragging,
'narrow-layout': narrow,
'right-drawer': rightDrawer,
'left-drawer': !rightDrawer,
transition: transition,
peeking: peeking
});
},
_computeDrawerStyle: function (drawerWidth) {
return 'width:' + drawerWidth + ';';
},
_computeMainStyle: function (narrow, rightDrawer, drawerWidth) {
var style = '';
style += 'left:' + (narrow || rightDrawer ? '0' : drawerWidth) + ';';
if (rightDrawer) {
style += 'right:' + (narrow ? '' : drawerWidth) + ';';
}
return style;
},
_computeMediaQuery: function (forceNarrow, responsiveWidth) {
return forceNarrow ? '' : '(max-width: ' + responsiveWidth + ')';
},
_computeSwipeOverlayHidden: function (narrow, disableEdgeSwipe) {
return !narrow || disableEdgeSwipe;
},
_onTrack: function (event) {
if (sharedPanel && this !== sharedPanel) {
return;
}
switch (event.detail.state) {
case 'start':
this._trackStart(event);
break;
case 'track':
this._trackX(event);
break;
case 'end':
this._trackEnd(event);
break;
}
},
_responsiveChange: function (narrow) {
this._setNarrow(narrow);
this.selected = this.narrow ? this.defaultSelected : null;
this.setScrollDirection(this._swipeAllowed() ? 'y' : 'all');
this.fire('paper-responsive-change', { narrow: this.narrow });
},
_onQueryMatchesChanged: function (event) {
this._responsiveChange(event.detail.value);
},
_forceNarrowChanged: function () {
this._responsiveChange(this.forceNarrow || this.$.mq.queryMatches);
},
_swipeAllowed: function () {
return this.narrow && !this.disableSwipe;
},
_isMainSelected: function () {
return this.selected === 'main';
},
_startEdgePeek: function () {
this.width = this.$.drawer.offsetWidth;
this._moveDrawer(this._translateXForDeltaX(this.rightDrawer ? -this.edgeSwipeSensitivity : this.edgeSwipeSensitivity));
this._setPeeking(true);
},
_stopEdgePeek: function () {
if (this.peeking) {
this._setPeeking(false);
this._moveDrawer(null);
}
},
_downHandler: function (event) {
if (!this.dragging && this._isMainSelected() && this._isEdgeTouch(event) && !sharedPanel) {
this._startEdgePeek();
event.preventDefault();
sharedPanel = this;
}
},
_upHandler: function () {
this._stopEdgePeek();
sharedPanel = null;
},
_onTap: function (event) {
var targetElement = Polymer.dom(event).localTarget;
var isTargetToggleElement = targetElement && this.drawerToggleAttribute && targetElement.hasAttribute(this.drawerToggleAttribute);
if (isTargetToggleElement) {
this.togglePanel();
}
},
_isEdgeTouch: function (event) {
var x = event.detail.x;
return !this.disableEdgeSwipe && this._swipeAllowed() && (this.rightDrawer ? x >= this.offsetWidth - this.edgeSwipeSensitivity : x <= this.edgeSwipeSensitivity);
},
_trackStart: function (event) {
if (this._swipeAllowed()) {
sharedPanel = this;
this._setDragging(true);
if (this._isMainSelected()) {
this._setDragging(this.peeking || this._isEdgeTouch(event));
}
if (this.dragging) {
this.width = this.$.drawer.offsetWidth;
this._transition = false;
}
}
},
_translateXForDeltaX: function (deltaX) {
var isMain = this._isMainSelected();
if (this.rightDrawer) {
return Math.max(0, isMain ? this.width + deltaX : deltaX);
} else {
return Math.min(0, isMain ? deltaX - this.width : deltaX);
}
},
_trackX: function (event) {
if (this.dragging) {
var dx = event.detail.dx;
if (this.peeking) {
if (Math.abs(dx) <= this.edgeSwipeSensitivity) {
return;
}
this._setPeeking(false);
}
this._moveDrawer(this._translateXForDeltaX(dx));
}
},
_trackEnd: function (event) {
if (this.dragging) {
var xDirection = event.detail.dx > 0;
this._setDragging(false);
this._transition = true;
sharedPanel = null;
this._moveDrawer(null);
if (this.rightDrawer) {
this[xDirection ? 'closeDrawer' : 'openDrawer']();
} else {
this[xDirection ? 'openDrawer' : 'closeDrawer']();
}
}
},
_transformForTranslateX: function (translateX) {
if (translateX === null) {
return '';
}
return this.hasWillChange ? 'translateX(' + translateX + 'px)' : 'translate3d(' + translateX + 'px, 0, 0)';
},
_moveDrawer: function (translateX) {
this.transform(this._transformForTranslateX(translateX), this.$.drawer);
},
_getDrawerContent: function () {
return Polymer.dom(this.$.drawerContent).getDistributedNodes()[0];
},
_getAutoFocusedNode: function () {
var drawerContent = this._getDrawerContent();
return this.drawerFocusSelector ? Polymer.dom(drawerContent).querySelector(this.drawerFocusSelector) || drawerContent : null;
},
_toggleFocusListener: function (selected) {
if (selected === 'drawer') {
this.addEventListener('focus', this._boundFocusListener, true);
} else {
this.removeEventListener('focus', this._boundFocusListener, true);
}
},
_didFocus: function (event) {
var autoFocusedNode = this._getAutoFocusedNode();
if (!autoFocusedNode) {
return;
}
var path = Polymer.dom(event).path;
var focusedChild = path[0];
var drawerContent = this._getDrawerContent();
var focusedChildCameFromDrawer = path.indexOf(drawerContent) !== -1;
if (!focusedChildCameFromDrawer) {
event.stopPropagation();
autoFocusedNode.focus();
}
},
_isDrawerClosed: function (narrow, selected) {
return !narrow || selected !== 'drawer';
}
});
}());
(function () {
'use strict';
var KEY_IDENTIFIER = {
'U+0008': 'backspace',
'U+0009': 'tab',
'U+001B': 'esc',
'U+0020': 'space',
'U+007F': 'del'
};
var KEY_CODE = {
8: 'backspace',
9: 'tab',
13: 'enter',
27: 'esc',
33: 'pageup',
34: 'pagedown',
35: 'end',
36: 'home',
32: 'space',
37: 'left',
38: 'up',
39: 'right',
40: 'down',
46: 'del',
106: '*'
};
var MODIFIER_KEYS = {
'shift': 'shiftKey',
'ctrl': 'ctrlKey',
'alt': 'altKey',
'meta': 'metaKey'
};
var KEY_CHAR = /[a-z0-9*]/;
var IDENT_CHAR = /U\+/;
var ARROW_KEY = /^arrow/;
var SPACE_KEY = /^space(bar)?/;
var ESC_KEY = /^escape$/;
function transformKey(key, noSpecialChars) {
var validKey = '';
if (key) {
var lKey = key.toLowerCase();
if (lKey === ' ' || SPACE_KEY.test(lKey)) {
validKey = 'space';
} else if (ESC_KEY.test(lKey)) {
validKey = 'esc';
} else if (lKey.length == 1) {
if (!noSpecialChars || KEY_CHAR.test(lKey)) {
validKey = lKey;
}
} else if (ARROW_KEY.test(lKey)) {
validKey = lKey.replace('arrow', '');
} else if (lKey == 'multiply') {
validKey = '*';
} else {
validKey = lKey;
}
}
return validKey;
}
function transformKeyIdentifier(keyIdent) {
var validKey = '';
if (keyIdent) {
if (keyIdent in KEY_IDENTIFIER) {
validKey = KEY_IDENTIFIER[keyIdent];
} else if (IDENT_CHAR.test(keyIdent)) {
keyIdent = parseInt(keyIdent.replace('U+', '0x'), 16);
validKey = String.fromCharCode(keyIdent).toLowerCase();
} else {
validKey = keyIdent.toLowerCase();
}
}
return validKey;
}
function transformKeyCode(keyCode) {
var validKey = '';
if (Number(keyCode)) {
if (keyCode >= 65 && keyCode <= 90) {
validKey = String.fromCharCode(32 + keyCode);
} else if (keyCode >= 112 && keyCode <= 123) {
validKey = 'f' + (keyCode - 112);
} else if (keyCode >= 48 && keyCode <= 57) {
validKey = String(keyCode - 48);
} else if (keyCode >= 96 && keyCode <= 105) {
validKey = String(keyCode - 96);
} else {
validKey = KEY_CODE[keyCode];
}
}
return validKey;
}
function normalizedKeyForEvent(keyEvent, noSpecialChars) {
return transformKey(keyEvent.key, noSpecialChars) || transformKeyIdentifier(keyEvent.keyIdentifier) || transformKeyCode(keyEvent.keyCode) || transformKey(keyEvent.detail.key, noSpecialChars) || '';
}
function keyComboMatchesEvent(keyCombo, event) {
var keyEvent = normalizedKeyForEvent(event, keyCombo.hasModifiers);
return keyEvent === keyCombo.key && (!keyCombo.hasModifiers || !!event.shiftKey === !!keyCombo.shiftKey && !!event.ctrlKey === !!keyCombo.ctrlKey && !!event.altKey === !!keyCombo.altKey && !!event.metaKey === !!keyCombo.metaKey);
}
function parseKeyComboString(keyComboString) {
if (keyComboString.length === 1) {
return {
combo: keyComboString,
key: keyComboString,
event: 'keydown'
};
}
return keyComboString.split('+').reduce(function (parsedKeyCombo, keyComboPart) {
var eventParts = keyComboPart.split(':');
var keyName = eventParts[0];
var event = eventParts[1];
if (keyName in MODIFIER_KEYS) {
parsedKeyCombo[MODIFIER_KEYS[keyName]] = true;
parsedKeyCombo.hasModifiers = true;
} else {
parsedKeyCombo.key = keyName;
parsedKeyCombo.event = event || 'keydown';
}
return parsedKeyCombo;
}, { combo: keyComboString.split(':').shift() });
}
function parseEventString(eventString) {
return eventString.trim().split(' ').map(function (keyComboString) {
return parseKeyComboString(keyComboString);
});
}
Polymer.IronA11yKeysBehavior = {
properties: {
keyEventTarget: {
type: Object,
value: function () {
return this;
}
},
stopKeyboardEventPropagation: {
type: Boolean,
value: false
},
_boundKeyHandlers: {
type: Array,
value: function () {
return [];
}
},
_imperativeKeyBindings: {
type: Object,
value: function () {
return {};
}
}
},
observers: ['_resetKeyEventListeners(keyEventTarget, _boundKeyHandlers)'],
keyBindings: {},
registered: function () {
this._prepKeyBindings();
},
attached: function () {
this._listenKeyEventListeners();
},
detached: function () {
this._unlistenKeyEventListeners();
},
addOwnKeyBinding: function (eventString, handlerName) {
this._imperativeKeyBindings[eventString] = handlerName;
this._prepKeyBindings();
this._resetKeyEventListeners();
},
removeOwnKeyBindings: function () {
this._imperativeKeyBindings = {};
this._prepKeyBindings();
this._resetKeyEventListeners();
},
keyboardEventMatchesKeys: function (event, eventString) {
var keyCombos = parseEventString(eventString);
for (var i = 0; i < keyCombos.length; ++i) {
if (keyComboMatchesEvent(keyCombos[i], event)) {
return true;
}
}
return false;
},
_collectKeyBindings: function () {
var keyBindings = this.behaviors.map(function (behavior) {
return behavior.keyBindings;
});
if (keyBindings.indexOf(this.keyBindings) === -1) {
keyBindings.push(this.keyBindings);
}
return keyBindings;
},
_prepKeyBindings: function () {
this._keyBindings = {};
this._collectKeyBindings().forEach(function (keyBindings) {
for (var eventString in keyBindings) {
this._addKeyBinding(eventString, keyBindings[eventString]);
}
}, this);
for (var eventString in this._imperativeKeyBindings) {
this._addKeyBinding(eventString, this._imperativeKeyBindings[eventString]);
}
for (var eventName in this._keyBindings) {
this._keyBindings[eventName].sort(function (kb1, kb2) {
var b1 = kb1[0].hasModifiers;
var b2 = kb2[0].hasModifiers;
return b1 === b2 ? 0 : b1 ? -1 : 1;
});
}
},
_addKeyBinding: function (eventString, handlerName) {
parseEventString(eventString).forEach(function (keyCombo) {
this._keyBindings[keyCombo.event] = this._keyBindings[keyCombo.event] || [];
this._keyBindings[keyCombo.event].push([
keyCombo,
handlerName
]);
}, this);
},
_resetKeyEventListeners: function () {
this._unlistenKeyEventListeners();
if (this.isAttached) {
this._listenKeyEventListeners();
}
},
_listenKeyEventListeners: function () {
Object.keys(this._keyBindings).forEach(function (eventName) {
var keyBindings = this._keyBindings[eventName];
var boundKeyHandler = this._onKeyBindingEvent.bind(this, keyBindings);
this._boundKeyHandlers.push([
this.keyEventTarget,
eventName,
boundKeyHandler
]);
this.keyEventTarget.addEventListener(eventName, boundKeyHandler);
}, this);
},
_unlistenKeyEventListeners: function () {
var keyHandlerTuple;
var keyEventTarget;
var eventName;
var boundKeyHandler;
while (this._boundKeyHandlers.length) {
keyHandlerTuple = this._boundKeyHandlers.pop();
keyEventTarget = keyHandlerTuple[0];
eventName = keyHandlerTuple[1];
boundKeyHandler = keyHandlerTuple[2];
keyEventTarget.removeEventListener(eventName, boundKeyHandler);
}
},
_onKeyBindingEvent: function (keyBindings, event) {
if (this.stopKeyboardEventPropagation) {
event.stopPropagation();
}
if (event.defaultPrevented) {
return;
}
for (var i = 0; i < keyBindings.length; i++) {
var keyCombo = keyBindings[i][0];
var handlerName = keyBindings[i][1];
if (keyComboMatchesEvent(keyCombo, event)) {
this._triggerKeyHandler(keyCombo, handlerName, event);
if (event.defaultPrevented) {
return;
}
}
}
},
_triggerKeyHandler: function (keyCombo, handlerName, keyboardEvent) {
var detail = Object.create(keyCombo);
detail.keyboardEvent = keyboardEvent;
var event = new CustomEvent(keyCombo.event, {
detail: detail,
cancelable: true
});
this[handlerName].call(this, event);
if (event.defaultPrevented) {
keyboardEvent.preventDefault();
}
}
};
}());
Polymer.IronControlState = {
properties: {
focused: {
type: Boolean,
value: false,
notify: true,
readOnly: true,
reflectToAttribute: true
},
disabled: {
type: Boolean,
value: false,
notify: true,
observer: '_disabledChanged',
reflectToAttribute: true
},
_oldTabIndex: { type: Number },
_boundFocusBlurHandler: {
type: Function,
value: function () {
return this._focusBlurHandler.bind(this);
}
}
},
observers: ['_changedControlState(focused, disabled)'],
ready: function () {
this.addEventListener('focus', this._boundFocusBlurHandler, true);
this.addEventListener('blur', this._boundFocusBlurHandler, true);
},
_focusBlurHandler: function (event) {
if (event.target === this) {
this._setFocused(event.type === 'focus');
} else if (!this.shadowRoot && !this.isLightDescendant(event.target)) {
this.fire(event.type, { sourceEvent: event }, {
node: this,
bubbles: event.bubbles,
cancelable: event.cancelable
});
}
},
_disabledChanged: function (disabled, old) {
this.setAttribute('aria-disabled', disabled ? 'true' : 'false');
this.style.pointerEvents = disabled ? 'none' : '';
if (disabled) {
this._oldTabIndex = this.tabIndex;
this.focused = false;
this.tabIndex = -1;
this.blur();
} else if (this._oldTabIndex !== undefined) {
this.tabIndex = this._oldTabIndex;
}
},
_changedControlState: function () {
if (this._controlStateChanged) {
this._controlStateChanged();
}
}
};
Polymer.IronButtonStateImpl = {
properties: {
pressed: {
type: Boolean,
readOnly: true,
value: false,
reflectToAttribute: true,
observer: '_pressedChanged'
},
toggles: {
type: Boolean,
value: false,
reflectToAttribute: true
},
active: {
type: Boolean,
value: false,
notify: true,
reflectToAttribute: true
},
pointerDown: {
type: Boolean,
readOnly: true,
value: false
},
receivedFocusFromKeyboard: {
type: Boolean,
readOnly: true
},
ariaActiveAttribute: {
type: String,
value: 'aria-pressed',
observer: '_ariaActiveAttributeChanged'
}
},
listeners: {
down: '_downHandler',
up: '_upHandler',
tap: '_tapHandler'
},
observers: [
'_detectKeyboardFocus(focused)',
'_activeChanged(active, ariaActiveAttribute)'
],
keyBindings: {
'enter:keydown': '_asyncClick',
'space:keydown': '_spaceKeyDownHandler',
'space:keyup': '_spaceKeyUpHandler'
},
_mouseEventRe: /^mouse/,
_tapHandler: function () {
if (this.toggles) {
this._userActivate(!this.active);
} else {
this.active = false;
}
},
_detectKeyboardFocus: function (focused) {
this._setReceivedFocusFromKeyboard(!this.pointerDown && focused);
},
_userActivate: function (active) {
if (this.active !== active) {
this.active = active;
this.fire('change');
}
},
_downHandler: function (event) {
this._setPointerDown(true);
this._setPressed(true);
this._setReceivedFocusFromKeyboard(false);
},
_upHandler: function () {
this._setPointerDown(false);
this._setPressed(false);
},
_spaceKeyDownHandler: function (event) {
var keyboardEvent = event.detail.keyboardEvent;
var target = Polymer.dom(keyboardEvent).localTarget;
if (this.isLightDescendant(target))
return;
keyboardEvent.preventDefault();
keyboardEvent.stopImmediatePropagation();
this._setPressed(true);
},
_spaceKeyUpHandler: function (event) {
var keyboardEvent = event.detail.keyboardEvent;
var target = Polymer.dom(keyboardEvent).localTarget;
if (this.isLightDescendant(target))
return;
if (this.pressed) {
this._asyncClick();
}
this._setPressed(false);
},
_asyncClick: function () {
this.async(function () {
this.click();
}, 1);
},
_pressedChanged: function (pressed) {
this._changedButtonState();
},
_ariaActiveAttributeChanged: function (value, oldValue) {
if (oldValue && oldValue != value && this.hasAttribute(oldValue)) {
this.removeAttribute(oldValue);
}
},
_activeChanged: function (active, ariaActiveAttribute) {
if (this.toggles) {
this.setAttribute(this.ariaActiveAttribute, active ? 'true' : 'false');
} else {
this.removeAttribute(this.ariaActiveAttribute);
}
this._changedButtonState();
},
_controlStateChanged: function () {
if (this.disabled) {
this._setPressed(false);
} else {
this._changedButtonState();
}
},
_changedButtonState: function () {
if (this._buttonStateChanged) {
this._buttonStateChanged();
}
}
};
Polymer.IronButtonState = [
Polymer.IronA11yKeysBehavior,
Polymer.IronButtonStateImpl
];
(function () {
var Utility = {
distance: function (x1, y1, x2, y2) {
var xDelta = x1 - x2;
var yDelta = y1 - y2;
return Math.sqrt(xDelta * xDelta + yDelta * yDelta);
},
now: window.performance && window.performance.now ? window.performance.now.bind(window.performance) : Date.now
};
function ElementMetrics(element) {
this.element = element;
this.width = this.boundingRect.width;
this.height = this.boundingRect.height;
this.size = Math.max(this.width, this.height);
}
ElementMetrics.prototype = {
get boundingRect() {
return this.element.getBoundingClientRect();
},
furthestCornerDistanceFrom: function (x, y) {
var topLeft = Utility.distance(x, y, 0, 0);
var topRight = Utility.distance(x, y, this.width, 0);
var bottomLeft = Utility.distance(x, y, 0, this.height);
var bottomRight = Utility.distance(x, y, this.width, this.height);
return Math.max(topLeft, topRight, bottomLeft, bottomRight);
}
};
function Ripple(element) {
this.element = element;
this.color = window.getComputedStyle(element).color;
this.wave = document.createElement('div');
this.waveContainer = document.createElement('div');
this.wave.style.backgroundColor = this.color;
this.wave.classList.add('wave');
this.waveContainer.classList.add('wave-container');
Polymer.dom(this.waveContainer).appendChild(this.wave);
this.resetInteractionState();
}
Ripple.MAX_RADIUS = 300;
Ripple.prototype = {
get recenters() {
return this.element.recenters;
},
get center() {
return this.element.center;
},
get mouseDownElapsed() {
var elapsed;
if (!this.mouseDownStart) {
return 0;
}
elapsed = Utility.now() - this.mouseDownStart;
if (this.mouseUpStart) {
elapsed -= this.mouseUpElapsed;
}
return elapsed;
},
get mouseUpElapsed() {
return this.mouseUpStart ? Utility.now() - this.mouseUpStart : 0;
},
get mouseDownElapsedSeconds() {
return this.mouseDownElapsed / 1000;
},
get mouseUpElapsedSeconds() {
return this.mouseUpElapsed / 1000;
},
get mouseInteractionSeconds() {
return this.mouseDownElapsedSeconds + this.mouseUpElapsedSeconds;
},
get initialOpacity() {
return this.element.initialOpacity;
},
get opacityDecayVelocity() {
return this.element.opacityDecayVelocity;
},
get radius() {
var width2 = this.containerMetrics.width * this.containerMetrics.width;
var height2 = this.containerMetrics.height * this.containerMetrics.height;
var waveRadius = Math.min(Math.sqrt(width2 + height2), Ripple.MAX_RADIUS) * 1.1 + 5;
var duration = 1.1 - 0.2 * (waveRadius / Ripple.MAX_RADIUS);
var timeNow = this.mouseInteractionSeconds / duration;
var size = waveRadius * (1 - Math.pow(80, -timeNow));
return Math.abs(size);
},
get opacity() {
if (!this.mouseUpStart) {
return this.initialOpacity;
}
return Math.max(0, this.initialOpacity - this.mouseUpElapsedSeconds * this.opacityDecayVelocity);
},
get outerOpacity() {
var outerOpacity = this.mouseUpElapsedSeconds * 0.3;
var waveOpacity = this.opacity;
return Math.max(0, Math.min(outerOpacity, waveOpacity));
},
get isOpacityFullyDecayed() {
return this.opacity < 0.01 && this.radius >= Math.min(this.maxRadius, Ripple.MAX_RADIUS);
},
get isRestingAtMaxRadius() {
return this.opacity >= this.initialOpacity && this.radius >= Math.min(this.maxRadius, Ripple.MAX_RADIUS);
},
get isAnimationComplete() {
return this.mouseUpStart ? this.isOpacityFullyDecayed : this.isRestingAtMaxRadius;
},
get translationFraction() {
return Math.min(1, this.radius / this.containerMetrics.size * 2 / Math.sqrt(2));
},
get xNow() {
if (this.xEnd) {
return this.xStart + this.translationFraction * (this.xEnd - this.xStart);
}
return this.xStart;
},
get yNow() {
if (this.yEnd) {
return this.yStart + this.translationFraction * (this.yEnd - this.yStart);
}
return this.yStart;
},
get isMouseDown() {
return this.mouseDownStart && !this.mouseUpStart;
},
resetInteractionState: function () {
this.maxRadius = 0;
this.mouseDownStart = 0;
this.mouseUpStart = 0;
this.xStart = 0;
this.yStart = 0;
this.xEnd = 0;
this.yEnd = 0;
this.slideDistance = 0;
this.containerMetrics = new ElementMetrics(this.element);
},
draw: function () {
var scale;
var translateString;
var dx;
var dy;
this.wave.style.opacity = this.opacity;
scale = this.radius / (this.containerMetrics.size / 2);
dx = this.xNow - this.containerMetrics.width / 2;
dy = this.yNow - this.containerMetrics.height / 2;
this.waveContainer.style.webkitTransform = 'translate(' + dx + 'px, ' + dy + 'px)';
this.waveContainer.style.transform = 'translate3d(' + dx + 'px, ' + dy + 'px, 0)';
this.wave.style.webkitTransform = 'scale(' + scale + ',' + scale + ')';
this.wave.style.transform = 'scale3d(' + scale + ',' + scale + ',1)';
},
downAction: function (event) {
var xCenter = this.containerMetrics.width / 2;
var yCenter = this.containerMetrics.height / 2;
this.resetInteractionState();
this.mouseDownStart = Utility.now();
if (this.center) {
this.xStart = xCenter;
this.yStart = yCenter;
this.slideDistance = Utility.distance(this.xStart, this.yStart, this.xEnd, this.yEnd);
} else {
this.xStart = event ? event.detail.x - this.containerMetrics.boundingRect.left : this.containerMetrics.width / 2;
this.yStart = event ? event.detail.y - this.containerMetrics.boundingRect.top : this.containerMetrics.height / 2;
}
if (this.recenters) {
this.xEnd = xCenter;
this.yEnd = yCenter;
this.slideDistance = Utility.distance(this.xStart, this.yStart, this.xEnd, this.yEnd);
}
this.maxRadius = this.containerMetrics.furthestCornerDistanceFrom(this.xStart, this.yStart);
this.waveContainer.style.top = (this.containerMetrics.height - this.containerMetrics.size) / 2 + 'px';
this.waveContainer.style.left = (this.containerMetrics.width - this.containerMetrics.size) / 2 + 'px';
this.waveContainer.style.width = this.containerMetrics.size + 'px';
this.waveContainer.style.height = this.containerMetrics.size + 'px';
},
upAction: function (event) {
if (!this.isMouseDown) {
return;
}
this.mouseUpStart = Utility.now();
},
remove: function () {
Polymer.dom(this.waveContainer.parentNode).removeChild(this.waveContainer);
}
};
Polymer({
is: 'paper-ripple',
behaviors: [Polymer.IronA11yKeysBehavior],
properties: {
initialOpacity: {
type: Number,
value: 0.25
},
opacityDecayVelocity: {
type: Number,
value: 0.8
},
recenters: {
type: Boolean,
value: false
},
center: {
type: Boolean,
value: false
},
ripples: {
type: Array,
value: function () {
return [];
}
},
animating: {
type: Boolean,
readOnly: true,
reflectToAttribute: true,
value: false
},
holdDown: {
type: Boolean,
value: false,
observer: '_holdDownChanged'
},
noink: {
type: Boolean,
value: false
},
_animating: { type: Boolean },
_boundAnimate: {
type: Function,
value: function () {
return this.animate.bind(this);
}
}
},
get target() {
var ownerRoot = Polymer.dom(this).getOwnerRoot();
var target;
if (this.parentNode.nodeType == 11) {
target = ownerRoot.host;
} else {
target = this.parentNode;
}
return target;
},
keyBindings: {
'enter:keydown': '_onEnterKeydown',
'space:keydown': '_onSpaceKeydown',
'space:keyup': '_onSpaceKeyup'
},
attached: function () {
this.keyEventTarget = this.target;
this.listen(this.target, 'up', 'uiUpAction');
this.listen(this.target, 'down', 'uiDownAction');
},
detached: function () {
this.unlisten(this.target, 'up', 'uiUpAction');
this.unlisten(this.target, 'down', 'uiDownAction');
},
get shouldKeepAnimating() {
for (var index = 0; index < this.ripples.length; ++index) {
if (!this.ripples[index].isAnimationComplete) {
return true;
}
}
return false;
},
simulatedRipple: function () {
this.downAction(null);
this.async(function () {
this.upAction();
}, 1);
},
uiDownAction: function (event) {
if (!this.noink) {
this.downAction(event);
}
},
downAction: function (event) {
if (this.holdDown && this.ripples.length > 0) {
return;
}
var ripple = this.addRipple();
ripple.downAction(event);
if (!this._animating) {
this.animate();
}
},
uiUpAction: function (event) {
if (!this.noink) {
this.upAction(event);
}
},
upAction: function (event) {
if (this.holdDown) {
return;
}
this.ripples.forEach(function (ripple) {
ripple.upAction(event);
});
this.animate();
},
onAnimationComplete: function () {
this._animating = false;
this.$.background.style.backgroundColor = null;
this.fire('transitionend');
},
addRipple: function () {
var ripple = new Ripple(this);
Polymer.dom(this.$.waves).appendChild(ripple.waveContainer);
this.$.background.style.backgroundColor = ripple.color;
this.ripples.push(ripple);
this._setAnimating(true);
return ripple;
},
removeRipple: function (ripple) {
var rippleIndex = this.ripples.indexOf(ripple);
if (rippleIndex < 0) {
return;
}
this.ripples.splice(rippleIndex, 1);
ripple.remove();
if (!this.ripples.length) {
this._setAnimating(false);
}
},
animate: function () {
var index;
var ripple;
this._animating = true;
for (index = 0; index < this.ripples.length; ++index) {
ripple = this.ripples[index];
ripple.draw();
this.$.background.style.opacity = ripple.outerOpacity;
if (ripple.isOpacityFullyDecayed && !ripple.isRestingAtMaxRadius) {
this.removeRipple(ripple);
}
}
if (!this.shouldKeepAnimating && this.ripples.length === 0) {
this.onAnimationComplete();
} else {
window.requestAnimationFrame(this._boundAnimate);
}
},
_onEnterKeydown: function () {
this.uiDownAction();
this.async(this.uiUpAction, 1);
},
_onSpaceKeydown: function () {
this.uiDownAction();
},
_onSpaceKeyup: function () {
this.uiUpAction();
},
_holdDownChanged: function (newVal, oldVal) {
if (oldVal === undefined) {
return;
}
if (newVal) {
this.downAction();
} else {
this.upAction();
}
}
});
}());
Polymer.PaperRippleBehavior = {
properties: {
noink: {
type: Boolean,
observer: '_noinkChanged'
},
_rippleContainer: { type: Object }
},
_buttonStateChanged: function () {
if (this.focused) {
this.ensureRipple();
}
},
_downHandler: function (event) {
Polymer.IronButtonStateImpl._downHandler.call(this, event);
if (this.pressed) {
this.ensureRipple(event);
}
},
ensureRipple: function (optTriggeringEvent) {
if (!this.hasRipple()) {
this._ripple = this._createRipple();
this._ripple.noink = this.noink;
var rippleContainer = this._rippleContainer || this.root;
if (rippleContainer) {
Polymer.dom(rippleContainer).appendChild(this._ripple);
}
if (optTriggeringEvent) {
var domContainer = Polymer.dom(this._rippleContainer || this);
var target = Polymer.dom(optTriggeringEvent).rootTarget;
if (domContainer.deepContains(target)) {
this._ripple.uiDownAction(optTriggeringEvent);
}
}
}
},
getRipple: function () {
this.ensureRipple();
return this._ripple;
},
hasRipple: function () {
return Boolean(this._ripple);
},
_createRipple: function () {
return document.createElement('paper-ripple');
},
_noinkChanged: function (noink) {
if (this.hasRipple()) {
this._ripple.noink = noink;
}
}
};
Polymer.PaperInkyFocusBehaviorImpl = {
observers: ['_focusedChanged(receivedFocusFromKeyboard)'],
_focusedChanged: function (receivedFocusFromKeyboard) {
if (receivedFocusFromKeyboard) {
this.ensureRipple();
}
if (this.hasRipple()) {
this._ripple.holdDown = receivedFocusFromKeyboard;
}
},
_createRipple: function () {
var ripple = Polymer.PaperRippleBehavior._createRipple();
ripple.id = 'ink';
ripple.setAttribute('center', '');
ripple.classList.add('circle');
return ripple;
}
};
Polymer.PaperInkyFocusBehavior = [
Polymer.IronButtonState,
Polymer.IronControlState,
Polymer.PaperRippleBehavior,
Polymer.PaperInkyFocusBehaviorImpl
];
Polymer({
is: 'paper-icon-button',
hostAttributes: {
role: 'button',
tabindex: '0'
},
behaviors: [Polymer.PaperInkyFocusBehavior],
properties: {
src: { type: String },
icon: { type: String },
alt: {
type: String,
observer: '_altChanged'
}
},
_altChanged: function (newValue, oldValue) {
var label = this.getAttribute('aria-label');
if (!label || oldValue == label) {
this.setAttribute('aria-label', newValue);
}
}
});
Polymer.PaperItemBehaviorImpl = {
hostAttributes: {
role: 'option',
tabindex: '0'
}
};
Polymer.PaperItemBehavior = [
Polymer.IronButtonState,
Polymer.IronControlState,
Polymer.PaperItemBehaviorImpl
];
Polymer({
is: 'paper-item',
behaviors: [Polymer.PaperItemBehavior]
});
Polymer({
is: 'paper-material',
properties: {
elevation: {
type: Number,
reflectToAttribute: true,
value: 1
},
animated: {
type: Boolean,
reflectToAttribute: true,
value: false
}
}
});
Polymer.IronMenuBehaviorImpl = {
properties: {
focusedItem: {
observer: '_focusedItemChanged',
readOnly: true,
type: Object
},
attrForItemTitle: { type: String }
},
hostAttributes: {
'role': 'menu',
'tabindex': '0'
},
observers: ['_updateMultiselectable(multi)'],
listeners: {
'focus': '_onFocus',
'keydown': '_onKeydown',
'iron-items-changed': '_onIronItemsChanged'
},
keyBindings: {
'up': '_onUpKey',
'down': '_onDownKey',
'esc': '_onEscKey',
'shift+tab:keydown': '_onShiftTabDown'
},
attached: function () {
this._resetTabindices();
},
select: function (value) {
if (this._defaultFocusAsync) {
this.cancelAsync(this._defaultFocusAsync);
this._defaultFocusAsync = null;
}
var item = this._valueToItem(value);
if (item && item.hasAttribute('disabled'))
return;
this._setFocusedItem(item);
Polymer.IronMultiSelectableBehaviorImpl.select.apply(this, arguments);
},
_resetTabindices: function () {
var selectedItem = this.multi ? this.selectedItems && this.selectedItems[0] : this.selectedItem;
this.items.forEach(function (item) {
item.setAttribute('tabindex', item === selectedItem ? '0' : '-1');
}, this);
},
_updateMultiselectable: function (multi) {
if (multi) {
this.setAttribute('aria-multiselectable', 'true');
} else {
this.removeAttribute('aria-multiselectable');
}
},
_focusWithKeyboardEvent: function (event) {
for (var i = 0, item; item = this.items[i]; i++) {
var attr = this.attrForItemTitle || 'textContent';
var title = item[attr] || item.getAttribute(attr);
if (title && title.trim().charAt(0).toLowerCase() === String.fromCharCode(event.keyCode).toLowerCase()) {
this._setFocusedItem(item);
break;
}
}
},
_focusPrevious: function () {
var length = this.items.length;
var index = (Number(this.indexOf(this.focusedItem)) - 1 + length) % length;
this._setFocusedItem(this.items[index]);
},
_focusNext: function () {
var index = (Number(this.indexOf(this.focusedItem)) + 1) % this.items.length;
this._setFocusedItem(this.items[index]);
},
_applySelection: function (item, isSelected) {
if (isSelected) {
item.setAttribute('aria-selected', 'true');
} else {
item.removeAttribute('aria-selected');
}
Polymer.IronSelectableBehavior._applySelection.apply(this, arguments);
},
_focusedItemChanged: function (focusedItem, old) {
old && old.setAttribute('tabindex', '-1');
if (focusedItem) {
focusedItem.setAttribute('tabindex', '0');
focusedItem.focus();
}
},
_onIronItemsChanged: function (event) {
var mutations = event.detail;
var mutation;
var index;
for (index = 0; index < mutations.length; ++index) {
mutation = mutations[index];
if (mutation.addedNodes.length) {
this._resetTabindices();
break;
}
}
},
_onShiftTabDown: function (event) {
var oldTabIndex = this.getAttribute('tabindex');
Polymer.IronMenuBehaviorImpl._shiftTabPressed = true;
this._setFocusedItem(null);
this.setAttribute('tabindex', '-1');
this.async(function () {
this.setAttribute('tabindex', oldTabIndex);
Polymer.IronMenuBehaviorImpl._shiftTabPressed = false;
}, 1);
},
_onFocus: function (event) {
if (Polymer.IronMenuBehaviorImpl._shiftTabPressed) {
return;
}
var rootTarget = Polymer.dom(event).rootTarget;
if (rootTarget !== this && typeof rootTarget.tabIndex !== 'undefined' && !this.isLightDescendant(rootTarget)) {
return;
}
this._defaultFocusAsync = this.async(function () {
var selectedItem = this.multi ? this.selectedItems && this.selectedItems[0] : this.selectedItem;
this._setFocusedItem(null);
if (selectedItem) {
this._setFocusedItem(selectedItem);
} else if (this.items[0]) {
this._setFocusedItem(this.items[0]);
}
});
},
_onUpKey: function (event) {
this._focusPrevious();
event.detail.keyboardEvent.preventDefault();
},
_onDownKey: function (event) {
this._focusNext();
event.detail.keyboardEvent.preventDefault();
},
_onEscKey: function (event) {
this.focusedItem.blur();
},
_onKeydown: function (event) {
if (!this.keyboardEventMatchesKeys(event, 'up down esc')) {
this._focusWithKeyboardEvent(event);
}
event.stopPropagation();
},
_activateHandler: function (event) {
Polymer.IronSelectableBehavior._activateHandler.call(this, event);
event.stopPropagation();
}
};
Polymer.IronMenuBehaviorImpl._shiftTabPressed = false;
Polymer.IronMenuBehavior = [
Polymer.IronMultiSelectableBehavior,
Polymer.IronA11yKeysBehavior,
Polymer.IronMenuBehaviorImpl
];
(function () {
Polymer({
is: 'paper-menu',
behaviors: [Polymer.IronMenuBehavior]
});
}());
(function () {
'use strict';
Polymer.PaperScrollHeaderPanel = Polymer({
is: 'paper-scroll-header-panel',
behaviors: [Polymer.IronResizableBehavior],
properties: {
condenses: {
type: Boolean,
value: false
},
noDissolve: {
type: Boolean,
value: false
},
noReveal: {
type: Boolean,
value: false
},
fixed: {
type: Boolean,
value: false
},
keepCondensedHeader: {
type: Boolean,
value: false
},
headerHeight: {
type: Number,
value: 0
},
condensedHeaderHeight: {
type: Number,
value: 0
},
scrollAwayTopbar: {
type: Boolean,
value: false
},
headerState: {
type: Number,
readOnly: true,
notify: true,
value: 0
},
_defaultCondsensedHeaderHeight: {
type: Number,
value: 0
}
},
observers: [
'_setup(headerHeight, condensedHeaderHeight, fixed)',
'_condensedHeaderHeightChanged(condensedHeaderHeight)',
'_headerHeightChanged(headerHeight, condensedHeaderHeight)',
'_condensesChanged(condenses)'
],
listeners: { 'iron-resize': 'measureHeaderHeight' },
ready: function () {
this._scrollHandler = this._scroll.bind(this);
this.scroller.addEventListener('scroll', this._scrollHandler);
},
attached: function () {
this.async(this.measureHeaderHeight, 1);
},
get header() {
return Polymer.dom(this.$.headerContent).getDistributedNodes()[0];
},
get content() {
return Polymer.dom(this.$.mainContent).getDistributedNodes()[0];
},
get scroller() {
return this.$.mainContainer;
},
get _headerMaxDelta() {
return this.keepCondensedHeader ? this._headerMargin : this.headerHeight;
},
get _headerMargin() {
return this.headerHeight - this.condensedHeaderHeight;
},
_y: 0,
_prevScrollTop: 0,
measureHeaderHeight: function () {
var header = this.header;
if (header && header.offsetHeight) {
this.headerHeight = header.offsetHeight;
}
},
scroll: function (top, smooth) {
if (smooth) {
var easingFn = function easeOutQuad(t, b, c, d) {
t /= d;
return -c * t * (t - 2) + b;
};
var animationId = Math.random();
var duration = 200;
var startTime = Date.now();
var currentScrollTop = this.scroller.scrollTop;
var deltaScrollTop = top - currentScrollTop;
this._currentAnimationId = animationId;
(function updateFrame() {
var now = Date.now();
var elapsedTime = now - startTime;
if (elapsedTime > duration) {
this.scroller.scrollTop = top;
this._updateScrollState(top);
} else if (this._currentAnimationId === animationId) {
this.scroller.scrollTop = easingFn(elapsedTime, currentScrollTop, deltaScrollTop, duration);
requestAnimationFrame(updateFrame.bind(this));
}
}.call(this));
} else {
this.scroller.scrollTop = top;
this._updateScrollState(top);
}
},
condense: function (smooth) {
if (this.condenses && !this.fixed && !this.noReveal) {
switch (this.headerState) {
case 1:
this.scroll(this.scroller.scrollTop - (this._headerMaxDelta - this._headerMargin), smooth);
break;
case 0:
case 3:
this.scroll(this._headerMargin, smooth);
break;
}
}
},
scrollToTop: function (smooth) {
this.scroll(0, smooth);
},
_headerHeightChanged: function (headerHeight) {
if (this._defaultCondsensedHeaderHeight !== null) {
this._defaultCondsensedHeaderHeight = Math.round(headerHeight * 1 / 3);
this.condensedHeaderHeight = this._defaultCondsensedHeaderHeight;
}
},
_condensedHeaderHeightChanged: function (condensedHeaderHeight) {
if (condensedHeaderHeight) {
if (this._defaultCondsensedHeaderHeight != condensedHeaderHeight) {
this._defaultCondsensedHeaderHeight = null;
}
}
},
_condensesChanged: function () {
this._updateScrollState(this.scroller.scrollTop);
this._condenseHeader(null);
},
_setup: function () {
var s = this.scroller.style;
s.paddingTop = this.fixed ? '' : this.headerHeight + 'px';
s.top = this.fixed ? this.headerHeight + 'px' : '';
if (this.fixed) {
this._setHeaderState(0);
this._transformHeader(null);
} else {
switch (this.headerState) {
case 1:
this._transformHeader(this._headerMaxDelta);
break;
case 2:
this._transformHeader(this._headerMargin);
break;
}
}
},
_transformHeader: function (y) {
this._translateY(this.$.headerContainer, -y);
if (this.condenses) {
this._condenseHeader(y);
}
this.fire('paper-header-transform', {
y: y,
height: this.headerHeight,
condensedHeight: this.condensedHeaderHeight
});
},
_condenseHeader: function (y) {
var reset = y === null;
if (!this.scrollAwayTopbar && this.header && this.header.$ && this.header.$.topBar) {
this._translateY(this.header.$.topBar, reset ? null : Math.min(y, this._headerMargin));
}
if (!this.noDissolve) {
this.$.headerBg.style.opacity = reset ? '' : (this._headerMargin - y) / this._headerMargin;
}
this._translateY(this.$.headerBg, reset ? null : y / 2);
if (!this.noDissolve) {
this.$.condensedHeaderBg.style.opacity = reset ? '' : y / this._headerMargin;
this._translateY(this.$.condensedHeaderBg, reset ? null : y / 2);
}
},
_translateY: function (node, y) {
this.transform(y === null ? '' : 'translate3d(0, ' + y + 'px, 0)', node);
},
_scroll: function (event) {
if (this.header) {
this._updateScrollState(this.scroller.scrollTop);
this.fire('content-scroll', { target: this.scroller }, { cancelable: false });
}
},
_updateScrollState: function (scrollTop) {
var deltaScrollTop = scrollTop - this._prevScrollTop;
var y = Math.max(0, this.noReveal ? scrollTop : this._y + deltaScrollTop);
if (y > this._headerMaxDelta) {
y = this._headerMaxDelta;
if (this.keepCondensedHeader) {
this._setHeaderState(2);
} else {
this._setHeaderState(1);
}
} else if (this.condenses && scrollTop >= this._headerMargin) {
y = Math.max(y, this._headerMargin);
this._setHeaderState(2);
} else if (y === 0) {
this._setHeaderState(0);
} else {
this._setHeaderState(3);
}
if (!this.fixed && y !== this._y) {
this._transformHeader(y);
}
this._prevScrollTop = Math.max(scrollTop, 0);
this._y = y;
}
});
Polymer.PaperScrollHeaderPanel.HEADER_STATE_EXPANDED = 0;
Polymer.PaperScrollHeaderPanel.HEADER_STATE_HIDDEN = 1;
Polymer.PaperScrollHeaderPanel.HEADER_STATE_CONDENSED = 2;
Polymer.PaperScrollHeaderPanel.HEADER_STATE_INTERPOLATED = 3;
}());
(function () {
'use strict';
Polymer.IronA11yAnnouncer = Polymer({
is: 'iron-a11y-announcer',
properties: {
mode: {
type: String,
value: 'polite'
},
_text: {
type: String,
value: ''
}
},
created: function () {
if (!Polymer.IronA11yAnnouncer.instance) {
Polymer.IronA11yAnnouncer.instance = this;
}
document.body.addEventListener('iron-announce', this._onIronAnnounce.bind(this));
},
announce: function (text) {
this._text = '';
this.async(function () {
this._text = text;
}, 100);
},
_onIronAnnounce: function (event) {
if (event.detail && event.detail.text) {
this.announce(event.detail.text);
}
}
});
Polymer.IronA11yAnnouncer.instance = null;
Polymer.IronA11yAnnouncer.requestAvailability = function () {
if (!Polymer.IronA11yAnnouncer.instance) {
Polymer.IronA11yAnnouncer.instance = document.createElement('iron-a11y-announcer');
}
document.body.appendChild(Polymer.IronA11yAnnouncer.instance);
};
}());
Polymer.IronFitBehavior = {
properties: {
sizingTarget: {
type: Object,
value: function () {
return this;
}
},
fitInto: {
type: Object,
value: window
},
autoFitOnAttach: {
type: Boolean,
value: false
},
_fitInfo: { type: Object }
},
get _fitWidth() {
var fitWidth;
if (this.fitInto === window) {
fitWidth = this.fitInto.innerWidth;
} else {
fitWidth = this.fitInto.getBoundingClientRect().width;
}
return fitWidth;
},
get _fitHeight() {
var fitHeight;
if (this.fitInto === window) {
fitHeight = this.fitInto.innerHeight;
} else {
fitHeight = this.fitInto.getBoundingClientRect().height;
}
return fitHeight;
},
get _fitLeft() {
var fitLeft;
if (this.fitInto === window) {
fitLeft = 0;
} else {
fitLeft = this.fitInto.getBoundingClientRect().left;
}
return fitLeft;
},
get _fitTop() {
var fitTop;
if (this.fitInto === window) {
fitTop = 0;
} else {
fitTop = this.fitInto.getBoundingClientRect().top;
}
return fitTop;
},
attached: function () {
if (this.autoFitOnAttach) {
if (window.getComputedStyle(this).display === 'none') {
setTimeout(function () {
this.fit();
}.bind(this));
} else {
this.fit();
}
}
},
fit: function () {
this._discoverInfo();
this.constrain();
this.center();
},
_discoverInfo: function () {
if (this._fitInfo) {
return;
}
var target = window.getComputedStyle(this);
var sizer = window.getComputedStyle(this.sizingTarget);
this._fitInfo = {
inlineStyle: {
top: this.style.top || '',
left: this.style.left || ''
},
positionedBy: {
vertically: target.top !== 'auto' ? 'top' : target.bottom !== 'auto' ? 'bottom' : null,
horizontally: target.left !== 'auto' ? 'left' : target.right !== 'auto' ? 'right' : null,
css: target.position
},
sizedBy: {
height: sizer.maxHeight !== 'none',
width: sizer.maxWidth !== 'none'
},
margin: {
top: parseInt(target.marginTop, 10) || 0,
right: parseInt(target.marginRight, 10) || 0,
bottom: parseInt(target.marginBottom, 10) || 0,
left: parseInt(target.marginLeft, 10) || 0
}
};
},
resetFit: function () {
if (!this._fitInfo || !this._fitInfo.sizedBy.width) {
this.sizingTarget.style.maxWidth = '';
}
if (!this._fitInfo || !this._fitInfo.sizedBy.height) {
this.sizingTarget.style.maxHeight = '';
}
this.style.top = this._fitInfo ? this._fitInfo.inlineStyle.top : '';
this.style.left = this._fitInfo ? this._fitInfo.inlineStyle.left : '';
if (this._fitInfo) {
this.style.position = this._fitInfo.positionedBy.css;
}
this._fitInfo = null;
},
refit: function () {
this.resetFit();
this.fit();
},
constrain: function () {
var info = this._fitInfo;
if (!this._fitInfo.positionedBy.vertically) {
this.style.top = '0px';
}
if (!this._fitInfo.positionedBy.horizontally) {
this.style.left = '0px';
}
if (!this._fitInfo.positionedBy.vertically || !this._fitInfo.positionedBy.horizontally) {
this.style.position = 'fixed';
}
this.sizingTarget.style.boxSizing = 'border-box';
var rect = this.getBoundingClientRect();
if (!info.sizedBy.height) {
this._sizeDimension(rect, info.positionedBy.vertically, 'top', 'bottom', 'Height');
}
if (!info.sizedBy.width) {
this._sizeDimension(rect, info.positionedBy.horizontally, 'left', 'right', 'Width');
}
},
_sizeDimension: function (rect, positionedBy, start, end, extent) {
var info = this._fitInfo;
var max = extent === 'Width' ? this._fitWidth : this._fitHeight;
var flip = positionedBy === end;
var offset = flip ? max - rect[end] : rect[start];
var margin = info.margin[flip ? start : end];
var offsetExtent = 'offset' + extent;
var sizingOffset = this[offsetExtent] - this.sizingTarget[offsetExtent];
this.sizingTarget.style['max' + extent] = max - margin - offset - sizingOffset + 'px';
},
center: function () {
var positionedBy = this._fitInfo.positionedBy;
if (positionedBy.vertically && positionedBy.horizontally) {
return;
}
this.style.position = 'fixed';
if (!positionedBy.vertically) {
this.style.top = '0px';
}
if (!positionedBy.horizontally) {
this.style.left = '0px';
}
var rect = this.getBoundingClientRect();
if (!positionedBy.vertically) {
var top = this._fitTop - rect.top + (this._fitHeight - rect.height) / 2;
this.style.top = top + 'px';
}
if (!positionedBy.horizontally) {
var left = this._fitLeft - rect.left + (this._fitWidth - rect.width) / 2;
this.style.left = left + 'px';
}
}
};
Polymer.IronOverlayManagerClass = function () {
this._overlays = [];
this._minimumZ = 101;
this._backdropElement = null;
var clickEvent = 'ontouchstart' in window ? 'touchstart' : 'mousedown';
document.addEventListener(clickEvent, this._onCaptureClick.bind(this), true);
document.addEventListener('focus', this._onCaptureFocus.bind(this), true);
document.addEventListener('keydown', this._onCaptureKeyDown.bind(this), true);
};
Polymer.IronOverlayManagerClass.prototype = {
constructor: Polymer.IronOverlayManagerClass,
get backdropElement() {
if (!this._backdropElement) {
this._backdropElement = document.createElement('iron-overlay-backdrop');
}
return this._backdropElement;
},
get deepActiveElement() {
var active = document.activeElement || document.body;
while (active.root && Polymer.dom(active.root).activeElement) {
active = Polymer.dom(active.root).activeElement;
}
return active;
},
_bringOverlayAtIndexToFront: function (i) {
var overlay = this._overlays[i];
var lastI = this._overlays.length - 1;
if (!overlay.alwaysOnTop && this._overlays[lastI].alwaysOnTop) {
lastI--;
}
if (!overlay || i >= lastI) {
return;
}
var minimumZ = Math.max(this.currentOverlayZ(), this._minimumZ);
if (this._getZ(overlay) <= minimumZ) {
this._applyOverlayZ(overlay, minimumZ);
}
while (i < lastI) {
this._overlays[i] = this._overlays[i + 1];
i++;
}
this._overlays[lastI] = overlay;
},
addOrRemoveOverlay: function (overlay) {
if (overlay.opened) {
this.addOverlay(overlay);
} else {
this.removeOverlay(overlay);
}
this.trackBackdrop();
},
addOverlay: function (overlay) {
var i = this._overlays.indexOf(overlay);
if (i >= 0) {
this._bringOverlayAtIndexToFront(i);
return;
}
var insertionIndex = this._overlays.length;
var currentOverlay = this._overlays[insertionIndex - 1];
var minimumZ = Math.max(this._getZ(currentOverlay), this._minimumZ);
var newZ = this._getZ(overlay);
if (currentOverlay && currentOverlay.alwaysOnTop && !overlay.alwaysOnTop) {
this._applyOverlayZ(currentOverlay, minimumZ);
insertionIndex--;
var previousOverlay = this._overlays[insertionIndex - 1];
minimumZ = Math.max(this._getZ(previousOverlay), this._minimumZ);
}
if (newZ <= minimumZ) {
this._applyOverlayZ(overlay, minimumZ);
}
this._overlays.splice(insertionIndex, 0, overlay);
var element = this.deepActiveElement;
overlay.restoreFocusNode = this._overlayParent(element) ? null : element;
},
removeOverlay: function (overlay) {
var i = this._overlays.indexOf(overlay);
if (i === -1) {
return;
}
this._overlays.splice(i, 1);
var node = overlay.restoreFocusOnClose ? overlay.restoreFocusNode : null;
overlay.restoreFocusNode = null;
if (node && Polymer.dom(document.body).deepContains(node)) {
node.focus();
}
},
currentOverlay: function () {
var i = this._overlays.length - 1;
return this._overlays[i];
},
currentOverlayZ: function () {
return this._getZ(this.currentOverlay());
},
ensureMinimumZ: function (minimumZ) {
this._minimumZ = Math.max(this._minimumZ, minimumZ);
},
focusOverlay: function () {
var current = this.currentOverlay();
if (current && !current.transitioning) {
current._applyFocus();
}
},
trackBackdrop: function () {
this.backdropElement.style.zIndex = this.backdropZ();
},
getBackdrops: function () {
var backdrops = [];
for (var i = 0; i < this._overlays.length; i++) {
if (this._overlays[i].withBackdrop) {
backdrops.push(this._overlays[i]);
}
}
return backdrops;
},
backdropZ: function () {
return this._getZ(this._overlayWithBackdrop()) - 1;
},
_overlayWithBackdrop: function () {
for (var i = 0; i < this._overlays.length; i++) {
if (this._overlays[i].withBackdrop) {
return this._overlays[i];
}
}
},
_getZ: function (overlay) {
var z = this._minimumZ;
if (overlay) {
var z1 = Number(overlay.style.zIndex || window.getComputedStyle(overlay).zIndex);
if (z1 === z1) {
z = z1;
}
}
return z;
},
_setZ: function (element, z) {
element.style.zIndex = z;
},
_applyOverlayZ: function (overlay, aboveZ) {
this._setZ(overlay, aboveZ + 2);
},
_overlayParent: function (node) {
while (node && node !== document.body) {
if (node._manager === this) {
return node;
}
node = Polymer.dom(node).parentNode || node.host;
}
},
_overlayInPath: function (path) {
path = path || [];
for (var i = 0; i < path.length; i++) {
if (path[i]._manager === this) {
return path[i];
}
}
},
_onCaptureClick: function (event) {
var overlay = this.currentOverlay();
if (overlay && this._overlayInPath(Polymer.dom(event).path) !== overlay) {
overlay._onCaptureClick(event);
}
},
_onCaptureFocus: function (event) {
var overlay = this.currentOverlay();
if (overlay) {
overlay._onCaptureFocus(event);
}
},
_onCaptureKeyDown: function (event) {
var overlay = this.currentOverlay();
if (overlay) {
if (Polymer.IronA11yKeysBehavior.keyboardEventMatchesKeys(event, 'esc')) {
overlay._onCaptureEsc(event);
} else if (Polymer.IronA11yKeysBehavior.keyboardEventMatchesKeys(event, 'tab')) {
overlay._onCaptureTab(event);
}
}
}
};
Polymer.IronOverlayManager = new Polymer.IronOverlayManagerClass();
(function () {
Polymer({
is: 'iron-overlay-backdrop',
properties: {
opened: {
readOnly: true,
reflectToAttribute: true,
type: Boolean,
value: false
},
_manager: {
type: Object,
value: Polymer.IronOverlayManager
}
},
listeners: { 'transitionend': '_onTransitionend' },
prepare: function () {
if (!this.parentNode) {
Polymer.dom(document.body).appendChild(this);
}
},
open: function () {
if (this._manager.getBackdrops().length < 2) {
this._setOpened(true);
}
},
close: function () {
if (this._manager.getBackdrops().length === 0) {
var cs = getComputedStyle(this);
var noAnimation = cs.transitionDuration === '0s' || cs.opacity == 0;
this._setOpened(false);
if (noAnimation) {
this.complete();
}
}
},
complete: function () {
if (this._manager.getBackdrops().length === 0 && this.parentNode) {
Polymer.dom(this.parentNode).removeChild(this);
}
},
_onTransitionend: function (event) {
if (event && event.target === this) {
this.complete();
}
}
});
}());
(function () {
'use strict';
Polymer.IronOverlayBehaviorImpl = {
properties: {
opened: {
observer: '_openedChanged',
type: Boolean,
value: false,
notify: true
},
canceled: {
observer: '_canceledChanged',
readOnly: true,
type: Boolean,
value: false
},
withBackdrop: {
observer: '_withBackdropChanged',
type: Boolean
},
noAutoFocus: {
type: Boolean,
value: false
},
noCancelOnEscKey: {
type: Boolean,
value: false
},
noCancelOnOutsideClick: {
type: Boolean,
value: false
},
closingReason: { type: Object },
restoreFocusOnClose: {
type: Boolean,
value: false
},
alwaysOnTop: { type: Boolean },
_manager: {
type: Object,
value: Polymer.IronOverlayManager
},
_focusedChild: { type: Object }
},
listeners: { 'iron-resize': '_onIronResize' },
get backdropElement() {
return this._manager.backdropElement;
},
get _focusNode() {
return this._focusedChild || Polymer.dom(this).querySelector('[autofocus]') || this;
},
get _focusableNodes() {
var FOCUSABLE_WITH_DISABLED = [
'a[href]',
'area[href]',
'iframe',
'[tabindex]',
'[contentEditable=true]'
];
var FOCUSABLE_WITHOUT_DISABLED = [
'input',
'select',
'textarea',
'button'
];
var selector = FOCUSABLE_WITH_DISABLED.join(':not([tabindex="-1"]),') + ':not([tabindex="-1"]),' + FOCUSABLE_WITHOUT_DISABLED.join(':not([disabled]):not([tabindex="-1"]),') + ':not([disabled]):not([tabindex="-1"])';
var focusables = Polymer.dom(this).querySelectorAll(selector);
if (this.tabIndex >= 0) {
focusables.splice(0, 0, this);
}
return focusables.sort(function (a, b) {
if (a.tabIndex === b.tabIndex) {
return 0;
}
if (a.tabIndex === 0 || a.tabIndex > b.tabIndex) {
return 1;
}
return -1;
});
},
ready: function () {
this.__isAnimating = false;
this.__shouldRemoveTabIndex = false;
this.__firstFocusableNode = this.__lastFocusableNode = null;
this.__openChangedAsync = null;
this.__onIronResizeAsync = null;
this._ensureSetup();
},
attached: function () {
if (this.opened) {
this._openedChanged();
}
this._observer = Polymer.dom(this).observeNodes(this._onNodesChange);
},
detached: function () {
Polymer.dom(this).unobserveNodes(this._observer);
this._observer = null;
this.opened = false;
if (this.withBackdrop) {
this.backdropElement.close();
}
},
toggle: function () {
this._setCanceled(false);
this.opened = !this.opened;
},
open: function () {
this._setCanceled(false);
this.opened = true;
},
close: function () {
this._setCanceled(false);
this.opened = false;
},
cancel: function (event) {
var cancelEvent = this.fire('iron-overlay-canceled', event, { cancelable: true });
if (cancelEvent.defaultPrevented) {
return;
}
this._setCanceled(true);
this.opened = false;
},
_ensureSetup: function () {
if (this._overlaySetup) {
return;
}
this._overlaySetup = true;
this.style.outline = 'none';
this.style.display = 'none';
},
_openedChanged: function () {
if (this.opened) {
this.removeAttribute('aria-hidden');
} else {
this.setAttribute('aria-hidden', 'true');
}
if (!this._overlaySetup) {
return;
}
this._manager.addOrRemoveOverlay(this);
this.__isAnimating = true;
if (this.__openChangedAsync) {
cancelAnimationFrame(this.__openChangedAsync);
}
if (this.opened) {
if (this.withBackdrop) {
this.backdropElement.prepare();
}
this.__openChangedAsync = requestAnimationFrame(function () {
this.__openChangedAsync = null;
this._prepareRenderOpened();
this._renderOpened();
}.bind(this));
} else {
this._renderClosed();
}
},
_canceledChanged: function () {
this.closingReason = this.closingReason || {};
this.closingReason.canceled = this.canceled;
},
_withBackdropChanged: function () {
if (this.withBackdrop && !this.hasAttribute('tabindex')) {
this.setAttribute('tabindex', '-1');
this.__shouldRemoveTabIndex = true;
} else if (this.__shouldRemoveTabIndex) {
this.removeAttribute('tabindex');
this.__shouldRemoveTabIndex = false;
}
if (this.opened) {
this._manager.trackBackdrop();
if (this.withBackdrop) {
this.backdropElement.prepare();
this.async(function () {
this.backdropElement.open();
}, 1);
} else {
this.backdropElement.close();
}
}
},
_prepareRenderOpened: function () {
this._preparePositioning();
this.refit();
this._finishPositioning();
if (this.noAutoFocus && document.activeElement === this._focusNode) {
this._focusNode.blur();
}
},
_renderOpened: function () {
if (this.withBackdrop) {
this.backdropElement.open();
}
this._finishRenderOpened();
},
_renderClosed: function () {
if (this.withBackdrop) {
this.backdropElement.close();
}
this._finishRenderClosed();
},
_finishRenderOpened: function () {
this._applyFocus();
this.notifyResize();
this.__isAnimating = false;
this.fire('iron-overlay-opened');
},
_finishRenderClosed: function () {
this.style.display = 'none';
this.style.zIndex = '';
this._applyFocus();
this.notifyResize();
this.__isAnimating = false;
this.fire('iron-overlay-closed', this.closingReason);
},
_preparePositioning: function () {
this.style.transition = this.style.webkitTransition = 'none';
this.style.transform = this.style.webkitTransform = 'none';
this.style.display = '';
},
_finishPositioning: function () {
this.style.display = 'none';
this.scrollTop = this.scrollTop;
this.style.transition = this.style.webkitTransition = '';
this.style.transform = this.style.webkitTransform = '';
this.style.display = '';
this.scrollTop = this.scrollTop;
},
_applyFocus: function () {
if (this.opened) {
if (!this.noAutoFocus) {
this._focusNode.focus();
}
} else {
this._focusNode.blur();
this._focusedChild = null;
this._manager.focusOverlay();
}
},
_onCaptureClick: function (event) {
if (!this.noCancelOnOutsideClick) {
this.cancel(event);
}
},
_onCaptureFocus: function (event) {
if (!this.withBackdrop) {
return;
}
var path = Polymer.dom(event).path;
if (path.indexOf(this) === -1) {
event.stopPropagation();
this._applyFocus();
} else {
this._focusedChild = path[0];
}
},
_onCaptureEsc: function (event) {
if (!this.noCancelOnEscKey) {
this.cancel(event);
}
},
_onCaptureTab: function (event) {
var shift = event.shiftKey;
var nodeToCheck = shift ? this.__firstFocusableNode : this.__lastFocusableNode;
var nodeToSet = shift ? this.__lastFocusableNode : this.__firstFocusableNode;
if (this.withBackdrop && this._focusedChild === nodeToCheck) {
this._focusedChild = nodeToSet;
}
},
_onIronResize: function () {
if (this.__onIronResizeAsync) {
cancelAnimationFrame(this.__onIronResizeAsync);
this.__onIronResizeAsync = null;
}
if (this.opened && !this.__isAnimating) {
this.__onIronResizeAsync = requestAnimationFrame(function () {
this.__onIronResizeAsync = null;
this.refit();
}.bind(this));
}
},
_onNodesChange: function () {
if (this.opened && !this.__isAnimating) {
this.notifyResize();
}
var focusableNodes = this._focusableNodes;
this.__firstFocusableNode = focusableNodes[0];
this.__lastFocusableNode = focusableNodes[focusableNodes.length - 1];
}
};
Polymer.IronOverlayBehavior = [
Polymer.IronFitBehavior,
Polymer.IronResizableBehavior,
Polymer.IronOverlayBehaviorImpl
];
}());
(function () {
var currentToast = null;
Polymer({
is: 'paper-toast',
behaviors: [Polymer.IronOverlayBehavior],
properties: {
duration: {
type: Number,
value: 3000
},
text: {
type: String,
value: ''
},
noCancelOnOutsideClick: {
type: Boolean,
value: true
},
noAutoFocus: {
type: Boolean,
value: true
}
},
listeners: { 'transitionend': '__onTransitionEnd' },
get visible() {
console.warn('`visible` is deprecated, use `opened` instead');
return this.opened;
},
get _canAutoClose() {
return this.duration > 0 && this.duration !== Infinity;
},
created: function () {
this._autoClose = null;
Polymer.IronA11yAnnouncer.requestAvailability();
},
show: function (properties) {
if (typeof properties == 'string') {
properties = { text: properties };
}
for (var property in properties) {
if (property.indexOf('_') === 0) {
console.warn('The property "' + property + '" is private and was not set.');
} else if (property in this) {
this[property] = properties[property];
} else {
console.warn('The property "' + property + '" is not valid.');
}
}
this.open();
},
hide: function () {
this.close();
},
center: function () {
if (this.fitInto === window) {
this.style.bottom = this.style.left = '';
} else {
var rect = this.fitInto.getBoundingClientRect();
this.style.left = rect.left + 'px';
this.style.bottom = window.innerHeight - rect.bottom + 'px';
}
},
__onTransitionEnd: function (e) {
if (e && e.target === this && e.propertyName === 'opacity') {
if (this.opened) {
this._finishRenderOpened();
} else {
this._finishRenderClosed();
}
}
},
_openedChanged: function () {
if (this._autoClose !== null) {
this.cancelAsync(this._autoClose);
this._autoClose = null;
}
if (this.opened) {
if (currentToast && currentToast !== this) {
currentToast.close();
}
currentToast = this;
this.fire('iron-announce', { text: this.text });
if (this._canAutoClose) {
this._autoClose = this.async(this.close, this.duration);
}
} else if (currentToast === this) {
currentToast = null;
}
Polymer.IronOverlayBehaviorImpl._openedChanged.apply(this, arguments);
},
_renderOpened: function () {
this.classList.add('paper-toast-open');
},
_renderClosed: function () {
this.classList.remove('paper-toast-open');
},
_onIronResize: function () {
Polymer.IronOverlayBehaviorImpl._onIronResize.apply(this, arguments);
if (this.opened) {
this.style.position = '';
}
}
});
}());
Polymer({
is: 'paper-toolbar',
hostAttributes: { 'role': 'toolbar' },
properties: {
bottomJustify: {
type: String,
value: ''
},
justify: {
type: String,
value: ''
},
middleJustify: {
type: String,
value: ''
}
},
attached: function () {
this._observer = this._observe(this);
this._updateAriaLabelledBy();
},
detached: function () {
if (this._observer) {
this._observer.disconnect();
}
},
_observe: function (node) {
var observer = new MutationObserver(function () {
this._updateAriaLabelledBy();
}.bind(this));
observer.observe(node, {
childList: true,
subtree: true
});
return observer;
},
_updateAriaLabelledBy: function () {
var labelledBy = [];
var contents = Polymer.dom(this.root).querySelectorAll('content');
for (var content, index = 0; content = contents[index]; index++) {
var nodes = Polymer.dom(content).getDistributedNodes();
for (var node, jndex = 0; node = nodes[jndex]; jndex++) {
if (node.classList && node.classList.contains('title')) {
if (node.id) {
labelledBy.push(node.id);
} else {
var id = 'paper-toolbar-label-' + Math.floor(Math.random() * 10000);
node.id = id;
labelledBy.push(id);
}
}
}
}
if (labelledBy.length > 0) {
this.setAttribute('aria-labelledby', labelledBy.join(' '));
}
},
_computeBarExtraClasses: function (barJustify) {
if (!barJustify)
return '';
return barJustify + (barJustify === 'justified' ? '' : '-justified');
}
});
!function (e) {
if ('object' == typeof exports && 'undefined' != typeof module)
module.exports = e();
else if ('function' == typeof define && define.amd)
define([], e);
else {
var f;
'undefined' != typeof window ? f = window : 'undefined' != typeof global ? f = global : 'undefined' != typeof self && (f = self), f.page = e();
}
}(function () {
var define, module, exports;
return function e(t, n, r) {
function s(o, u) {
if (!n[o]) {
if (!t[o]) {
var a = typeof require == 'function' && require;
if (!u && a)
return a(o, !0);
if (i)
return i(o, !0);
var f = new Error('Cannot find module \'' + o + '\'');
throw f.code = 'MODULE_NOT_FOUND', f;
}
var l = n[o] = { exports: {} };
t[o][0].call(l.exports, function (e) {
var n = t[o][1][e];
return s(n ? n : e);
}, l, l.exports, e, t, n, r);
}
return n[o].exports;
}
var i = typeof require == 'function' && require;
for (var o = 0; o < r.length; o++)
s(r[o]);
return s;
}({
1: [
function (require, module, exports) {
(function (process) {
'use strict';
var pathtoRegexp = require('path-to-regexp');
module.exports = page;
var clickEvent = 'undefined' !== typeof document && document.ontouchstart ? 'touchstart' : 'click';
var location = 'undefined' !== typeof window && (window.history.location || window.location);
var dispatch = true;
var decodeURLComponents = true;
var base = '';
var running;
var hashbang = false;
var prevContext;
function page(path, fn) {
if ('function' === typeof path) {
return page('*', path);
}
if ('function' === typeof fn) {
var route = new Route(path);
for (var i = 1; i < arguments.length; ++i) {
page.callbacks.push(route.middleware(arguments[i]));
}
} else if ('string' === typeof path) {
page['string' === typeof fn ? 'redirect' : 'show'](path, fn);
} else {
page.start(path);
}
}
page.callbacks = [];
page.exits = [];
page.current = '';
page.len = 0;
page.base = function (path) {
if (0 === arguments.length)
return base;
base = path;
};
page.start = function (options) {
options = options || {};
if (running)
return;
running = true;
if (false === options.dispatch)
dispatch = false;
if (false === options.decodeURLComponents)
decodeURLComponents = false;
if (false !== options.popstate)
window.addEventListener('popstate', onpopstate, false);
if (false !== options.click) {
document.addEventListener(clickEvent, onclick, false);
}
if (true === options.hashbang)
hashbang = true;
if (!dispatch)
return;
var url = hashbang && ~location.hash.indexOf('#!') ? location.hash.substr(2) + location.search : location.pathname + location.search + location.hash;
page.replace(url, null, true, dispatch);
};
page.stop = function () {
if (!running)
return;
page.current = '';
page.len = 0;
running = false;
document.removeEventListener(clickEvent, onclick, false);
window.removeEventListener('popstate', onpopstate, false);
};
page.show = function (path, state, dispatch, push) {
var ctx = new Context(path, state);
page.current = ctx.path;
if (false !== dispatch)
page.dispatch(ctx);
if (false !== ctx.handled && false !== push)
ctx.pushState();
return ctx;
};
page.back = function (path, state) {
if (page.len > 0) {
history.back();
page.len--;
} else if (path) {
setTimeout(function () {
page.show(path, state);
});
} else {
setTimeout(function () {
page.show(base, state);
});
}
};
page.redirect = function (from, to) {
if ('string' === typeof from && 'string' === typeof to) {
page(from, function (e) {
setTimeout(function () {
page.replace(to);
}, 0);
});
}
if ('string' === typeof from && 'undefined' === typeof to) {
setTimeout(function () {
page.replace(from);
}, 0);
}
};
page.replace = function (path, state, init, dispatch) {
var ctx = new Context(path, state);
page.current = ctx.path;
ctx.init = init;
ctx.save();
if (false !== dispatch)
page.dispatch(ctx);
return ctx;
};
page.dispatch = function (ctx) {
var prev = prevContext, i = 0, j = 0;
prevContext = ctx;
function nextExit() {
var fn = page.exits[j++];
if (!fn)
return nextEnter();
fn(prev, nextExit);
}
function nextEnter() {
var fn = page.callbacks[i++];
if (ctx.path !== page.current) {
ctx.handled = false;
return;
}
if (!fn)
return unhandled(ctx);
fn(ctx, nextEnter);
}
if (prev) {
nextExit();
} else {
nextEnter();
}
};
function unhandled(ctx) {
if (ctx.handled)
return;
var current;
if (hashbang) {
current = base + location.hash.replace('#!', '');
} else {
current = location.pathname + location.search;
}
if (current === ctx.canonicalPath)
return;
page.stop();
ctx.handled = false;
location.href = ctx.canonicalPath;
}
page.exit = function (path, fn) {
if (typeof path === 'function') {
return page.exit('*', path);
}
var route = new Route(path);
for (var i = 1; i < arguments.length; ++i) {
page.exits.push(route.middleware(arguments[i]));
}
};
function decodeURLEncodedURIComponent(val) {
if (typeof val !== 'string') {
return val;
}
return decodeURLComponents ? decodeURIComponent(val.replace(/\+/g, ' ')) : val;
}
function Context(path, state) {
if ('/' === path[0] && 0 !== path.indexOf(base))
path = base + (hashbang ? '#!' : '') + path;
var i = path.indexOf('?');
this.canonicalPath = path;
this.path = path.replace(base, '') || '/';
if (hashbang)
this.path = this.path.replace('#!', '') || '/';
this.title = document.title;
this.state = state || {};
this.state.path = path;
this.querystring = ~i ? decodeURLEncodedURIComponent(path.slice(i + 1)) : '';
this.pathname = decodeURLEncodedURIComponent(~i ? path.slice(0, i) : path);
this.params = {};
this.hash = '';
if (!hashbang) {
if (!~this.path.indexOf('#'))
return;
var parts = this.path.split('#');
this.path = parts[0];
this.hash = decodeURLEncodedURIComponent(parts[1]) || '';
this.querystring = this.querystring.split('#')[0];
}
}
page.Context = Context;
Context.prototype.pushState = function () {
page.len++;
history.pushState(this.state, this.title, hashbang && this.path !== '/' ? '#!' + this.path : this.canonicalPath);
};
Context.prototype.save = function () {
history.replaceState(this.state, this.title, hashbang && this.path !== '/' ? '#!' + this.path : this.canonicalPath);
};
function Route(path, options) {
options = options || {};
this.path = path === '*' ? '(.*)' : path;
this.method = 'GET';
this.regexp = pathtoRegexp(this.path, this.keys = [], options.sensitive, options.strict);
}
page.Route = Route;
Route.prototype.middleware = function (fn) {
var self = this;
return function (ctx, next) {
if (self.match(ctx.path, ctx.params))
return fn(ctx, next);
next();
};
};
Route.prototype.match = function (path, params) {
var keys = this.keys, qsIndex = path.indexOf('?'), pathname = ~qsIndex ? path.slice(0, qsIndex) : path, m = this.regexp.exec(decodeURIComponent(pathname));
if (!m)
return false;
for (var i = 1, len = m.length; i < len; ++i) {
var key = keys[i - 1];
var val = decodeURLEncodedURIComponent(m[i]);
if (val !== undefined || !hasOwnProperty.call(params, key.name)) {
params[key.name] = val;
}
}
return true;
};
var onpopstate = function () {
var loaded = false;
if ('undefined' === typeof window) {
return;
}
if (document.readyState === 'complete') {
loaded = true;
} else {
window.addEventListener('load', function () {
setTimeout(function () {
loaded = true;
}, 0);
});
}
return function onpopstate(e) {
if (!loaded)
return;
if (e.state) {
var path = e.state.path;
page.replace(path, e.state);
} else {
page.show(location.pathname + location.hash, undefined, undefined, false);
}
};
}();
function onclick(e) {
if (1 !== which(e))
return;
if (e.metaKey || e.ctrlKey || e.shiftKey)
return;
if (e.defaultPrevented)
return;
var el = e.target;
while (el && 'A' !== el.nodeName)
el = el.parentNode;
if (!el || 'A' !== el.nodeName)
return;
if (el.hasAttribute('download') || el.getAttribute('rel') === 'external')
return;
var link = el.getAttribute('href');
if (!hashbang && el.pathname === location.pathname && (el.hash || '#' === link))
return;
if (link && link.indexOf('mailto:') > -1)
return;
if (el.target)
return;
if (!sameOrigin(el.href))
return;
var path = el.pathname + el.search + (el.hash || '');
if (typeof process !== 'undefined' && path.match(/^\/[a-zA-Z]:\//)) {
path = path.replace(/^\/[a-zA-Z]:\//, '/');
}
var orig = path;
if (path.indexOf(base) === 0) {
path = path.substr(base.length);
}
if (hashbang)
path = path.replace('#!', '');
if (base && orig === path)
return;
e.preventDefault();
page.show(orig);
}
function which(e) {
e = e || window.event;
return null === e.which ? e.button : e.which;
}
function sameOrigin(href) {
var origin = location.protocol + '//' + location.hostname;
if (location.port)
origin += ':' + location.port;
return href && 0 === href.indexOf(origin);
}
page.sameOrigin = sameOrigin;
}.call(this, require('_process')));
},
{
'_process': 2,
'path-to-regexp': 3
}
],
2: [
function (require, module, exports) {
var process = module.exports = {};
process.nextTick = function () {
var canSetImmediate = typeof window !== 'undefined' && window.setImmediate;
var canMutationObserver = typeof window !== 'undefined' && window.MutationObserver;
var canPost = typeof window !== 'undefined' && window.postMessage && window.addEventListener;
if (canSetImmediate) {
return function (f) {
return window.setImmediate(f);
};
}
var queue = [];
if (canMutationObserver) {
var hiddenDiv = document.createElement('div');
var observer = new MutationObserver(function () {
var queueList = queue.slice();
queue.length = 0;
queueList.forEach(function (fn) {
fn();
});
});
observer.observe(hiddenDiv, { attributes: true });
return function nextTick(fn) {
if (!queue.length) {
hiddenDiv.setAttribute('yes', 'no');
}
queue.push(fn);
};
}
if (canPost) {
window.addEventListener('message', function (ev) {
var source = ev.source;
if ((source === window || source === null) && ev.data === 'process-tick') {
ev.stopPropagation();
if (queue.length > 0) {
var fn = queue.shift();
fn();
}
}
}, true);
return function nextTick(fn) {
queue.push(fn);
window.postMessage('process-tick', '*');
};
}
return function nextTick(fn) {
setTimeout(fn, 0);
};
}();
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
function noop() {
}
process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.binding = function (name) {
throw new Error('process.binding is not supported');
};
process.cwd = function () {
return '/';
};
process.chdir = function (dir) {
throw new Error('process.chdir is not supported');
};
},
{}
],
3: [
function (require, module, exports) {
var isarray = require('isarray');
module.exports = pathToRegexp;
module.exports.parse = parse;
module.exports.compile = compile;
module.exports.tokensToFunction = tokensToFunction;
module.exports.tokensToRegExp = tokensToRegExp;
var PATH_REGEXP = new RegExp([
'(\\\\.)',
'([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^()])+)\\))?|\\(((?:\\\\.|[^()])+)\\))([+*?])?|(\\*))'
].join('|'), 'g');
function parse(str) {
var tokens = [];
var key = 0;
var index = 0;
var path = '';
var res;
while ((res = PATH_REGEXP.exec(str)) != null) {
var m = res[0];
var escaped = res[1];
var offset = res.index;
path += str.slice(index, offset);
index = offset + m.length;
if (escaped) {
path += escaped[1];
continue;
}
if (path) {
tokens.push(path);
path = '';
}
var prefix = res[2];
var name = res[3];
var capture = res[4];
var group = res[5];
var suffix = res[6];
var asterisk = res[7];
var repeat = suffix === '+' || suffix === '*';
var optional = suffix === '?' || suffix === '*';
var delimiter = prefix || '/';
var pattern = capture || group || (asterisk ? '.*' : '[^' + delimiter + ']+?');
tokens.push({
name: name || key++,
prefix: prefix || '',
delimiter: delimiter,
optional: optional,
repeat: repeat,
pattern: escapeGroup(pattern)
});
}
if (index < str.length) {
path += str.substr(index);
}
if (path) {
tokens.push(path);
}
return tokens;
}
function compile(str) {
return tokensToFunction(parse(str));
}
function tokensToFunction(tokens) {
var matches = new Array(tokens.length);
for (var i = 0; i < tokens.length; i++) {
if (typeof tokens[i] === 'object') {
matches[i] = new RegExp('^' + tokens[i].pattern + '$');
}
}
return function (obj) {
var path = '';
var data = obj || {};
for (var i = 0; i < tokens.length; i++) {
var token = tokens[i];
if (typeof token === 'string') {
path += token;
continue;
}
var value = data[token.name];
var segment;
if (value == null) {
if (token.optional) {
continue;
} else {
throw new TypeError('Expected "' + token.name + '" to be defined');
}
}
if (isarray(value)) {
if (!token.repeat) {
throw new TypeError('Expected "' + token.name + '" to not repeat, but received "' + value + '"');
}
if (value.length === 0) {
if (token.optional) {
continue;
} else {
throw new TypeError('Expected "' + token.name + '" to not be empty');
}
}
for (var j = 0; j < value.length; j++) {
segment = encodeURIComponent(value[j]);
if (!matches[i].test(segment)) {
throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"');
}
path += (j === 0 ? token.prefix : token.delimiter) + segment;
}
continue;
}
segment = encodeURIComponent(value);
if (!matches[i].test(segment)) {
throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"');
}
path += token.prefix + segment;
}
return path;
};
}
function escapeString(str) {
return str.replace(/([.+*?=^!:${}()[\]|\/])/g, '\\$1');
}
function escapeGroup(group) {
return group.replace(/([=!:$\/()])/g, '\\$1');
}
function attachKeys(re, keys) {
re.keys = keys;
return re;
}
function flags(options) {
return options.sensitive ? '' : 'i';
}
function regexpToRegexp(path, keys) {
var groups = path.source.match(/\((?!\?)/g);
if (groups) {
for (var i = 0; i < groups.length; i++) {
keys.push({
name: i,
prefix: null,
delimiter: null,
optional: false,
repeat: false,
pattern: null
});
}
}
return attachKeys(path, keys);
}
function arrayToRegexp(path, keys, options) {
var parts = [];
for (var i = 0; i < path.length; i++) {
parts.push(pathToRegexp(path[i], keys, options).source);
}
var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options));
return attachKeys(regexp, keys);
}
function stringToRegexp(path, keys, options) {
var tokens = parse(path);
var re = tokensToRegExp(tokens, options);
for (var i = 0; i < tokens.length; i++) {
if (typeof tokens[i] !== 'string') {
keys.push(tokens[i]);
}
}
return attachKeys(re, keys);
}
function tokensToRegExp(tokens, options) {
options = options || {};
var strict = options.strict;
var end = options.end !== false;
var route = '';
var lastToken = tokens[tokens.length - 1];
var endsWithSlash = typeof lastToken === 'string' && /\/$/.test(lastToken);
for (var i = 0; i < tokens.length; i++) {
var token = tokens[i];
if (typeof token === 'string') {
route += escapeString(token);
} else {
var prefix = escapeString(token.prefix);
var capture = token.pattern;
if (token.repeat) {
capture += '(?:' + prefix + capture + ')*';
}
if (token.optional) {
if (prefix) {
capture = '(?:' + prefix + '(' + capture + '))?';
} else {
capture = '(' + capture + ')?';
}
} else {
capture = prefix + '(' + capture + ')';
}
route += capture;
}
}
if (!strict) {
route = (endsWithSlash ? route.slice(0, -2) : route) + '(?:\\/(?=$))?';
}
if (end) {
route += '$';
} else {
route += strict && endsWithSlash ? '' : '(?=\\/|$)';
}
return new RegExp('^' + route, flags(options));
}
function pathToRegexp(path, keys, options) {
keys = keys || [];
if (!isarray(keys)) {
options = keys;
keys = [];
} else if (!options) {
options = {};
}
if (path instanceof RegExp) {
return regexpToRegexp(path, keys, options);
}
if (isarray(path)) {
return arrayToRegexp(path, keys, options);
}
return stringToRegexp(path, keys, options);
}
},
{ 'isarray': 4 }
],
4: [
function (require, module, exports) {
module.exports = Array.isArray || function (arr) {
return Object.prototype.toString.call(arr) == '[object Array]';
};
},
{}
]
}, {}, [1])(1);
});
window.addEventListener('WebComponentsReady', function () {
function scrollToTop(ctx, next) {
app.scrollPageToTop();
next();
}
page('/periodic-grid-gh', scrollToTop, function () {
app.route = 'home';
});
page({ hashbang: false });
});
(function () {
'use strict';
Polymer({
is: 'periodic-element',
ready: function () {
var intViewportWidth = window.innerWidth;
var periodicElPadding = 0;
var maxW = 175;
if (intViewportWidth <= 1024) {
periodicElPadding = 3;
} else {
periodicElPadding = 8;
}
var periodicElWidth = (intViewportWidth - 8 * periodicElPadding) / 4;
var wCalc = periodicElWidth > maxW ? maxW : periodicElWidth;
this.style.minWidth = wCalc + 'px';
this.style.maxWidth = wCalc + 'px';
this.style.height = wCalc + 'px';
this.querySelector('.symbol').style.fontSize = wCalc * 0.5 + 'px';
this.querySelector('.short-name').style.fontSize = wCalc * 0.15 + 'px';
this.querySelector('.short-name').style.marginTop = wCalc * 0.05 / 2 + 'px';
},
properties: {
symbol: {
type: String,
value: 'JE',
notify: true
},
periodicElWidth: {
type: String,
value: 0,
notify: false
},
shortName: {
type: String,
value: 'Short Name',
notify: true
},
bgColor: {
type: String,
value: '#fff',
notify: true,
observer: '_applyBgColor'
},
color: {
type: String,
value: '#ccc',
notify: true,
observer: '_applyColor'
}
},
_applyBgColor: function (newValue) {
this.style.backgroundColor = newValue;
},
_applyColor: function (newValue) {
this.style.color = newValue;
}
});
}());
(function () {
'use strict';
var dataString = '[{"colorAccent":"#902FB1","colorBorder":"","colorClass":"#521A64","colorElement":"#2A2B30","colorFontElementId":"","colorFontName":"","counterLiquor":1,"descriptionShort":"Yeah, I think it\'s what Van Gogh used to drink...","elementClass":"Liquor","elementId":"Ab","favoritedBy":"","id":"A-101","img":"","name":"Absinthe","nameShort":"Absinthe","recipesIn":"","scoreBlend":8.2,"scoreFlavor":7.1,"scorePopularity":8.5,"tags":"Liquor","__firebaseKey__":"absinthe"},{"colorAccent":"#aa6f1c","colorBorder":"","colorClass":"#774e14","colorElement":"#2A2B30","colorFontElementId":"","colorFontName":"","descriptionShort":"A nutty elementClassic.  Mixes well with others.","elementClass":"Dessert","elementId":"Al","favoritedBy":"","id":"A-1002","img":"","name":"Almond","nameShort":"Almond","recipesIn":"","scoreBlend":9.9,"scoreFlavor":9.1,"scorePopularity":8.5,"__firebaseKey__":"almond"},{"colorAccent":"#902FB1","colorBorder":"","colorClass":"#521A64","colorElement":"#2A2B30","colorFontElementId":"","colorFontName":"","counterCafe":1,"counterCola":1,"counterDrink":1,"counterLiquor":1,"counterSoda":1,"descriptionShort":"A little something sweet to mix with something sour.","elementClass":"Liquor","elementId":"Am","favoritedBy":"","id":"A-103","img":"","name":"Amaretto","nameShort":"Amaretto","recipesIn":"","scoreBlend":8.2,"scoreFlavor":7.4,"scorePopularity":8.5,"tags":"Cafe, Cola, Drink, Liquor, Soda","__firebaseKey__":"amaretto"},{"colorAccent":"#aa6f1c","colorBorder":"","colorClass":"#774e14","colorElement":"#2A2B30","colorFontElementId":"","colorFontName":"","counterBreakfast":1,"counterCafe":1,"counterWarm":1,"descriptionShort":"Homemade apple pie. Just like your mom makes it.","elementClass":"Dessert","elementId":"Ap","favoritedBy":"","id":"A-104","img":"","name":"Apple Pie","nameShort":"Appl Pi","recipesIn":"","scoreBlend":8.7,"scoreFlavor":9.2,"scorePopularity":8.5,"tags":"Breakfast, Cafe, Warm","__firebaseKey__":"applePie"},{"colorAccent":"#FF7D5C","colorBorder":"","colorClass":"#BF2F0C","colorElement":"#2A2B30","colorFontElementId":"","colorFontName":"","counterBreakfast":1,"counterFruit":1,"counterSummer":1,"counterWonka":1,"descriptionShort":"Have a snack.","elementClass":"Fruit","elementId":"At","favoritedBy":"","id":"A-105","img":"","name":"Apricot","nameShort":"Apricot","recipesIn":"","scoreBlend":8,"scoreFlavor":8.5,"scorePopularity":8.5,"tags":"Breakfast, Fruit, Summer, Wonka","__firebaseKey__":"apricot"},{"colorAccent":"#FF7D5C","colorBorder":"","colorClass":"#BF2F0C","colorElement":"#2A2B30","colorFontElementId":"","colorFontName":"","counterBreakfast":1,"counterFruit":1,"counterSnacks":1,"counterSummer":1,"counterTropical":1,"counterWonka":1,"descriptionShort":"Fruity-flavored morning goodness.","elementClass":"Fruit","elementId":"Ba","favoritedBy":"","id":"B-101","img":"","name":"Banana","nameShort":"Banana","recipesIn":"","scoreBlend":9,"scoreFlavor":9.5,"scorePopularity":8.5,"__firebaseKey__":"banana"},{"colorAccent":"#FF7D5C","colorBorder":"#b53653","colorClass":"#BF2F0C","colorElement":"#5c1d26","colorFontElementId":"#ffffff","colorFontName":"","counterBerry":1,"counterBreakfast":1,"counterSummer":1,"counterWonka":1,"descriptionShort":"You know blackcherry cherrybomb. Tasty.","elementClass":"Fruit","elementId":"Bc","favoritedBy":"","id":"B-102","img":"","name":"Black Cherry","nameShort":"Blk Chrry","recipesIn":"","scoreBlend":8.2,"scoreFlavor":8.9,"scorePopularity":8.5,"tags":"Berry, Breakfast, Summer, Wonka","__firebaseKey__":"blackCherry"},{"beverage":1,"colorAccent":"#B3691A","colorBorder":"","colorClass":"#341E08","colorElement":"#2A2B30","colorFontElementId":"","colorFontName":"","counterCafe":1,"counterDrink":1,"counterHotDrink":1,"counterTea":1,"counterWarm":1,"descriptionShort":"De-stress.  Take a break.  Try this black tea flavor.","elementClass":"Beverage","elementId":"Bt","favoritedBy":"","id":"B-103","img":"","name":"Black Tea","nameShort":"Blk T","recipesIn":"","scoreBlend":9.2,"scoreFlavor":9.3,"scorePopularity":8.5,"tags":"Beverage, Cafe, Drink, Hot Drink, Tea, Warm","__firebaseKey__":"blackTea"},{"colorAccent":"#FF7D5C","colorBorder":"#8d95ea","colorClass":"#BF2F0C","colorElement":"#4b446d","colorFontElementId":"#f5ffff","colorFontName":"","counterBerry":1,"counterBreakfast":1,"counterFruit":1,"counterSnacks":1,"counterSummer":1,"counterWonka":1,"descriptionShort":"Yummy blackberries.","elementClass":"Fruit","elementId":"Bk","favoritedBy":"","id":"B-104","img":"","name":"Blackberry","nameShort":"Blkbrry","recipesIn":"","scoreBlend":9.9,"scoreFlavor":9.9,"scorePopularity":8.5,"tags":"Berry, Breakfast, Fruit, Snacks, Summer, Wonka","__firebaseKey__":"blackberry"},{"colorAccent":"#FF7D5C","colorBorder":"","colorClass":"#BF2F0C","colorElement":"#2A2B30","colorFontElementId":"","colorFontName":"","counterBerry":1,"counterBreakfast":1,"counterDrink":1,"counterFruit":1,"counterSnacks":1,"counterSummer":1,"counterWonka":1,"descriptionShort":"Fruity nougat deliciousness.","elementClass":"Fruit","elementId":"Bb","favoritedBy":"","id":"B-105","img":"","name":"Blueberry","nameShort":"Blueberry","recipesIn":"","scoreBlend":9.8,"scoreFlavor":9.7,"scorePopularity":8.5,"tags":"Berry, Breakfast, Drink, Fruit, Snacks, Summer, Wonka","__firebaseKey__":"blueberry"},{"colorAccent":"#902FB1","colorBorder":"","colorClass":"#521A64","colorElement":"#f3af5e","colorFontElementId":"","colorFontName":"","counterCola":1,"counterDrink":1,"counterLiquor":1,"counterSoda":1,"descriptionShort":"Pairs well with a stiff drink.","elementClass":"Liquor","elementId":"By","favoritedBy":"","id":"B-106","img":"","name":"Brandy","nameShort":"Brandy","recipesIn":"","scoreBlend":7.9,"scoreFlavor":7.7,"scorePopularity":8.5,"tags":"Cola, Drink, Liquor,  Soda","__firebaseKey__":"brandy"},{"colorAccent":"#aa6f1c","colorBorder":"","colorClass":"#774e14","colorElement":"#2A2B30","colorFontElementId":"","colorFontName":"","counterBreakfast":1,"counterCafe":1,"counterChocolate":1,"counterSnacks":1,"counterWarm":1,"descriptionShort":"Yummy fudgy chocolatey delicious, it\'s brownie batter.","elementClass":"Dessert","elementId":"Bw","favoritedBy":"","id":"B-107","img":"","name":"Brownies","nameShort":"Brownies","recipesIn":"","scoreBlend":9.5,"scoreFlavor":9.3,"scorePopularity":8.5,"tags":"Breakfast, Cafe, Chocolate, Snacks, Warm","__firebaseKey__":"brownies"},{"colorAccent":"#FAB21B","colorBorder":"","colorClass":"#7A570D","colorElement":"#2A2B30","colorFontElementId":"","colorFontName":"","counterCandy":1,"counterSweet":1,"counterWonka":1,"descriptionShort":"Sweet bubblegum flavor, an ode to a classic!","elementClass":"Candy","elementId":"Bg","favoritedBy":"","id":"B-108","img":"","name":"Bubble Gum","nameShort":"Bubbl Gum","recipesIn":"","scoreBlend":6.1,"scoreFlavor":8.5,"scorePopularity":8.5,"tags":"Candy, Sweet, Wonka","__firebaseKey__":"bubbleGum"},{"colorAccent":"#f1f1f1","colorBorder":"#f1b16a","colorClass":"#403e45","colorElement":"#df9439","colorFontElementId":"#b26a18","colorFontName":"","counterTobacco":1,"descriptionShort":"A hearty pipe tobacco flavor with sweet earthy notes","elementClass":"Tobacco","elementId":"Bu","favoritedBy":"","id":"B-109","img":"","name":"Burley","nameShort":"Burley","recipesIn":"","scoreBlend":7.3,"scoreFlavor":7.7,"scorePopularity":8.5,"tags":"Tobacco","__firebaseKey__":"burley"},{"colorAccent":"#FAB21B","colorBorder":"","colorClass":"#7A570D","colorElement":"#2A2B30","colorFontElementId":"","colorFontName":"","counterCandy":1,"counterDrink":1,"counterSweet":1,"counterTropical":1,"counterWonka":1,"descriptionShort":"Savory AND sweet hard candy flavor.","elementClass":"Candy","elementId":"Br","favoritedBy":"","id":"B-110","img":"","name":"Butter Rum","nameShort":"Butter Rum","recipesIn":"","scoreBlend":8.5,"scoreFlavor":8.8,"scorePopularity":8.5,"tags":"Candy, Drink, Sweet, Tropical, Wonka","__firebaseKey__":"butterRum"},{"candy":1,"colorAccent":"#FAB21B","colorBorder":"","colorClass":"#7A570D","colorElement":"#2A2B30","colorFontElementId":"","colorFontName":"","descriptionShort":"Yum.  Butterscotch candies.","elementClass":"Candy","elementId":"Bs","favoritedBy":"","id":"B-111","img":"","name":"Butterscotch","nameShort":"Bttrscotch","recipesIn":"","scoreBlend":8.4,"scoreFlavor":8.5,"scorePopularity":8.5,"sweet":1,"tags":"Candy, Sweet, Wonka","wonka":1,"__firebaseKey__":"butterscotch"},{"colorAccent":"#B3691A","colorBorder":"","colorClass":"#341E08","colorElement":"#2A2B30","colorFontElementId":"","colorFontName":"","counterBeverage":1,"counterCafe":1,"counterCoffee":1,"counterCream":1,"counterHotDrink":1,"counterWarm":1,"descriptionShort":"Like a cup of soul food.","elementClass":"Beverage","elementId":"Cu","favoritedBy":"","id":"C-101","img":"","name":"Cappuccino","nameShort":"Cppccino","recipesIn":"","scoreBlend":8.9,"scoreFlavor":9,"scorePopularity":8.5,"tags":"Beverage, Cafe, Coffee, Cream, Hot Drink, Warm","__firebaseKey__":"cappuccino"},{"colorAccent":"#FAB21B","colorBorder":"","colorClass":"#7A570D","colorElement":"#2A2B30","colorFontElementId":"","colorFontName":"","counterCafe":1,"counterCandy":1,"counterCandyBar":1,"counterChocolate":1,"counterDrink":1,"counterSweet":1,"descriptionShort":"A savory sweet that can be compared to no other.","elementClass":"Candy","elementId":"Ca","favoritedBy":"","id":"C-102","img":"","name":"Caramel","nameShort":"Caramel","recipesIn":"","scoreBlend":9.1,"scoreFlavor":9.7,"scorePopularity":8.5,"tags":"Candy, Cafe, Candy Bar, Chocolate, Drink, Sweet","__firebaseKey__":"caramel"},{"colorAccent":"#B3691A","colorBorder":"","colorClass":"#341E08","colorElement":"#2A2B30","colorFontElementId":"","colorFontName":"","counterBeverage":1,"counterCafe":1,"counterDrink":1,"counterHotDrink":1,"counterTea":1,"counterWarm":1,"descriptionShort":"A spicy blend.","elementClass":"Beverage","elementId":"Ct","favoritedBy":"","id":"C-103","img":"","name":"Chai Tea","nameShort":"Chai T","recipesIn":"","scoreBlend":9.3,"scoreFlavor":9.3,"scorePopularity":8.5,"tags":"Beverage, Cafe, Drink, Hot Drink, Tea, Warm","__firebaseKey__":"chaiTea"},{"colorAccent":"#4D6F1C","colorBorder":"","colorClass":"#2A3C0F","colorElement":"#2A2B30","colorFontElementId":"","colorFontName":"","counterBeverage":1,"counterDrink":1,"counterHerbal":1,"counterHotDrink":1,"counterWarm":1,"descriptionShort":"For when you\'re feeling blue","elementClass":"Herbal","elementId":"Cm","favoritedBy":"","id":"C-104","img":"","name":"Chamomile","nameShort":"Chamomile","recipesIn":"","scoreBlend":8.4,"scoreFlavor":8.3,"scorePopularity":8.5,"tags":"Beverage, Drink, Herbal, Hot Drink, Warm","__firebaseKey__":"chamomile"},{"colorAccent":"#902FB1","colorBorder":"","colorClass":"#521A64","colorElement":"#2A2B30","colorFontElementId":"","colorFontName":"","counterDrink":1,"counterLiquor":1,"descriptionShort":"Time for a celebration? Today is a good day.","elementClass":"Liquor","elementId":"Ch","favoritedBy":"","id":"C-105","img":"","name":"Champagne","nameShort":"Champagn","recipesIn":"","scoreBlend":9.3,"scoreFlavor":9.8,"scorePopularity":8.5,"tags":"Drink, Liquor","__firebaseKey__":"champagne"},{"colorAccent":"#aa6f1c","colorBorder":"","colorClass":"#774e14","colorElement":"#2A2B30","colorFontElementId":"","colorFontName":"","counterBreakfast":1,"counterCafe":1,"counterDessert":1,"descriptionShort":"MMM.  Cheesecake.","elementClass":"Dessert","elementId":"Cs","favoritedBy":"","id":"C-106","img":"","name":"Cheesecake","nameShort":"Cheesecak","recipesIn":"","scoreBlend":9.1,"scoreFlavor":9.3,"scorePopularity":8.5,"tags":"Breakfast, Cafe, Dessert","__firebaseKey__":"cheesecake"},{"colorAccent":"#FF7D5C","colorBorder":"","colorClass":"#BF2F0C","colorElement":"#2A2B30","colorFontElementId":"","colorFontName":"","counterBerry":1,"counterBreakfast":1,"counterDrink":1,"counterSummer":1,"counterWonka":1,"descriptionShort":"Versatile deliciousness. Good to mix with just about anything.","elementClass":"Fruit","elementId":"Cr","favoritedBy":"","id":"C-107","img":"","name":"Cherry","nameShort":"Cherry","recipesIn":"","scoreBlend":9.4,"scoreFlavor":9.2,"scorePopularity":8.5,"tags":"Berry, Breakfast, Drink, Summer, Wonka","__firebaseKey__":"cherry"},{"colorAccent":"#133540","colorBorder":"","colorClass":"#4CD5FF","colorElement":"#2A2B30","colorFontElementId":"","colorFontName":"","counterBeverage":1,"counterCola":1,"counterDrink":1,"counterSoda":1,"counterWonka":1,"descriptionShort":"Classic cherry cola flavor. GULP!","elementClass":"Soda","elementId":"Cc","favoritedBy":"","id":"C-108","img":"","name":"Cherry Cola","nameShort":"Chry Cola","recipesIn":"","scoreBlend":9.3,"scoreFlavor":9.4,"scorePopularity":8.5,"tags":"Beverage, Cola, Drink, Soda, Wonka","__firebaseKey__":"cherryCola"},{"colorAccent":"#FAB21B","colorBorder":"#875b52","colorClass":"#7A570D","colorElement":"#5c2d23","colorFontElementId":"#ecc5c0","colorFontName":"","counterCafe":1,"counterCandy":1,"counterCandyBar":1,"counterChocolate":1,"descriptionShort":"Yummy chocolate.","elementClass":"Candy","elementId":"Ch","favoritedBy":"","id":"C-109","img":"","name":"Chocolate","nameShort":"Chocolat","recipesIn":"","scoreBlend":9.9,"scoreFlavor":9.9,"scorePopularity":8.5,"tags":"Cafe, Candy, Candy Bar, Chocolate","__firebaseKey__":"chocolate"},{"colorAccent":"#aa6f1c","colorBorder":"","colorClass":"#774e14","colorElement":"#2A2B30","colorFontElementId":"","colorFontName":"","counterBreakfast":1,"counterCafe":1,"counterSpicy":1,"counterWarm":1,"descriptionShort":"Cinnamon spice for everyone nice.","elementClass":"Dessert","elementId":"Ci","favoritedBy":"","id":"C-110","img":"","name":"Cinnamon","nameShort":"Cinnamon","recipesIn":"","scoreBlend":9.8,"scoreFlavor":9.5,"scorePopularity":8.5,"tags":"Breakfast, Cafe, Spicy, Warm","__firebaseKey__":"cinnamon"},{"colorAccent":"#4D6F1C","colorBorder":"","colorClass":"#2A3C0F","colorElement":"#2A2B30","colorFontElementId":"","colorFontName":"","counterHerbal":1,"descriptionShort":"MMM. Cloves are good luck!","elementClass":"Herbal","elementId":"Cv","favoritedBy":"","id":"C-111","img":"","name":"Clove","nameShort":"Clove","recipesIn":"","scoreBlend":8.2,"scoreFlavor":7.1,"scorePopularity":8.5,"tags":"Herbal","__firebaseKey__":"clove"},{"colorAccent":"#4D6F1C","colorBorder":"","colorClass":"#2A3C0F","colorElement":"#2A2B30","colorFontElementId":"","colorFontName":"","counterBeverage":1,"counterCafe":1,"counterChocolate":1,"counterCoffee":1,"counterDessert":1,"counterDrink":1,"counterHotDrink":1,"descriptionShort":"Moar chocolate now.","elementClass":"Herbal","elementId":"Co","favoritedBy":"","id":"C-112","img":"","name":"Cocoa","nameShort":"Cocoa","recipesIn":"","scoreBlend":9.8,"scoreFlavor":9.8,"scorePopularity":8.5,"tags":"Beverage, Cafe, Chocolate, Coffee, Dessert, Drink, Hot Drink","__firebaseKey__":"cocoa"},{"colorAccent":"#FF7D5C","colorBorder":"","colorClass":"#BF2F0C","colorElement":"#2A2B30","colorFontElementId":"","colorFontName":"","counterBreakfast":1,"counterFruit":1,"counterSummer":1,"counterTropical":1,"counterWonka":1,"descriptionShort":"For that joyful experience!","elementClass":"Fruit","elementId":"Cn","favoritedBy":"","id":"C-113","img":"","name":"Coconut","nameShort":"Coconut","recipesIn":"","scoreBlend":8.4,"scoreFlavor":9.2,"scorePopularity":8.5,"tags":"Breakfast, Fruit, Summer, Tropical, Wonka","__firebaseKey__":"coconut"},{"colorAccent":"#B3691A","colorBorder":"","colorClass":"#341E08","colorElement":"#2A2B30","colorFontElementId":"","colorFontName":"","counterBeverage":1,"counterCafe":1,"counterCoffee":1,"counterDrink":1,"counterHotDrink":1,"counterWarm":1,"descriptionShort":"A quick pick-me-up for the morning.","elementClass":"Beverage","elementId":"Cf","favoritedBy":"","id":"C-114","img":"","name":"Coffee","nameShort":"Coffee","recipesIn":"","scoreBlend":9.3,"scoreFlavor":9,"scorePopularity":8.5,"tags":"Beverage, Cafe, Coffee, Drink, Hot Drink, Warm","__firebaseKey__":"coffee"},{"colorAccent":"#aa6f1c","colorBorder":"","colorClass":"#774e14","colorElement":"#2A2B30","colorFontElementId":"","colorFontName":"","counterBreakfast":1,"counterCafe":1,"counterChocolate":1,"counterSnacks":1,"counterWarm":1,"counterWonka":1,"descriptionShort":"This that good good.  Cookies, man.","elementClass":"Dessert","elementId":"Ck","favoritedBy":"","id":"C-115","img":"","name":"Cookies","nameShort":"Cookies","recipesIn":"","scoreBlend":8.7,"scoreFlavor":9.7,"scorePopularity":8.5,"tags":"Breakfast, Cafe, Chocolate, Snacks, Warm, Wonka","__firebaseKey__":"cookies"},{"colorAccent":"#FAB21B","colorBorder":"","colorClass":"#7A570D","colorElement":"#2A2B30","colorFontElementId":"","colorFontName":"","counterCandy":1,"counterSweet":1,"counterWonka":1,"descriptionShort":"It\'s like the fair all over again.","elementClass":"Candy","elementId":"Cd","favoritedBy":"","id":"C-116","img":"","name":"Cotton Candy","nameShort":"Cotn Cand","recipesIn":"","scoreBlend":7.2,"scoreFlavor":8.2,"scorePopularity":8.5,"tags":"Candy, Sweet, Wonka","__firebaseKey__":"cottonCandy"},{"colorAccent":"#FF7D5C","colorBorder":"","colorClass":"#BF2F0C","colorElement":"#2A2B30","colorFontElementId":"","colorFontName":"","counterBerry":1,"counterBreakfast":1,"counterSummer":1,"counterWonka":1,"descriptionShort":"That nice tart cranberry flavor.","elementClass":"Fruit","elementId":"Cb","favoritedBy":"","id":"C-117","img":"","name":"Cranberry","nameShort":"Cranberry","recipesIn":"","scoreBlend":8.6,"scoreFlavor":8.8,"scorePopularity":8.5,"tags":"Berry, Breakfast, Summer, Wonka","__firebaseKey__":"cranberry"},{"colorAccent":"#B3691A","colorBorder":"","colorClass":"#341E08","colorElement":"#2A2B30","colorFontElementId":"","colorFontName":"","counterCafe":1,"counterCream":1,"counterDrink":1,"counterWarm":1,"descriptionShort":"MMM. Creamy. A great flavor to mix with.","elementClass":"Beverage","elementId":"Cm","favoritedBy":"","id":"C-118","img":"","name":"Cream","nameShort":"Cream","recipesIn":"","scoreBlend":9.4,"scoreFlavor":8.6,"scorePopularity":8.5,"tags":"Cafe, Cream, Drink, Warm","__firebaseKey__":"cream"},{"colorAccent":"#f1f1f1","colorBorder":"","colorClass":"#403e45","colorElement":"#2A2B30","colorFontElementId":"","colorFontName":"","counterTobacco":1,"counterTropical":1,"descriptionShort":"Be like Fidel.","elementClass":"Tobacco","elementId":"Cu","favoritedBy":"","id":"C-119","img":"","name":"Cuban Cigar","nameShort":"Cbn Cigar","recipesIn":"","scoreBlend":7.9,"scoreFlavor":8.3,"scorePopularity":8.5,"tags":"Tobacco, Tropical","__firebaseKey__":"cubanCigar"},{"colorAccent":"#FF7D5C","colorBorder":"","colorClass":"#BF2F0C","colorElement":"#2A2B30","colorFontElementId":"","colorFontName":"","counterBreakfast":1,"counterCafe":1,"counterFruit":1,"counterSnacks":1,"counterSummer":1,"counterWonka":1,"descriptionShort":"So juicy. UGH!!","elementClass":"Fruit","elementId":"Dp","favoritedBy":"","id":"D-100","img":"","name":"Dark Plum","nameShort":"Drk Plum","recipesIn":"","scoreBlend":9.1,"scoreFlavor":9.4,"scorePopularity":8.5,"tags":"Breakfast, Cafe, Fruit, Snacks, Summer, Wonka","__firebaseKey__":"darkPlum"},{"colorAccent":"#FAB21B","colorBorder":"","colorClass":"#7A570D","colorElement":"#2A2B30","colorFontElementId":"","colorFontName":"","counterFruit":1,"counterSummer":1,"counterWonka":1,"descriptionShort":"Double the apple. Double the flavor!","elementClass":"Candy","elementId":"Da","favoritedBy":"","id":"D-101","img":"","name":"Double Apple","nameShort":"Dbl Appl","recipesIn":"","scoreBlend":9.2,"scoreFlavor":9,"scorePopularity":8.5,"tags":"Fruit, Summer, Wonka","__firebaseKey__":"doubleApple"},{"colorAccent":"#4D6F1C","colorBorder":"","colorClass":"#2A3C0F","colorElement":"#2A2B30","colorFontElementId":"","colorFontName":"","counterHerbal":1,"counterMint":1,"descriptionShort":"Yeah, we know this mint is good.","elementClass":"Herbal","elementId":"Dm","favoritedBy":"","id":"D-102","img":"","name":"Doublemint","nameShort":"Dblmint","recipesIn":"","scoreBlend":8.2,"scoreFlavor":9,"scorePopularity":8.5,"tags":"Herbal, Mint","__firebaseKey__":"doublemint"},{"colorAccent":"#133540","colorBorder":"","colorClass":"#4CD5FF","colorElement":"#2A2B30","colorFontElementId":"","colorFontName":"","counterBeverage":1,"counterCola":1,"counterDrink":1,"counterSoda":1,"counterWonka":1,"descriptionShort":"A spicy cola flavor.","elementClass":"Soda","elementId":"Dc","favoritedBy":"","id":"D-103","img":"","name":"Dr. Cola","nameShort":"Dr Cola","recipesIn":"","scoreBlend":9.3,"scoreFlavor":9.1,"scorePopularity":8.5,"tags":"Beverage, Cola, Drink, Soda, Wonka","__firebaseKey__":"drCola"},{"colorAccent":"#FF7D5C","colorBorder":"","colorClass":"#BF2F0C","colorElement":"#2A2B30","colorFontElementId":"","colorFontName":"","counterBreakfast":1,"counterSummer":1,"counterWonka":1,"descriptionShort":"I don\'t even know what this is, but it\'s delicious","elementClass":"Fruit","elementId":"Df","favoritedBy":"","id":"D-104","img":"","name":"Dragon Fruit","nameShort":"Dragn Frut","recipesIn":"","scoreBlend":9.2,"scoreFlavor":9.3,"scorePopularity":8.5,"tags":"Breakfast, Summer, Wonka","__firebaseKey__":"dragonFruit"},{"colorAccent":"#B3691A","colorBorder":"","colorClass":"#341E08","colorElement":"#2A2B30","colorFontElementId":"","colorFontName":"","counterCream":1,"counterDrink":1,"counterHoliday":1,"descriptionShort":"A holiday favorite.  Spice it up with some nutmeg, bro.","elementClass":"Beverage","elementId":"Eg","favoritedBy":"","id":"E-100","img":"","name":"Eggnog","nameShort":"Eggnog","recipesIn":"","scoreBlend":7.8,"scoreFlavor":7.1,"scorePopularity":8.5,"tags":"Cream, Drink, Holiday","__firebaseKey__":"eggnog"},{"colorAccent":"#FAB21B","colorBorder":"#e5d59a","colorClass":"#7A570D","colorElement":"#683a2b","colorFontElementId":"#bd7640","colorFontName":"","counterCandy":1,"counterCandyBar":1,"counterSweet":1,"counterWonka":1,"descriptionShort":"A classic English flavor. Toasted caramel.","elementClass":"Candy","elementId":"Et","favoritedBy":"","id":"E-101","img":"","name":"English Toffee","nameShort":"Eng Toff","recipesIn":"","scoreBlend":8.2,"scoreFlavor":7.9,"scorePopularity":8.5,"tags":"Candy, Candy Bar, Sweet, Wonka","__firebaseKey__":"englishToffee"},{"colorAccent":"#B3691A","colorBorder":"","colorClass":"#341E08","colorElement":"#2A2B30","colorFontElementId":"","colorFontName":"","counterCafe":1,"counterCoffee":1,"counterDrink":1,"counterHotDrink":1,"counterWarm":1,"descriptionShort":"Like a bold shot of coffee.","elementClass":"Beverage","elementId":"Es","favoritedBy":"","id":"E-102","img":"","name":"Espresso","nameShort":"Espresso","recipesIn":"","scoreBlend":8.6,"scoreFlavor":9,"scorePopularity":8.5,"tags":"Cafe, Coffee, Drink, Hot Drink, Warm","__firebaseKey__":"espresso"},{"colorAccent":"#aa6f1c","colorBorder":"","colorClass":"#774e14","colorElement":"#2A2B30","colorFontElementId":"","colorFontName":"","counterCafe":1,"counterCoffee":1,"counterDessert":1,"counterDrink":1,"counterWarm":1,"descriptionShort":"Real good flavor enhancer.","elementClass":"Dessert","elementId":"Fv","favoritedBy":"","id":"F-100","img":"","name":"French Vanilla","nameShort":"Fr Vanilla","recipesIn":"","scoreBlend":9,"scoreFlavor":9.6,"scorePopularity":8.5,"tags":"Cafe, Coffee, Dessert, Drink, Warm","__firebaseKey__":"frenchVanilla"},{"colorAccent":"#4D6F1C","colorBorder":"#966431","colorClass":"#2A3C0F","colorElement":"#1c0e05","colorFontElementId":"#faf0b2","colorFontName":"","counterHerbal":1,"counterSpicy":1,"descriptionShort":"Good for ales.","elementClass":"Herbal","elementId":"Gn","favoritedBy":"","id":"G-100","img":"","name":"Ginger","nameShort":"Ginger","recipesIn":"","scoreBlend":8.4,"scoreFlavor":7.9,"scorePopularity":8.5,"tags":"Herbal, Spicy","__firebaseKey__":"ginger"},{"colorAccent":"#aa6f1c","colorBorder":"","colorClass":"#774e14","colorElement":"#2A2B30","colorFontElementId":"","colorFontName":"","counterBreakfast":1,"counterDessert":1,"counterHoliday":1,"counterSnacks":1,"counterSweet":1,"counterWarm":1,"counterWonka":1,"descriptionShort":"Here comes the gingerbread man!","elementClass":"Dessert","elementId":"Gb","favoritedBy":"","id":"G-101","img":"","name":"Ginger Bread","nameShort":"Gngr Bread","recipesIn":"","scoreBlend":8.8,"scoreFlavor":9.1,"scorePopularity":8.5,"tags":"Breakfast, Dessert, Holiday, Snacks, Sweet, Warm, Wonka","__firebaseKey__":"gingerBread"},{"colorAccent":"#4D6F1C","colorBorder":"#d38441","colorClass":"#2A3C0F","colorElement":"#f3c883","colorFontElementId":"#c0000c","colorFontName":"","counterDrink":1,"counterHerbal":1,"counterHot":1,"counterTea":1,"descriptionShort":"A common herbal base","elementClass":"Herbal","elementId":"Gs","favoritedBy":"","id":"G-102","img":"","name":"Ginseng","nameShort":"Ginseng","recipesIn":"","scoreBlend":8,"scoreFlavor":7.8,"scorePopularity":8.5,"tags":"Drink, Herbal, Hot, Tea","__firebaseKey__":"ginseng"},{"colorAccent":"#FF7D5C","colorBorder":"","colorClass":"","colorElement":"#2A2B30","colorFontElementId":"","colorFontName":"","counterBerry":1,"counterBreakfast":1,"counterFruit":1,"counterSummer":1,"counterWonka":1,"descriptionShort":"A popular berry flavor.","elementClass":"Fruit","elementId":"Gj","favoritedBy":"","id":"G-103","img":"","name":"Goji Berry","nameShort":"Goj Brry","recipesIn":"","scoreBlend":8.1,"scoreFlavor":8,"scorePopularity":8.5,"tags":"Berry, Breakfast, Fruit, Summer, Wonka","__firebaseKey__":"gojiBerry"},{"colorAccent":"#FF7D5C","colorBorder":"","colorClass":"#BF2F0C","colorElement":"#2A2B30","colorFontElementId":"","colorFontName":"","counterBreakfast":1,"counterFruit":1,"counterSummer":1,"counterWonka":1,"descriptionShort":"Yep. Just like those delicious green apples.","elementClass":"Fruit","elementId":"Gs","favoritedBy":"","id":"G-104","img":"","name":"Granny Smith","nameShort":"Gran Smth","recipesIn":"","scoreBlend":8.2,"scoreFlavor":8.4,"scorePopularity":8.5,"tags":"Breakfast, Fruit, Summer, Wonka","__firebaseKey__":"grannySmith"},{"colorAccent":"#FAB21B","colorBorder":"","colorClass":"#7A570D","colorElement":"#2A2B30","colorFontElementId":"","colorFontName":"","counterCandy":1,"counterSummer":1,"counterWonka":1,"descriptionShort":"More like a candy apple.  You know.","elementClass":"Candy","elementId":"Ga","favoritedBy":"","id":"G-105","img":"","name":"Green Apple","nameShort":"Grn Appl","recipesIn":"","scoreBlend":8.1,"scoreFlavor":8.6,"scorePopularity":8.5,"tags":"Candy, Summer, Wonka","__firebaseKey__":"greenApple"},{"colorAccent":"#133540","colorBorder":"","colorClass":"#4CD5FF","colorElement":"#2A2B30","colorFontElementId":"","colorFontName":"","counterCola":1,"counterDrink":1,"counterSoda":1,"counterWonka":1,"descriptionShort":"Hiiigh up on the mountain!!!","elementClass":"Soda","elementId":"Gd","favoritedBy":"","id":"G-106","img":"","name":"Green Dew","nameShort":"Green Dew","recipesIn":"","scoreBlend":8.4,"scoreFlavor":8.8,"scorePopularity":8.5,"tags":"Cola, Drink, Soda, Wonka","__firebaseKey__":"greenDew"},{"colorAccent":"#B3691A","colorBorder":"","colorClass":"#341E08","colorElement":"#2A2B30","colorFontElementId":"","colorFontName":"","counterBeverage":1,"counterDrink":1,"counterHotDrink":1,"counterTea":1,"counterWarm":1,"descriptionShort":"A calming flavor for a mellow mood.","elementClass":"Beverage","elementId":"Gt","favoritedBy":"","id":"G-107","img":"","name":"Green Tea","nameShort":"Green Tea","recipesIn":"","scoreBlend":8.3,"scoreFlavor":8.4,"scorePopularity":8.5,"tags":"Beverage, Drink, Hot Drink, Tea, Warm","__firebaseKey__":"greenTea"},{"colorAccent":"#FAB21B","colorBorder":"#fdbc3a","colorClass":"#7A570D","colorElement":"#6a4800","colorFontElementId":"#ffffff","colorFontName":"","counterCafe":1,"counterCandyBar":1,"counterSweet":1,"counterWonka":1,"descriptionShort":"It\'s honey, honey!","elementClass":"Candy","elementId":"Ho","favoritedBy":"","id":"H-100","img":"","name":"Honey","nameShort":"Honey","recipesIn":"","scoreBlend":8.7,"scoreFlavor":8.9,"scorePopularity":8.5,"tags":"Cafe, Candy Bar, Sweet, Wonka","__firebaseKey__":"honey"},{"colorAccent":"#4D6F1C","colorBorder":"","colorClass":"#2A3C0F","colorElement":"#2A2B30","colorFontElementId":"","colorFontName":"","counterBreakfast":1,"counterSummer":1,"counterWonka":1,"descriptionShort":"I don\'t even know what this is, but it\'s delicious.","elementClass":"Herbal","elementId":"Hs","favoritedBy":"","id":"H-101","img":"","name":"Honeysuckle","nameShort":"Hnysuckl","recipesIn":"","scoreBlend":9,"scoreFlavor":9,"scorePopularity":8.5,"tags":"Breakfast, Summer, Wonka","__firebaseKey__":"honeysuckle"},{"colorAccent":"#aa6f1c","colorBorder":"","colorClass":"#774e14","colorElement":"#2A2B30","colorFontElementId":"","colorFontName":"","counterBreakfast":1,"counterCream":1,"counterSweet":1,"counterWonka":1,"descriptionShort":"Good cream. Cream of the crop.","elementClass":"Dessert","elementId":"Ic","favoritedBy":"","id":"I-100","img":"","name":"Ice Cream","nameShort":"Ice Crem","recipesIn":"","scoreBlend":9.2,"scoreFlavor":9.1,"scorePopularity":8.5,"tags":"Breakfast, Cream, Sweet, Wonka","__firebaseKey__":"iceCream"},{"colorAccent":"#4D6F1C","colorBorder":"","colorClass":"#2A3C0F","colorElement":"#2A2B30","colorFontElementId":"","colorFontName":"","counterBeverage":1,"counterCafe":1,"counterDrink":1,"counterHotDrink":1,"counterTea":1,"counterWarm":1,"descriptionShort":"A nice earthy herbal note.","elementClass":"Herbal","elementId":"Ja","favoritedBy":"","id":"J-100","img":"","name":"Jasmine","nameShort":"Jasmine","recipesIn":"","scoreBlend":8.5,"scoreFlavor":8.1,"scorePopularity":8.5,"tags":"Beverage, Cafe, Drink, Hot Drink, Tea, Warm","__firebaseKey__":"jasmine"},{"colorAccent":"#FF7D5C","colorBorder":"#ceb66c","colorClass":"#BF2F0C","colorElement":"#84d94a","colorFontElementId":"#f6ffae","colorFontName":"","counterBreakfast":1,"counterFruit":1,"counterSummer":1,"counterWonka":1,"descriptionShort":"Juicy, fruity, delicious.","elementClass":"Fruit","elementId":"Ki","favoritedBy":"","id":"K-100","img":"","name":"Kiwi","nameShort":"Kiwi","recipesIn":"","scoreBlend":9.5,"scoreFlavor":9.8,"scorePopularity":8.5,"tags":"Breakfast, Fruit, Summer, Wonka","__firebaseKey__":"kiwi"},{"colorAccent":"#4D6F1C","colorBorder":"#9a91d4","colorClass":"#2A3C0F","colorElement":"#c895d7","colorFontElementId":"#46168c","colorFontName":"","counterBeverage":1,"counterDrink":1,"counterHerbal":1,"counterHotDrink":1,"counterTea":1,"counterWarm":1,"descriptionShort":"A blend of herbals.","elementClass":"Herbal","elementId":"La","favoritedBy":"","id":"L-100","img":"","name":"Lavendar","nameShort":"Lavendar","recipesIn":"","scoreBlend":7.2,"scoreFlavor":7.7,"scorePopularity":8.5,"tags":"Beverage, Drink, Herbal, Hot Drink, Tea, Warm","__firebaseKey__":"lavendar"},{"colorAccent":"#f1f1f1","colorBorder":"","colorClass":"#403e45","colorElement":"#2A2B30","colorFontElementId":"","colorFontName":"","counterLeaf":1,"counterTobacco":1,"descriptionShort":"A modern take on the elementClassic smoke.","elementClass":"Tobacco","elementId":"Lt","favoritedBy":"","id":"L-099","img":"","name":"Leaf Tobacco","nameShort":"Tobacco","recipesIn":"","scoreBlend":"","scoreFlavor":7.7,"scorePopularity":8.5,"tags":"Leaf, Tobacco","__firebaseKey__":"leafTobacco"},{"colorAccent":"#FF7D5C","colorBorder":"#fef9db","colorClass":"#BF2F0C","colorElement":"#ffb701","colorFontElementId":"#fef8e8","colorFontName":"","counterBreakfast":1,"counterFruit":1,"counterSummer":1,"counterWonka":1,"descriptionShort":"When life gives you lemons, vape that shit.","elementClass":"Fruit","elementId":"Le","favoritedBy":"","id":"L-101","img":"","name":"Lemon","nameShort":"Lemon","recipesIn":"","scoreBlend":8.5,"scoreFlavor":8.8,"scorePopularity":8.5,"tags":"Breakfast, Fruit, Summer, Wonka","__firebaseKey__":"lemon"},{"colorAccent":"#4D6F1C","colorBorder":"","colorClass":"#2A3C0F","colorElement":"#2A2B30","colorFontElementId":"","colorFontName":"","counterBeverage":1,"counterHerbal":1,"counterHotDrink":1,"descriptionShort":"A delicate earthy note.","elementClass":"Herbal","elementId":"Ll","favoritedBy":"","id":"L-102","img":"","name":"Lilac","nameShort":"Lilac","recipesIn":"","scoreBlend":7.7,"scoreFlavor":7.6,"scorePopularity":8.5,"tags":"Beverage, Herbal, Hot Drink","__firebaseKey__":"lilac"},{"colorAccent":"#FF7D5C","colorBorder":"","colorClass":"#BF2F0C","colorElement":"#2A2B30","colorFontElementId":"","colorFontName":"","counterBreakfast":1,"counterFruit":1,"counterSummer":1,"counterWonka":1,"descriptionShort":"Classic lime. Plays well with others.","elementClass":"Fruit","elementId":"Li","favoritedBy":"","id":"L-103","img":"","name":"Lime","nameShort":"Lime","recipesIn":"","scoreBlend":8.8,"scoreFlavor":9.1,"scorePopularity":8.5,"tags":"Breakfast, Fruit, Summer, Wonka","__firebaseKey__":"lime"},{"colorAccent":"#FAB21B","colorBorder":"","colorClass":"#7A570D","colorElement":"#2A2B30","colorFontElementId":"","colorFontName":"","counterCandy":1,"descriptionShort":"Some like it, others love it.","elementClass":"Candy","elementId":"Lq","favoritedBy":"","id":"L-104","img":"","name":"Licquorice","nameShort":"Licqrce","recipesIn":"","scoreBlend":7.3,"scoreFlavor":7.6,"scorePopularity":8.5,"tags":"Candy","__firebaseKey__":"liquorice"},{"colorAccent":"#f1f1f1","colorBorder":"","colorClass":"#403e45","colorElement":"#2A2B30","colorFontElementId":"","colorFontName":"","counterLeaf":1,"counterTobacco":1,"descriptionShort":"An ode to the cowboy.","elementClass":"Tobacco","elementId":"Ma","favoritedBy":"","id":"M-099","img":"","name":"Marble","nameShort":"Marble","recipesIn":"","scoreBlend":7.5,"scoreFlavor":7.5,"scorePopularity":8.5,"tags":"Leaf, Tobacco","__firebaseKey__":"marble"},{"colorAccent":"#4D6F1C","colorBorder":"","colorClass":"#2A3C0F","colorElement":"#2A2B30","colorFontElementId":"","colorFontName":"","counterLeaf":1,"counterMint":1,"descriptionShort":"A clear throat for a clear mind.","elementClass":"Herbal","elementId":"Me","favoritedBy":"","id":"M-100","img":"","name":"Menthol","nameShort":"Menthol","recipesIn":"","scoreBlend":9,"scoreFlavor":9.8,"scorePopularity":8.5,"tags":"Leaf, Mint","__firebaseKey__":"menthol"},{"colorAccent":"#B3691A","colorBorder":"","colorClass":"#341E08","colorElement":"#2A2B30","colorFontElementId":"","colorFontName":"","counterCafe":1,"counterCream":1,"counterDrink":1,"descriptionShort":"Milk man!","elementClass":"Beverage","elementId":"Mi","favoritedBy":"","id":"M-101","img":"","name":"Milk","nameShort":"Milk","recipesIn":"","scoreBlend":9.7,"scoreFlavor":8.2,"scorePopularity":8.5,"tags":"Cafe, Cream, Drink","__firebaseKey__":"milk"},{"colorAccent":"#FAB21B","colorBorder":"#946150","colorClass":"#7A570D","colorElement":"#553f32","colorFontElementId":"#fff7d0","colorFontName":"","counterCafe":1,"counterCandy":1,"counterCandyBar":1,"counterChocolate":1,"counterWonka":1,"descriptionShort":"Classic chocolate bars.","elementClass":"Candy","elementId":"Mc","favoritedBy":"","id":"M-102","img":"","name":"Milk Chocolate","nameShort":"Milk Choc","recipesIn":"","scoreBlend":9.7,"scoreFlavor":8.8,"scorePopularity":8.5,"tags":"Cafe, Candy, Candy Bar, Chocolate, Wonka","__firebaseKey__":"milkChocolate"},{"colorAccent":"#4D6F1C","colorBorder":"","colorClass":"#2A3C0F","colorElement":"#2A2B30","colorFontElementId":"","colorFontName":"","counterHerbal":1,"counterLeaf":1,"counterMint":1,"descriptionShort":"Minty fresh.","elementClass":"Herbal","elementId":"Mi","id":"M-103","img":"","name":"Mint","nameShort":"Mint","scoreBlend":8.5,"scoreFlavor":8.2,"scorePopularity":8.5,"tags":"Herbal, Leaf, Mint","__firebaseKey__":"mint"},{"colorAccent":"#B3691A","colorBorder":"#b45c2e","colorClass":"#341E08","colorElement":"#3f1c1a","colorFontElementId":"#ffffff","colorFontName":"","counterBeverage":1,"counterCafe":1,"counterCoffee":1,"counterCream":1,"counterDrink":1,"counterWarm":1,"counterWonka":1,"descriptionShort":"A bit of chocolate in yer java.","elementClass":"Beverage","elementId":"Mo","favoritedBy":"","id":"M-104","img":"","name":"Mocha","nameShort":"Mocha","recipesIn":"","scoreBlend":8.2,"scoreFlavor":8.8,"scorePopularity":8.5,"tags":"Beverage, Cafe, Coffee, Cream, Drink, Warm, Wonka","__firebaseKey__":"mocha"},{"colorAccent":"#133540","colorBorder":"","colorClass":"#4CD5FF","colorElement":"#2A2B30","colorFontElementId":"","colorFontName":"","counterBeverage":1,"counterDrink":1,"counterSoda":1,"counterWonka":1,"descriptionShort":"A hillbilly delight.","elementClass":"Soda","elementId":"Mt","favoritedBy":"","id":"M-105","img":"","name":"Mountain Cola","nameShort":"Mtn Cola","recipesIn":"","scoreBlend":7.2,"scoreFlavor":9,"scorePopularity":8.5,"tags":"Beverage, Cola, Drink, Soda, Wonka","__firebaseKey__":"mountainCola"},{"colorAccent":"#f1f1f1","colorBorder":"#305ba0","colorClass":"#403e45","colorElement":"#192861","colorFontElementId":"#d7d9d8","colorFontName":"","counterLeaf":1,"counterTobacco":1,"descriptionShort":"Perhaps good for a break between session.","elementClass":"Tobacco","elementId":"Nh","favoritedBy":"","id":"N-099","img":"","name":"New Harbor","nameShort":"New Hrbr","recipesIn":"","scoreBlend":7.8,"scoreFlavor":7.9,"scorePopularity":8.5,"tags":"Leaf, Tobacco","__firebaseKey__":"newHarbor"},{"colorAccent":"#FF7D5C","colorBorder":"","colorClass":"#BF2F0C","colorElement":"#2A2B30","colorFontElementId":"","colorFontName":"","counterBreakfast":1,"counterDrink":1,"counterFruit":1,"counterSnacks":1,"counterSummer":1,"counterTropical":1,"counterWonka":1,"descriptionShort":"MOAR FRUITY GOODNESS.","elementClass":"Fruit","elementId":"Or","favoritedBy":"","id":"O-100","img":"","name":"Orange","nameShort":"Orange","recipesIn":"","scoreBlend":9.2,"scoreFlavor":9.8,"scorePopularity":8.5,"tags":"Breakfast, Drink, Fruit, Snacks, Summer, Tropical, Wonka","__firebaseKey__":"orange"},{"colorAccent":"#FF7D5C","colorBorder":"#d84f1b","colorClass":"#BF2F0C","colorElement":"#e14a1b","colorFontElementId":"#ffe16b","colorFontName":"","counterBreakfast":1,"counterFruit":1,"counterSummer":1,"counterTropical":1,"descriptionShort":"Yeah, this is good.","elementClass":"Fruit","elementId":"Py","favoritedBy":"","id":"P-100","img":"","name":"Papaya","nameShort":"Papaya","recipesIn":"","scoreBlend":8.8,"scoreFlavor":8.9,"scorePopularity":8.5,"tags":"Breakfast, Fruit, Summer, Tropical","__firebaseKey__":"papaya"},{"colorAccent":"#FF7D5C","colorBorder":"","colorClass":"#BF2F0C","colorElement":"#2A2B30","colorFontElementId":"","colorFontName":"","counterFruit":1,"counterSummer":1,"counterTropical":1,"descriptionShort":"I don\'t even know what this is, but it\'s delicious.","elementClass":"Fruit","elementId":"Pf","favoritedBy":"","id":"P-101","img":"","name":"Passion Fruit","nameShort":"Passion Fruit","recipesIn":"","scoreBlend":8.4,"scoreFlavor":8.5,"scorePopularity":8.5,"tags":"Fruit, Summer, Tropical","__firebaseKey__":"passionFruit"},{"colorAccent":"#FF7D5C","colorBorder":"#ffaa11","colorClass":"#BF2F0C","colorElement":"#ffc10e","colorFontElementId":"","colorFontName":"","counterBreakfast":1,"counterFruit":1,"counterSummer":1,"counterWonka":1,"descriptionShort":"How can you go a day without a peach?","elementClass":"Fruit","elementId":"Pe","favoritedBy":"","id":"P-102","img":"","name":"Peach","nameShort":"Peach","recipesIn":"","scoreBlend":8.9,"scoreFlavor":8.3,"scorePopularity":8.5,"tags":"Breakfast, Fruit, Summer, Wonka","__firebaseKey__":"peach"},{"colorAccent":"#FF7D5C","colorBorder":"#c4e034","colorClass":"#BF2F0C","colorElement":"#fdf4e3","colorFontElementId":"#573e16","colorFontName":"","counterBreakfast":1,"counterFruit":1,"counterSnacks":1,"counterSummer":1,"counterWonka":1,"descriptionShort":"Very delicate fruit flavor. Good to mix with.","elementClass":"Fruit","elementId":"Pr","favoritedBy":"","id":"P-103","img":"","name":"Pear","nameShort":"Pear","recipesIn":"","scoreBlend":8,"scoreFlavor":7.8,"scorePopularity":8.5,"tags":"Breakfast, Fruit, Snacks, Summer, Wonka","__firebaseKey__":"pear"},{"colorAccent":"#133540","colorBorder":"#0069aa","colorClass":"#4CD5FF","colorElement":"#013668","colorFontElementId":"#e7e8ed","colorFontName":"","counterBeverage":1,"counterCola":1,"counterDrink":1,"counterSoda":1,"descriptionShort":"Put a little pep in your step.","elementClass":"Soda","elementId":"Pc","favoritedBy":"","id":"P-104","img":"","name":"Pep Cola","nameShort":"Pep Cola","recipesIn":"","scoreBlend":8.8,"scoreFlavor":8.8,"scorePopularity":8.5,"tags":"Beverage, Cola, Drink, Soda","__firebaseKey__":"pepCola"},{"colorAccent":"#4D6F1C","colorBorder":"","colorClass":"#2A3C0F","colorElement":"#2A2B30","colorFontElementId":"","colorFontName":"","counterHerbal":1,"counterHoliday":1,"counterMint":1,"descriptionShort":"Another mint varietal.","elementClass":"Herbal","elementId":"Pm","favoritedBy":"","id":"P-105","img":"","name":"Peppermint","nameShort":"Peprmint","recipesIn":"","scoreBlend":8.1,"scoreFlavor":9,"scorePopularity":8.5,"tags":"Herbal, Holiday, Mint","__firebaseKey__":"peppermint"},{"colorAccent":"#FF7D5C","colorBorder":"#f5c199","colorClass":"#BF2F0C","colorElement":"#ffe627","colorFontElementId":"#e0963d","colorFontName":"","counterBreakfast":1,"counterFruit":1,"counterSnacks":1,"counterSummer":1,"counterTropical":1,"counterWonka":1,"descriptionShort":"Punchy, tart, fruity!","elementClass":"Fruit","elementId":"Pa","favoritedBy":"","id":"P-106","img":"","name":"Pineapple","nameShort":"Pineapple","recipesIn":"","scoreBlend":8.7,"scoreFlavor":8.6,"scorePopularity":8.5,"tags":"Breakfast, Fruit, Snacks, Summer, Tropical, Wonka","__firebaseKey__":"pineapple"},{"colorAccent":"#FF7D5C","colorBorder":"#5a1321","colorClass":"#BF2F0C","colorElement":"#e6425d","colorFontElementId":"#c01831","colorFontName":"","counterBreakfast":1,"counterFruit":1,"counterSnacks":1,"counterSummer":1,"counterWonka":1,"descriptionShort":"Savory fruity goodness.","elementClass":"Fruit","elementId":"Pl","favoritedBy":"","id":"P-107","img":"","name":"Plum","nameShort":"Plum","recipesIn":"","scoreBlend":9.2,"scoreFlavor":9.6,"scorePopularity":8.5,"tags":"Breakfast, Fruit, Snacks, Summer, Wonka","__firebaseKey__":"plum"},{"colorAccent":"#FF7D5C","colorBorder":"#e34e50","colorClass":"#BF2F0C","colorElement":"#8b0617","colorFontElementId":"","colorFontName":"","counterBreakfast":1,"counterFruit":1,"counterSummer":1,"counterWonka":1,"descriptionShort":"Everyone likes pomegranates, right?","elementClass":"Fruit","elementId":"Po","favoritedBy":"","id":"P-108","img":"","name":"Pomegranate","nameShort":"Pomgran","recipesIn":"","scoreBlend":8.2,"scoreFlavor":8.8,"scorePopularity":8.5,"tags":"Breakfast, Fruit, Summer, Wonka","__firebaseKey__":"pomegranate"},{"colorAccent":"#aa6f1c","colorBorder":"","colorClass":"#774e14","colorElement":"#2A2B30","colorFontElementId":"","colorFontName":"","counterDessert":1,"counterHoliday":1,"counterWarm":1,"counterWonka":1,"descriptionShort":"Give thanks. You can now vape pumpkin pies.","elementClass":"Dessert","elementId":"Pp","favoritedBy":"","id":"P-109","img":"","name":"Pumpkin Pie","nameShort":"Pmpkn Pi","recipesIn":"","scoreBlend":9.1,"scoreFlavor":9.1,"scorePopularity":8.5,"tags":"Dessert, Holiday, Warm, Wonka","__firebaseKey__":"pumpkinPie"},{"colorAccent":"#FF7D5C","colorBorder":"","colorClass":"#BF2F0C","colorElement":"#2A2B30","colorFontElementId":"","colorFontName":"","counterBerry":1,"counterSnacks":1,"counterSummer":1,"counterWonka":1,"descriptionShort":"A berry a day for a very nice day!","elementClass":"Fruit","elementId":"Rb","favoritedBy":"","id":"R-100","img":"","name":"Raspberry","nameShort":"Raspbrry","recipesIn":"","scoreBlend":9.3,"scoreFlavor":9.4,"scorePopularity":8.5,"tags":"Berry, Breakfast, Snacks, Summer, Wonka","__firebaseKey__":"raspberry"},{"colorAccent":"#133540","colorBorder":"#fdc300","colorClass":"#4CD5FF","colorElement":"#173084","colorFontElementId":"#ce033a","colorFontName":"","counterBeverage":1,"counterCola":1,"counterDrink":1,"counterSoda":1,"descriptionShort":"Red cola gives you bulls.","elementClass":"Soda","elementId":"Rc","favoritedBy":"","id":"R-101","img":"","name":"Red Cola","nameShort":"Red Cola","recipesIn":"","scoreBlend":7.3,"scoreFlavor":9.8,"scorePopularity":8.5,"tags":"Beverage, Cola, Drink, Soda","__firebaseKey__":"redCola"},{"colorAccent":"#4D6F1C","colorBorder":"","colorClass":"#2A3C0F","colorElement":"#2A2B30","colorFontElementId":"","colorFontName":"","counterHerbal":1,"counterLeaf":1,"descriptionShort":"So sweet, so subtle. Good to blend with others.","elementClass":"Herbal","elementId":"Ro","favoritedBy":"","id":"R-102","img":"","name":"Rose","nameShort":"Rose","recipesIn":"","scoreBlend":8.3,"scoreFlavor":8.2,"scorePopularity":8.5,"tags":"Herbal, Leaf","__firebaseKey__":"rose"},{"colorAccent":"#4D6F1C","colorBorder":"","colorClass":"#2A3C0F","colorElement":"#2A2B30","colorFontElementId":"","colorFontName":"","counterHerbal":1,"descriptionShort":"Distinct pine flavor for earthy blends.","elementClass":"Herbal","elementId":"Rm","favoritedBy":"","id":"R-103","img":"","name":"Rosemary","nameShort":"Rosemary","recipesIn":"","scoreBlend":7.2,"scoreFlavor":7.2,"scorePopularity":8.5,"tags":"Herbal","__firebaseKey__":"rosemary"},{"colorAccent":"#133540","colorBorder":"#00a547","colorClass":"#4CD5FF","colorElement":"#e60000","colorFontElementId":"#ffffff","colorFontName":"","counterBeverage":1,"counterCola":1,"counterDrink":1,"counterSoda":1,"counterWonka":1,"descriptionShort":"Lemon? Check. Lime? Check.","elementClass":"Soda","elementId":"Sc","favoritedBy":"","id":"S-100","img":"","name":"Luckie\'s 7 Cola","nameShort":"7 Cola","recipesIn":"","scoreBlend":8.8,"scoreFlavor":8.9,"scorePopularity":8.5,"tags":"Beverage, Cola, Drink, Soda, Wonka","__firebaseKey__":"sevenCola"},{"colorAccent":"#FAB21B","colorBorder":"#f09520","colorClass":"#7A570D","colorElement":"#bd0402","colorFontElementId":"ffffff","colorFontName":"","counterCandy":1,"counterSweet":1,"counterWonka":1,"descriptionShort":"Taste the double rainbow in this vape edition.","elementClass":"Candy","elementId":"Sk","favoritedBy":"","id":"S-101","img":"","name":"Skittles","nameShort":"Skittles","recipesIn":"","scoreBlend":8.3,"scoreFlavor":9.5,"scorePopularity":8.5,"tags":"Candy, Sweet, Wonka","__firebaseKey__":"skittles"},{"colorAccent":"#4D6F1C","colorBorder":"","colorClass":"#2A3C0F","colorElement":"#2A2B30","colorFontElementId":"","colorFontName":"","counterHerbal":1,"counterMint":1,"descriptionShort":"So much mint. So little time.","elementClass":"Herbal","elementId":"Sm","favoritedBy":"","id":"S-102","img":"","name":"Spearmint","nameShort":"Sprmint","recipesIn":"","scoreBlend":8,"scoreFlavor":8.2,"scorePopularity":8.5,"tags":"Mint","__firebaseKey__":"spearmint"},{"colorAccent":"#133540","colorBorder":"","colorClass":"#4CD5FF","colorElement":"#2A2B30","colorFontElementId":"","colorFontName":"","counterBeverage":1,"counterCola":1,"counterDrink":1,"counterSoda":1,"counterWonka":1,"descriptionShort":"Another take on a lemon/lime favorite.","elementClass":"Soda","elementId":"Ss","favoritedBy":"","id":"S-103","img":"","name":"Spirit\'s Soda","nameShort":"Sprt Soda","recipesIn":"","scoreBlend":8.7,"scoreFlavor":8.6,"scorePopularity":8.5,"tags":"Beverage, Cola, Drink, Soda, Wonka","__firebaseKey__":"spiritsSoda"},{"colorAccent":"#FF7D5C","colorBorder":"#801002","colorClass":"#BF2F0C","colorElement":"#cb4426","colorFontElementId":"#801002","colorFontName":"","counterBerry":1,"counterBreakfast":1,"counterFruit":1,"counterSnacks":1,"counterSummer":1,"counterWonka":1,"descriptionShort":"Straight from the garden.","elementClass":"Fruit","elementId":"Sb","favoritedBy":"","id":"S-104","img":"","name":"Strawberry","nameShort":"Strawberry","recipesIn":"","scoreBlend":9.4,"scoreFlavor":9.4,"scorePopularity":8.5,"tags":"Berry, Breakfast, Fruit, Snacks, Summer, Wonka","__firebaseKey__":"strawberry"},{"colorAccent":"#aa6f1c","colorBorder":"#c47c64","colorClass":"#774e14","colorElement":"#feffef","colorFontElementId":"#8e4127","colorFontName":"","counterCafe":1,"counterDessert":1,"counterWonka":1,"descriptionShort":"Like a fancy dessert.","elementClass":"Dessert","elementId":"Ti","favoritedBy":"","id":"T-100","img":"","name":"Tiramisu","nameShort":"Tiramisu","recipesIn":"","scoreBlend":8.8,"scoreFlavor":9.1,"scorePopularity":8.5,"tags":"Cafe, Dessert, Wonka","__firebaseKey__":"tiramisu"},{"colorAccent":"#133540","colorBorder":"","colorClass":"#4CD5FF","colorElement":"#2A2B30","colorFontElementId":"","colorFontName":"","counterBeverage":1,"counterCola":1,"counterSoda":1,"counterTropical":1,"descriptionShort":"Like from back in the day.","elementClass":"Soda","elementId":"Tp","favoritedBy":"","id":"T-101","img":"","name":"Tropic Punch","nameShort":"Trop Pnch","recipesIn":"","scoreBlend":7.9,"scoreFlavor":8.5,"scorePopularity":8.5,"tags":"Beverage, Cola, Soda, Tropical","__firebaseKey__":"tropicPunch"},{"colorAccent":"#aa6f1c","colorBorder":"#e89200","colorClass":"#774e14","colorElement":"#efe8cc","colorFontElementId":"#140202","colorFontName":"","counterCafe":1,"counterCream":1,"counterDessert":1,"counterWonka":1,"descriptionShort":"Blend me oh blend me.","elementClass":"Dessert","elementId":"Va","favoritedBy":"","id":"V-100","img":"","name":"Vanilla","nameShort":"Vanilla","recipesIn":"","scoreBlend":9.8,"scoreFlavor":9,"scorePopularity":8.5,"tags":"Cafe, Cream, Dessert, Wonka","__firebaseKey__":"vanilla"},{"colorAccent":"#aa6f1c","colorBorder":"#b65e00","colorClass":"#774e14","colorElement":"#e8a202","colorFontElementId":"#c8791d","colorFontName":"","counterBreakfast":1,"counterCafe":1,"counterWonka":1,"descriptionShort":"Good morning! Ready to start your day?","elementClass":"Dessert","elementId":"Wa","favoritedBy":"","id":"W-100","img":"","name":"Waffle","nameShort":"Waffle","recipesIn":"","scoreBlend":8.9,"scoreFlavor":9.4,"scorePopularity":8.5,"tags":"Breakfast, Cafe, Wonka","__firebaseKey__":"waffle"},{"colorAccent":"#aa6f1c","colorBorder":"#8e4d0b","colorClass":"#774e14","colorElement":"#d3ac8d","colorFontElementId":"#592607","colorFontName":"","counterBreakfast":1,"counterCafe":1,"counterNutty":1,"counterWonka":1,"descriptionShort":"Nutty and delicious.","elementClass":"Dessert","elementId":"Wn","favoritedBy":"","id":"W-101","img":"","name":"Walnut","nameShort":"Walnut","recipesIn":"","scoreBlend":8.4,"scoreFlavor":8.3,"scorePopularity":8.5,"tags":"Breakfast, Cafe, Nutty, Wonka","__firebaseKey__":"walnut"},{"colorAccent":"#FF7D5C","colorBorder":"#e14840","colorClass":"#BF2F0C","colorElement":"#eb7664","colorFontElementId":"#cb080c","colorFontName":"","counterBreakfast":1,"counterFruit":1,"counterSummer":1,"counterWonka":1,"descriptionShort":"Can\'t go wrong with this one.","elementClass":"Fruit","elementId":"Wm","favoritedBy":"","id":"W-102","img":"","name":"Watermelon","nameShort":"Watermelon","recipesIn":"","scoreBlend":8.8,"scoreFlavor":9.2,"scorePopularity":8.5,"tags":"Breakfast, Fruit, Summer, Wonka","__firebaseKey__":"watermelon"},{"colorAccent":"#aa6f1c","colorBorder":"#fdfbfe","colorClass":"#774e14","colorElement":"#2A2B30","colorFontElementId":"#f8eff4","colorFontName":"","counterCafe":1,"counterCream":1,"counterDessert":1,"descriptionShort":"A favorite of many.","elementClass":"Dessert","elementId":"Wc","favoritedBy":"","id":"W-103","img":"","name":"Whipped Cream","nameShort":"Whip Crem","recipesIn":"","scoreBlend":9.9,"scoreFlavor":9.7,"scorePopularity":8.5,"tags":"Cafe, Cream, Dessert","__firebaseKey__":"whippedCream"},{"colorAccent":"#902FB1","colorBorder":"","colorClass":"#521A64","colorElement":"#2A2B30","colorFontElementId":"","colorFontName":"","counterLiquor":1,"descriptionShort":"Like an urban cowboy. Saddle up.","elementClass":"Liquor","elementId":"Wh","favoritedBy":"","id":"W-104","img":"","name":"Whiskey","nameShort":"Whiskey","recipesIn":"","scoreBlend":7.1,"scoreFlavor":7.5,"scorePopularity":8.5,"tags":"Liquor","__firebaseKey__":"whiskey"},{"colorAccent":"#B3691A","colorBorder":"","colorClass":"#341E08","colorElement":"#2A2B30","colorFontElementId":"","colorFontName":"","counterBeverage":1,"counterCafe":1,"counterCoffee":1,"counterDrink":1,"counterHotDrink":1,"descriptionShort":"A light roast.","elementClass":"Beverage","elementId":"We","favoritedBy":"","id":"W-105","img":"","name":"White Coffee","nameShort":"Wht Cofe","recipesIn":"","scoreBlend":9.3,"scoreFlavor":9,"scorePopularity":8.5,"tags":"Beverage, Cafe, Coffee, Drink, Hot Drink","__firebaseKey__":"whiteCoffee"}]';
Polymer({
is: 'periodic-grid',
ready: function () {
this.trigger = true;
this.filter = 'all';
this.juices = JSON.parse(this.data);
console.log(this.juices);
},
properties: {
juices: {
type: Array,
value: [],
notify: true
},
filter: {
type: String,
value: '',
notify: true,
observer: '_filterObserver'
},
trigger: {
type: Boolean,
value: true,
notify: false,
observer: '_trigger'
},
data: {
type: Array,
value: dataString,
notify: false,
observer: '_trigger'
}
},
handleTrack: function (e) {
console.log(e);
},
computeFilter: function (string) {
if (!string || string === 'all') {
return null;
} else {
return function (item) {
if (string.includes('counter')) {
return item[string] === 1;
} else {
if (item.name) {
var name = item.name.toLowerCase();
var qString = string.toString();
return name.includes(qString.toLowerCase());
}
return null;
}
};
}
},
_filterObserver: function (newValue) {
this.computeFilter(newValue);
},
_trigger: function () {
}
});
}());
(function () {
'use strict';
Polymer({
is: 'periodic-details',
properties: {
foo: {
type: String,
value: 'periodic-details',
notify: true
}
}
});
}());
Polymer.IronValidatableBehavior = {
properties: {
validatorType: {
type: String,
value: 'validator'
},
validator: { type: String },
invalid: {
notify: true,
reflectToAttribute: true,
type: Boolean,
value: false
},
_validatorMeta: { type: Object }
},
observers: ['_invalidChanged(invalid)'],
get _validator() {
return this._validatorMeta && this._validatorMeta.byKey(this.validator);
},
ready: function () {
this._validatorMeta = new Polymer.IronMeta({ type: this.validatorType });
},
_invalidChanged: function () {
if (this.invalid) {
this.setAttribute('aria-invalid', 'true');
} else {
this.removeAttribute('aria-invalid');
}
},
hasValidator: function () {
return this._validator != null;
},
validate: function (value) {
this.invalid = !this._getValidity(value);
return !this.invalid;
},
_getValidity: function (value) {
if (this.hasValidator()) {
return this._validator.validate(value);
}
return true;
}
};
Polymer({
is: 'iron-input',
extends: 'input',
behaviors: [Polymer.IronValidatableBehavior],
properties: {
bindValue: {
observer: '_bindValueChanged',
type: String
},
preventInvalidInput: { type: Boolean },
allowedPattern: {
type: String,
observer: '_allowedPatternChanged'
},
_previousValidInput: {
type: String,
value: ''
},
_patternAlreadyChecked: {
type: Boolean,
value: false
}
},
listeners: {
'input': '_onInput',
'keypress': '_onKeypress'
},
registered: function () {
if (!this._canDispatchEventOnDisabled()) {
this._origDispatchEvent = this.dispatchEvent;
this.dispatchEvent = this._dispatchEventFirefoxIE;
}
},
created: function () {
Polymer.IronA11yAnnouncer.requestAvailability();
},
_canDispatchEventOnDisabled: function () {
var input = document.createElement('input');
var canDispatch = false;
input.disabled = true;
input.addEventListener('feature-check-dispatch-event', function () {
canDispatch = true;
});
try {
input.dispatchEvent(new Event('feature-check-dispatch-event'));
} catch (e) {
}
return canDispatch;
},
_dispatchEventFirefoxIE: function () {
var disabled = this.disabled;
this.disabled = false;
this._origDispatchEvent.apply(this, arguments);
this.disabled = disabled;
},
get _patternRegExp() {
var pattern;
if (this.allowedPattern) {
pattern = new RegExp(this.allowedPattern);
} else {
switch (this.type) {
case 'number':
pattern = /[0-9.,e-]/;
break;
}
}
return pattern;
},
ready: function () {
this.bindValue = this.value;
},
_bindValueChanged: function () {
if (this.value !== this.bindValue) {
this.value = !(this.bindValue || this.bindValue === 0 || this.bindValue === false) ? '' : this.bindValue;
}
this.fire('bind-value-changed', { value: this.bindValue });
},
_allowedPatternChanged: function () {
this.preventInvalidInput = this.allowedPattern ? true : false;
},
_onInput: function () {
if (this.preventInvalidInput && !this._patternAlreadyChecked) {
var valid = this._checkPatternValidity();
if (!valid) {
this._announceInvalidCharacter('Invalid string of characters not entered.');
this.value = this._previousValidInput;
}
}
this.bindValue = this.value;
this._previousValidInput = this.value;
this._patternAlreadyChecked = false;
},
_isPrintable: function (event) {
var anyNonPrintable = event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 13 || event.keyCode == 27;
var mozNonPrintable = event.keyCode == 19 || event.keyCode == 20 || event.keyCode == 45 || event.keyCode == 46 || event.keyCode == 144 || event.keyCode == 145 || event.keyCode > 32 && event.keyCode < 41 || event.keyCode > 111 && event.keyCode < 124;
return !anyNonPrintable && !(event.charCode == 0 && mozNonPrintable);
},
_onKeypress: function (event) {
if (!this.preventInvalidInput && this.type !== 'number') {
return;
}
var regexp = this._patternRegExp;
if (!regexp) {
return;
}
if (event.metaKey || event.ctrlKey || event.altKey)
return;
this._patternAlreadyChecked = true;
var thisChar = String.fromCharCode(event.charCode);
if (this._isPrintable(event) && !regexp.test(thisChar)) {
event.preventDefault();
this._announceInvalidCharacter('Invalid character ' + thisChar + ' not entered.');
}
},
_checkPatternValidity: function () {
var regexp = this._patternRegExp;
if (!regexp) {
return true;
}
for (var i = 0; i < this.value.length; i++) {
if (!regexp.test(this.value[i])) {
return false;
}
}
return true;
},
validate: function () {
var valid = this.checkValidity();
if (valid) {
if (this.required && this.value === '') {
valid = false;
} else if (this.hasValidator()) {
valid = Polymer.IronValidatableBehavior.validate.call(this, this.value);
}
}
this.invalid = !valid;
this.fire('iron-input-validate');
return valid;
},
_announceInvalidCharacter: function (message) {
this.fire('iron-announce', { text: message });
}
});
Polymer({
is: 'search-bar',
properties: {
show: {
type: Boolean,
value: false
},
searchInput: {
type: String,
value: ''
}
},
toggleSearch: function (e) {
if (e) {
e.stopPropagation();
}
if (e.target === this.$.input) {
return;
}
this.show = !this.show;
this.async(function () {
this.$.input.focus();
if (this.show) {
document.querySelector('#middleBar').style.display = 'none';
} else {
document.querySelector('#middleBar').style.display = 'flex';
}
});
},
onKeyPress: function (e) {
console.log(e);
document.querySelector('periodic-grid').filter = this.searchInput;
},
onInput: function (e) {
console.log(e.srcElement.value);
if (e.srcElement.value === '') {
document.querySelector('periodic-grid').filter = 'all';
}
}
});
!function (e) {
'use strict';
var o = e.querySelector('#app');
o.displayInstalledToast = function () {
e.querySelector('platinum-sw-cache').disabled || e.querySelector('#caching-complete').show();
}, o.addEventListener('dom-change', function () {
console.log('Our app is ready to rock!');
}), window.addEventListener('WebComponentsReady', function () {
}), o.onDataRouteClick = function () {
var o = e.querySelector('#paperDrawerPanel');
o.narrow && o.closeDrawer();
}, o.scrollPageToTop = function () {
e.getElementById('mainContainer').scrollTop = 0;
};
}(document);