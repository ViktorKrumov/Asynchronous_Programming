function solve() {

    let getInfo = document.getElementById('info');
    let buttonDepart = document.getElementById('depart');
    let buttonArrive = document.getElementById('arrive');


    async function getData (){
        try{
            const ulr = `http://localhost:3030/jsonstore/bus/schedule/${nextStop}`;
            const res = await fetch(ulr);
            console.log(res.ok);
            const data = await res.json();
            return data;
        }
        
        catch(e){
            getInfo.textContent= "Error";
            buttonDepart.disabled = true;
            buttonArrive.disabled = true;
        }

            
        
        
    }

    let nextStop = 'depot';

    async function depart() {
        buttonDepart.disabled = true;
        buttonArrive.disabled = false;

        nextStop = await getData();

        
        getInfo.textContent = `Next stop ${nextStop.name}`;
    }

    function arrive() {
        buttonDepart.disabled = false;
        buttonArrive.disabled = true;

        getInfo.textContent = `Arriving at ${nextStop.name}`;

        nextStop = nextStop.next;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();