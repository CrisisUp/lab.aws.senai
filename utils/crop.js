const sharp = require('sharp');
const path = require('path');

/**
 * Script para recortar imagens usando a biblioteca sharp.
 * Uso: node crop.js <imagem_entrada> <esquerda> <topo> <largura> <altura> [imagem_saida]
 */

const args = process.argv.slice(2);

if (args.length < 5) {
    console.log('Uso: node crop.js <imagem_entrada> <esquerda> <topo> <largura> <altura> [imagem_saida]');
    console.log('Exemplo: node crop.js img01.png 100 100 500 500 cropped_img01.png');
    process.exit(1);
}

const [inputPath, left, top, width, height, outputPath] = args;

const cropOptions = {
    left: parseInt(left),
    top: parseInt(top),
    width: parseInt(width),
    height: parseInt(height)
};

const finalOutputPath = outputPath || `cropped_${inputPath}`;

async function cropImage() {
    try {
        await sharp(inputPath)
            .extract(cropOptions)
            .toFile(finalOutputPath);
        
        console.log(`✅ Imagem recortada com sucesso: ${finalOutputPath}`);
        console.log(`   Medidas: ${width}x${height} a partir de (${left}, ${top})`);
    } catch (error) {
        console.error('❌ Erro ao recortar imagem:', error.message);
        process.exit(1);
    }
}

cropImage();
