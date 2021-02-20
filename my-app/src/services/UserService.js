


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

export async function  getAllEventos() {
    const response = await fetch(`/api/eventos`);
    const data = await response.json();
    return  data
  
}

export async function setEmpresa(data) {
    const response = await fetch(`/api/empresa_selector`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({user: data})
      })
    return await response.json();

}
export async function setCorreo(email,correo,auntoCorreo,id_colab,tipo_evento,start){
    const response = await fetch(`/api/envioCorreo`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({mensaje: correo,email:email,asunto:auntoCorreo,id_colaborardor:id_colab,tipo_evento:tipo_evento,fecha_evento:start})
      })
    return await response.json();
}