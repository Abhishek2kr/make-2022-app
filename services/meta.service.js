const Excel = require('exceljs');
const {setMetaRepo, getMetaRepo , getMetaByIdRepo} = require('../repositories/meta.repositories');
const {setDictRepo, getDictRepo} = require('../repositories/dict.repositories');


const fetchColumns = async function(){
    const fileData = await readFile()
    return fileData;
}

const registerMeta = async function(data){
    const response = await setMetaRepo(data);
    if(response) {
        // add cols into dictionary
        const dictQuery = data.columns.map(column => {
            return {word: column, meaning: column}
        });
        const isAddedToDict = await setDictRepo(dictQuery);
        return {metaResponse: response, dictResponse: isAddedToDict};
    }
    return response;
}

const fetchMeta = function(query){
    console.log(query)
    const response = getMetaRepo(query);
    return response;
}

const readFile = async function(fileName){
    const workbook = new Excel.Workbook();
    const worksheet = await workbook.csv.readFile(fileName);
    const data = worksheet.getSheetValues();
    return data;
}

const saveData = async function(data,page,size){
    const workbook = new Excel.Workbook();
    const fileName = './assets/Data Set - Insurance Client.csv'
    const worksheet = await workbook.csv.readFile(fileName);
    const current = (page - 1) * size + 2; // 2 for getting first row
    if(current < 0) return output;
    for(let start = current; start < current + +size ; start++){
       if(data[start]) {
        console.log(start,[...data[start - 2]]);
        worksheet.getRow(start).values = [...data[start - 2]];
       }
    }
    await workbook.csv.writeFile(fileName);
    return {success: true, message: "Succesfully saved"}
}

// Kind of training dict
const addColIntoDict = async function (cols) {
    const words = cols.map(col => {
        return {
            word: col,
            mappings: [col]
        }
    })
    return setDictRepo(words);
}

// upload and process file 
const uploadAndProcessSourceFile = async function (containsCol, metaTableName, file) {
    try {
        console.log("fdsfsdsf");
        // read file
    const excelData = await readFile(file.path);
    // if it contains cols
    if(containsCol){
        // look for first row
        let index = 0;
        while(index < excelData.length){
            if(excelData[index]) {
                break;
            }
            index++;
        }
        let colData = excelData[index];
        // fetch meta cols
        const metaQuery = {
            name: metaTableName
        }
        let {columns}  = await getMetaRepo(metaQuery, 'columns');
        console.log(typeof columns, Array.isArray(columns));
        // fetch dictionary
        const query = [
            { $match: { 'word': {$in: columns }} },
            {
                $group: {
                    _id: '$word',
                    meanings: { $push: '$meaning' },
                }
            }, {
                $project: {
                    word: '$_id',
                    meanings: 1,
                    _id: 0
                }
            }
        ];
        let dictionary = await getDictRepo(query);
        let mapping = colData.reduce((output, cd) => {
            if(!cd) return output;
            output[cd] = null; // init to use as unmapped
            // check in dictionary
            let index = 0;
            while(index < dictionary.length){
                if(dictionary[index].meanings.toString().match(cd)){
                   output[cd] = dictionary[index].word;
                   break;
                }
                index++;
            }
            return output;
        }, {})
        
        // prepare possible matches
       //  const cloneDictionary = JSON.parse(JSON.stringify(dictionary));
        const possibleMatches = Object.values(mapping).reduce((cloneDictionary,d) => {
            return cloneDictionary.filter(cd => cd.word !== d);
        },JSON.parse(JSON.stringify(dictionary)));
        const result = {
            mapping: mapping,
            possibleMatches : possibleMatches
        }
        return result;
    }
    } catch (error) {
        console.log(error);
        throw(error);
    }
    
}



module.exports = {
    fetchColumns,
    saveData,
    registerMeta,
    fetchMeta,
    uploadAndProcessSourceFile
}