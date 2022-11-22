const excel = require('exceljs');
const workbook = new excel.Workbook();
let worksheet, totalrows; 

//this function will read Salesmate link name from the xlsx file and return that data
async function readSalesmteLinkName(filePath,sheetName){
    await workbook.xlsx.readFile(filePath);
    worksheet = workbook.getWorksheet(sheetName);
    totalrows = worksheet.rowCount;
    const salesmateLinkname = worksheet.getRow(2).getCell(1).value;
    return salesmateLinkname;
}exports.readSalesmteLinkName=readSalesmteLinkName;

//this function will read user related details from the xlsx file and return those data
async function readUserDetails(filePath,sheetName){
    let user=[], profile=[], role=[], email=[], password=[], googlePassword=[], isActive=[],
    firstName=[], lastName=[], fullName=[];

    await workbook.xlsx.readFile(filePath);
    worksheet = workbook.getWorksheet(sheetName);
    totalrows = worksheet.rowCount;
    
    for(let i=2; i<=totalrows; i++){
        user.push(worksheet.getRow(i).getCell(1).value);
        firstName.push(worksheet.getRow(i).getCell(2).value);
        lastName.push(worksheet.getRow(i).getCell(3).value);
        fullName.push(worksheet.getRow(i).getCell(4).value);
        profile.push(worksheet.getRow(i).getCell(5).value);
        role.push(worksheet.getRow(i).getCell(6).value);
        email.push(worksheet.getRow(i).getCell(7).value);
        password.push(worksheet.getRow(i).getCell(8).value);
        googlePassword.push(worksheet.getRow(i).getCell(9).value);
        isActive.push(worksheet.getRow(i).getCell(10).value);
    }

    return {
        user:user, 
        profile:profile, 
        role:role, 
        email:email, 
        password:password, 
        googlePassword:googlePassword, 
        isActive:isActive,
        firstName:firstName,
        lastName:lastName,
        fullName:fullName
    };
}exports.readUserDetails=readUserDetails;