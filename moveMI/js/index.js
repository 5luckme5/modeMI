var cartBox = document.querySelector('.cart');
var footer = document.querySelector('footer');

console.log(footer);
console.log(cartBox);

function bindHtml(){
    // var list = dataList;
  
    cartBox.innerHTML = template('cart',{
        list:dataList
    })

    var list = JSON.parse(window.localStorage.getItem('phone')) || [];
    var cartLength = 0;
    console.log(!list.length);
    if(!list.length){
        cartLength = 0;
        
    }else{
        console.log(list);
        list.forEach(function(t){
            cartLength += t.number;
        })
    }
    
    footer.innerHTML = template('fo',{
        cartLength:cartLength
    })
}
bindHtml();

cartBox.addEventListener('click',function(e){
    e = e || window.event;
    var target = e.target || e.srcElement;
    if(!(target.className === 'cart-box' || target.parentNode.className === 'cart-box'))  return;
    if(target.nodeName === 'IMG') return;

    var id = (target.dataset.id || target.parentNode.dataset.id) - 0;
    console.log(id);
    var goods = dataList.find(function(t){return t.id === id});
    console.log(goods);

    // 从本地存储中获取数据
    var list = JSON.parse(window.localStorage.getItem('phone')) || [];
    console.log(!list.length);
    if(!list.length){  //数组里面没有数据
        console.log('空数组');

        goods.number++;
        list.push(goods);
    }else{  //数组里面有数据
        var res = list.some(function(t){return t.id === id});

        if(res){ // 数组里面有这个数据
            var index = list.findIndex(function(t){return t.id === id});
            list[index].number++;
        }else{ //数组里面没有这个数据
            goods.number++;
            list.push(goods);
        }
        
    }
    console.log(list);
    window.localStorage.setItem('phone',JSON.stringify(list));

    bindHtml()
})


cartBox.addEventListener('click',function(e){
    e = e || window.event;
    var target = e.target || e.srcElement;

    // 如果点击的不是图片 就返回
    if(!(target.nodeName === 'IMG'))  return;

    var id = (target.parentNode.dataset.id) - 0;
    console.log(id); 
    var goods = dataList.find(function(t){return t.id === id})
    console.log(goods);
    // 把数据存在本地
    window.localStorage.setItem('detail',JSON.stringify(goods));

    window.open("./Shopping.html",'_self')
})

window.addEventListener('click',function(e){
    e = e || window.event;
    var target = e.target || e.srcElement;

    if(target.parentNode.className === 'car-s'){
        console.log('111');
        window.open('./cart.html','_self');
    }
})
























