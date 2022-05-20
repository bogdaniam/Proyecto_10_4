//nos sirve a la hora de colocar las fotos
let contador = 0;

//se guardan todas la razas, de todas las imagenes
let razas = [];

//
let razasOrdendas = [];


function generar() {

    //utilizamos la api para generar imagenes
    //let name = document.getElementById("gitgit").value
    fetch(`https://dog.ceo/api/breeds/image/random `)
        .then(res => res.json())
        //una vez creado el json, vamos a llamar la funcion prueba con el parametro json
        .then(json => prueba(json))//


    function prueba(a) {
        function cuadroConRertraso() {
            //para colocar la imagen en cu cuadraito
            document.getElementById(`hijo${contador}`).src = `${a.message}`
        }


        //vamos a mostrar el nuevo perro encontrado
        document.getElementById(`nuevoPerro`).src = `${a.message}`

        //https://images.dog.ceo/breeds/ridgeback-rhodesian/n02087394_8260.jpg

        //para poner el gif y el texto por defecto
        function changeSurprize() {
            document.getElementById(`nuevoPerro`).src = "https://1478500360.rsc.cdn77.org/app/00000001/1888/a5f164bb6f42c8b99b34ec41a2109cca9814e761_1607449794.gif"
            document.getElementById("mensaje").innerText = "Gotta Catch 'Em All!"
        }

        //despues de poner en pantalla el nuevo perro, le damos 2 segundo y vamos a poner el gif y el texto por defecto
        setTimeout(changeSurprize, 2000);
        setTimeout(cuadroConRertraso, 2000);
        document.getElementById("restante").innerText = `Te quedan para descubrit ${20 - contador} Firulais`


        //separamos el enlace, para luego luego saber cual es la raza
        var enlaceSeparado = (a.message.split('/'));

        //declaramos una variable, y la ponemos a false
        let encontrado = false;
        let key;
        //vamos a recorrer el locar storage, y mirar en cada key si tenemos ya la raza
        for (let i = 0; i <= localStorage.length; i++) {
            key = localStorage.key(i);
            //comprobacion del key con la nueva raza, si existe, vamos a guardar la cantidad de dicha raza, le sumamos uno y vamos a cambiar su valor en local storage
            if (key == enlaceSeparado[4]) {
                let cantNum = Number(JSON.parse(localStorage.getItem(`${key}`)).cantidad)
            cantNum++;
            localStorage.setItem(enlaceSeparado[4], JSON.stringify({
                cantidad: cantNum,
            }));
                i = localStorage.length;
                encontrado = true;
            }
        }
        //si la raza todavia no existe en local storage, vamos a crear una nueva key y ponemos la cantidad al final
        if (!encontrado) {
            localStorage.setItem(enlaceSeparado[4], JSON.stringify({
                cantidad: 1,
            }));
        }


        //vamos guardando las razas en la variable
        razas.push(enlaceSeparado[4])
        console.log(razas);

        //cambiamos el texto del html
        document.getElementById("mensaje").innerText = `Acabas de descubrir un... ${enlaceSeparado[4]}`
        //console.log(enlaceSeparado)

    }


    contador++;

}