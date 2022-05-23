//nos sirve a la hora de colocar las fotos
let contador = 0;


//let razasOrdendas = [];
let razasFinal = [];
let razasCantidad = [];

function generar() {

    //utilizamos la api para generar imagenes

    fetch(`https://dog.ceo/api/breeds/image/random `)
        .then(res => res.json())
        //una vez creado el json, vamos a llamar la funcion prueba con el parametro json
        .then(json => duendes(json))//


    function duendes(a) {
        //document.getElementById("button").onclick.value = "#"
        document.getElementById("button").setAttribute('onclick', '#');
        document.getElementById("button").style.backgroundColor = "red";


            //para colocar la imagen en cu cuadraito y para poner el gif y el texto por defecto
        function cuadroConRertraso() {
            document.getElementById(`hijo${contador}`).src = `${a.message}`
            document.getElementById(`nuevoPerro`).src = "https://1478500360.rsc.cdn77.org/app/00000001/1888/a5f164bb6f42c8b99b34ec41a2109cca9814e761_1607449794.gif"
            document.getElementById("mensaje").innerText = "Gotta Catch 'Em All!"
            document.getElementById("button").setAttribute('onclick', 'generar();')
            document.getElementById("button").style.backgroundColor = "lime";
        }


        //vamos a mostrar el nuevo perro encontrado
        document.getElementById(`nuevoPerro`).src = `${a.message}`


        //despues de poner en pantalla el nuevo perro, le damos 1 segundo y vamos a poner el gif y el texto por defecto
        setTimeout(cuadroConRertraso, 1200);
        document.getElementById("restante").innerText = `Te quedan para descubrit ${20 - contador} Firulais`



        //separamos el enlace, para luego saber cual es la raza
        var enlaceSeparado = (a.message.split('/'));

        //declaramos una variable, y la ponemos a false
        let encontrado = false;
        let key;
        let contLocStor = 0;

        //para poner el nombre bien
        let nombreSplit = enlaceSeparado[4].split("-");
        let nombreBienCompleto = "";
        for (let j = 0; j < nombreSplit.length; j++) {
            nombreBienCompleto += `${nombreSplit[j][0].toUpperCase()}${nombreSplit[j].substring(1)} `
        }


        //vamos a recorrer el locar storage, y mirar en cada key si tenemos ya la raza
        while ((contLocStor != localStorage.length) && (encontrado != true)) {
            key = localStorage.key(contLocStor);

            //comprobacion del key con la nueva raza, si existe, vamos a guardar la cantidad de dicha raza, le sumamos uno y vamos a cambiar su valor en local storage
            if (key == nombreBienCompleto) {
                let cantNum = Number(JSON.parse(localStorage.getItem(`${key}`)))
                cantNum++;
                localStorage.setItem(nombreBienCompleto, JSON.stringify(
                    Number(cantNum)
                ));
                encontrado = true;
            }
            contLocStor++;
        }

        //si la raza todavia no existe en local storage, vamos a crear una nueva key y ponemos la cantidad al final
        if (!encontrado) {
            localStorage.setItem(nombreBienCompleto, JSON.stringify(
                1
            ));
        }


        //cambiamos el texto del html
        document.getElementById("mensaje").innerText = `Acabas de descubrir un... ${nombreBienCompleto}`



        //añadir las razas y cantidad en array cuando se descubren los 20 perros
        if (contador == 20) {
            setTimeout(cambiarGrafica, 2000);
            function cambiarGrafica() {
                //document.getElementById("fotoBot").style.display = "none"
                document.getElementById("padre").style.display = "none"
                document.getElementById("fichaje").style.display = "none"
                document.getElementById("grafica").style.display = "contents"


                //Se recorre el local storage
                for (let i = 0; i < localStorage.length; i++) {

                    //Se guarda cada raza en la variabñe key
                    //key = localStorage.key(i);
                    //Se añade a los datos de los perros a la grafica
                    razasFinal.push(localStorage.key(i))
                    razasCantidad.push(JSON.parse(localStorage.getItem(`${localStorage.key(i)}`)))
                }

                //para la grafica
                const labels = razasFinal;
                const data = {
                    labels: labels,
                    datasets: [{
                        label: 'Estatistica Perros',
                        backgroundColor: 'rgb(255, 99, 132)',
                        borderColor: 'rgb(255, 99, 132)',
                        data: razasCantidad,
                    }]
                };

                const config = {
                    type: 'bar',
                    data: data,
                    options: {}
                };

                const myChart = new Chart(
                    document.getElementById('myChart'),
                    config
                );
            }
        }
    }
    contador++;
}
