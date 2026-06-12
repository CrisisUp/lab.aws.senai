# Utilidades de Imagem - Lab AWS SENAI

Este diretório contém ferramentas utilitárias para manipulação de imagens do laboratório.

## 1. Recortador de Imagem (Crop)

Usa a biblioteca `sharp` para recortar imagens com precisão.

### Pré-requisitos
- Node.js instalado.
- Dependências instaladas (execute `npm install` nesta pasta).

### Como usar
Navegue até esta pasta no terminal e execute:

```bash
node crop.js <caminho_da_imagem> <esquerda> <topo> <largura> <altura> [nome_da_saida]
```

**Parâmetros:**
- `<caminho_da_imagem>`: Caminho para o arquivo original (ex: `../img01a.png`).
- `<esquerda>` (left): Posição X inicial do recorte.
- `<topo>` (top): Posição Y inicial do recorte.
- `<largura>` (width): Largura do retângulo de recorte.
- `<altura>` (height): Altura do retângulo de recorte.
- `[nome_da_saida]` (opcional): Nome do arquivo final. Se omitido, usará `cropped_` + nome original.

### Exemplo
Para recortar um quadrado de 500x500 pixels começando da posição (100, 100) da imagem `img01a.png`:

```bash
node crop.js ../img01a.png 100 100 500 500
```
