<div align="center">

# 🛡️ JWT-Guard

**Advanced Client-Side JWT Security Analyzer**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-v18+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-v19-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-Fast-purple.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38bdf8.svg)](https://tailwindcss.com/)

[Features](#-features) • [Installation](#-installation) • [Usage](#-usage) • [Security Checks](#-security-checks) • [Disclaimer](#-disclaimer)

</div>

---

## 📖 Overview

**JWT-Guard** is a modern, privacy-focused security tool for auditing JSON Web Tokens (JWT). It helps developers and security professionals identify common misconfigurations and vulnerabilities in JWT implementations instantly.

Built with **React** and **Tailwind CSS**, it features a beautiful, dark-themed responsive UI and runs **entirely in the browser**. No tokens are ever sent to a server.

## ✨ Features

- 🎨 **Modern Design**: Aesthetic dark mode UI with glassmorphism and smooth animations.
- 🔒 **Privacy First**: All analysis happens client-side.
- ⚡ **Instant Analysis**: Real-time decoding and security checking.
- 🛡️ **Vulnerability Detection**:
  - **'None' Algorithm**: Detects unsecured tokens.
  - **Weak Secrets**: Brute-force checks against common weak keys (client-side simulation).
  - **Expiration**: Validates `exp` claims and token lifetime.
  - **Structure**: Validates JWT format and parts.

## 🛠 Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS v4, Lucide React
- **Logic**: jwt-decode, Custom Analysis Engine
- **Styling**: Tailwind CSS, clsx, tailwind-merge

## 📦 Installation

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js (v18 or higher)
- npm

### 1. Clone the Repo

```bash
git clone https://github.com/yourusername/jwt-guard.git
cd jwt-guard
```

### 2. Install Dependencies

```bash
npm install
```

## 🚀 Usage

```bash
npm run dev
```
Access the application at `http://localhost:5173`.

## 🛡️ Security Checks

| Check | Severity | Description |
|-------|----------|-------------|
| **Algorithm 'None'** | CRITICAL | Detects if the token is unsigned, allowing forgery. |
| **Weak Secret** | HIGH | Checks signature against a list of common weak secrets (e.g., 'secret', '123456'). |
| **Expired Token** | MEDIUM | Verifies if the token's `exp` claim is in the past. |
| **Missing Expiration** | LOW | Warns if the token has no expiration date. |

## ⚠️ Disclaimer

> [!NOTE]
> **EDUCATIONAL PURPOSE**
> 
> This tool is designed for **educational and defensive purposes only**.
> - Do not use this tool to audit tokens you do not own or have permission to test.
> - The weak secret check is a client-side simulation and not a replacement for comprehensive backend auditing.

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<div align="center">
  <p>Made with ❤️ by Antigravity</p>
</div>
