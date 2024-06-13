## Starting database application with docker
`docker-compose up -d`

### Starting backend
`cd backend`  
`npm install`  
`criar arquivo .env e copiar conteúdo do arquivo .env.example`  
`npx prisma migrate deploy`  // configura o banco de dados  
`npx prisma generate`  // gera toda a configuração de tipagem  
`npm run start:dev`  

#### sempre que modificar alguma coisa no *prisma.schema*, rodar `npx prisma migrate dev`

### Starting frontend
`npm install`
`npm run dev`

