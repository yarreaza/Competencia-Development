<?php
/*Desarrollado por Innodite 
    RIF:  J-40270256-6
    Contacto
        Javier Urbano     0416-583.38.09
        Anthony Filgueira 0426-594.00.45
*/
if (isset($_POST['opc'])){
    
    $out = "";
    include ("../modelos/clsCategoria.php");
    
    $name = isset($_POST['nombre']) ? $_POST['nombre'] : null;
    $emin = isset($_POST['agemin']) ? $_POST['agemin'] : null;
    $emax = isset($_POST['agemax']) ? $_POST['agemax'] : null;
    $id   = isset($_POST['id'])     ? $_POST['id']     : null;
    
    $p = array("nombre"=>$name,"agemin"=>$emin,"agemax"=>$emax, "id"=>$id);
    $ob = new clsCategoria($p);
    
    switch ($_POST['opc']) {
        case "IN": $out = $ob->insertar();      break;
        case "UP": $out = $ob->modificar($p);   break;
        case "DL": $out = $ob->eliminar($p);    break;
        case "LS": $out = $ob->listarTabla();   break;
        case "BS": $out = $ob->listarTabla($p); break;
        default: break;
    }
    echo $out;
}else
    header("Location: ../index.php");

?>