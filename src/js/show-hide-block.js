export default function showHideBlock() {
    $(document).ready(function() {
        
        const blockHomePage = $('.home-page'),
            blockNavItems = $('.block-nav-and-items'),
            blockItemPage = $('.block-item-page'),
            blockCartPage = $('.block-cart-page'),
            blockAddressPage =  $('.block-address-page'),
            blockPaymentPage = $('.block-payment-page');        

        function hideBlock() {
            blockNavItems.hide();
            blockItemPage.hide();
            blockCartPage.hide();
            blockAddressPage.hide();
            blockPaymentPage.hide();
        }
        hideBlock();

        $('.header__logo-holder').on('click', function() {
            hideBlock();
            blockHomePage.show();
        })

        $('.item-home-page').on('click', function() {
            blockHomePage.hide();
            blockNavItems.show();
        })

        $('.header__basket').on('click', function() {
            hideBlock();
            blockHomePage.hide();
            blockCartPage.show();
        })

        $('.basket-summary__button').on('click', function() {
            blockCartPage.hide();
            blockAddressPage.show();
        })
        
        $('.button-address-page').on('click', function() {
            blockAddressPage.hide();
            blockPaymentPage.show();
        })
    })    
}
