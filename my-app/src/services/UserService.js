


export async function getAllUsers() {

    const response = await fetch('/api/users');
    const data = await response.json();
    console.log(data);
    console.log("logs");
    return  data
}

export async function  getAllEmpresas() {
    const response = await fetch(`/api/empresas`);
    const data = await response.json();

    return  data
  
}


export async function  getColaboradores(empresa_id) {
    const response = await fetch(`/api/colaboradores`,{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({empresa_id: empresa_id})
    });
    console.log("esperando colaboradores");
    const data = await response.json();
    console.log(data);
    return  data
  
}

export async function  getAllEventos(emp) {
    const response = await fetch(`/api/eventos`,{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({empresa: emp})


    })
    return  await response.json();
   
  
}


export async function  createEvent(data) {
    console.log(data)
    const response = await fetch(`/api/createEvent`,{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)


    })
    console.log("evento creado")
    return  await response.json();
  
}

export async function setEmpresa(data) {
    const response = await fetch(`/api/empresa_selector`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({user: data})
      })
    return await response.json();

}
export async function setCorreo(email,correo,auntoCorreo,id_colab,tipo,start,_id){
    const response = await fetch(`/api/programarEvento`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({mensaje: correo,email:email,asunto:auntoCorreo,id_colaborardor:id_colab,tipo:tipo,fecha_evento:start,_id:_id })
      })
    return await response.json();
}