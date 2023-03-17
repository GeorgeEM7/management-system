// get total
function getTotal() {
    if (priceInputElement.value != '') {
        let result = (+priceInputElement.value + +taxesInputElement.value + +adsInputElement.value) - +discountInputElement.value;
        totalSmallElement.innerHTML = result;
        totalSmallElement.style.background = '#040';

        if (result <= 0) {
            totalSmallElement.style.background = 'rgb(99, 18, 18)';
        } else {
            totalSmallElement.style.background = '#040';
        }

    } else {
        totalSmallElement.innerHTML = '';
        totalSmallElement.style.background = 'rgb(99, 18, 18)';
    }
}


// create product
if (localStorage.product != null) {
    productData = JSON.parse(localStorage.product);
} else {
    productData = [];
}

createBtnElement.onclick = function () {
    let newProductData = {
        title: titleInputElement.value,
        price: priceInputElement.value,
        taxes: taxesInputElement.value,
        ads: adsInputElement.value,
        discount: discountInputElement.value,
        total: totalSmallElement.innerHTML,
        count: countInputElement.value,
        category: categoryInputElement.value,
    }


    if (titleInputElement.value != '') {

        if (mode === 'create') {
            //count
            if (newProductData.count > 1) {
                for (let i = 0; i < newProductData.count; i++) {
                    productData.push(newProductData);
                }
            } if (newProductData.count == '' || newProductData.count == 1) {
                productData.push(newProductData);
            }
        } else {
            productData[tmp] = newProductData;
            mode = 'create';
            createBtnElement.innerHTML = 'Create'
            countInputElement.classList.remove('count-edit-mode');
        }

        //clear
        clearProductData();
    }


    // save data to local storage
    localStorage.setItem("product", JSON.stringify(productData));


    //show
    showProductData()
}

// clear inputs
function clearProductData() {
    titleInputElement.value = '';
    priceInputElement.value = '';
    taxesInputElement.value = '';
    adsInputElement.value = '';
    discountInputElement.value = '';
    totalSmallElement.innerHTML = '';
    countInputElement.value = '';
    categoryInputElement.value = '';
    totalSmallElement.style.background = 'rgb(99, 18, 18)';

}

// show (read) data
function showProductData() {
    let table = '';
    for (let i = 0; i < productData.length; i++) {
        table += `
            <tr>
                <td>${i + 1}</td>
                <td>${productData[i].title}</td>
                <td>${productData[i].price}</td>
                <td>${productData[i].taxes}</td>
                <td>${productData[i].ads}</td>
                <td>${productData[i].discount}</td>
                <td>${productData[i].total}</td>
                <td>${productData[i].category}</td>
                <td><button onclick="editProductData(${i})" id="edit">Edit</button></td>
                <td><button onclick="deleteProductData(${i})" id="delete">Delete</button></td>
            </tr>
        `
    }

    tbodyElmenet.innerHTML = table;
    if (productData.length > 0) {
        deleteAllElement.innerHTML = `<button onclick="deleteAllData()">Delete all (${productData.length})</button>`
    } else {
        deleteAllElement.innerHTML = '';
    }

}
showProductData()

// delete all data
function deleteAllData() {
    let deleteAllDataConfirmation = confirm('Are you sure you want to DELETE ALL data?');
    if (deleteAllDataConfirmation === true) {
        localStorage.clear();
        productData.splice(0);
        showProductData();
    }
}

//delete
function deleteProductData(i) {
    productData.splice(i, 1);
    localStorage.product = JSON.stringify(productData);
    showProductData()
}


// Edit (update) data
function editProductData(i) {
    titleInputElement.value = productData[i].title;
    priceInputElement.value = productData[i].price;
    taxesInputElement.value = productData[i].taxes
    adsInputElement.value = productData[i].ads;
    discountInputElement.value = productData[i].discount;
    getTotal();
    countInputElement.classList.add('count-edit-mode');
    categoryInputElement.value = productData[i].category;
    createBtnElement.innerHTML = 'Update';

    mode = 'edit';
    tmp = i;

    scroll({
        top: 0,
        behavior: 'smooth',
    })
}

// search
function getSearchMode(id) {

    if (id == "search-by-title") {
        searchMode = 'title';
    } else {
        searchMode = 'category';
    }
    searchInputElement.placeholder = 'Search by ' + searchMode;
    searchInputElement.focus();
    searchInputElement.value = '';
    showProductData();
}

function searchForData(searchInputValue) {
    let table = '';
    for (let i = 0; i < productData.length; i++) {
        if (searchMode == 'title') {

            if (productData[i].title.toLowerCase().includes(searchInputValue.toLowerCase())) {
                table += `
            <tr>
                <td>${i + 1}</td>
                <td>${productData[i].title}</td>
                <td>${productData[i].price}</td>
                <td>${productData[i].taxes}</td>
                <td>${productData[i].ads}</td>
                <td>${productData[i].discount}</td>
                <td>${productData[i].total}</td>
                <td>${productData[i].category}</td>
                <td><button onclick="editProductData(${i})" id="edit">Edit</button></td>
                <td><button onclick="deleteProductData(${i})" id="delete">Delete</button></td>
            </tr>
                `
            }
        } else {

            if (productData[i].category.toLowerCase().includes(searchInputValue.toLowerCase())) {
                table += `
            <tr>
                <td>${i + 1}</td>
                <td>${productData[i].title}</td>
                <td>${productData[i].price}</td>
                <td>${productData[i].taxes}</td>
                <td>${productData[i].ads}</td>
                <td>${productData[i].discount}</td>
                <td>${productData[i].total}</td>
                <td>${productData[i].category}</td>
                <td><button onclick="editProductData(${i})" id="edit">Edit</button></td>
                <td><button onclick="deleteProductData(${i})" id="delete">Delete</button></td>
            </tr>
                `

            }
        }
    }
    tbodyElmenet.innerHTML = table;
}

// clean data
