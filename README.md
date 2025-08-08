# The Best Pokémon

![Status](https://img.shields.io/badge/status-Em%20Desenvolvimento-yellow.svg)
![Next.js](https://img.shields.io/badge/Next.js-15.3.2-black?logo=next.js)
![React](https://img.shields.io/badge/React-19.1.0-blue?logo=react)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.3.2-38B2AC?logo=tailwind-css)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0.4-blue?logo=typescript)
![NextAuth.js](https://img.shields.io/badge/NextAuth.js-4.24.11-blue?logo=next.js)

> Uma plataforma para que fãs de Pokémon possam votar e decidir, de forma democrática, qual é o melhor Pokémon de todos os tempos.

Este projeto é uma aplicação web interativa construída com as mais recentes tecnologias do ecossistema React. Ele permite que usuários autenticados via GitHub participem de votações em diferentes rankings para eleger seus Pokémon favoritos, além de poderem explorar um catálogo completo de todos os monstrinhos.

---

## 📋 Índice

* [💡 Sobre o Projeto](#-sobre-o-projeto)
* [✨ Funcionalidades](#-funcionalidades)
* [🛠️ Tecnologias Utilizadas](#-tecnologias-utilizadas)
* [🤝 Como Contribuir](#-como-contribuir)
* [📄 Licença](#-licença)

---

## 💡 Sobre o Projeto

`The Best Pokémon` nasceu da ideia de criar um espaço divertido e engajador para a comunidade de fãs. A aplicação consome a famosa [PokéAPI](https://pokeapi.co/) para obter dados detalhados sobre os Pokémon e apresenta esses dados em diferentes formatos:

1.  **Página de Ranking:** O coração do projeto, onde os usuários podem votar em seus Pokémon favoritos em listas geradas dinamicamente por tipo (Fogo, Água, Voador, etc.).
2.  **Catálogo (Pokédex):** Uma enciclopédia completa de todos os Pokémon, com uma interface de busca e rolagem infinita para uma melhor experiência de usuário.
3.  **Página de Detalhes:** Ao clicar em um Pokémon no catálogo, o usuário é levado a uma página com informações detalhadas, como status, habilidades, altura e peso.

A autenticação é gerenciada pelo NextAuth.js, utilizando o provedor do GitHub para garantir um processo de login seguro e simplificado.

---

## ✨ Funcionalidades

* ✅ **Autenticação com GitHub:** Login seguro e rápido utilizando o OAuth do GitHub.
* ✅ **Catálogo de Pokémon:** Uma Pokédex completa com função de busca e *scroll* infinito para carregar mais Pokémon de forma performática.
* ✅ **Páginas de Detalhes:** Informações completas para cada Pokémon, incluindo imagens, stats e habilidades/page.tsx].
* ✅ **Sistema de Votação:** Participe de rankings e vote nos seus Pokémon favoritos (o número de votos é limitado por sessão).
* ✅ **Consumo de API Externa:** Utiliza a `pokeapi.co` como fonte de dados, com as requisições sendo feitas através de uma API interna do Next.js para maior controle e cache.
* ✅ **Interface Responsiva:** Construída com Tailwind CSS para uma experiência agradável em qualquer dispositivo.

---

## 🛠️ Tecnologias Utilizadas

Este projeto foi construído com as seguintes tecnologias e bibliotecas:

* **Framework:** Next.js 15.3.2
* **Linguagem:** TypeScript 5.0.4
* **Estilização:** Tailwind CSS 3.3.2
* **Autenticação:** NextAuth.js 4.24.11
* **Bibliotecas React:**
    * React 19.1.0
    * React Icons
    * React Context API
* **Qualidade de Código:** ESLint

---

## 🤝 Como Contribuir

Contribuições são o que tornam a comunidade de código aberto um lugar incrível para aprender, inspirar e criar. Qualquer contribuição que você fizer será **muito apreciada**.

1.  **Faça um Fork** do projeto.
2.  **Crie uma Branch** para sua feature (`git checkout -b feature/MinhaNovaFeature`).
3.  **Faça o Commit** de suas mudanças (`git commit -m 'Adiciona MinhaNovaFeature'`).
4.  **Faça o Push** da Branch (`git push origin feature/MinhaNovaFeature`).
5.  **Abra um Pull Request**.

---
