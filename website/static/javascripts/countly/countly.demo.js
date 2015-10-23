(function(countlyDemo, $, undefined) {

    countlyDemo.sessionDb = {2013: {}};
    countlyDemo.userDb = {2013: {}};
    countlyDemo.deviceDb = {2013: {}};
    countlyDemo.carrierDb = {2013: {}};
    countlyDemo.locatonDb = {2013: {}};
    countlyDemo.deviceDetailDb = {2013: {}};
    countlyDemo.appVersionDb = {2013: {}};
    countlyDemo.eventsDb = {
        "section": [
            {"_id":"no-segment", 2013: {}, "meta": {}},
            {"_id":"app_version", 2013: {}},
            {"_id":"country", 2013: {}}
        ],
        "purchase": [
            {"_id":"no-segment", 2013: {}, "meta": {}},
            {"_id":"app_version", 2013: {}},
            {"_id":"platform", 2013: {}}
        ],
        "score": [
            {"_id":"no-segment", 2013: {}, "meta": {}},
            {"_id":"player_scores", 2013: {}}
        ]
    };

    var eventSegments = {
        "country": ["Turkey", "USA", "France"],
        "app_version": ["1:0", "2:0"],
        "platform": ["iOS", "Android"],
        "player_scores": ["100-200", "200-500", "500-1000", ">1000"]
    };

    for (var event in countlyDemo.eventsDb) {
        for (var eventSegment in eventSegments) {
            countlyDemo.eventsDb[event][0].meta[eventSegment] = eventSegments[eventSegment];
        }

        switch (event) {
            case "section":
                countlyDemo.eventsDb[event][0].meta.segments = ["app_version", "country"];
                break;
            case "purchase":
                countlyDemo.eventsDb[event][0].meta.segments = ["app_version", "platform"];
                break;
            case "score":
                countlyDemo.eventsDb[event][0].meta.segments = ["player_scores"];
                break;
            default:
                countlyDemo.eventsDb[event][0].meta.segments = [];
                break;
        }
    }

    var devices = ["Galaxy S3", "iPhone 4", "iPhone 3GS", "iPad 2"];
    var carriers = ["Verizon", "AT&T", "Sprint"];
    var countries = ["TR", "US", "GB", "CN", "JP", "IT", "PE", "BE", "AU", "SE"];
    var os = ["iOS", "Android"];
    var os_versions = ["i5:1:3", "i5:1", "i6:0:1", "a4:0:4"];
    var resolutions = ["960x800","960�640","480x320","1024x768"];
    var app_versions = ["1:0", "1:1", "2:0", "2:0:1"];

    countlyDemo.initialize = function() {

        var sessionObj = {},
            userObj = {},
            deviceObj = {devices: devices},
            carrierObj = {carriers: carriers},
            locationObj = {countries: countries},
            deviceDetails = {os: os, os_versions: os_versions, resolutions: resolutions },
            appVersions = {app_versions: app_versions};

        sessionObj["2013"] = {};
        userObj["2013"] = {};
        userObj["2013"]["f"] = {};
        userObj["2013"]["l"] = {};
        deviceObj["2013"] = {};
        carrierObj["2013"] = {};
        locationObj["2013"] = {};
        deviceDetails["2013"] = {};
        appVersions["2013"] = {};

        var gtotal = 0,
            gunique = 0,
            gnew = 0,
            gduration = 0,
            gevents = 0;

        for (var i = 1; i < (new Date().getMonth() + 2); i++) {

            var ttotal = 0,
                tunique = 0,
                tnew = 0,
                tduration = 0,
                tevents = 0;

            var daysInMonth = ((new Date().getMonth() + 1) == i)? (new Date().getDate()) : new Date(2013, i, 0).getDate();

            sessionObj["2013"][i] = {};
            userObj["2013"][i] = {};
            userObj["2013"][i]["l"] = {};
            userObj["2013"][i]["f"] = {};
            deviceObj["2013"][i] = {};
            carrierObj["2013"][i] = {};
            locationObj["2013"][i] = {};
            deviceDetails["2013"][i] = {};
            appVersions["2013"][i] = {};

            for (var event in countlyDemo.eventsDb) {
                for (var ei=0; ei < countlyDemo.eventsDb[event].length; ei++) {
                    countlyDemo.eventsDb[event][ei]["2013"][i] = {};
                }
            }

            for (var j = 1; j < (daysInMonth + 1); j++) {

                sessionObj["2013"][i][j] = {};
                userObj["2013"][i][j] = {};
                userObj["2013"][i][j]["f"] = {};
                userObj["2013"][i][j]["l"] = {};
                deviceObj["2013"][i][j] = {};
                carrierObj["2013"][i][j] = {};
                locationObj["2013"][i][j] = {};
                deviceDetails["2013"][i][j] = {};
                appVersions["2013"][i][j] = {};

                for (var event in countlyDemo.eventsDb) {
                    for (var ei=0; ei < countlyDemo.eventsDb[event].length; ei++) {
                        countlyDemo.eventsDb[event][ei]["2013"][i][j] = {};
                    }
                }

                var tmpTotal = 0,
                    tmpNew = 0,
                    tmpUnique = 0,
                    tmpDuration = 0,
                    tmpEvents = 0;

                if (((new Date().getMonth() + 1) == i) && j == daysInMonth) {

                    for (var k = 0; k < 24; k++) {

                        var tmpTotal2 = Math.floor(Math.random()*110) + 50,
                            tmpNew2 = Math.floor(Math.random()*21) + 10,
                            tmpUnique2 = Math.floor(Math.random()*61) + 30,
                            tmpDuration2 = Math.floor(Math.random()*50001) + 30000,
                            tmpEvents2 = Math.floor(Math.random()*110) + 100;

                        sessionObj["2013"][i][j][k] = {};
                        sessionObj["2013"][i][j][k]["t"] = tmpTotal2;
                        sessionObj["2013"][i][j][k]["u"] = tmpUnique2;
                        sessionObj["2013"][i][j][k]["n"] = tmpNew2;
                        sessionObj["2013"][i][j][k]["d"] = tmpDuration2;
                        sessionObj["2013"][i][j][k]["e"] = tmpEvents2;

                        tmpTotal += tmpTotal2;
                        tmpNew += tmpNew2;
                        tmpUnique += tmpUnique2;
                        tmpDuration += tmpDuration2;
                        tmpEvents += tmpEvents2;

                        userObj["2013"][i][j][k] = {};
                        userObj["2013"][i][j][k]["f"] = {};
                        userObj["2013"][i][j][k]["l"] = {};

                        for (var o = 0; o < 12; o++) {
                            userObj["2013"][i][j][k]["f"][o] = Math.floor(tmpUnique2 * ((12 - o) / 66));
                        }

                        for (var r = 0; r < 9; r++) {
                            userObj["2013"][i][j][k]["l"][r] = Math.floor(tmpUnique2 * ((9 - r) / 36));
                        }

                        for (var event in countlyDemo.eventsDb) {
                            for (var ei=0; ei < countlyDemo.eventsDb[event].length; ei++) {
                                var eventSegmentation = countlyDemo.eventsDb[event][ei]["_id"];

                                if (!countlyDemo.eventsDb[event][ei]["2013"][i][j][k]) {
                                    countlyDemo.eventsDb[event][ei]["2013"][i][j][k] = {};
                                }

                                if (eventSegments[eventSegmentation]) {
                                    for (var ej=0; ej < eventSegments[countlyDemo.eventsDb[event][ei]["_id"]].length; ej++ ) {
                                        countlyDemo.eventsDb[event][ei]["2013"][i][j][k][eventSegments[eventSegmentation][ej]] = {};
                                        countlyDemo.eventsDb[event][ei]["2013"][i][j][k][eventSegments[eventSegmentation][ej]]["c"] = Math.floor(tmpNew2 / eventSegments[eventSegmentation].length);

                                        if (event == "purchase") {
                                            countlyDemo.eventsDb[event][ei]["2013"][i][j][k][eventSegments[eventSegmentation][ej]]["s"] = Math.floor(tmpTotal2 / eventSegments[eventSegmentation].length);
                                        }
                                    }
                                }

                                countlyDemo.eventsDb[event][ei]["2013"][i][j][k]["c"] = Math.floor(tmpNew2);

                                if (event == "purchase") {
                                    countlyDemo.eventsDb[event][ei]["2013"][i][j][k]["s"] = Math.floor(tmpTotal2);
                                }
                            }
                        }
                    }

                } else {
                    tmpTotal = Math.floor(Math.random()*2100) + 1000;
                    tmpNew = Math.floor(Math.random()*401) + 200;
                    tmpUnique = Math.floor(Math.random()*1201) + 600;
                    tmpDuration = Math.floor(Math.random()*1000001) + 600000;
                    tmpEvents = Math.floor(Math.random()*2100) + 2000;
                }

                sessionObj["2013"][i][j]["t"] = tmpTotal;
                sessionObj["2013"][i][j]["u"] = tmpUnique;
                sessionObj["2013"][i][j]["n"] = tmpNew;
                sessionObj["2013"][i][j]["d"] = tmpDuration;
                sessionObj["2013"][i][j]["e"] = tmpEvents;

                for (var o = 0; o < 12; o++) {
                    userObj["2013"][i][j]["f"][o] = Math.floor(tmpUnique * ((12 - o) / 66));
                }

                for (var r = 0; r < 9; r++) {
                    userObj["2013"][i][j]["l"][r] = Math.floor(tmpUnique * ((9 - r) / 36));
                }

                for (var r = 0; r < devices.length; r++) {
                    deviceObj["2013"][i][j][devices[r]] = {};
                }

                for (var r = 0; r < devices.length; r++) {
                    deviceObj["2013"][i][j][devices[r]]["t"] = Math.floor(tmpTotal / devices.length);
                    deviceObj["2013"][i][j][devices[r]]["u"] = Math.floor(tmpUnique / devices.length);
                    deviceObj["2013"][i][j][devices[r]]["n"] = Math.floor(tmpNew / devices.length);
                }

                for (var r = 0; r < carriers.length; r++) {
                    carrierObj["2013"][i][j][carriers[r]] = {};
                }

                for (var r = 0; r < carriers.length; r++) {
                    carrierObj["2013"][i][j][carriers[r]]["t"] = Math.floor(tmpTotal / carriers.length);
                    carrierObj["2013"][i][j][carriers[r]]["u"] = Math.floor(tmpUnique / carriers.length);
                    carrierObj["2013"][i][j][carriers[r]]["n"] = Math.floor(tmpNew / carriers.length);
                }

                for (var r = 0; r < countries.length; r++) {
                    locationObj["2013"][i][j][countries[r]] = {};
                }

                for (var r = 0; r < countries.length; r++) {
                    locationObj["2013"][i][j][countries[r]]["t"] = Math.floor(tmpTotal / countries.length);
                    locationObj["2013"][i][j][countries[r]]["u"] = Math.floor(tmpUnique / countries.length);
                    locationObj["2013"][i][j][countries[r]]["n"] = Math.floor(tmpNew / countries.length);
                }

                for (var r = 0; r < os_versions.length; r++) {
                    deviceDetails["2013"][i][j][os_versions[r]] = {};
                    deviceDetails["2013"][i][j][resolutions[r]] = {};
                }

                for (var r = 0; r < os_versions.length; r++) {
                    deviceDetails["2013"][i][j][os_versions[r]]["t"] = Math.floor(tmpTotal / os_versions.length);
                    deviceDetails["2013"][i][j][os_versions[r]]["u"] = Math.floor(tmpUnique / os_versions.length);
                    deviceDetails["2013"][i][j][os_versions[r]]["n"] = Math.floor(tmpNew / os_versions.length);

                    deviceDetails["2013"][i][j][resolutions[r]]["t"] = Math.floor(tmpTotal / resolutions.length);
                    deviceDetails["2013"][i][j][resolutions[r]]["u"] = Math.floor(tmpUnique / resolutions.length);
                    deviceDetails["2013"][i][j][resolutions[r]]["n"] = Math.floor(tmpNew / resolutions.length);
                }

                for (var r = 0; r < os.length; r++) {
                    deviceDetails["2013"][i][j][os[r]] = {};
                    deviceDetails["2013"][i][j][resolutions[r]] = {};
                }

                for (var r = 0; r < os.length; r++) {
                    deviceDetails["2013"][i][j][os[r]]["t"] = Math.floor(tmpTotal / os.length);
                    deviceDetails["2013"][i][j][os[r]]["u"] = Math.floor(tmpUnique / os.length);
                    deviceDetails["2013"][i][j][os[r]]["n"] = Math.floor(tmpNew / os.length);
                }

                for (var r = 0; r < app_versions.length; r++) {
                    appVersions["2013"][i][j][app_versions[r]] = {};
                }

                for (var r = 0; r < app_versions.length; r++) {
                    appVersions["2013"][i][j][app_versions[r]]["t"] = Math.floor(tmpTotal / app_versions.length);
                    appVersions["2013"][i][j][app_versions[r]]["u"] = Math.floor(tmpUnique / app_versions.length);
                    appVersions["2013"][i][j][app_versions[r]]["n"] = Math.floor(tmpNew / app_versions.length);
                }

                for (var event in countlyDemo.eventsDb) {
                    for (var ei=0; ei < countlyDemo.eventsDb[event].length; ei++) {
                        var eventSegmentation = countlyDemo.eventsDb[event][ei]["_id"];
                        if (eventSegments[eventSegmentation]) {
                            for (var ej=0; ej < eventSegments[countlyDemo.eventsDb[event][ei]["_id"]].length; ej++ ) {
                                countlyDemo.eventsDb[event][ei]["2013"][i][j][eventSegments[eventSegmentation][ej]] = {};
                                countlyDemo.eventsDb[event][ei]["2013"][i][j][eventSegments[eventSegmentation][ej]]["c"] = Math.floor(tmpNew / eventSegments[eventSegmentation].length);

                                if (event == "purchase") {
                                    countlyDemo.eventsDb[event][ei]["2013"][i][j][eventSegments[eventSegmentation][ej]]["s"] = Math.floor(tmpTotal / eventSegments[eventSegmentation].length);
                                }
                            }
                        }

                        countlyDemo.eventsDb[event][ei]["2013"][i][j]["c"] = Math.floor(tmpNew);

                        if (event == "purchase") {
                            countlyDemo.eventsDb[event][ei]["2013"][i][j]["s"] = Math.floor(tmpTotal);
                        }
                    }
                }

                ttotal += tmpTotal;
                tunique += tmpUnique;
                tnew += tmpNew;
                tduration += tmpDuration;
                tevents += tmpEvents;
            }

            sessionObj["2013"][i]["t"] = ttotal;
            sessionObj["2013"][i]["u"] = tunique;
            sessionObj["2013"][i]["n"] = tnew;
            sessionObj["2013"][i]["d"] = tduration;
            sessionObj["2013"][i]["e"] = tevents;

            for (var o = 0; o < 12; o++) {
                userObj["2013"][i]["f"][o] = Math.floor(tunique * ((12 - o) / 66));
            }

            for (var r = 0; r < 9; r++) {
                userObj["2013"][i]["l"][r] = Math.floor(tunique * ((9 - r) / 36));
            }

            for (var r = 0; r < devices.length; r++) {
                deviceObj["2013"][i][devices[r]] = {};
            }

            for (var r = 0; r < devices.length; r++) {
                deviceObj["2013"][i][devices[r]]["t"] = Math.floor(ttotal / devices.length);
                deviceObj["2013"][i][devices[r]]["u"] = Math.floor(tunique / devices.length);
                deviceObj["2013"][i][devices[r]]["n"] = Math.floor(tnew / devices.length);
            }

            for (var r = 0; r < carriers.length; r++) {
                carrierObj["2013"][i][carriers[r]] = {};
            }

            for (var r = 0; r < carriers.length; r++) {
                carrierObj["2013"][i][carriers[r]]["t"] = Math.floor(ttotal / carriers.length);
                carrierObj["2013"][i][carriers[r]]["u"] = Math.floor(tunique / carriers.length);
                carrierObj["2013"][i][carriers[r]]["n"] = Math.floor(tnew / carriers.length);
            }

            for (var r = 0; r < countries.length; r++) {
                locationObj["2013"][i][countries[r]] = {};
            }

            for (var r = 0; r < countries.length; r++) {
                locationObj["2013"][i][countries[r]]["t"] = Math.floor(ttotal / countries.length);
                locationObj["2013"][i][countries[r]]["u"] = Math.floor(tunique / countries.length);
                locationObj["2013"][i][countries[r]]["n"] = Math.floor(tnew / countries.length);
            }

            for (var r = 0; r < os_versions.length; r++) {
                deviceDetails["2013"][i][os_versions[r]] = {};
                deviceDetails["2013"][i][resolutions[r]] = {};
            }

            for (var r = 0; r < os_versions.length; r++) {
                deviceDetails["2013"][i][os_versions[r]]["t"] = Math.floor(ttotal / os_versions.length);
                deviceDetails["2013"][i][os_versions[r]]["u"] = Math.floor(tunique / os_versions.length);
                deviceDetails["2013"][i][os_versions[r]]["n"] = Math.floor(tnew / os_versions.length);

                deviceDetails["2013"][i][resolutions[r]]["t"] = Math.floor(ttotal / resolutions.length);
                deviceDetails["2013"][i][resolutions[r]]["u"] = Math.floor(tunique / resolutions.length);
                deviceDetails["2013"][i][resolutions[r]]["n"] = Math.floor(tnew / resolutions.length);
            }

            for (var r = 0; r < os.length; r++) {
                deviceDetails["2013"][i][os[r]] = {};
                deviceDetails["2013"][i][resolutions[r]] = {};
            }

            for (var r = 0; r < os.length; r++) {
                deviceDetails["2013"][i][os[r]]["t"] = Math.floor(ttotal / os.length);
                deviceDetails["2013"][i][os[r]]["u"] = Math.floor(tunique / os.length);
                deviceDetails["2013"][i][os[r]]["n"] = Math.floor(tnew / os.length);
            }

            for (var r = 0; r < app_versions.length; r++) {
                appVersions["2013"][i][app_versions[r]] = {};
            }

            for (var r = 0; r < app_versions.length; r++) {
                appVersions["2013"][i][app_versions[r]]["t"] = Math.floor(ttotal / app_versions.length);
                appVersions["2013"][i][app_versions[r]]["u"] = Math.floor(tunique / app_versions.length);
                appVersions["2013"][i][app_versions[r]]["n"] = Math.floor(tnew / app_versions.length);
            }

            for (var event in countlyDemo.eventsDb) {
                for (var ei=0; ei < countlyDemo.eventsDb[event].length; ei++) {
                    var eventSegmentation = countlyDemo.eventsDb[event][ei]["_id"];
                    if (eventSegments[eventSegmentation]) {
                        for (var ej=0; ej < eventSegments[countlyDemo.eventsDb[event][ei]["_id"]].length; ej++ ) {
                            countlyDemo.eventsDb[event][ei]["2013"][i][eventSegments[eventSegmentation][ej]] = {};
                            countlyDemo.eventsDb[event][ei]["2013"][i][eventSegments[eventSegmentation][ej]]["c"] = Math.floor(tnew / eventSegments[eventSegmentation].length);

                            if (event == "purchase") {
                                countlyDemo.eventsDb[event][ei]["2013"][i][eventSegments[eventSegmentation][ej]]["s"] = Math.floor(ttotal / eventSegments[eventSegmentation].length);
                            }
                        }
                    }

                    countlyDemo.eventsDb[event][ei]["2013"][i]["c"] = Math.floor(tnew);

                    if (event == "purchase") {
                        countlyDemo.eventsDb[event][ei]["2013"][i]["s"] = Math.floor(ttotal);
                    }
                }
            }

            gtotal += ttotal;
            gunique += tunique;
            gnew += tnew;
            gduration += tduration;
            gevents += tevents;
        }

        sessionObj["2013"]["t"] = gtotal;
        sessionObj["2013"]["u"] = gunique;
        sessionObj["2013"]["n"] = gnew;
        sessionObj["2013"]["d"] = gduration;
        sessionObj["2013"]["e"] = gevents;

        userObj["f-ranges"] = [];
        userObj["l-ranges"] = [];

        for (var o = 0; o < 12; o++) {
            userObj["2013"]["f"][o] = Math.floor(gunique * ((12 - o) / 66));
            userObj["f-ranges"][userObj["f-ranges"].length] = o;
        }

        for (var r = 0; r < 9; r++) {
            userObj["2013"]["l"][r] = Math.floor(gunique * ((9 - r) / 36));
            userObj["l-ranges"][userObj["l-ranges"].length] = r;
        }

        for (var r = 0; r < devices.length; r++) {
            deviceObj["2013"][devices[r]] = {};
        }

        for (var r = 0; r < devices.length; r++) {
            deviceObj["2013"][devices[r]]["t"] = Math.floor(gtotal / devices.length);
            deviceObj["2013"][devices[r]]["u"] = Math.floor(gunique / devices.length);
            deviceObj["2013"][devices[r]]["n"] = Math.floor(gnew / devices.length);
        }

        for (var r = 0; r < carriers.length; r++) {
            carrierObj["2013"][carriers[r]] = {};
        }

        for (var r = 0; r < carriers.length; r++) {
            carrierObj["2013"][carriers[r]]["t"] = Math.floor(gtotal / carriers.length);
            carrierObj["2013"][carriers[r]]["u"] = Math.floor(gunique / carriers.length);
            carrierObj["2013"][carriers[r]]["n"] = Math.floor(gnew / carriers.length);
        }

        for (var r = 0; r < countries.length; r++) {
            locationObj["2013"][countries[r]] = {};
        }

        for (var r = 0; r < countries.length; r++) {
            locationObj["2013"][countries[r]]["t"] = Math.floor(gtotal / countries.length);
            locationObj["2013"][countries[r]]["u"] = Math.floor(gunique / countries.length);
            locationObj["2013"][countries[r]]["n"] = Math.floor(gnew / countries.length);
        }

        for (var r = 0; r < os_versions.length; r++) {
            deviceDetails["2013"][os_versions[r]] = {};
            deviceDetails["2013"][resolutions[r]] = {};
        }

        for (var r = 0; r < os_versions.length; r++) {
            deviceDetails["2013"][os_versions[r]]["t"] = Math.floor(gtotal / os_versions.length);
            deviceDetails["2013"][os_versions[r]]["u"] = Math.floor(gunique / os_versions.length);
            deviceDetails["2013"][os_versions[r]]["n"] = Math.floor(gnew / os_versions.length);

            deviceDetails["2013"][resolutions[r]]["t"] = Math.floor(gtotal / resolutions.length);
            deviceDetails["2013"][resolutions[r]]["u"] = Math.floor(gunique / resolutions.length);
            deviceDetails["2013"][resolutions[r]]["n"] = Math.floor(gnew / resolutions.length);
        }

        for (var r = 0; r < os.length; r++) {
            deviceDetails["2013"][os[r]] = {};
            deviceDetails["2013"][resolutions[r]] = {};
        }

        for (var r = 0; r < os.length; r++) {
            deviceDetails["2013"][os[r]]["t"] = Math.floor(gtotal / os.length);
            deviceDetails["2013"][os[r]]["u"] = Math.floor(gunique / os.length);
            deviceDetails["2013"][os[r]]["n"] = Math.floor(gnew / os.length);
        }

        for (var r = 0; r < app_versions.length; r++) {
            appVersions["2013"][app_versions[r]] = {};
        }

        for (var r = 0; r < app_versions.length; r++) {
            appVersions["2013"][app_versions[r]]["t"] = Math.floor(gtotal / app_versions.length);
            appVersions["2013"][app_versions[r]]["u"] = Math.floor(gunique / app_versions.length);
            appVersions["2013"][app_versions[r]]["n"] = Math.floor(gnew / app_versions.length);
        }

        for (var event in countlyDemo.eventsDb) {
            for (var ei=0; ei < countlyDemo.eventsDb[event].length; ei++) {
                var eventSegmentation = countlyDemo.eventsDb[event][ei]["_id"];
                if (eventSegments[eventSegmentation]) {
                    for (var ej=0; ej < eventSegments[countlyDemo.eventsDb[event][ei]["_id"]].length; ej++ ) {
                        countlyDemo.eventsDb[event][ei]["2013"][eventSegments[eventSegmentation][ej]] = {};
                        countlyDemo.eventsDb[event][ei]["2013"][eventSegments[eventSegmentation][ej]]["c"] = Math.floor(gnew / eventSegments[eventSegmentation].length);

                        if (event == "purchase") {
                            countlyDemo.eventsDb[event][ei]["2013"][eventSegments[eventSegmentation][ej]]["s"] = Math.floor(gtotal / eventSegments[eventSegmentation].length);
                        }
                    }
                }

                countlyDemo.eventsDb[event][ei]["2013"]["c"] = Math.floor(gnew);

                if (event == "purchase") {
                    countlyDemo.eventsDb[event][ei]["2013"]["s"] = Math.floor(gtotal);
                }
            }
        }

        countlyDemo.sessionDb = sessionObj;
        countlyDemo.userDb = userObj;
        countlyDemo.deviceDb = deviceObj;
        countlyDemo.carrierDb = carrierObj;
        countlyDemo.locatonDb = locationObj;
        countlyDemo.deviceDetailDb = deviceDetails;
        countlyDemo.appVersionDb = appVersions;
    }

    countlyDemo.realtime = function() {
        var month = (new Date().getMonth() + 1),
            day = (new Date().getDate()),
            hour = (new Date().getHours());

        var ttotal = Math.floor(Math.random()*10) + 50,
            tnew = Math.floor(Math.random()*20) + 10,
            tunique = Math.floor(Math.random()*60) + 30,
            tduration = Math.floor(Math.random()*50001) + 3000,
            tevents = Math.floor(Math.random()*110) + 100;

        var sessionObj = countlyDemo.sessionDb,
            userObj = countlyDemo.userDb,
            deviceObj = countlyDemo.deviceDb,
            carrierObj = countlyDemo.carrierDb,
            locationObj = countlyDemo.locatonDb,
            deviceDetails = countlyDemo.deviceDetailDb,
            appVersions = countlyDemo.appVersionDb;

        sessionObj["2013"]["t"] = sessionObj["2013"]["t"] + ttotal;
        sessionObj["2013"]["u"] = sessionObj["2013"]["u"] + tunique;
        sessionObj["2013"]["n"] = sessionObj["2013"]["n"] + tnew;
        sessionObj["2013"]["d"] = sessionObj["2013"]["d"] + tduration;
        sessionObj["2013"]["e"] = sessionObj["2013"]["e"] + tevents;
        sessionObj["2013"][month]["t"] = sessionObj["2013"][month]["t"] + ttotal;
        sessionObj["2013"][month]["u"] = sessionObj["2013"][month]["u"] + tunique;
        sessionObj["2013"][month]["n"] = sessionObj["2013"][month]["n"] + tnew;
        sessionObj["2013"][month]["d"] = sessionObj["2013"][month]["d"] + tduration;
        sessionObj["2013"][month]["e"] = sessionObj["2013"][month]["e"] + tevents;
        sessionObj["2013"][month][day]["t"] = sessionObj["2013"][month][day]["t"] + ttotal;
        sessionObj["2013"][month][day]["u"] = sessionObj["2013"][month][day]["u"] + tunique;
        sessionObj["2013"][month][day]["n"] = sessionObj["2013"][month][day]["n"] + tnew;
        sessionObj["2013"][month][day]["d"] = sessionObj["2013"][month][day]["d"] + tduration;
        sessionObj["2013"][month][day]["e"] = sessionObj["2013"][month][day]["e"] + tevents;
        sessionObj["2013"][month][day][hour]["t"] = sessionObj["2013"][month][day][hour]["t"] + ttotal;
        sessionObj["2013"][month][day][hour]["u"] = sessionObj["2013"][month][day][hour]["u"] + tunique;
        sessionObj["2013"][month][day][hour]["n"] = sessionObj["2013"][month][day][hour]["n"] + tnew;
        sessionObj["2013"][month][day][hour]["d"] = sessionObj["2013"][month][day][hour]["d"] + tduration;
        sessionObj["2013"][month][day][hour]["e"] = sessionObj["2013"][month][day][hour]["e"] + tevents;

        for (var o = 0; o < 12; o++) {
            userObj["2013"]["f"][o] = userObj["2013"]["f"][o] + Math.floor(tunique * ((12 - o) / 66));
            userObj["2013"][month]["f"][o] = userObj["2013"][month]["f"][o] + Math.floor(tunique * ((12 - o) / 66));
            userObj["2013"][month][day]["f"][o] = userObj["2013"][month][day]["f"][o] + Math.floor(tunique * ((12 - o) / 66));
            userObj["2013"][month][day][hour]["f"][o] = userObj["2013"][month][day][hour]["f"][o] + Math.floor(tunique * ((12 - o) / 66));
        }

        for (var r = 0; r < 9; r++) {
            userObj["2013"]["l"][r] = userObj["2013"]["l"][r] + Math.floor(tunique * ((9 - r) / 36));
            userObj["2013"][month]["l"][r] = userObj["2013"][month]["l"][r] + Math.floor(tunique * ((9 - r) / 36));
            userObj["2013"][month][day]["l"][r] = userObj["2013"][month][day]["l"][r] + Math.floor(tunique * ((9 - r) / 36));
            userObj["2013"][month][day][hour]["l"][r] = userObj["2013"][month][day][hour]["l"][r] + Math.floor(tunique * ((9 - r) / 36));
        }

        for (var r = 0; r < devices.length; r++) {
            if (!(deviceObj["2013"][devices[r]])) {
                deviceObj["2013"][devices[r]] = {};
            }

            if (!(deviceObj["2013"][month][devices[r]])) {
                deviceObj["2013"][month][devices[r]] = {};
            }

            if (!(deviceObj["2013"][month][day][devices[r]])) {
                deviceObj["2013"][month][day][devices[r]] = {};
            }
        }

        for (var r = 0; r < devices.length; r++) {
            deviceObj["2013"][devices[r]]["t"] = deviceObj["2013"][devices[r]]["t"] + Math.floor(ttotal / devices.length);
            deviceObj["2013"][devices[r]]["u"] = deviceObj["2013"][devices[r]]["u"] + Math.floor(tunique / devices.length);
            deviceObj["2013"][devices[r]]["n"] = deviceObj["2013"][devices[r]]["n"] + Math.floor(tnew / devices.length);

            deviceObj["2013"][month][devices[r]]["t"] = deviceObj["2013"][month][devices[r]]["t"] + Math.floor(ttotal / devices.length);
            deviceObj["2013"][month][devices[r]]["u"] = deviceObj["2013"][month][devices[r]]["u"] + Math.floor(tunique / devices.length);
            deviceObj["2013"][month][devices[r]]["n"] = deviceObj["2013"][month][devices[r]]["n"] + Math.floor(tnew / devices.length);

            deviceObj["2013"][month][day][devices[r]]["t"] = deviceObj["2013"][month][day][devices[r]]["t"] + Math.floor(ttotal / devices.length);
            deviceObj["2013"][month][day][devices[r]]["u"] = deviceObj["2013"][month][day][devices[r]]["u"] + Math.floor(tunique / devices.length);
            deviceObj["2013"][month][day][devices[r]]["n"] = deviceObj["2013"][month][day][devices[r]]["n"] + Math.floor(tnew / devices.length);
        }

        for (var r = 0; r < carriers.length; r++) {
            if (!(carrierObj["2013"][carriers[r]])) {
                carrierObj["2013"][carriers[r]] = {};
            }

            if (!(carrierObj["2013"][month][carriers[r]])) {
                carrierObj["2013"][month][carriers[r]] = {};
            }

            if (!(carrierObj["2013"][month][day][carriers[r]])) {
                carrierObj["2013"][month][day][carriers[r]] = {};
            }
        }

        for (var r = 0; r < carriers.length; r++) {
            carrierObj["2013"][carriers[r]]["t"] = carrierObj["2013"][carriers[r]]["t"] + Math.floor(ttotal / carriers.length);
            carrierObj["2013"][carriers[r]]["u"] = carrierObj["2013"][carriers[r]]["u"] + Math.floor(tunique / carriers.length);
            carrierObj["2013"][carriers[r]]["n"] = carrierObj["2013"][carriers[r]]["n"] + Math.floor(tnew / carriers.length);

            carrierObj["2013"][month][carriers[r]]["t"] = carrierObj["2013"][month][carriers[r]]["t"] + Math.floor(ttotal / carriers.length);
            carrierObj["2013"][month][carriers[r]]["u"] = carrierObj["2013"][month][carriers[r]]["u"] + Math.floor(tunique / carriers.length);
            carrierObj["2013"][month][carriers[r]]["n"] = carrierObj["2013"][month][carriers[r]]["n"] + Math.floor(tnew / carriers.length);

            carrierObj["2013"][month][day][carriers[r]]["t"] = carrierObj["2013"][month][day][carriers[r]]["t"] + Math.floor(ttotal / carriers.length);
            carrierObj["2013"][month][day][carriers[r]]["u"] = carrierObj["2013"][month][day][carriers[r]]["u"] + Math.floor(tunique / carriers.length);
            carrierObj["2013"][month][day][carriers[r]]["n"] = carrierObj["2013"][month][day][carriers[r]]["n"] + Math.floor(tnew / carriers.length);
        }

        for (var r = 0; r < countries.length; r++) {
            if (!(locationObj["2013"][countries[r]])) {
                locationObj["2013"][countries[r]] = {};
            }

            if (!(locationObj["2013"][month][countries[r]])) {
                locationObj["2013"][month][countries[r]] = {};
            }

            if (!(locationObj["2013"][month][day][countries[r]])) {
                locationObj["2013"][month][day][countries[r]] = {};
            }
        }

        for (var r = 0; r < countries.length; r++) {
            locationObj["2013"][countries[r]]["t"] = locationObj["2013"][countries[r]]["t"] + Math.floor(ttotal / countries.length);
            locationObj["2013"][countries[r]]["u"] = locationObj["2013"][countries[r]]["u"] + Math.floor(tunique / countries.length);
            locationObj["2013"][countries[r]]["n"] = locationObj["2013"][countries[r]]["n"] + Math.floor(tnew / countries.length);

            locationObj["2013"][month][countries[r]]["t"] = locationObj["2013"][month][countries[r]]["t"] + Math.floor(ttotal / countries.length);
            locationObj["2013"][month][countries[r]]["u"] = locationObj["2013"][month][countries[r]]["u"] + Math.floor(tunique / countries.length);
            locationObj["2013"][month][countries[r]]["n"] = locationObj["2013"][month][countries[r]]["n"] + Math.floor(tnew / countries.length);

            locationObj["2013"][month][day][countries[r]]["t"] = locationObj["2013"][month][day][countries[r]]["t"] + Math.floor(ttotal / countries.length);
            locationObj["2013"][month][day][countries[r]]["u"] = locationObj["2013"][month][day][countries[r]]["u"] + Math.floor(tunique / countries.length);
            locationObj["2013"][month][day][countries[r]]["n"] = locationObj["2013"][month][day][countries[r]]["n"] + Math.floor(tnew / countries.length);
        }

        for (var r = 0; r < os_versions.length; r++) {
            if (!(deviceDetails["2013"][os_versions[r]])) {
                deviceDetails["2013"][os_versions[r]] = {};
            }

            if (!(deviceDetails["2013"][month][os_versions[r]])) {
                deviceDetails["2013"][month][os_versions[r]] = {};
            }

            if (!(deviceDetails["2013"][month][day][os_versions[r]])) {
                deviceDetails["2013"][month][day][os_versions[r]] = {};
            }

            if (!(deviceDetails["2013"][resolutions[r]])) {
                deviceDetails["2013"][resolutions[r]] = {};
            }

            if (!(deviceDetails["2013"][month][resolutions[r]])) {
                deviceDetails["2013"][month][resolutions[r]] = {};
            }

            if (!(deviceDetails["2013"][month][day][resolutions[r]])) {
                deviceDetails["2013"][month][day][resolutions[r]] = {};
            }
        }

        for (var r = 0; r < os_versions.length; r++) {
            deviceDetails["2013"][os_versions[r]]["t"] = deviceDetails["2013"][os_versions[r]]["t"] + Math.floor(ttotal / os_versions.length);
            deviceDetails["2013"][os_versions[r]]["u"] = deviceDetails["2013"][os_versions[r]]["u"] + Math.floor(tunique / os_versions.length);
            deviceDetails["2013"][os_versions[r]]["n"] = deviceDetails["2013"][os_versions[r]]["n"] + Math.floor(tnew / os_versions.length);

            deviceDetails["2013"][month][os_versions[r]]["t"] = deviceDetails["2013"][month][os_versions[r]]["t"] + Math.floor(ttotal / os_versions.length);
            deviceDetails["2013"][month][os_versions[r]]["u"] = deviceDetails["2013"][month][os_versions[r]]["u"] + Math.floor(tunique / os_versions.length);
            deviceDetails["2013"][month][os_versions[r]]["n"] = deviceDetails["2013"][month][os_versions[r]]["n"] + Math.floor(tnew / os_versions.length);

            deviceDetails["2013"][month][day][os_versions[r]]["t"] = deviceDetails["2013"][month][day][os_versions[r]]["t"] + Math.floor(ttotal / os_versions.length);
            deviceDetails["2013"][month][day][os_versions[r]]["u"] = deviceDetails["2013"][month][day][os_versions[r]]["u"] + Math.floor(tunique / os_versions.length);
            deviceDetails["2013"][month][day][os_versions[r]]["n"] = deviceDetails["2013"][month][day][os_versions[r]]["n"] + Math.floor(tnew / os_versions.length);

            deviceDetails["2013"][resolutions[r]]["t"] = deviceDetails["2013"][resolutions[r]]["t"] + Math.floor(ttotal / resolutions.length);
            deviceDetails["2013"][resolutions[r]]["u"] = deviceDetails["2013"][resolutions[r]]["u"] + Math.floor(tunique / resolutions.length);
            deviceDetails["2013"][resolutions[r]]["n"] = deviceDetails["2013"][resolutions[r]]["n"] + Math.floor(tnew / resolutions.length);

            deviceDetails["2013"][month][resolutions[r]]["t"] = deviceDetails["2013"][month][resolutions[r]]["t"] + Math.floor(ttotal / resolutions.length);
            deviceDetails["2013"][month][resolutions[r]]["u"] = deviceDetails["2013"][month][resolutions[r]]["u"] + Math.floor(tunique / resolutions.length);
            deviceDetails["2013"][month][resolutions[r]]["n"] = deviceDetails["2013"][month][resolutions[r]]["n"] + Math.floor(tnew / resolutions.length);

            deviceDetails["2013"][month][day][resolutions[r]]["t"] = deviceDetails["2013"][month][day][resolutions[r]]["t"] + Math.floor(ttotal / resolutions.length);
            deviceDetails["2013"][month][day][resolutions[r]]["u"] = deviceDetails["2013"][month][day][resolutions[r]]["u"] + Math.floor(tunique / resolutions.length);
            deviceDetails["2013"][month][day][resolutions[r]]["n"] = deviceDetails["2013"][month][day][resolutions[r]]["n"] + Math.floor(tnew / resolutions.length);
        }

        for (var r = 0; r < os.length; r++) {
            if (!(deviceDetails["2013"][os[r]])) {
                deviceDetails["2013"][os[r]] = {};
            }

            if (!(deviceDetails["2013"][month][os[r]])) {
                deviceDetails["2013"][month][os[r]] = {};
            }

            if (!(deviceDetails["2013"][month][day][os[r]])) {
                deviceDetails["2013"][month][day][os[r]] = {};
            }
        }

        for (var r = 0; r < os.length; r++) {
            deviceDetails["2013"][month][os[r]]["t"] = deviceDetails["2013"][month][os[r]]["t"] + Math.floor(ttotal / os.length);
            deviceDetails["2013"][month][os[r]]["u"] = deviceDetails["2013"][month][os[r]]["u"] + Math.floor(tunique / os.length);
            deviceDetails["2013"][month][os[r]]["n"] = deviceDetails["2013"][month][os[r]]["n"] + Math.floor(tnew / os.length);

            deviceDetails["2013"][month][os[r]]["t"] = deviceDetails["2013"][month][os[r]]["t"] + Math.floor(ttotal / os.legth);
            deviceDetails["2013"][month][os[r]]["u"] = deviceDetails["2013"][month][os[r]]["u"] + Math.floor(tunique / os.length);
            deviceDetails["2013"][month][os[r]]["n"] = deviceDetails["2013"][month][os[r]]["n"] + Math.floor(tnew / os.length);

            deviceDetails["2013"][month][day][os[r]]["t"] = deviceDetails["2013"][month][day][os[r]]["t"] + Math.floor(ttotal / os.length);
            deviceDetails["2013"][month][day][os[r]]["u"] = deviceDetails["2013"][month][day][os[r]]["u"] + Math.floor(tunique / os.length);
            deviceDetails["2013"][month][day][os[r]]["n"] = deviceDetails["2013"][month][day][os[r]]["n"] + Math.floor(tnew / os.length);
        }

        for (var r = 0; r < app_versions.length; r++) {
            if (!(appVersions["2013"][app_versions[r]])) {
                appVersions["2013"][app_versions[r]] = {};
            }

            if (!(appVersions["2013"][month][app_versions[r]])) {
                appVersions["2013"][month][app_versions[r]] = {};
            }

            if (!(appVersions["2013"][month][day][app_versions[r]])) {
                appVersions["2013"][month][day][app_versions[r]] = {};
            }
        }

        for (var r = 0; r < app_versions.length; r++) {
            appVersions["2013"][app_versions[r]]["t"] = appVersions["2013"][app_versions[r]]["t"] + Math.floor(ttotal / app_versions.length);
            appVersions["2013"][app_versions[r]]["u"] = appVersions["2013"][app_versions[r]]["u"] + Math.floor(tunique / app_versions.length);
            appVersions["2013"][app_versions[r]]["n"] = appVersions["2013"][app_versions[r]]["n"] + Math.floor(tnew / app_versions.length);

            appVersions["2013"][month][app_versions[r]]["t"] = appVersions["2013"][month][app_versions[r]]["t"] + Math.floor(ttotal / app_versions.length);
            appVersions["2013"][month][app_versions[r]]["u"] = appVersions["2013"][month][app_versions[r]]["u"] + Math.floor(tunique / app_versions.length);
            appVersions["2013"][month][app_versions[r]]["n"] = appVersions["2013"][month][app_versions[r]]["n"] + Math.floor(tnew / app_versions.length);

            appVersions["2013"][month][day][app_versions[r]]["t"] = appVersions["2013"][month][day][app_versions[r]]["t"] + Math.floor(ttotal / app_versions.length);
            appVersions["2013"][month][day][app_versions[r]]["u"] = appVersions["2013"][month][day][app_versions[r]]["u"] + Math.floor(tunique / app_versions.length);
            appVersions["2013"][month][day][app_versions[r]]["n"] = appVersions["2013"][month][day][app_versions[r]]["n"] + Math.floor(tnew / app_versions.length);
        }

        for (var event in countlyDemo.eventsDb) {
            for (var ei=0; ei < countlyDemo.eventsDb[event].length; ei++) {
                var eventSegmentation = countlyDemo.eventsDb[event][ei]["_id"];
                if (eventSegments[eventSegmentation]) {
                    for (var ej=0; ej < eventSegments[countlyDemo.eventsDb[event][ei]["_id"]].length; ej++ ) {

                        countlyDemo.eventsDb[event][ei]["2013"][eventSegments[eventSegmentation][ej]]["c"] =
                            countlyDemo.eventsDb[event][ei]["2013"][eventSegments[eventSegmentation][ej]]["c"] + Math.floor(tnew / eventSegments[eventSegmentation].length);

                        countlyDemo.eventsDb[event][ei]["2013"][month][eventSegments[eventSegmentation][ej]]["c"] =
                            countlyDemo.eventsDb[event][ei]["2013"][month][eventSegments[eventSegmentation][ej]]["c"] + Math.floor(tnew / eventSegments[eventSegmentation].length);

                        countlyDemo.eventsDb[event][ei]["2013"][month][day][eventSegments[eventSegmentation][ej]]["c"] =
                            countlyDemo.eventsDb[event][ei]["2013"][month][day][eventSegments[eventSegmentation][ej]]["c"] + Math.floor(tnew / eventSegments[eventSegmentation].length);

                        countlyDemo.eventsDb[event][ei]["2013"][month][day][hour][eventSegments[eventSegmentation][ej]]["c"] =
                            countlyDemo.eventsDb[event][ei]["2013"][month][day][hour][eventSegments[eventSegmentation][ej]]["c"] + Math.floor(tnew / eventSegments[eventSegmentation].length);

                        if (event == "purchase") {
                            countlyDemo.eventsDb[event][ei]["2013"][eventSegments[eventSegmentation][ej]]["s"] =
                                countlyDemo.eventsDb[event][ei]["2013"][eventSegments[eventSegmentation][ej]]["s"] + Math.floor(ttotal / eventSegments[eventSegmentation].length);

                            countlyDemo.eventsDb[event][ei]["2013"][month][eventSegments[eventSegmentation][ej]]["s"] =
                                countlyDemo.eventsDb[event][ei]["2013"][month][eventSegments[eventSegmentation][ej]]["s"] + Math.floor(ttotal / eventSegments[eventSegmentation].length);

                            countlyDemo.eventsDb[event][ei]["2013"][month][day][eventSegments[eventSegmentation][ej]]["s"] =
                                countlyDemo.eventsDb[event][ei]["2013"][month][day][eventSegments[eventSegmentation][ej]]["s"] + Math.floor(ttotal / eventSegments[eventSegmentation].length);

                            countlyDemo.eventsDb[event][ei]["2013"][month][day][hour][eventSegments[eventSegmentation][ej]]["s"] =
                                countlyDemo.eventsDb[event][ei]["2013"][month][day][hour][eventSegments[eventSegmentation][ej]]["s"] + Math.floor(ttotal / eventSegments[eventSegmentation].length);
                        }
                    }
                }

                countlyDemo.eventsDb[event][ei]["2013"]["c"] =
                    countlyDemo.eventsDb[event][ei]["2013"]["c"] + Math.floor(tnew);

                countlyDemo.eventsDb[event][ei]["2013"][month]["c"] =
                    countlyDemo.eventsDb[event][ei]["2013"][month]["c"] + Math.floor(tnew);

                countlyDemo.eventsDb[event][ei]["2013"][month][day]["c"] =
                    countlyDemo.eventsDb[event][ei]["2013"][month][day]["c"] + Math.floor(tnew);

                countlyDemo.eventsDb[event][ei]["2013"][month][day][hour]["c"] =
                    countlyDemo.eventsDb[event][ei]["2013"][month][day][hour]["c"] + Math.floor(tnew);

                if (event == "purchase") {
                    countlyDemo.eventsDb[event][ei]["2013"]["s"] =
                        countlyDemo.eventsDb[event][ei]["2013"]["s"] + Math.floor(ttotal);

                    countlyDemo.eventsDb[event][ei]["2013"][month]["s"] =
                        countlyDemo.eventsDb[event][ei]["2013"][month]["s"] + Math.floor(ttotal);

                    countlyDemo.eventsDb[event][ei]["2013"][month][day]["s"] =
                        countlyDemo.eventsDb[event][ei]["2013"][month][day]["s"] + Math.floor(ttotal);

                    countlyDemo.eventsDb[event][ei]["2013"][month][day][hour]["s"] =
                        countlyDemo.eventsDb[event][ei]["2013"][month][day][hour]["s"] + Math.floor(ttotal);
                }
            }
        }

        countlyDemo.sessionDb = sessionObj;
        countlyDemo.userDb = userObj;
        countlyDemo.deviceDb = deviceObj;
        countlyDemo.carrierDb = carrierObj;
        countlyDemo.locatonDb = locationObj;
        countlyDemo.deviceDetailDb = deviceDetails;
        countlyDemo.appVersionDb = appVersions;
    }

}(window.countlyDemo = window.countlyDemo || {}));