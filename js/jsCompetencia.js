/*Desarrollado por Innodite 
   RIF:  J-40270256-6
    Contacto
       Javier Urbano     0416-583.38.09
       Anthony Filgueira 0426-594.00.45
*/
function buscar(){
    var r = send_form("../controladores/ctrCompetencia.php", "opc=BS&fecha=" + document.getElementById("date").value +
                                                                 "&tip_comp=" + document.getElementById("tipo_comp").value +
                                                                 "&categoria=" + document.getElementById("categoria").value);
    if (r) document.getElementById("list").innerHTML = r;
}

function cargar(){
    var r = send_form("../controladores/ctrCompetencia.php", "opc=IN&fecha=" + document.getElementById("date").value +
                                                                 "&tip_comp=" + document.getElementById("tipo_comp").value +
                                                                 "&porcp=" + document.getElementById("premio").value +
                                                                 "&porcc=" + document.getElementById("casa").value +
                                                                 "&rondas=" + document.getElementById("rondas").value +
                                                                 "&categoria=" + document.getElementById("categoria").value +
                                                                 "&inscripcion=" + document.getElementById("inscripcion").value);
    if (r) loadStore();
}

function actualizar(fila, id){
    var fecha = document.getElementById("tfecha"+fila).value;
    var tipcomp = document.getElementById("ttipcomp"+fila).value;
    var cate = document.getElementById("tcategorias"+fila).value;
    var porcp = document.getElementById("tporcp"+fila).value;
    var porcc = document.getElementById("tporcc"+fila).value;
    var rond = document.getElementById("trondas"+fila).value;
    
    
    var r = send_form("../controladores/ctrCompetencia.php", "opc=UP&id=" + id + "&fecha=" + fecha +
                                                                               "&tip_comp=" + tipcomp +
                                                                               "&categoria=" + cate +
                                                                               "&porcp=" + porcp +
                                                                               "&porcc=" + porcc +
                                                                               "&rondas=" + rond );
    if (r){
        document.getElementById("imgf"+fila).src = "../img/up_med.png";
        document.getElementById("imgf"+fila).onclick = function(event){ modificar(fila,id,fecha,tipcomp,cate,porcp,porcc,rond); };
        document.getElementById("lstable").rows[fila].cells[0].innerHTML = fecha;
        
        var ntc = document.getElementById("tipo_comp").length;
        var i=0,TextTC="";
        for (i=0;i<ntc;i++){
            if (document.getElementById("tipo_comp").options[i].value == tipcomp )
                TextTC = document.getElementById("tipo_comp").options[i].text;
        }
        document.getElementById("lstable").rows[fila].cells[1].innerHTML = TextTC;
       var nct = document.getElementById("categoria").length;
        i=0,TextCT="";
        for (i=0;i<nct;i++){
            if (document.getElementById("categoria").options[i].value == cate){
                TextCT = document.getElementById("categoria").options[i].text;
            }
        }
        document.getElementById("lstable").rows[fila].cells[2].innerHTML = TextCT;
        
        document.getElementById("lstable").rows[fila].cells[3].innerHTML = porcp;
        document.getElementById("lstable").rows[fila].cells[4].innerHTML = porcc;
        document.getElementById("lstable").rows[fila].cells[6].innerHTML = rond;
        
      
    };
}

function modificar(fila,id,fecha,tip_comp,Categoria,porcp,porcc,ins,rondas){
    
    
    document.getElementById("lstable").rows[fila].cells[0].innerHTML = "<input type='date' id=tfecha"+fila+" class='medtopbuttons' name=tfecha"+fila+" value='"+fecha+"'/>";
    
    var ntc = document.getElementById("tipo_comp").length;
    var strSelectTC = "", i=0;
    for (i=0;i<ntc;i++){
        strSelectTC = strSelectTC + "<option value="+document.getElementById("tipo_comp").options[i].value+">"+document.getElementById("tipo_comp").options[i].text+"</option>";
    }
    document.getElementById("lstable").rows[fila].cells[1].innerHTML = "<select id=ttipcomp"+fila+" name=ttipcomp"+fila+">" + strSelectTC + "</select>";
     var nct = document.getElementById("categoria").length;
    strSelectTC = "", i=0;
    for (i=0;i<nct;i++){
        strSelectTC = strSelectTC + "<option value="+document.getElementById("categoria").options[i].value+">"+document.getElementById("categoria").options[i].text+"</option>";
    }
   
    document.getElementById("lstable").rows[fila].cells[2].innerHTML = "<select id=tcategorias"+fila+" name=tcategorias"+fila+">" + strSelectTC + "</select>";
    document.getElementById("lstable").rows[fila].cells[3].innerHTML = "<input id=tporcp"+fila+" name=tporcp"+fila+" value='"+porcp+"' onkeyup=\"evalPorcUp('tporcp"+fila+"','tporcc"+fila+"')\"/>";
    document.getElementById("lstable").rows[fila].cells[4].innerHTML = "<input id=tporcc"+fila+" name=tporcc"+fila+" value='"+porcc+"' readonly=''/>";
    document.getElementById("lstable").rows[fila].cells[6].innerHTML = "<input id=trondas"+fila+" name=trondas"+fila+" value='"+rondas+"'/>";
    
      
    
    document.getElementById("imgf"+fila).src = "../img/up_med_blue.png";
    document.getElementById("imgf"+fila).onclick = function(event){ actualizar(fila, id); };
    
    document.getElementById("ttipcomp"+fila).value = tip_comp;
    document.getElementById("tcategorias"+fila).value = Categoria;
}

function eliminar(id){
    var r = send_form("../controladores/ctrCompetencia.php", "opc=DL&id=" + id);
    if (r) loadStore();
}

function loadTipoCompetencia(){
    var r = send_form("../controladores/ctrCompetencia.php", "opc=LST");
    if (r) document.getElementById("tipo_comp").innerHTML = r;
}

function loadCategoria(){
    var r = send_form("../controladores/ctrCompetencia.php", "opc=LSC");
    if (r) document.getElementById("categoria").innerHTML = r;
}

function loadStore(){
    var r = send_form("../controladores/ctrCompetencia.php", "opc=LS");
    if (r) document.getElementById("list").innerHTML = r;
}

window.onload = function(){
    loadTipoCompetencia();
    loadCategoria();
    loadStore();
}

function evalPorcUp(idp, idc){
    if (document.getElementById(idp).value != "" && document.getElementById(idp).value <= 100 && document.getElementById(idp).value >= 0){
        document.getElementById(idc).value = 100 - document.getElementById(idp).value;
    }else{
        document.getElementById(idp).value = "";
        document.getElementById(idc).value = "";
    }
}