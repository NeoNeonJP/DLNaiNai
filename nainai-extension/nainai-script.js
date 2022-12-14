//DOMの監視
var nainaiObserver = new MutationObserver(function(mutationList, observer){
    //非表示設定した画像には"_filter"クラスが付くので、クラスが付いた要素が追加されたら処理する。
    mutationList.filter(m => m.target.classList.contains("_filter")).forEach(m => hideWorklistItem(m.target));
})
nainaiObserver.observe(document.getElementById("main_inner"),{
    "subtree": true,
    "characterData": true,
    "attributes": true,
    "attributeFilter": ["class"]
});

function hideWorklistItem(_dom){
    //_filterクラスが付いた要素の親を辿る
    let item = getWorklistItem(_dom);

    //親がnullで無かったら親に"nainai-item"クラスを追加する
    if(item != null){
        item.classList.add("nainai-item");
    }
}
//親を辿って"n_worklist_item"クラスが付いた要素まで行く
function getWorklistItem(_dom){
    if(_dom.parentNode == null){
        return null;
    }
    if(_dom.parentNode.classList.contains("n_worklist_item")){
        return _dom.parentNode;
    }
    return getWorklistItem(_dom.parentNode);
}