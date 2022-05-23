const Excel = require('exceljs');

const fetchClients = async function(page,size){
    const data = await getClientsData()
    const output = getNthPage(data,page,size);
    return output;
}

const monthWiseData = async function(region){
    const regions = ["North", 'South', 'East', 'West'];
    let rows = await getClientsData();
    // filter based on region
    rows = rows.slice(2);
    if(regions.includes(region)){
        rows = rows.filter(row => {
             if(row[14] == region){ // row[14] refers country_region
               return row;
             }    
        })
    }
    const monthMap = rows.reduce((monthMap, row)=>{
       const month = row[2].match(/^\d{1,2}/);
       if(month && month[0]){
        if(!monthMap[month[0]]) monthMap[month[0]] = 1;
        else monthMap[month[0]] = ++monthMap[month[0]];
       }
       return monthMap;
    },{})
    return monthMap;
}

const getClientsData = async function(){
    const workbook = new Excel.Workbook();
    const fileName = './assets/Data Set - Insurance Client.csv'
    const worksheet = await workbook.csv.readFile(fileName);
    const data = worksheet.getSheetValues();
    return data;
}

const getNthPage = function(data,page,size){
    // Logic for filtering the columns
    const columns = data[1];
    const output = {
        columns: columns.slice(1),
        rows : [],
        total: 0
    }
    const current = (page - 1) * size + 2; // 2 for getting first row
    if(current < 0) return output;
    for(let start = current; start < current + +size ; start++){
       if(data[start]) {
        output.rows.push(data[start].slice(1));
       }
    }
    output.total
    return output;
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

module.exports = {
    fetchClients,
    monthWiseData,
    saveData
}