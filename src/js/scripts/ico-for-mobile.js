export default function icoForMobile() {
    $(document).ready(function() {
        $('.icons-for-mobile').click(function() {
            $('.icons-for-mobile__burger').toggleClass('icons-for-mobile__burger--active');
            
            $('.icons-for-mobile__basket').toggleClass('icons-for-mobile__basket--active');

            $('.icons-for-mobile__quit').toggleClass('icons-for-mobile__quit--active');
        });
    })
}
