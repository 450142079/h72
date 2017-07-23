
/*ссылки ========================================================*/


//ссылки
h7.link={};
//Список
h7.link.list=[];

h7.link.new=function(url, name, img, sorting){
    if(!url){ url=prompt('url', ''); }
    if(!name){ name=prompt('name', ''); }
    if(!img){ img=prompt('url img', 'scrin'); }
    
	if(!url){ return false; }
	

	
    if(!name){ 	var arr=url.split('/'); name=arr[2]; }
    if(!img){ img='/h7/link/default.png'; }
    if(!sorting){ sorting=1000; }
    
    
    
    
    //alert(url + name + img + sorting);
    
    var h7id= h7.report.add('New link', 1);
    h7.ajax('link/add~' + url + '~' + name + '~' + img + '~' + sorting, h7.report.add, 2, h7id);
    
    setTimeout(h7.link.show() , 4000);
}








h7.link.add=function(where_i, url, name, img, sorting){
    if(!url || !where_i){ return false; }
    if(!name){ name=url; }
    if(!img){ img='./link/default.png'; }
    if(!sorting){ sorting=1000; }
    var ls=h7.link.list.length;
    h7.link.list[ls]={};
    h7.link.list[ls]['where_i']=where_i;
    h7.link.list[ls]['url']=url;
    h7.link.list[ls]['name']=name;
    h7.link.list[ls]['img']=img;
    h7.link.list[ls]['sorting']=sorting;
}


//Делает запрос в базу ссылок
h7.link.show=function(id_where){
	if(!id_where){ return false; }

	var h7id=h7.report.add('Show link ', 0);
	h7.ajax('link/see', h7.link.see, id_where);
    
};

//Получает ответ и отображает базу ссылок
h7.link.see=function(strLi, id_where){
     if(!strLi){ return false; }
     if(!id_where){ return false; }
    var str_a='';
    var arr1=strLi.split('<#h7#>');
    var arr2=[];
	for(i9=0;i9<arr1.length;i9++){
		if(arr1[i9]){
			arr2=[];
			arr2=arr1[i9].split('<h7>');
			str_a+='<a class="h7_link_el h7inf_' + arr2[0] + '" href="' + arr2[1] + '" style="background-image:url(\'' + arr2[3] + '\')" target="_blank">\
			<p>' + arr2[2] + '</p>\
			</a>';			
		}
	}
	document.getElementById(id_where).innerHTML='<a onClick="h7.link.new();" class="h7_link_el" style="background-image:url(\'/h7/link/add.png\')" ><p>Add link</p></a>' + str_a;
}





/*//ссылки ========================================================*/

