"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var bodyParser = __importStar(require("body-parser"));
var path = __importStar(require("path"));
var App = /** @class */ (function () {
    function App(controllers, port) {
        this.app = express_1.default();
        this.port = port;
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
    }
    App.prototype.initializeMiddlewares = function () {
        this.app.use(bodyParser.json());
    };
    App.prototype.initializeControllers = function (controllers) {
        var _this = this;
        controllers.forEach(function (controller) {
            _this.app.use('/', controller.router);
        });
    };
    App.prototype.listen = function () {
        // this.app.get('/', (req, res) => res.send('Hello World!'))
        var _this = this;
        this.app.use(express_1.default.static(path.join(__dirname, '/../../frontend/dist')));
        this.app.get('*', function (req, res) {
            console.log('req', req);
            res.sendFile(path.join(__dirname, '/../../frontend/dist', 'index.html'));
        });
        this.app.listen(this.port, function () {
            console.log("App listening on the port " + _this.port);
        });
    };
    return App;
}());
exports.default = App;
