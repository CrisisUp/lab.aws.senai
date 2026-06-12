# ☁️ Galeria de Implantação Azure

Este projeto é uma ferramenta de apresentação cinematográfica e automatizada para evidências de infraestrutura em nuvem (Microsoft Azure).

## 🚀 Funcionalidades Principais

- **Visualização Padronizada:** Todas as imagens são renderizadas em um quadro fixo de **2406x1073px**, utilizando 'Corte Inteligente' (Crop).
- **Navegação Multimodal:**
  - **Teclado:** Setas e Barra de Espaço.
  - **Toque (Mobile):** Suporte a gestos de Swipe.
- **Sincronização Automática:** Script dedicado para detectar e ordenar novas imagens.

## 📂 Estrutura de Pastas

- **imgs/**: Coloque suas capturas de tela aqui.
- **azure.html**: Página principal.
- **sync_images.sh**: Script de sincronização.

## 🛠️ Como Atualizar

Execute no terminal:

```bash
./azure/sync_images.sh
```
