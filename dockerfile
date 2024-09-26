FROM node:18-alpine

WORKDIR /app

# Copier les fichiers de configuration de npm
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Définir une variable d'environnement temporaire pour le build
ARG NEXT_PUBLIC_API_URL=http://192.168.1.86:3000

# Copier tous les fichiers de l'application
COPY . .

# Utiliser la variable d'environnement lors du build
RUN NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL npm run build

# Exposer le port
EXPOSE 3001

# Commande pour démarrer l'application
CMD ["npm", "start"]