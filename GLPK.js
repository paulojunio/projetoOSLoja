module.exports = {
    solve:(data,res) => {
        console.log(data);
        solvelog = "Deu certo!";
        res.send({optimization: solvelog})
    }
}