$(function () {
    let data1 = "";
    let data2 = "";

    function data_import() {
        $.when(
                $.getJSON("course.json"),
                $.getJSON("course_record.json")
            )
            .done(function (data1_raw, data2_raw) {

                data1 = data1_raw[0];
                data2 = data2_raw[0];
                console.log(data1, data2);
                output();
            })
            .fail(function () {
                console.log("Error");
            });
    };

    function output() {
        // JSONデータを受信した後に実行する処理
        let output_html = ``;
        output_html += `<div class="row">`

        for (let i = 0; i < data1.length; i++) {
            if (i % 3 == 0) {};
            output_html += `<div class="col-lg-6 col-xl-4">`
            output_html += `<div class="card">`
            output_html += `<h5 class="card-header">${data1[i].set_title}　${data1[i].month}</h5>`;
            output_html += `<div class="card-body">`;

            output_html += `<table class="table table-sm table-hover">`;
            //output_html += `<caption>created ${data1[i].created.slice(0, 10)}</caption>`
            output_html += `<thead>`;
            output_html += `<th scope="col" style="width:4%">#</th>`;
            output_html += `<th scope="col" colspan="2" style="width:64%">楽曲</th>`;
            output_html += `<th scope="col" style="width:20%">難易度</th>`;
            output_html += `<th scope="col" style="width:12%">lv.</th>`;
            output_html += `</thead>`;
            output_html += `<tbody>`;
            for (let index = 0; index < 3; index++) {
                output_html += `<tr>`;

                output_html += `<th class="align-middle track" scope="row">${data1[i].track[index].trackNo}</th>`;

                if (data1[i].track[index].image != "") {
                    output_html += `<td class="align-middle" style="width:12%"><img  class="rounded d-block mx-auto" src="https://chunithm-net.com/mobile/img/${data1[i].track[index].image}.jpg"></td>`;
                } else {
                    output_html += `<td class="align-middle" style="width:12%"><img  class="rounded d-block mx-auto" src="https://chunithm-net.com/mobile/images/map_skill_none_icon.png"></td>`;
                };

                if (data1[i].track[index].title != "") {
                    output_html += `<td class="align-middle">${data1[i].track[index].title}</td>`;
                } else {
                    output_html += `<td class="align-middle">---</td>`;
                };

                if (data1[i].track[index].difficult != "") {
                    if (data1[i].track[index].difficult == "MASTER") {
                        output_html += `<td class="align-middle master">MAS</td>`;
                    } else if (data1[i].track[index].difficult == "EXPERT") {
                        output_html += `<td class="align-middle expert">EXP</td>`;
                    } else if (data1[i].track[index].difficult == "ADVANCED") {
                        output_html += `<td class="align-middle advanced">ADV</td>`;
                    } else if (data1[i].track[index].difficult == "BASIC") {
                        output_html += `<td class="align-middle basic">BAS</td>`;
                    }
                } else {
                    output_html += `<td class="align-middle">---</td>`;
                };
                if (data1[i].track[index].level != "") {
                    output_html += `<td class="align-middle level">${data1[i].track[index].level.toFixed(1)}</td>`;
                } else {
                    output_html += `<td class="align-middle level">--.-</td>`;
                };

                output_html += `</tr>`;

            }
            output_html += `</tbody>`;
            output_html += `</table>`;
            //primary
            //warning
            //danger
            if (data1[i].rule != "") {
                output_html += `<div class="alert alert-${data1[i].alert}" role="alert"><strong>LIFE：${data1[i].life}</strong>　${data1[i].rule}</div>`;
            } else {
                output_html += `<div class="alert alert-success" role="alert"><strong>LIFE：0</strong>　---</div>`;
            };

            output_html += `<hr>`;
            output_html += `<button class="btn btn-outline-primary" type="button" data-toggle="collapse" data-target="#collapseExample${i}" aria-expanded="false" aria-controls="collapseExample${i}">Result Ranking</button>`;

            output_html += `<div class="collapse" id="collapseExample${i}">`;
            output_html += `<table class="table table-sm table-hover table-rec">`;
            output_html += `<thead>`;
            output_html += `<th scope="col" style="width:10%">#</th>`;
            output_html += `<th scope="col">名前</th>`;
            output_html += `<th scope="col" style="width:20%">ランク</th>`;
            output_html += `<th scope="col" style="width:25%">スコア</th>`;
            output_html += `</thead>`;

            var courseNo = data1[i].courseNo;
            //console.log(courseNo);
            var course_result = data2.filter(data => data.courseNo == courseNo);
            console.log(course_result[0]);
            //courseNoと同じNoのレコードを抽出

            if (course_result.length >= 1) {
                output_html += `<caption>updated ${course_result[0].update}</caption>`
                output_html += `<tbody>`;

                (course_result[0].record).sort(function (a, b) {
                    if (a.score > b.score) return -1;
                    if (a.score < b.score) return 1;
                });
                //スコア降順ソート

                var prescore = -1;
                var count = 0;
                for (let j = 0; j < course_result[0].record.length; j++) {
                    if (course_result[0].record[j].score != prescore) {
                        count++;
                        prescore = course_result[0].record[j].score;
                    };
                    output_html += `<tr>`;
                    output_html += `<td class="align-middle result_ranking ranking-${count}">${count}</td>`;
                    output_html += `<td class="align-middle result_name">${course_result[0].record[j].name}</td>`;

                    if (course_result[0].record[j].score >= 3022500) {
                        output_html += `<td class="align-middle result_rank">SSS</td>`;
                    } else if (course_result[0].record[j].score >= 3000000) {
                        output_html += `<td class="align-middle result_rank">SS</td>`;
                    } else if (course_result[0].record[j].score >= 2925000) {
                        output_html += `<td class="align-middle result_rank">S</td>`;
                    } else {
                        output_html += `<td class="align-middle result_rank"></td>`;
                    };

                    output_html += `<td class="align-middle result_score">${course_result[0].record[j].score.toLocaleString()}</td>`;
                    output_html += `</tr>`;
                };
            };
            output_html += `</tbody>`;
            output_html += `</table>`;
            output_html += `</div>`;

            output_html += `</div>`;
            output_html += `</div>`;
            output_html += `</div>`;
        };
        output_html += `</div">`
        $('.output').html(output_html);

    };
    data_import();

    function sort_up() {
        data1.sort(function (a, b) {
            if (a.courseNo > b.courseNo) return -1;
            if (a.courseNo < b.courseNo) return 1;
        });
        output();
    };

    function sort_down() {
        data1.sort(function (a, b) {
            if (a.courseNo < b.courseNo) return -1;
            if (a.courseNo > b.courseNo) return 1;
        });
        output();
    }

    $(".option1").on("click", sort_down);
    $(".option2").on("click", sort_up);



});
