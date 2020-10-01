"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PubSubService = void 0;
var pubsub_1 = require("@google-cloud/pubsub");
var uuid = require("uuid/v1");
var PubSubService = (function () {
    function PubSubService(keyFile, projectId, subId) {
        this.keyFile = keyFile;
        this.projectId = projectId;
        this.subId = subId;
        this.init();
    }
    PubSubService.prototype.unsubscribe = function () {
        return __awaiter(this, void 0, void 0, function () {
            var topic, sub;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.pubSub.topic(this.topic)];
                    case 1:
                        topic = _a.sent();
                        return [4, topic.subscription(this.session)];
                    case 2:
                        sub = _a.sent();
                        return [4, sub.delete()];
                    case 3:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    PubSubService.prototype.subscribe = function (topicName, sessionId, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var topic, subscription;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.createSession(sessionId, topicName)];
                    case 1:
                        _a.sent();
                        return [4, this.pubSub.topic(this.topic)];
                    case 2:
                        topic = _a.sent();
                        return [4, topic.subscription(this.session)];
                    case 3:
                        subscription = _a.sent();
                        subscription.on("message", function (msg) {
                            var data = _this.getPubSubData(msg);
                            msg.ack();
                            callback(data);
                        });
                        return [2];
                }
            });
        });
    };
    PubSubService.prototype.getPubSubData = function (raw) {
        var json = Buffer.from(raw.data, "base64").toString();
        return JSON.parse(json);
    };
    PubSubService.prototype.createSession = function (id, topic) {
        return __awaiter(this, void 0, void 0, function () {
            var sub;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.topic = topic;
                        sub = "sub-" + uuid();
                        return [4, this.pubSub.topic(this.topic).createSubscription(sub)];
                    case 1:
                        _a.sent();
                        this.session = sub;
                        return [2];
                }
            });
        });
    };
    PubSubService.prototype.init = function () {
        this.pubSub = new pubsub_1.PubSub({
            projectId: this.projectId,
            keyFilename: this.keyFile
        });
    };
    return PubSubService;
}());
exports.PubSubService = PubSubService;
