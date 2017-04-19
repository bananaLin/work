//下拉框模版
var dropDownList = function(){
    $(document).on("click", ".drop-search-keyword", function () {
        var self = $(this);
        self.siblings(".drop-cont-list").slideDown();
        self.closest('.js-drop-cont').addClass('current');
        self.siblings('i.icon-drop-down').addClass('current');
    });
    $(document).on("click", "i.icon-drop-down", function () {
        var self = $(this);
        self.closest("div").find(".drop-search-keyword").click();
    });
    //点击下拉项
    $(document).on("click", "ul.drop-cont-list li", function () {
        var self = $(this);
        self.parent().find("li").removeClass("current");
        self.addClass('current');
        self.closest(".js-drop-cont").find("input.drop-search-keyword").val(self.text());
        self.closest('.js-drop-cont').find(".drop-cont-list").slideUp();
        self.closest('.js-drop-cont').removeClass('current');
        self.closest('i.icon-drop-down').removeClass('current');
    });
    //点击 非本身  或  本身父级内任何元素 的区域，关闭下拉框
    $('body').click(function (event) {
    	var self = $(this);
        if (!($(event.target).closest('.js-drop-cont').hasClass('current') || $(event.target).hasClass('js-drop-cont'))) {
        	$(".drop-cont-list").slideUp();
            $('.js-drop-cont').removeClass('current');
            $('i.icon-drop-down').removeClass('current');
        }
    });
}
//清除下拉框自动完成
var disautoCompleter = function(target){
	$(target).off("keyup", target);
}
//下拉框自动完成  （下拉框模块div名，数据源，用作对应数据库字段的值，参考商家分析页面的下拉框）
var autoCompleter = function(target,data,data2){
	$(target).on("keyup", target, function () {
		autoCompleterControl(target,data,data2);
	});
}