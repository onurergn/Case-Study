"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const DATA = __importDefault(require("../models/data"));
const delay = () => new Promise(resolve => setTimeout(resolve, 3000));
router.get("/emoticon-average", (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.setHeader('Access-Control-Allow-Origin', '*')
    // Get the average value of emoticons using the Mongo aggregation pipeline
    yield delay();
    //res.json({ average: 0, total: 0 });
    DATA.default.aggregate([
        {
            $match: {
                type: 'Emoticon'
            }
        },
        {
            $group: {
                _id: '$type',
                average: {
                    $avg: "$value"
                },
                total: {
                    $sum: 1
                }
            }
        }
    ]).then((data) => {
        if(!data) res.json(null);
        res.json(data[0]);
    }).catch((err) => {
        res.json(err);
    });

}));
router.get("/nps-groups", (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.setHeader('Access-Control-Allow-Origin', '*')
    // Get the number of NPS responses per group using the Mongo aggregation pipeline
    yield delay();
    //res.json({ promoters: 0, detractors: 0, passives: 0, total: 0 });
    DATA.default.aggregate([
        {
            $facet: {
                'Total': [
                    {
                        $match: {
                            type: 'NPS'
                        }
                    },
                    {
                        $count: 'Total'
                    }
                ],
                'Prometers': [
                    {
                        $match: {
                            type: 'NPS',
                            value: {
                                $gte: 9,
                                $lte: 10
                            }
                        }
                    },
                    {
                        $count: 'Prometers'
                    }
                ],
                'Detractors': [
                    {
                        $match: {
                            type: 'NPS',
                            value: {
                                $gte: 0,
                                $lte: 6
                            }
                        }
                    },
                    {
                        $count: 'Detractors'
                    }
                ],
                'Passives': [
                    {
                        $match: {
                            type: 'NPS',
                            value: {
                                $gte: 7,
                                $lte: 8
                            }
                        }
                    },
                    {
                        $count: 'Passives'
                    }
                ]
            }
        },
        {
            $project: {
                'Total': { $arrayElemAt: ['$Total.Total', 0] },
                'Prometers': { $arrayElemAt: ['$Prometers.Prometers', 0] },
                'Detractors': { $arrayElemAt: ['$Detractors.Detractors', 0] },
                'Passives': { $arrayElemAt: ['$Passives.Passives', 0] },
            }
        }
    ]).then((data) => {
        if(!data) res.json(null);
        res.json(data[0]);
    }).catch((err) => {
        res.json(err);
    });

}));
router.get("/nps-score", (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.setHeader('Access-Control-Allow-Origin', '*')
    // BONUS! Calculate NPS score from nps groups
    yield delay();
    //res.json({ score: 0 });

    DATA.default.aggregate([
        {
            $facet: {
                'Total': [
                    {
                        $match: {
                            type: 'NPS',
                            value: {
                                $in: [0, 1, 2, 3, 4, 5, 6, 9, 10]
                            }
                        }
                    },
                    {
                        $count: 'Total'
                    }
                ],
                'Prometers': [
                    {
                        $match: {
                            type: 'NPS',
                            value: {
                                $gte: 9,
                                $lte: 10
                            }
                        }
                    },
                    {
                        $count: 'Prometers'
                    }
                ],
                'Detractors': [
                    {
                        $match: {
                            type: 'NPS',
                            value: {
                                $gte: 0,
                                $lte: 6
                            }
                        }
                    },
                    {
                        $count: 'Detractors'
                    }
                ]
            }
        },
        {
            $project: {
                'Total': { $arrayElemAt: ['$Total.Total', 0] },
                'Prometers': { $arrayElemAt: ['$Prometers.Prometers', 0] },
                'Detractors': { $arrayElemAt: ['$Detractors.Detractors', 0] },
                'PrometersPercentage': { $multiply: [{ $divide: [{ $arrayElemAt: ['$Prometers.Prometers', 0] }, { $arrayElemAt: ['$Total.Total', 0] }] }, 100] },
                'DetractorsPercentage': { $multiply: [{ $divide: [{ $arrayElemAt: ['$Detractors.Detractors', 0] }, { $arrayElemAt: ['$Total.Total', 0] }] }, 100] },
                'Score': {
                    $subtract: [
                        {
                            $multiply: [
                                {
                                    $divide: [
                                        {
                                            $arrayElemAt: ['$Prometers.Prometers', 0]
                                        },
                                        {
                                            $arrayElemAt: ['$Total.Total', 0]
                                        }
                                    ]
                                }, 100
                            ]
                        },
                        {
                            $multiply: [
                                {
                                    $divide: [
                                        {
                                            $arrayElemAt: ['$Detractors.Detractors', 0]
                                        },
                                        {
                                            $arrayElemAt: ['$Total.Total', 0]
                                        }
                                    ]
                                }, 100
                            ]
                        }
                    ]
                }

            }
        }
    ]).then((data) => {
        if(!data) res.json(null);
        res.json(data[0]);
    }).catch((err) => {
        res.json(err);
    });

}));

exports.default = router;
//# sourceMappingURL=index.js.map


