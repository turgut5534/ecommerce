const cache = require('memory-cache');
const Category = require('../models/category')

const addVariable = async(req,res,next) => {
    
    try {

        const cachedCategories = cache.get('cachedCategories');

        if(cachedCategories) {
            res.locals.cachedCategories = cachedCategories
        } else {
    
            const categories = await Category.findAll()
    
            res.locals.cachedCategories = categories
    
            cache.put('cachedCategories', categories, 10000 )
    
        }

        next()
       
    
    } catch(e) {
        console.log(e)
    }

}

module.exports = addVariable