//import logo from './logo.svg';
import './App.css';

/*Bibliotecas*/
import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import logoCadastro from './assets/Colebemis-Feather-Edit.512.png';

function App() {

  const baseUrl="https://localhost:7037/api/Alunos";
  const [data, setData]=useState([]);
  const [modalIncluir,setModalIncluir]=useState(false);
  const [modalEditar,setModalEditar]=useState(false);


  const [alunoSelecionado,setAlunoSelecionado]=useState({
    id: '',
    nome: '',
    email: '',
    idade: ''
  });

  const selecionarAluno = (aluno, opcao) => {
    setAlunoSelecionado(aluno);
    (opcao === "Editar") &&
      abrirFecharModalEditar()
  }

  const abrirFecharModalIncluir=()=>{
    setModalIncluir(!modalIncluir);
  }

  const abrirFecharModalEditar=()=>{
    setModalEditar(!modalEditar);
  }

  const handleChange = e =>{
    const {name, value} = e.target;
    setAlunoSelecionado({
      ...alunoSelecionado,[name]:value
    });
    console.log(alunoSelecionado);
  }

  const pedidoGet = async()=>{
    await axios.get(baseUrl)
    .then(response => {
      setData(response.data);
    }).catch(error=>{
      console.log(error);
    })
  }

  const pedidoPost = async()=>{
    delete alunoSelecionado.id;
    alunoSelecionado.idade=parseInt(alunoSelecionado.idade);
      await axios.post(baseUrl, alunoSelecionado)
    .then(response => {
      setData(data.concat(response.data));
    }).catch(error=>{
      console.log(error);
    })
  }

  useEffect(()=>{
    pedidoGet();
  }, []);

  return (
    <div className="Aluno-container">
      <br/>
      <h3>Cadastro de Alunos</h3>
      <header>
        <img src={logoCadastro} alt='Cadastro' style={{ width: "75px", height: "auto" }}/>
        <button className="btn btn-success" onClick={()=>abrirFecharModalIncluir()}>Incluir Novo Aluno</button>
      </header>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Idade</th>
            <th>Operação</th>
          </tr>
        </thead>
        <tbody>
          {data.map(aluno=>(
            <tr key={aluno.id}>
              <td>{aluno.id}</td>
              <td>{aluno.nome}</td>
              <td>{aluno.email}</td>
              <td>{aluno.idade}</td>
              <td>
                <button className="btn btn-primary" onClick={()=>selecionarAluno(aluno, "Editar")}>Editar</button> {"  "}
                <button className="btn btn-danger" onClick={()=>selecionarAluno(aluno, "Excluir")}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <Modal isOpen={modalIncluir}>
      <ModalHeader>Incluir Alunos</ModalHeader>
      <ModalBody>
        <div className="form-group">
          <label>Nome: </label>
          <br />
          <input type="text" className="form-control" name="nome" onChange={handleChange}/>
          <br />
          <label>Email: </label>
          <br />
          <input type="text" className="form-control" name="email" onChange={handleChange}/>
          <label>Idade:</label>
          <br />
          <input type="text" className="form-control" name="idade" onChange={handleChange}/>
          <br />
        </div>
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-primary" onClick={()=>pedidoPost()}>Incluir</button>{" "}
        <button className="btn btn-danger" onClick={()=>abrirFecharModalIncluir()}>Cancelar</button>
      </ModalFooter>
      </Modal>
      
      <Modal isOpen={modalEditar}>
      <ModalHeader>Editar Aluno</ModalHeader>
      <ModalBody>
        <div className="form-group">
          <label>ID: </label>
          <br readyOnly value={alunoSelecionado && alunoSelecionado.id}/>
          <br />
          <label>Nome: </label>
          <br />
          <input type="text" className="form-control" name="nome" onChange={handleChange}/>
          <br />
          <label>Email: </label>
          <br />
          <input type="text" className="form-control" name="email" onChange={handleChange}/>
          <label>Idade:</label>
          <br />
          <input type="text" className="form-control" name="idade" onChange={handleChange}/>
          <br />
        </div>
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-primary" >Editar</button>{" "}
        <button className="btn btn-danger" onClick={()=>abrirFecharModalEditar()}>Cancelar</button>
      </ModalFooter>
      </Modal>
    </div>
  );
}

export default App;
