var webRTCconnection = null;
var publicMetaBackend = null;
var ANBAW = null;

function setCollegeMode(a) {
	collegeMode = a,
		Cookie.write("collegemode", collegeMode, {
			duration: 365,
			domain: document.domain,
			path: "/"
		})
}
function clearCollegeSetting() {
	Cookie.write("college", "", {
		duration: 365,
		domain: document.domain,
		path: "/"
	}),
		Cookie.write("collegemode", "", {
			duration: 365,
			domain: document.domain,
			path: "/"
		}),
		collegeAndAuth = null,
		collegeMode = "any"
}
function middotify(a) {
	for (var b = new Element("span"), c = 0; c < a.length; c++)
		c > 0 && b.appendText(" • "),
			b.grab(a[c]);
	return b
}
function confirmTerms(a, b) {
	function c() {
		document.body.removeChild(e)
	}
	function d() {
		var a = document.createElement("p")
			, b = document.createElement("label")
			, c = document.createElement("input");
		c.type = "checkbox",
			c.style.fontSize = "1.5em",
			c.style.width = "1em",
			c.style.height = "1em",
			c.style["float"] = "left",
			c.style.marginRight = "0.5em",
			b.appendChild(c),
			b.appendChild(document.createTextNode(" "));
		var d = i.length;
		return i.push(!1),
			j.push(c),
			c.addEventListener("change", function () {
				i[d] = c.checked;
				for (var a = !0, b = 0; b < i.length; b++)
					i[b] || (a = !1);
				h.disabled = !a,
					h.style.pointerEvents = a ? "auto" : "none"
			}),
			a.appendChild(b),
			f.appendChild(a),
			b
	}
	if (termsLevel >= a)
		return void b();
	var e = document.createElement("div");
	e.style.position = "fixed",
		e.style.top = 0,
		e.style.left = 0,
		e.style.width = "100%",
		e.style.height = "100%",
		e.style.overflow = "auto",
		e.style.zIndex = "10000",
		e.style.backgroundColor = "#000",
		e.style.backgroundColor = "rgba(0, 0, 0, 0.4)",
		e.addEventListener("click", function (a) {
			a.currentTarget === a.target && c()
		});
	var f = document.createElement("div");
	f.style.position = "relative",
		f.style.backgroundColor = "#FFF",
		f.style.margin = "15% auto",
		f.style.padding = "1em",
		f.style.width = "50%",
		f.style.boxShadow = "5px 5px 10px 5px rgba(0, 0, 0, 0.333)",
		IS_MOBILE && (f.style.width = "80%"),
		f.style.borderRadius = "2em";
	var g = document.createElement("a");
	g.href = "#",
		g.style.color = "#555",
		g.style.textDecoration = "none",
		g.style.fontSize = "2em",
		g.style.position = "absolute",
		g.style.top = ".25em",
		g.style.right = ".5em",
		g.style.lineHeight = "1",
		g.appendChild(document.createTextNode("×")),
		g.addEventListener("click", function (a) {
			a.preventDefault(),
				c()
		}),
		f.appendChild(g);
	var h = document.createElement("input");
	h.type = "button",
		h.value = "Confirm & continue",
		h.disabled = !0,
		h.style.fontSize = "1.5em",
		h.style.pointerEvents = "none",
		h.addEventListener("click", function () {
			c(),
				termsLevel = a,
				b()
		});
	var i = []
		, j = []
		, k = !1
		, l = d();
	l.appendChild(document.createTextNode("By checking the box you acknowledge that you have reviewed and agree to be bound by Omegle’s "));
	var m = document.createElement("a");
	m.target = "_blank",
		m.href = "/static/terms.html",
		m.appendChild(document.createTextNode("Terms of Service")),
		l.appendChild(m),
		l.appendChild(document.createTextNode(", "));
	var n = document.createElement("a");
	n.target = "_blank",
		n.href = "/static/privacy.html",
		n.appendChild(document.createTextNode("Privacy Policy")),
		l.appendChild(n),
		l.appendChild(document.createTextNode(", and "));
	var o = document.createElement("a");
	o.target = "_blank",
		o.href = "/static/guidelines.html",
		o.appendChild(document.createTextNode("Community Guidelines")),
		l.appendChild(o),
		l.appendChild(document.createTextNode("."));
	var p = d();
	if (1 === a) {
		p.appendChild(document.createTextNode("Omegle may not be used by persons under the age of 13. Persons between 13 and 18 years of age may only use Omegle with the permission and under the supervision of their legal guardian. See our "));
		var q = document.createElement("a");
		q.target = "_blank",
			q.href = "/static/terms.html",
			q.appendChild(document.createTextNode("Terms of Service")),
			p.appendChild(q),
			p.appendChild(document.createTextNode(" for more info. "));
		var r = document.createElement("strong");
		r.appendChild(document.createTextNode("By checking the box you acknowledge and represent that you comply with these age restrictions.")),
			p.appendChild(r)
	} else {
		p.appendChild(document.createTextNode("You may not use this service if you are under the age of 18 or the age of legal majority in your jurisdiction. See our "));
		var q = document.createElement("a");
		q.target = "_blank",
			q.href = "/static/terms.html",
			q.appendChild(document.createTextNode("Terms of Service")),
			p.appendChild(q),
			p.appendChild(document.createTextNode(" for more info. "));
		var r = document.createElement("strong");
		r.appendChild(document.createTextNode("By checking the box you acknowledge and represent that you are 18 years (or the age of legal majority in your jurisdiction) or older.")),
			p.appendChild(r)
	}
	var s = document.createElement("p");
	s.style.textAlign = "right",
		s.appendChild(h),
		s.addEventListener("click", function () {
			if (h.disabled && !k) {
				var a = [];
				k = !0;
				for (var b = 0; b < i.length; b++)
					i[b] || (j[b].style.transition = "outline 0.1s",
						j[b].style.outline = "3px solid red",
						j[b].style.outlineOffset = "3px",
						a.push(j[b]));
				setTimeout(function () {
					for (var b = 0; b < a.length; b++)
						a[b].style.outline = "0 solid red";
					setTimeout(function () {
						k = !1
					}, 100)
				}, 150)
			}
		}),
		f.appendChild(s),
		e.appendChild(f),
		document.body.appendChild(e)
}
function confirmAdultSite() {
	return confirm("YOU ARE LEAVING OMEGLE. This link will redirect you to a third-party website that is not owned or operated by Omegle. Omegle is not responsible for, and shall not be liable for, any of the content, products or services at the third-party website.\n\nThe third-party website contains adult content that is not appropriate for and shall not be accessed by persons under the age of 18 years old. By pressing OK, you acknowledge this age restriction and affirm that you are 18 years old or older.")
}
function startFirstChat(a, b, c, d, e) {
	var f = Array.prototype.slice.call(arguments);
	let callbackRun = () => {
		confirmTerms(e || shouldForceUnmonitored ? 2 : 1, function () {
			for (IS_MOBILE ? ((document.scrollingElement || document.documentElement).scrollTop = 100,
				logoElt = $("logo"),
				savedHeader = $("header"),
				$("header").dispose(),
				contentTop = 0) : (contentTop = $("intro").offsetTop,
					$$("#headerappstore").setStyle("visibility", "visible")),
				savedIntro = $("intro"),
				$("google_translate_upper_container") && $("google_translate_upper_container").grab && $("google_translate_wrapper") && $("google_translate_upper_container").grab($("google_translate_wrapper")),
				$("intro").dispose(); f.length < 5;)
				f.push(void 0);
			f.push(!0),
				startNewChat.apply(null, f)
		});
	};
	if (!ANBAW.requestChatFind()) {
		if (!a) {
			callbackRun();
		} else {
			ANBAW.loadModel(callbackRun);
		}
	} else {
		callbackRun();
	}
}
function showIntro() {
	if (savedHeader && !$("header") && (logoElt && savedHeader.grab(logoElt, "top"),
		$(document.body).grab(savedHeader)),
		savedIntro && $(document.body).grab(savedIntro),
		IS_MOBILE)
		for (var a = 0; 300 >= a; a += 50)
			setTimeout(function () {
				scrollTo(0, 1)
			}, a);
	else
		$$("#headerappstore").setStyle("visibility", "hidden");
	mobileAdWrapper && $("mobileadwrapper2") && mobileAdWrapper.setStyles({
		display: "block",
		top: $("mobileadwrapper2").getPosition().y + "px"
	});
	var b = makeTopicSettings(!0);
	$("topicsettingscontainer") && ($("topicsettingscontainer").empty(),
		$("topicsettingscontainer").grab(b))
}
function commify(a) {
	var b, c = "";
	do {
		for (b = (a % 1e3).toString(),
			a = Math.floor(a / 1e3); 0 != a && b.length < 3;)
			b = "0" + b;
		c = b + c,
			a && (c = "," + c)
	} while (0 != a);
	return c
}
function onlineCountUpdated(a) {
	var b = $("onlinecount");
	if (b && void 0 !== a && null !== a && !isNaN(a)) {
		a = 1e3 * Math.floor(a / 1e3);
		var c = "<strong>" + commify(a) + "+</strong> online now";
		b.set("html", c)
	}
}
function randomSpyMode() {
	return Math.random() < .25 ? "spy" : "spyee"
}
function forceUnmon() {
	if (!IS_MOBILE && !shouldForceUnmonitored) {
		shouldForceUnmonitored = !0;
		var a = $("intro") || savedIntro;
		if (a) {
			a.getElementById("monitoringnotice") && a.getElementById("monitoringnotice").dispose();
			var b = new Element("div", {
				id: "monitoringnotice"
			});
			a.getElementById("chattypes").grab(b, "before"),
				b.addClass("banned");
			var c = new Element("p", {
				html: "Your computer/network is <strong>banned</strong> for possible bad behavior."
			})
				, d = new Element("p", {
					"class": "extrainfo",
					html: "<strong>You can still use Omegle</strong>, but only the unmonitored section. <strong>You must be 18 or older.</strong>"
				})
				, e = new Element("p", {
					"class": "extrainfo",
					html: "(If you didn't do anything wrong, sorry! Mistakes happen sometimes. Your ban won't last forever.)"
				});
			b.grab(c),
				b.grab(d),
				b.grab(e),
				a.getElements("#tryspymode, #intoheadercell, #topicsettingscell, #spymodebtn, #videobtnunmoderated").dispose();
			var f = "/static/pornbtn";
			f += window.devicePixelRatio && window.devicePixelRatio > 1 ? "@2x.png?xx" : ".png?xx";
			var g = new Element("img", {
				src: f,
				width: 124,
				height: 50,
				id: "girlsbtn"
			})
				, h = new Element("td");
			h.grab(g);
			var i = firstChatTrackCode ? "-" + firstChatTrackCode : "";
			g.addEvent("click", function () {
				confirmAdultSite() && window.open("http://wawadmin.omegle.com/redir/y?track=homepage-ban" + i)
			});
			var j = new Element("td", {
				"class": "chattypeorcell",
				text: "or"
			})
				, k = "/static/gaybtnorange";
			k += window.devicePixelRatio && window.devicePixelRatio > 1 ? "@2x.png" : ".png";
			var l = new Element("img", {
				src: k,
				width: 124,
				height: 50,
				id: "gaybtn"
			})
				, m = new Element("td");
			m.grab(l),
				l.addEvent("click", function () {
					confirmAdultSite() && window.open("http://wawadmin.omegle.com/redir/gay?track=homepage-ban")
				});
			var n = (new Element("td", {
				"class": "chattypeorcell",
				text: "or"
			}),
				new Element("tr"));
			n.grab(h),
				n.grab(j),
				n.grab(m),
				a.getElement("#chattypes tbody").grab(n),
				$("videobtn").set("src", $("videobtn").get("src").replace("-disabled", "-enabled")),
				$("videobtnstatus").set("html", "&nbsp;")
		}
	}
}
function updateServerStatus() {
	serverStatusTimeout && (clearTimeout(serverStatusTimeout),
		serverStatusTimeout = null);
	var a = serverManager.pickServer();
	subdomainManager.subdomainWindow(a, function (b) {
		killHeaders(new b.Request.JSON({
			url: subdomainManager.fixUrl(a, "/status"),
			onSuccess: function (a) {
				gotServerStatus(a)
			},
			onFailure: function () {
				serverManager.unsetKnownGood(),
					serverStatusTimeout = setTimeout(updateServerStatus, 1500)
			}
		})).get({
			nocache: Math.random(),
			randid: randID
		})
	})
}
function gotServerStatus(a) {
	serverStatusTimeout && (clearTimeout(serverStatusTimeout),
		serverStatusTimeout = null),
		onlineCountUpdated(a.count),
		idealSpyMode = a.spyQueueTime - a.spyeeQueueTime > 1 ? "spyee" : "spy",
		a.timestamp && timeManager.gotAccurateTime(new Date(1e3 * a.timestamp)),
		a.servers && a.servers.length && serverManager.setServerList(a.servers),
		antinudeServers = a.antinudeservers || [],
		screenshotPercent = a.antinudepercent || 0,
		a.force_unmon && forceUnmon(),
		firstStatusUpdate = !1,
		serverStatusTimeout = setTimeout(updateServerStatus, 9e4),
		a.rtmfp && a.rtmfp.length && (rtmfpServer = a.rtmfp)
}
function loadTumblrTags(a, b) {
	var c = serverManager.pickServer();
	subdomainManager.subdomainWindow(c, function (d) {
		killHeaders(new d.Request.JSON({
			url: subdomainManager.fixUrl(c, "/tumblr_tags"),
			onSuccess: function (a) {
				b(a)
			},
			onFailure: function () {
				b({
					success: !1,
					error: "Error reaching server."
				})
			}
		})).post({
			username: a
		})
	})
}
function processTumblrTags(a, b) {
	b || (b = 20);
	for (var c = [], d = {}, e = 0; e < a.length; e++) {
		var f = a[e]
			, g = topicManager.normalize(f);
		d[g] ? (d[g].count++,
			f.length > d[g].format.length && (d[g].format = f)) : (d[g] = {
				count: 1,
				format: f
			},
				c.push(g))
	}
	c.sort(function (a, b) {
		var c = d[a].count
			, e = d[b].count;
		if (c !== e)
			return e - c;
		var f = Math.abs(a.length - 10)
			, g = Math.abs(b.length - 10);
		return f - g
	});
	for (var h = [], e = 0; e < Math.min(b, c.length); e++)
		h.push(d[c[e]].format);
	return h
}
function setShouldUseLikes(a) {
	shouldUseLikes = a,
		Cookie.write("uselikes", a ? "1" : "0", {
			duration: 365,
			domain: document.domain,
			path: "/"
		})
}
function setShouldUseEnglish(a) {
	shouldUseEnglish = a,
		Cookie.write("useenglish", a ? "1" : "0", {
			duration: 365,
			domain: document.domain,
			path: "/"
		})
}
function makeShouldUseLikesCheckbox() {
	var a = new Element("label")
		, b = new Element("input", {
			type: "checkbox",
			checked: shouldUseLikes,
			"class": "shoulduselikescheckbox"
		});
	return b.addEvent("change", function () {
		setShouldUseLikes(b.checked)
	}),
		a.grab(b),
		a.appendText(" Find strangers with common interests"),
		a
}
function makeCollegeCheckboxes(a) {
	var b = new Element("div");
	if (a) {
		var c = new Element("div");
		c.setStyle("font-weight", "bold"),
			c.set("text", "College: "),
			c.appendText(collegeAndAuth[0]),
			c.appendText(" "),
			c.grab(a),
			b.grab(c)
	}
	var d = new Element("label")
		, e = new Element("input", {
			type: "checkbox"
		});
	e.addEvent("change", function () {
		g.checked = !1,
			setCollegeMode(e.checked ? "my" : "none")
	}),
		d.grab(e),
		a ? d.appendText(" Find strangers from my college") : d.appendText(" " + collegeAndAuth[0]),
		b.grab(d),
		a ? b.grab(new Element("br")) : b.appendText(" ");
	var f = new Element("label")
		, g = new Element("input", {
			type: "checkbox"
		});
	return g.addEvent("change", function () {
		e.checked = !1,
			setCollegeMode(g.checked ? "any" : "none")
	}),
		f.grab(g),
		f.appendText(" Any college"),
		b.grab(f),
		"my" === collegeMode ? e.checked = !0 : "any" === collegeMode && (g.checked = !0),
		b
}
function makeCollegeEmailForm(a) {
	var b = new Element("div")
		, c = ["<strong>College student</strong> chat", "<strong>College student</strong> chat"]
		, d = Math.floor(Math.random() * c.length)
		, e = new Element("div")
		, f = new Element("a", {
			html: c[d],
			href: "javascript:",
			events: {
				click: function (a) {
					a.preventDefault(),
						b.grab(g),
						k.focus(),
						e.dispose()
				}
			}
		});
	f.setStyles({
		display: "block",
		"margin-top": "0.5em",
		border: "1px solid #CCC",
		background: "#EEE",
		color: "black",
		"text-align": a ? "center" : "left",
		"text-decoration": "none",
		padding: "0.25em",
		"border-radius": "0.5em",
		position: "relative"
	}),
		f.setStyle("padding-left", a ? "0.25em" : "2em"),
		f.grab(new Element("span", {
			text: "▶",
			styles: {
				position: "absolute",
				left: "1em",
				top: "0"
			}
		}), "top"),
		e.grab(f),
		b.grab(e);
	var g = new Element("form", {
		styles: {
			margin: 0,
			padding: 0,
			"text-align": "justify"
		},
		events: {
			submit: function (a) {
				function b(a, b) {
					m.setStyle("color", a ? "green" : "red");
					var c = b.split("\n");
					m.empty();
					for (var d = 0; d < c.length; d++)
						m.grab(new Element("div", {
							text: c[d]
						}));
					k.set("disabled", !1),
						l.set("disabled", !1),
						k.set("value", "")
				}
				a.preventDefault(),
					m.empty(),
					k.set("disabled", !0),
					l.set("disabled", !0);
				var c = serverManager.pickServer();
				subdomainManager.subdomainWindow(c, function (a) {
					killHeaders(new a.Request.JSON({
						url: subdomainManager.fixUrl(c, "/send_email"),
						onSuccess: function (a) {
							b(a.success, a.msg)
						},
						onFailure: function () {
							b(!1, "Technical error. Sorry. :(")
						}
					})).post({
						email: k.get("value")
					})
				})
			}
		}
	});
	g.setStyle("margin-top", "1em");
	var h = new Element("div", {
		styles: {
			"font-size": "0.9em"
		}
	});
	h.set("html", "Please enter a college email address <strong>ending in .edu or .edu.XX or .ac.XX</strong> to verify you're in college. This will allow you to chat with other college students."),
		g.grab(h);
	var i = new Element("div", {
		styles: {
			"text-align": a ? "center" : "left"
		}
	})
		, j = new Element("label")
		, k = new Element("input", {
			type: "text",
			size: "35"
		});
	j.grab(k),
		i.grab(j);
	var l = new Element("input", {
		type: "submit",
		value: "Go"
	});
	i.appendText(" "),
		i.grab(l),
		g.grab(i);
	var m = new Element("div", {
		styles: {
			"text-align": a ? "center" : "left"
		}
	});
	g.grab(m);
	var n = new Element("div", {
		styles: {
			"font-size": "0.9em"
		}
	});
	return n.set("html", "<strong>We WON'T spam you, sell your address, or save it.</strong><br>We'll email you to verify your college address, and that's all. Other users won't see your address, only the domain (the part after the @ sign)."),
		g.grab(n),
		b
}
function basicReady() {
	if (!basicReadyCalled) {
		if (basicReadyCalled = !0,
			$("feedback")) {
			var a = $$("#feedback h2");
			"#feedback" == location.hash ? ($("feedback").addClass("expanded"),
				$("feedbackmessage").focus()) : $("feedback").addClass("collapsed"),
				a.addEvent("needsclick"),
				a.addEvent("click", function () {
					$("feedback").hasClass("expanded") ? ($("feedback").removeClass("expanded"),
						$("feedback").addClass("collapsed")) : ($("feedback").removeClass("collapsed"),
							$("feedback").addClass("expanded"),
							$("feedbackmessage").focus())
				})
		}
		if (IS_MOBILE && testRTCSupport() && $("chatbtnwrapper") && $("chatbtn")) {
			$("chatbtn").setStyles({
				display: "inline",
				"vertical-align": "middle"
			});
			var b = new Element("img", {
				alt: "Video",
				src: "/static/videobtn-enabled" + (window.devicePixelRatio && devicePixelRatio > 1 ? "@2x" : "") + ".png",
				events: {
					click: function (a) {
						startFirstChat(!0)
					}
				},
				styles: {
					"margin-left": "0.5em",
					"vertical-align": "middle"
				},
				width: 124,
				height: 50
			});
			$("chatbtnwrapper").grab(b),
				$("chatbtnwrapper").grab(new Element("p", {
					text: "Mobile video chat is an experimental new feature. Video is monitored, so keep it clean!",
					styles: {
						textAlign: "center"
					}
				}), "before"),
				$("chatbtnwrapper").grab(new Element("p", {
					text: "Go to ",
					styles: {
						textAlign: "center"
					}
				}).grab(new Element("a", {
					text: "an adult site",
					target: "_blank",
					href: "https://wawadmin.omegle.com/redir/y?track=mobile-homepage",
					events: {
						click: function () {
							return confirmAdultSite()
						}
					}
				})).appendText(" instead if that's what you want, and you are 18 or older."), "before")
		} else
			IS_MOBILE && ($("chatbtnwrapper").grab(new Element("p", {
				text: "Omegle is not meant as a place to be dirty!",
				styles: {
					textAlign: "center"
				}
			}), "before"),
				$("chatbtnwrapper").grab(new Element("p", {
					text: "Go to ",
					styles: {
						textAlign: "center"
					}
				}).grab(new Element("a", {
					text: "an adult site",
					target: "_blank",
					href: "https://wawadmin.omegle.com/redir/y?track=mobile-homepage-novideo",
					events: {
						click: function () {
							return confirmAdultSite()
						}
					}
				})).appendText(" instead if that's what you want, and you are 18 or older."), "before"))
	}
}
function onReady() {
	function a() {
		$("tryspymodetext").empty();
		var a = makeSpyOptionsForm(startFirstChat);
		a.form.setStyle("marginTop", "0.5em"),
			a.form.setStyle("marginBottom", "0.5em"),
			$("tryspymodetext").appendText("Spy mode lets you ask a question and watch two strangers discuss it. (The strangers volunteer to be watched.)"),
			$("tryspymodetext").grab(new Element("br")),
			$("tryspymodetext").appendText("Ask anything you like, but try to keep questions open-ended and thought-provoking."),
			$("tryspymodetext").grab(a.form);
		var b = new Element("div")
			, c = new Element("button", {
				text: "Ask strangers"
			});
		c.addEvent("click", a.go),
			b.grab(c),
			$("tryspymodetext").grab(b);
		var d = new Element("div");
		d.setStyle("font-size", "0.9em"),
			d.set("text", "Or you can try ");
		var e = new Element("a");
		e.set("text", "discussing questions"),
			e.set("href", "javascript:"),
			e.addEvent("click", function (a) {
				a.preventDefault(),
					startFirstChat(!1, null, !0, !1)
			}),
			d.grab(e),
			d.appendText(" instead."),
			$("tryspymodetext").grab(d),
			a.focus()
	}
	function b() {
		$("tryspymodetext").empty(),
			$("tryspymodetext").set("html", "Spy mode gives you and a stranger a <strong>random question</strong> to discuss. The question is submitted by a third stranger who can watch the conversation, but can't join in.");
		var b = new Element("button", {
			text: "Check it out!"
		});
		b.addEvent("click", function (a) {
			a.preventDefault(),
				startFirstChat(!1, null, !0, !1)
		}),
			$("tryspymodetext").grab(new Element("br")),
			$("tryspymodetext").grab(b);
		var c = new Element("div");
		c.setStyle("font-size", "0.9em"),
			c.set("text", "Or you can try ");
		var d = new Element("a");
		d.set("text", "asking a question"),
			d.set("href", "javascript:"),
			d.addEvent("click", function (b) {
				b.preventDefault(),
					a()
			}),
			c.grab(d),
			c.appendText(" instead."),
			$("tryspymodetext").grab(c)
	}
	function c() {
		$("textbtnstatus") && $("textbtnstatus").empty(),
			$("tryspymode").setStyle("display", "block"),
			$("tryspymode").removeEvents("click"),
			$("tryspymode").removeClass("collapsed"),
			"spy" == idealSpyMode ? a() : b()
	}
	if (basicReady(),
		updateServerStatus(),
		null === $("textbtn") && null === $("chatbtn"))
		return void window.addEvent("load", onReady);
	if ("undefined" != typeof FastClick && new FastClick(document.body),
		($("textbtn") || $("chatbtn")).addEvent("click", function () {
			startFirstChat(!1)
		}),
		$("mobileadwrapper") && (mobileAdWrapper = $("mobileadwrapper"),
			mobileAdWrapperSize = mobileAdWrapper.getSize(),
			"body" !== mobileAdWrapper.getParent().get("tag") && ($(document.body).grab(mobileAdWrapper),
				mobileAdWrapper.setStyle("display", "none")),
			$("mobileadwrapper2"))) {
		$("mobileadwrapper2").setStyles({
			width: mobileAdWrapperSize.x + "px",
			height: mobileAdWrapperSize.y + "px",
			margin: "auto",
			"text-align": "center"
		});
		var d = $("mobileadwrapper2").getPosition();
		mobileAdWrapper.setStyles({
			display: "block",
			position: "absolute",
			top: d.y + "px",
			left: d.x + "px"
		})
	}
	$("tryspymode") && ($("tryspymode").addClass("needsclick"),
		$("tryspymode").addEvent("click", c),
		IS_MOBILE || ($("tryspymode").setStyle("display", "none"),
			new Element("a", {
				id: "spymodebtn",
				text: "Spy (question) mode",
				href: "javascript:",
				styles: {
					"border-radius": "0.5em",
					"-moz-border-radius": "0.5em",
					"-webkit-border-radius": "0.5em",
					background: "#EEE",
					"font-weight": "normal",
					padding: "0.333em 0",
					display: "block",
					"margin-left": "3px",
					"margin-right": "3px",
					"margin-top": "0.25em",
					color: "#333",
					"text-decoration": "none"
				},
				events: {
					click: c
				}
			}).inject("textbtnstatus")));
	var e = makeTopicSettings(!0);
	if ($("topicsettingscontainer") && $("topicsettingscontainer").grab(e),
		collegeJustEnabled && !function () {
			var a = new Element("div", {
				styles: {
					width: "90%",
					"border-radius": "0.5em",
					"text-align": "center",
					padding: "0.5em",
					"margin-top": "1em",
					"margin-left": "auto",
					"margin-right": "auto"
				}
			});
			collegeAndAuth ? (a.setStyle("background", "#FF9"),
				a.set("html", "Congrats! You enabled Omegle's new dorm mode. Start a new text or video chat, and you will be matched with other college students.<br><br>If you ever want to disable this, just uncheck the associated checkbox (above).")) : (a.setStyle("background", "red"),
					a.set("text", "Sorry! It looks like you tried to enable dorm mode, but there was a technical error. Please make sure you have cookies enabled and try again.")),
				$("intro") && $("intro").grab(a),
				$("chattypes").scrollIntoView(!1)
		}(),
		!IS_MOBILE) {
		$("videobtn").removeEvents("click");
		var f = new Elements([new Element("a", {
			id: "videobtnunmoderated",
			text: "Unmoderated section",
			href: "javascript:",
			styles: {
				"border-radius": "0.5em",
				"-moz-border-radius": "0.5em",
				"-webkit-border-radius": "0.5em",
				background: "#EEE",
				"font-weight": "normal",
				padding: "0.333em 0",
				display: "block",
				"margin-left": "3px",
				"margin-right": "3px",
				"margin-top": "0.25em",
				color: "#333",
				"text-decoration": "none"
			}
		}).inject("videobtnstatus")]);
		$("unmonitoredvideobtn") && f.push(new Element("a", {
			id: "unmonitoredvideobtn",
			text: $("unmonitoredvideobtn").get("text"),
			href: "javascript:"
		}).replaces("unmonitoredvideobtn")),
			f.addEvent("click", function (a) {
				a.preventDefault(),
					startFirstChat(!0, void 0, void 0, void 0, !0)
			}),
			shouldForceUnmonitored && $("videobtnstatus").set("html", "&nbsp;"),
			testRTCSupport() ? $("videobtn").addEvent("click", function () {
				startFirstChat(!0)
			}) : ($("videobtn").set("src", $("videobtn").get("src").replace("-enabled", "-disabled")),
				$("videobtnstatus").empty(),
				$("videobtnstatus").appendText("Please upgrade to the latest Firefox or Chrome."))
	}
}
function googleTranslateElementFullyLoaded() {
	if ("undefined" != typeof googTr && googTr.$ && googTr.R && "string" == typeof googTr.$ && "string" == typeof googTr.R && ("en" !== googTr.$.substr(0, 2).toLowerCase() || "en" !== googTr.R.substr(0, 2).toLowerCase()) && $("google_translate_wrapper") && $("google_translate_lower_container") && $("google_translate_lower_container").grab) {
		$("google_translate_lower_container").grab($("google_translate_wrapper")),
			$("google_translate_lower_container").grab(new Element("br"));
		var a = "English";
		googTr.B && "string" == typeof googTr.B.en && (a = googTr.B.en),
			$("google_translate_lower_container").appendText('(Select "' + a + '" to chat in English)')
	}
}
function onLoad() {
	IS_MOBILE && setTimeout(function () {
		window.scrollTo(0, 1)
	}, 0),
		IS_MOBILE || startSpinner()
}
function makeTopicSettings(a) {
	function b(a) {
		var b = new Element("span", {
			"class": "topictag"
		})
			, c = new Element("span", {
				"class": "topictagtext",
				text: a
			});
		b.grab(c);
		var d = new Element("span", {
			"class": "topictagdelete",
			html: "&times;"
		});
		d.addEvent("click", function () {
			b.destroy(),
				topicManager.remove(a),
				e()
		}),
			b.grab(d),
			j.grab(b);
		var f = new Element("span");
		f.setStyle("font-size", 0),
			f.appendText(" "),
			j.grab(f)
	}
	function c() {
		e(),
			setTimeout(e, 0)
	}
	function d() {
		var a = l.get("value");
		l.set("value", ""),
			a = a.split(","),
			a = a.map(function (a) {
				return a.trim()
			});
		for (var c = 0; c < a.length; c++) {
			var d = a[c];
			topicManager.add(d) && (b(d),
				setShouldUseLikes(!0),
				z.set("checked", !0))
		}
		IS_MOBILE && l.blur(),
			e()
	}
	function e() {
		l.value || topicManager.list().length ? k.setStyle("display", "none") : a && !IS_MOBILE ? k.setStyle("display", "block") : k.setStyle("display", "inline"),
			w.checked || topicManager.list().length ? x.setStyle("display", "block") : x.setStyle("display", "none")
	}
	function f(a) {
		Cookie.write("fblikes", a ? "1" : "0", {
			duration: 365,
			domain: document.domain,
			path: "/"
		})
	}
	function g() {
		u.setStyle("display", "block"),
			shouldUseFbLikes && (w.set("checked", !0),
				e()),
			"0" !== Cookie.read("fblikes") && FB.getLoginStatus(function (a) {
				a.authResponse ? (w.set("checked", !0),
					f(!0),
					shouldUseFbLikes = !0) : f(!1),
					e()
			})
	}
	var h = new Element("div", {
		"class": "topictageditor"
	});
	if (a && !IS_MOBILE) {
		h.setStyles({
			padding: "4px",
			"min-height": "40px",
			"border-radius": "4px",
			position: "relative"
		});
		try {
			h.setStyle("background", "-moz-linear-gradient(0deg, #F7F7F7, #FFF)"),
				h.setStyle("background", "-webkit-linear-gradient(0deg, #F7F7F7, #FFF)"),
				h.setStyle("background", "linear-gradient(0deg, #F7F7F7, #FFF)")
		} catch (i) { }
		h.setStyle("border-radius", "3px / 5px")
	}
	var j = new Element("span", {
		"class": "topictagwrapper"
	});
	h.grab(j),
		$each(topicManager.list(), b);
	var k = new Element("span", {
		"class": "topicplaceholder"
	});
	IS_MOBILE ? k.appendText("Add your interests (optional)") : (k.appendText("What do you wanna talk about? (Type your interests here.)"),
		a && (k.empty(),
			k.appendText("Add your interests (optional)"),
			k.setStyles({
				"line-height": "48px",
				"text-align": "center",
				"vertical-align": "middle",
				"font-family": "'Lucida Grande', Lucida, sans-serif",
				"font-size": "21px",
				position: "absolute",
				top: 0,
				left: 0,
				right: 0,
				bottom: 0
			}))),
		h.grab(k);
	var l = new Element("input", {
		type: "text",
		"class": "newtopicinput"
	});
	l.addEvent("keydown", c),
		l.addEvent("keypress", c),
		l.addEvent("keyup", c),
		l.addEvent("keydown", function (a) {
			32 !== a.code || l.get("value") || a.preventDefault(),
				(13 === a.code || 188 === a.code) && (a.preventDefault(),
					d())
		}),
		l.addEvent("blur", d),
		h.grab(l),
		h.addClass("needsclick"),
		h.addEvent("click", function () {
			l.focus()
		});
	var m = new Element("div", {
		styles: {
			"text-align": "left"
		}
	});
	m.grab(h);
	var n = new Element("div")
		, o = new Element("a", {
			"class": "needsclick",
			text: "Add my Tumblr tags as topics",
			href: "javascript:",
			events: {
				click: function (a) {
					a.preventDefault(),
						o.dispose(),
						n.grab(p),
						r.focus()
				}
			},
			styles: {
				"margin-left": "1.5em"
			}
		});
	n.grab(o);
	var p = new Element("form", {
		styles: {
			margin: 0,
			padding: 0
		},
		events: {
			submit: function (a) {
				if (a.preventDefault(),
					!r.get("disabled")) {
					var c = r.get("value");
					c && (r.set("value", ""),
						r.set("disabled", !0),
						s.set("disabled", !0),
						loadTumblrTags(c, function (a) {
							if (r.set("disabled", !1),
								s.set("disabled", !1),
								a.success) {
								for (var c = processTumblrTags(a.tags), d = 0; d < c.length; d++) {
									var f = c[d];
									topicManager.add(f) && (b(f),
										setShouldUseLikes(!0),
										z.set("checked", !0))
								}
								e(),
									t.empty(),
									p.dispose(),
									n.grab(o),
									"undefined" != typeof _gaq && _gaq.push(["_trackEvent", "Tumblr tags", "Tags added"])
							} else
								t.empty(),
									t.setStyle("color", "red"),
									t.appendText(a.error)
						}))
				}
			}
		}
	})
		, q = new Element("label");
	q.appendText("Tumblr name: ");
	var r = new Element("input", {
		type: "text"
	});
	q.grab(r),
		p.grab(q),
		p.appendText(" ");
	var s = new Element("input", {
		type: "submit",
		value: "Go"
	});
	p.grab(s);
	var t = new Element("div");
	t.setStyle("font-size", "0.9em"),
		t.setStyle("max-width", "20em"),
		t.appendText("Omegle will try to learn your interests from posts and likes you've made public on Tumblr. Omegle is NOT requesting special access to your Tumblr account, and will NOT save your username, or give it to anyone."),
		p.grab(t);
	var u = new Element("div");
	u.setStyle("display", "none");
	var v = new Element("label")
		, w = new Element("input", {
			type: "checkbox"
		});
	w.addEvent("click", function (a) {
		w.checked ? (a.preventDefault(),
			FB.login(function (a) {
				a.authResponse && (shouldUseFbLikes = !0,
					f(!0),
					w.set("checked", !0),
					setShouldUseLikes(!0),
					z.set("checked", !0),
					e())
			}, {
				scope: "user_likes"
			})) : (shouldUseFbLikes = !1,
				f(!1)),
			setTimeout(e, 0)
	}),
		v.grab(w),
		v.appendText(" Add my Facebook likes as topics"),
		u.grab(v);
	var x = new Element("div")
		, y = makeShouldUseLikesCheckbox()
		, z = y.getElement("input");
	if (x.grab(y),
		m.grab(x),
		e(),
		initOfFbComplete ? g() : initOfFbCallbacks.push(g),
		collegeAndAuth) {
		var A = makeCollegeCheckboxes(new Element("a", {
			href: "javascript:",
			text: "(Delete)",
			styles: {
				"font-weight": "normal"
			},
			events: {
				click: function (b) {
					b.preventDefault(),
						confirm('Are you sure you want to remove your college affiliation?\n\nIf you just want to quit dorm chat and chat with completely random strangers, you can uncheck the "find strangers from my college" box.') && (clearCollegeSetting(),
							makeCollegeEmailForm(a).replaces(A))
				}
			}
		}));
		m.grab(A)
	} else
		m.grab(makeCollegeEmailForm(a));
	return m
}
function killHeaders(a) {
	return delete a.headers["X-Requested-With"],
		delete a.headers["X-Request"],
		a
}
function makeSpyOptionsForm(a, b, c) {
	function d() {
		a(!1, h.value, !1, k.checked)
	}
	void 0 === b && (b = ""),
		void 0 === c && (c = !0);
	var e = new Element("form");
	e.addEvent("submit", function (a) {
		a.preventDefault(),
			d()
	});
	var f = new Element("div")
		, g = new Element("label");
	g.grab(new Element("strong", {
		text: "Enter a question:"
	})),
		g.grab(new Element("br"));
	var h = new Element("input", {
		"class": "questionInput",
		value: b,
		maxlength: 200
	});
	g.grab(h),
		f.grab(g),
		e.grab(f);
	var i = new Element("div");
	i.setStyle("marginTop", "0.5em");
	var j = new Element("label")
		, k = new Element("input", {
			type: "checkbox",
			checked: c
		});
	return j.grab(k),
		j.appendText(" I want Omegle to reuse this question if it's good enough."),
		i.grab(j),
		e.grab(i),
	{
		form: e,
		focus: function () {
			h.focus()
		},
		go: d
	}
}
function isFlashing() {
	return null !== flashingInterval
}
function startFlashing() {
	function a() {
		var a = b.pop();
		document.title = a[0],
			setFavicon(a[1]),
			b.unshift(a)
	}
	if (!IS_MOBILE && !isFlashing()) {
		var b = [["___Omegle___", "/static/favicon.png"], ["¯¯¯Omegle¯¯¯", "/static/altfavicon.png"]];
		flashingInterval = setInterval(a, 500),
			a(),
			$(document).addEvent("mousemove", mouseMove),
			$(document).addEvent("keydown", stopFlashing),
			$(document).addEvent("focus", stopFlashing),
			$(window).addEvent("mousemove", mouseMove),
			$(window).addEvent("keydown", stopFlashing),
			$(window).addEvent("focus", stopFlashing)
	}
}
function mouseMove(a) {
	var b = a.page;
	null === lastCoords || b.x == lastCoords.x && b.y == lastCoords.y || stopFlashing(),
		lastCoords = b
}
function stopFlashing() {
	isFlashing() && (clearInterval(flashingInterval),
		flashingInterval = null,
		document.title = "Omegle",
		setFavicon("/static/favicon.png"),
		$(document).removeEvent("mousemove", mouseMove),
		$(document).removeEvent("keydown", stopFlashing),
		$(document).removeEvent("focus", stopFlashing),
		$(window).removeEvent("mousemove", mouseMove),
		$(window).removeEvent("keydown", stopFlashing),
		$(window).removeEvent("focus", stopFlashing))
}
function setFavicon(a) {
	for (var b = $$("link"), c = 0; c < b.length; c++)
		if ("icon" === b[c].rel)
			return void (b[c].href = a);
	var d = new Element("link", {
		rel: "icon",
		type: "image/png",
		href: a
	});
	$$("head")[0].grab(d)
}
function initSpinner(a) {
	function b(a, b, i) {
		k.clearRect(0, 0, g, h),
			d.width = d.width,
			k.drawImage(c, f, 0, e - f, f, 2 * f, f, e - f, f);
		var j = a / b;
		if (.75 > j)
			var l = 17 / 8 * Math.PI * Math.sin(j / .75 * (Math.PI / 2));
		else
			var l = Math.PI / 8 - Math.PI / 8 * (j - .75) / .25;
		i && (l = -l),
			k.save(),
			k.translate(1.6 * f, 1.6 * f),
			k.rotate(l),
			k.drawImage(c, 0, 0, f, f, .6 * -f, .6 * -f, f, f),
			k.restore()
	}
	if (window.CanvasRenderingContext2D) {
		var c = $$("#logo > img")[0];
		if (c && c.height) {
			$("header").setStyles({
				height: "57px"
			});
			var d = new Element("canvas");
			d.setStyle("position", "absolute");
			var e = c.naturalWidth || c.width
				, f = c.naturalHeight || c.height
				, g = e + f
				, h = 3 * f
				, i = c.width + c.height
				, j = 3 * c.height;
			d.width = g,
				d.height = h,
				d.style.width = i + "px",
				d.style.height = j + "px",
				d.style.marginLeft = "-" + c.height + "px",
				d.style.marginTop = "-" + c.height + "px";
			var k = d.getContext("2d");
			if (spinnerPossible = !0,
				a)
				return !0;
			var l = !1;
			return startSpinner = function () {
				if (!l) {
					l = !0;
					var a = 500 + 400 * Math.random()
						, c = null;
					window.requestAnimFrame = function () {
						return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (a) {
							window.setTimeout(a, 1e3 / 60)
						}
					}();
					var d = Math.random() < .5;
					requestAnimFrame(function e(f) {
						f || (f = +new Date),
							c || (c = f);
						var g = f - c;
						g > a ? (l = !1,
							b(0, 1)) : (b(g, a, d),
								requestAnimFrame(e))
					})
				}
			}
				,
				initSpinner = function () { }
				,
				b(0, 1),
				c.setStyle("visibility", "hidden"),
				c.grab(d, "before"),
				!0
		}
	}
}
function startSpinner() {
	initSpinner() && startSpinner()
}
function startNewChat(a, b, c, d, e, f) {
	f && shouldForceUnmonitored && (e = !0),
		confirmTerms(e ? 2 : 1, function () {
			function f() {
				var a = document.activeElement;
				if (!a)
					return Da.get("disabled");
				var b = a.nodeName.toLowerCase();
				return "input" !== b && "textarea" !== b
			}
			function g(a) {
				27 === a.code && a.preventDefault();
				var b = new Date;
				(16 === a.code || 17 === a.code || 18 === a.code || 91 === a.code || 93 === a.code) && null !== Ia && 200 > b - Ia && b - ia >= 350 ? (M(),
					G()) : IS_MOBILE || Da.get("disabled") || a.control || a.meta || !(8 === a.code || 37 == a.code || 39 == a.code || a.code >= 46 && a.code <= 90 || a.code >= 96 && a.code <= 111) ? 8 === a.code && f() && a.preventDefault() : Da.focus()
			}
			function h(a) {
				if (27 === a.code) {
					if (a.preventDefault(),
						za.get("disabled"))
						return;
					ib && new Date - ia >= 500 && (a.shift || a.alt || a.meta) ? (M(),
						G()) : (O(),
							Ia = new Date)
				}
				8 === a.code && f() && a.preventDefault()
			}
			function i() {
				var a = new Date;
				if (50 > a - Ka)
					return void (La || (La = setTimeout(i, 50 - (a - Ka))));
				La = null,
					Ka = a;
				var b = $$(".msggroup");
				if (!(b.length < 2)) {
					for (var c = $(document.body).getScroll(), d = $(document.body).getSize(), e = c.y + d.y / 2, f = null, g = null, h = 0; h < b.length; h++) {
						var j = b[h]
							, k = j.getCoordinates();
						if (!(k.bottom < c.y + bwLogo.height + 5 || k.width + bwLogo.width + 10 > d.x)) {
							var l = Math.abs(k.bottom - e);
							(null === f || f > l) && (f = l,
								g = j)
						}
					}
					g ? Ja && Ja.getParent() === g || (Ja && Ja.dispose(),
						Ja = new Element("div", {
							styles: {
								position: "absolute",
								bottom: 0
							}
						}),
						"right" == g.getComputedStyle("float") ? Ja.setStyle("left", "-" + (bwLogo.width + 10) + "px") : Ja.setStyle("right", "-" + (bwLogo.width + 10) + "px"),
						Ja.grab(bwLogo),
						g.grab(Ja)) : Ja && (Ja.dispose(),
							Ja = null)
				}
			}
			function j() {
				return IS_MOBILE ? ta.getCoordinates().bottom - window.innerHeight : scrollElt.scrollHeight - scrollElt.clientHeight
			}
			function k() {
				return scrollElt.getScrollTop() >= j() - 6
			}
			function l(a) {
				var b = IS_MOBILE && document.activeElement && $(Da) == $(document.activeElement);
				if (k() || (scrollElt.scrollTo ? scrollElt.scrollTo(scrollElt.scrollLeft, j()) : scrollElt.scrollTop = j()),
					b && $(Da) != $(document.activeElement) && Da.focus(),
					IS_MOBILE && i(),
					a || void 0 === a)
					for (var c = 50; 500 >= c; c += 150)
						setTimeout(function () {
							l(!1)
						}, c)
			}
			function m(a, b) {
				var c = new Element("form");
				c.setStyle("display", "none"),
					c.set("method", "post"),
					c.set("target", "_blank"),
					c.set("action", "http://logs.omegle.com/generate"),
					c.set(b),
					a = a || {
						host: 1
					};
				var d = {
					log: JSON.encode(Na),
					randid: randID
				};
				lb && (d.topics = JSON.encode(lb)),
					mb && (d.identdigests = mb),
					d = $extend(d, a),
					$each(d, function (a, b) {
						var d = new Element("input", {
							type: "hidden",
							name: b,
							value: a
						});
						c.grab(d)
					}),
					$(document.body).grab(c),
					c.submit(),
					setTimeout(function () {
						c.dispose()
					}, 0)
			}
			function n() {
				var a = 550
					, b = 420
					, c = screen.height
					, d = screen.width
					, e = Math.round(d / 2 - a / 2)
					, f = 0;
				c > b && (f = Math.round(c / 2 - b / 2));
				var g = "scrollbars=yes,resizable=yes,toolbar=no,location=yes,width=" + a + ",height=" + b + ",left=" + e + ",top=" + f;
				window.open("", "intent", g),
					m({
						tweet: 1
					}, {
						target: "intent"
					})
			}
			function o(a) {
				if (a) {
					for (var b = 0, c = 0, d = 0; d < a.length; d++)
						a[d].percentage ? c += a[d].percentage : b++;
					if (b)
						for (var d = 0; d < a.length; d++)
							a[d].percentage || (a[d].percentage = (100 - c) / (b + 1))
				}
			}
			function p(a, b) {
				if (!a)
					return b;
				for (var c = 100 * Math.random(), d = 0; d < a.length; d++) {
					var e = a[d];
					if (c < e.percentage)
						return $merge(b, e);
					c -= e.percentage
				}
				return b
			}
			function q(a) {
				if (o(a.tests),
					o(a.variants),
					a.tests)
					for (var b = 0; b < a.tests.length; b++)
						o(a.tests[b].variants)
			}
			function r(a) {
				IS_MOBILE && a.noMobile || (null === currentAffiliate || currentAffiliate.priority < a.priority) && (currentAffiliate = p(a.tests, a))
			}
			function s(a) {
				var b = k()
					, c = a();
				return b && l(),
					c
			}
			function t(a, b) {
				return s(function () {
					var c = new Element("div", {
						"class": "logitem"
					});
					return c.grab(a),
						0 === Ya.length || b ? ra.grab(c) : c.inject(Ya[0].element, "before"),
						c
				})
			}
			function u(a, b) {
				var c, d;
				void 0 === b || b && "string" != typeof b ? (c = !0,
					d = null) : "string" == typeof b ? (c = !0,
						d = b) : c = !1,
					"string" == typeof a && null === d && (d = a),
					c && !Oa && null !== d && Na.push([d])
			}
			function v(a, b, c, d) {
				if ((void 0 === b || b) && startFlashing(),
					"string" == typeof a) {
					var e = new Element("p", {
						"class": "statuslog"
					});
					e.appendText(a)
				} else {
					var e = new Element("div", {
						"class": "statuslog"
					});
					e.grab(a)
				}
				return u(a, d),
					t(e, c)
			}
			function w(a) {
				"undefined" != typeof Recaptcha && Recaptcha.destroy(),
					null !== Za && Za.dispose(),
					Za = t(a),
					initialLogIsRecaptcha = !1,
					Va = !1
			}
			function x(a, b) {
				return "undefined" != typeof Recaptcha && Recaptcha.destroy(),
					Va && "string" == typeof a ? ($(Za.firstChild).empty(),
						$(Za.firstChild).appendText(a),
						void u(a, b)) : (null !== Za && Za.dispose(),
							Za = v(a, !1, !1, "undefined" == typeof b ? !1 : b),
							initialLogIsRecaptcha = !1,
							void (Va = "string" == typeof a))
			}
			function y(a) {
				var b = new Element("p", {
					"class": "strangermsg"
				})
					, c = new Element("strong", {
						"class": "msgsource"
					});
				c.appendText("Stranger: "),
					b.grab(c),
					b.appendText(" ");
				var d = new Element("span", {
					html: a
				});
				b.grab(d),
					t(b),
					Oa || Na.push(["Stranger:", d.get("text")])
			}
			function z(a, b, c) {
				var d = new Element("span");
				jb && d.addClass("notranslate");
				var e = !0;
				if ($each(c.split("\n"), function (a) {
					e || d.grab(new Element("br")),
						e = !1,
						d.appendText(a)
				}),
					IS_MOBILE) {
					var f = new Element("div", {
						"class": "msggroup-msg"
					});
					if (f.grab(d),
						Xa === a)
						s(function () {
							Wa.grab(f)
						});
					else {
						var g = new Element("div", {
							"class": "msggroup " + b + "group"
						})
							, h = (new Element("div", {
								"class": "msggroup-label",
								text: a + ":"
							}),
								new Element("div", {
									"class": "msggroup-msgs"
								}));
						h.grab(f),
							g.grab(h),
							t(g),
							Wa = h,
							Xa = a
					}
				} else {
					var i = new Element("p", {
						"class": b
					})
						, j = new Element("strong", {
							"class": "msgsource"
						});
					j.appendText(a + ":"),
						i.grab(j),
						i.appendText(" "),
						i.grab(d),
						t(i)
				}
				Oa || Na.push([a + ":", c])
			}
			function A(a, b) {
				if ("you" == a) {
					var c = "youmsg"
						, d = "You";
					ka = !0
				} else {
					var c = "strangermsg"
						, d = "Stranger";
					startFlashing(),
						la = !0
				}
				b = b.trim(),
					("stranger" !== a || -1 === b.toLowerCase().indexOf("videobam")) && (z(d, c, b),
						"stranger" !== a || -1 === b.indexOf("FBI") && -1 === b.toLowerCase().indexOf("federal bureau") || v("If the above message says you have been reported to the FBI, it is not legitimate. Please ignore it."),
						"stranger" === a && -1 !== b.toLowerCase().indexOf("facebook.com/profile.php?") && -1 === b.toLowerCase().indexOf("id=") && v("THE STRANGER DOES NOT KNOW YOUR FACEBOOK INFO. The above link directs anyone to their own profile; it is not really a link to your profile specifically."))
			}
			function B(a) {
				for (var b = 0; b < Ya.length; b++)
					if (!a || Ya[b].name === a) {
						Ya[b].element.dispose(),
							Ya.splice(b, 1);
						break
					}
			}
			function C() {
				B("Stranger")
			}
			function D(a) {
				B(a);
				var b = v(a + " is typing...", !1, !0, !1);
				Ya.push({
					name: a,
					element: b
				})
			}
			function E() {
				D("Stranger")
			}
			function F() {
				_a = !0,
					($("logo") || logoElt) && ($("logo") || logoElt).removeEvent("click", H),
					null !== ab && (clearInterval(ab),
						ab = null),
					Ha && ($(window).removeEvent("resize", Ha),
						$(window).removeEvent("orientationchange", Ha)),
					IS_MOBILE ? ($(document.body).removeEvent("scroll", i),
						$(document).removeEvent("scroll", i)) : ($(document).removeEvent("keydown", g),
							$(document).removeEvent("keyup", h)),
					ma.dispose()
			}
			function G(f, g, h, i, j) {
				if (!_a) {
					if (void 0 === f) {
						if (null !== bb)
							return void bb.go();
						f = a
					}
					f && (g = null,
						h = !1,
						i = !1),
						void 0 === g && (g = b),
						void 0 === h && (h = c),
						void 0 === i && (i = d),
						void 0 === j && (j = e),
						confirmTerms(j ? 2 : 1, function () {
							a && !f && ga(),
								F(),
								startNewChat(f, g, h, i, j)
						})
				}
			}
			function H() {
				if (!Ma.stopped && !db) {
					if (!confirm("Are you sure you want to end your chat?"))
						return;
					M()
				}
				a && ga(),
					$(document.body).removeClass("inconversation"),
					$(document.body).removeClass("videochat"),
					$("logo").setStyle("cursor", "default"),
					F(),
					showIntro()
			}
			function I() {
				if (!IS_MOBILE) {
					if (null === unmonSexyButton) {
						unmonSexyButton = new Element("img", {
							width: 124,
							height: 50,
							alt: "Sexy",
							styles: {
								cursor: "pointer",
								"vertical-align": "middle",
								"margin-right": "0.5em"
							}
						});
						var b = "/static/sexbtn";
						unmonSexyTrack = "",
							window.devicePixelRatio && window.devicePixelRatio > 1 ? unmonSexyButton.set("src", b + "@2x.png?xx") : unmonSexyButton.set("src", b + ".png?xx")
					}
					if (unmonSexyButton.addEvent("click", function () {
						null !== cb && cb();
						var b = "unmon-upper-" + (shouldForceUnmonitored ? "" : "not") + "forced-";
						b += a ? "video" : "text",
							confirmAdultSite() && window.open("http://wawadmin.omegle.com/redir/" + (IS_MOBILE ? "mob" : "y") + "?track=" + b + unmonSexyTrack)
					}),
						null === unmonGayButton) {
						unmonGayButton = new Element("img", {
							width: 124,
							height: 50,
							alt: "Gay",
							styles: {
								cursor: "pointer",
								"vertical-align": "middle"
							}
						});
						var c = "/static/gaybtnorange";
						unmonGayTrack = "",
							window.devicePixelRatio && window.devicePixelRatio > 1 ? unmonGayButton.set("src", c + "@2x.png") : unmonGayButton.set("src", c + ".png")
					}
					unmonGayButton.addEvent("click", function () {
						null !== cb && cb();
						var b = "unmon-upper-" + (shouldForceUnmonitored ? "" : "not") + "forced-";
						b += a ? "video" : "text",
							confirmAdultSite() && window.open("http://wawadmin.omegle.com/redir/gay?track=" + b + unmonGayTrack)
					});
					var d = new Element("div");
					d.grab(unmonSexyButton),
						IS_MOBILE || d.grab(unmonGayButton);
					var f = new Element("span", {
						html: "&times;",
						styles: {
							"font-weight": "bold",
							color: "#555",
							"font-size": "1.5em",
							cursor: "pointer"
						},
						events: {
							click: function () {
								g.dispose(),
									chatPervTrack = [],
									ob.dispose(),
									pb.dispose()
							}
						}
					});
					e || (d.appendText(" "),
						d.grab(f));
					var g = t(d, !1)
				}
			}
			function J(f) {
				function g(b) {
					switch (b) {
						case "text":
							G(!1, null, !1, !1, !1);
							break;
						case "video":
							G(!0);
							break;
						case "moderated section":
							G(a, null, !1, !1, !1);
							break;
						case "unmoderated section":
							null !== cb && cb(),
								G(a, null, !1, !1, !0)
					}
				}
				function h(a) {
					if ("video" !== a || !IS_MOBILE && testRTCSupport()) {
						if (y)
							if (y = !1,
								"video" === a)
								var b = "turn on " + a;
							else
								var b = "switch to " + a;
						else
							var b = a;
						x.appendText(" or "),
							x.grab(new Element("a", {
								href: "javascript:",
								text: b,
								events: {
									click: function (b) {
										b.preventDefault(),
											g(a)
									}
								}
							}))
					}
				}
				function i() {
					setShouldUseEnglish(F.checked ? !0 : !1)
				}
				function j() {
					IS_MOBILE && navigator.language && "EN" !== navigator.language.substr(0, 2).toUpperCase() && !J.get("checked") ? A.setStyle("display", "block") : A.setStyle("display", "none")
				}
				function k(a) {
					aurrp = a,
						Cookie.write("aurrp", a ? "1" : "0", {
							duration: 365,
							domain: document.domain,
							path: "/"
						})
				}
				function o() {
					function a() {
						if (l.empty(),
							e)
							f || (f = !0,
								i.set("text", "Not automatically rerolling."),
								j.dispose(),
								h.grab(m),
								P("new"));
						else {
							var a = "Automatically rerolling in a moment";
							g && l.set("text", " (Paused while you move your mouse)"),
								i.set("text", a),
								P("new", g ? void 0 : d)
						}
					}
					function b() {
						_a || (d--,
							1 > d ? (clearInterval(ab),
								ab = null,
								G()) : a())
					}
					function c() {
						return e || _a ? void $(document.body).removeEvent("mousemove", c) : (ab && (clearInterval(ab),
							ab = null),
							p && (clearTimeout(p),
								p = null),
							g = !0,
							a(),
							void (p = setTimeout(function () {
								p = null,
									g = !1,
									a(),
									ab || e || _a || (ab = setInterval(b, 1e3))
							}, 200)))
					}
					var d = 1
						, e = !Z || cb()
						, f = !1
						, g = !1
						, h = new Element("div", {
							styles: {
								"vertical-align": "middle"
							}
						})
						, i = new Element("span");
					h.grab(i),
						h.appendText(" ");
					var j = new Element("input");
					j.set("type", "button"),
						j.set("value", "Stop"),
						cb = function () {
							e || (null !== ab && (clearInterval(ab),
								ab = null),
								e = !0,
								$(document.body).removeEvent("mousemove", c),
								a())
						}
						,
						j.addEvent("click", function () {
							cb()
						}),
						h.grab(j);
					var l = new Element("span");
					h.grab(l);
					var m = new Element("label");
					m.setStyle("color", "black"),
						m.setStyle("font-weight", "normal");
					var n = new Element("input");
					n.set("type", "checkbox"),
						n.set("checked", Z),
						n.addEvent("change", function () {
							k(n.checked)
						}),
						m.grab(n),
						m.appendText(" Auto-reroll next time"),
						a(),
						v(h, !1, !1);
					var o = h.getSize().y + "px";
					if (h.setStyle("height", o),
						h.setStyle("line-height", o),
						!e) {
						ab = setInterval(b, 500);
						var p = null;
						$(document.body).addEvent("mousemove", c)
					}
				}
				function q() {
					var a;
					a = e ? Qa : currentAffiliate,
						a && r(a)
				}
				function r(b) {
					b = p(b.variants, b),
						a && b.videoMode ? b = $merge(b, b.videoMode) : !a && b.textMode && (b = $merge(b, b.textMode));
					var c = a ? "video" : "text";
					b.trackCode && (c = b.trackCode),
						b.baseTrackCode && (c = b.baseTrackCode + "-" + c);
					var d, e = new Element("span"), f = b.url.replace(/\$/g, c), g = new Element("a", {
						href: f,
						target: "_blank",
						events: {
							click: function (a) {
								null !== cb && cb()
							}
						}
					});
					if (g.setStyles({
						"text-decoration": "none"
					}),
						b.image) {
						var h = new Element("img", {
							src: b.image,
							alt: ""
						});
						h.setStyles({
							border: "0 none",
							"vertical-align": "middle"
						}),
							g.grab(h),
							g.appendText(" ")
					}
					if (b.text) {
						var i = new Element("span");
						i.setStyles({
							color: "black",
							"text-decoration": "none",
							"font-weight": "normal",
							background: "#EEE",
							padding: "0.25em 0.5em",
							"vertical-align": "middle",
							"border-radius": "0.5em",
							"-moz-border-radius": "0.5em",
							"-webkit-border-radius": " 0.5em",
							border: "1px solid #CCC"
						}),
							i.style.lineHeight = "1.5",
							b.style && i.setStyles(b.style),
							i.set("text", b.text),
							g.grab(i)
					}
					e.grab(g);
					var j = new Element("span");
					j.set("html", "&times;"),
						j.setStyles({
							cursor: "default",
							color: "black",
							"font-weight": "bold"
						}),
						j.addEvent("click", function () {
							currentAffiliate = null,
								d.destroy()
						}),
						b.noCloseButton || (e.appendText(" "),
							e.grab(j));
					var k = new Element("div");
					return k.setStyle("cursor", "pointer"),
						k.addEvent("click", function (a) {
							var b = $(a.target);
							g.hasChild(b) || g === b || j === b || j.hasChild(b) || window.open(f, "_blank")
						}),
						k.grab(e),
						d = t(k),
						(b.bottomPositioning || void 0 === b.bottomPositioning) && (d.setStyle("height", k.getSize().y + "px"),
							k.setStyles({
								position: "absolute",
								bottom: "0.5em"
							})),
						!0
				}
				if (!db) {
					db = !0,
						chatOddEven = !chatOddEven,
						Q(),
						newChatButton.removeEvents(),
						null !== unmonSexyButton && unmonSexyButton.removeEvents(),
						null !== unmonGayButton && unmonGayButton.removeEvents(),
						B(),
						Oa = !0,
						initialLogIsRecaptcha && ("undefined" != typeof Recaptcha && Recaptcha.destroy(),
							Za.dispose(),
							Za = null,
							initialLogIsRecaptcha = !1),
						eb && (eb.destroy(),
							eb = null);
					for (var s = 0; s < $a.length; s++)
						$a[s].dispose();
					if (mots = [],
						a) {
						try {
							Ub.close(),
								delete Ub.ontrack,
								delete Ub.onicecandidate
						} catch (u) { }
						Ub = null,
							sb && (sb.srcObject = null),
							_()
					}
					Bb && (clearTimeout(Bb),
						Bb = null),
						a || IS_MOBILE || setTimeout(l, 300),
						$(document.body).removeClass("inconversation"),
						Da.set("disabled", !0),
						Da.addClass("disabled"),
						Ga.set("disabled", !0),
						Da.blur(),
						Ga.blur(),
						P("new"),
						window.onbeforeunload = null,
						$(window).removeEvent("unload", M),
						stopped = !0;
					var w = (ra.get("html"),
						null);
					document.createRange && (window.getSelection || document.getSelection) && (w = document.createRange(),
						w.selectNodeContents(ra)),
						ja && (bb = makeSpyOptionsForm(G, b, d),
							t(bb.form),
							IS_MOBILE || bb.focus());
					var x = new Element("div", {
						"class": "newchatbtnwrapper"
					});
					newChatButton.addEvent("click", function () {
						G()
					}),
						x.grab(newChatButton);
					var y = !0;
					if (c || b ? (h("text"),
						h("video")) : a ? (h("text"),
							e || h("unmoderated section")) : h("video"),
						IS_MOBILE && y || v(x, !1, !1),
						qb && I(),
						!c && !b) {
						var z = new Element("div", {
							"class": "logtopicsettings"
						})
							, A = new Element("form", {
								styles: {
									margin: 0,
									padding: 0
								}
							})
							, C = new Element("label")
							, D = new Element("input", {
								type: "radio",
								name: "language",
								value: "mylang",
								checked: !shouldUseEnglish
							});
						D.addEvent("click", i),
							C.grab(D),
							C.appendText(" My language"),
							A.grab(C),
							A.appendText(" ");
						var E = new Element("label")
							, F = new Element("input", {
								type: "radio",
								name: "language",
								value: "english",
								checked: shouldUseEnglish
							});
						F.addEvent("click", i),
							E.grab(F),
							E.appendText(" English"),
							A.grab(E),
							A.setStyle("display", "none"),
							z.grab(A);
						var H = makeShouldUseLikesCheckbox()
							, J = H.getElement(".shoulduselikescheckbox");
						J.addEvent("click", j),
							j(),
							z.grab(H);
						var K = new Element("a", {
							href: "javascript:",
							text: "(Settings)"
						});
						if (shouldUseFbLikes || topicManager.list().length || (J.set("checked", !1),
							J.set("disabled", !0),
							K.set("text", "(Enable)")),
							K.addEvent("click", function (a) {
								a.preventDefault(),
									null !== cb && cb(),
									A.dispose(),
									z.empty();
								var b = makeTopicSettings();
								z.grab(A),
									z.grab(b),
									b.getElement("input").focus(),
									J = b.getElement(".shoulduselikescheckbox"),
									J.addEvent("click", j),
									L && L.dispose()
							}),
							z.appendText(" "),
							z.grab(K),
							collegeAndAuth) {
							var L = makeCollegeCheckboxes(!1);
							z.grab(L)
						} else
							var L = null;
						t(z)
					}
					var N = new Element("div", {
						"class": "logsavelinks"
					})
						, O = new Element("span", {
							"class": "conversationgreat"
						});
					IS_MOBILE ? O.set("text", "Great chat? Save the log!") : O.set("text", "Great chat?"),
						O.addEvent("click", function () {
							m()
						}),
						N.grab(O);
					var R = []
						, S = new Element("a");
					if (S.set("text", "Get a link"),
						S.set("href", "javascript:"),
						S.addEvent("click", function (a) {
							a.preventDefault(),
								m()
						}),
						R.push(S),
						null !== w && !IS_MOBILE) {
						var T = new Element("a", {
							href: "javascript:",
							text: "Select all"
						});
						T.addEvent("click", function (a) {
							a.preventDefault();
							var b = window.getSelection ? window.getSelection() : document.getSelection();
							b.removeAllRanges(),
								b.addRange(w)
						}),
							R.push(T)
					}
					var U = []
						, V = new Element("a", {
							href: "javascript:",
							text: "Facebook"
						});
					V.addEvent("click", function (a) {
						a.preventDefault(),
							m({
								facebook: 1
							})
					}),
						U.push(V);
					var W = new Element("a", {
						href: "javascript:",
						text: "Tumblr"
					});
					W.addEvent("click", function (a) {
						a.preventDefault(),
							m({
								tumblr: 1
							})
					}),
						U.push(W);
					var X = new Element("a", {
						href: "javascript:",
						text: "Twitter"
					});
					X.addEvent("click", function (a) {
						a.preventDefault(),
							n()
					}),
						U.push(X);
					var Y = new Element("a", {
						href: "javascript:",
						text: "reddit"
					});
					Y.addEvent("click", function (a) {
						a.preventDefault(),
							m({
								reddit: 1
							})
					}),
						U.push(Y),
						IS_MOBILE || (N.appendText(" Save the log: "),
							N.grab(middotify(R)),
							N.appendText(" • Or post log to: "),
							N.grab(middotify(U)));
					var Z = aurrp;
					if (ja || ka && la ? v(N, !1, !1) : !a || f || IS_MOBILE || o(),
						c && !ka && v("Please try to discuss the question, not just disconnect!"),
						q(),
						mobileAdWrapper) {
						var aa = new Element("div", {
							styles: {
								width: mobileAdWrapperSize.x + "px",
								height: mobileAdWrapperSize.y + "px"
							}
						});
						v(aa),
							Ha = function () {
								mobileAdWrapper.setStyles({
									display: "block",
									position: "absolute"
								}),
									mobileAdWrapper.setPosition(aa.getPosition())
							}
							,
							Ha(),
							$(window).addEvent("resize", Ha)
					}
				}
			}
			function K(a) {
				function b() {
					var b = new Element("div");
					w(b),
						IS_MOBILE || Za.setStyles({
							position: "absolute",
							bottom: "0"
						}),
						initialLogIsRecaptcha = !0,
						grecaptcha.render(b, {
							sitekey: a,
							callback: function (a) {
								x("Verifying..."),
									Ma.submitRecaptcha(a)
							},
							size: window.xrecaptchasize
						})
				}
				window.grecaptcha && grecaptcha.render ? b() : window.recaptchaOnLoad = b
			}
			function L(a) {
				K(a),
					"undefined" != typeof _gaq && _gaq.push(["_trackEvent", "CAPTCHA", "CAPTCHA shown"])
			}
			function M() {
				Ma.stopped || db || (Ma.disconnect(),
					v("You have disconnected.", !1),
					J())
			}
			function N() {
				var a = "Leaving this page will end your conversation.";
				return a
			}
			function O() {
				if (!za.get("disabled"))
					switch (nb) {
						case "disconnect":
							P("really"),
								Da.get("disabled") || IS_MOBILE || Da.focus();
							break;
						case "really":
							change("beforeManualDisconnect", Ma);
							M();
							change("disconnected");
							break;
						case "new":
							G()
					}
			}
			function P(a, b) {
				var c;
				switch (a) {
					case "disconnect":
						c = "Stop";
						break;
					case "really":
						c = "Really?";
						break;
					case "new":
						c = "New"
				}
				void 0 !== b && (c += "..."),
					za.set("text", c),
					za.grab(new Element("div", {
						"class": "btnkbshortcut",
						text: "Esc"
					})),
					nb = a,
					ya.removeClass("reallybtn"),
					"new" === a ? ya.addClass("newbtn") : "really" === a && ya.addClass("reallybtn")
			}
			function Q() { }
			function R() {
				if (qb)
					return !0;
				if (IS_MOBILE || !e)
					return !1;
				qb = !0,
					ob = new Element("td", {
						"class": "lowersexybtncell"
					});
				var b = new Element("div", {
					"class": "lowersexybtnwrapper"
				})
					, c = "unmon-lower-" + (shouldForceUnmonitored ? "" : "not") + "forced-";
				c += a ? "video" : "text";
				var d = new Element("button", {
					"class": "lowersexybtn",
					text: "Pervy Girls (Free, 18+)",
					events: {
						click: function (a) {
							a.preventDefault(),
								cb && cb(),
								confirmAdultSite() && window.open("http://wawadmin.omegle.com/redir/y?track=" + c)
						}
					}
				});
				b.grab(d),
					ob.grab(b),
					xa.grab(ob, "after"),
					pb = new Element("td", {
						"class": "lowergaybtncell"
					});
				var f = new Element("div", {
					"class": "lowergaybtnwrapper"
				})
					, g = new Element("button", {
						"class": "lowergaybtn",
						text: " gay cams  (free" + (e ? "" : ", 18+") + ")",
						events: {
							click: function (a) {
								a.preventDefault(),
									cb && cb(),
									confirmAdultSite() && window.open("http://wawadmin.omegle.com/redir/gay?track=" + c)
							}
						}
					});
				return f.grab(g),
					pb.grab(f),
					ob.grab(pb, "after"),
					"undefined" == typeof doUnmonSexyTest && (doUnmonSexyTest = Math.random() < .5),
					c += "-none-" + (doUnmonSexyTest ? "y" : "n"),
					Q = function () {
						var a = ["💋 *soft moan*", "adult cams (free)"];
						a[1] = "girl cams   (free)  ";
						for (var b = null; "string" != typeof a;)
							b = Math.floor(Math.random() * a.length),
								a = a[b];
						if (d.set("text", a),
							chatOddEven)
							var c = g
								, e = d;
						else
							var c = d
								, e = g;
						var f = "0 0 40px 10px #F0F inset";
						f = "",
							c.setStyles({
								"box-shadow": f,
								"-webkit-box-shadow": f,
								"-moz-box-shadow": f,
								background: "red",
								background: "#FF7F00"
							}),
							lastActiveUnmonSexy = c,
							e.setStyles({
								"box-shadow": "none",
								"-webkit-box-shadow": "none",
								"-moz-box-shadow": "none",
								"font-weight": "normal",
								background: "white",
								color: "black"
							})
					}
					,
					Q(),
					!0
			}
			function S() {
				if (rb.getSize && rb.getPosition && $(window).getSize) {
					var a = $(window).getSize()
						, b = screen.msOrientation || screen.mozOrientation || (screen.orientation || {}).type;
					if ("landscape-primary" === b || "landscape-secondary" === b ? isLandscape = !0 : "portrait-primary" === b || "portrait-primary" === b ? isLandscape = !1 : isLandscape = screen.width > screen.height,
						isLandscape) {
						var c = a.y
							, d = 4 / 3
							, e = 200
							, f = c * d;
						a.x - f <= e && (f = a.x - e,
							c = f / d)
					} else {
						var f = a.x
							, d = 4 / 3
							, g = 200
							, c = f / d;
						a.y - c <= g && (c = a.y - g,
							f = c * d)
					}
					rb.setStyles({
						width: Math.floor(f) + "px",
						height: Math.floor(c) + "px",
						top: 0,
						left: 0,
						position: "fixed",
						"z-index": 1e4
					}),
						sb.setStyles({
							width: Math.floor(f) + "px",
							height: Math.floor(c) + "px",
							borderTopLeftRadius: "0"
						}),
						tb.setStyles({
							width: Math.floor(f / 5) + "px",
							height: Math.floor(c / 5) + "px",
							top: 0,
							bottom: "unset",
							right: 0,
							left: "unset",
							borderBottomLeftRadius: "0"
						}),
						ub.setStyles({
							width: Math.floor(.25 * c) + "px",
							height: Math.floor(.25 * c) + "px",
							top: Math.floor(.5 * c - .125 * c) + "px",
							left: Math.floor(.5 * f - .125 * c) + "px",
							display: "none"
						}),
						vb.setStyles({
							position: "absolute",
							left: "8px",
							bottom: "8px"
						}),
						isLandscape ? (pa.setStyles({
							marginLeft: f + "px",
							marginTop: 0
						}),
							ta.setStyles({
								marginLeft: f + "px"
							})) : (pa.setStyles({
								marginLeft: 0,
								marginTop: c + 8 + "px"
							}),
								ta.setStyles({
									marginLeft: 0
								}))
				}
			}
			function T() {
				if (IS_MOBILE)
					return S();
				if (rb.getSize && rb.getPosition && $(window).getSize) {
					var a = $(window).getSize()
						, b = pa.getSize().y
						, b = a.y - pa.getPosition().y - 8
						, c = 320;
					if (c > b && (b = c),
						e)
						var d = 58;
					else
						var d = 0;
					var f = 4 / 3
						, g = (b - 8 - d) / 2
						, h = f * g;
					a.x - h <= 400 && (h = a.x - 400,
						g = h / f,
						b = 2 * g + 8 + d),
						rb.setStyles({
							width: Math.floor(h) + "px",
							height: Math.floor(b) + "px"
						}),
						new Elements([tb, sb]).setStyles({
							width: Math.floor(h) + "px",
							height: Math.floor(g) + "px"
						}),
						new Elements([ta, pa]).setStyle("margin-left", h + 8 + "px"),
						ub.setStyles({
							width: Math.floor(.25 * g) + "px",
							height: Math.floor(.25 * g) + "px",
							top: Math.floor(d + .5 * g - .125 * g) + "px",
							left: Math.floor(.5 * h - .125 * g) + "px"
						}),
						vb.setStyles({
							position: "absolute",
							left: "8px",
							bottom: g + 16 + "px"
						}),
						sb.setStyle("top", d + "px")
				}
			}
			function U() {
				V(),
					IS_MOBILE || Da.focus();
				var a = Da.value;
				if (a) {
					if (Da.value = "",
						IS_MOBILE) {
						var b = Da.clone().cloneEvents(Da);
						b.replaces(Da),
							Da = b
					} else
						Da.focus();
					wb = "",
						A("you", a),
						Ma.sendMessage(a),
						P("disconnect")
				}
			}
			function V() {
				null !== xb && (clearTimeout(xb),
					xb = null)
			}
			function W() {
				xb = null,
					Ma.stopTyping()
			}
			function X() {
				confirmAdultSite() && (Y("accept"),
					window.open("http://wawadmin.omegle.com/redir/y?track=interchat-" + Ib))
			}
			function Y(a) {
				(new Image).src = "http://wawadmin.omegle.com/redir/interchatexit?track=" + a + "-" + Ib
			}
			function Z() {
				(new Image).src = "http://wawadmin.omegle.com/redir/interchatenter?track=" + Ib
			}
			function _() {
				ub.setStyle("display", "none"),
					sb.removeEventListener("play", _)
			}
			function aa() {
				x("Connection error."),
					J()
			}
			function ba(a) {
				for (var b = a.split("\r\n"), c = 0; c < b.length; c++)
					if (-1 !== b[c].search("m=audio")) {
						var d = c;
						break
					}
				if (null === d)
					return a;
				for (var c = 0; c < b.length; c++)
					if (-1 !== b[c].search("opus/48000")) {
						var e = ca(b[c], /:(\d+) opus\/48000/i);
						e && (b[d] = da(b[d], e));
						break
					}
				return b = ea(b, d),
					a = b.join("\r\n")
			}
			function ca(a, b) {
				var c = a.match(b);
				return c && 2 == c.length ? c[1] : null
			}
			function da(a, b) {
				for (var c = a.split(" "), d = new Array, e = 0, f = 0; f < c.length; f++)
					3 === e && (d[e++] = b),
						c[f] !== b && (d[e++] = c[f]);
				return d.join(" ")
			}
			function ea(a, b) {
				for (var c = a[b].split(" "), d = a.length - 1; d >= 0; d--) {
					var e = ca(a[d], /a=rtpmap:(\d+) CN\/\d+/i);
					if (e) {
						var f = c.indexOf(e);
						-1 !== f && c.splice(f, 1),
							a.splice(d, 1)
					}
				}
				return a[b] = c.join(" "),
					a
			}
			function fa(a) {
				a.sdp = ba(a.sdp),
					Ub.setLocalDescription(a).then(function () {
						Ma.sendRTCPeerDescription(a)
					}, aa)
			}
			function ga() {
				if (tb && (tb.srcObject = null),
					userMedia) {
					for (var a = userMedia.getTracks(), b = 0; b < a.length; b++) {
						var c = a[b];
						c.stop && c.stop()
					}
					userMedia = null
				}
			}
			function ha() {
				IS_MOBILE && document.documentElement.requestFullscreen && -1 === navigator.userAgent.indexOf("Firefox") && document.documentElement.requestFullscreen({
					navigationUI: "hide"
				}),
					tb.srcObject || (tb.srcObject = userMedia);
				var a = userMedia.getVideoTracks();
				a.length ? cameraName = a[0].label : cameraName = "",
					Ub.addStream ? Ub.addStream(userMedia) : userMedia.getTracks().forEach(function (a) {
						Ub.addTrack(a, userMedia)
					}),
					x("Connecting to server..."),
					IS_MOBILE || ub.setStyle("display", "block"),
					sb.addEventListener("play", _, !1),
					Ma.connect(null, null, !1, !1, yb, Ab, e ? "unmon" : null, Tb, cameraName, !0, Cb, Db, Eb),
					serverManager.unsetKnownGood(),
					!e && antinudeServers.length && (Bb = setTimeout(function () {
						function a(b) {
							Bb = null,
								m.getContext("2d").drawImage(tb, i, j + d * b, c * g, d * h),
								b + 1 == e ? m.toBlob(function (a) {
									if (antinudeServers.length) {
										var b = antinudeServers[$random(0, antinudeServers.length - 1)]
											, c = new XMLHttpRequest;
										a = a.slice(0, a.size, "application/octet-stream"),
											c.open("POST", "https://" + b + "/upload?camera=" + encodeURIComponent(cameraName) + "&num_frames=" + e + "&frame_delay=" + f + "&randid=" + encodeURIComponent(randID)),
											c.withCredentials = !0,
											c.send(a)
									}
								}, "image/jpeg", .6) : Bb = setTimeout(function () {
									a(b + 1)
								}, f)
						}
						Bb = null;
						var b = new Date;
						if (!(lastScreenshotTime && 6e4 > b - lastScreenshotTime || (lastScreenshotTime = b,
							Math.random() > screenshotPercent))) {
							var c = 320
								, d = 240
								, e = 4
								, f = 300
								, g = 1
								, h = 1
								, i = 0
								, j = 0;
							if (tb.videoHeight && tb.videoWidth && tb.videoHeight * (c / tb.videoWidth) != d) {
								var k = c / d
									, l = tb.videoWidth / tb.videoHeight;
								k > l ? (g = d / (tb.videoHeight * (c / tb.videoWidth)),
									i = Math.floor((c - g * c) / 2)) : (h = c / (tb.videoWidth * (d / tb.videoHeight)),
										j = Math.floor((d - h * d) / 2))
							}
							var m = new Element("canvas", {
								width: c,
								height: d * e
							});
							a(0)
						}
					}, $random(1500, 5e3)))
			}
			$("appstore") && $("appstore").destroy(),
				$("footer") && $("footer").destroy(),
				mobileAdWrapper && mobileAdWrapper.setStyle("display", "none"),
				stopFlashing(),
				IS_MOBILE || startSpinner();
			var ia = new Date
				, ja = "string" == typeof b
				, ka = !1
				, la = !1;
			a && totalVideoChatsStarted++,
				$(document.body).addClass("inconversation"),
				a ? $(document.body).addClass("videochat") : $(document.body).removeClass("videochat");
			var ma = new Element("div", {
				"class": "chatbox3"
			})
				, na = new Element("div", {
					"class": "chatbox2"
				})
				, oa = new Element("div", {
					"class": "chatbox"
				});
			IS_MOBILE && !a && ma.grab(logoElt);
			var pa = new Element("div", {
				"class": "logwrapper",
				styles: {
					top: contentTop + "px"
				}
			})
				, qa = new Element("div", {
					"class": "logbox"
				})
				, ra = new Element("div");
			IS_MOBILE || ra.setStyles({
				position: "relative",
				"min-height": "100%"
			}),
				qa.grab(ra),
				pa.grab(qa);
			var sa = new Element("div", {
				"class": "logwrapperpush"
			});
			pa.grab(sa),
				oa.grab(pa);
			var ta = new Element("div", {
				"class": "controlwrapper"
			})
				, ua = new Element("table", {
					"class": "controltable",
					cellpadding: "0",
					cellspacing: "0",
					border: "0"
				})
				, va = new Element("tbody")
				, wa = new Element("tr")
				, xa = new Element("td", {
					"class": "disconnectbtncell"
				})
				, ya = new Element("div", {
					"class": "disconnectbtnwrapper"
				})
				, za = new Element("button", {
					"class": "disconnectbtn"
				});
			ya.grab(za),
				xa.grab(ya),
				wa.grab(xa);
			var Aa = new Element("td", {
				"class": "chatmsgcell"
			})
				, Ba = new Element("div", {
					"class": "chatmsgwrapper"
				});
			if (IS_MOBILE) {
				var Ca = new Element("form", {
					action: "#",
					method: "post"
				});
				Ca.setStyles({
					margin: 0,
					padding: 0
				}),
					Ca.addEvent("submit", function (a) {
						a.preventDefault(),
							U()
					});
				var Da = new Element("input", {
					"class": "chatmsg disabled",
					disabled: !0,
					placeholder: "Type your message..."
				});
				Da.addEvent("focus", function () {
					l()
				}),
					Ca.grab(Da),
					Ba.grab(Ca)
			} else {
				var Da = new Element("textarea", {
					"class": "chatmsg disabled",
					cols: "80",
					rows: "3",
					disabled: !0
				});
				Ba.grab(Da)
			}
			Aa.grab(Ba),
				wa.grab(Aa);
			var Ea = new Element("td", {
				"class": "sendbthcell"
			})
				, Fa = new Element("div", {
					"class": "sendbtnwrapper"
				})
				, Ga = new Element("button", {
					"class": "sendbtn",
					disabled: !0,
					text: "Send"
				});
			Ga.grab(new Element("div", {
				"class": "btnkbshortcut",
				text: "Enter"
			})),
				Fa.grab(Ga),
				Ea.grab(Fa),
				IS_MOBILE || wa.grab(Ea),
				va.grab(wa),
				ua.grab(va),
				ta.grab(ua),
				oa.grab(ta),
				na.grab(oa),
				ma.grab(na),
				$(document.body).grab(ma),
				$(document.body).scrollTop = $(document.body).scrollHeight;
			var Ha = null
				, Ia = null
				, Ja = null
				, Ka = null
				, La = null;
			IS_MOBILE ? ($(document.body).addEvent("scroll", i),
				$(document).addEvent("scroll", i)) : ($(document).addEvent("keydown", g),
					$(document).addEvent("keyup", h));
			var Ma = new MetaBackend;
			setMetaBackend(Ma);
			Ma.disconn = M;
			Ma.findNew = G;
			Ma.showMsgSent = A;
			IS_MOBILE ? scrollElt = document.body : scrollElt = qa;
			for (var Na = [], Oa = !1, Pa = [{
				topics: ["reddit"],
				regex: /reddit/,
				url: "http://wawadmin.omegle.com/redir/reddit",
				text: "Psst... did you know Omegle has its own subreddit?",
				image: "/static/redditalien.png"
			}], Qa = null, Ra = 0; Ra < Pa.length; Ra++) {
				var Sa = Pa[Ra];
				Sa.priority || (Sa.priority = Ra),
					q(Sa)
			}
			if (Qa && q(Qa),
				isFirstChat) {
				for (var Ra = 0; Ra < Pa.length; Ra++) {
					var Sa = Pa[Ra];
					if (Sa.topics)
						for (var Ta = 0; Ta < Sa.topics.length; Ta++) {
							var Ua = Sa.topics[Ta];
							if (topicManager.check(Ua)) {
								r(Sa);
								break
							}
						}
				}
				isFirstChat = !1
			}
			var Va, Wa = null, Xa = null, Ya = [], Za = null, $a = [], _a = !1;
			($("logo") || logoElt) && (($("logo") || logoElt).addEvent("click", H),
				($("logo") || logoElt).setStyle("cursor", "pointer"));
			var ab = null
				, bb = null
				, cb = function () {
					return cb = function () {
						return !0
					}
						,
						!1
				}
				, db = !1;
			Ma.addEvent("connectedToServer", function () {
				za.set("disabled", !1),
					window.onbeforeunload = N,
					$(window).addEvent("unload", M)
			}),
				Ma.addEvent("failedToConnect", function (a) {
					x("Error connecting to server. Please try again."),
						J(),
						"undefined" != typeof _gaq && _gaq.push(["_trackEvent", "Omegle connect error", a])
				});
			var eb = null
				, fb = null
				, gb = !1
				, hb = null;
			Ma.addEvent("waiting", function () {
				function a() {
					fb && (clearTimeout(fb),
						fb = null),
						eb && (Ma.stopLookingForCommonLikes(),
							eb.destroy(),
							eb = null)
				}
				if (hb = +new Date,
					serverManager.setKnownGood(),
					ja)
					return void x("Looking for two strangers...");
				var b = "Looking for someone you can chat with...";
				if (!zb)
					return void x(b);
				var c = new Element("div")
					, d = new Element("div", {
						text: b
					});
				c.grab(d),
					eb = new Element("div", {
						"class": "commonlikescancel",
						text: "It may take a little while to find someone with common interests. If you get tired of waiting, you can "
					});
				var e = new Element("a", {
					href: "javascript:",
					text: "connect to a completely random stranger"
				});
				e.addEvent("click", a),
					eb.grab(e),
					eb.appendText(" instead."),
					c.grab(eb),
					fb = setTimeout(function () {
						gb = !0,
							a()
					}, 1e4),
					x(c)
			});
			var ib = !1;
			Ma.addEvent("strangerConnected", function () {
				change("connected");
				if (!db)
					if (null !== hb && +new Date - hb > 1e3 && startFlashing(),
						"undefined" != typeof _gaq && _gaq.push(["_trackEvent", "Omegle chat connected", Gb]),
						ib = !0,
						serverManager.setKnownGood(),
						fb && (clearTimeout(fb),
							fb = null),
						ja)
						x("You're now watching two strangers discuss your question!", "You're watching two strangers discuss your question on Omegle!");
					else {
						var b = new Date;
						if (11 === b.getMonth() && 25 === b.getDate())
							var c = "merry Christmas";
						else
							var c, d = ["STAND WITH HONG KONG AGAINST THE CCP"], c = d[Math.floor(d.length * Math.random())];
						x("You're " + (IS_MOBILE ? "" : "now ") + "chatting with a random stranger. Say " + c + "!", "You're chatting with a random stranger on Omegle!"),
							gb && v("Omegle couldn't find anyone who shares interests with you, so this stranger is completely random. Try adding more interests!", !1, !1, !1),
							Da.set("disabled", !1),
							Da.removeClass("disabled"),
							Ga.set("disabled", !1),
							IS_MOBILE || Da.focus(),
							a && window.navigator.userAgent.indexOf("Edge") > -1 && v("Omegle video chat might not work well in Microsoft Edge. Please upgrade to Firefox or Chrome.")
					}
			}),
				Ma.addEvent("gotMessage", function (a) {
					C(),
						a = a.replace(/^[\r\n]+/g, ""),
						navigator.notification && navigator.notification.beep && navigator.notification.beep(1),
						navigator.vibrate && navigator.vibrate(333),
						A("stranger", a),
						change("gotMessage", a);
				}),
				Ma.addEvent("gotMessageHTML", function (a) {
					C(),
						y(a)
				}),
				Ma.addEvent("strangerDisconnected", function () {
					v("Stranger has disconnected."),
						J()
				}),
				Ma.addEvent("typing", E),
				Ma.addEvent("stoppedTyping", C),
				Ma.addEvent("recaptchaRequired", L),
				Ma.addEvent("recaptchaRejected", L),
				Ma.addEvent("connectionDied", function (a) {
					change("disconnected");
					var b = "Technical error";
					a && (b += ": " + a + " Sorry. :( Omegle understands if you hate it now, but Omegle still loves you."),
						v(b),
						serverManager.unsetKnownGood(),
						"undefined" != typeof _gaq && _gaq.push(["_trackEvent", "Omegle error", a ? a : "(error)", Ma.server]),
						J()
				}),
				Ma.addEvent("question", function (a) {
					var b = new Element("div", {
						"class": "question"
					})
						, c = new Element("div", {
							"class": "questionHeading",
							text: "Question to discuss:"
						});
					b.grab(c);
					var d = new Element("div", {
						"class": "questionText"
					});
					d.appendText(a),
						b.grab(d),
						Na.push(["Question to discuss:", a]),
						t(b)
				}),
				Ma.addEvent("spyMessage", function (a, b) {
					if ("Stranger 1" === a)
						var c = "youmsg";
					else
						var c = "strangermsg";
					B(a),
						startFlashing(),
						z(a, c, b)
				}),
				Ma.addEvent("spyDisconnected", function (a) {
					v(a + " has disconnected"),
						J()
				}),
				Ma.addEvent("spyTyping", D),
				Ma.addEvent("spyStoppedTyping", B),
				Ma.addEvent("error", function (a) {
					v(a),
						J()
				});
			var jb = !1;
			Ma.addEvent("serverMessage", function (a) {
				-1 !== a.indexOf("language") && (jb = !0,
					IS_MOBILE || "undefined" == typeof googTr || (a += ' (Select "English" from the menu in the corner to disable.)')),
					v(a, !1)
			}),
				Ma.addEvent("antinudeBanned", function (a) {
					v("Banned. 😡😡 Cockblocker is not impressed"),
						J(),
						null !== cb && cb(),
						top.location.href = a
				});
			var kb = null
				, lb = null;
			Ma.addEvent("commonLikes", function (a) {
				change("commonLikes", a);
				if (a.length) {
					lb = a;
					for (var b = "You both like ", c = 0; c < lb.length; c++)
						b += lb[c],
							c < lb.length - 1 && (b += ", "),
							c == lb.length - 2 && (b += "and ");
					b += ".",
						kb && kb.destroy(),
						kb = v(b)
				}
			}),
				Ma.addEvent("partnerCollege", function (a) {
					change("partnerCollege", a);
					v("Stranger's college: " + a)
				});
			var mb = null;
			Ma.addEvent("identDigests", function (a) {
				mb = a
			});
			var nb = "disconnect";
			Ga.addEvent("click", U),
				P("disconnect"),
				za.addEvent("click", O);
			var ob, pb, qb = !1;
			if (R() || e || chatPervTrack.push(!1),
				"undefined" == typeof doAVCtest && (doAVCtest = Math.random() < .5),
				a) {
				$("videowrapper") || $(document.body).grab(new Element("div", {
					id: "videowrapper"
				})),
					$("othervideo") || ($("videowrapper").grab(new Element("video", {
						id: "othervideo",
						events: {
							contextmenu: function () {
								return !1
							}
						}
					})),
						window.testOverrideConstraints && ($("othervideo").src = "/static/spinner.mp4"),
						$("othervideo").autoplay = !0,
						$("othervideo").setAttribute("playsinline", "playsinline"),
						$("othervideo").setAttribute("webkit-playsinline", "playsinline")),
					$("selfvideo") || ($("videowrapper").grab(new Element("video", {
						id: "selfvideo",
						events: {
							contextmenu: function () {
								return !1
							}
						},
						styles: {
							"z-index": 100
						}
					})),
						$("selfvideo").muted = !0,
						$("selfvideo").autoplay = !0,
						$("selfvideo").setAttribute("playsinline", "playsinline"),
						$("selfvideo").setAttribute("webkit-playsinline", "playsinline")),
					$("othervideospinner") || $("videowrapper").grab(new Element("div", {
						id: "othervideospinner"
					})),
					$("videologo") || (logoShadowImg || (logoShadowImg = new Element("img", {
						src: "/static/dotcomlogoshadow" + (window.devicePixelRatio && window.devicePixelRatio > 1 ? "@2x" : "") + ".png",
						width: 175,
						height: 49
					})),
						$("videowrapper").grab(logoShadowImg.clone().set("id", "videologo").addEvent("contextmenu", function () {
							return !1
						}).addEvent("mousedown", function () {
							return !1
						}).setStyle("opacity", "0.66"))),
					e && !$("abovevideosexybtn") && $("videowrapper").grab(new Element("div", {
						styles: {
							background: "red",
							color: "white",
							"font-size": "30px",
							height: "30px",
							"line-height": "30px",
							"vertical-align": "middle",
							cursor: "pointer",
							"text-align": "center",
							padding: "10px 0",
							"margin-bottom": "8px",
							"border-radius": "20px",
							position: "absolute",
							top: 0,
							left: 0,
							width: "100%"
						},
						id: "abovevideosexybtn",
						events: {
							click: function (a) {
								a.preventDefault(),
									cb && cb(),
									confirmAdultSite() && window.open("http://wawadmin.omegle.com/redir/y?track=avc-108-" + (doAVCtest ? "y" : "n"))
							}
						},
						text: "What happens if click?"
					}), "top");
				var rb = $("videowrapper")
					, sb = $("othervideo")
					, tb = $("selfvideo")
					, ub = $("othervideospinner")
					, vb = $("videologo");
				$("abovevideosexybtn");
				T(),
					$(window).addEvent("resize", T),
					$(window).addEvent("orientationchange", T),
					Ha = T
			} else
				var rb = null
					, sb = null
					, tb = null;
			e && a || $$("#abovevideosexybtn").dispose();
			var wb = Da.value
				, xb = null;
			Da.addEvent("keydown", function (a) {
				return 13 != a.code || a.shift || a.alt || a.meta ? void 0 : (U(),
					void a.preventDefault())
			}),
				Da.addEvent("keyup", function (a) {
					setTimeout(function () {
						Da.value !== wb && (wb = Da.value,
							null === xb && Ma.typing(),
							V(),
							xb = setTimeout(W, 5e3))
					}, 0)
				}),
				x("Connecting to server...");
			var yb = null
				, zb = !1
				, Ab = []
				, Bb = null
				, Cb = null
				, Db = null
				, Eb = !1;
			if (!c && !b && !e) {
				if (shouldUseLikes) {
					if (shouldUseFbLikes) {
						var Fb = FB.getAuthResponse();
						yb = Fb ? Fb.accessToken : null
					}
					Ab = topicManager.list(),
						zb = Ab.length || null !== yb
				}
				"none" !== collegeMode && collegeAndAuth && (Eb = "any" === collegeMode,
					Cb = collegeAndAuth[0],
					Db = collegeAndAuth[1])
			}
			var Gb = function () {
				var d = [];
				return IS_MOBILE && d.push("mobile"),
					b ? d.push("spy") : c ? d.push("spyee") : a ? d.push("video") : d.push("text"),
					e && (d.push("unmonitored"),
						shouldForceUnmonitored && d.push("(forced)")),
					zb && (d.push("topical"),
						yb && d.push("(FB)")),
					"none" !== collegeMode && Db && d.push("college"),
					d[0] = d[0][0].toUpperCase() + d[0].substr(1),
					d.join(" ")
			}();
			"undefined" != typeof _gaq && _gaq.push(["_trackEvent", "Omegle chat started", Gb]);
			if (e) {
				if ("undefined" == typeof unmonChatCount && (unmonChatCount = 0,
					unmonAdCount = 0),
					unmonAdCount < 1 && unmonChatCount >= 4) {
					unmonAdCount++;
					var Hb = Math.random() < .5
						, Ib = "gwfy9-" + (Hb ? "y" : "n")
						, Jb = new Element("div", {
							styles: {
								width: "40em",
								border: "1px solid #3F9FFF",
								"border-top-left-radius": "0.5em",
								"border-top-right-radius": "0.5em",
								overflow: "hidden"
							}
						})
						, Kb = new Element("div", {
							styles: {
								background: "#3F9FFF",
								color: "white",
								"font-size": "1.5em",
								padding: "0.3333em",
								"font-weight": "bold",
								"text-align": "center",
								"text-shadow": "0 0 15px #3F3F3F",
								"-webkit-text-shadow": "0 0 15px #3F3F3F",
								"-moz-text-shadow": "0 0 15px #3F3F3F",
								cursor: "pointer"
							},
							events: {
								click: X
							},
							text: Hb ? "A girl wants you" : "Girls want you"
						});
					Jb.grab(Kb);
					var Lb = new Element("div", {
						styles: {
							padding: "0.5em",
							position: "relative",
							overflow: "hidden"
						}
					});
					Lb.setStyle("padding-bottom", "3.5em");
					var Mb = new Element("div", {
						html: ""
					});
					Lb.grab(Mb);
					var Nb = new Element("div", {
						styles: {
							position: "absolute",
							right: 0,
							bottom: 0,
							"border-top": "1px solid #3F9FFF",
							"border-left": "1px solid #3F9FFF",
							padding: "0.5em",
							"text-align": "center",
							cursor: "pointer",
							height: "1em",
							position: "absolute",
							background: "white",
							color: "black"
						},
						events: {
							click: function () {
								Y("refuse"),
									G()
							}
						}
					})
						, Ob = new Element("span", {
							text: "No",
							styles: {
								"vertical-align": "middle"
							}
						});
					Nb.grab(Ob);
					var Pb = new Element("div", {
						styles: {
							position: "absolute",
							bottom: 0,
							left: 0,
							background: "#3F9FFF",
							padding: "0.5em",
							"text-align": "center",
							color: "white",
							cursor: "pointer",
							height: "1.5em",
							"border-top": "1px solid #3F9FFF",
							"border-right": "1px solid #3F9FFF",
							width: "15.25em",
							"z-index": "1",
							"border-top-right-radius": "0.5em"
						},
						events: {
							click: X
						}
					})
						, Qb = new Element("span", {
							text: "Give me girls",
							styles: {
								"font-size": "1.5em",
								"vertical-align": "middle",
								"text-shadow": "0 0 15px #3F3F3F",
								"-webkit-text-shadow": "0 0 15px #3F3F3F",
								"-moz-text-shadow": "0 0 15px #3F3F3F"
							}
						});
					Pb.grab(Qb),
						Lb.grab(Nb),
						Lb.grab(Pb);
					var Rb = new Element("div", {
						styles: {
							position: "absolute",
							bottom: 0,
							left: "15.75em",
							background: "#FF7F00",
							padding: "0.5em 0.5em 0.5em 1em",
							"text-align": "center",
							color: "white",
							cursor: "pointer",
							height: "1.5em",
							"border-top": "1px solid #FF7F00",
							"border-right": "1px solid #FF7F00",
							width: "15.25em",
							"border-top-right-radius": "0.5em",
							"z-index": "0"
						},
						events: {
							click: function () {
								confirmAdultSite() && (Y("gayaccept"),
									window.open("http://wawadmin.omegle.com/redir/gay?track=interchat-" + Ib))
							}
						}
					})
						, Sb = new Element("span", {
							text: "Free gay cams",
							styles: {
								"font-size": "1.5em",
								"vertical-align": "middle",
								"text-shadow": "0 0 15px #7F7F7F",
								"-webkit-text-shadow": "0 0 15px #7F7F7F",
								"-moz-text-shadow": "0 0 15px #7F7F7F"
							}
						});
					return Rb.grab(Sb),
						Lb.grab(Rb),
						Jb.grab(Lb),
						w(Jb),
						za.set("disabled", !0),
						void Z()
				}
				unmonChatCount++
			}
			var Tb = null;
			if (shouldUseEnglish && !zb || ("undefined" != typeof googTr && googTr.R && "string" == typeof googTr.R && googTr.R.length >= 2 ? Tb = googTr.R.substr(0, 2) : "undefined" != typeof navigator && "string" == typeof navigator.language && (Tb = navigator.language.substr(0, 2))),
				a) {
				var Ub = new RTCPeerConnection(WEB_RTC_CONFIG, WEB_RTC_PEER_CONSTRAINTS);
				webRTCconnection = Ub;
				change("new WEBRTC connection", Ub);
				publicMetaBackend.setRTCconnection(Ub);
				Ub.ontrack = function (a) {
					sb.srcObject = a.streams[0]
				}
					;
				var Vb = []
					, Wb = null;
				Ub.onicecandidate = function (a) {
					null !== Ub && (null !== Wb && (clearTimeout(Wb),
						Wb = null),
						a.candidate && Vb.push(a.candidate),
						a.candidate && "complete" !== Ub.iceGatheringState ? Wb = setTimeout(function () {
							Vb.length && (Ma.sendICECandidates(Vb),
								Vb = []),
								Wb = null
						}, 10) : Vb.length && (Ma.sendICECandidates(Vb),
							Vb = []))
				}
					;
				var Xb = !1
					, Yb = []
					, Zb = !1;
				Ma.addEvent("icecandidate", function (a) {
					if (!Zb)
						return void Yb.push(a);
					try {
						Ub.addIceCandidate(new RTCIceCandidate(a))
					} catch (b) {
						console.log(b)
					}
				}),
					Ma.addEvent("rtccall", function () {
						Xb = !0,
							null !== Ub && Ub.createOffer(WEB_RTC_MEDIA_CONSTRAINTS).then(fa, aa)
					}),
					Ma.addEvent("rtcpeerdescription", function (a) {
						a = new RTCSessionDescription(a),
							null !== Ub && Ub.setRemoteDescription(a).then(function () {
								Zb = !0;
								for (var a = 0; a < Yb.length; a++)
									try {
										Ub.addIceCandidate(new RTCIceCandidate(Yb[a]))
									} catch (b) {
										console.log(b)
									}
								Yb = [],
									Xb || setTimeout(function () {
										if (null !== Ub) {
											Ub.createAnswer(WEB_RTC_MEDIA_CONSTRAINTS).then(function (a) {
												fa(a)
											}, aa)
										}
									}, 0)
							}, aa)
					}),
					null !== userMedia && userMedia.active ? ha() : (userMedia = null,
						tb.srcObject = null,
						x("Please allow Omegle to use your camera..."),
						navigator.mediaDevices.getUserMedia(window.testOverrideConstraints || {
							video: {
								aspectRatio: 4 / 3,
								facingMode: "user"
							},
							audio: {
								echoCancellation: !0
							}
						}).then(function (a) {
							userMedia = a,
								ha()
						}, function (a) {
							x("NotAllowedError" === a.name ? "Camera blocked. Please enable it and try again." : a.message ? "Error with camera: " + a.message : "Error with camera: " + a),
								J(!0)
						}))
			} else
				Ma.connect(null, b, c, d, yb, Ab, e ? "unmon" : null, Tb, null, !1, Cb, Db, Eb),
					serverManager.unsetKnownGood()
		})
}
function testRTCSupport() {
	return window.RTCPeerConnection && window.RTCIceCandidate && window.RTCSessionDescription && navigator.mediaDevices && navigator.mediaDevices.getUserMedia && (RTCPeerConnection.prototype.addStream || RTCPeerConnection.prototype.addTrack) ? !0 : !1
}
function requestFullscreen(a) {
	a = a || document.documentElement,
		a.requestFullscreen ? a.requestFullscreen() : a.webkitRequestFullscreen && a.webkitRequestFullscreen()
}
window.onerror = function (a, b, c, d) {
	"undefined" == typeof _gaq && (_gaq = []),
		_gaq.push(["_trackEvent", "JSerror", b + ":" + c + ":" + d, a + ""])
}
	,
	top.location != document.location && (top.location.href = document.location.href);
var doStartFlash = Math.random() < .5
	, IE_URL_MAX_LENGTH = 2e3;
"undefined" == typeof IS_MOBILE && (IS_MOBILE = !1);
var splitDomain = document.domain.split(".");
splitDomain.length > 1 && (document.domain = splitDomain[splitDomain.length - 2] + "." + splitDomain[splitDomain.length - 1]);
var collegeJustEnabled = !1;
"#dormon" === window.location.hash && (collegeJustEnabled = !0,
	window.location.hash = "#",
	window.location.hash = "");
var aurrp = Cookie.read("aurrp");
aurrp = null === aurrp ? !0 : "1" === aurrp;
var shouldUseLikes = Cookie.read("uselikes");
shouldUseLikes = null === shouldUseLikes ? !0 : "1" === shouldUseLikes;
var shouldUseEnglish = Cookie.read("useenglish");
shouldUseEnglish = null === shouldUseEnglish ? !1 : "1" === shouldUseEnglish;
var randID = Cookie.read("randid");
randID && 8 === randID.length || (randID = function () {
	for (var a = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ", b = "", c = 0; 8 > c; c++) {
		var d = Math.floor(Math.random() * a.length);
		b += a.charAt(d)
	}
	return b
}()),
	Cookie.write("randid", randID, {
		duration: 365,
		domain: document.domain,
		path: "/"
	});
var collegeAndAuth = Cookie.read("college");
collegeAndAuth ? (Cookie.write("college", collegeAndAuth, {
	duration: 365,
	domain: document.domain,
	path: "/"
}),
	collegeAndAuth = JSON.decode(collegeAndAuth),
	("object" != typeof collegeAndAuth || null === collegeAndAuth || 2 !== collegeAndAuth.length) && (collegeAndAuth = null)) : collegeAndAuth = null;
var collegeMode = Cookie.read("collegemode");
"my" !== collegeMode && "any" !== collegeMode && "none" !== collegeMode && (collegeMode = "any");
var shouldUseFbLikes, firstChatTrackCode = null, contentTop, logoElt, likeButtonElement = null, newChatButton = new Element("img", {
	width: 170,
	height: 50,
	alt: "New chat",
	styles: {
		cursor: "pointer",
		"vertical-align": "middle"
	}
});
window.devicePixelRatio && window.devicePixelRatio > 1 ? newChatButton.set("src", "/static/newchatbtn@2x.png") : newChatButton.set("src", "/static/newchatbtn.png");
var unmonSexyButton = null
	, unmonGayButton = null;
if (IS_MOBILE) {
	var bwLogo = new Element("img", {
		width: 77,
		height: 16,
		alt: ""
	});
	window.devicePixelRatio && window.devicePixelRatio > 1 ? bwLogo.set("src", "/static/bwlogo@2x.png") : bwLogo.set("src", "/static/bwlogo.png")
}
HTMLCanvasElement.prototype.toBlob || Object.defineProperty(HTMLCanvasElement.prototype, "toBlob", {
	value: function (a, b, c) {
		var d = this.toDataURL(b, c).split(",")[1];
		setTimeout(function () {
			for (var c = atob(d), e = c.length, f = new Uint8Array(e), g = 0; e > g; g++)
				f[g] = c.charCodeAt(g);
			a(new Blob([f], {
				type: b || "image/png"
			}))
		})
	}
});
var COMETBackend = new Class({
	Implements: [Options, Events],
	initialize: function (a) {
		this.setOptions(a),
			this.clientID = null,
			this.stopped = !1
	},
	connect: function (a, b, c, d, e, f, g, h, i, j, k, l, m, n) {
		var o = this;
		o.server = a,
			o.stratusNearID = b,
			o.askedQuestion = c,
			o.wantsSpy = d,
			o.canSaveQuestion = e,
			o.fbAccessToken = f,
			o.topics = g,
			o.group = h,
			o.lang = i,
			o.camera = j,
			o.enableWebRTC = k,
			o.college = l,
			o.collegeAuth = m,
			o.anyCollege = n,
			subdomainManager.subdomainWindow(a, function (a) {
				o.reqWindow = a,
					o.gotReqWindow()
			})
	},
	resume: function (a, b) {
		var c = this;
		c.server = a,
			c.clientID = b,
			subdomainManager.subdomainWindow(a, function (a) {
				c.reqWindow = a,
					c.getEvents()
			})
	},
	gotReqWindow: function () {
		var a = this
			, b = a.stratusNearID || ""
			, c = subdomainManager.fixUrl(a.server, "/start?caps=recaptcha2,t&firstevents=1&spid=" + b + "&randid=" + randID + (IS_MOBILE ? "&m=1" : ""));
		"string" == typeof a.askedQuestion && (c += "&ask=" + encodeURIComponent(a.askedQuestion)),
			"string" == typeof a.fbAccessToken && (c += "&fbaccesstoken=" + encodeURIComponent(a.fbAccessToken)),
			a.wantsSpy && (c += "&wantsspy=1"),
			a.canSaveQuestion && (c += "&cansavequestion=1"),
			a.topics && a.topics.length && (c += "&topics=" + encodeURIComponent(JSON.encode(a.topics))),
			a.group && (c += "&group=" + encodeURIComponent(a.group)),
			a.lang && (c += "&lang=" + encodeURIComponent(a.lang)),
			a.camera && (c += "&camera=" + encodeURIComponent(a.camera)),
			a.enableWebRTC && (c += "&webrtc=1"),
			a.college && (c += "&college=" + encodeURIComponent(a.college)),
			a.collegeAuth && (c += "&college_auth=" + encodeURIComponent(a.collegeAuth)),
			a.anyCollege && (c += "&any_college=1");
		var d = null
			, e = killHeaders(new a.reqWindow.Request.JSON({
				url: c,
				onSuccess: function (b) {
					if (null !== d) {
						if (clearTimeout(d),
							d = null,
							!b.clientID)
							return void a.fireEvent("permanentlyFailedToConnect");
						a.clientID = b.clientID,
							a.fireEvent("connectedToServer"),
							b.events && a.gotEvents(b.events),
							a.getEvents()
					}
				},
				onFailure: function () {
					null !== d && (clearTimeout(d),
						d = null,
						a.fireEvent("failedToConnect"))
				}
			}));
		d = setTimeout(function () {
			d = null,
				e.cancel(),
				a.fireEvent("failedToConnect")
		}, 1e4),
			e.post()
	},
	getEvents: function (a) {
		if (void 0 === a && (a = 0),
			!this.stopped) {
			if (a > 2) {
				var b = this.stopped;
				return this.stopped = !0,
					void (b || this.fireEvent("connectionDied", "Lost contact with server, and couldn't reach it after 3 tries."))
			}
			var c = this;
			if (window.useExperimental && window.WebSocket) {
				var d = new WebSocket("wss://" + c.server + "/wsevents?id=" + encodeURIComponent(c.clientID));
				return d.onerror = function (b) {
					c.stopped || c.getEvents(a + 1)
				}
					,
					d.onclose = function (b) {
						c.stopped || c.getEvents(a + 1)
					}
					,
					void (d.onmessage = function (a) {
						var b = JSON.parse(a.data);
						if (null === b) {
							var d = c.stopped;
							c.stopped = !0,
								d || c.fireEvent("connectionPermanentlyDied", "Server was unreachable for too long and your connection was lost.")
						} else
							c.gotEvents(b)
					}
					)
			}
			var e = null
				, f = killHeaders(new c.reqWindow.Request.JSON({
					url: subdomainManager.fixUrl(c.server, "/events"),
					onSuccess: function (a) {
						null !== e && (clearTimeout(e),
							e = null,
							c.lastEvReq = null,
							c.stopped || (null === a ? (c.stopped = !0,
								c.fireEvent("connectionPermanentlyDied", "Server was unreachable for too long and your connection was lost.")) : (c.gotEvents(a),
									c.getEvents())))
					},
					onFailure: function () {
						null !== e && (clearTimeout(e),
							e = null,
							c.lastEvReq = null,
							c.stopped || setTimeout(function () {
								c.getEvents(a + 1)
							}, 750))
					}
				}));
			f.post({
				id: this.clientID
			}),
				c.lastEvReq = f,
				e = setTimeout(function () {
					e = null,
						f.cancel(),
						c.getEvents(a)
				}, 7e4)
		}
	},
	gotEvents: function (a) {
		var b = this;
		$each(a, function (a) {
			switch (a[0]) {
				case "waiting":
					b.fireEvent("waiting");
					break;
				case "connected":
					b.fireEvent("strangerConnected", a[1]);
					break;
				case "gotMessage":
					b.fireEvent("gotMessage", a[1]);
					break;
				case "strangerDisconnected":
					b.stopped = !0,
						b.fireEvent("strangerDisconnected");
					break;
				case "typing":
					b.fireEvent("typing");
					break;
				case "stoppedTyping":
					b.fireEvent("stoppedTyping");
					break;
				case "recaptchaRequired":
					b.fireEvent("recaptchaRequired", a[1]);
					break;
				case "recaptchaRejected":
					b.fireEvent("recaptchaRejected", a[1]);
					break;
				case "count":
					onlineCountUpdated(a[1]);
					break;
				case "spyMessage":
					b.fireEvent("spyMessage", [a[1], a[2]]);
					break;
				case "spyTyping":
					b.fireEvent("spyTyping", a[1]);
					break;
				case "spyStoppedTyping":
					b.fireEvent("spyStoppedTyping", a[1]);
					break;
				case "spyDisconnected":
					b.stopped = !0,
						b.fireEvent("spyDisconnected", a[1]);
					break;
				case "question":
					b.fireEvent("question", a[1]);
					break;
				case "serverMessage":
					b.fireEvent("serverMessage", a[1]);
					break;
				case "error":
					b.stopped = !0,
						b.fireEvent("error", a[1]);
					break;
				case "commonLikes":
					b.fireEvent("commonLikes", [a[1]]);
					break;
				case "antinudeBanned":
					b.stopped = !0,
						b.fireEvent("antinudeBanned", [a[1]]);
					break;
				case "statusInfo":
					gotServerStatus(a[1]);
					break;
				case "identDigests":
					b.fireEvent("identDigests", [a[1]]);
					break;
				case "icecandidate":
					b.fireEvent("icecandidate", [a[1]]);
					break;
				case "rtccall":
					b.fireEvent("rtccall");
					break;
				case "rtcpeerdescription":
					b.fireEvent("rtcpeerdescription", [a[1]]);
					break;
				case "partnerCollege":
					b.fireEvent("partnerCollege", [a[1]])
			}
		})
	},
	sendMessage: function (a) {
		if (ANBAW.currentPerson) {
			if (ANBAW.currentPerson.constructor.name == "AntiSpamText") {
				ANBAW.currentPerson.msgSent(a);
			}
		}
		this.sendPOST("/send", {
			msg: a
		})
	},
	typing: function () {
		this.sendPOST("/typing")
	},
	stopTyping: function () {
		this.sendPOST("/stoppedtyping")
	},
	submitRecaptcha: function (a) {
		this.sendPOST("/recaptcha", {
			response: a
		})
	},
	disconnect: function () {
		this.lastEvReq && (this.lastEvReq.cancel(),
			this.lastEvReq = null),
			this.sendPOST("/disconnect"),
			this.stopped = !0
	},
	stopLookingForCommonLikes: function () {
		this.sendPOST("/stoplookingforcommonlikes")
	},
	sendRTCPeerDescription: function (a) {
		this.sendPOST("/rtcpeerdescription", {
			desc: JSON.stringify(a)
		})
	},
	sendICECandidates: function (a) {
		for (var b = "id=" + encodeURIComponent(this.clientID), c = 0; c < a.length; c++)
			b += "&candidate=" + encodeURIComponent(JSON.stringify(a[c]));
		this.sendPOST("/icecandidate", b)
	},
	sendPOST: function (a, b, c) {
		b = b || {},
			c = c || 0,
			"object" == typeof b && (b.id = this.clientID);
		var d = this;
		killHeaders(new this.reqWindow.Request({
			url: subdomainManager.fixUrl(this.server, a),
			data: b,
			onFailure: function () {
				3 > c && d.sendPOST(a, b, c + 1)
			}
		})).send()
	}
})
	, MetaBackend = new Class({
		Implements: [Options, Events],
		initialize: function (a) {
			this.setOptions(a),
				this.numResumes = 0,
				this.stopped = !1,
				this.server = null
		},
		plugInBackend: function () {
			var a = ["connectedToServer", "waiting", "strangerConnected", "gotMessage", "strangerDisconnected", "typing", "stoppedTyping", "recaptchaRequired", "gotMessageHTML", "recaptchaRejected", "spyMessage", "spyTyping", "spyStoppedTyping", "spyDisconnected", "question", "error", "commonLikes", "antinudeBanned", "serverMessage", "identDigests", "icecandidate", "rtccall", "rtcpeerdescription", "partnerCollege"]
				, b = this;
			$each(a, function (a) {
				b.backend.addEvent(a, function () {
					("strangerDisconnected" === a || "error" === a || "spyDisconnected" === a || "antinudeBanned" === a) && (b.stopped = b.backend.stopped),
						b.fireEvent(a, arguments)
				})
			}),
				b.backend.addEvent("connectionDied", function () {
					if (serverManager.unsetKnownGood(),
						b.backend.clientID && b.numResumes < 3 && !b.stopped) {
						b.numResumes++;
						var a = b.backend.clientID;
						b.backend.removeEvents(),
							b.backend = new COMETBackend,
							b.plugInBackend(),
							b.server = serverManager.pickServer(),
							b.backend.resume(b.server, a)
					} else
						b.stopped = !0,
							b.fireEvent("connectionDied", arguments)
				}),
				b.backend.addEvent("connectionPermanentlyDied", function () {
					serverManager.unsetKnownGood(),
						b.stopped = !0,
						b.fireEvent("connectionDied", arguments)
				}),
				b.backend.addEvent("failedToConnect", function () {
					serverManager.unsetKnownGood(),
						b.numResumes < 3 ? (b.numResumes++,
							b.backend.removeEvents(),
							b.connect.apply(b, b.connectArgs)) : (b.stopped = !0,
								b.fireEvent("failedToConnect", b.backend.server))
				}),
				b.backend.addEvent("permanentlyFailedToConnect", function () {
					serverManager.unsetKnownGood(),
						b.stopped = !0,
						b.fireEvent("failedToConnect", b.backend.server)
				})
		},
		getRTCConnection: function () {
			return new Promise(resolve => {
				if (!this.webRTCconnection) {
					this.proxy = new Proxy(this, {
						set: function (target, key, value) {
							//console.log(`${key} set to ${value}`);
							//target[key] = value;
							if (key == "webRTCconnection") resolve(value);
						}
					});
				} else {
					resolve(this.webRTCconnection);
				}
			});
		},
		setRTCconnection: function (conn) {
			this.webRTCconnection = conn;
			if (this.proxy) this.proxy.webRTCconnection = conn;
		},
		connect: function () {
			this.backend = new COMETBackend,
				this.plugInBackend(),
				this.server = serverManager.pickServer(),
				this.connectArgs = arguments;
			for (var a = [this.server], b = 0; b < arguments.length; b++)
				a.push(arguments[b]);
			this.backend.connect.apply(this.backend, a)
		},
		sendMessage: function (a) {
			this.backend.sendMessage(a)
		},
		typing: function () {
			this.backend.typing()
		},
		stopTyping: function () {
			this.backend.stopTyping()
		},
		disconnect: function () {
			this.stopped = !0,
				this.backend && this.backend.disconnect()
		},
		submitRecaptcha: function (a) {
			this.backend.submitRecaptcha(a)
		},
		stopLookingForCommonLikes: function () {
			this.backend.stopLookingForCommonLikes()
		},
		sendRTCPeerDescription: function (a) {
			this.backend.sendRTCPeerDescription(a)
		},
		sendICECandidates: function (a) {
			this.backend.sendICECandidates(a)
		}
	})
	, termsLevel = 0
	, savedIntro = null
	, savedHeader = null
	, idealSpyMode = randomSpyMode()
	, firstStatusUpdate = !0
	, antinudeServers = ["waw1.omegle.com", "waw2.omegle.com", "waw3.omegle.com", "waw4.omegle.com"]
	, lastScreenshotTime = null
	, screenshotPercent = 0
	, shouldForceUnmonitored = !1
	, serverStatusTimeout = null
	, rtmfpServer = "rtmfp://p2p.rtmfp.net"
	, initOfFbCallbacks = []
	, initOfFbComplete = !1;
window.fbAsyncInit = function () {
	FB.init({
		appId: "372387627273",
		cookie: !0,
		status: !0,
		xfbml: !0,
		oauth: !0,
		channelUrl: "http://" + document.domain + "/static/channel.html"
	}),
		initOfFbComplete = !0;
	for (var a = 0; a < initOfFbCallbacks.length; a++)
		initOfFbCallbacks[a]();
	initOfFbCallbacks = null
}
	;
var basicReadyCalled = !1;
window.addEvent("domready", onReady),
	window.addEvent("load", onLoad);
var topicManager = function () {
	function a() {
		Cookie.write("topiclist", JSON.encode(d), {
			duration: 365,
			domain: document.domain,
			path: "/"
		})
	}
	function b(a) {
		return a.toLowerCase().replace(/[^a-zA-Z0-9]/g, "")
	}
	function c(a) {
		for (var c = b(a), e = 0; e < d.length; e++)
			if (b(d[e]) === c)
				return !0;
		return !1
	}
	var d = []
		, e = Cookie.read("topiclist");
	return e && (d = JSON.decode(e)),
		a(),
	{
		list: function () {
			return d
		},
		add: function (e) {
			var f = b(e);
			return f ? c(e) ? !1 : (d.push(e),
				a(),
				!0) : !1
		},
		remove: function (c) {
			for (var e = b(c), f = 0; f < d.length; f++)
				if (b(d[f]) === e)
					return d.splice(f, 1),
						a(),
						!0;
			return !1
		},
		normalize: b,
		check: c
	}
}(), subdomainManager = function () {
	function a(a) {
		var b = new Element("iframe", {
			src: "//" + a + "/static/xhrframe.html",
			width: 0,
			height: 0,
			frameBorder: 0
		});
		b.setStyle("display", "none"),
			$(document.body).grab(b)
	}
	var b = {}
		, c = {};
	return {
		subdomainWindow: function (d, e) {
			void 0 !== Browser.Request().withCredentials ? e(window) : b[d] ? e(b[d]) : (c[d] ? c[d].push(e) : c[d] = [e],
				a(d))
		},
		fixUrl: function (a, b) {
			return void 0 !== Browser.Request().withCredentials ? "//" + a + b : b
		},
		iframeLoaded: function (a, d) {
			if (!b[a] && (b[a] = d,
				c[a])) {
				for (var e = 0; e < c[a].length; e++) {
					var f = c[a][e];
					f(d)
				}
				delete c[a]
			}
		}
	}
}(), serverManager = function () {
	var a = []
		, b = null
		, c = null
		, d = {
			setKnownGood: function (a) {
				b = a ? a : c,
					b = c
			},
			unsetKnownGood: function () {
				b = null
			},
			pickServer: function () {
				if (null !== b && -1 !== a.indexOf(b))
					return b;
				for (; ;) {
					var d = a.shift();
					if (a.push(d),
						!(/^front([1-9]|10)\./.test(d) && Math.random() < .333))
						break
				}
				return c = d,
					d
			},
			setServerList: function (b) {
				function c(a) {
					var b, c, d;
					for (b = 1; b < a.length; b++)
						c = Math.floor(Math.random() * (1 + b)),
							c != b && (d = a[b],
								a[b] = a[c],
								a[c] = d)
				}
				for (var d = !1, e = 0; e < b.length; e++)
					-1 === b[e].indexOf(".") && (b[e] = b[e] + ".omegle.com");
				c(b);
				for (var e = 0; e < b.length; e++) {
					var f = b[e];
					-1 === a.indexOf(f) && (d = !0,
						a.splice(Math.floor(Math.random() * (a.length + 1)), 0, f))
				}
				d && this.unsetKnownGood();
				for (var e = 0; e < a.length; e++) {
					var f = a[e];
					-1 === b.indexOf(f) && a.splice(e, 1)
				}
			}
		};
	return d.setServerList(["front1", "front2", "front3", "front4", "front5", "front6", "front7", "front8", "front9", "front10", "front11", "front12", "front13", "front14", "front15", "front16", "front17", "front18", "front19", "front20", "front21", "front22", "front23", "front24", "front25", "front26", "front27", "front28", "front29", "front30", "front31", "front32", "front33", "front34", "front35", "front36", "front37", "front38", "front39", "front40", "front41", "front42", "front43", "front44", "front45", "front46", "front47", "front48"]),
		d
}(), timeManager = function () {
	var a = 0;
	return {
		now: function () {
			var b = new Date;
			return b.setTime(b.getTime() + a),
				b
		},
		gotAccurateTime: function (b) {
			var c = new Date;
			a = b - c
		}
	}
}(), flashingInterval = null, lastCoords = null, spinnerPossible = !1, mobileAdWrapper = null, mobileAdWrapperSize = null, currentAffiliate = null, isFirstChat = !0, chatOddEven = !0, chatPervTrack = [], logoShadowImg, totalVideoChatsStarted = 0, userMedia = null, WEB_RTC_CONFIG = {
	iceServers: [{
		urls: "stun:stun.l.google.com:19302"
	}]
}, WEB_RTC_MEDIA_CONSTRAINTS = {
	mandatory: {
		OfferToReceiveAudio: !0,
		OfferToReceiveVideo: !0
	}
}, WEB_RTC_PEER_CONSTRAINTS = {
	optional: [{
		DtlsSrtpKeyAgreement: !0
	}]
}, logoShadowImg = null;
