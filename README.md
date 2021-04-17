
# NOW MONEY ASSESSMENT PROJECT
## Requirements
- An API endpoint for creating and updating a bank record
- An API endpoint for retrieving the list of all banks with filteration based on certain fields
- Containerization and yaml configurations for kubernetes deployment

## Code structure
- Models - Database models for different entities used in the system
- Routers - Responsible for routing the requests and applying any authentication/authorization middlewares
- Controllers - Responsible for request parsing, logic implementation, database interaction and sending back a response

## Running the code
- Run "docker-compose up" and it will start the node server at PORT 4200

## Documentation
- /banks (GET) - List all the banks and it accepts query params - branch, name, code, address, state
- /banks (POST) - Create a new bank and if an exisiting record matches the _id, or bank-code, it updates the already created record - all fields, name, branch, state, and address are required

## Developer comments
This is my honest attempt at solving the given problem. I know that there can be so many different and some better way of implementing the same problem and I don't deny that. I have written some comments regarding how would I have liked to implement the API routes. 

Node and docker were my strengths but this assignment allowed me an opportunity to explore kubernetes as well and all the implementation that you see here is all learned on the fly through kubernetes documentation, stack overflow questions, and other online forums. 

I hope you like my honest attempt. Thanks!
