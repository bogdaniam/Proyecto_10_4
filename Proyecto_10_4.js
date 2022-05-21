//nos sirve a la hora de colocar las fotos
let contador = 0;

//se guardan todas la razas, de todas las imagenes
let razas = [];

//
let razasOrdendas = [];
let razasFinal = [];
let razasCantidad = [];

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
        setTimeout(changeSurprize, 1000);
        setTimeout(cuadroConRertraso, 1000);
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

        //para poner el nombre bien en html
        let myArraySplit1 = enlaceSeparado[4].split("-");
        let myArraySplitUnido1 = "";
        for (let j = 0; j < myArraySplit1.length; j++) {
            myArraySplitUnido1 += `${myArraySplit1[j][0].toUpperCase()}${myArraySplit1[j].substring(1)} `

        }

        //cambiamos el texto del html
        document.getElementById("mensaje").innerText = `Acabas de descubrir un... ${myArraySplitUnido1}`
        //console.log(enlaceSeparado)

        //añadir las razas y cantidad en array cuando se descubren los 20 perros
        if (contador == 2) {

            setTimeout(cambiarGrafica, 2000);

            function cambiarGrafica() {
                //document.getElementById("fotoBot").style.display = "none"
                document.getElementById("padre").style.display = "none"
                document.getElementById("fichaje").style.display = "none"
                document.getElementById("grafica").style.display = "contents"


                //Se recorre el local storage
                for (let i = 0; i < localStorage.length; i++) {

                    //Se guarda cada raza en la variabñe key
                    key = localStorage.key(i);

                    //Se crea un nuevo array por si acaso el nombre de la raza es compuesto y separado por -
                    let myArraySplit = key.split("-");
                    let myArraySplitUnido = "";


                    //recorremos cada palabra del nombre de la raza, ponemos a uppercase la primeraletra y añadimos el resto de la palabra
                    for (let j = 0; j < myArraySplit.length; j++) {
                        myArraySplitUnido += `${myArraySplit[j][0].toUpperCase()}${myArraySplit[j].substring(1)} `

                    }
                    //console.log(myArraySplitUnido)
                    //Se añade a los datos de los perros a la grafica
                    razasFinal.push(myArraySplitUnido)
                    razasCantidad.push(JSON.parse(localStorage.getItem(`${key}`)).cantidad)
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