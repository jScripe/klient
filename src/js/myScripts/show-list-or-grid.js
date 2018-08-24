import $ from 'jquery';
export default function showListOrGrid() {
    $(document).ready(function() {
        const gridProduct = $('.block-cart-product'),
            listProduct = $('.block-list-page'),
            gridView = $('.grid-view--grid'),
            listView = $('.grid-view--list');

        listProduct.hide();
        gridView.hide();

        listView.on('click', function() {
            gridProduct.hide();
            listProduct.show();
            listView.hide();
            gridView.show();
        })

        gridView.on('click', function() {
            gridProduct.show();
            listProduct.hide();
            listView.show();
            gridView.hide();
        })
    })    
}


