function Admin() {
    return (
        <div>
            <h1>Admin</h1>
            <p>Gere as tuas equipas</p>
            <form >
                <label for="nomeEquipa">Equipa</label><br></br>
                <input type="text" name="nomeEquipa"></input><br></br>
                <label for="nomeTreinador">Nome Treinador</label><br></br>
                <input type="text" name="nomeTreinador"></input><br></br>
                <label for="idadeTreinador">Idade Treinador</label><br></br>
                <input type="number" name="idadeTreinador"></input ><br></br>
                <label for="pontos">Pontos</label><br></br>
                <input type="number" name="pontos"></input><br></br>
                <input type="submit" value="Submit"></input>


            </form>

        </div>
    )
}

export default Admin