class Script {
    prepare_outgoing_request ({request}){
        let args = request.data.text.replace("!giphy","").trim().replace(" ","+")
        let api_key = "api_key"
        let query = ""
        let limit = "30"

      	return {
          url: request.url + "?api_key=" + api_key + "&q=" + args + "&limit=" + limit,
          method: "GET"

        }
    }

    process_outgoing_response({request,response}){

      	const randomNumber = Math.floor(Math.random() * 31)
        
        let queryParams = request.url.split("?")[1].split("&")
        
        let paramObject = {}
        
        for(let y = 0; y < (queryParams.length - 1); y++){
          	
          	let param = queryParams[y].split("=")
         	
            paramObject[param[0]] = param[1]
          
        }

        picArray = []

        for(let x = 0; x < response.content.data.length; x ++){

            picArray.push({
                title: response.content.data[x].title,
                url: response.content.data[x].images.original.url
            })

        }

        return {
            content: {
                username: "GiphyBot",
              	text: randomNumber + ":[" + paramObject.q + "]",
              	parseUrls: true,
              	attachments: [
                  {

                    image_url: picArray[randomNumber].url
                  }
                ]
            }
        }


    };
}