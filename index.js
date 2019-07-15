"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var Parser = require("rss-parser");
var express = require("express");
var axios = require("axios");
var cheerio = require("cheerio");
var getRSSFeed = function (team) { return __awaiter(_this, void 0, void 0, function () {
    var p, feed, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                p = new Parser();
                feed = null;
                if (!!team) return [3 /*break*/, 2];
                return [4 /*yield*/, p.parseURL("https://www.calciomercato.com/feed")];
            case 1:
                feed = _a.sent();
                return [3 /*break*/, 5];
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, p.parseURL("https://www.calciomercato.com/feed/teams/" + team)];
            case 3:
                feed = _a.sent();
                return [3 /*break*/, 5];
            case 4:
                e_1 = _a.sent();
                feed = e_1;
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/, feed];
        }
    });
}); };
var getArticleImage = function (link) { return __awaiter(_this, void 0, void 0, function () {
    var HTML, $, IMG_LINK;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, axios.get(link)];
            case 1:
                HTML = _a.sent();
                HTML = HTML.data;
                $ = cheerio.load(HTML);
                IMG_LINK = $("#article-header__picture").attr("src");
                return [2 /*return*/, IMG_LINK];
        }
    });
}); };
var getArticleContent = function (link) { return __awaiter(_this, void 0, void 0, function () {
    var HTML, $, articleContent;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, axios.get(link)];
            case 1:
                HTML = _a.sent();
                HTML = HTML.data;
                $ = cheerio.load(HTML);
                articleContent = $("#article-body").text();
                return [2 /*return*/, articleContent];
        }
    });
}); };
var addImageToList = function (_a) {
    var items = _a.items;
    return __awaiter(_this, void 0, void 0, function () {
        var newArray;
        var _this = this;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, Promise.all(items.map(function (item) { return __awaiter(_this, void 0, void 0, function () {
                        var IMG_URL;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, getArticleImage(item.link)];
                                case 1:
                                    IMG_URL = _a.sent();
                                    return [2 /*return*/, __assign({}, item, { img_url: IMG_URL })];
                            }
                        });
                    }); }))];
                case 1:
                    newArray = _b.sent();
                    return [4 /*yield*/, newArray];
                case 2: return [2 /*return*/, _b.sent()];
            }
        });
    });
};
var app = express();
app.get("/all", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var articleList, articleListIMG, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, getRSSFeed()];
            case 1:
                articleList = _c.sent();
                return [4 /*yield*/, addImageToList(articleList)];
            case 2:
                articleListIMG = _c.sent();
                _b = (_a = res).send;
                return [4 /*yield*/, articleListIMG];
            case 3:
                _b.apply(_a, [_c.sent()]);
                return [2 /*return*/];
        }
    });
}); });
app.get("/teams/:team", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var team, articleList, articleListIMG, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                team = req.params.team;
                return [4 /*yield*/, getRSSFeed(team)];
            case 1:
                articleList = _c.sent();
                return [4 /*yield*/, addImageToList(articleList)];
            case 2:
                articleListIMG = _c.sent();
                _b = (_a = res).send;
                return [4 /*yield*/, articleListIMG];
            case 3:
                _b.apply(_a, [_c.sent()]);
                return [2 /*return*/];
        }
    });
}); });
app.get("/articles", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var link, article, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                link = req.query.link;
                if (!link)
                    res.sendStatus(404);
                _a = {};
                return [4 /*yield*/, getArticleContent(link)];
            case 1:
                _a.content = _b.sent();
                return [4 /*yield*/, getArticleImage(link)];
            case 2:
                article = (_a.img_url = _b.sent(),
                    _a);
                res.send(article);
                return [2 /*return*/];
        }
    });
}); });
app.listen(3000, function () { return console.log("Listening on 3000"); });
