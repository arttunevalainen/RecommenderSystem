

/**
 * npm required
 * start datafetcher by node datafetcher.js
 */


async function getData() {

    for(let i = 0; i < 1; i++) {

        let randomNumber = Math.floor(Math.random() * (260000 - 1)) + 1;
    
        console.log(randomNumber);
        
        // Make a request for a user with a given ID
        await axios.get('https://bgg-json.azurewebsites.net/' + randomNumber)
        .then(function (response) {
            // handle success
            //console.error(response.data);

            if(response.data.message != "An error has occurred") {

                //Put data into JSON file.



            }
        })
        .catch(function (error) {
            // handle error
            console.error(error);
        });
    }
}