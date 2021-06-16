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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const data_1 = __importDefault(require("./models/data"));
const endpoints_1 = __importDefault(require("./endpoints"));
const app = express_1.default();
const port = process.env.PORT || 3000;
app.use(body_parser_1.default.json());
app.get('/', (_, res) => {
    res.send('Hello World!');
});
app.use(endpoints_1.default);
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*')
});

if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect('mongodb://localhost:27019/feedbackly', { useNewUrlParser: true, useUnifiedTopology: true });
            console.log(`Example app listening at http://localhost:${port}`);
            const datas = yield data_1.default.countDocuments();
            console.log(`setup done properly? ${datas === 1000}`);
        }
        catch (e) {
            console.error("Trouble connecting to Mongo. Is it running?");
            process.exit(1);
        }
    }));
}
//# sourceMappingURL=index.js.map