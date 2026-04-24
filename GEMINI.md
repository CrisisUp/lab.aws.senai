# Diretrizes de Desenvolvimento - Lab AWS SENAI

Este documento define regras obrigatórias para a manipulação deste repositório. Estas instruções têm precedência sobre qualquer comando geral.

## 1. Proteção de Conteúdo (Regra de Ouro)
- **NUNCA** altere, resuma, remova ou simplifique a prosa técnica contida no `index.html`.
- O conteúdo de pesquisa (procedimentos manuais, dicas de ouro, avisos de custo e scripts bash) é o ativo mais valioso deste projeto e deve ser preservado integralmente.
- Mudanças de UI/UX devem ser aplicadas apenas em tags de contêiner ou via CSS/JS externo, nunca alterando o `innerText` das explicações.

## 2. Padrões de Refatoração
- Use sempre o motor de variáveis (`data-var`). Se um novo valor técnico for identificado, adicione-o ao `awsConfig` no `script.js` e use a tag correspondente, sem alterar o contexto textual ao redor.
- Novas funcionalidades de interface devem ser implementadas de forma "não-invasiva", preservando a estrutura original do documento.

## 3. Gestão de Imagens
- O sistema de galeria suporta até 5 imagens por item de checklist, separadas por vírgula no atributo `data-img`.
- Placeholders para imagens ausentes devem ser mantidos para auxiliar o usuário na captura dos prints.

## 4. Estilo de Código
- CSS deve ser mantido exclusivamente no `style.css`.
- Lógica de comportamento deve ser mantida exclusivamente no `script.js`.
- O `index.html` deve permanecer limpo, focado no conteúdo e estrutura básica.
