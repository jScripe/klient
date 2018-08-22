export default function popup() {
    $(document).ready(function() {
        $('.header__quit').click(function() {
            $('.block-login-form').addClass('block-login-form--active');
            $('.bg-block-login-form').fadeIn();        
        });

        $('.bg-block-login-form').click(function() {
            $('.block-login-form').removeClass('block-login-form--active');
            $('.block-registration').removeClass('block-registration--active');        
            $('.bg-block-login-form').fadeOut();
        });

        $('.general-close-modal').click(function() {
            $('.block-login-form').removeClass('block-login-form--active');
            $('.block-registration').removeClass('block-registration--active');                
            $('.bg-block-login-form').fadeOut();
        });

        $('.login-form__reg').click(function() {
            $('.block-login-form').removeClass('block-login-form--active');
            $('.block-registration').addClass('block-registration--active');
        });
        
        $('.registration-form__reg').click(function() {
            $('.block-registration').removeClass('block-registration--active');
            $('.block-login-form').addClass('block-login-form--active');
        });
    })    
}
