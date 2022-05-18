let contador = 0;
let razas = [];
function generar() {

    //let name = document.getElementById("gitgit").value
    fetch(`https://dog.ceo/api/breeds/image/random `)
        .then(res => res.json())
        .then(json => prueba(json))


    function prueba(a) {
        document.getElementById(`hijo${contador}`).src = `${a.message}`
        document.getElementById(`nuevoPerro`).src = `${a.message}`

        //https://images.dog.ceo/breeds/ridgeback-rhodesian/n02087394_8260.jpg

        function changeSurprize() {
            document.getElementById(`nuevoPerro`).src = "https://1478500360.rsc.cdn77.org/app/00000001/1888/a5f164bb6f42c8b99b34ec41a2109cca9814e761_1607449794.gif"
            document.getElementById("mensaje").innerText = "Gotta Catch 'Em All!"
        }
        setTimeout(changeSurprize, 3000);



        var enlaceSeparado = (a.message.split('/'));
        //comprobar antes del push
        razas.push(enlaceSeparado[4])
        console.log(razas);
        document.getElementById("mensaje").innerText = `Acabas de descubrir un... ${enlaceSeparado[4]}`

    }
    contador++;

}