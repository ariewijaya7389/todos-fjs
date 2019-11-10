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
var todoTemplate = require("../views/partials/todo.hbs");
var addTodo = function () {
    var text = $('#add-todo-text').val();
    $.ajax({
        url: '/api/todos',
        type: 'POST',
        data: {
            text: text
        },
        dataType: 'json',
        success: function (data) {
            var todo = data.todo[0];
            var newLiHtml = todoTemplate(todo);
            $('form + ul').append(newLiHtml);
            $('#add-todo-text').val('');
        }
    });
};

$(function () {
    $(':button').on('click', addTodo);
    $(':text').on('keypress', function (e) {
        var key = e.keyCode;
        if (key == 13 || key == 169) {
            addTodo();
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
    });
    $('input').on('click', function () {
        $(this).parent().toggleClass('checked');
    });
})