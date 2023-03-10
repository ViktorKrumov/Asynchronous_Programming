async function getInfo () {
	
		const stopName = document.getElementById(`stopName`);
		const buses = document.getElementById(`buses`);
		const input = document.getElementById(`stopId`).value;
	

	stopName.innerHTML = '';
	buses.innerHTML = '';

	async function getData (){
        try{
            const ulr = `http://localhost:3030/jsonstore/bus/businfo/${input}`;
            const res = await fetch(ulr);
            console.log(res.ok);
            const data = await res.json();
            return data;
        }
        
        catch(e){
            stopName.textContent= "Error";
        }

            
        
        
    }

    const dataJson = await getData();

    for(const key in dataJson){
        if(key === "name"){
            stopName.textContent = dataJson[key];
        }
        else{
            for(const stopBuses in dataJson[key]){
                const li = document.createElement('li');
                li.innerHTML = `Bus ${stopBuses} arrives in ${dataJson[key][stopBuses]}`;
                buses.appendChild(li);
            }
        }
    }
		

}