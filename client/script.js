// document.addEventListener("DOMContentLoaded", function (e) {
//     var checkboxes = document.getElementsByTagName('input');
//     for (var i = 0; i < checkboxes.length; i++) {
//         checkboxes[i].addEventListener('click', clickHandler);
//     }
// });

// function clickHandler() {
//     if (this.checked) {
//         this.parentNode.className = 'checked';
//     } else {
//         this.parentNode.className = '';
//     }
// }

var $ = require('jquery');

$(function () {
    $('input').on('click', function () {
        $(this).parent().toggleClass('checked');
    })
})