const apisRouter = require('express').Router();
const Api = require('../models/api');

apisRouter.get('/', async (req, res) => {
    try {
        const filter = {};

        if (req.query.category) filter.category = { $in: req.query.category };
        if (req.query.auth && req.query.auth !== 'any') filter.auth = req.query.auth === 'no' ? { $eq: '' } : { $ne: '' };
        if (req.query.https && req.query.https !== 'any') filter.https = Boolean(req.query.https);
        if (req.query.cors && req.query.cors !== 'any') filter.cors = req.query.cors;
        if (req.query.text) {
            const regex = { $regex: new RegExp(req.query.text) };
            filter.$or = [
                { title: regex },
                { auth: regex },
                { description: regex },
                { url: regex },
                { category: regex },
            ];
        }

        const skip = Number(req.query.skip) || 0;
        const limit = Number(req.query.limit) || Number(process.env.DEFAULT_LIMIT);

        let query = Api.aggregate([
            { $match: filter },
            {
                $facet: {
                    totalRecords: [{ $count: "total" }],
                    entries: [
                        { $skip: skip },
                        { $limit: limit }
                    ]
                }
            },
            {
                $project: {
                    totalRecords: { $arrayElemAt: ["$totalRecords.total", 0] },
                    entries: 1
                }
            },
        ]).collation({ locale: 'en', strength: 1 });

        const apis = await query.exec();
        return res.json(apis[0]);
    } catch (error) {
        return res.status(400).json({ message: 'Request not valid' });
    }
})

module.exports = apisRouter;
