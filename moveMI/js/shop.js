var goods = JSON.parse(window.localStorage.getItem('detail')) || JSON.parse(window.localStorage.getItem('detailTop'));
// 把上一次的商品信息给存储到本地
window.localStorage.setItem('detailTop',JSON.stringify(goods));
console.log(goods);
var ption = document.querySelector('.ption');
var header = document.querySelector('header');
var footer = document.querySelector('footer');

var id = goods.id;

// 点击到详情页以后 把原本的本地存储删除
window.localStorage.removeItem('detail')
// 这个渲染只需要在刚点开页面的时候执行
function bindHtml() {
    ption.innerHTML = template('pt', {
        goods: goods
    })
}
bindHtml()


// 滚动到一定距离 显示顶部的ul
window.addEventListener('scroll', function (e) {
    e = e || window.event;
    if (document.documentElement.scrollTop > 200) {
        header.classList.add('header')
    } else {
        header.classList.remove('header')
    }
})

// 从本地获取到数据来判断用户购物车里有没有东西
var list = JSON.parse(window.localStorage.getItem('phone')) || [];
console.log(list);
function copyHtml() {
    var numberAll = 0;
    if (!list.length) {   //list里面没有数据
        numberAll = 0;
    } else {  //list里面有数据
        list.forEach(function (t) {
            numberAll += t.number;
        })
    }

    footer.innerHTML = template('ft', {
        numberAll: numberAll,
        id: id
    })
}

copyHtml()

footer.addEventListener('click', function (e) {
    e = e || window.event;
    var target = e.target || e.srcElement;

    if (target.className === 'box') {
        var good = dataList.find(function (t) { return t.id === id });
        var res = list.some(function(item) { return item.id === good.id }); 
        if(res){  //已经有这个数据了
            var index = list.findIndex(function(t){return t.id === good.id});
            console.log(index);
            list[index].number++;
        }else{  //没有这个数据
            // 把目前的商品数据添加到 list 里
            good.number++;
            list.push(good);
            
        }
        
    }
    copyHtml()
    window.localStorage.setItem('phone',JSON.stringify(list))


    if(target.className === 'box-a'){
        alert('请付款')
    }

    if(target.parentNode.className === 'fon'){
        window.open('./cart.html','_self');
    }
})

window.addEventListener('click',function(e){
    e = e || window.event;
    var target = e.target || e.srcElement;
    if(target.parentNode.className === 'blak'){
        window.history.go(-1);
        console.log('555');
    }
})
