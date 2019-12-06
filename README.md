# BlogPost API

### Prerequisites: 
- Node.js 12.x.x installed. 
- npm installed for managing our packages. 
- PostgreSQL 11.5.x installed for database usage. 
- Postman or a similar program for testing different requests on the API.

### Installation: 
- Clone the repository.
- Create the "blogpost" database on PostgreSQL.
- Dump the backup file included on the "backup" folder into the blogpost database using the follow command:

```  
psql blogpost < backup/backup  
```
- Initiate the server by doing the following : 

``` cd src 
    ts-node server.ts 
```

### How to use the API :
The documentation can be found on the following link: 
- https://documenter.getpostman.com/view/9661494/SWE3df6W?version=latest
