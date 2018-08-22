export default function height() {
    $(document).ready(function() {

        // height-adaptation

        let  heightTopBottom = 138 + 45;

        function setHeiHeight() {
            $('.height-alignment').css({
                minHeight: $(window).height() - heightTopBottom + 'px'
            });
        }

        setHeiHeight();
        $(window).resize( setHeiHeight );
    });
}


