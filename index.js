'use strict';

var _ = require('underscore')._;

(function(search) {

	search.categorySummary = function(results, callback){
		results.results.resultsInCategoryCount = _.chain(results.results.posts)
			.map(function(post){
				post.content = JSON.parse(_.unescape(post.content));
				if(typeof post.content !== "string"){
					var content = '';
					_.each(post.content, function(partial, key){
						content += key + ': ' + partial + '<br>';
					});
					post.content = content;
				}
				return post;
			})
			.countBy(function(post){ return post.category.name;})
			.map(function(count, categoryName){ 
				var category = _.findWhere(results.results.categories, {name: categoryName});
				return {
					cid: category.cid,
					category: category.name,
					count: count
				};
			})
			.value();
		results.results.search_query_escaped = escape(results.results.search_query);

		callback(null, results);
	}

}(module.exports));
