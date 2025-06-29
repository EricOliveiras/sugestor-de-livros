# 🔮 Oráculo Literário

[![Status](https://img.shields.io/badge/status-concluído-brightgreen.svg)](https://github.com/EricOliveiras/sugestor-de-livros)
[![React](https://img.shields.io/badge/React-18-blue?logo=react)](https://react.dev/)
[![Hono](https://img.shields.io/badge/Hono-4-orange?logo=hono)](https://hono.dev/)
[![Prisma](https://img.shields.io/badge/Prisma-5-blueviolet?logo=prisma)](https://www.prisma.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)

O Oráculo Literário é uma aplicação web full-stack projetada para ajudar leitores a descobrir novos livros e gerenciar suas leituras. Cansado de não saber o que ler a seguir? O Oráculo oferece sugestões inteligentes, permite que você crie sua própria lista de leitura e avalie suas obras favoritas.

---

### ✨ **Acesse a Versão Online** ✨

**O projeto está no ar! Visite e teste em:** **[oraculo-literario.vercel.app](https://oraculo-literario.vercel.app/)**

---

### 🚀 Funcionalidades Principais

* **Autenticação de Usuários:** Sistema completo de cadastro e login com tokens JWT seguros.
* **Sugestão de Livros:** Receba sugestões de livros com base em filtros de gênero e idioma, utilizando a API do Google Books.
* **Lista de Leitura Pessoal:** Salve, veja e remova livros da sua lista pessoal.
* **Sistema de Avaliação:** Dê notas de 1 a 5 estrelas para os livros que você já leu.
* **Perfil de Usuário:** Gerencie seu nome e avatar em uma página de configurações dedicada.
* **Design Responsivo:** Interface moderna e elegante, construída com Chakra UI, totalmente adaptável para desktops e dispositivos móveis.

### 🛠️ Arquitetura e Tecnologias Utilizadas

Este projeto foi construído com uma stack de tecnologias modernas, focada em performance e escalabilidade, utilizando uma arquitetura JAMstack no frontend e Serverless no backend.

**Frontend:**
* **Framework:** React 18 com Vite
* **Linguagem:** TypeScript
* **UI/Estilo:** Chakra UI com um tema customizado
* **Roteamento:** React Router DOM
* **Cliente HTTP:** Axios

**Backend:**
* **Framework:** Hono (um framework ultrarrápido para ambientes Edge/Serverless)
* **Ambiente:** Cloudflare Workers
* **Linguagem:** TypeScript
* **ORM:** Prisma
* **Autenticação:** JWT (JSON Web Tokens) com `bcrypt-ts` para hashing de senhas

**Infraestrutura de Deploy:**
* **Frontend:** Hospedado na **Vercel**, com deploy contínuo integrado ao GitHub.
* **Backend:** Hospedado na **Cloudflare Workers**, garantindo performance global e sem "cold starts" (o servidor nunca dorme).
* **Banco de Dados:** PostgreSQL serverless hospedado na **Neon.tech**.
* **Proxy de Conexão:** **Prisma Data Proxy (Accelerate)** para gerenciar as conexões do banco de dados de forma segura e eficiente no ambiente serverless.

### 🧠 Aprendizados e Desafios

Este projeto foi uma jornada de aprendizado profunda que cobriu o ciclo de vida completo de uma aplicação web moderna. Os principais desafios superados e conhecimentos adquiridos incluem:

* **Desenvolvimento Full-Stack:** Construção de uma API RESTful segura e de uma interface de usuário reativa, e a integração entre elas.
* **Migração de Arquitetura:** O backend foi inicialmente construído com Express.js e hospedado na Render, e posteriormente **refatorado e migrado** para uma arquitetura serverless com Hono e Cloudflare Workers para resolver problemas de performance ("spin down").
* **Depuração em Produção:** Diagnóstico e resolução de problemas complexos de deploy em múltiplos ambientes de nuvem, incluindo:
    * Erros de **CORS** entre domínios diferentes (Vercel e Cloudflare).
    * Configuração de roteamento para **Single Page Applications (SPAs)** na Vercel para corrigir erros 404.
    * Conflitos de compatibilidade do **Prisma Client** em ambientes Node.js vs. Edge/Serverless, exigindo uma configuração avançada com Data Proxy, `wrangler.toml` e scripts de build específicos.
* **Fluxo de Trabalho com Git:** Implementação de uma estratégia de branching com `main` e `develop` para desenvolver novas funcionalidades de forma segura sem impactar o ambiente de produção.
* **Design System Customizado:** Criação e aplicação de um tema de design consistente (cores, fontes) em toda a aplicação usando Chakra UI.

---

### 👨‍💻 Autor

* **Eric Oliveira**
* [GitHub: EricOliveiras](https://github.com/EricOliveiras)
* [LinkedIn](https://www.linkedin.com/in/heyeriic/)