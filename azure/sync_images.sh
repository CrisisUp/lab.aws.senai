#!/bin/bash
cd "$(dirname "$0")"
echo "// Lista gerada automaticamente. Não edite manualmente." > images_list.js
echo "const imageList = [" >> images_list.js
ls imgs/img* | sort | sed 's/.*/    "&",/' | sed '$ s/,$//' >> images_list.js
echo "];" >> images_list.js
echo "Sincronizacao concluida!"
