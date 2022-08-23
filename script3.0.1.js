/*
--------------------------------------------------------------------------------------------------
NAME: Leonardo Manuel Tolaba
AGE: 28
TEST: CHALLENGUE 02 - JUEGO DEL AHORCADO
YEAR: 2022
VERSION: 2.0.1
--------------------------------------------------------------------------------------------------
*/
var x;
var y;
var radio = 25;
var pantalla;
var pincel;
var palabras = ["IMSOMNIO", "ESQUIMAL", "ANDAMIO", "MECANICA", "FELICIDONIA", "POSTER", "ANIME", "REGALO", "POSTERGACION", "PALEONTOLOGO", "FOBIA", "CREACION"];
var palabraRandom;
var palabraElegida;
var intentosfallados = 0;
var intentosacertados = 0;
var letraingresada;
var posicionX = 100;
var posicionY = 500;
var posicionTitulo = 100;
var cantidad;
var letrasminuscula = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','ñ','o','p','q','r','s','t','u','v','w','x','y','z'];
var caracterEspecial = ['!','|','°','?','¡','¿','$','%','&','/','(',')','-','.',',','{','}','[',']'];
var nuevaPalabra;
var iniciarjuego = 0;
var letrasGuardadas = [];
if(iniciarjuego == 0){//        -------- CON ESTA CONDICIONAL NOS ASEGURAMOS DE PRESIONAR UNA SOLA VEZ EL INICIO DEL JUEGO --------
    document.addEventListener("keyup", validarnuevaPalabra);
}
function crearTablero(){//        -------- ESTA FUNCION INICIALIZA NUESTRO TABLERO CON LOS GUIONES DE LA PALABRA A ADIVINAR --------
    iniciarjuego = 1;
     pantalla = document.querySelector("canvas");
     pincel = pantalla.getContext("2d");
    pincel.fillStyle = "orange";
    // pincel.globalAlpha = 0.5; TRANSPARENCIA ***COrregir el fondo***
    pincel.fillRect(0,50,1200,800);
    mostrarGuiones();
    subtitulo();
    document.addEventListener("keyup", teclaPresionada);
}
function disenharCirculo(x,y,radio){//        -------- CON ESTA FUNCION DISEÑO LA CABEZA DEL MUÑECO Y LA POSICIONO EN LAS COORDENADAS DESEADAS --------
    pincel.fillStyle= "black";
    pincel.beginPath();
    pincel.arc(x,y,radio, 0, 2*Math.PI);
    pincel.stroke();
}
function mostrarGuiones(){//        -------- CON ESTA FUNCION LEO LA PALABRA A ADIVINAR Y EN BASE A LA CANTIDAD DE LETRAS, CREO GUIONES --------
    if(nuevaPalabra == null){
        palabraRandom = Math.floor(Math.random()*palabras.length);
        palabraElegida = palabras[palabraRandom];
        cantidad = palabraElegida.length; 
        dibujarGuion(cantidad);
    }
    else{
        palabraElegida = nuevaPalabra;
        cantidad = palabraElegida.length;  
        dibujarGuion(cantidad);
    }
}
function letrasSinRepetir(palabraElegida){//        -------- CON ESTA FUNCION ME ASEGURO LA CANTIDAD TOTAL DE ACIERTOS PARA QUE SE GANE EL JUEGO --------
    const valores = [];
    const nuevoarray = palabraElegida.split('');
    nuevoarray.forEach((element) => {
        if(!valores.includes(element)){
            valores.push(element);
        }
    })
    return valores.length;
}
function dibujarGuion(cantidad){//        -------- CON ESTA FUNCION PERSONALIZO LOS COLORES Y EL POSICIONAMIENTO DE LOS GUIONES PREVIAMENTE CALCULADOS --------
    var x = 45;
    var y = 700;
    for(var z=0; z<cantidad; z++){ 
        pincel.beginPath();
        pincel.lineWidth = 5;
        pincel.strokeStyle = "darkblue";
        pincel.moveTo(x+15, y);   // BASE
        pincel.lineTo(x+75, y);
        pincel.stroke();
        x = x + 70; 
    }
}
function diseñarHorca(intentosfallados){//        -------- CON ESTA FUNCION DISEÑO LA HORCA Y EN BASE A LOS INTENTOS FALLADOS, AVANZA EL DIBUJO --------
            switch(intentosfallados){
                case 1: 
                    pincel.beginPath();
                    pincel.lineWidth = 5;
                    pincel.strokeStyle = "black";
                    pincel.moveTo(50, 500);   // BASE
                    pincel.lineTo(200, 500);
                    pincel.moveTo(125, 500);   // MASTIL
                    pincel.lineTo(125, 125);
                    pincel.lineCap = "round";
                    pincel.stroke();
                    break;
                case 2:
                    pincel.beginPath();
                    pincel.lineWidth = 5;
                    pincel.strokeStyle = "black";
                    pincel.moveTo(125, 125);   // EXTREMO MASTIL
                    pincel.lineTo(450, 125);
                    pincel.moveTo(450, 125);   // BAJADA MASTIL
                    pincel.lineTo(450, 175);
                    pincel.stroke();
                    break;
                case 3: 
                     // CABEZA
                    pincel.beginPath();
                    pincel.lineWidth = 5;
                    pincel.strokeStyle = "black";
                    disenharCirculo(450,200,radio);
                    pincel.beginPath();
                    pincel.moveTo(450, 225);   // COLUMNA
                    pincel.lineTo(450, 350);
                    pincel.stroke();
                break;
                case 4: 
                    pincel.beginPath();
                    pincel.lineWidth = 5;
                    pincel.strokeStyle = "black";
                    pincel.moveTo(450, 350);   // PIERNA IZQUIERDA
                    pincel.lineTo(400, 440);
                    pincel.moveTo(450, 350);   // PIERNA DERECHA
                    pincel.lineTo(500, 440);
                    pincel.stroke();
                break;
                case 5: 
                    pincel.beginPath();
                    pincel.lineWidth = 5;
                    pincel.strokeStyle = "black";
                    pincel.moveTo(450, 260);   // BRAZO IZQUIERDO
                    pincel.lineTo(400, 350);
                    pincel.moveTo(450, 260);   // BRAZO DERECHO
                    pincel.lineTo(500, 350);
                    pincel.stroke();          
                break;   
            }
    
    
    
}
function teclaPresionada(event){//        -------- CON ESTA FUNCION DETECTO QUE TECLA PRESIONO EL USUARIO Y CALCULO LOS INTENTOS FALLIDOS/EXITOSOS --------
    var posicionX = 100;
    var posicionY = 500;
    var detectar;
    var tecla = event.key;
    var acierto;
    var aciertosMax = letrasSinRepetir(palabraElegida);
    detectar = detectarLetra(tecla);
    // VALORES DE DETECTAR
    if(detectar == 1){
        alert("Usted ingreso una minuscula.");    
    }else if(detectar == 2){
        letrasGuardadas.push(tecla);
        acierto = acertarLetra(tecla);
        if(acierto == 0){
            intentosfallados++;
            if(intentosfallados <= 5){
                diseñarHorca(intentosfallados);
                dibujarLetra(tecla);
                if(intentosfallados == 5){
                    pincel.font = "55px ComicSans"
                    pincel.strokeStyle = "white";
                    pincel.strokeText("FIN DEL JUEGO.",posicionX+390,posicionY +290);
                    posicionX = posicionX+50;
                }
            }
        }else{
            dibujarletraAcertada(tecla);
            intentosacertados++;
            if(intentosacertados == aciertosMax){
                pincel.font = "45px ComicSans"
                    pincel.strokeStyle = "darkgreen";
                    pincel.strokeText("GANASTE!!! FELICIDADES",posicionX+200,posicionY +280);
                    posicionX = posicionX+50;
            }
        }
        
    }else if(detectar == 3){
        alert("Usted ingreso un numero.");
    }else if(detectar == 4){
        alert("Usted ingreso un caracter especial.");
    }else if(detectar == 5){
        alert("Usted ya ingreso esa letra");
    }
    return tecla;
}
function botonPresionada(letra){//        -------- CON ESTA FUNCION DETECTO QUE TECLA PRESIONO EL USUARIO Y CALCULO LOS INTENTOS FALLIDOS/EXITOSOS --------
    var posicionX = 100;
    var posicionY = 500;
    var detectar;
    var boton = letra;
    var acierto;
    var aciertosMax = letrasSinRepetir(palabraElegida);
    detectar = detectarLetra(boton);
    // VALORES DE DETECTAR
    if(detectar == 2){
        letrasGuardadas.push(boton);
        acierto = acertarLetra(boton);
        if(acierto == 0){
            intentosfallados++;
            if(intentosfallados <= 5){
                diseñarHorca(intentosfallados);
                dibujarLetra(boton);
                if(intentosfallados == 5){
                    pincel.font = "85px DynaPuff"
                    pincel.strokeStyle = "red";
                    // pincel.strokeText("PERDISTE - FIN DEL JUEGO.",posicionX+390,posicionY +290);
                    pincel.strokeText("PERDISTE - FIN DEL JUEGO.",posicionX-50,posicionY +300);
                    posicionX = posicionX+50;
                    detectar = 0;
                }
            }
        }else{
            dibujarletraAcertada(boton);
            intentosacertados++;
            if(intentosacertados == aciertosMax){
                pincel.font = "bold 85px DynaPuff"
                    pincel.strokeStyle = "darkgreen";
                    pincel.strokeText("GANASTE!!! FELICIDADES!!",posicionX-50,posicionY +300);
                    posicionX = posicionX+50;
            }
        }
        
    }else if(detectar == 5){
        alert("Usted ya ingreso esa letra");
    }
    return boton;
}

function dibujarLetra(tecla){   //        -------- CON ESTA FUNCION DIBUJO LA LETRA INGRESADA ERRONEAMENTE --------
        pincel.font = " 50px Georgia"
        pincel.strokeStyle = "Darkred";
        pincel.strokeText(tecla,posicionX+525,posicionY-300);
        posicionX = posicionX+60;
}
function detectarLetra(tecla){//        -------- ESTA FUNCION SIRVE DE VALIDACION PARA QUE EL USUARIO SOLO PUEDA JUGAR SI COLOCO LETRAS MAYUSCULAS --------
    var detectado;
    for(var z = 0; z<letrasminuscula.length;z++){
        if(tecla == letrasminuscula[z]){   
                detectado = 1;//TECLA MINUSCULA
        }else if(tecla == letrasminuscula[z].toUpperCase()){     
                if(letraRepetida(tecla)){
                    detectado = 5;//TECLA MAYUSCULA REPETIDA
                }else{
                    detectado = 2;// --- OK !!! 
                }    
        } else if(true != isNaN(tecla)){           
                detectado = 3; // ES UN NUMERO
        } else if(tecla == caracterEspecial[z]){
                detectado = 4; // ES UN CARACTER ESPECIAL
        }       
}
return detectado;
}
function letraRepetida(tecla){//        -------- CON ESTA FUNCION VALIDO QUE LA LETRA QUE INGRESA EL USUARIO NO SE ENCUENTRE REPETIDA --------
    for(var z=0; z<palabraElegida.length;z++){
        if(tecla == letrasGuardadas[z]){
            return 1;
        }
    }
    return 0;
}
function subtitulo(){//        -------- ESTA FUNCION ME SIRVE PARA COLOCAR EL SUBTITULO --------
    var posicionX = 100;
    var posicionY = 500;
    var posicionTitulo = 100;
    pincel.font = "bolder 65px DynaPuff"
    pincel.strokeStyle = "black";
    pincel.strokeText("Letras ingresadas:",posicionTitulo+450,posicionY-370);
    posicionTitulo = posicionTitulo +50;
}
function acertarLetra(tecla){//        -------- CON ESTA FUNCION CALCULO SI LA LETRA INGRESADA PERTENECE A NUESTRA PALABRA SECRETA --------
    var letraSeleccionada = tecla;
    for(var w=0; w< palabraElegida.length; w++){
        if(letraSeleccionada == palabraElegida[w]){
            return 1;
            break;
        }
    }
    return 0;   
}
function dibujarletraAcertada(tecla){//        -------- CON ESTA FUNCION DIBUJO LA LETRA SOBRE EL GUION LUEGO DE VALIDAR QUE ESTA CORRECTA --------
    var x = 45;
    var y = 700;
    var letraaAcertada = tecla;
    for(var z=0; z< palabraElegida.length; z++){
        if(letraaAcertada == palabraElegida[z]){
            if(palabraElegida[z] == 'I'){
            pincel.font = "70px DynaPuff"
            pincel.strokeStyle = "Black";
            pincel.strokeText(palabraElegida[z],x+35,y - 10);
            }else{
                pincel.font = "70px DynaPuff"
                pincel.strokeStyle = "Black";
                pincel.strokeText(palabraElegida[z],x+20,y - 10);
            } 
        } 
        x = x + 70; 
    }
    return 0;   
}
function validarnuevaPalabra(){//        -------- CON ESTA FUNCION VALIDO LA NUEVA PALABRA INGRESADA POR EL USUARIO --------
    var detectar;
    var tecla = event.key;
    if(iniciarjuego == 0){
        detectar = detectarLetra(tecla);
        if(detectar == 1){
            alert("Usted ingreso una minuscula");  
            document.getElementById("nuevodato").value = "";  
        }else if(detectar == 3){
            alert("Usted ingreso un numero.");
            document.getElementById("nuevodato").value = "";
        }else if(detectar == 4){
            alert("Usted ingreso un caracter especial");
            document.getElementById("nuevodato").value = "";
        }
    }
}
function agregarPalabra(){ //        -------- CON ESTA FUNCION EL USUARIO PUEDE AGREGAR LA PALABRA QUE DESEE Y COMENZAR EL JUEGO --------
    nuevaPalabra = document.getElementById("nuevodato").value;
    document.getElementById("nuevodato").value = "";
}

function reiniciar (){
    crearTablero();
    letrasGuardadas = [];
    intentosfallados = 0;
    intentosacertados = 0;
    posicionX = 100;
    posicionY = 500;
    alert("juego reinciado");
}
function volverInicio (){
    letrasGuardadas = [];
    intentosfallados = 0;
    intentosacertados = 0;
    location.reload();
}
function detectarBoton(letra){
    var botonPress = letra;
    botonPresionada(botonPress);
}