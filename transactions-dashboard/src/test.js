const getData = async () => {
    const response = await fetch('http://localhost:3000/bar-chart?month=03');
    const data = await response.json()
    console.log(data)
}
export default getData