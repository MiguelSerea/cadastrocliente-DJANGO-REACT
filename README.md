# README - Aplicação de Gerenciamento de Membros

==================================================

## DESCRIÇÃO
Aplicação React com CRUD completo para gerenciamento de membros 
com integração a API Django REST Framework e toggle de Dark Mode.

## PRÉ-REQUISITOS

- Node.js versão 14.x ou superior
- npm ou yarn instalado
- API Django configurada e rodando
- Python 3.x (para o backend)

## INSTALAÇÃO

1. Clone o repositório:
git clone [URL_DO_REPOSITORIO]

2. Acesse a pasta do projeto:
cd nome-da-pasta-do-projeto

3. Instale as dependências frontend:
npm install
ou
yarn install

4. Para o backend (Django), crie e ative um virtualenv:
python -m venv venv
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate     # Windows

5. Instale as dependências Python:
pip install -r requirements.txt

## CONFIGURAÇÃO

1. Backend (Django):
- Configure o arquivo settings.py com seu banco de dados
- Execute as migrações:
  python manage.py migrate
- Crie um superusuário:
  python manage.py createsuperuser

2. Frontend (React):
- Edite src/components/MemberList.js
- Atualize as URLs da API (http://127.0.0.1:8000/api/members/)
  para apontar para seu backend

## EXECUÇÃO

1. Inicie o backend Django:
python manage.py runserver

2. Em outro terminal, inicie o frontend React:
npm start
ou
yarn start

3. Acesse no navegador:
http://localhost:3000

## FUNCIONALIDADES PRINCIPAIS

- 📋 Listagem completa de membros
- ➕ Adição de novos membros
- ✏️ Edição de registros existentes
- ❌ Exclusão de membros
- 🌙 Modo noturno/diurno (toggle)
- 🔄 Atualização em tempo real

## ESTRUTURA DE ARQUIVOS

frontend/
├── public/
├── src/
│   ├── components/
│   │   ├── MemberList.js
│   │   └── themes.js
│   ├── App.js
│   └── index.js
├── package.json

backend/
├── manage.py
├── requirements.txt
└── [outros arquivos Django]

## DEPENDÊNCIAS PRINCIPAIS

Frontend:
- react
- react-dom
- axios
- styled-components

Backend:
- Django
- Django REST framework
- django-cors-headers

## COMANDOS ÚTEIS

- Rodar testes frontend:
  npm test

- Criar build de produção:
  npm run build

- Acessar admin Django:
  http://localhost:8000/admin

## OBSERVAÇÕES

1. O dark mode salva a preferência no localStorage
2. Para produção, configure CORS no Django settings.py
3. Recomendado usar variáveis de ambiente para URLs da API

## SUPORTE

Para problemas ou dúvidas, contate:
[seu-email@exemplo.com]
