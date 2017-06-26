new Vue({
    el:'#cart',
    data:function(){
    	return {
    		cost:15972,
    		count:6,
    		goods:[{'count':1,'price':135,'show':true,'src':'./image/yal.jpg','desc':'诚悦运动健身组合电镀哑铃20公斤kg礼盒CY-025赠手套护腕连接器'},
    		{'count':1,'price':22,'show':true,'src':'./image/zhe.jpg','desc':'丝蕴（syoss）持久定型强力造型啫喱膏150ml（持久定型，保湿）（新老包装随机发放）'},
    		{'count':1,'price':69,'show':true,'src':'./image/jip.jpg','desc':'雷柏（Rapoo） X221 无线鼠标键盘套装 无线键盘鼠标套装 无线键鼠套装 电脑键'},
    		{'count':1,'price':2499,'show':true,'src':'./image/nova.jpg','desc':' nova'},
    		{'count':1,'price':249,'show':true,'src':'./image/tix.jpg','desc':' 剃须刀'},
    		{'count':1,'price':12998,'show':true,'src':'./image/mac.jpg','desc':' Apple MacBook Pro 13.3英寸笔记本电脑 深空灰色（Multi-Touch Bar/Core i5/8GB/256GB MLH12CH/A）'}]
    	}
    },
    computed: {
    	/*cost:function(goods){
    		for(let i;i<goods.length;++i){
    			console.log(goods[i].count)
    		}
    	}*/
    },
    methods:{
 	check(){

 	},
 	add(item){
 		item.count+=1;
 		this.cal()
 	},
 	sub(item){
 		if(item.count>1){
 			item.count-=1;
 		}
 		else if(item.count ==1){
 			layer.msg("移除了此商品");
 			item.show = false
 		}
 		this.cal()
 	},
 	cal(){
 		this.count = 0;
 		this.cost = 0;
 		var item = this.goods;
 		for(let i=0;i<item.length;++i){
 			if(item[i].show){
 				this.count += item[i].count;
 				this.cost += item[i].count * item[i].price
 			}
 		} 
 	}
    }
});
 