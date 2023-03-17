let productData

const titleInputElement = document.getElementById('title');

const priceInputElement = document.getElementById('price');
const taxesInputElement = document.getElementById('taxes');
const adsInputElement = document.getElementById('ads');
const discountInputElement = document.getElementById('discount');

const totalSmallElement = document.getElementById('total');

const countInputElement = document.getElementById('count');

const categoryInputElement = document.getElementById('category');

const createBtnElement = document.getElementById('create');

const searchInputElement = document.getElementById('search-input');

const editBtnElement =  document.getElementById('edit');

const deleteAllElement = document.getElementById('delete-all')

const tbodyElmenet = document.getElementById('tbody');

const searchByTitleInputElement = document.getElementById('search-by-title');
const searchByCategoryInputElement = document.getElementById('search-by-category');

let mode = 'create';

let searchMode = 'title';

let tmp;