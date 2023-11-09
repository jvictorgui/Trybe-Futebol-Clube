# Usar a imagem node:16.14-alpine como base
FROM node:16.14-alpine
# Mudar para o diretório de trabalho /app-backend
WORKDIR /app-backend
# Copiar os package.json, package-lock.json e packages.npm para o container
COPY package*.json packages.npm ./
# Instalar as dependências Node
RUN npm install

COPY . .
# Copiar o restante dos arquivos da aplicação para o container
EXPOSE  3001
# Sinalize que aplicação expõe a porta 3001
ENTRYPOINT ["npm", "run" ]
# Configurar os comandos para iniciar a aplicação de acordo com as boas práticas
# Dica: Leia a seção Docker e Docker-compose no README para mais informações
CMD ["start"]