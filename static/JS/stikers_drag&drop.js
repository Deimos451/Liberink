function on_stiker_click(e) {
    var stiker = e.target.parentNode;
    if (e.type == 'mousedown') {
        if (e.which == 1 && e.target.classList.contains('sticker')) {
            var targetMoved = false;
            var parentList = null;
            var coords = getCoords(stiker);
            var shiftX = e.pageX - coords.left;
            var shiftY = e.pageY - coords.top;
            var drop_to = 0;
            var new_list_id = 0;
            var new_sticker_id = 0;
            var old_list_id = [].indexOf.call(stiker.parentNode.parentNode.parentNode.children, stiker.parentNode.parentNode);
            var old_sticker_id = [].indexOf.call(stiker.parentNode.children, stiker) - 1;
            stiker.style.zIndex = 1000;
            function createStikerSubstrate(elem) {
                var div = document.createElement('div');
                div.style.height = elem.style.height;
                div.classList.add('stiker_substrate');
                return div;
            }

            function moveAt(e) {
                var drop_postition = 0;
                stiker.style.position = 'fixed';
                document.body.appendChild(stiker);
                stiker.style.cursor = 'grabbing';
                stiker.style.left = e.pageX - shiftX + 'px';
                stiker.style.top = e.pageY - shiftY + 'px';
                var wrappers = document.getElementsByClassName("wrapper");
                for (let i = 0; i < wrappers.length; i++) {
                    var wrapper = wrappers[i].getBoundingClientRect();
                    var list = wrappers[i].getElementsByClassName('list')[0];
                    if (e.pageX > wrapper.x && e.pageY > wrapper.y && e.pageX < wrapper.right && e.pageY < wrapper.bottom) {
                        new_list_id = [].indexOf.call(wrappers[i].parentNode.children, wrappers[i]);
                        if (list.getElementsByClassName('stiker_substrate').length > 0) list.getElementsByClassName('stiker_substrate')[0].remove();
                        list_stickers = list.getElementsByClassName('sticker_wrapper');
                        if (list_stickers.length > 0) {
                            for (let i = 0; i < list_stickers.length; i++) {
                                coordinates = list_stickers[i].getBoundingClientRect();
                                if (e.pageY > (coordinates.y + (coordinates.height / 2))) {
                                    drop_postition = i + 1;
                                }
                            };
                            new_sticker_id = drop_postition;
                            drop_to = drop_postition;
                            if (drop_postition > 0){
                                list.children[drop_postition].after(createStikerSubstrate(stiker));
                            }
                            else{
                                list.children[1].before(createStikerSubstrate(stiker));
                            };
                        }
                        else{
                            drop_to = 0;
                            add_sticker_button = list.getElementsByTagName('button')[0];
                            add_sticker_button.before(createStikerSubstrate(stiker));
                        }
                        parentList = list;
                    } else {
                        if (wrappers[i].getElementsByClassName('stiker_substrate').length > 0) {
                            if (list != parentList) {
                                var list = wrappers[i].getElementsByClassName('list')[0]
                                list.removeChild(list.getElementsByClassName('stiker_substrate')[0]);
                            }

                        }
                    }
                }

            }
            document.onmouseup = function stiker_drop(e) {
                document.onmousemove = null;
                document.onmouseup = null;
                stiker.onmouseup = null;
                stiker.style.cursor = 'pointer';
                stiker.style.position = 'relative';
                stiker.style.left = 'auto';
                stiker.style.top = 'auto';
                stiker.style.zIndex = 'auto';
                if (targetMoved) {
                    if ((old_list_id != new_list_id) || (old_sticker_id != new_sticker_id)){
                        console.log(old_list_id,  new_list_id, old_sticker_id, new_sticker_id);
                        update_sticker_postition(old_list_id, new_list_id, old_sticker_id, new_sticker_id);
                    }
                    targetMoved = false;
                    var moved = false;
                    var wrappers = document.getElementsByClassName("wrapper");
                    for (let i = 0; i < wrappers.length; i++) {
                        var wrapper = wrappers[i].getBoundingClientRect();
                        if (e.pageX > wrapper.x && e.pageY > wrapper.y && e.pageX < wrapper.right && e.pageY < wrapper.bottom) {
                            var list = wrappers[i].getElementsByClassName('list')[0];
                            if (list.getElementsByClassName('stiker_substrate').length > 0) {
                                list.removeChild(list.getElementsByClassName('stiker_substrate')[0]);
                            }
                            if (drop_to > 0){
                                list.children[drop_to].after(stiker);
                            }
                            else{
                                list.children[1].before(stiker);
                            };
                            moved = true;
                        }
                    }
                    if (!moved) {
                        if (drop_to > 0){
                            parentList.children[drop_to].after(stiker);
                        }
                        else{
                            parentList.children[1].before(stiker);
                        };
                        moved = true;
                    }
                } else {
                    edit_sticker(stiker);
                }
            }
            document.onmousemove = function(e) {
                moveAt(e);
                targetMoved = true;
            };

            async function update_sticker_postition(old_list_id, new_list_id, old_sticker_id, new_sticker_id) {
                var url =  '/api/board/update_sticker_postition';
                await axios({
                    method: 'PUT',
                    url: url,
                    data: {
                        'key' : api_key,
                        'board_id': board_id,
                        'old_list_id': old_list_id,
                        'new_list_id' : new_list_id,
                        'old_sticker_id' : old_sticker_id,
                        'new_sticker_id' : new_sticker_id
                    }

                }).then(function(response) {
                    console.log(response.data);
                }).catch(function(error) {
                    console.log(error)
                });
            }

        };
    };
    if (e.type == 'touchstart') {

        var targetMoved = false;
        var parentList = null;
        var coords = getCoords(stiker);
        var shiftX = e.touches[0].pageX - coords.left;
        var shiftY = e.touches[0].pageY - coords.top;

        stiker.style.zIndex = 1000;

        function createStikerSubstrate(elem) {
            var div = document.createElement('div');
            div.style.height = elem.style.height;
            div.classList.add('stiker_substrate');
            return div;
        }

        function moveAt(e) {
            stiker.style.position = 'fixed';
            document.body.appendChild(stiker);
            stiker.style.cursor = 'grabbing';
            stiker.style.left = e.touches[0].pageX - shiftX + 'px';
            stiker.style.top = e.touches[0].pageY - shiftY + 'px';
            var wrappers = document.getElementsByClassName("wrapper");
            for (let i = 0; i < wrappers.length; i++) {
                var wrapper = wrappers[i].getBoundingClientRect();
                if (e.touches[0].pageX > wrapper.x && e.touches[0].pageY > wrapper.y && e.touches[0].pageX < wrapper.right && e.touches[0].pageY < wrapper.bottom) {
                    if (wrappers[i].getElementsByClassName('stiker_substrate').length == 0) {
                        var list = wrappers[i].getElementsByClassName('list')[0];
                        parentList = list;
                        list_buttons = list.getElementsByTagName('button');
                        list.insertBefore(createStikerSubstrate(stiker), list_buttons[list_buttons.length - 1]);
                    }
                } else {
                    if (wrappers[i].getElementsByClassName('stiker_substrate').length > 0) {
                        if (list != parentList) {
                            var list = wrappers[i].getElementsByClassName('list')[0]
                            list.removeChild(list.getElementsByClassName('stiker_substrate')[0]);
                        }

                    }
                }
            }
        }
        document.ontouchend = function stiker_drop(e) {
            document.ontouchmove = null;
            document.ontouchend = null;
            stiker.onmouseup = null;
            stiker.style.cursor = 'pointer';
            stiker.style.position = 'relative';
            stiker.style.left = 'auto';
            stiker.style.top = 'auto';
            stiker.style.zIndex = 'auto';
            if (targetMoved) {
                targetMoved = false;
                var moved = false;
                var wrappers = document.getElementsByClassName("wrapper");
                for (let i = 0; i < wrappers.length; i++) {
                    var wrapper = wrappers[i].getBoundingClientRect();
                    if (e.changedTouches[0].clientX > wrapper.x && e.changedTouches[0].clientY > wrapper.y && e.changedTouches[0].clientX < wrapper.right && e.changedTouches[0].clientY < wrapper.bottom) {
                        var list = wrappers[i].getElementsByClassName('list')[0];
                        if (list.getElementsByClassName('stiker_substrate').length > 0) {
                            list.removeChild(list.getElementsByClassName('stiker_substrate')[0]);
                        }
                        list.insertBefore(stiker, list.getElementsByTagName('button')[0]);
                        moved = true;
                    }
                }
                if (!moved) {
                    parentList.insertBefore(stiker, parentList.getElementsByTagName('button')[0]);
                    moved = true;
                }
            } else {
                edit_sticker(stiker);
            }
        }
        document.ontouchmove = function(e) {
            moveAt(e);
            targetMoved = true;
        };
    };

}

document.ondragstart = function() {
    return false;
};

function getCoords(elem) { // кроме IE8-
    var box = elem.getBoundingClientRect();
    return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset
    };
}
