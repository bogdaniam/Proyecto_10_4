let contador = 0;
let razas = [];
function generar() {
    
    //let name = document.getElementById("gitgit").value
    fetch(`https://dog.ceo/api/breeds/image/random `)
        .then(res => res.json())
        .then(json => prueba(json))
    
    
    function prueba (a){
        document.getElementById(`hijo${contador}`).src = `${a.message}`
        document.getElementById(`nuevoPerro`).src = `${a.message}`
        
        //https://images.dog.ceo/breeds/ridgeback-rhodesian/n02087394_8260.jpg
 



var enlaceSeparado = (a.message.split('/'));
//comprobar antes del push
razas.push(enlaceSeparado[4])
console.log(razas); 

    }  
    contador++;
    
}