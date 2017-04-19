/**
 * Created by junior on 2017/3/22.
 */
$(function () {
    var params = [];
    //var org = getUrlParam("org");
    //var secret = getUrlParam("secret");
    //OpenAPI.login(org, secret, function () {
    //    OpenAPI.invoke("sys.listModule", {code: org}, function (out) {
    //        showList(out, $('.pay-body table tbody'))
    //    });
    //});
    var selected = [];
    dropDownList();
    $(".totalPirce").text("0");
    $(".count").text("0");
	
	$(".begin .date").text(formatDate(0));
    $(".end .date").text(formatDate(0));

    $(document).on("click", ".expiryTime", function () {
        params = [];
        selected = [];
        var price = 0;
        var list = $("tbody ul");
        var days = 0;
        var self = $(this);
        var mprice = Number(self.attr("price"));
        var buyId = self.attr("buyId");
        self.closest(".js-drop-cont").find(".drop-search-keyword").attr("buyId", buyId);
        self.closest("tr").find(".price").empty().html(mprice);
        var j = 0;//用来判断是否最后一个1天or1月...
        for (var i = 0; i < list.length; ++i) {//遍历tbody下的下拉框

            price += Number($("tbody tr").eq(i).find(".price").text() || 0);
            var d = $("tbody tr .drop-search-keyword").eq(i).val();
            if (d == "1天") {
                days = 1;
            } else if (d == "1月") {
                days = 30;
            } else if (d == "6月") {
                days = 180;
            } else if (d == "1年") {
                days = 360;
            } else {//tbody下的下拉框都选择“未选择”,thead的也变成“未选择”
                days = 0;
                j += 1;
                if (j == list.length) {
                    selected.splice(0, selected.length);
                    $(".count").text(0);
                    $("thead .drop-search-keyword").val("未选择");
                }
            }
            var endDate = formatDate(days);
            $("tbody tr:eq(" + i + ")").find(".end").text("止:" + endDate);
            selectModule(i, selected);
        }
        $(".totalPirce").text(hlib.MathUtil.round(price, 2));
     
        $(".count").text(params.length);
    });

    $(document).on("click", ".drop-i", function () {
        selected = [];
        var self = $(this);
        var price = 0;
        var list = $("tbody ul");
        $("tbody .drop-search-keyword").val("未选择");
        $(".price").text(0);
        var index = 0;
        var temp = self.text();
        if (temp == "1天") {
            index = 1;
        } else if (temp == "1月") {
            index = 2;
        } else if (temp == "6月") {
            index = 3;
        } else if (temp == "1年") {
            index = 4;
        }
        var j = 0;
        for (var i = 0; i < list.length; ++i) {

            if (list[i].innerText.indexOf(temp) > -1) {
                $("tbody .drop-search-keyword:eq(" + i + ")").val(temp);
                $("tbody ul:eq(" + i + ") li:eq(" + index + ")").click();
                price += Number($("tbody ul:eq(" + i + ") li:eq(" + index + ")").attr("price"));
            }else{
                j++;
            }
            if(j == list.length){
                $(".count").text(0);
            }
        }
        $(".totalPirce").text(hlib.MathUtil.round(price, 2));

    });

    $(document).on("click", ".pay", function () {
        
        var payNum = 0;
        payNum = $(".totalPirce").text();
        if (payNum == 0)
            return;
		console.log("我不想和你说话")
		window.location.href = "./qrCode.html";
        //OpenAPI.invoke("sys.getQrCode", {price: payNum, params: params, token: OpenAPI.token}, function (success) {
        //    window.location.href = "./qrCode.html?payUrl=" + encodeURIComponent(success.payUrl) + "&orderNo=" + success.orderNo + "&amount=" + success.amount;
        //});
    });

    function selectModule(i, selected) {

        var module = $("tbody tr").eq(i);
        if (module.find(".drop-search-keyword").val().indexOf("未选择") == -1) {
            var m = {};
            m.mid = module.find("td").eq(0).attr("mid");
            m.buyId = module.find("input").attr("buyId");
            m.name = module.find("td").eq(0).attr("name");
            m.beginDate = module.find(".begin").text().trim().substr(2, 10);
            m.endDate = module.find(".end").text().trim().substr(2, 10);
            m.mtime = module.find(".drop-search-keyword").val();
            m.mprice = module.find(".price").text();
            if (m.mprice != 0)
                params.push(m);
        }
        if ($("thead .drop-search-keyword").val().indexOf("未选择") == 0) {
            selected.legend = 0;
            $(".count").text(0);
        }
    }

});

function showList(data, target) {
    var module = '\
                {{each  as value i}}\
                   <tr>\
                       <td mid="{{value.id}}" name="{{value.name}}" class="t-module">\
                            {{value.name}}\
                            <p>{{value.memo}}</p>\
                       </td>\
                       <td>\
                           <p class="begin">\
                              <span>起:</span><span class="date"></span>\
                           </p>\
                           <p class="end">\
                              <span>止:</span><span class="date"></span>\
                           </p>\
                       </td>\
                       <td class="down">\
                         <div class="drop-down-list">\
                           <div class="js-drop-cont">\
                                <input type="text" placeholder="未选择" class="text drop-search-keyword"/>\
                                <i class="icon-drop-down"></i>\
                                <ul class="drop-cont-list">\
                                    <li class="expiryTime" price="0" buyId="0">未选择</li>\
                                {{each value.time as item}}\
                                    <li class="expiryTime" price="{{item.price}}" buyId="{{item.id}}">{{item.name}}</li>\
                                {{/each}}\
                                </ul>\
                            </div>\
                         </div>\
                       </td>\
                       <td class="dprice">\
                           <div class="price">0</div><span>元</span>\
                       </td>\
                   </tr>\
                {{/each}}\
            ';
    var html = utils.renderTemplate(module, data);
    target.empty().append(html);
    var beginDate = formatDate(0);
    
}

function formatDate(day) {
    var time = new Date();
    time = time.valueOf() + day * 24 * 60 * 60 * 1000;
    time = new Date(time);
    var y = time.getFullYear();
    var m = (time.getMonth() + 1) > 9 ? time.getMonth() : "0" + (time.getMonth() + 1);
    var d = time.getDate() > 9 ? time.getDate() : "0" + time.getDate();
    var today = y + "-" + m + "-" + d;
    return today;
}