module.exports = (items) => {
	delete items.CategoryID;
	delete items.CategoryName;
	delete items.Description;
	delete items.Picture;

	let Suppliers = {
		SupplierID: items.SupplierID,
		CompanyName: items.CompanyName,
		ContactName: items.ContactName,
		ContactTitle: items.ContactTitle,
		Address: {
			Street: items.Address,
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

	items = Suppliers;
	return items;
};
