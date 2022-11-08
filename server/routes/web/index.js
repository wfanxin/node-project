module.exports = app => {
    const express = require('express')
    const Category = require('../../models/Category')
    const Article = require('../../models/Article')

    const router = express.Router({
        mergeParams: true // 为了在router中能拿到params
    })

    router.get('/news/list', async (req, res) => {
        const parent = await Category.findOne({
            name: '新闻分类'
        })

        const cats = await Category.aggregate([
            { $match: {parent: parent._id}},
            {
                $lookup: {
                    from: 'articles',
                    localField: '_id',
                    foreignField: 'categories',
                    as: 'newsList'
                }
            },
            {
                $addFields: {
                    newsList: { $slice: ['$newsList', 5] }
                }
            }
        ])

        const subCats = cats.map(v => v._id)
        cats.unshift({
            name: '热门',
            newsList: await Article.find().where({
                categories: { $in: subCats }
            }).limit(5).lean()
        })

        cats.map(cat => {
            cat.newsList.map(news => {
                console.log(news.categories[0].name)
                news.CategoryName = (cat.name === '热门') ? news.categories[0].name : cat.name
                return news
            })
            return cat
        })

        res.send(cats)
    })

    app.use('/web/api', router)
}