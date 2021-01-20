const tx=document.getElementsByTagName('textarea');for(let i=0;i<tx.length;i++){if(tx[i].classList.contains('sticker')){if(tx[i].readOnly){tx[i].parentNode.style.height=(tx[i].scrollHeight)+'px';}
tx[i].setAttribute('style','height:'+(tx[i].scrollHeight)+'px;');}}
function OnInput(event){event.target.style.height='auto';if(event.target.readOnly){event.target.parentNode.style.height=(event.target.scrollHeight)+'px';}
else{event.target.parentNode.parentNode.parentNode.style.height=(event.target.scrollHeight)+'px';}
event.target.parentNode.parentNode.parentNode.children[0].style.height=(event.target.scrollHeight)+'px';event.target.style.height=(event.target.scrollHeight)+'px';};function edit_sticker(sticker){var edit_modal=sticker.children[1];var edit_block=edit_modal.children[0];var edit_area=edit_block.children[0];sticker.parentNode.style.filter='none';edit_modal.style.display='block';edit_block.style.display='block';edit_block.style.position='fixed';edit_block.style.zIndex=1000;edit_block.style.top=sticker.getBoundingClientRect().top+'px';edit_block.style.left=sticker.getBoundingClientRect().left+'px';edit_area.style.zIndex=1001;edit_area.style.cursor='text';edit_area.select();function save_sticker_data(event){var lists_container=sticker.parentNode.parentNode.parentNode;index_find:for(let i=0;i<lists_container.children.length;i++){if(lists_container.children[i]==sticker.parentNode.parentNode){var list_container=lists_container.children[i].children[0];for(let j=1;j<list_container.children.length-1;j++){if(list_container.children[j]==sticker){update_text_api(edit_area.value,i,j-1);break index_find;}}}}
sticker.parentNode.style.filter='drop-shadow(1px 1px 2px #000)';sticker.children[0].value=edit_area.value;edit_modal.style.display="none";edit_block.style.zIndex=1;document.onmousedown=null;document.onkeypress=null;}
document.onmousedown=function(event){console.log(event.target);console.log(edit_block);if(event.target!=edit_block){save_sticker_data(event);};};document.onkeypress=function(e){console.log(e.shiftKey);if(e.shiftKey&&e.keyCode==13){}
else if(!e.ctrlKey&&!e.shiftKey&&e.keyCode==13){e.preventDefault();save_sticker_data(event);}}
async function update_text_api(text,list_id,sticker_id){var url='/api/board/update_sticker_text';await axios({method:'PUT',url:url,data:{'key':api_key,'board_id':board_id,'list_id':list_id,'sticker_id':sticker_id,'text':text}}).then(function(response){console.log(response.data);}).catch(function(error){console.log(error)});}};function add_sticker_to_list(event){if(event.target.classList.contains('add_sticker')){var list=event.target.parentNode;}
else{var list=event.target.parentNode.parentNode;}
container=list.parentNode.parentNode.children;for(let i=0;i<container.length;i++){if(container[i]==list.parentNode){add_sticker_api(i);}}
list_button=list.getElementsByClassName('add_sticker');var new_stiker=create_stiker_edit_area();list.insertBefore(new_stiker,list_button[0]);edit_sticker(new_stiker);async function add_sticker_api(index){var url='/api/board/create_sticker';await axios({method:'POST',url:url,data:{'key':api_key,'board_id':board_id,'list_id':index}}).then(function(response){console.log(response.data);}).catch(function(error){console.log(error)});}}
function create_stiker_edit_area(){var visible_textarea=document.createElement('textarea');visible_textarea.classList.add('sticker');visible_textarea.spellcheck=false;visible_textarea.readOnly=true;visible_textarea.setAttribute('onmousedown','on_stiker_click(event)');var edit_area_wrapper=document.createElement('div');edit_area_wrapper.classList.add('sticker_wrapper');var edit_sticker_modal=document.createElement('div');edit_sticker_modal.classList.add('edit_modal');var edit_area_on_edit=document.createElement('div');var edit_textarea=document.createElement('textarea');edit_textarea.classList.add('sticker');edit_textarea.setAttribute('oninput','OnInput(event)');edit_textarea.spellcheck=false;var delete_sticker_button=document.createElement('img');delete_sticker_button.src='/static/images/icons/close.png';delete_sticker_button.classList.add('del_sticker');delete_sticker_button.setAttribute('onmousedown','delete_sticker(event)');edit_area_on_edit.append(edit_textarea);edit_sticker_modal.append(edit_area_on_edit);edit_area_wrapper.append(visible_textarea);edit_area_wrapper.append(edit_sticker_modal);edit_area_wrapper.append(delete_sticker_button);return edit_area_wrapper;};function delete_sticker(event){var target_sticker=event.target.parentNode;var wrappers=event.target.parentNode.parentNode.parentNode.parentNode.children;index_find:for(let i=0;i<=wrappers.length;i++){if(wrappers[i]==target_sticker.parentNode.parentNode){var stickers=wrappers[i].children[0].children;for(let j=1;j<stickers.length-1;j++){if(stickers[j]==event.target.parentNode){delete_sticker_api(i,j-1);event.target.parentNode.remove();break index_find;}}}}
async function delete_sticker_api(list_id,sticker_id){var url='/api/board/delete_sticker';await axios({method:'DELETE',url:url,data:{'key':api_key,'board_id':board_id,'list_id':list_id,'sticker_id':sticker_id}}).then(function(response){console.log(response.data);}).catch(function(error){console.log(error)});}};function delete_list(event){var container=event.target.parentNode.parentNode.parentNode.children;for(let i=0;i<=container.length;i++){if(container[i]==event.target.parentNode.parentNode){event.target.parentNode.parentNode.remove();delete_list_api(i);}}
async function delete_list_api(index){var url='/api/board/delete_list';var board_id=document.URL.split('/')[4];await axios({method:'DELETE',url:url,data:{'key':api_key,'board_id':board_id,'list_id':index}}).then(function(response){console.log(response.data);}).catch(function(error){console.log(error)});}};function edit_columns(event){if(!(event.target.classList.contains('show')||event.target.parentNode.classList.contains('show'))){dropdown(event);event.target.style.display='none';document.getElementsByClassName('page-header')[0].style.backgroundColor='rgba(0, 0, 0, 0.4)';event.target.parentNode.style.zIndex=100;edit_modal=document.getElementById('edit_columns');edit_modal.style.display='block';lists=document.getElementsByClassName('list');for(let i=0;i<lists.length;i++){lists[i].style.zIndex=1000;}}
else{dropdown(event);document.getElementsByClassName('page-header')[0].style.backgroundColor='#fff';var settings_button=document.getElementsByClassName('header-column')[1].children[0].children[3];settings_button.style.display='block';edit_modal=document.getElementById('edit_columns');edit_modal.style.display='none';lists=document.getElementsByClassName('list');for(let i=0;i<lists.length;i++){lists[i].style.zIndex=null;lists[i].getElementsByClassName('del_list')[0].style.display='none';}}}
function toggle_delete_lists_buttons(event){lists=document.getElementsByClassName('list');for(let i=0;i<lists.length;i++){if(lists[i].getElementsByClassName('del_list')[0].style.display=='none'){lists[i].getElementsByClassName('del_list')[0].style.display='block';}
else{lists[i].getElementsByClassName('del_list')[0].style.display='none';}}}
function add_list_to_container(event){var container=document.getElementsByClassName('lists_container')[0];var show_close_button=false;if(container.children.length>0){var exist_container_list=container.children[0].children[0].children;if(container.children.length>0&&exist_container_list[exist_container_list.length-1].style.display=='block'){show_close_button=true;}
else{show_close_button=false;}}
else{show_close_button=false;}
var new_list=create_new_list_element();container.append(new_list);new_list.getElementsByClassName('list_title')[0].click();create_list();function create_new_list_element(){var wrapper=document.createElement('div');wrapper.classList.add('wrapper');var list=document.createElement('div');list.classList.add('list');list.style.zIndex=1000;var title_textarea=document.createElement('textarea');title_textarea.id='list_label';title_textarea.classList.add('list_title');title_textarea.maxlength='30';title_textarea.spellcheck=false;title_textarea.readOnly=true;title_textarea.setAttribute('onclick','edit_list_title(event)');var add_sticker_button=document.createElement('button');add_sticker_button.setAttribute('onclick','add_sticker_to_list(event)');add_sticker_button.classList.add('add_sticker');add_sticker_button.classList.add('btn');var add_sticker_img=document.createElement('img');add_sticker_img.src='/static/images/icons/plus.png';add_sticker_img.style.width='25px';add_sticker_img.style.height='25px';var del_list_img=document.createElement('img');del_list_img.src='/static/images/icons/delete.png';del_list_img.setAttribute('onclick','delete_list(event)');if(show_close_button){del_list_img.style.display='block';}
else{del_list_img.style.display='none';}
del_list_img.classList.add('del_list');add_sticker_button.append(add_sticker_img);list.append(title_textarea);list.append(add_sticker_button);list.append(del_list_img);wrapper.append(list);return wrapper;}
async function create_list(){var url='/api/board/create_list';var board_id=document.URL.split('/')[4];await axios({method:'POST',url:url,data:{'key':api_key,'board_id':board_id}}).then(function(response){console.log(response.data);}).catch(function(error){console.log(error)});}};