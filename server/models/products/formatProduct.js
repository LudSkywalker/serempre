module.exports=(items)=>{
let Category = {
    CategoryID: items.CategoryID,
    CategoryName: items.CategoryName,
    Description: items.Description,
    Picture:(items.Picture)? Buffer.from(items.Picture).toString("base64"):null,
};
delete items.CategoryID;
delete items.CategoryName;
delete items.Description;
delete items.Picture;
items.Category = Category;

let Suppliers = {
    SupplierID: items.SupplierID,
    CompanyName: items.CompanyName,
    ContactName: items.ContactName,
    ContactTitle: items.ContactTitle,
    Address:{
        Street:items.Address,
        City: items.City,
        Region: items.Region,
        PostalCode: items.PostalCode,
        Country: items.Country,
        Phone: items.Phone,
    },
        
    Description: items.Description,
    Fax: items.Fax,
    HomePage: items.HomePage,
};
delete items.SupplierID;
delete items.CompanyName;
delete items.ContactName;
delete items.ContactTitle;
delete items.Address;
delete items.City;
delete items.Region;
delete items.PostalCode;
delete items.Country;
delete items.CategoryName;
delete items.Phone;
delete items.Fax;
delete items.HomePage;
items.Suppliers = Suppliers;
return items;
}