import multer from 'multer'
import { v4 as uuidv4 } from 'uuid'
import path from 'node:path'// Importa utilitários nativos do Node.js para manipular caminhos e extensões de arquivos.

// Cria uma configuração de armazenamento de arquivos no disco.
const storage = multer.diskStorage({
    // Define a pasta "uploads", resolvendo o caminho a partir do diretório de execução do Node.js.
    destination: path.resolve('uploads'),
    // Define uma função chamada pelo Multer para escolher o nome de cada arquivo recebido.
    filename: (req, file, callback) => {
        // Informa que não houve erro e monta o nome usando um UUID.
        // Atenção: path.extname é uma função e, aqui, não recebe o nome original do arquivo.
        // Para obter a extensão, seria necessário usar path.extname(file.originalname).
        callback(null, `${uuidv4()}${path.extname(file.originalname)}`)
    }, // Fecha a função que define o nome do arquivo.
}) // Fecha a configuração de armazenamento em disco.
// Exporta uma instância do Multer configurada para usar o armazenamento definido acima.
export default multer({ storage })
