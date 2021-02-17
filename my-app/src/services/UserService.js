


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
    console.log(data);
    console.log("logs");
    return  data
  
}

export async function  getAllEventos() {
    const response = await fetch(`/api/eventos`);
    const data = await response.json();
    return  data
  
}