var express = require('express')
var Product = require('../models/product') //获取模型
var Comment =require('../models/comment')
var Catetory = require('../models/catetory')
var Label = require('../models/label')
var Brand = require('../models/brand')
var _ = require('underscore')
var fs = require('fs')
var path = require('path')
var mongoose = require('mongoose')

exports.cat_brand_label = function(id,old_catId,new_catId,old_brandId,new_brandId,old_labelId,new_labelId,productObj,_product){//修改商品时，更新分类、品牌、标签里的products id

	if(old_catId !== new_catId){						
		Catetory.update({'_id':old_catId},{'$pull':{'products':id}},function(){
			Catetory.findById(new_catId,function(err,catetory){
				if(err){
					console.log(err)
				}
				else{
					console.log('111111111111111111111111111111')
					console.log(catetory)
					catetory.products.push(id)
					catetory.save(function(err,catetory){
					})
				}
				
			})
		})				
	}
	if(old_brandId !== new_brandId){						
		Brand.update({'_id':old_brandId},{'$pull':{'products':id}},function(){
			Brand.findById(new_brandId,function(err,brand){
				brand.products.push(id)
				brand.save(function(err,brand){
				})
			})
		})				
	}
	if(old_labelId !== new_labelId){						
		Label.update({'_id':old_labelId},{'$pull':{'products':id}},function(){
			Label.findById(new_labelId,function(err,label){
				label.products.push(id)
				label.save(function(err,label){
				})
			})
		})				
	}
}

