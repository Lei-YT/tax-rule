let util = {};

util.title = function (title) {
  title = title ? title + ' - 茭白智能规则引擎' : '茭白智能规则引擎';
  window.document.title = title;
};

util.getBreadcrumb = function (data, path, indexArray) {
  let arr = Array.from(indexArray),
    _this = this;
  for (let i = 0, len = data.length; i < len; i++) {
    arr.push(data[i]);
    if (data[i]["name"] === path) {
      return arr;
    }
    let children = data[i].children;
    if (children && children.length) {
      let result = _this.getBreadcrumb(children, path, arr);
      if (result) return result;
    }
    arr.pop();
  }
  return false;
}

util.randomLetter = function (n) {
  //创建26个字母数组
  var arr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  var idvalue = '';
  for (var i = 0; i < n; i++) {
    idvalue += arr[Math.floor(Math.random() * 24)];
  }
  return idvalue;
}

//获取 左侧菜单
util.getMenu = function (data) {
  var len = data.length - 1;
  for (var i = len; i >= 0; i--) {
    if (data[i].left) {
      if (data[i].children && data[i].children.length > 0) {
        util.getMenu(data[i].children)
      }
    } else {
      data.splice(i, 1)
    }
  }
}

export default util;
