// 从本地存储中获取到数据
var list = JSON.parse(window.localStorage.getItem('phone')) || [];
console.log(Boolean(list.length));
var cartBox = document.querySelector('.cart');
var edit = document.querySelector('.edit');
var manage = document.querySelector('.manage');
var footer = document.querySelector('footer');

// 渲染商品信息
function bindHtml() {
    var total = 0;
    var totalPrice = 0;

    list.forEach(function (item) {
        if (item.isSelect === true) {
            total += item.number;
            totalPrice += item.number * item.price;
        }
    })

    var selectAll = list.every(function (item) { return item.isSelect });
    cartBox.innerHTML = template('ca', {
        list: list,
        selectAll: selectAll,
    });

    manage.innerHTML = template('man', {
        selectAll: selectAll,
        list: list,
    });

    footer.innerHTML = template('fo', {
        total: total,
        totalPrice: totalPrice
    })

    window.localStorage.setItem('phone', JSON.stringify(list));
}
bindHtml()




edit.setAttribute("data-name", "edit")
// 顶部的编辑事件
edit.addEventListener('click', function () {

    console.log(edit.dataset.name === 'edit');
    // 判断 编辑按钮 是否有 data-name 标签
    if (edit.dataset.name === 'edit') {
        // 给底部隐藏的选项显示出来
        manage.classList.add('active');
        // 删掉 编辑按钮 data-name 的标签
        edit.removeAttribute('data-name');
    } else {
        // 给底部隐藏起来
        manage.classList.remove('active');
        // 设置 编辑按钮 的 data-name 标签
        edit.setAttribute("data-name", "edit");
    }
    bindHtml();
})

// 各种按钮的事件
window.addEventListener('click', function (e) {
    e = e || window.event;
    var target = e.target || e.srcElement;

    if (target.className === 'all') {
        console.log(!target.checked);
        if (!target.checked) {
            list.forEach(function (i) {
                i.isSelect = false;

            })
        } else {
            list.forEach(function (i) {
                i.isSelect = true;
            })
        }
        bindHtml();
    }

    if (target.className === 'select-item') {
        var id = target.dataset.id - 0;
        var goods = list.find(function (item) { return item.id === id });
        goods.isSelect = !goods.isSelect;
        bindHtml();

    }

    if (target.className === 'ig') {
        list = list.filter(function (t) { return !t.isSelect })

        bindHtml()
    }

    if (target.className === 'add') {
        var id = target.dataset.id - 0;
        var goods = list.find(function (t) { return t.id === id });
        goods.number++;
        bindHtml()
    }

    if (target.className === 'sub') {
        var id = target.dataset.id - 0;
        var goods = list.find(function (t) { return t.id === id });
        goods.number--;
        bindHtml()
    }

    if (target.className === 'billing') {
        alert('请付款')
    }

    if (target.className === 'shang') {
        // 跳转到商品详情页并带着 同 id 的数据
        var id = (target.dataset.id) - 0;
        console.log(id);
        var goods = list.find(function (t) { return t.id === id })
        console.log(goods);
        // 把数据存在本地
        window.localStorage.setItem('detail', JSON.stringify(goods));
        window.open('./Shopping.html', '_self');
    }

    if (target.className === 'blak') {
        window.history.go(-1);
    }
})






















































