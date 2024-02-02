
$(document).on("click", ".option",
    function () {

        if (!opt_select) {
            $("input[name='option']").not($(this)).prop("disabled", true);

            $("#btn_next_question").show();

            opt_select = $(this);
            opt_select.removeClass("btn-outline-primary");

            if (opt_select.data("correct")) {
                $("label[for='" + opt_select.attr('id') + "']").addClass("btn-outline-success");
                opt_correct = opt_select;
            } else {
                $("label[for='" + opt_select.attr('id') + "']").addClass("btn-outline-danger");

                opt_correct = $('.option').filter(function () { return $(this).data("correct") })
                $("label[for='" + opt_correct.attr('id') + "']").removeClass("btn-outline-primary");
                $("label[for='" + opt_correct.attr('id') + "']").addClass("btn-success");
            }
        }

    })

$(document).on("click", "#btn_next_question",
    function () {

        opt_select.prop("checked", false);
        opt_select.addClass("btn-outline-primary");
        $("label[for='" + opt_select.attr('id') + "']").removeClass("btn-outline-success");
        $("label[for='" + opt_select.attr('id') + "']").removeClass("btn-outline-danger");
        opt_correct.removeData();

        if (opt_select != opt_correct) {
            $("label[for='" + opt_correct.attr('id') + "']").addClass("btn-outline-primary");
            $("label[for='" + opt_correct.attr('id') + "']").removeClass("btn-success");
        }

        opt_correct = null;
        opt_select = null;
        $("input[name='option']").not($(this)).prop("disabled", false);

        getQuestion();

    })