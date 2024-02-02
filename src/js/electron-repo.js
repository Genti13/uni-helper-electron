async function getQuestion() {

    $("#btn_next_question").hide();

    await window.api.path();
    let test = await window.api.fetchone("SELECT * FROM Question ORDER BY RANDOM() LIMIT 1", []);

    $("#question").text(test["question"]);

    correct_option = test["opt_correct"];

    let opts = [1, 2, 3, 4];

    for (let index = 1; index <= 3; index++) {
        i = Math.floor(Math.random() * opts.length);

        console.log("INDEX: " + index);
        console.log("i: " + i);

        $("#opt_" + opts[i] + "_txt").text(test["opt_" + index]);
        $("#opt_" + opts[i]).val(test["opt_" + index]);
        opts.splice(i, 1);
    }

    $("#opt_" + opts[0] + "_txt").text(test["opt_correct"]);
    $("#opt_" + opts[0]).val(test["opt_correct"]);
    $("#opt_" + opts[0]).data("correct", true);
}