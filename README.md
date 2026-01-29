# 🔗 Blockchain Supply Chain Tracker

![Solidity](https://img.shields.io/badge/Solidity-363636?style=for-the-badge&logo=solidity&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Ethereum](https://img.shields.io/badge/Ethereum-3C3C3D?style=for-the-badge&logo=ethereum&logoColor=white)

A decentralized supply chain tracking system built on Ethereum blockchain that enables transparent tracking of products from manufacturer to consumer with complete immutability and transparency.

## ✨ Features

### 🔗 Blockchain Features
- **Smart Contract**: Ethereum-based supply chain tracking contract
- **Product Lifecycle**: Track products from creation to delivery
- **Ownership Transfer**: Secure transfer between supply chain participants
- **Status Updates**: Real-time status (Created, In Transit, Delivered)
- **Immutable Records**: All transactions stored permanently on blockchain

### 🖥️ Application Features
- **User-friendly Interface**: React-based frontend with Material-UI
- **MetaMask Integration**: Secure wallet connection
- **REST API**: Node.js/Express backend for off-chain data
- **Database**: MongoDB for product information storage
- **Responsive Design**: Works on desktop and mobile

## 🏗️ Architecture

```mermaid
graph TD
    A[User Interface] --> B[React Frontend]
    B --> C[Web3.js]
    C --> D[Ethereum Blockchain]
    B --> E[Node.js Backend]
    E --> F[MongoDB Database]
    D --> G[Smart Contracts]
